import { SEANCES_PAR_JOUR } from '../data/seances';
import type { Jour } from '../types';
import { cleDuJour, jourDeLaDate } from './jour';
import type { EntreeHistorique, SerieRealisee } from './progression';

/** Une séance marquée terminée par l'utilisateur. */
export type SeanceTerminee = {
  jour: Jour;
  /** Horodatage ISO du moment où la séance a été clôturée. */
  termineeA: string;
};

/**
 * Tout ce qui doit survivre à la séance du jour : les séances clôturées et
 * l'historique complet des charges. Le suivi en cours (cases cochées, champs
 * en train d'être remplis) reste à part, il n'a d'intérêt que dans la journée.
 *
 * Un document unique plutôt qu'une clé par exercice : c'est ce qui se
 * synchronise, s'exporte et se fusionne d'un seul tenant.
 */
export type Journal = {
  /** Clé : « AAAA-MM-JJ » en heure locale. */
  seances: Record<string, SeanceTerminee>;
  /** Clé : identifiant d'exercice. Entrées triées, la plus récente en tête. */
  historique: Record<string, EntreeHistorique[]>;
  /** Millisecondes de la dernière écriture locale, pour arbitrer la fusion. */
  majA: number;
};

export const CLE_JOURNAL = 'muscu:journal';

export const JOURNAL_VIDE: Journal = { seances: {}, historique: {}, majA: 0 };

/** Nombre de séances d'entraînement dans une semaine de programme. */
export const SEANCES_PAR_SEMAINE = Object.values(SEANCES_PAR_JOUR).filter((s) => !s.repos).length;

// ---------------------------------------------------------------- écritures

/** Remplace l'entrée du jour pour cet exercice. Des séries vides l'effacent. */
export function avecSeries(
  journal: Journal,
  exerciceId: string,
  series: SerieRealisee[],
  date = cleDuJour(),
): Journal {
  const utiles = series.filter((s) => s.reps > 0);
  const autres = (journal.historique[exerciceId] ?? []).filter((e) => e.date !== date);
  const entrees = utiles.length > 0 ? trier([{ date, series: utiles }, ...autres]) : autres;

  const historique = { ...journal.historique };
  if (entrees.length > 0) historique[exerciceId] = entrees;
  else delete historique[exerciceId];

  return { ...journal, historique, majA: Date.now() };
}

export function avecSeanceTerminee(journal: Journal, jour: Jour, date = cleDuJour()): Journal {
  return {
    ...journal,
    seances: { ...journal.seances, [date]: { jour, termineeA: new Date().toISOString() } },
    majA: Date.now(),
  };
}

export function sansSeanceTerminee(journal: Journal, date = cleDuJour()): Journal {
  const seances = { ...journal.seances };
  delete seances[date];
  return { ...journal, seances, majA: Date.now() };
}

const trier = (entrees: EntreeHistorique[]) =>
  [...entrees].sort((a, b) => b.date.localeCompare(a.date));

// ---------------------------------------------------------------- lectures

/** Dernière séance enregistrée pour cet exercice, celle du jour exclue. */
export function derniereSeance(
  journal: Journal,
  exerciceId: string,
  date = cleDuJour(),
): EntreeHistorique | null {
  return (journal.historique[exerciceId] ?? []).find((e) => e.date !== date) ?? null;
}

export function estTerminee(journal: Journal, date = cleDuJour()): boolean {
  return journal.seances[date] !== undefined;
}

export type Streak = {
  /** Jours consécutifs, en remontant, où le programme a été respecté. */
  jours: number;
  /** Meilleure série jamais atteinte. */
  record: number;
  /** Séances clôturées depuis le début. */
  total: number;
  /** Séances clôturées sur la semaine en cours, lundi comme premier jour. */
  semaine: number;
  /** Vrai si la séance du jour reste à faire et prolongerait la série. */
  enAttenteAujourdhui: boolean;
};

/**
 * Une journée est « respectée » si elle était un jour de repos, ou si la
 * séance prévue a été clôturée. Ne pas compter les jours de repos casserait
 * la série tous les jeudis alors que se reposer fait partie du programme.
 *
 * La journée en cours ne casse rien tant qu'elle n'est pas finie : elle est
 * simplement exclue du décompte tant que la séance n'est pas clôturée.
 */
export function calculerStreak(journal: Journal, maintenant = new Date()): Streak {
  const dates = Object.keys(journal.seances).sort();
  const total = dates.length;
  const premiere = dates[0];

  const respecte = (d: Date) =>
    SEANCES_PAR_JOUR[jourDeLaDate(d)].repos || journal.seances[cleDuJour(d)] !== undefined;

  let jours = 0;
  let enAttenteAujourdhui = false;

  if (premiere !== undefined) {
    const curseur = new Date(maintenant);
    curseur.setHours(12, 0, 0, 0);

    // Le jour même ne pénalise pas : s'il n'est pas encore honoré, on le saute.
    if (!respecte(curseur)) {
      enAttenteAujourdhui = true;
      curseur.setDate(curseur.getDate() - 1);
    }

    while (cleDuJour(curseur) >= premiere && respecte(curseur)) {
      jours += 1;
      curseur.setDate(curseur.getDate() - 1);
    }
  }

  return {
    jours,
    record: Math.max(jours, recordHistorique(journal, dates)),
    total,
    semaine: dates.filter((d) => d >= cleDuJour(debutDeSemaine(maintenant))).length,
    enAttenteAujourdhui,
  };
}

/** Plus longue suite de jours respectés entre la première et la dernière séance. */
function recordHistorique(journal: Journal, datesTriees: string[]): number {
  const premiere = datesTriees[0];
  const derniere = datesTriees[datesTriees.length - 1];
  if (premiere === undefined || derniere === undefined) return 0;

  const curseur = new Date(`${premiere}T12:00:00`);
  const fin = new Date(`${derniere}T12:00:00`);
  let courant = 0;
  let record = 0;

  while (curseur <= fin) {
    const ok =
      SEANCES_PAR_JOUR[jourDeLaDate(curseur)].repos ||
      journal.seances[cleDuJour(curseur)] !== undefined;
    courant = ok ? courant + 1 : 0;
    record = Math.max(record, courant);
    curseur.setDate(curseur.getDate() + 1);
  }

  return record;
}

/** Lundi de la semaine contenant cette date. */
export function debutDeSemaine(date = new Date()): Date {
  const lundi = new Date(date);
  lundi.setHours(12, 0, 0, 0);
  lundi.setDate(lundi.getDate() - ((date.getDay() + 6) % 7));
  return lundi;
}

// ---------------------------------------------------------------- fusion

/**
 * Fusion de deux journaux, pour la synchronisation entre appareils et
 * l'import d'une sauvegarde. Volontairement sans horloge globale : les deux
 * collections sont indexées par date, donc la réunion des clés suffit et
 * aucune séance ne peut être perdue par un simple « le dernier écrit gagne ».
 */
export function fusionner(a: Journal, b: Journal): Journal {
  const seances: Record<string, SeanceTerminee> = { ...a.seances };
  for (const [date, seance] of Object.entries(b.seances)) {
    const existante = seances[date];
    // Même événement des deux côtés : on garde la première clôture.
    if (!existante || seance.termineeA < existante.termineeA) seances[date] = seance;
  }

  const historique: Record<string, EntreeHistorique[]> = {};
  for (const id of new Set([...Object.keys(a.historique), ...Object.keys(b.historique)])) {
    const parDate = new Map<string, EntreeHistorique>();
    for (const entree of [...(a.historique[id] ?? []), ...(b.historique[id] ?? [])]) {
      const existante = parDate.get(entree.date);
      if (!existante || plusComplete(entree, existante)) parDate.set(entree.date, entree);
    }
    historique[id] = trier([...parDate.values()]);
  }

  return { seances, historique, majA: Math.max(a.majA, b.majA) };
}

/**
 * Une séance ne fait que se remplir au fil des séries : à date égale, la
 * version qui contient le plus de travail est la plus récente.
 */
function plusComplete(candidate: EntreeHistorique, reference: EntreeHistorique): boolean {
  if (candidate.series.length !== reference.series.length)
    return candidate.series.length > reference.series.length;
  return volume(candidate) > volume(reference);
}

const volume = (e: EntreeHistorique) =>
  e.series.reduce((n, s) => n + (s.kg || 1) * s.reps, 0);

// ---------------------------------------------------------------- courbe

export type PointCourbe = {
  date: string;
  /** Charge la plus lourde de la séance, en kg. 0 au poids du corps. */
  charge: number;
  /** Répétitions cumulées sur toutes les séries. */
  reps: number;
  /** Charge × répétitions cumulées, en kg. */
  volume: number;
};

export function pointsPourExercice(journal: Journal, exerciceId: string): PointCourbe[] {
  return (journal.historique[exerciceId] ?? [])
    .map((e) => ({
      date: e.date,
      charge: Math.max(...e.series.map((s) => s.kg), 0),
      reps: e.series.reduce((n, s) => n + s.reps, 0),
      volume: e.series.reduce((n, s) => n + s.kg * s.reps, 0),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Au poids du corps la charge ne bouge jamais : c'est le nombre de
 * répétitions qui mesure le progrès. Le choix se fait sur l'historique
 * entier, pour que la courbe ne change pas d'unité en cours de route.
 */
export function metriquePertinente(points: PointCourbe[]): 'charge' | 'reps' {
  return points.some((p) => p.charge > 0) ? 'charge' : 'reps';
}

// ---------------------------------------------------------------- migration

/**
 * Reprend les clés `muscu:historique:<id>` de la première version, qui ne
 * gardaient que deux séances par exercice. Sans effet si elles n'existent pas.
 */
export function migrerAnciennesCles(journal: Journal): Journal {
  let resultat = journal;
  try {
    const prefixe = 'muscu:historique:';
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const cle = window.localStorage.key(i);
      if (cle === null || !cle.startsWith(prefixe)) continue;
      const brut = window.localStorage.getItem(cle);
      if (brut === null) continue;
      const entrees = JSON.parse(brut) as EntreeHistorique[];
      const id = cle.slice(prefixe.length);
      resultat = fusionner(resultat, { seances: {}, historique: { [id]: entrees }, majA: 0 });
    }
  } catch {
    // Stockage indisponible : rien à migrer.
  }
  return resultat;
}

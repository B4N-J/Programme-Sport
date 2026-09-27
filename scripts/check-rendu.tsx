/**
 * Test de rendu : monte chaque vue hors navigateur et vérifie que le contenu
 * attendu apparaît. Attrape les erreurs de rendu, les identifiants cassés et
 * les oublis de transcription, sans dépendre d'un navigateur.
 *
 * Usage : npm run check:rendu
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';

import { FicheExercice } from '../src/components/FicheExercice.tsx';
import { ProgressionView } from '../src/components/ProgressionView.tsx';
import { ReglagesView } from '../src/components/ReglagesView.tsx';
import { SeanceView } from '../src/components/SeanceView.tsx';
import { SemaineView } from '../src/components/SemaineView.tsx';
import { EXERCICES } from '../src/data/exercices.ts';
import { SEANCES } from '../src/data/seances.ts';
import { JournalProvider } from '../src/hooks/useJournal.tsx';
import { MinuteurProvider } from '../src/hooks/useMinuteur.tsx';
import { ReglagesProvider } from '../src/hooks/useReglages.tsx';
import { formatDosage, formatRepos } from '../src/lib/format.ts';
import {
  calculerStreak,
  fusionner,
  metriquePertinente,
  pointsPourExercice,
  JOURNAL_VIDE,
  type Journal,
} from '../src/lib/journal.ts';
import { haussePreconisee } from '../src/lib/progression.ts';
import { exerciceEffectif, REGLAGES_PAR_DEFAUT } from '../src/lib/substitutions.ts';

const erreurs: string[] = [];

// `react-router` appelle `useLayoutEffect`, que le rendu serveur ignore. Ce
// test ne sert qu'à monter les vues hors navigateur : l'avertissement est sans
// objet ici et masquerait le résultat.
const consoleErreur = console.error;
console.error = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('useLayoutEffect')) return;
  consoleErreur(...args);
};

/** Mêmes routes que `App`, pour que `useParams` reçoive bien ses paramètres. */
function rendre(route: string): string {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[route]}>
      <ReglagesProvider>
        <JournalProvider>
        <MinuteurProvider sonActive={false}>
          <Routes>
            <Route path="/" element={<SemaineView />} />
            <Route path="/jour/:jour" element={<SeanceView />} />
            <Route path="/exercice/:id" element={<FicheExercice />} />
            <Route path="/progression" element={<ProgressionView />} />
            <Route path="/reglages" element={<ReglagesView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MinuteurProvider>
        </JournalProvider>
      </ReglagesProvider>
    </MemoryRouter>,
  );
}

/** React échappe les apostrophes et les guillemets : on compare en clair. */
function enClair(html: string): string {
  return html
    .replaceAll('&#x27;', "'")
    .replaceAll('&quot;', '"')
    .replaceAll('&gt;', '>')
    .replaceAll('&lt;', '<')
    .replaceAll('&amp;', '&');
}

function verifier(nom: string, route: string, attendus: string[]): void {
  let html: string;
  try {
    html = enClair(rendre(route));
  } catch (e) {
    erreurs.push(`${nom} : le rendu a échoué — ${(e as Error).message}`);
    return;
  }
  for (const attendu of attendus) {
    if (!html.includes(attendu)) erreurs.push(`${nom} : « ${attendu} » absent du rendu`);
  }
}

// ------------------------------------------------------------- Vue semaine
verifier('semaine', '/', [
  'Programme de la semaine',
  'Lundi',
  'Dimanche',
  'Pecs lourd + Triceps + Abdos',
  'Parc',
  'Rentrés de menton',
  'Course à pied',
]);

// ------------------------------------------------------------- Vues séance
for (const seance of SEANCES) {
  const attendus = seance.repos
    ? ['Repos salle', seance.noteRepos!.slice(0, 40)]
    : [
        seance.titre,
        'Échauffement · 10 min',
        ...seance.lignes.map((l) => formatDosage(l.dosage)),
      ];
  verifier(`séance ${seance.jour}`, `/jour/${seance.jour}`, attendus);
}

// ---------------------------------------------------------- Fiches (les 47)
for (const exercice of EXERCICES) {
  verifier(`fiche ${exercice.id}`, `/exercice/${exercice.id}`, [
    exercice.nom,
    'Muscles',
    ...exercice.execution.slice(0, 1),
  ]);
}

// --------------------------------------------------------------- Réglages
verifier('réglages', '/reglages', [
  'Réglages',
  'Matériel disponible',
  "Le banc de la salle n'est pas inclinable",
  'RIR (Reps In Reserve)',
]);

// -------------------------------------------------- Substitutions matériel
function attendre(nom: string, obtenu: unknown, attendu: unknown): void {
  if (obtenu !== attendu) erreurs.push(`${nom} : attendu « ${attendu} », obtenu « ${obtenu} »`);
}

const lundi = SEANCES.find((s) => s.jour === 'lundi')!;
const ligneIncline = lundi.lignes.find((l) => l.exerciceId === 'dev_incline')!;

attendre(
  'substitution inactive',
  exerciceEffectif(ligneIncline, REGLAGES_PAR_DEFAUT).exercice.id,
  'dev_incline',
);
attendre(
  'substitution banc non inclinable',
  exerciceEffectif(ligneIncline, { ...REGLAGES_PAR_DEFAUT, bancNonInclinable: true }).exercice.id,
  'dc_paumes_face',
);
attendre(
  'exercice remplacé signalé',
  exerciceEffectif(ligneIncline, { ...REGLAGES_PAR_DEFAUT, bancNonInclinable: true }).remplace?.id,
  'dev_incline',
);

// ------------------------------------------------------- Formats et progression
attendre('dosage reps', formatDosage({ type: 'reps', series: 3, repsMin: 6, repsMax: 10 }), '3 × 6 à 10');
attendre(
  'dosage par côté',
  formatDosage({ type: 'duree', series: 2, secMin: 30, secMax: 45, parCote: true }),
  '2 × 30 à 45 s par côté',
);
attendre('dosage max', formatDosage({ type: 'max', series: 2, libelle: 'max moins 1' }), '2 × max moins 1');
attendre('repos minutes', formatRepos({ reposSec: 120 }), '2 min');
attendre('repos fourchette', formatRepos({ reposSec: 90, reposSecMin: 60 }), '60 à 90 s');

const dosage3x8a12 = { type: 'reps', series: 3, repsMin: 8, repsMax: 12 } as const;
const auPlafond = { date: '2026-09-20', series: [12, 12, 12].map((reps) => ({ kg: 20, reps })) };
const endessous = { date: '2026-09-20', series: [12, 12, 10].map((reps) => ({ kg: 20, reps })) };
attendre('hausse préconisée', haussePreconisee(dosage3x8a12, auPlafond), true);
attendre('hausse non préconisée', haussePreconisee(dosage3x8a12, endessous), false);
attendre('hausse sans historique', haussePreconisee(dosage3x8a12, null), false);

// ------------------------------------------------------------ Vue progression
verifier('progression', '/progression', [
  'Progression',
  'jour de suite',
  'Huit dernières semaines',
  'séance faite',
  'Évolution des charges',
]);

// ------------------------------------------------------------------- Journal
// Repère fixe : 2026-09-21 est un lundi, 2026-09-24 un jeudi (repos),
// 2026-09-27 un dimanche (repos).
const journalPlein: Journal = {
  ...JOURNAL_VIDE,
  seances: Object.fromEntries(
    (['2026-09-21', '2026-09-22', '2026-09-23', '2026-09-25', '2026-09-26'] as const).map(
      (date, i) => [
        date,
        { jour: (['lundi', 'mardi', 'mercredi', 'vendredi', 'samedi'] as const)[i]!, termineeA: `${date}T19:00:00.000Z` },
      ],
    ),
  ),
};

const dimanche = new Date('2026-09-27T12:00:00');
const streakPlein = calculerStreak(journalPlein, dimanche);
attendre('série : jours de repos compris', streakPlein.jours, 7);
attendre('série : séances totales', streakPlein.total, 5);
attendre('série : semaine en cours', streakPlein.semaine, 5);
attendre('série : jour en cours honoré', streakPlein.enAttenteAujourdhui, false);

const journalTroue: Journal = {
  ...journalPlein,
  seances: Object.fromEntries(
    Object.entries(journalPlein.seances).filter(([date]) => date !== '2026-09-25'),
  ),
};
attendre('série : cassée par une séance manquée', calculerStreak(journalTroue, dimanche).jours, 2);

const lundiSuivant = new Date('2026-09-28T12:00:00');
const streakEnCours = calculerStreak(journalPlein, lundiSuivant);
attendre('série : la séance du jour ne casse rien', streakEnCours.jours, 7);
attendre('série : séance du jour en attente', streakEnCours.enAttenteAujourdhui, true);
attendre('série : aucune séance', calculerStreak(JOURNAL_VIDE, dimanche).jours, 0);

// Fusion : rien ne se perd, et à date égale la version la plus fournie gagne.
const appareilA: Journal = {
  seances: { '2026-09-21': { jour: 'lundi', termineeA: '2026-09-21T19:00:00.000Z' } },
  historique: { dc_halteres: [{ date: '2026-09-21', series: [{ kg: 20, reps: 10 }] }] },
  majA: 1,
};
const appareilB: Journal = {
  seances: { '2026-09-22': { jour: 'mardi', termineeA: '2026-09-22T19:00:00.000Z' } },
  historique: {
    dc_halteres: [
      {
        date: '2026-09-21',
        series: [
          { kg: 20, reps: 10 },
          { kg: 20, reps: 9 },
        ],
      },
    ],
  },
  majA: 2,
};
const fusionne = fusionner(appareilA, appareilB);
attendre('fusion : les deux séances survivent', Object.keys(fusionne.seances).length, 2);
attendre('fusion : la séance la plus fournie gagne', fusionne.historique.dc_halteres![0]!.series.length, 2);
attendre('fusion : symétrique', JSON.stringify(fusionner(appareilB, appareilA).historique), JSON.stringify(fusionne.historique));

// Courbe : ordre chronologique, charge maximale de chaque séance.
const journalCourbe: Journal = {
  ...JOURNAL_VIDE,
  historique: {
    dc_halteres: [
      { date: '2026-09-28', series: [{ kg: 22, reps: 8 }, { kg: 24, reps: 6 }] },
      { date: '2026-09-21', series: [{ kg: 20, reps: 10 }] },
    ],
    planche: [{ date: '2026-09-21', series: [{ kg: 0, reps: 45 }] }],
  },
};
const courbe = pointsPourExercice(journalCourbe, 'dc_halteres');
attendre('courbe : ordre chronologique', courbe[0]!.date, '2026-09-21');
attendre('courbe : charge maximale de la séance', courbe[1]!.charge, 24);
attendre('courbe : volume cumulé', courbe[1]!.volume, 22 * 8 + 24 * 6);
attendre('courbe : métrique en charge', metriquePertinente(courbe), 'charge');
attendre(
  'courbe : métrique en répétitions au poids du corps',
  metriquePertinente(pointsPourExercice(journalCourbe, 'planche')),
  'reps',
);

// --------------------------------------------------------------- Feuille de style
/**
 * Un même sélecteur simple défini deux fois passe inaperçu : la seconde règle
 * écrase silencieusement la première. C'est arrivé avec `.case`, partagé entre
 * la case à cocher d'une série et la case du calendrier, dont l'`aspect-ratio`
 * a transformé un bouton large en carré de 500 px de haut.
 */
const css = readFileSync(fileURLToPath(new URL('../src/styles.css', import.meta.url)), 'utf8');
// Les blocs `@media` redéfinissent légitimement les mêmes sélecteurs.
const cssHorsMedia = css.replace(/@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/gs, '');
const compte = new Map<string, number>();
for (const [, nom] of cssHorsMedia.matchAll(/^\.([a-zA-Z0-9_-]+)\s*\{/gm)) {
  compte.set(nom!, (compte.get(nom!) ?? 0) + 1);
}
for (const [nom, n] of compte) {
  if (n > 1) erreurs.push(`style : « .${nom} » est défini ${n} fois, la dernière règle écrase les autres`);
}

// Toute classe posée par un composant doit exister dans la feuille de style.
const sources = ['SemaineView', 'SeanceView', 'LigneExercice', 'SerieTracker', 'FicheExercice', 'ProgressionView', 'Courbe', 'Sauvegarde', 'ReglagesView', 'RestTimer', 'Entete', 'EchauffementCard'];
for (const nom of sources) {
  const source = readFileSync(
    fileURLToPath(new URL(`../src/components/${nom}.tsx`, import.meta.url)),
    'utf8',
  );
  for (const [, valeur] of source.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
    for (const classe of (valeur ?? '').split(/[\s${}?:'"]+/).filter((c) => /^[a-zA-Z][\w-]*$/.test(c))) {
      if (!css.includes(`.${classe}`)) {
        erreurs.push(`style : ${nom} pose « ${classe} », absent de styles.css`);
      }
    }
  }
}

// ----------------------------------------------------------------- Verdict
if (erreurs.length > 0) {
  console.error(`\n✗ ${erreurs.length} problème(s) de rendu :\n`);
  for (const e of erreurs) console.error(`  · ${e}`);
  console.error('');
  process.exit(1);
}

console.log(
  `✓ Rendu correct : 1 vue semaine, ${SEANCES.length} vues jour, ${EXERCICES.length} fiches, 1 vue progression, 1 vue réglages.`,
);
console.log('✓ Substitutions, formats et double progression conformes.');
console.log('✓ Série de jours, fusion entre appareils et courbes conformes.');
console.log('✓ Feuille de style : aucun sélecteur dupliqué, aucune classe orpheline.');

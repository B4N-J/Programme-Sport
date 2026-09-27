import { SEANCES_PAR_JOUR } from '../data/seances';
import type { Jour, Seance } from '../types';
import { JOURS } from '../types';

/** `Date.getDay()` commence au dimanche ; le planning commence au lundi. */
export function jourDeLaDate(date = new Date()): Jour {
  return JOURS[(date.getDay() + 6) % 7]!;
}

/** Clé de stockage du suivi, en heure locale : « 2026-09-27 ». */
export function cleDuJour(date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
}

export function libelleJour(jour: Jour): string {
  return jour.charAt(0).toUpperCase() + jour.slice(1);
}

/** Prochaine séance d'entraînement, aujourd'hui compris. */
export function prochaineSeance(date = new Date()): Seance {
  const depart = JOURS.indexOf(jourDeLaDate(date));
  for (let i = 0; i < JOURS.length; i += 1) {
    const seance = SEANCES_PAR_JOUR[JOURS[(depart + i) % JOURS.length]!];
    if (!seance.repos) return seance;
  }
  return SEANCES_PAR_JOUR.lundi;
}

export function estJourValide(valeur: string): valeur is Jour {
  return (JOURS as readonly string[]).includes(valeur);
}

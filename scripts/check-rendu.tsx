/**
 * Test de rendu : monte chaque vue hors navigateur et vérifie que le contenu
 * attendu apparaît. Attrape les erreurs de rendu, les identifiants cassés et
 * les oublis de transcription, sans dépendre d'un navigateur.
 *
 * Usage : npm run check:rendu
 */
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';

import { FicheExercice } from '../src/components/FicheExercice.tsx';
import { ReglagesView } from '../src/components/ReglagesView.tsx';
import { SeanceView } from '../src/components/SeanceView.tsx';
import { SemaineView } from '../src/components/SemaineView.tsx';
import { EXERCICES } from '../src/data/exercices.ts';
import { SEANCES } from '../src/data/seances.ts';
import { MinuteurProvider } from '../src/hooks/useMinuteur.tsx';
import { ReglagesProvider } from '../src/hooks/useReglages.tsx';
import { formatDosage, formatRepos } from '../src/lib/format.ts';
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
        <MinuteurProvider sonActive={false}>
          <Routes>
            <Route path="/" element={<SemaineView />} />
            <Route path="/jour/:jour" element={<SeanceView />} />
            <Route path="/exercice/:id" element={<FicheExercice />} />
            <Route path="/reglages" element={<ReglagesView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MinuteurProvider>
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

// ----------------------------------------------------------------- Verdict
if (erreurs.length > 0) {
  console.error(`\n✗ ${erreurs.length} problème(s) de rendu :\n`);
  for (const e of erreurs) console.error(`  · ${e}`);
  console.error('');
  process.exit(1);
}

console.log(
  `✓ Rendu correct : 1 vue semaine, ${SEANCES.length} vues jour, ${EXERCICES.length} fiches, 1 vue réglages.`,
);
console.log('✓ Substitutions, formats et double progression conformes.');

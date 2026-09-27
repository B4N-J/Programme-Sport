import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { getExercice } from '../data/exercices';
import { SEANCES_PAR_JOUR } from '../data/seances';
import { useJournal } from '../hooks/useJournal';
import { cleDuJour, jourDeLaDate } from '../lib/jour';
import {
  calculerStreak,
  pointsPourExercice,
  SEANCES_PAR_SEMAINE,
  type Journal,
} from '../lib/journal';
import { Courbe, dateCourte } from './Courbe';
import { Entete } from './Entete';

/** Semaines affichées dans le calendrier, la semaine en cours comprise. */
const SEMAINES_AFFICHEES = 8;

export function ProgressionView() {
  const { journal } = useJournal();
  const streak = useMemo(() => calculerStreak(journal), [journal]);

  const suivis = useMemo(() => exercicesSuivis(journal), [journal]);
  const [choisi, setChoisi] = useState<string>('');
  const exerciceId = choisi !== '' && journal.historique[choisi] ? choisi : (suivis[0]?.id ?? '');
  const points = useMemo(
    () => (exerciceId ? pointsPourExercice(journal, exerciceId) : []),
    [journal, exerciceId],
  );

  return (
    <>
      <Entete titre="Progression" retour />

      <section className="bloc">
        <div className="streak">
          <span className="streak-nombre">{streak.jours}</span>
          <span className="streak-unite">
            {streak.jours <= 1 ? 'jour de suite' : 'jours de suite'}
          </span>
        </div>
        <p className="streak-note">
          {streak.total === 0
            ? 'Clôture ta première séance pour lancer la série.'
            : streak.enAttenteAujourdhui
              ? 'La séance du jour n’est pas encore clôturée : la série tient jusqu’à ce soir.'
              : 'Les jours de repos comptent : se reposer fait partie du programme.'}
        </p>

        <ul className="stats">
          <li>
            <strong>{streak.total}</strong>
            <span>séance{streak.total > 1 ? 's' : ''} au total</span>
          </li>
          <li>
            <strong>
              {streak.semaine}/{SEANCES_PAR_SEMAINE}
            </strong>
            <span>cette semaine</span>
          </li>
          <li>
            <strong>{streak.record}</strong>
            <span>record de série</span>
          </li>
        </ul>
      </section>

      <section className="bloc">
        <h2>Huit dernières semaines</h2>
        <Calendrier journal={journal} />
        <ul className="legende-calendrier">
          <li>
            <span className="case faite" /> séance faite
          </li>
          <li>
            <span className="case repos" /> repos prévu
          </li>
          <li>
            <span className="case manquee" /> manquée
          </li>
        </ul>
      </section>

      <section className="bloc">
        <h2>Évolution des charges</h2>
        {suivis.length === 0 ? (
          <p className="courbe-vide">
            Saisis tes charges pendant une séance : la courbe apparaît dès la deuxième fois.
          </p>
        ) : (
          <>
            <label className="champ-select">
              <span className="etiquette">Exercice</span>
              <select value={exerciceId} onChange={(e) => setChoisi(e.target.value)}>
                {suivis.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nom} ({e.seances})
                  </option>
                ))}
              </select>
            </label>

            <Courbe points={points} />

            <Link className="bouton" to={`/exercice/${exerciceId}`}>
              Voir la fiche
            </Link>
          </>
        )}
      </section>
    </>
  );
}

/** Exercices ayant au moins une séance enregistrée, les plus travaillés d'abord. */
function exercicesSuivis(journal: Journal) {
  return Object.entries(journal.historique)
    .map(([id, entrees]) => ({
      id,
      nom: getExercice(id)?.nom ?? id,
      seances: entrees.length,
    }))
    .sort((a, b) => b.seances - a.seances || a.nom.localeCompare(b.nom));
}

function Calendrier({ journal }: { journal: Journal }) {
  const aujourdhui = cleDuJour();

  // On remonte au lundi, puis on recule de sept semaines : la grille tombe
  // toujours sur des semaines entières, lundi à gauche.
  const depart = new Date();
  depart.setHours(12, 0, 0, 0);
  depart.setDate(depart.getDate() - ((new Date().getDay() + 6) % 7) - 7 * (SEMAINES_AFFICHEES - 1));

  const semaines = Array.from({ length: SEMAINES_AFFICHEES }, (_, s) =>
    Array.from({ length: 7 }, (_, j) => {
      const date = new Date(depart);
      date.setDate(depart.getDate() + s * 7 + j);
      const cle = cleDuJour(date);
      const repos = SEANCES_PAR_JOUR[jourDeLaDate(date)].repos;
      const faite = journal.seances[cle] !== undefined;
      const futur = cle > aujourdhui;

      const classe = faite ? 'faite' : futur ? 'futur' : repos ? 'repos' : 'manquee';
      return { cle, classe, futur };
    }),
  );

  return (
    <div className="calendrier" role="img" aria-label="Calendrier des huit dernières semaines">
      <div className="calendrier-entete" aria-hidden="true">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((lettre, i) => (
          <span key={i}>{lettre}</span>
        ))}
      </div>
      {semaines.map((semaine, s) => (
        <div className="calendrier-semaine" key={s}>
          {semaine.map((jour) => (
            <span
              key={jour.cle}
              className={`case ${jour.classe}${jour.cle === aujourdhui ? ' aujourdhui' : ''}`}
              title={`${dateCourte(jour.cle)} — ${libelle(jour.classe)}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function libelle(classe: string): string {
  if (classe === 'faite') return 'séance faite';
  if (classe === 'repos') return 'repos';
  if (classe === 'futur') return 'à venir';
  return 'manquée';
}

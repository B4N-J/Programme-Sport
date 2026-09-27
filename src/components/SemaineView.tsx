import { Link } from 'react-router-dom';

import { getExercice } from '../data/exercices';
import { AVERTISSEMENT_SANTE, PLACEMENT_COURSE } from '../data/principes';
import { ROUTINE_QUOTIDIENNE, SEANCES } from '../data/seances';
import { jourDeLaDate, libelleJour } from '../lib/jour';
import { Chevron } from './Icones';
import { Entete } from './Entete';

export function SemaineView() {
  const aujourdhui = jourDeLaDate();

  return (
    <>
      <Entete titre="Programme de la semaine" />

      <ul className="jours" style={{ listStyle: 'none', padding: 0, margin: '16px 0 0' }}>
        {SEANCES.map((seance) => {
          const estAujourdhui = seance.jour === aujourdhui;
          return (
            <li key={seance.jour}>
              <Link
                to={`/jour/${seance.jour}`}
                className={`carte-jour${estAujourdhui ? ' aujourdhui' : ''}${
                  seance.repos ? ' repos' : ''
                }`}
              >
                <span className="carte-jour-corps">
                  <span className="carte-jour-nom">
                    {libelleJour(seance.jour)}
                    {estAujourdhui && <span className="badge aujourdhui">Aujourd’hui</span>}
                    {seance.lieu === 'Parc' && <span className="badge parc">Parc</span>}
                  </span>
                  <span className="carte-jour-titre">
                    {seance.titre}
                    {!seance.repos && ` · ${seance.lignes.length} exercices`}
                  </span>
                </span>
                <Chevron />
              </Link>
            </li>
          );
        })}
      </ul>

      <h2 className="section-titre">Chaque jour, à la maison · 5 min</h2>
      <ul className="jours" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {ROUTINE_QUOTIDIENNE.map((entree) => {
          const exercice = getExercice(entree.exerciceId);
          if (!exercice) return null;
          return (
            <li key={entree.exerciceId}>
              <Link to={`/exercice/${exercice.id}`} className="carte-jour">
                <span className="carte-jour-corps">
                  <span className="carte-jour-nom">{exercice.nom}</span>
                  <span className="carte-jour-titre">{entree.dosageTexte}</span>
                </span>
                <Chevron />
              </Link>
            </li>
          );
        })}
      </ul>

      <h2 className="section-titre">Course à pied</h2>
      <p className="note">{PLACEMENT_COURSE}</p>

      <p className="note" style={{ marginTop: 28, fontSize: '0.8rem' }}>
        {AVERTISSEMENT_SANTE}
      </p>
    </>
  );
}

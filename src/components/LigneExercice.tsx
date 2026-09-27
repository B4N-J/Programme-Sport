import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getExercice } from '../data/exercices';
import { useJournal } from '../hooks/useJournal';
import type { EtatLigne, SerieSaisie } from '../hooks/useSuiviSeance';
import { etiquettesSeries, formatDosage, formatRepos } from '../lib/format';
import { derniereSeance } from '../lib/journal';
import { haussePreconisee, resumerEntree } from '../lib/progression';
import type { ExerciceEffectif } from '../lib/substitutions';
import type { Jour, LigneSeance } from '../types';
import { Chevron } from './Icones';
import { SerieTracker } from './SerieTracker';

type Props = {
  jour: Jour;
  ligne: LigneSeance;
  effectif: ExerciceEffectif;
  etat: EtatLigne;
  onBasculer: (index: number) => void;
  onSaisie: (index: number, champ: keyof SerieSaisie, valeur: string) => void;
};

export function LigneExercice({ jour, ligne, effectif, etat, onBasculer, onSaisie }: Props) {
  const [ouvert, setOuvert] = useState(false);
  const { journal } = useJournal();
  const { exercice, remplace } = effectif;

  const nbCases = etiquettesSeries(ligne.dosage).length;
  const faites = etat.cases.filter(Boolean).length;
  const terminee = faites === nbCases;

  const precedente = derniereSeance(journal, exercice.id);
  const hausse = haussePreconisee(ligne.dosage, precedente);
  const alternative = ligne.alternativeLibre ? getExercice(ligne.alternativeLibre) : undefined;

  return (
    <li className={`ligne${terminee ? ' terminee' : ''}`}>
      <button
        type="button"
        className="ligne-entete"
        aria-expanded={ouvert}
        onClick={() => setOuvert((o) => !o)}
      >
        <span className="ligne-ordre">{terminee ? '✓' : ligne.ordre}</span>

        <span className="ligne-corps">
          <span className="ligne-nom">{exercice.nom}</span>
          <span className="ligne-meta">
            <span>{formatDosage(ligne.dosage)}</span>
            <span>repos {formatRepos(ligne)}</span>
            {ligne.rir && <span>RIR {ligne.rir}</span>}
            {faites > 0 && !terminee && (
              <span style={{ color: 'var(--succes)' }}>
                {faites}/{nbCases} fait
              </span>
            )}
          </span>
          {ligne.consigne && <span className="ligne-consigne">{ligne.consigne}</span>}
          {remplace && (
            <span className="ligne-drapeau substitue">Remplace : {remplace.nom}</span>
          )}
          {hausse && <span className="ligne-drapeau hausse">Augmenter la charge</span>}
        </span>

        <span style={{ transform: ouvert ? 'rotate(90deg)' : undefined, display: 'flex' }}>
          <Chevron />
        </span>
      </button>

      {ouvert && (
        <div className="ligne-detail">
          {precedente && (
            <p className="ligne-rappel">
              Dernière fois ({precedente.date}) : {resumerEntree(precedente)}
            </p>
          )}

          <SerieTracker
            ligne={ligne}
            exercice={exercice}
            etat={etat}
            onBasculer={onBasculer}
            onSaisie={onSaisie}
          />

          <div className="actions-serie">
            <Link
              className="bouton"
              to={`/exercice/${exercice.id}?jour=${jour}&retour=${ligne.ordre}`}
            >
              Voir la fiche
            </Link>
            {alternative && (
              <Link className="bouton discret" to={`/exercice/${alternative.id}`}>
                Variante : {alternative.nom}
              </Link>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

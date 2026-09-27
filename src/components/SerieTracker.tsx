import { useMinuteur } from '../hooks/useMinuteur';
import type { EtatLigne, SerieSaisie } from '../hooks/useSuiviSeance';
import { accepteSaisie, dureeSerie, etiquettesSeries, formatRepos } from '../lib/format';
import type { Exercice, LigneSeance } from '../types';
import { Chrono, Coche } from './Icones';

type Props = {
  ligne: LigneSeance;
  exercice: Exercice;
  etat: EtatLigne;
  onBasculer: (index: number) => void;
  onSaisie: (index: number, champ: keyof SerieSaisie, valeur: string) => void;
};

/**
 * Une case par série (doublée en G/D pour les exercices par côté), plus la
 * saisie charge × répétitions quand l'exercice se compte en répétitions.
 * Cocher une série lance le repos : c'est le geste le plus fréquent à la salle.
 */
export function SerieTracker({ ligne, exercice, etat, onBasculer, onSaisie }: Props) {
  const { demarrer } = useMinuteur();
  const etiquettes = etiquettesSeries(ligne.dosage);
  const duree = dureeSerie(ligne.dosage);
  const saisieVisible = accepteSaisie(ligne.dosage);

  const cocher = (index: number) => {
    const etaitCochee = etat.cases[index] ?? false;
    onBasculer(index);
    // Décocher est une correction, pas la fin d'une série : pas de repos.
    if (!etaitCochee && index < etiquettes.length - 1) {
      demarrer(ligne.reposSec, `Repos · ${exercice.nom}`);
    }
  };

  return (
    <div className="series">
      {etiquettes.map((etiquette, index) => {
        const cochee = etat.cases[index] ?? false;
        return (
          <div className="serie" key={etiquette}>
            <button
              type="button"
              className={`case${cochee ? ' cochee' : ''}`}
              aria-pressed={cochee}
              onClick={() => cocher(index)}
            >
              <span className="case-marque">{cochee && <Coche />}</span>
              {etiquette}
            </button>

            {saisieVisible && (
              <>
                <span className="saisie">
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    min="0"
                    placeholder="kg"
                    aria-label={`Charge, ${etiquette}`}
                    value={etat.saisies[index]?.kg ?? ''}
                    onChange={(e) => onSaisie(index, 'kg', e.target.value)}
                  />
                </span>
                <span className="saisie">
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    placeholder="reps"
                    aria-label={`Répétitions, ${etiquette}`}
                    value={etat.saisies[index]?.reps ?? ''}
                    onChange={(e) => onSaisie(index, 'reps', e.target.value)}
                  />
                </span>
              </>
            )}
          </div>
        );
      })}

      <div className="actions-serie">
        {duree !== null && (
          <button
            type="button"
            className="bouton"
            onClick={() => demarrer(duree, `Série · ${exercice.nom}`)}
          >
            <Chrono /> Chronométrer {duree} s
          </button>
        )}
        <button
          type="button"
          className="bouton discret"
          onClick={() => demarrer(ligne.reposSec, `Repos · ${exercice.nom}`)}
        >
          <Chrono /> Repos {formatRepos(ligne)}
        </button>
      </div>
    </div>
  );
}

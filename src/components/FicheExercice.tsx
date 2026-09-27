import { Navigate, useParams, useSearchParams } from 'react-router-dom';

import { getExercice } from '../data/exercices';
import { SEANCES_PAR_JOUR } from '../data/seances';
import { useJournal } from '../hooks/useJournal';
import { formatDosage, formatRepos } from '../lib/format';
import { estJourValide } from '../lib/jour';
import { pointsPourExercice } from '../lib/journal';
import { LIBELLE_GROUPE } from '../types';
import { Courbe } from './Courbe';
import { Entete } from './Entete';

/** Rappel du dosage prescrit quand la fiche est ouverte depuis une séance. */
function RappelPrescription({ jour, ordre }: { jour: string; ordre: number }) {
  if (!estJourValide(jour)) return null;
  const ligne = SEANCES_PAR_JOUR[jour].lignes.find((l) => l.ordre === ordre);
  if (!ligne) return null;

  return (
    <p className="fiche-rappel">
      <strong>Aujourd’hui : {formatDosage(ligne.dosage)}</strong>
      {` · repos ${formatRepos(ligne)}`}
      {ligne.rir && ` · RIR ${ligne.rir}`}
      {ligne.consigne && ` · ${ligne.consigne}`}
    </p>
  );
}

export function FicheExercice() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const { journal } = useJournal();
  const exercice = id ? getExercice(id) : undefined;

  if (!exercice) return <Navigate to="/" replace />;

  const depuisJour = params.get('jour');
  const retourOrdre = Number(params.get('retour'));
  const points = pointsPourExercice(journal, exercice.id);

  return (
    <>
      <Entete titre={exercice.nom} retour />

      <p className="note" style={{ marginTop: 14, textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.08em' }}>
        {LIBELLE_GROUPE[exercice.groupe]}
      </p>

      {depuisJour && retourOrdre > 0 && (
        <div style={{ marginTop: 12 }}>
          <RappelPrescription jour={depuisJour} ordre={retourOrdre} />
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <section className="fiche-bloc">
          <h2>Muscles</h2>
          <p>{exercice.muscles}</p>
        </section>

        {exercice.materiel && (
          <section className="fiche-bloc">
            <h2>Matériel</h2>
            <p>{exercice.materiel}</p>
          </section>
        )}

        {exercice.positionDepart && (
          <section className="fiche-bloc">
            <h2>Position de départ</h2>
            <p>{exercice.positionDepart}</p>
          </section>
        )}

        <section className="fiche-bloc">
          <h2>Exécution</h2>
          {exercice.execution.length === 1 ? (
            <p>{exercice.execution[0]}</p>
          ) : (
            <ol className="liste-numerotee">
              {exercice.execution.map((etape) => (
                <li key={etape}>{etape}</li>
              ))}
            </ol>
          )}
        </section>

        {exercice.resistance && (
          <section className="fiche-bloc">
            <h2>Résistance</h2>
            <p>{exercice.resistance}</p>
          </section>
        )}

        {exercice.pointsCles && (
          <section className="fiche-bloc">
            <h2>Points clés</h2>
            <ul>
              {exercice.pointsCles.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        )}

        {exercice.erreurs && (
          <section className="fiche-bloc attention">
            <h2>Erreurs fréquentes</h2>
            <ul>
              {exercice.erreurs.map((erreur) => (
                <li key={erreur}>{erreur}</li>
              ))}
            </ul>
          </section>
        )}

        {(exercice.plusFacile || exercice.plusDifficile) && (
          <section className="fiche-bloc">
            <h2>Variantes</h2>
            <div className="fiche-variantes">
              {exercice.plusFacile && (
                <p className="variante">
                  <strong>Plus facile</strong> — {exercice.plusFacile}
                </p>
              )}
              {exercice.plusDifficile && (
                <p className="variante">
                  <strong>Plus difficile</strong> — {exercice.plusDifficile}
                </p>
              )}
            </div>
          </section>
        )}

        {exercice.note && (
          <section className="fiche-bloc">
            <h2>Note</h2>
            <p>{exercice.note}</p>
          </section>
        )}

        {points.length > 0 && (
          <section className="fiche-bloc">
            <h2>Évolution</h2>
            <Courbe points={points} />
          </section>
        )}
      </div>
    </>
  );
}

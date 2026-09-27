import { Navigate, useParams } from 'react-router-dom';

import { SEANCES_PAR_JOUR } from '../data/seances';
import { useReglages } from '../hooks/useReglages';
import { useSuiviSeance } from '../hooks/useSuiviSeance';
import { useWakeLock } from '../hooks/useWakeLock';
import { estJourValide, libelleJour } from '../lib/jour';
import { etiquettesSeries } from '../lib/format';
import { exerciceEffectif } from '../lib/substitutions';
import { EchauffementCard } from './EchauffementCard';
import { Entete } from './Entete';
import { LigneExercice } from './LigneExercice';

export function SeanceView() {
  const { jour } = useParams();
  const { reglages } = useReglages();
  const { etatLigne, basculerCase, setSaisie, reinitialiser, nbCochees } = useSuiviSeance();

  // Pendant une séance, l'écran ne doit pas s'éteindre entre deux exercices.
  useWakeLock(reglages.garderEcranAllume);

  if (!jour || !estJourValide(jour)) return <Navigate to="/" replace />;
  const seance = SEANCES_PAR_JOUR[jour];

  if (seance.repos) {
    return (
      <>
        <Entete titre={libelleJour(jour)} retour />
        <div className="vide">
          <p style={{ fontSize: '1.05rem', color: 'var(--texte)' }}>Repos salle</p>
          <p className="note" style={{ maxWidth: 420, margin: '8px auto 0' }}>
            {seance.noteRepos}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Entete
        titre={`${libelleJour(jour)}${seance.lieu ? ` · ${seance.lieu}` : ''}`}
        retour
        action={
          nbCochees > 0 ? (
            <button
              type="button"
              className="bouton discret"
              onClick={() => {
                if (window.confirm('Effacer les séries cochées et les charges saisies du jour ?')) {
                  reinitialiser();
                }
              }}
            >
              Effacer
            </button>
          ) : undefined
        }
      />

      <p className="note" style={{ marginTop: 14 }}>
        {seance.titre}
      </p>

      <div style={{ marginTop: 14 }}>
        <EchauffementCard />
      </div>

      <ul className="lignes" style={{ listStyle: 'none', padding: 0, margin: '14px 0 0' }}>
        {seance.lignes.map((ligne) => {
          const effectif = exerciceEffectif(ligne, reglages);
          const nbCases = etiquettesSeries(ligne.dosage).length;
          return (
            <LigneExercice
              key={ligne.ordre}
              jour={jour}
              ligne={ligne}
              effectif={effectif}
              etat={etatLigne(ligne.ordre, nbCases)}
              onBasculer={(index) => basculerCase(ligne.ordre, index, nbCases)}
              onSaisie={(index, champ, valeur) =>
                setSaisie(ligne.ordre, effectif.exercice.id, index, champ, valeur, nbCases)
              }
            />
          );
        })}
      </ul>
    </>
  );
}

import { Link, Navigate, useParams } from 'react-router-dom';

import { SEANCES_PAR_JOUR } from '../data/seances';
import { useJournal } from '../hooks/useJournal';
import { useReglages } from '../hooks/useReglages';
import { useSuiviSeance } from '../hooks/useSuiviSeance';
import { useWakeLock } from '../hooks/useWakeLock';
import { estJourValide, libelleJour } from '../lib/jour';
import { estTerminee } from '../lib/journal';
import { etiquettesSeries } from '../lib/format';
import { exerciceEffectif } from '../lib/substitutions';
import type { Jour } from '../types';
import { EchauffementCard } from './EchauffementCard';
import { Entete } from './Entete';
import { LigneExercice } from './LigneExercice';

export function SeanceView() {
  const { jour } = useParams();
  const { reglages } = useReglages();
  const { etatLigne, basculerCase, setSaisie, reinitialiser, nbCochees } = useSuiviSeance();
  const { journal, terminerSeance, annulerSeance } = useJournal();

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

  const totalSeries = seance.lignes.reduce(
    (n, ligne) => n + etiquettesSeries(ligne.dosage).length,
    0,
  );

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

      <ClotureSeance
        jour={jour}
        faites={nbCochees}
        total={totalSeries}
        terminee={estTerminee(journal)}
        onTerminer={() => terminerSeance(jour)}
        onAnnuler={annulerSeance}
      />
    </>
  );
}

type ProposCloture = {
  jour: Jour;
  faites: number;
  total: number;
  terminee: boolean;
  onTerminer: () => void;
  onAnnuler: () => void;
};

/**
 * Clôturer la séance est un geste explicite : c'est lui qui alimente la série
 * de jours suivis. Cocher toutes les cases ne suffit pas — on peut très bien
 * finir sans avoir tout renseigné, ou renseigner sans s'être entraîné.
 */
function ClotureSeance({ jour, faites, total, terminee, onTerminer, onAnnuler }: ProposCloture) {
  if (terminee) {
    return (
      <section className="cloture terminee">
        <p>
          <strong>Séance clôturée.</strong> Elle compte dans ta série.
        </p>
        <div className="cloture-actions">
          <Link className="bouton" to="/progression">
            Voir la progression
          </Link>
          <button type="button" className="bouton discret" onClick={onAnnuler}>
            Annuler la clôture
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="cloture">
      <p className="note">
        {faites} série{faites > 1 ? 's' : ''} sur {total} cochée{faites > 1 ? 's' : ''}.
      </p>
      <button type="button" className="bouton principal" onClick={onTerminer}>
        Terminer la séance de {libelleJour(jour).toLowerCase()}
      </button>
    </section>
  );
}

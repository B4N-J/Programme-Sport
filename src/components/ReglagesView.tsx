import { GLOSSAIRE, REGLES_GENERALES } from '../data/principes';
import { useReglages } from '../hooks/useReglages';
import { LIBELLES_CONDITIONS, type Reglages } from '../lib/substitutions';
import { Entete } from './Entete';

function Interrupteur({ actif, onChange, label }: { actif: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      className="interrupteur"
      role="switch"
      aria-checked={actif}
      aria-pressed={actif}
      aria-label={label}
      onClick={onChange}
    >
      <span />
    </button>
  );
}

export function ReglagesView() {
  const { reglages, basculer } = useReglages();

  const conditions = Object.entries(LIBELLES_CONDITIONS) as [
    keyof typeof LIBELLES_CONDITIONS,
    (typeof LIBELLES_CONDITIONS)[keyof typeof LIBELLES_CONDITIONS],
  ][];

  const confort: { cle: keyof Reglages; question: string; effet: string }[] = [
    {
      cle: 'garderEcranAllume',
      question: "Garder l'écran allumé pendant une séance",
      effet: "Évite de déverrouiller le téléphone entre deux séries. Sans effet sur les navigateurs qui ne gèrent pas l'API.",
    },
    {
      cle: 'sonMinuteur',
      question: 'Bip et vibration en fin de repos',
      effet: 'Le son nécessite une première interaction avec la page pour être autorisé par le navigateur.',
    },
  ];

  return (
    <>
      <Entete titre="Réglages" retour />

      <h2 className="section-titre">Matériel disponible</h2>
      <p className="note" style={{ marginBottom: 12 }}>
        Ces réponses déclenchent les remplacements d’exercices prévus par le programme.
      </p>
      {conditions.map(([cle, libelle]) => (
        <div className="reglage" key={cle}>
          <span className="reglage-corps">
            <span>{libelle.question}</span>
            <span className="reglage-effet">{libelle.effet}</span>
          </span>
          <Interrupteur
            actif={reglages[cle]}
            onChange={() => basculer(cle)}
            label={libelle.question}
          />
        </div>
      ))}

      <h2 className="section-titre">Confort</h2>
      {confort.map((item) => (
        <div className="reglage" key={item.cle}>
          <span className="reglage-corps">
            <span>{item.question}</span>
            <span className="reglage-effet">{item.effet}</span>
          </span>
          <Interrupteur
            actif={Boolean(reglages[item.cle])}
            onChange={() => basculer(item.cle)}
            label={item.question}
          />
        </div>
      ))}

      <h2 className="section-titre">Vocabulaire</h2>
      {GLOSSAIRE.map((entree) => (
        <details className="pliable" key={entree.terme} style={{ marginBottom: 10 }}>
          <summary>{entree.terme}</summary>
          <div className="pliable-corps">
            <p className="note" style={{ margin: 0 }}>
              {entree.definition}
            </p>
          </div>
        </details>
      ))}

      <h2 className="section-titre">Règles générales</h2>
      <ul className="fiche-bloc" style={{ paddingLeft: 20, color: 'var(--texte-doux)' }}>
        {REGLES_GENERALES.map((regle) => (
          <li key={regle} style={{ marginBottom: 6 }}>
            {regle}
          </li>
        ))}
      </ul>
    </>
  );
}

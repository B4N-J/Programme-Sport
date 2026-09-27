import { ECHAUFFEMENT } from '../data/principes';

/** Échauffement standard (section 2.3), replié par défaut en tête de séance. */
export function EchauffementCard() {
  return (
    <details className="pliable">
      <summary>
        Échauffement · 10 min
        <span className="note" style={{ marginLeft: 'auto', fontWeight: 400 }}>
          {ECHAUFFEMENT.length} étapes
        </span>
      </summary>
      <div className="pliable-corps">
        <ol className="liste-numerotee">
          {ECHAUFFEMENT.map((etape) => (
            <li key={etape.titre}>
              <strong style={{ color: 'var(--texte)' }}>{etape.titre}</strong> — {etape.detail}
            </li>
          ))}
        </ol>
      </div>
    </details>
  );
}

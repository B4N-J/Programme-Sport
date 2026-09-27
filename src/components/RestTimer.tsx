import { useMinuteur } from '../hooks/useMinuteur';
import { formatChrono } from '../lib/format';

/** Barre fixe en bas d'écran, visible depuis toutes les vues pendant un repos. */
export function RestTimer() {
  const { actif, restant, ajouter, arreter } = useMinuteur();
  if (!actif) return null;

  const ecoule = restant <= 0;
  const progression = Math.min(100, Math.max(0, (restant / actif.totalSec) * 100));

  return (
    <div className={`minuteur${ecoule ? ' ecoule' : ''}`} role="timer" aria-live="off">
      <div className="minuteur-inner">
        <div className="minuteur-temps">{ecoule ? 'Prêt' : formatChrono(restant)}</div>
        <div className="minuteur-corps">
          <div className="minuteur-libelle">{actif.libelle}</div>
          <div className="minuteur-jauge">
            <span style={{ width: `${progression}%` }} />
          </div>
        </div>
        <div className="minuteur-actions">
          <button type="button" onClick={() => ajouter(-15)} aria-label="Retirer 15 secondes">
            −15
          </button>
          <button type="button" onClick={() => ajouter(15)} aria-label="Ajouter 15 secondes">
            +15
          </button>
          <button type="button" onClick={arreter} aria-label="Arrêter le minuteur">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

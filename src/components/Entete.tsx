import { Link, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

import { Engrenage, Retour } from './Icones';

type Props = {
  titre: string;
  /** Affiche la flèche de retour. Le geste natif fonctionne aussi (HashRouter). */
  retour?: boolean;
  action?: ReactNode;
};

export function Entete({ titre, retour = false, action }: Props) {
  const navigate = useNavigate();

  return (
    <header className="entete">
      {retour && (
        <button
          type="button"
          className="bouton-icone"
          onClick={() => navigate(-1)}
          aria-label="Retour"
        >
          <Retour />
        </button>
      )}
      <h1>{titre}</h1>
      {action ??
        (!retour && (
          <Link to="/reglages" className="bouton-icone" aria-label="Réglages">
            <Engrenage />
          </Link>
        ))}
    </header>
  );
}

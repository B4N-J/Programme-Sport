import { useState } from 'react';

import { metriquePertinente, type PointCourbe } from '../lib/journal';

const LARGEUR = 320;
const HAUTEUR = 150;
const MARGE = { haut: 12, bas: 26, gauche: 34, droite: 10 };

type Props = { points: PointCourbe[] };

/**
 * Évolution d'un exercice, en SVG écrit à la main : une courbe à une série ne
 * justifie pas une bibliothèque de graphiques, qui pèserait plus lourd que
 * tout le reste de l'app réunie.
 */
export function Courbe({ points }: Props) {
  const [choisi, setChoisi] = useState<number | null>(null);

  if (points.length === 0) {
    return <p className="courbe-vide">Pas encore de séance enregistrée pour cet exercice.</p>;
  }

  const metrique = metriquePertinente(points);
  const unite = metrique === 'charge' ? 'kg' : 'reps';
  const valeurs = points.map((p) => (metrique === 'charge' ? p.charge : p.reps));

  const max = Math.max(...valeurs);
  const min = Math.min(...valeurs);
  // Une progression de 20 à 22 kg doit se voir : on n'aplatit pas l'échelle à
  // zéro, mais on garde une marge pour qu'un plateau ne ressemble pas à une
  // dent de scie.
  const etendue = max - min;
  const bas = etendue === 0 ? Math.max(0, min - 1) : min - etendue * 0.2;
  const haut = etendue === 0 ? max + 1 : max + etendue * 0.2;

  const largeurUtile = LARGEUR - MARGE.gauche - MARGE.droite;
  const hauteurUtile = HAUTEUR - MARGE.haut - MARGE.bas;

  const x = (i: number) =>
    MARGE.gauche + (points.length === 1 ? largeurUtile / 2 : (i / (points.length - 1)) * largeurUtile);
  const y = (v: number) => MARGE.haut + hauteurUtile - ((v - bas) / (haut - bas)) * hauteurUtile;

  const trace = valeurs.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)} ${y(v)}`).join(' ');
  const aire = `${trace} L${x(points.length - 1)} ${MARGE.haut + hauteurUtile} L${x(0)} ${
    MARGE.haut + hauteurUtile
  } Z`;

  const actif = choisi ?? points.length - 1;
  const pointActif = points[actif];
  const valeurActive = valeurs[actif];
  const premier = valeurs[0];
  const ecart = valeurActive - premier;

  return (
    <div className="courbe">
      <svg
        viewBox={`0 0 ${LARGEUR} ${HAUTEUR}`}
        className="courbe-svg"
        role="img"
        aria-label={`Évolution en ${unite}, de ${min} à ${max} sur ${points.length} séances`}
      >
        <line
          x1={MARGE.gauche}
          y1={MARGE.haut}
          x2={MARGE.gauche}
          y2={MARGE.haut + hauteurUtile}
          className="courbe-axe"
        />
        <line
          x1={MARGE.gauche}
          y1={MARGE.haut + hauteurUtile}
          x2={LARGEUR - MARGE.droite}
          y2={MARGE.haut + hauteurUtile}
          className="courbe-axe"
        />

        <text x={MARGE.gauche - 5} y={y(max) + 4} className="courbe-graduation" textAnchor="end">
          {arrondi(max)}
        </text>
        {min !== max && (
          <text x={MARGE.gauche - 5} y={y(min) + 4} className="courbe-graduation" textAnchor="end">
            {arrondi(min)}
          </text>
        )}

        {points.length > 1 && <path d={aire} className="courbe-aire" />}
        {points.length > 1 && <path d={trace} className="courbe-trace" />}

        {points.map((p, i) => (
          <g key={p.date}>
            <circle
              cx={x(i)}
              cy={y(valeurs[i])}
              r={i === actif ? 4.5 : 3}
              className={`courbe-point${i === actif ? ' actif' : ''}`}
            />
            {/* Cible tactile élargie : un point de 3 px n'est pas cliquable au pouce. */}
            <rect
              x={x(i) - 14}
              y={MARGE.haut}
              width={28}
              height={hauteurUtile}
              fill="transparent"
              onClick={() => setChoisi(i)}
            >
              <title>{`${dateCourte(p.date)} — ${arrondi(valeurs[i])} ${unite}`}</title>
            </rect>
          </g>
        ))}

        <text x={MARGE.gauche} y={HAUTEUR - 8} className="courbe-graduation">
          {dateCourte(points[0].date)}
        </text>
        {points.length > 1 && (
          <text
            x={LARGEUR - MARGE.droite}
            y={HAUTEUR - 8}
            className="courbe-graduation"
            textAnchor="end"
          >
            {dateCourte(points[points.length - 1].date)}
          </text>
        )}
      </svg>

      <p className="courbe-legende">
        <strong>
          {dateCourte(pointActif.date)} : {arrondi(valeurActive)} {unite}
        </strong>
        {metrique === 'charge' && pointActif.volume > 0 && (
          <> · volume {arrondi(pointActif.volume)} kg</>
        )}
        {points.length > 1 && (
          <>
            {' · '}
            <span className={ecart > 0 ? 'hausse' : undefined}>
              {ecart > 0 ? '+' : ''}
              {arrondi(ecart)} {unite} depuis le début
            </span>
          </>
        )}
      </p>
    </div>
  );
}

const arrondi = (n: number) => Math.round(n * 10) / 10;

/** « 2026-09-27 » → « 27/09 ». */
export function dateCourte(iso: string): string {
  const [, mois, jour] = iso.split('-');
  return `${jour}/${mois}`;
}

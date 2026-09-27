import { useCallback, useState } from 'react';

/**
 * État persisté dans `localStorage`.
 *
 * Toutes les lectures et écritures sont protégées : en navigation privée, ou
 * si le stockage du site a été vidé ou bloqué, l'accès peut lever une
 * exception. L'app doit rester utilisable sans stockage, la persistance n'est
 * qu'un confort.
 */
export function useLocalStorage<T>(cle: string, valeurParDefaut: T) {
  const [valeur, setValeurLocale] = useState<T>(() => lire(cle, valeurParDefaut));

  const setValeur = useCallback(
    (maj: T | ((precedent: T) => T)) => {
      setValeurLocale((precedent) => {
        const suivante = typeof maj === 'function' ? (maj as (p: T) => T)(precedent) : maj;
        ecrire(cle, suivante);
        return suivante;
      });
    },
    [cle],
  );

  return [valeur, setValeur] as const;
}

export function lire<T>(cle: string, valeurParDefaut: T): T {
  try {
    const brut = window.localStorage.getItem(cle);
    if (brut === null) return valeurParDefaut;
    return JSON.parse(brut) as T;
  } catch {
    return valeurParDefaut;
  }
}

export function ecrire(cle: string, valeur: unknown): void {
  try {
    window.localStorage.setItem(cle, JSON.stringify(valeur));
  } catch {
    // Stockage indisponible ou plein : on continue sans persister.
  }
}

export function supprimer(cle: string): void {
  try {
    window.localStorage.removeItem(cle);
  } catch {
    // Idem.
  }
}

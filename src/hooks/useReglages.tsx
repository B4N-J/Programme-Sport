import { createContext, useContext, type ReactNode } from 'react';

import { REGLAGES_PAR_DEFAUT, type Reglages } from '../lib/substitutions';
import { useLocalStorage } from './useLocalStorage';

type ContexteReglages = {
  reglages: Reglages;
  basculer: (cle: keyof Reglages) => void;
};

const Contexte = createContext<ContexteReglages | null>(null);

export function ReglagesProvider({ children }: { children: ReactNode }) {
  const [reglages, setReglages] = useLocalStorage<Reglages>('muscu:reglages', REGLAGES_PAR_DEFAUT);

  const basculer = (cle: keyof Reglages) =>
    setReglages((precedents) => ({ ...precedents, [cle]: !precedents[cle] }));

  // Fusion avec les valeurs par défaut : un réglage ajouté après coup ne doit
  // pas rester `undefined` chez quelqu'un qui a déjà des données stockées.
  const complets = { ...REGLAGES_PAR_DEFAUT, ...reglages };

  return <Contexte.Provider value={{ reglages: complets, basculer }}>{children}</Contexte.Provider>;
}

export function useReglages(): ContexteReglages {
  const contexte = useContext(Contexte);
  if (!contexte) throw new Error('useReglages doit être utilisé dans un ReglagesProvider');
  return contexte;
}

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { cleDuJour } from '../lib/jour';
import {
  avecSeanceTerminee,
  avecSeries,
  CLE_JOURNAL,
  fusionner,
  JOURNAL_VIDE,
  migrerAnciennesCles,
  sansSeanceTerminee,
  type Journal,
} from '../lib/journal';
import type { SerieRealisee } from '../lib/progression';
import {
  CLE_CONFIG_SYNC,
  CONFIG_SYNC_VIDE,
  synchroniser,
  syncConfiguree,
  type ConfigSync,
  type EtatSync,
} from '../lib/sync';
import type { Jour } from '../types';
import { ecrire, lire, useLocalStorage } from './useLocalStorage';

type ValeurJournal = {
  journal: Journal;
  configSync: ConfigSync;
  etatSync: EtatSync;
  enregistrerSeries: (exerciceId: string, series: SerieRealisee[]) => void;
  terminerSeance: (jour: Jour) => void;
  annulerSeance: () => void;
  setConfigSync: (config: ConfigSync) => void;
  /** Fusionne un journal importé avec l'actuel. Rien n'est écrasé. */
  importer: (journal: Journal) => void;
  remplacer: (journal: Journal) => void;
  synchroniserMaintenant: () => void;
};

const Contexte = createContext<ValeurJournal | null>(null);

/** Délai avant de pousser vers le serveur, pour ne pas écrire à chaque frappe. */
const DELAI_POUSSEE_MS = 4000;

export function JournalProvider({ children }: { children: ReactNode }) {
  const [journal, setJournalLocal] = useState<Journal>(() =>
    migrerAnciennesCles(lire<Journal>(CLE_JOURNAL, JOURNAL_VIDE)),
  );
  const [configSync, setConfigSync] = useLocalStorage<ConfigSync>(
    CLE_CONFIG_SYNC,
    CONFIG_SYNC_VIDE,
  );
  const [etatSync, setEtatSync] = useState<EtatSync>({ etat: 'inactif' });

  const setJournal = useCallback((maj: (precedent: Journal) => Journal) => {
    setJournalLocal((precedent) => {
      const suivant = maj(precedent);
      ecrire(CLE_JOURNAL, suivant);
      return suivant;
    });
  }, []);

  // Le journal le plus frais, lisible depuis les effets sans les relancer.
  const courant = useRef(journal);
  courant.current = journal;

  const pousser = useCallback(async () => {
    if (!syncConfiguree(configSync)) {
      setEtatSync({ etat: 'inactif' });
      return;
    }
    setEtatSync({ etat: 'en-cours' });
    try {
      const fusionne = await synchroniser(configSync, courant.current);
      setJournal((precedent) => {
        const suivant = fusionner(precedent, fusionne);
        return suivant;
      });
      setEtatSync({ etat: 'ok', a: Date.now() });
    } catch (erreur) {
      setEtatSync({ etat: 'erreur', message: (erreur as Error).message });
    }
  }, [configSync, setJournal]);

  // Les effets ci-dessous dépendent des valeurs de la configuration, jamais de
  // l'objet qui les porte : celui-ci est recréé à chaque frappe dans les
  // réglages, et déclencherait une requête par caractère saisi.
  const pousserRef = useRef(pousser);
  pousserRef.current = pousser;
  const { url, cle, profil } = configSync;
  const pret = syncConfiguree(configSync);

  // Au démarrage et au retour au premier plan : on récupère ce qu'un autre
  // appareil a pu écrire. Sans réseau, l'échec est silencieux et l'app
  // continue sur le journal local.
  useEffect(() => {
    if (!pret) return;
    // Le délai laisse finir la saisie des identifiants avant le premier appel.
    const initial = window.setTimeout(() => void pousserRef.current(), 800);
    const auRetour = () => {
      if (document.visibilityState === 'visible') void pousserRef.current();
    };
    document.addEventListener('visibilitychange', auRetour);
    window.addEventListener('online', auRetour);
    return () => {
      window.clearTimeout(initial);
      document.removeEventListener('visibilitychange', auRetour);
      window.removeEventListener('online', auRetour);
    };
  }, [pret, url, cle, profil]);

  // Après chaque modification, poussée différée.
  const premierRendu = useRef(true);
  useEffect(() => {
    if (premierRendu.current) {
      premierRendu.current = false;
      return;
    }
    if (!pret) return;
    const minuterie = window.setTimeout(() => void pousserRef.current(), DELAI_POUSSEE_MS);
    return () => window.clearTimeout(minuterie);
  }, [journal.majA, pret]);

  const valeur = useMemo<ValeurJournal>(
    () => ({
      journal,
      configSync,
      etatSync,
      enregistrerSeries: (exerciceId, series) =>
        setJournal((precedent) => avecSeries(precedent, exerciceId, series)),
      terminerSeance: (jour) => setJournal((precedent) => avecSeanceTerminee(precedent, jour)),
      annulerSeance: () => setJournal((precedent) => sansSeanceTerminee(precedent)),
      setConfigSync,
      importer: (importe) => setJournal((precedent) => fusionner(precedent, importe)),
      remplacer: (remplacant) => setJournal(() => ({ ...remplacant, majA: Date.now() })),
      synchroniserMaintenant: () => void pousser(),
    }),
    [journal, configSync, etatSync, setJournal, setConfigSync, pousser],
  );

  return <Contexte.Provider value={valeur}>{children}</Contexte.Provider>;
}

export function useJournal(): ValeurJournal {
  const valeur = useContext(Contexte);
  if (valeur === null) throw new Error('useJournal doit être utilisé dans un JournalProvider');
  return valeur;
}

/** Nom de fichier d'export : « muscu-2026-09-27.json ». */
export const nomFichierExport = () => `muscu-${cleDuJour()}.json`;

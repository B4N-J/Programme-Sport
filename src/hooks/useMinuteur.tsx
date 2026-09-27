import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { ecrire, lire, supprimer } from './useLocalStorage';

const CLE = 'muscu:minuteur';

type MinuteurActif = {
  /** Horodatage absolu de fin. */
  finAt: number;
  /** Durée initiale, pour l'affichage de la barre de progression. */
  totalSec: number;
  libelle: string;
};

type ContexteMinuteur = {
  actif: MinuteurActif | null;
  /** Secondes restantes, recalculées depuis `finAt` (jamais décrémentées). */
  restant: number;
  demarrer: (totalSec: number, libelle: string) => void;
  ajouter: (deltaSec: number) => void;
  arreter: () => void;
};

const Contexte = createContext<ContexteMinuteur | null>(null);

function restantDepuis(actif: MinuteurActif | null): number {
  if (!actif) return 0;
  return Math.max(0, (actif.finAt - Date.now()) / 1000);
}

export function MinuteurProvider({
  children,
  sonActive,
}: {
  children: ReactNode;
  sonActive: boolean;
}) {
  // Restauré depuis le stockage : iOS peut décharger une PWA mise en
  // arrière-plan et la recharger ; le repos en cours doit survivre.
  const [actif, setActif] = useState<MinuteurActif | null>(() => {
    const stocke = lire<MinuteurActif | null>(CLE, null);
    return stocke && stocke.finAt > Date.now() ? stocke : null;
  });
  const [restant, setRestant] = useState(() => restantDepuis(actif));
  const sonnerieFaite = useRef(false);
  const audioRef = useRef<AudioContext | null>(null);

  /**
   * Le contexte audio doit être créé pendant un geste de l'utilisateur :
   * sur iOS, un `AudioContext` instancié au chargement reste suspendu et le
   * bip de fin de repos ne se fait jamais entendre.
   */
  const preparerAudio = useCallback(() => {
    if (!sonActive) return;
    try {
      audioRef.current ??= new AudioContext();
      void audioRef.current.resume();
    } catch {
      audioRef.current = null;
    }
  }, [sonActive]);

  const biper = useCallback(() => {
    const ctx = audioRef.current;
    if (!sonActive || !ctx) return;
    try {
      const maintenant = ctx.currentTime;
      for (const decalage of [0, 0.22]) {
        const oscillateur = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillateur.frequency.value = 880;
        gain.gain.setValueAtTime(0.0001, maintenant + decalage);
        gain.gain.exponentialRampToValueAtTime(0.3, maintenant + decalage + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, maintenant + decalage + 0.18);
        oscillateur.connect(gain).connect(ctx.destination);
        oscillateur.start(maintenant + decalage);
        oscillateur.stop(maintenant + decalage + 0.2);
      }
    } catch {
      // Audio indisponible : la vibration et l'affichage suffisent.
    }
    try {
      navigator.vibrate?.([120, 80, 120]);
    } catch {
      // Absent d'iOS.
    }
  }, [sonActive]);

  const demarrer = useCallback(
    (totalSec: number, libelle: string) => {
      preparerAudio();
      sonnerieFaite.current = false;
      const suivant = { finAt: Date.now() + totalSec * 1000, totalSec, libelle };
      setActif(suivant);
      setRestant(totalSec);
      ecrire(CLE, suivant);
    },
    [preparerAudio],
  );

  const ajouter = useCallback((deltaSec: number) => {
    setActif((precedent) => {
      if (!precedent) return precedent;
      const finAt = Math.max(Date.now(), precedent.finAt + deltaSec * 1000);
      const suivant = {
        ...precedent,
        finAt,
        totalSec: Math.max(precedent.totalSec, (finAt - Date.now()) / 1000),
      };
      if (finAt > Date.now()) sonnerieFaite.current = false;
      ecrire(CLE, suivant);
      return suivant;
    });
  }, []);

  const arreter = useCallback(() => {
    setActif(null);
    setRestant(0);
    supprimer(CLE);
  }, []);

  // Le restant est TOUJOURS recalculé depuis `finAt`. Décrémenter un compteur
  // dériverait : iOS gèle les timers quand l'écran s'éteint ou que l'app passe
  // en arrière-plan, et le repos serait systématiquement trop long.
  useEffect(() => {
    if (!actif) return;

    const rafraichir = () => {
      const reste = restantDepuis(actif);
      setRestant(reste);
      if (reste <= 0 && !sonnerieFaite.current) {
        sonnerieFaite.current = true;
        biper();
      }
    };

    rafraichir();
    const intervalle = window.setInterval(rafraichir, 250);
    document.addEventListener('visibilitychange', rafraichir);
    window.addEventListener('focus', rafraichir);

    return () => {
      window.clearInterval(intervalle);
      document.removeEventListener('visibilitychange', rafraichir);
      window.removeEventListener('focus', rafraichir);
    };
  }, [actif, biper]);

  return (
    <Contexte.Provider value={{ actif, restant, demarrer, ajouter, arreter }}>
      {children}
    </Contexte.Provider>
  );
}

export function useMinuteur(): ContexteMinuteur {
  const contexte = useContext(Contexte);
  if (!contexte) throw new Error('useMinuteur doit être utilisé dans un MinuteurProvider');
  return contexte;
}

import { useEffect } from 'react';

/**
 * Empêche l'extinction de l'écran pendant une séance.
 * L'API manque sur les Safari antérieurs à iOS 16.4 : l'absence est silencieuse.
 */
export function useWakeLock(actif: boolean): void {
  useEffect(() => {
    if (!actif || !('wakeLock' in navigator)) return;

    let verrou: WakeLockSentinel | null = null;
    let annule = false;

    const demander = async () => {
      try {
        verrou = await navigator.wakeLock.request('screen');
      } catch {
        // Refusé (onglet en arrière-plan, batterie faible) : sans conséquence.
      }
    };

    // Le verrou est relâché automatiquement quand l'onglet passe en arrière-plan.
    const reprendre = () => {
      if (!annule && document.visibilityState === 'visible') void demander();
    };

    void demander();
    document.addEventListener('visibilitychange', reprendre);

    return () => {
      annule = true;
      document.removeEventListener('visibilitychange', reprendre);
      void verrou?.release().catch(() => undefined);
    };
  }, [actif]);
}

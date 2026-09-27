import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { FicheExercice } from './components/FicheExercice';
import { ReglagesView } from './components/ReglagesView';
import { RestTimer } from './components/RestTimer';
import { SeanceView } from './components/SeanceView';
import { SemaineView } from './components/SemaineView';
import { MinuteurProvider } from './hooks/useMinuteur';
import { ReglagesProvider, useReglages } from './hooks/useReglages';

/**
 * Le minuteur vit au-dessus des routes : le repos continue de tourner quand on
 * ouvre la fiche d'un exercice pendant la pause.
 */
function Contenu() {
  const { reglages } = useReglages();

  return (
    <MinuteurProvider sonActive={reglages.sonMinuteur}>
      <div className="app">
        <Routes>
          <Route path="/" element={<SemaineView />} />
          <Route path="/jour/:jour" element={<SeanceView />} />
          <Route path="/exercice/:id" element={<FicheExercice />} />
          <Route path="/reglages" element={<ReglagesView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <RestTimer />
    </MinuteurProvider>
  );
}

export function App() {
  return (
    // HashRouter : aucune règle de réécriture côté serveur (GitHub Pages n'en
    // accepte pas) et le geste « retour » fonctionne en PWA plein écran.
    <HashRouter>
      <ReglagesProvider>
        <Contenu />
      </ReglagesProvider>
    </HashRouter>
  );
}

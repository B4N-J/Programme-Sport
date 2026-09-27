import { useRef, useState } from 'react';

import { nomFichierExport, useJournal } from '../hooks/useJournal';
import { JOURNAL_VIDE, type Journal } from '../lib/journal';
import { SQL_INSTALLATION, syncConfiguree, TABLE } from '../lib/sync';

export function Sauvegarde() {
  const { journal, configSync, etatSync, setConfigSync, importer, synchroniserMaintenant } =
    useJournal();
  const fichier = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [sqlVisible, setSqlVisible] = useState(false);

  const nbSeances = Object.keys(journal.seances).length;
  const nbExercices = Object.keys(journal.historique).length;

  function exporter() {
    const blob = new Blob([JSON.stringify(journal, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const lien = document.createElement('a');
    lien.href = url;
    lien.download = nomFichierExport();
    lien.click();
    URL.revokeObjectURL(url);
  }

  async function importerFichier(evenement: React.ChangeEvent<HTMLInputElement>) {
    const choisi = evenement.target.files?.[0];
    if (!choisi) return;
    try {
      const contenu = JSON.parse(await choisi.text()) as Partial<Journal>;
      if (typeof contenu !== 'object' || contenu === null || !contenu.historique)
        throw new Error('Ce fichier n’est pas une sauvegarde du programme.');
      // Fusion et non remplacement : importer une vieille sauvegarde ne doit
      // jamais effacer des séances plus récentes faites sur cet appareil.
      importer({ ...JOURNAL_VIDE, ...contenu });
      setMessage('Sauvegarde fusionnée avec les données de cet appareil.');
    } catch (erreur) {
      setMessage((erreur as Error).message);
    } finally {
      evenement.target.value = '';
    }
  }

  return (
    <>
      <h2 className="section-titre">Sauvegarde</h2>
      <p className="note" style={{ marginBottom: 12 }}>
        {nbSeances} séance{nbSeances > 1 ? 's' : ''} et {nbExercices} exercice
        {nbExercices > 1 ? 's' : ''} suivi{nbExercices > 1 ? 's' : ''} sur cet appareil. Sans
        synchronisation, ces données disparaissent avec le navigateur.
      </p>

      <div className="cloture-actions">
        <button type="button" className="bouton" onClick={exporter}>
          Exporter un fichier
        </button>
        <button type="button" className="bouton" onClick={() => fichier.current?.click()}>
          Importer un fichier
        </button>
        <input
          ref={fichier}
          type="file"
          accept="application/json,.json"
          onChange={importerFichier}
          hidden
        />
      </div>

      <h2 className="section-titre">Synchronisation</h2>
      <p className="note" style={{ marginBottom: 12 }}>
        Renseigne ici les identifiants de ta base Supabase pour que le téléphone et l’ordinateur
        partagent le même historique. Ils restent sur cet appareil : rien n’est publié dans le
        code de l’app.
      </p>

      <label className="champ-texte">
        <span className="etiquette">Adresse du projet</span>
        <input
          type="url"
          inputMode="url"
          autoComplete="off"
          placeholder="https://xxxxx.supabase.co"
          value={configSync.url}
          onChange={(e) => setConfigSync({ ...configSync, url: e.target.value })}
        />
      </label>

      <label className="champ-texte">
        <span className="etiquette">Clé publique « anon »</span>
        <input
          type="password"
          autoComplete="off"
          placeholder="eyJhbGciOi…"
          value={configSync.cle}
          onChange={(e) => setConfigSync({ ...configSync, cle: e.target.value })}
        />
      </label>

      <div className="cloture-actions">
        <button
          type="button"
          className="bouton principal"
          onClick={synchroniserMaintenant}
          disabled={!syncConfiguree(configSync) || etatSync.etat === 'en-cours'}
        >
          {etatSync.etat === 'en-cours' ? 'Synchronisation…' : 'Synchroniser maintenant'}
        </button>
        <button type="button" className="bouton discret" onClick={() => setSqlVisible((v) => !v)}>
          {sqlVisible ? 'Masquer le script' : 'Script de la table'}
        </button>
      </div>

      <p className={`etat-sync ${etatSync.etat}`}>{libelleEtat(etatSync, configSync.url)}</p>

      {sqlVisible && (
        <>
          <p className="note">
            À coller une seule fois dans l’éditeur SQL de Supabase pour créer la table{' '}
            <code>{TABLE}</code>.
          </p>
          <pre className="sql">{SQL_INSTALLATION}</pre>
        </>
      )}

      {message && <p className="note">{message}</p>}
    </>
  );
}

function libelleEtat(etat: ReturnType<typeof useJournal>['etatSync'], url: string): string {
  if (etat.etat === 'en-cours') return 'Envoi en cours…';
  if (etat.etat === 'ok')
    return `Synchronisé à ${new Date(etat.a).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    })}.`;
  if (etat.etat === 'erreur') return `Échec : ${etat.message}`;
  return url.trim() === ''
    ? 'Non configurée : les données restent sur cet appareil.'
    : 'En attente d’une première synchronisation.';
}

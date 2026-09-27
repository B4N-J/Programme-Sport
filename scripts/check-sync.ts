/**
 * Test de la couche de synchronisation contre un faux PostgREST.
 *
 * Les identifiants Supabase réels ne sont sur aucune machine de
 * développement : ce serveur reproduit le contrat de l'API (filtre `id=eq.`,
 * en-têtes `apikey`, upsert par `Prefer: resolution=merge-duplicates`) pour
 * valider la forme des requêtes et le cycle complet de fusion.
 *
 * Usage : npm run check:sync
 */
import { createServer } from 'node:http';

import { JOURNAL_VIDE, type Journal } from '../src/lib/journal.ts';
import { lireDistant, synchroniser, TABLE, type ConfigSync } from '../src/lib/sync.ts';

const erreurs: string[] = [];
const CLE = 'cle-de-test';

function attendre(nom: string, obtenu: unknown, attendu: unknown): void {
  const a = JSON.stringify(obtenu);
  const b = JSON.stringify(attendu);
  if (a !== b) erreurs.push(`${nom} : attendu ${b}, obtenu ${a}`);
}

/** Lignes du faux serveur, indexées comme la table réelle. */
const lignes = new Map<string, Journal>();
const recu: { methode: string; chemin: string; entetes: Record<string, string> }[] = [];

const serveur = createServer((requete, reponse) => {
  const url = new URL(requete.url!, 'http://localhost');
  recu.push({
    methode: requete.method!,
    chemin: `${url.pathname}${url.search}`,
    entetes: requete.headers as Record<string, string>,
  });

  if (requete.headers.apikey !== CLE) {
    reponse.writeHead(401).end('{}');
    return;
  }
  if (url.pathname !== `/rest/v1/${TABLE}`) {
    reponse.writeHead(404).end('{}');
    return;
  }

  if (requete.method === 'GET') {
    const filtre = url.searchParams.get('id') ?? '';
    const id = filtre.replace(/^eq\./, '');
    const contenu = lignes.get(id);
    reponse.writeHead(200, { 'Content-Type': 'application/json' });
    reponse.end(JSON.stringify(contenu ? [{ contenu }] : []));
    return;
  }

  if (requete.method === 'POST') {
    let corps = '';
    requete.on('data', (bloc) => (corps += bloc));
    requete.on('end', () => {
      const { id, contenu } = JSON.parse(corps) as { id: string; contenu: Journal };
      lignes.set(id, contenu);
      reponse.writeHead(201, { 'Content-Type': 'application/json' }).end('[]');
    });
    return;
  }

  reponse.writeHead(405).end('{}');
});

await new Promise<void>((resoudre) => serveur.listen(0, '127.0.0.1', resoudre));
const port = (serveur.address() as { port: number }).port;
const config: ConfigSync = { url: `http://127.0.0.1:${port}/`, cle: CLE, profil: 'principal' };

// --------------------------------------------------- Première synchronisation
attendre('base vide', await lireDistant(config), null);

const telephone: Journal = {
  seances: { '2026-09-21': { jour: 'lundi', termineeA: '2026-09-21T19:00:00.000Z' } },
  historique: { dc_halteres: [{ date: '2026-09-21', series: [{ kg: 20, reps: 10 }] }] },
  majA: 1,
};
await synchroniser(config, telephone);
attendre('poussée initiale', await lireDistant(config), telephone);

// ------------------------------------- Second appareil : rien ne doit se perdre
const ordinateur: Journal = {
  seances: { '2026-09-22': { jour: 'mardi', termineeA: '2026-09-22T19:00:00.000Z' } },
  historique: { curl_marteau: [{ date: '2026-09-22', series: [{ kg: 12, reps: 12 }] }] },
  majA: 2,
};
const apresFusion = await synchroniser(config, ordinateur);
attendre('fusion : les deux séances', Object.keys(apresFusion.seances).sort(), [
  '2026-09-21',
  '2026-09-22',
]);
attendre('fusion : les deux exercices', Object.keys(apresFusion.historique).sort(), [
  'curl_marteau',
  'dc_halteres',
]);

// Le téléphone resynchronise et récupère ce que l'ordinateur a écrit.
const apresRetour = await synchroniser(config, telephone);
attendre('retour sur le premier appareil', Object.keys(apresRetour.seances).sort(), [
  '2026-09-21',
  '2026-09-22',
]);

// ------------------------------------------------------ Forme des requêtes
const get = recu.find((r) => r.methode === 'GET')!;
attendre('filtre de ligne', get.chemin.includes('id=eq.principal'), true);
attendre('colonne demandée', get.chemin.includes('select=contenu'), true);

const post = recu.find((r) => r.methode === 'POST')!;
attendre('upsert déclaré', post.entetes['prefer'], 'resolution=merge-duplicates');
attendre('conflit sur la clé primaire', post.chemin.includes('on_conflict=id'), true);
attendre('jeton porteur', post.entetes['authorization'], `Bearer ${CLE}`);

// ------------------------------------------------------- Erreurs explicites
try {
  await lireDistant({ ...config, cle: 'mauvaise' });
  erreurs.push('clé refusée : aucune erreur levée');
} catch (e) {
  attendre('message de clé refusée', (e as Error).message.startsWith('Clé refusée'), true);
}

// Un journal vide ne doit rien casser.
await synchroniser({ ...config, profil: 'autre' }, JOURNAL_VIDE);
attendre('profil séparé', Object.keys((await lireDistant({ ...config, profil: 'autre' }))!.seances), []);

serveur.close();

if (erreurs.length > 0) {
  console.error(`\n✗ ${erreurs.length} problème(s) de synchronisation :\n`);
  for (const e of erreurs) console.error(`  · ${e}`);
  console.error('');
  process.exit(1);
}

console.log('✓ Synchronisation : requêtes conformes, fusion sans perte entre deux appareils.');

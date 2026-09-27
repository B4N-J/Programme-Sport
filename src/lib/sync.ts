import { fusionner, type Journal } from './journal';

/**
 * Synchronisation du journal vers une base Supabase.
 *
 * Les identifiants ne sont **pas** compilés dans le bundle : GitHub Pages
 * impose un dépôt public sur le plan gratuit, et tout ce qui est compilé y
 * serait lisible. Ils sont saisis une fois par appareil dans les réglages et
 * restent dans `localStorage`. Un build privé peut malgré tout les fournir
 * par variables d'environnement.
 */
export type ConfigSync = {
  url: string;
  cle: string;
  /** Identifiant de la ligne : un même compte peut servir plusieurs usages. */
  profil: string;
};

export const CLE_CONFIG_SYNC = 'muscu:sync';

/** `import.meta.env` n'existe pas hors de Vite : les scripts de contrôle
 *  chargent ce module directement sous Node. */
const env = (import.meta.env ?? {}) as ImportMetaEnv;

export const CONFIG_SYNC_VIDE: ConfigSync = {
  url: env.VITE_SUPABASE_URL ?? '',
  cle: env.VITE_SUPABASE_ANON_KEY ?? '',
  profil: 'principal',
};

export const TABLE = 'journal';

export const syncConfiguree = (config: ConfigSync) =>
  config.url.trim() !== '' && config.cle.trim() !== '';

export type EtatSync =
  | { etat: 'inactif' }
  | { etat: 'en-cours' }
  | { etat: 'ok'; a: number }
  | { etat: 'erreur'; message: string };

function entetes(config: ConfigSync): HeadersInit {
  return {
    apikey: config.cle,
    Authorization: `Bearer ${config.cle}`,
    'Content-Type': 'application/json',
  };
}

const racine = (config: ConfigSync) =>
  `${config.url.trim().replace(/\/+$/, '')}/rest/v1/${TABLE}`;

/** Journal stocké côté serveur, ou `null` si la ligne n'existe pas encore. */
export async function lireDistant(config: ConfigSync): Promise<Journal | null> {
  const reponse = await fetch(
    `${racine(config)}?id=eq.${encodeURIComponent(config.profil)}&select=contenu`,
    { headers: entetes(config) },
  );
  if (!reponse.ok) throw new Error(await messageErreur(reponse));

  const lignes = (await reponse.json()) as { contenu: Journal }[];
  return lignes[0]?.contenu ?? null;
}

export async function ecrireDistant(config: ConfigSync, journal: Journal): Promise<void> {
  const reponse = await fetch(`${racine(config)}?on_conflict=id`, {
    method: 'POST',
    headers: { ...entetes(config), Prefer: 'resolution=merge-duplicates' },
    body: JSON.stringify({
      id: config.profil,
      contenu: journal,
      maj_a: new Date().toISOString(),
    }),
  });
  if (!reponse.ok) throw new Error(await messageErreur(reponse));
}

/**
 * Récupère le distant, le fusionne avec le local et renvoie le résultat.
 * La fusion est symétrique : aucune séance n'est perdue, quel que soit
 * l'appareil qui a écrit en dernier.
 */
export async function synchroniser(config: ConfigSync, local: Journal): Promise<Journal> {
  const distant = await lireDistant(config);
  const fusionne = distant === null ? local : fusionner(local, distant);
  await ecrireDistant(config, fusionne);
  return fusionne;
}

async function messageErreur(reponse: Response): Promise<string> {
  if (reponse.status === 401 || reponse.status === 403)
    return 'Clé refusée. Vérifie la clé « anon » et la règle d’accès de la table.';
  if (reponse.status === 404) return `Table « ${TABLE} » introuvable à cette adresse.`;
  try {
    const corps = (await reponse.json()) as { message?: string };
    if (corps.message) return corps.message;
  } catch {
    // Réponse sans corps JSON exploitable.
  }
  return `Erreur ${reponse.status}.`;
}

/** Script à coller dans l’éditeur SQL de Supabase pour préparer la base. */
export const SQL_INSTALLATION = `create table if not exists ${TABLE} (
  id text primary key,
  contenu jsonb not null,
  maj_a timestamptz not null default now()
);

alter table ${TABLE} enable row level security;

create policy "acces anon" on ${TABLE}
  for all to anon using (true) with check (true);`;

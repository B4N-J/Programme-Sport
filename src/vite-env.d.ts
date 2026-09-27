/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Identifiants Supabase pour un déploiement privé. Vides par défaut : ils
   *  se saisissent dans les réglages, pour ne rien publier dans le bundle. */
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

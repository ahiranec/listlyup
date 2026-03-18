import { createClient } from "@supabase/supabase-js";

// 🔑 Leer variables desde Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 🧠 Validación segura (NO rompe la app)
const isSupabaseConfigured =
  typeof supabaseUrl === "string" &&
  supabaseUrl.startsWith("https://") &&
  typeof supabaseAnonKey === "string" &&
  supabaseAnonKey.length > 0;

// 🧩 Crear cliente solo si está bien configurado
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// 🚩 Flag exportado para repos
export { isSupabaseConfigured };
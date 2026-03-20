import type { CurrentUser } from "../../types";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";

/**
 * UsersRepo — Supabase-connected version (SAFE MODE)
 *
 * Objetivo:
 * - Obtener usuario desde tabla profiles
 * - Mantener compatibilidad con el tipo CurrentUser
 * - No romper nada si Supabase falla
 */

export const usersRepo = {
  /**
   * Obtiene el usuario actual desde Supabase Auth + profiles
   */
  async getCurrentUser(): Promise<CurrentUser | undefined> {
    if (!isSupabaseConfigured || !supabase) {
      console.warn("[usersRepo] Supabase not configured");
      return undefined;
    }

    // 1. obtener usuario autenticado
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.warn("[usersRepo] No authenticated user");
      return undefined;
    }

    // 2. buscar perfil en tabla profiles
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("[usersRepo] profile fetch error:", error.message);
      return undefined;
    }

    // 3. mapear a CurrentUser
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      username: data.username,
      avatarUrl: data.avatar_url,
    };
  },

  /**
   * Obtener usuario por ID (owner del listing)
   */
  async getUserById(id: string): Promise<CurrentUser | undefined> {
    if (!isSupabaseConfigured || !supabase) {
      console.warn("[usersRepo] Supabase not configured");
      return undefined;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("[usersRepo] getUserById error:", error.message);
      return undefined;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      username: data.username,
      avatarUrl: data.avatar_url,
    };
  },
};
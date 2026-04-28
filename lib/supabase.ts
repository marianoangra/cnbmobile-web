import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client.
 *
 * Returns null if env vars are missing — callers must handle this gracefully
 * (the site should still build and render even without Supabase configured).
 */
export function getSupabase(): SupabaseClient | null {
  if (typeof window === 'undefined') {
    // Safe to instantiate on server too, but waitlist is client-only.
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  if (!_client) {
    _client = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
  }
  return _client;
}

export type LeadInsert = {
  email: string;
  locale: string;
  source?: string;
};

export async function insertLead(lead: LeadInsert): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) {
    return { ok: false, error: 'supabase_not_configured' };
  }
  const { error } = await sb.from('leads').insert([{ ...lead, created_at: new Date().toISOString() }]);
  if (error) {
    if (error.code === '23505') {
      // unique_violation — email already on the list, treat as success
      return { ok: true };
    }
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Graceful degradation: warn but don't crash if env vars missing
let supabase: SupabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] ⚠️ Missing environment variables. Create .env file with:');
  console.warn('  VITE_SUPABASE_URL=https://your-project.supabase.co');
  console.warn('  VITE_SUPABASE_ANON_KEY=your-anon-key');
  console.warn('[Supabase] App will run in offline/demo mode.');

  // Create a dummy client that won't crash the app
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key', {
    auth: { persistSession: false },
  });
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

export { supabase };

export const getSupabaseFunctionsUrl = (): string => {
  return import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || `${supabaseUrl || ''}/functions/v1`;
};

export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey);
};


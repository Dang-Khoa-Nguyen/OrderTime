import { createClient } from "@supabase/supabase-js";

// These come from your Supabase project settings (Project Settings -> API).
// Put them in frontend/.env.local as REACT_APP_SUPABASE_URL / REACT_APP_SUPABASE_ANON_KEY.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Helpful during setup: fail loudly instead of a confusing "network" error later.
  console.error(
    "Missing REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_ANON_KEY in frontend/.env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  // We don't throw here to prevent the app from crashing in dev if keys aren't set yet,
  // but we will check before using it in the API.
  console.warn('Supabase environment variables are missing');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseServiceKey || ''
);

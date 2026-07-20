import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cifrabxqxqarwcorwswk.supabase.co';
const supabaseAnonKey = 'sb_publishable_UNua_3jWWyjZTBrIuUiWiA_lM5-bX8o';
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

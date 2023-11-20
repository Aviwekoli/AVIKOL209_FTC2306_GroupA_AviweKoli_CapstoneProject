import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://wxzxbzdnexiljruglvjr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4enhiemRuZXhpbGpydWdsdmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyMzU1ODgsImV4cCI6MjAxNTgxMTU4OH0.xQNOYpvLP7on_GDotyCBXrBTL2Cerx6G4iXv8x3H2IM'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
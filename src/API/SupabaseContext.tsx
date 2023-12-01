import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SupabaseContext = createContext();

const SupabaseProvider = ({ children }) => {
  const [supabase, setSupabase] = useState(
    createClient('https://wxzxbzdnexiljruglvjr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4enhiemRuZXhpbGpydWdsdmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyMzU1ODgsImV4cCI6MjAxNTgxMTU4OH0.xQNOYpvLP7on_GDotyCBXrBTL2Cerx6G4iXv8x3H2IM')
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(supabase.auth){
      const user = supabase.auth.user();
      setUser(user);
    }

  }, [supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase, user }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  return useContext(SupabaseContext);
};

export default SupabaseProvider;
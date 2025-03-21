'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, UserInfo } from '../lib/supabase';

type AuthContextType = {
  user: UserInfo | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener la sesión actual
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error al obtener la sesión:', error);
        setLoading(false);
        return;
      }

      if (data?.session?.user) {
        const { id, email } = data.session.user;
        setUser({ id, email: email || '' });
      }
      
      setLoading(false);
    };

    // Obtener sesión al cargar
    getSession();

    // Configurar listener para cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { id, email } = session.user;
          setUser({ id, email: email || '' });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Cleanup
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
} 
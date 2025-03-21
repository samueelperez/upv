import { createClient } from '@supabase/supabase-js';

// Obtener variables de entorno de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipo para información del usuario
export type UserInfo = {
  id: string;
  email: string;
  role?: string;
};

// Función para iniciar sesión con email y contraseña
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  return { data, error };
}

// Función para cerrar sesión
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Función para obtener la sesión actual
export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
}

// Función para obtener usuario actual
export async function getCurrentUser() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) {
    return { user: null, error };
  }
  
  return { user: session.user, error: null };
} 
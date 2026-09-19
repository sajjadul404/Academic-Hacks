import { createClient } from '@supabase/supabase-js';

const meta = import.meta as unknown as { env?: Record<string, string> };
const supabaseUrl = meta.env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = meta.env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local persistence helper for offline/demo operation
export const localStore = {
  getCart: () => {
    try {
      const data = localStorage.getItem('edupath_cart');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveCart: (cart: unknown) => {
    try {
      localStorage.setItem('edupath_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  },
  getUser: () => {
    try {
      const data = localStorage.getItem('edupath_user');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  saveUser: (user: unknown) => {
    try {
      if (user) {
        localStorage.setItem('edupath_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('edupath_user');
      }
    } catch (e) {
      console.error(e);
    }
  }
};

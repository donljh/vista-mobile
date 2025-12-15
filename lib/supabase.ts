import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';

const SUPABASE_URL = 'https://qyvqwrailwzxknrrlamt.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_dZP1K-0_X3Hk6xV6-40rRA_j0NhM366';


export const supabase = createClient(
  SUPABASE_URL ?? '',
  SUPABASE_ANON_KEY ?? '',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.refreshSession();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
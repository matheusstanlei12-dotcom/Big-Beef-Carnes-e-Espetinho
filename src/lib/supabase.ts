import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://onawbdkzygymfknkrnze.supabase.co';
const supabaseAnonKey = 'sb_publishable_fwnqrLz-zqQsXAzxE7BoYw_2V3NnoM3';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ ERRO CRÍTICO: Chaves do Supabase não encontradas no build! Você precisa fazer um Redeploy na Vercel.');
} else {
  console.log('✅ Configuração do Supabase detectada no build.');
}

// Realtime reativado para suportar atualizações de estoque instantâneas.
const clientOptions = {
  realtime: {},
  global: {
    headers: { 'x-client-info': 'big-bifee' },
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, clientOptions);

export const tempAuthClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
  ...clientOptions,
});

// Access from console for maintenance/registration
if (typeof window !== 'undefined') {
  (window as any).supabase = supabase;
}



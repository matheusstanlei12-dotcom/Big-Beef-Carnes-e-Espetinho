import { supabase } from './src/lib/supabase';

async function checkMesas() {
  const { data, error } = await supabase.from('mesas').select('numero, status').in('numero', [1, 3]);
  if (error) {
    console.error('Error fetching mesas:', error);
    return;
  }
  console.log('Current Mesas Status:', data);
}

checkMesas();


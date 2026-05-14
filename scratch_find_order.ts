
import { supabase } from './lib/supabase';

async function findTheOrder() {
  const { data, error } = await supabase
    .from('pedidos')
    .select('id, total, status, finalizado_at, mesas(numero)')
    .eq('status', 'finalizado')
    .order('finalizado_at', { ascending: false });
  
  if (error) {
    console.error(error);
  } else {
    console.log("Pedidos encontrados:", data);
  }
}

findTheOrder();


import { supabase } from './lib/supabase';

async function checkDeletions() {
  const { data, error } = await supabase
    .from('auditoria_exclusoes')
    .select('*')
    .order('data_exclusao', { ascending: false })
    .limit(10);
  
  if (error) {
    console.error("Erro ao verificar exclusões:", error);
  } else {
    console.log("Últimas exclusões detectadas:", data);
  }
}

checkDeletions();



import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCounts() {
  const { count: monthCount, error: e1 } = await supabase
    .from('pedidos')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'finalizado')
    .gte('finalizado_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());

  const { count: totalCount, error: e2 } = await supabase
    .from('pedidos')
    .select('id', { count: 'exact', head: true });

  console.log("Orders this month:", monthCount);
  console.log("Total orders:", totalCount);
  
  if (e1) console.error("Error monthCount:", e1);
  if (e2) console.error("Error totalCount:", e2);
}

checkCounts();


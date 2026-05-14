
import { supabase } from './lib/supabase';

async function auditData() {
  console.log("--- AUDITORIA DE DADOS ---");

  // 1. Verificar total de pedidos no sistema
  const { count: totalPedidos } = await supabase.from('pedidos').select('*', { count: 'exact', head: true });
  console.log("Total de pedidos no banco:", totalPedidos);

  // 2. Verificar pedidos por status
  const { data: statusCounts } = await supabase.rpc('get_status_counts'); // Se houver, senão fazemos manual
  // Manual status check
  const statuses = ['novo', 'em_preparo', 'pronto', 'entregue', 'finalizado', 'cancelado'];
  for (const s of statuses) {
    const { count } = await supabase.from('pedidos').select('*', { count: 'exact', head: true }).eq('status', s);
    console.log(`Pedidos com status '${s}':`, count);
  }

  // 3. Verificar se há pedidos com 'total' mas status diferente de 'finalizado'
  const { data: nonFinalizedWithMoney } = await supabase
    .from('pedidos')
    .select('id, status, total, finalizado_at')
    .neq('status', 'finalizado')
    .gt('total', 0)
    .limit(10);
  console.log("Pedidos não-finalizados com valor > 0:", nonFinalizedWithMoney);

  // 4. Verificar se há pedidos 'finalizado' com total 0 (agrupados)
  const { count: groupedCount } = await supabase
    .from('pedidos')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'finalizado')
    .eq('total', 0);
  console.log("Pedidos finalizados com total 0 (provavelmente agrupados):", groupedCount);

  // 5. Verificar auditoria de exclusões
  const { data: recentDeletions } = await supabase
    .from('auditoria_exclusoes')
    .select('*')
    .order('criado_em', { ascending: false })
    .limit(5);
  console.log("Últimas exclusões auditadas:", recentDeletions);
}

auditData();

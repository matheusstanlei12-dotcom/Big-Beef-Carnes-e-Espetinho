import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://onawbdkzygymfknkrnze.supabase.co';
const supabaseKey = 'sb_publishable_fwnqrLz-zqQsXAzxE7BoYw_2V3NnoM3';

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearSales() {
  console.log("Iniciando limpeza de vendas (BIG BEEF)...");

  try {
    // 1. Limpar Itens de Pedido
    const { error: errItens } = await supabase.from('itens_pedido').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (errItens) console.error("Erro ao limpar itens:", errItens.message);
    else console.log("✅ Itens de pedido removidos.");

    // 2. Limpar Pedidos
    const { error: errPedidos } = await supabase.from('pedidos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (errPedidos) console.error("Erro ao limpar pedidos:", errPedidos.message);
    else console.log("✅ Pedidos removidos.");

    // 3. Resetar status das mesas para 'livre'
    const { error: errMesas } = await supabase.from('mesas').update({ status: 'livre' }).neq('id', '00000000-0000-0000-0000-000000000000');
    if (errMesas) console.error("Erro ao resetar mesas:", errMesas.message);
    else console.log("✅ Todas as mesas marcadas como LIVRE.");

    console.log("\n🚀 SUCESSO: Sistema zerado e pronto!");
  } catch (e) {
    console.error("Erro inesperado:", e);
  }
}

clearSales();

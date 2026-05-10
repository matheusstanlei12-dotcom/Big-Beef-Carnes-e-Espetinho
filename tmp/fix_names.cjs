const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const envContent = fs.readFileSync('.env', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabase = createClient(env['VITE_SUPABASE_URL'], env['VITE_SUPABASE_ANON_KEY']);

async function updateNames() {
  // Login com um dos donos
  const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'matheus.stanley12@gmail.com',
    password: '352154154'
  });
  
  if (authErr) {
    console.log('Erro login:', authErr.message);
    return;
  }
  console.log('Logado com sucesso para atualizar nomes!');

  // Buscar todos os perfis para associar emails aos UUIDs
  // O Auth não retorna os emails na tabela profiles, então vamos tentar deduzir ou atualizar por outro método?
  // Como não temos os emails na tabela profiles, vamos tentar achar pelo proprio select, porem precisamos saber os UUIDs.
  // Vamos resolver isso logando com cada um deles individualmente e atualizando o próprio nome!
  
  const usersToUpdate = [
    { email: 'eu.ramos10@yahoo.com.br', pass: '753310', name: 'Ramos' },
    { email: 'matheus.stanley12@gmail.com', pass: '352154154', name: 'Matheus Stanley' },
    { email: 'Thiago.orlandi1@gmail.com', pass: '35215415', name: 'Thiago Orlandi' }
  ];

  for (const u of usersToUpdate) {
    const { data: loginData } = await supabase.auth.signInWithPassword({
      email: u.email,
      password: u.pass
    });
    
    if (loginData?.user) {
      const { error: updErr } = await supabase
        .from('profiles')
        .update({ full_name: u.name })
        .eq('id', loginData.user.id);
        
      if (updErr) console.log('Erro ao atualizar ' + u.name, updErr.message);
      else console.log('Nome atualizado: ' + u.name);
      
      await supabase.auth.signOut();
    }
  }
  console.log('Todos os nomes corrigidos!');
}

updateNames();

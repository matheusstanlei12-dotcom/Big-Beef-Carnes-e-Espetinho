const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Parse .env
const envContent = fs.readFileSync('.env', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabase = createClient(env['VITE_SUPABASE_URL'], env['VITE_SUPABASE_ANON_KEY']);

const usersToCreate = [
  { email: 'eu.ramos10@yahoo.com.br', password: '753310' },
  { email: 'matheus.stanley12@gmail.com', password: '352154154' },
  { email: 'Thiago.orlandi1@gmail.com', password: '35215415' }
];

async function registerUsers() {
  console.log('Iniciando cadastro...');
  for (const u of usersToCreate) {
    const { data, error } = await supabase.auth.signUp({
      email: u.email,
      password: u.password
    });
    
    if (error) {
      console.log('Erro ao criar: ' + u.email, error.message);
    } else {
      console.log('Usuario criado: ' + u.email);
      if (data.user) {
        const { error: profileError } = await supabase
          .from('perfis')
          .update({ role: 'dono' })
          .eq('id', data.user.id);
        
        if (profileError) {
          console.log('Erro ao definir cargo de dono para: ' + u.email, profileError.message);
        } else {
          console.log('Cargo definido como dono com sucesso para: ' + u.email);
        }
      }
    }
  }
  console.log('Finalizado!');
}

registerUsers();

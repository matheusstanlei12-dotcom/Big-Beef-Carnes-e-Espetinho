const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://onawbdkzygymfknkrnze.supabase.co';
const supabaseKey = 'sb_publishable_fwnqrLz-zqQsXAzxE7BoYw_2V3NnoM3';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('mesas').select('*').limit(1);
  if (error) {
    console.error(error);
    return;
  }
  if (data && data.length > 0) {
    console.log('Columns:', Object.keys(data[0]));
  } else {
    console.log('No tables found in "mesas"');
  }
}

run();

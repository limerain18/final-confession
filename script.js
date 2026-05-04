// ── DATE ──
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const d = new Date();
document.getElementById('letter-date').textContent =
  `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;


// ─────────────────────────────────────────────────────
// ── SUPABASE CONFIG — fill in your own values below ──
// ─────────────────────────────────────────────────────
const SUPABASE_URL  = 'https://xuprsibtotdzuzihryub.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1cHJzaWJ0b3RkenV6aWhyeXViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4OTg2MDksImV4cCI6MjA5MzQ3NDYwOX0.u4GbrGxz4ZAC8a79McOq9cfDa6a88KH4fI8sHZm90G0';
// Table needed: responses (id, name, message, created_at)

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

async function submitResponse() {
  const name    = document.getElementById('resp-name').value.trim();
  const message = document.getElementById('resp-message').value.trim();
  const btn     = document.getElementById('submit-btn');
  const status  = document.getElementById('status-msg');

  if (!message) {
    status.textContent = 'please write something first ♡';
    return;
  }

  btn.disabled = true;
  status.textContent = 'sending…';

  try {
    const { error } = await _supabase
      .from('response')
      .insert([{ name: name || 'anonymous', message }]);

    if (error) throw error;

    document.getElementById('form-area').style.display = 'none';
    document.getElementById('success-area').classList.add('visible');

  } catch (err) {
    console.error(err);
    status.textContent = 'something went wrong. try again?';
    btn.disabled = false;
  }
}

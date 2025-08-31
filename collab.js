// collab.js: Live collaborative text editing with Supabase, random usernames, only text and links allowed

(async () => {
  // Dynamically import the Supabase client
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');

  const SUPABASE_URL = window.SUPABASE_URL;
  const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY;
  const ARTICLE_ID = window.ARTICLE_ID || location.pathname.split('/').pop().replace(/\.html$/, '');
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Assign random username
  let username = localStorage.getItem('collab_username');
  if (!username) {
    username = 'user-' + Math.random().toString(36).slice(2, 8);
    localStorage.setItem('collab_username', username);
  }

  // UI setup
  const collabSection = document.getElementById('collab') || document.createElement('section');
  collabSection.id = 'collab';
  collabSection.innerHTML = `
    <h2>Live Collaboration</h2>
    <div id="collab-display" style="white-space:pre-wrap; border:1px solid #ccc; padding:1em; min-height:4em;"></div>
    <textarea id="collab-input" rows="4" style="width:100%; margin-top:1em;"></textarea>
    <button id="collab-submit">Submit Edit</button>
    <div style="font-size:0.9em; color:#888; margin-top:0.5em;">You are <b>${username}</b></div>
  `;
  if (!document.getElementById('collab')) document.body.appendChild(collabSection);

  const display = document.getElementById('collab-display');
  const input = document.getElementById('collab-input');
  const submit = document.getElementById('collab-submit');

  // Helper: sanitize text, only allow links
  function sanitize(text) {
    // Remove all HTML tags
    let safe = text.replace(/<[^>]*>/g, '');
    // Auto-link URLs
    safe = safe.replace(/(https?:\/\/[^\s]+)/g, url => `<a href="${url}" target="_blank" rel="noopener">${url}</a>`);
    return safe;
  }

  // Load latest edit
  async function loadLatest() {
    const { data, error } = await supabase
      .from('collab_edits')
      .select('*')
      .eq('article_id', ARTICLE_ID)
      .order('created_at', { ascending: false })
      .limit(1);
    if (data && data[0]) {
      display.innerHTML = sanitize(data[0].content);
      input.value = data[0].content;
    }
  }

  // Subscribe to live edits
  supabase
    .channel('collab_edits')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'collab_edits', filter: `article_id=eq.${ARTICLE_ID}` }, payload => {
      if (payload.new) {
        display.innerHTML = sanitize(payload.new.content);
        input.value = payload.new.content;
      }
    })
    .subscribe();

  // Submit edit
  submit.onclick = async () => {
    const content = input.value;
    await supabase.from('collab_edits').insert({
      article_id: ARTICLE_ID,
      username,
      content
    });
  };

  loadLatest();
})(); 
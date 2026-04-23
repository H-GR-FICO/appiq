/**
 * Management Cockpit — Shared Shell Module
 * Injects nav, breadcrumb, music, lang, auth into every cockpit sub-page.
 * Usage: Shell.init({ section: 'Section Name', backUrl: '../MANAGEMENT_COCKPIT.html' })
 */
const Shell = (() => {

  const PASS = 'HOPI2026';
  const LANG_KEY = 'hopi_lang';
  const MUSIC_KEY = 'hopi_audio_on';
  const MUSIC_TIME_KEY = 'hopi_audio_time';
  const AUTH_KEY  = 'cockpit_unlocked';

  // ── Translations ──────────────────────────────────────────────────────────
  const T = {
    cs: { back: '← Zpět na Cockpit', lang: 'EN', auth_prompt: 'Přístupový kód:', auth_err: 'Nesprávný kód.' },
    en: { back: '← Back to Cockpit', lang: 'CZ', auth_prompt: 'Access code:', auth_err: 'Wrong code.' }
  };

  function t(key) { return T[getLang()][key] || key; }
  function getLang() { return localStorage.getItem(LANG_KEY) || 'cs'; }
  function setLang(l) { localStorage.setItem(LANG_KEY, l); location.reload(); }

  // ── Auth ──────────────────────────────────────────────────────────────────
  function checkAuth() {
    if (localStorage.getItem(AUTH_KEY) === '1') return true;
    const code = prompt(t('auth_prompt'));
    if (code === PASS) { localStorage.setItem(AUTH_KEY, '1'); return true; }
    alert(t('auth_err'));
    location.href = '../MANAGEMENT_COCKPIT.html';
    return false;
  }

  // ── Music ─────────────────────────────────────────────────────────────────
  let audioEl = null;
  function initMusic(musicSrc) {
    if (!musicSrc) return;
    audioEl = document.createElement('audio');
    audioEl.src = musicSrc;
    audioEl.loop = true;
    audioEl.volume = 0.18;

    // Restore playback position from previous page navigation
    const savedTime = parseFloat(sessionStorage.getItem(MUSIC_TIME_KEY) || '0');
    audioEl.addEventListener('canplay', () => {
      if (savedTime > 0) audioEl.currentTime = savedTime;
    }, { once: true });
    if (audioEl.readyState >= 3 && savedTime > 0) audioEl.currentTime = savedTime;

    const on = localStorage.getItem(MUSIC_KEY) !== '0';
    if (on) {
      audioEl.play().catch(() => {
        // Autoplay blocked by browser policy — start on first user interaction
        document.addEventListener('click', () => { audioEl.play().catch(() => {}); }, { once: true });
      });
    }

    // Save position when leaving page
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem(MUSIC_TIME_KEY, String(audioEl.currentTime));
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) audioEl.pause();
      else if (localStorage.getItem(MUSIC_KEY) !== '0') audioEl.play().catch(() => {});
    });
    return audioEl;
  }

  function toggleMusic(btn) {
    if (!audioEl) return;
    const on = localStorage.getItem(MUSIC_KEY) !== '0';
    if (on) { audioEl.pause(); localStorage.setItem(MUSIC_KEY, '0'); btn.textContent = '♪'; btn.title = 'Zapnout hudbu'; }
    else    { audioEl.play().catch(() => {}); localStorage.setItem(MUSIC_KEY, '1'); btn.textContent = '♬'; btn.title = 'Vypnout hudbu'; }
  }

  // ── Shell HTML ────────────────────────────────────────────────────────────
  function renderShell(cfg) {
    const lang = getLang();
    const musicOn = localStorage.getItem(MUSIC_KEY) !== '0';
    const shell = document.getElementById('cockpit-shell');
    if (!shell) return;
    const sectionTitle = typeof cfg.section === 'object'
      ? (cfg.section[lang] || cfg.section.en || '')
      : (cfg.section || '');
    shell.innerHTML = `
      <div class="c-topbar">
        <a class="c-back" href="${cfg.backUrl || '../MANAGEMENT_COCKPIT.html'}">${t('back')}</a>
        <span class="c-section-title">${sectionTitle}</span>
        <div class="c-controls">
          <button class="c-btn-icon" id="c-music-btn" title="${musicOn ? 'Vypnout hudbu' : 'Turn off music'}"
                  onclick="Shell.toggleMusic(this)">${musicOn ? '♬' : '♪'}</button>
          <button class="c-btn-icon" id="c-lang-btn" title="${lang === 'cs' ? 'Switch to English' : 'Přepnout do češtiny'}"
                  onclick="Shell.setLang('${lang === 'cs' ? 'en' : 'cs'}')">${t('lang')}</button>
        </div>
      </div>
      <div class="c-mottos-ribbon">
        <span class="lang-cs">💰 Budget je svatý</span><span class="lang-en">💰 Budget is Sacred</span>
        <span>·</span>
        <span>👑 Cash is King</span>
        <span>·</span>
        <span>🎯 All Actions Must Be Business Driven</span>
        <span>·</span>
        <span>🚀 Living Proof First</span>
        <span>·</span>
        <span>🤖 1 Person + AI = Team</span>
      </div>
    `;
  }

  // ── i18n — apply translations to page ────────────────────────────────────
  function applyI18n() {
    const l = getLang();
    // .lang-cs / .lang-en show/hide
    document.querySelectorAll('.lang-cs, .lang-en').forEach(el => {
      el.style.display = el.classList.contains('lang-' + l) ? '' : 'none';
    });
    // [data-en] — replace textContent in EN mode
    if (l === 'en') {
      document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute('data-en');
      });
      // [data-ph-en] — replace placeholder in EN mode
      document.querySelectorAll('[data-ph-en]').forEach(el => {
        el.placeholder = el.getAttribute('data-ph-en');
      });
    }
  }

  // ── Public init ───────────────────────────────────────────────────────────
  function init(cfg = {}) {
    if (!checkAuth()) return;
    renderShell(cfg);
    initMusic(cfg.music || '../cockpit-music.mp3');
    document.documentElement.setAttribute('lang', getLang());
    applyI18n();
  }

  return { init, setLang, toggleMusic, getLang, applyI18n };
})();

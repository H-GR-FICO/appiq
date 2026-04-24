/**
 * Management Cockpit — Shared Shell Module
 * Injects nav, breadcrumb, music, lang, auth into every cockpit sub-page.
 * Usage: Shell.init({ section: 'Section Name', backUrl: '../MANAGEMENT_COCKPIT.html' })
 */
const Shell = (() => {

  const PASS = 'HOPI2026';
  const SHELL_VER = 'v7.32'; // auto-updated by DO_DEPLOY.ps1 // auto-updated by DO_DEPLOY.ps1
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
  // Sub-pages (cluster, sections) do NOT enforce auth independently.
  // Auth lives only on MANAGEMENT_COCKPIT.html (overlay = music gesture trigger).
  // On file:// protocol, storage is NOT shared across different-path pages,
  // so any storage-based check here would fail and cause black screens.
  function checkAuth() {
    return true;
  }

  // ── Music ─────────────────────────────────────────────────────────────────
  let audioEl = null;
  let _shPlaying = false;
  let _shStarting = false;
  let _shFadeId = null;

  function _shFadeTo(vol, ms, cb) {
    if (_shFadeId) { clearInterval(_shFadeId); _shFadeId = null; }
    if (!audioEl) return;
    let i = 0, n = Math.max(1, Math.round(ms / 40)), v0 = audioEl.volume;
    _shFadeId = setInterval(() => {
      i++; audioEl.volume = Math.min(1, Math.max(0, v0 + (vol - v0) * (i / n)));
      if (i >= n) { clearInterval(_shFadeId); _shFadeId = null; if (cb) cb(); }
    }, 40);
  }

  function _shIsOn() {
    try { return localStorage.getItem(MUSIC_KEY) !== '0'; } catch(e) { return true; }
  }

  function _shTryPlay() {
    if (_shPlaying || _shStarting || !audioEl) return;
    _shStarting = true;
    audioEl.volume = 0;
    const pr = audioEl.play();
    if (pr && pr.then) {
      pr.then(() => {
        _shStarting = false; _shPlaying = true;
        try { localStorage.setItem(MUSIC_KEY, '1'); } catch(e) {}
        const saved = parseFloat(sessionStorage.getItem(MUSIC_TIME_KEY) || '0');
        if (saved > 0) audioEl.currentTime = saved;
        _shFadeTo(0.7, 400);
      }, () => {
        _shStarting = false; _shPlaying = false;
      });
    } else {
      _shStarting = false; _shPlaying = true;
    }
  }

  function initMusic(musicSrc) {
    if (!musicSrc) return;
    audioEl = document.createElement('audio');
    audioEl.src = musicSrc;
    audioEl.loop = true;
    audioEl.preload = 'auto';
    audioEl.volume = 0;

    if (_shIsOn()) _shTryPlay();

    // permanent listeners — no { once:true }, no removeEventListener — capture phase (Studio pattern)
    window.addEventListener('pointerdown', function(e) {
      var btn = document.getElementById('c-music-btn');
      if (btn && btn.contains(e.target)) return;
      if (_shIsOn() && !_shPlaying && !_shStarting) _shTryPlay();
    }, true);
    window.addEventListener('click', function(e) {
      var btn = document.getElementById('c-music-btn');
      if (btn && btn.contains(e.target)) return;
      if (_shIsOn() && !_shPlaying && !_shStarting) _shTryPlay();
    }, true);
    window.addEventListener('keydown', function() {
      if (_shIsOn() && !_shPlaying && !_shStarting) _shTryPlay();
    }, true);

    window.addEventListener('pagehide', () => {
      try { sessionStorage.setItem(MUSIC_TIME_KEY, String(audioEl.currentTime)); } catch(e) {}
    });
    window.addEventListener('pageshow', (e) => {
      if (e.persisted && audioEl && _shIsOn() && !_shPlaying) {
        audioEl.play().then(() => { _shPlaying = true; _shFadeTo(0.7, 400); })
                     .catch(() => { _shPlaying = false; });
      }
    });
    document.addEventListener('visibilitychange', () => {
      if (!audioEl) return;
      if (document.hidden) { _shFadeTo(0, 600); }
      else if (_shPlaying) { audioEl.play().then(() => _shFadeTo(0.7, 400)).catch(() => {}); }
    });
    return audioEl;
  }

  function toggleMusic(btn) {
    if (!audioEl) return;
    if (_shPlaying) {
      _shFadeTo(0, 300, () => { audioEl.pause(); _shPlaying = false; btn.textContent = '♪'; btn.title = 'Zapnout hudbu'; });
      localStorage.setItem(MUSIC_KEY, '0');
      btn.textContent = '♪'; btn.title = 'Zapnout hudbu';
    } else {
      localStorage.setItem(MUSIC_KEY, '1');
      btn.textContent = '♬'; btn.title = 'Vypnout hudbu';
      _shTryPlay();
    }
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
    // ?back=<encoded-url> lets cluster.html pass the correct return destination
    const urlBack = new URLSearchParams(location.search).get('back');
    const backHref = urlBack ? decodeURIComponent(urlBack) : (cfg.backUrl || '../MANAGEMENT_COCKPIT.html');
    shell.innerHTML = `
      <div class="c-topbar">
        <a class="c-back" href="${backHref}">${t('back')}</a>
        <span class="c-section-title">${sectionTitle}</span>
        <div class="c-controls">
          <button class="c-btn-icon" id="c-music-btn" title="${musicOn ? 'Vypnout hudbu' : 'Turn off music'}"
                  onclick="Shell.toggleMusic(this)">${musicOn ? '♬' : '♪'}</button>
          <button class="c-btn-icon" id="c-lang-btn" title="${lang === 'cs' ? 'Switch to English' : 'Přepnout do češtiny'}"
                  onclick="Shell.setLang('${lang === 'cs' ? 'en' : 'cs'}')">${t('lang')}</button>
        </div>
      </div>
      <div class="c-mottos-ribbon">
        <span class="cm1"><span class="lang-cs">💰 Budget je svatý</span><span class="lang-en">💰 Budget is Sacred</span></span>
        <span class="cdot">·</span>
        <span class="cm2">👑 Cash is King</span>
        <span class="cdot">·</span>
        <span class="cm3">🎯 All Actions Must Be Business Driven</span>
        <span class="cdot">·</span>
        <span class="cm4">🚀 Living Proof First</span>
        <span class="cdot">·</span>
        <span class="cm5">🤖 1 Person + AI = Team</span>
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

  // ── Version badge ─────────────────────────────────────────────────────────
  function _doInjectBadge() {
    if (document.getElementById('ver-badge')) return;
    var v = (typeof PREZ_VERSION !== 'undefined') ? PREZ_VERSION : SHELL_VER;
    var el = document.createElement('div');
    el.id = 'ver-badge';
    el.textContent = 'HOPI AppIQ · ' + v;
    var btm = window.innerWidth < 900 ? '88px' : '8px';
    el.style.cssText = 'position:fixed;bottom:' + btm + ';right:14px;z-index:100001;font-size:10px;color:rgba(148,163,184,0.5);font-family:\'Segoe UI\',system-ui,sans-serif;pointer-events:none;user-select:none;letter-spacing:.3px;line-height:1';
    document.body.appendChild(el);
  }
  function injectVersionBadge() {
    if (typeof PREZ_VERSION !== 'undefined') { _doInjectBadge(); return; }
    var s = document.createElement('script');
    s.src = '../_ver.js';
    s.onload = _doInjectBadge;
    s.onerror = _doInjectBadge; // fallback to SHELL_VER on load failure
    document.head.appendChild(s);
  }

  // ── Inject HOPIQ floating agent ───────────────────────────────────────────
  function injectHopiq() {
    if (document.getElementById('hopiq-btn')) return; // already present
    var s = document.createElement('script');
    s.src = '_hopiq.js';
    document.head.appendChild(s);
  }

  // ── Public init ───────────────────────────────────────────────────────────
  function init(cfg = {}) {
    if (!checkAuth()) return;
    renderShell(cfg);
    initMusic(cfg.music || '../cockpit-music.mp3');
    document.documentElement.setAttribute('lang', getLang());
    applyI18n();
    injectHopiq();
    injectVersionBadge();
  }

  return { init, setLang, toggleMusic, getLang, applyI18n };
})();

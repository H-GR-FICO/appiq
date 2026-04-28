/**
 * Management Cockpit — Shared Shell Module
 * Injects nav, breadcrumb, music, lang, auth into every cockpit sub-page.
 * Usage: Shell.init({ section: 'Section Name', backUrl: '../MANAGEMENT_COCKPIT.html' })
 */
const Shell = (() => {

  const PASS = 'HOPI2026';
  const SHELL_VER = 'v7.34'; // auto-updated by DO_DEPLOY.ps1 // auto-updated by DO_DEPLOY.ps1
  const LANG_KEY = 'hopi_lang';
  const MUSIC_KEY = 'hopi_audio_on';
  const MUSIC_TIME_KEY = 'hopi_shell_time';
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
    const saved = parseFloat(sessionStorage.getItem(MUSIC_TIME_KEY) || '0');
    const pr = audioEl.play();
    if (pr && pr.then) {
      pr.then(() => {
        _shStarting = false; _shPlaying = true;
        try { localStorage.setItem(MUSIC_KEY, '1'); } catch(e) {}
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
    audioEl.preload = 'none';
    audioEl.volume = 0;
    audioEl.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none;';
    document.body.appendChild(audioEl);

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
      _shPlaying = false;
      if (_shFadeId) { clearInterval(_shFadeId); _shFadeId = null; }
      try { sessionStorage.setItem(MUSIC_TIME_KEY, String(audioEl.currentTime)); } catch(e) {}
    });
    window.addEventListener('pageshow', () => {
      if (audioEl && _shIsOn() && !_shPlaying && !_shStarting) {
        audioEl.volume = 0;
        const saved = parseFloat(sessionStorage.getItem(MUSIC_TIME_KEY) || '0');
        audioEl.play()
          .then(() => {
            _shPlaying = true;
            if (saved > 0) audioEl.currentTime = saved;
            _shFadeTo(0.7, 400);
          })
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
    if (!document.getElementById('sh-styles')) {
      const s = document.createElement('style');
      s.id = 'sh-styles';
      s.textContent = `
        @keyframes sh-bar { 0%,100%{background-position:0% 50%} 50%{background-position:200% 50%} }
        @keyframes sh-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.7)} }
        .c-live::before { content:''; display:inline-block; width:7px; height:7px; background:#22C55E; border-radius:50%; margin-right:8px; vertical-align:middle; animation:sh-pulse 2s ease infinite; box-shadow:0 0 8px rgba(34,197,94,.8); }
        .c-glow-green  { color:#22C55E !important; text-shadow:0 0 16px rgba(34,197,94,.6); }
        .c-glow-red    { color:#ef4444 !important; text-shadow:0 0 16px rgba(239,68,68,.6); }
        .c-glow-amber  { color:#F59E0B !important; text-shadow:0 0 16px rgba(245,158,11,.6); }
        .c-glow-violet { color:#A855F7 !important; text-shadow:0 0 16px rgba(168,85,247,.6); }
        .c-section-hero { padding:14px 32px; background:linear-gradient(90deg,rgba(168,85,247,.06) 0%,transparent 70%); border-bottom:1px solid rgba(168,85,247,.12); display:flex; align-items:center; gap:14px; }
        .c-section-hero::before { content:''; width:3px; height:26px; background:linear-gradient(180deg,#A855F7,#22C55E); border-radius:2px; flex-shrink:0; }
        .c-section-hero-name { font-size:18px; font-weight:700; color:rgba(240,244,255,.55); letter-spacing:3px; font-family:'Segoe UI',system-ui,sans-serif; text-transform:uppercase; }
      `;
      document.head.appendChild(s);
    }

    shell.innerHTML = `
      <div class="c-topbar">
        <div style="display:flex;align-items:center;gap:14px;">
          <a class="c-back" href="${backHref}">${t('back')}</a>
          <svg viewBox="0 0 1260 240.6796" height="18" xmlns="http://www.w3.org/2000/svg" style="display:block;opacity:.85;" aria-label="HOPI AppIQ">
            <rect width="30.1059" height="240.6796" fill="#007d32"/>
            <path d="m591.0638,52.7498h-49.2811v142.3268h49.2811V52.7498Zm-134.2544,38.8765h4.4598c6.3731,0,10.8003,1.1359,13.277,3.3984,2.4766,2.2671,3.7196,6.6571,3.7196,13.1699s-1.3128,11.1169-3.9291,13.8076c-2.6256,2.6908-6.9783,4.0362-13.0674,4.0362h-4.4598v-34.4121Zm55.6542,61.073c10.3395-8.1421,15.5115-22.946,15.5115-44.3977s-5.1348-36.0787-15.4044-43.867c-10.2697-7.7883-26.6564-11.6848-49.1741-11.6848h-55.8684v142.3268h49.2811v-30.1664h6.5872c22.3734,0,38.7321-4.0687,49.0669-12.2109m-135.1017-85.1829c-10.7631-11.6848-27.9691-17.5273-51.6181-17.5273s-40.8597,5.8424-51.6181,17.5273c-10.7677,11.6802-16.1446,30.4457-16.1446,56.292s5.4141,44.6444,16.247,56.3991c10.8376,11.7547,28.0436,17.6297,51.6227,17.6297s40.748-5.8424,51.511-17.5226c10.7631-11.6848,16.1446-30.483,16.1446-56.3991s-5.3815-44.7189-16.1446-56.3991m-66.1706,30.3759c2.337-5.3117,7.2576-7.9652,14.7666-7.9652,7.5044,0,12.3505,2.5837,14.5478,7.7511,2.1973,5.1721,3.296,13.8821,3.296,26.1303s-1.1359,20.9955-3.403,26.2327c-2.2671,5.2419-7.1133,7.8628-14.5478,7.8628s-12.3226-2.6582-14.6595-7.9699c-2.337-5.3071-3.5054-13.9799-3.5054-26.0185s1.1685-20.7115,3.5054-26.0232m-67.232,97.1843V52.7498h-49.2811v52.47h-27.8295v-52.47h-49.2811v142.3268h49.2811v-49.7094h27.8295v49.7094h49.2811Z" fill="#fff"/>
            <text y="194" font-family="'Segoe UI',Arial,sans-serif" x="648"><tspan fill="#E8750A" font-size="192" font-weight="300">App</tspan><tspan fill="#007d32" font-size="208" font-weight="900">IQ</tspan></text>
          </svg>
        </div>
        <span class="c-section-title">${sectionTitle}</span>
        <div class="c-controls">
          <button class="c-btn-icon" id="c-music-btn" title="${musicOn ? 'Vypnout hudbu' : 'Turn off music'}"
                  onclick="Shell.toggleMusic(this)">${musicOn ? '♬' : '♪'}</button>
          <button class="c-btn-icon" id="c-lang-btn" title="${lang === 'cs' ? 'Switch to English' : 'Přepnout do češtiny'}"
                  onclick="Shell.setLang('${lang === 'cs' ? 'en' : 'cs'}')">${t('lang')}</button>
        </div>
      </div>
      <div class="c-section-hero">
        <div class="c-section-hero-name">${sectionTitle}</div>
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

    // Back button — use history.back() to leverage bfcache (music continuity)
    const backBtn = shell.querySelector('.c-back');
    if (backBtn) {
      backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (history.length > 1) {
          history.back();
        } else {
          location.href = backBtn.href;
        }
      });
    }

    if (!document.getElementById('sh-accent')) {
      const bar = document.createElement('div');
      bar.id = 'sh-accent';
      bar.style.cssText = 'position:fixed;top:0;left:0;right:0;height:2px;z-index:9999;pointer-events:none;background:linear-gradient(90deg,#A855F7,#22C55E,#E8750A,#A855F7);background-size:300% 100%;animation:sh-bar 6s ease infinite;box-shadow:0 0 16px 6px rgba(168,85,247,.6),0 0 40px 10px rgba(34,197,94,.3);height:5px;';
      document.body.prepend(bar);
    }
    if (!document.getElementById('sh-watermark')) {
      const wm = document.createElement('div');
      wm.id = 'sh-watermark';
      wm.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;background:url(../cockpit-og.svg) center/55% no-repeat;opacity:0.04;';
      document.body.appendChild(wm);
    }
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
    el.style.cssText = 'position:fixed;bottom:8px;right:14px;z-index:100001;font-size:10px;color:rgba(148,163,184,0.5);font-family:\'Segoe UI\',system-ui,sans-serif;pointer-events:none;user-select:none;letter-spacing:.3px;line-height:1';
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

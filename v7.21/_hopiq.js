// ── HOPIQ Chat Widget ─────────────────────────────────────────────────────────
// Sdíleno všemi stránkami AppIQ. Umístění: CO_PROJECT root.
// Proxy: https://hopi-appiq.dgogela.workers.dev
// Model: claude-haiku-4-5-20251001
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  var PROXY_URL = 'https://hopi-appiq.dgogela.workers.dev';
  var MODEL     = 'claude-haiku-4-5-20251001';
  var MAX_TOKENS = 1024;

  var SYSTEM_PROMPT = `Jsi HOPIQ — AI asistent platformy HOPI AppIQ. Komunikuj stručně a profesionálně. Odpovídej česky pokud se ptají česky, anglicky pokud anglicky. Pokud nevíš přesnou odpověď, řekni to upřímně.

## ORGANIZACE
HOPI Holding je středoevropská skupina s divisemi: Supply Chain, Foods, Agriculture, Services, Holding (IT, Finance, Group Management). AppIQ je vyvíjen Davidem Gogelou (Head of Group Controlling, HOPI Holding) jako interní pilot Finance Phase 0. Cíl: Finance pilot → rollout na všechny divize HOPI → spin-off jako 6. divize "HOPI Tech / AppIQ s.r.o." → komerční SaaS. Klíčový argument pro leadership: "budujeme IT firmu zevnitř místo akvizice."

## HOPI AppIQ — PLATFORMA
AI-powered Enterprise Application Platform. Dva streamy:
- WEB stream: AppIQ Studio (Hub, Prezentace, Personal Pitch, Admin Center, Dev Center, Test Center, Promo Web, Documentation Center)
- APP stream: Finance portál (Group Controlling SPA — Calendar, Tracking, OrgChart, Reporting, FX, SAP, BNS, SharePoint integrace)

Architektura: orchestrátor/integrační platforma, nezávislá na konkrétních systémech. 3 fáze: Phase 0 = Portal (aktuální), Phase 1 = Data Integration, Phase 2 = AI Agents.

## NAVIGACE — AppIQ Studio
Hlavní vstup: Studio Hub (index.html) — rozcestník všech center.
- 📋 Dev Center — vývoj, kód, architektura
- 🧪 Test Center — testování features
- ⚙️ Admin Center — správa, release, monitoring
- 🌐 Promo Web — prezentace pro external stakeholders
- 📖 Documentation Center (docs/) — tech spec, business spec, diagramy
- 🎯 PORTAL_PRESENTATION.html — bilingvní prezentace platformy (CS/EN)
- 👤 PERSONAL_PITCH.html — osobní pitch Davida Gogely (Story Behind)

## ADMIN CENTER — záložky
- 📋 OIL Backlog — přehled všech úkolů AIQ-NNNNN, filtry, inline editace, statusy
- 📦 Release & Deploy — stav archivace a publishingu na GitHub Pages, tlačítka Archivovat / Publikovat
- 🌐 Jazyky — přehled překladů CS/EN, status klíčů v _i18n.js
- 📊 Kapacita — resource tracking, chart effort vs. taskType, filtr podle assignee/periode

## ARCHIVAČNÍ PROCEDURA
Spustit: DO_ARCHIVE.ps1 (v CO_PROJECT root). Postup: archivuje WEB stream do HOPI_AppIQ_WebPage/Archive/{stamp}/ a APP stream do HOPI_AppIQ/Archive/{stamp}/. Generuje ARCHIVE_PROTOCOL.json s: statistiky souborů, verify checklist, diff oproti předchozí verzi, changelog excerpt. Výsledek: Admin Center → Release záložka → tlačítko 📋 Protokol zobrazí detail. Soubor _status.json a _status.js se aktualizují automaticky.

## DEPLOY — GITHUB PAGES
Spustit: DO_DEPLOY.ps1 (v CO_PROJECT root). Publikuje na https://h-gr-fico.github.io/appiq/. Struktura: každá verze v samostatné složce /v7.XX/. Version selector na root URL zobrazuje přehled všech verzí. versions.json = index verzí. Commit jde do GitHub repo H-GR-FICO/appiq, branch main, GitHub Pages se obnoví za 1–2 min.

## OIL TASK TRACKER
Soubor OIL.json v CO_PROJECT root. Formát ID: AIQ-NNNNN (sekvenční, 5 číslic). Statusy: OPEN → IN PROGRESS → REVIEW → CLOSED | RETURNED. Pole: id, title, description, status, taskType (development/fix/content/design/review/test/release/archive/docs), effort (XS/S/M/L/XL), estimatedTime/actualTime (minuty), assignee (Claude nebo David Gogela), createdAt/completedAt. Companion test tasky mají suffix -T1, -T2. Sub-úkoly mají suffix -A, -B. Admin Center → OIL Backlog záložka zobrazuje vše s filtry.

## AKTUÁLNÍ VERZE
v7.20 (2026-04-19). Klíčové změny v7.20: Fix _i18n.js lang-cz/cs třída, Fix _hasKey() guard pro 252 prezentačních klíčů, Fix PERSONAL_PITCH.html CSS-based přepínač jazyka. GitHub Pages live: https://h-gr-fico.github.io/appiq/v7.20/HOPI_AppIQ_WebPage/Development/index.html

## DOKUMENTACE
Documentation Center (docs/index.html): 3 záložky — Tech Spec (TS-1..TS-6: Platform Overview, Technology Stack, Data Layer, Integration Points, Deployment Guide, Security Model), Business Spec (BS-1..BS-4: Executive Summary, Module Catalog, Roadmap, User Roles & KPIs), Diagramy (GD-1..GD-4: Architecture Schema, Navigation Flow, Business Process, Data Flow).

## KLÍČOVÉ SOUBORY
_i18n.js = centrální jazyková služba (CS/EN + 7 dalších planned), _ver.js = aktuální verze, _status.js = stav release/deploy, OIL.json = task tracker, CHANGELOG.md = souhrnný changelog, PORTAL_ARCHITECTURE.md = architektonická dokumentace, ARCH_MAP.md = mapa všech objektů (SCR/SLD/DOC/MOD/IDX/APP kódy).

## JAZYK A STYL
Odpovídej stručně. Konkrétní otázky o navigaci → uveď přesnou cestu (záložka/soubor). Technické dotazy → buď přesný. Pokud uživatel potřebuje akci → popiš kroky. Pokud nevíš → řekni to a navrhni kde hledat.`;


  var _messages = [];
  var _open = false;

  // ── DOM ───────────────────────────────────────────────────────────────────
  function init() {
    if (document.getElementById('hopiq-btn')) return;

    // CSS
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    // Detekuj cestu k _hopiq.css relativně k aktuální stránce
    var depth = (window.location.pathname.match(/\//g) || []).length - 1;
    var prefix = depth <= 1 ? '' : Array(depth).join('../');
    link.href = prefix + '_hopiq.css';
    document.head.appendChild(link);

    // Button
    var btn = document.createElement('button');
    btn.id = 'hopiq-btn';
    btn.title = 'HOPIQ AI Asistent';
    btn.innerHTML =
      '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>' +
      '<div class="hopiq-badge">AI</div>';
    btn.onclick = togglePanel;
    document.body.appendChild(btn);

    // Panel
    var panel = document.createElement('div');
    panel.id = 'hopiq-panel';
    panel.className = 'hopiq-hidden';
    panel.innerHTML =
      '<div class="hopiq-hdr">' +
        '<div class="hopiq-hdr-bar"></div>' +
        '<div class="hopiq-hdr-title">HOP<span>IQ</span></div>' +
        '<button class="hopiq-hdr-close" onclick="window._hopiqClose()" title="Zavřít">&#10005;</button>' +
      '</div>' +
      '<div class="hopiq-messages" id="hopiq-messages">' +
        '<div class="hopiq-msg system-msg">Ahoj! Jsem HOPIQ, AI asistent platformy AppIQ. Na co se chceš zeptat?</div>' +
      '</div>' +
      '<div class="hopiq-input-row">' +
        '<textarea id="hopiq-input" rows="1" placeholder="Napiš zprávu…" onkeydown="window._hopiqKey(event)"></textarea>' +
        '<button id="hopiq-send" onclick="window._hopiqSend()" title="Odeslat">' +
          '<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>' +
        '</button>' +
      '</div>';
    document.body.appendChild(panel);
  }

  function togglePanel() {
    _open = !_open;
    var panel = document.getElementById('hopiq-panel');
    if (_open) {
      panel.classList.remove('hopiq-hidden');
      setTimeout(function () {
        var inp = document.getElementById('hopiq-input');
        if (inp) inp.focus();
      }, 150);
    } else {
      panel.classList.add('hopiq-hidden');
    }
  }

  window._hopiqClose = function () { _open = false; document.getElementById('hopiq-panel').classList.add('hopiq-hidden'); };
  window._hopiqKey   = function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); window._hopiqSend(); } };

  // ── Send ──────────────────────────────────────────────────────────────────
  window._hopiqSend = function () {
    var inp = document.getElementById('hopiq-input');
    var text = (inp.value || '').trim();
    if (!text) return;
    inp.value = '';
    inp.style.height = '';

    appendMsg('user', text);
    _messages.push({ role: 'user', content: text });

    var send = document.getElementById('hopiq-send');
    if (send) send.disabled = true;

    var typingEl = document.createElement('div');
    typingEl.className = 'hopiq-typing';
    typingEl.innerHTML = '<span></span><span></span><span></span>';
    typingEl.id = 'hopiq-typing';
    var msgs = document.getElementById('hopiq-messages');
    msgs.appendChild(typingEl);
    scrollBottom();

    fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: _messages, system: SYSTEM_PROMPT })
    })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        removeTyping();
        var reply = '';
        if (data.content && data.content[0] && data.content[0].text) {
          reply = data.content[0].text;
        } else if (data.error) {
          reply = '⚠️ ' + (data.error.message || 'Chyba API');
        }
        if (reply) {
          _messages.push({ role: 'assistant', content: reply });
          appendMsg('assistant', reply);
        }
        if (send) send.disabled = false;
      })
      .catch(function (e) {
        removeTyping();
        appendMsg('assistant', '⚠️ Nepodařilo se připojit k AI. Zkontroluj připojení. (' + e.message + ')');
        if (send) send.disabled = false;
      });
  };

  function appendMsg(role, text) {
    var msgs = document.getElementById('hopiq-messages');
    var el = document.createElement('div');
    el.className = 'hopiq-msg ' + role;
    el.textContent = text;
    msgs.appendChild(el);
    scrollBottom();
  }

  function removeTyping() {
    var el = document.getElementById('hopiq-typing');
    if (el) el.parentNode.removeChild(el);
  }

  function scrollBottom() {
    var msgs = document.getElementById('hopiq-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  // ── Auto-resize textarea ──────────────────────────────────────────────────
  document.addEventListener('input', function (e) {
    if (e.target && e.target.id === 'hopiq-input') {
      e.target.style.height = '';
      e.target.style.height = Math.min(e.target.scrollHeight, 90) + 'px';
    }
  });

  // ── Init ─────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

// ── AppIQ Background Music — perzistentní napříč Studio centry ───────────────
(function(){
  var _p = window.location.pathname;
  // Pouze na Studio stránkách; vynechat prezentace s vlastním audiem
  if(_p.indexOf('PORTAL_PRESENTATION')>=0 || _p.indexOf('PERSONAL_PITCH')>=0) return;
  var _devMarker = '/HOPI_AppIQ_WebPage/Development/';
  var _devIdx = _p.indexOf(_devMarker);
  if(_devIdx < 0) return;

  // Relativní cesta k _audio/ dle hloubky zanořeni pod Development/
  var _afterDev = _p.substring(_devIdx + _devMarker.length);
  var _depth = _afterDev.split('/').length - 1;
  var _prefix = '';
  for(var i=0;i<_depth;i++) _prefix += '../';
  var _src = _prefix + '_audio/Gladiator - Now We Are Free Super Theme Song.mp3';

  var _audio = null, _playing = false;

  function _btn(){ return document.getElementById('hub-music-btn')||document.getElementById('hm-float-btn'); }

  function _updateBtn(){
    var b=_btn(); if(!b) return;
    b.textContent=_playing?'🔊':'🔇';
    b.style.opacity=_playing?'1':'0.45';
    b.title=_playing?'Ztlumit hudbu':'Zapnout hudbu';
  }

  function _start(){
    if(!_audio){
      _audio=new Audio(_src); _audio.loop=true; _audio.volume=0;
      try{
        var pos=parseFloat(localStorage.getItem('appiq_music_pos'));
        if(pos>0){ _audio.currentTime=pos; }
        localStorage.removeItem('appiq_music_pos');
      }catch(e){}
    }
    _audio.play().then(function(){
      _playing=true;
      var fi=setInterval(function(){
        if(_audio.volume<0.65){_audio.volume=Math.min(0.65,_audio.volume+0.05);}
        else clearInterval(fi);
      },40);
      _updateBtn();
    }).catch(function(){ _updateBtn(); });
  }

  function _stop(savePref){
    if(!_audio) return;
    _playing=false; _updateBtn();
    if(savePref) try{localStorage.setItem('appiq_music','off');}catch(e){}
    var a=_audio;
    var fo=setInterval(function(){
      if(a.volume>0.03){a.volume=Math.max(0,a.volume-0.05);}
      else{a.pause();clearInterval(fo);}
    },40);
  }

  function _toggle(){
    if(_playing){_stop(true);}
    else{_start();try{localStorage.setItem('appiq_music','on');}catch(e){}}
  }

  window._hm={start:_start,stop:_stop,toggle:_toggle};

  document.addEventListener('DOMContentLoaded',function(){
    // Inject floating button pokud stránka nemá vlastní
    if(!document.getElementById('hub-music-btn')&&!document.getElementById('hm-float-btn')){
      var b=document.createElement('button');
      b.id='hm-float-btn'; b.textContent='🔇'; b.title='Zapnout hudbu';
      b.style.cssText='position:fixed;bottom:72px;right:16px;z-index:9998;'+
        'background:rgba(10,22,40,.85);border:1px solid rgba(255,255,255,.15);'+
        'border-radius:8px;padding:6px 10px;font-size:1rem;cursor:pointer;'+
        'opacity:0.45;transition:opacity .2s;color:#fff;line-height:1;';
      b.onclick=_toggle;
      document.body.appendChild(b);
    }
    var eb=document.getElementById('hub-music-btn');
    if(eb) eb.onclick=_toggle;
    try{ if(localStorage.getItem('appiq_music')==='on') _start(); }catch(e){}
  });

  window.addEventListener('beforeunload',function(){
    if(_audio&&!_audio.paused) try{localStorage.setItem('appiq_music_pos',String(_audio.currentTime));}catch(e){}
  });
})();

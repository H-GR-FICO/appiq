/**
 * HOPIQ Cockpit Agent — Shared Floating Widget
 * Injected on all cockpit sub-pages via _shell.js.
 * On MANAGEMENT_COCKPIT.html the widget is already in the HTML — this script skips silently.
 */
(function () {
  if (document.getElementById('hopiq-btn')) return; // already present (main cockpit)

  // ── Load data bundles if not already set ──────────────────────────────────
  function loadBundle(src) {
    if (document.querySelector('script[src="' + src + '"]')) return;
    var s = document.createElement('script');
    s.src = src;
    document.head.appendChild(s);
  }
  if (!window.OIL_DATA)   loadBundle('oil-data.js');
  if (!window.BOIL_DATA)  loadBundle('boil-data.js');
  if (!window.HOPIQ_KB)   loadBundle('kb.js');

  // ── Inject CSS ────────────────────────────────────────────────────────────
  var css = document.createElement('style');
  css.textContent = [
    '#hopiq-btn{position:fixed;bottom:24px;right:24px;z-index:800;width:56px;height:56px;',
    'border-radius:50%;background:linear-gradient(135deg,#a855f7,#7c3aed);border:none;',
    'font-size:1.5rem;cursor:pointer;display:flex;align-items:center;justify-content:center;',
    'box-shadow:0 4px 20px rgba(168,85,247,.5);transition:transform .2s,box-shadow .2s;}',
    '#hopiq-btn:hover{transform:scale(1.1);box-shadow:0 6px 28px rgba(168,85,247,.8);}',
    '#hopiq-panel{position:fixed;bottom:92px;right:24px;z-index:800;width:380px;max-height:520px;',
    'background:#0d1117;border:1px solid rgba(168,85,247,.35);border-radius:16px;',
    'display:flex;flex-direction:column;box-shadow:0 8px 40px rgba(0,0,0,.7);overflow:hidden;}',
    '#hopiq-panel-hdr{display:flex;align-items:center;justify-content:space-between;',
    'padding:12px 16px;background:linear-gradient(90deg,#1a0a2e,#0d1117);',
    'border-bottom:1px solid rgba(168,85,247,.2);font-size:.85rem;font-weight:600;',
    'color:#e2d9f3;font-family:"Segoe UI",system-ui,sans-serif;}',
    '#hopiq-close{background:none;border:none;color:#888;font-size:1rem;cursor:pointer;',
    'padding:2px 6px;border-radius:4px;}',
    '#hopiq-close:hover{color:#e2d9f3;background:rgba(168,85,247,.2);}',
    '#hopiq-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;',
    'gap:8px;font-family:"Segoe UI",system-ui,sans-serif;}',
    '.hq-msg{max-width:88%;padding:8px 12px;border-radius:12px;font-size:.82rem;',
    'line-height:1.45;white-space:pre-wrap;}',
    '.hq-msg.user{background:rgba(168,85,247,.25);color:#e2d9f3;align-self:flex-end;}',
    '.hq-msg.assistant{background:rgba(255,255,255,.06);color:#c9d1d9;align-self:flex-start;}',
    '.hq-msg.system{background:rgba(0,200,100,.08);color:#7ee787;align-self:center;',
    'font-size:.78rem;font-style:italic;}',
    '.hq-typing{align-self:flex-start;display:flex;gap:4px;padding:10px 12px;',
    'background:rgba(255,255,255,.06);border-radius:12px;}',
    '.hq-typing span{width:6px;height:6px;background:#a855f7;border-radius:50%;',
    'animation:hq-bounce 1.2s infinite;}',
    '.hq-typing span:nth-child(2){animation-delay:.2s;}',
    '.hq-typing span:nth-child(3){animation-delay:.4s;}',
    '@keyframes hq-bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}',
    '#hopiq-input-row{display:flex;gap:8px;padding:10px 12px;',
    'border-top:1px solid rgba(168,85,247,.15);background:#0d1117;}',
    '#hopiq-input{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(168,85,247,.25);',
    'border-radius:8px;padding:8px 10px;color:#e2d9f3;font-size:.82rem;resize:none;',
    'font-family:"Segoe UI",system-ui,sans-serif;outline:none;line-height:1.4;min-height:36px;}',
    '#hopiq-input:focus{border-color:#a855f7;}',
    '#hopiq-send{background:linear-gradient(135deg,#a855f7,#7c3aed);border:none;',
    'border-radius:8px;color:#fff;width:36px;height:36px;cursor:pointer;font-size:1rem;',
    'display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
    '#hopiq-send:disabled{opacity:.4;}',
    '@media(max-width:480px){',
    '#hopiq-panel{width:calc(100vw - 24px);right:12px;bottom:88px;}',
    '#hopiq-btn{right:16px;bottom:16px;}}'
  ].join('');
  document.head.appendChild(css);

  // ── Inject HTML ───────────────────────────────────────────────────────────
  var frag = document.createElement('div');
  frag.innerHTML = '<button id="hopiq-btn" onclick="hopiqToggle()" title="HOPIQ Agent">🤖</button>'
    + '<div id="hopiq-panel" style="display:none">'
    + '<div id="hopiq-panel-hdr"><span>🤖 HOPIQ · Cockpit Agent</span>'
    + '<button id="hopiq-close" onclick="hopiqToggle()">✕</button></div>'
    + '<div id="hopiq-msgs"></div>'
    + '<div id="hopiq-input-row">'
    + '<textarea id="hopiq-input" rows="1" placeholder="Zeptej se na projekt…"'
    + ' onkeydown="hopiqKey(event)" oninput="hopiqResize(this)"></textarea>'
    + '<button id="hopiq-send" onclick="hopiqSend()">➤</button>'
    + '</div></div>';
  while (frag.firstChild) document.body.appendChild(frag.firstChild);

  // ── State ─────────────────────────────────────────────────────────────────
  var _hqOpen = false;
  var _hqMsgs = [];
  var _hqSending = false;
  var HQ_PROXY = 'https://hopi-appiq.dgogela.workers.dev';

  // ── System prompt builder (lean — live data + KB, no duplicates) ──────────
  function hopiqBuildSystem() {
    var oil = (window.OIL_DATA  && window.OIL_DATA.tasks)  || [];
    var biz = (window.BOIL_DATA && window.BOIL_DATA.tasks) || [];
    var oilTotal  = oil.length;
    var oilOpen   = oil.filter(function(t){ return t.status==='OPEN'||t.status==='IN PROGRESS'; }).length;
    var oilClosed = oil.filter(function(t){ return t.status==='CLOSED'; }).length;
    var bizOpen   = biz.filter(function(t){ return t.status==='OPEN'||t.status==='IN PROGRESS'; }).length;

    var prioOrder = {CRITICAL:0, HIGH:1, MEDIUM:2, LOW:3};
    var openTasks = oil.filter(function(t){ return t.status==='OPEN'||t.status==='IN PROGRESS'; })
      .sort(function(a,b){ return (prioOrder[a.priority]||9)-(prioOrder[b.priority]||9); })
      .slice(0, 40);
    var openList = openTasks.map(function(t){
      return '  [' + t.status + '] ' + t.id + ' ' + (t.priority||'') + ' — ' + t.title;
    }).join('\n');

    var recentClosed = oil.filter(function(t){ return t.status==='CLOSED' && t.completedAt; })
      .sort(function(a,b){ return (b.completedAt||'').localeCompare(a.completedAt||''); })
      .slice(0, 20);
    var closedList = recentClosed.map(function(t){
      return '  ' + t.id + ' (' + (t.completedAt||'').slice(0,10) + ') — ' + t.title;
    }).join('\n');

    var disc = window.DISC_LOG_DATA || [];
    var discList = '';
    if (Array.isArray(disc) && disc.length) {
      discList = disc.slice(-15).reverse().map(function(d){
        return '  [' + (d.type||'') + '] ' + (d.id||'') + ' — ' + (d.title||d.text||'');
      }).join('\n');
    }

    return 'Jsi HOPIQ — AI agent Management Cockpitu HOPI AppIQ. Odpovídej stručně, přesně a profesionálně. Jazyk: čeština nebo angličtina dle dotazu. Máš přístup k živým datům projektu i znalostní bázi celé platformy.\n\n'
      + '## LIVE DATA (' + new Date().toLocaleDateString('cs-CZ') + ')\n'
      + 'AIQ tasky: celkem ' + oilTotal + ' | otevřených: ' + oilOpen + ' | hotových: ' + oilClosed + '\n'
      + 'BIZ tasky: celkem ' + biz.length + ' | otevřených: ' + bizOpen + '\n\n'
      + '## OTEVŘENÉ ÚKOLY (dle priority)\n' + (openList || '  žádné') + '\n\n'
      + '## NEDÁVNO DOKONČENO\n' + (closedList || '  žádná data') + '\n\n'
      + (discList ? '## NEDÁVNÁ ROZHODNUTÍ (DISC LOG)\n' + discList + '\n\n' : '')
      + (window.HOPIQ_KB ? '---\n\n' + window.HOPIQ_KB : '');
  }

  // ── Chat functions (exposed to window for inline onclick handlers) ─────────
  function hopiqToggle() {
    _hqOpen = !_hqOpen;
    var panel = document.getElementById('hopiq-panel');
    panel.style.display = _hqOpen ? 'flex' : 'none';
    if (_hqOpen && _hqMsgs.length === 0) {
      hopiqAppend('system', 'Ahoj! Jsem HOPIQ — tvůj cockpit agent. Zeptej se na stav projektu, úkoly, termíny nebo strategii.');
    }
    if (_hqOpen) setTimeout(function(){ document.getElementById('hopiq-input').focus(); }, 50);
  }

  function hopiqSend() {
    if (_hqSending) return;
    var inp = document.getElementById('hopiq-input');
    var text = (inp.value || '').trim();
    if (!text) return;
    inp.value = ''; inp.style.height = '';
    hopiqAppend('user', text);
    _hqMsgs.push({role:'user', content:text});
    _hqSending = true;
    document.getElementById('hopiq-send').disabled = true;

    var typing = document.createElement('div');
    typing.className = 'hq-typing'; typing.id = 'hq-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    document.getElementById('hopiq-msgs').appendChild(typing);
    hopiqScroll();

    fetch(HQ_PROXY, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({messages: _hqMsgs, system: hopiqBuildSystem()})
    })
    .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
    .then(function(data){
      var el = document.getElementById('hq-typing'); if(el) el.remove();
      var reply = (data.content && data.content[0] && data.content[0].text)
        || (data.error && ('⚠️ ' + data.error.message)) || '⚠️ Prázdná odpověď';
      _hqMsgs.push({role:'assistant', content:reply});
      hopiqAppend('assistant', reply);
    })
    .catch(function(e){
      var el = document.getElementById('hq-typing'); if(el) el.remove();
      hopiqAppend('assistant', '⚠️ Nepodařilo se připojit. (' + e.message + ')');
    })
    .finally(function(){
      _hqSending = false;
      document.getElementById('hopiq-send').disabled = false;
    });
  }

  function hopiqAppend(role, text) {
    var msgs = document.getElementById('hopiq-msgs');
    var el = document.createElement('div');
    el.className = 'hq-msg ' + role;
    el.textContent = text;
    msgs.appendChild(el);
    hopiqScroll();
  }
  function hopiqScroll() { var m = document.getElementById('hopiq-msgs'); if(m) m.scrollTop = m.scrollHeight; }

  window.hopiqToggle = hopiqToggle;
  window.hopiqSend   = hopiqSend;
  window.hopiqKey    = function(e) { if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); hopiqSend(); } };
  window.hopiqResize = function(el) { el.style.height=''; el.style.height = Math.min(el.scrollHeight,80)+'px'; };
})();

// ── HOPIQ Chat Widget ─────────────────────────────────────────────────────────
// Sdíleno všemi stránkami AppIQ. Umístění: CO_PROJECT root.
// Proxy: https://hopi-appiq.dgogela.workers.dev
// Model: claude-haiku-4-5-20251001
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  var PROXY_URL = 'https://hopi-appiq.dgogela.workers.dev';
  var MODEL     = 'claude-haiku-4-5-20251001';
  var MAX_TOKENS = 1024;

  var SYSTEM_PROMPT = [
    'Jsi HOPIQ — AI asistent platformy HOPI AppIQ.',
    'HOPI AppIQ je AI-powered Enterprise Application Platform vyvíjená uvnitř skupiny HOPI Holding.',
    'HOPI Holding je středoevropská skupina s divisemi: Supply Chain, Foods, Agriculture, Services, Holding.',
    'AppIQ je vyvíjen Davidem Gogelou (Head of Group Controlling) jako interní pilot Finance Phase 0.',
    'Cíl: nasadit AppIQ na všechny divize HOPI → spin-off jako 6. divize HOPI Tech → komerční SaaS.',
    'AppIQ Studio obsahuje: Hub (rozcestník), Prezentaci platformy, Personal Pitch, Admin Center, Dev/Test Center, Documentation Center.',
    'Finance portál (APP stream) obsahuje: Calendar, Tracking, OrgChart, Reporting, FX, SAP, BNS integrace.',
    'Komunikuj stručně a profesionálně. Odpovídej česky pokud se ptají česky, anglicky pokud anglicky.',
    'Pokud nevíš přesnou odpověď, řekni to upřímně a nabídni co víš.'
  ].join(' ');

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

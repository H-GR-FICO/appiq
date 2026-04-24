// HOPI AppIQ — Platform version badge (auto-injected on all pages)
// Reads version from _ver.js (PREZ_VERSION) — no hardcoded version string here.
// If _ver.js is not already loaded, it is injected dynamically from the same directory.
(function(){
  function injectBadge() {
    if (document.getElementById('ver-badge')) return;
    var v = (typeof PREZ_VERSION !== 'undefined') ? PREZ_VERSION : '';
    if (!v) return;
    var el = document.createElement('div');
    el.id = 'ver-badge';
    el.textContent = 'HOPI AppIQ · ' + v;
    var btm = window.innerWidth < 900 ? '88px' : '8px';
    el.style.cssText = 'position:fixed;bottom:' + btm + ';right:14px;z-index:100001;font-size:10px;color:rgba(148,163,184,0.5);font-family:\'Segoe UI\',system-ui,sans-serif;pointer-events:none;user-select:none;letter-spacing:.3px;line-height:1';
    function doInject(){ if(!document.getElementById('ver-badge')&&document.body) document.body.appendChild(el); }
    if(document.body){ doInject(); } else { document.addEventListener('DOMContentLoaded',doInject); }
  }

  if (typeof PREZ_VERSION !== 'undefined') {
    injectBadge();
  } else {
    var me = document.currentScript || (function(){ var ss=document.getElementsByTagName('script'); return ss[ss.length-1]; })();
    var base = me && me.src ? me.src.replace(/_ver-badge\.js(\?.*)?$/, '') : '';
    var s = document.createElement('script');
    s.src = base + '_ver.js';
    s.onload = injectBadge;
    document.head.appendChild(s);
  }
})();

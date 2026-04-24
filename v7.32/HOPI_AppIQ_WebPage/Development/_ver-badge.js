// HOPI AppIQ — Platform version badge (auto-injected on all pages)
// Version string auto-updated by DO_DEPLOY.ps1 — do not edit manually
const PLATFORM_VER = 'v7.32';
(function(){
  var v = (typeof PREZ_VERSION !== 'undefined') ? PREZ_VERSION : PLATFORM_VER;
  var el = document.createElement('div');
  el.id = 'ver-badge';
  el.textContent = 'HOPI AppIQ · ' + v;
  el.style.cssText = 'position:fixed;bottom:8px;right:14px;z-index:100001;font-size:10px;color:rgba(148,163,184,0.5);font-family:\'Segoe UI\',system-ui,sans-serif;pointer-events:none;user-select:none;letter-spacing:.3px;line-height:1';
  function inject(){ if(!document.getElementById('ver-badge')&&document.body) document.body.appendChild(el); }
  if(document.body){ inject(); } else { document.addEventListener('DOMContentLoaded',inject); }
})();

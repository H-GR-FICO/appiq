// ── HOPI AppIQ — Responsive Design Compatibility Matrix ──────────────────────
// Jediné místo pro evidenci responsivního stavu všech streamů.
// Aktualizovat synchronně se změnami responsive CSS.
// Načítá: index.html (Tech Arch panel → záložka RESP)
// ─────────────────────────────────────────────────────────────────────────────

const RESPONSIVE_DATA = {
  version:     'v7.8',
  lastUpdated: '2026-04-17',
  note:        'Aktualizovat při každé změně responsive CSS (breakpointy, clamp, nové třídy).',

  // ── STATUS LEGENDA ──────────────────────────────────────────────────────────
  // green  = plně optimalizováno, žádné vizuální problémy
  // yellow = funkční, drobné nedostatky nebo nepříjemnosti
  // red    = viditelné problémy, doporučujeme nesdílet / upozornit příjemce
  // ───────────────────────────────────────────────────────────────────────────

  streams: [

    // ══ PROMO WEB ══════════════════════════════════════════════════════════
    {
      id:    'WEB',
      name:  'Promo web',
      file:  'HOPI_AppIQ_WebPage/Development/index.html',
      recommendation: 'Sdílet na 1366px+ desktop/laptop. Mobilní zobrazení funkční ale ne ideální.',
      breakpoints: [
        {
          range:  '≥3200px',
          label:  'Ultrawide 3440×1440',
          status: 'green',
          note:   'max-width 2000px, hero clamp(100–140px), nav 70px — plně optimalizováno.',
          oil:    null
        },
        {
          range:  '1920–3199px',
          label:  'Full HD / 2560px wide',
          status: 'green',
          note:   'max-width 1400px, clamp typografie, pillars-grid s větším gapem.',
          oil:    null
        },
        {
          range:  '1200–1919px',
          label:  'Standard laptop / desktop',
          status: 'green',
          note:   'Výchozí CSS — padding, gridy, typografie vše v pořádku.',
          oil:    null
        },
        {
          range:  '769–1199px',
          label:  'Tablet landscape',
          status: 'yellow',
          note:   'Menší padding (70px 32px). Obsah se zkomprimuje, ale stránka vypadá čistě.',
          oil:    'AIQ-00041'
        },
        {
          range:  '481–768px',
          label:  'Tablet / velký telefon',
          status: 'yellow',
          note:   'Gridy → 1 sloupec, CTA tlačítka přes celou šířku, HOPI logo v navu schováno. Funkční ale hodně scrollování.',
          oil:    'AIQ-00041'
        },
        {
          range:  '≤480px',
          label:  'Malý telefon',
          status: 'red',
          note:   'Arch/OIL nav tlačítka a HOPI stamp animace schována. Hero min 26px. Pod 360px neotestováno.',
          oil:    'AIQ-00041'
        }
      ]
    },

    // ══ PREZENTACE ═════════════════════════════════════════════════════════
    {
      id:    'PREZ',
      name:  'Prezentace',
      file:  'HOPI_AppIQ_WebPage/Development/PORTAL_PRESENTATION.html',
      recommendation: 'Ideál: 1440×900 nebo 1536×864 (14" laptop). Nesdílet na mobil. HD 1366×768 ověřit před sdílením.',
      note_inline:    'Biz-scale slidy z 90 % používají inline styly — nelze je plně škálovat CSS bez refactoringu (AIQ-00037).',
      breakpoints: [
        {
          range:  '≥3200px',
          label:  'Ultrawide 3440×1440',
          status: 'yellow',
          note:   'CSS-class prvky (titulky, padding) škálují. Inline obsah biz-scale slidů (labely, gridy) zůstává fixní.',
          oil:    'AIQ-00037'
        },
        {
          range:  '1921–3199px',
          label:  'Full HD / 2K',
          status: 'green',
          note:   'clamp() typografie, padding 100px — plynulé zobrazení.',
          oil:    null
        },
        {
          range:  '1537–1920px',
          label:  'Wide laptop / FHD 15.6"',
          status: 'green',
          note:   'Plynulé, clamp škáluje, vše viditelné.',
          oil:    null
        },
        {
          range:  '1441–1536px',
          label:  '14" 125% DPI (1536×864)',
          status: 'green',
          note:   'Primární cíl — výška ≤820px komprimuje padding, všechny slidy se vejdou.',
          oil:    null
        },
        {
          range:  '1367–1440px',
          label:  '14" 100% DPI (1440×900)',
          status: 'green',
          note:   'Sweet spot — specifický 1440px breakpoint + výška ≤820px. Nejlepší laptop zkušenost.',
          oil:    null
        },
        {
          range:  '1200–1366px',
          label:  'HD notebook (1366×768)',
          status: 'red',
          note:   'Dvojitý zásah: šířka ≤1366px (padding 36px, bsp-title 26px) + výška ≤768px (bsp-title 24px). Nejhorší scénář — ověřit v DevTools před sdílením.',
          oil:    'AIQ-00039'
        },
        {
          range:  '601–900px',
          label:  'Tablet (iPad landscape)',
          status: 'yellow',
          note:   'Gridy → 1 sloupec, Back/PDF tlačítka skryta, .sp-value hidden. Čitelné ale ochuzenné o detail.',
          oil:    'AIQ-00039'
        },
        {
          range:  '≤600px',
          label:  'Mobilní telefon',
          status: 'red',
          note:   'min-height:auto — slidy nejsou fullscreen, scrollují. Obsah není navržen pro mobilní zobrazení.',
          oil:    'AIQ-00039'
        }
      ]
    },

    // ══ FINANCE PORTÁL ═════════════════════════════════════════════════════
    {
      id:    'APP',
      name:  'Finance portál',
      file:  'HOPI_AppIQ/Development/index.html',
      recommendation: 'Primárně desktop 1440px+. Na mobilu se zobrazí mob-kpi overlay (KPI přehled skupiny).',
      note_mobile:    'Mobilní overlay #mob-kpi se spustí automaticky na ≤768px. Uživatel může přepnout na "Plná verze" (desktop fallback).',
      breakpoints: [
        {
          range:  '≥1920px',
          label:  'Full HD / Wide',
          status: 'green',
          note:   'App-grid karty 320px min, ikony 74px, fonty 20px — prostorné zobrazení.',
          oil:    null
        },
        {
          range:  '1201–1919px',
          label:  'Standard desktop / laptop',
          status: 'green',
          note:   'Sidebar + kalendář + topbar — ideální pracovní prostředí portálu.',
          oil:    null
        },
        {
          range:  '1025–1200px',
          label:  'Small laptop',
          status: 'yellow',
          note:   'HOPI GROUP nápis schován (uvolní místo). Sidebar 170px — funkční, trochu těsné statistiky.',
          oil:    'AIQ-00040'
        },
        {
          range:  '769–1024px',
          label:  'Tablet landscape',
          status: 'red',
          note:   'Sidebar 150px, topbar wrappuje do 2 řádků, datetime pryč. Pracovat lze ale nepohodlné. calc(100vh-160px) nerespektuje taller topbar.',
          oil:    'AIQ-00040'
        },
        {
          range:  '≤768px',
          label:  'Tablet / mobil (mob-kpi overlay)',
          status: 'yellow',
          note:   'Spustí se #mob-kpi overlay — skupinový KPI pohled, drill-down po divizích. Vhodné pro rychlou kontrolu. "Plná verze" přepíná na desktop layout.',
          oil:    null
        }
      ]
    }

  ]
};

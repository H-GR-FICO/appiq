// cockpit-data.js — shared section & cluster definitions
// Used by: MANAGEMENT_COCKPIT.html (via cockpit/cockpit-data.js)
//          cockpit/cluster.html    (via cockpit-data.js)

window.COCKPIT_SECTIONS = [
  { num:'01', icon:'🌟', name:{cs:'Motivační prostor',          en:'Motivation Chamber'},
    desc:{cs:'Loga, velká čísla, Phase mapa, citáty — WOW efekt pro majitele a investory.',
          en:'Logos, big numbers, phase map, quotes — WOW effect for owners and investors.'},
    url:'motivation.html', color:'violet' },

  { num:'02', icon:'🚀', name:{cs:'Plán startu · Odpočítávání', en:'Launch Plan · Countdown'},
    desc:{cs:'KDY SE TO STANE · 3 tracky: HOPI GROUP · B2C HOME (01.01.2027) · B2B Enterprise (01.01.2028).',
          en:'WHEN IT HAPPENS · 3 tracks: HOPI GROUP · B2C HOME (01.01.2027) · B2B Enterprise (01.01.2028).'},
    url:'launch-plan.html', color:'blue' },

  { num:'03', icon:'💰', name:{cs:'Obchodní model prodeje',     en:'Business Sales Model'},
    desc:{cs:'JAK TAM PŘIJDEME · Ceník · ARR projekce · Exit valuace · Transfer pricing · 4 scénáře.',
          en:'HOW WE GET THERE · Pricing · ARR projections · Exit valuations · Transfer pricing · 4 scenarios.'},
    url:'business-model.html', color:'amber' },

  { num:'04', icon:'🏛️', name:{cs:'Byznys architektura',        en:'Business Architecture'},
    desc:{cs:'PROČ TO FUNGUJE · 9D model · Platformová strategie · Tech vrstvy · Fázový plán · Diferenciace.',
          en:'WHY IT WORKS · 9D model · Platform strategy · Tech layers · Phase plan · Differentiation.'},
    url:'business-architecture.html', color:'violet' },

  { num:'05', icon:'📈', name:{cs:'Celkový přehled',            en:'Executive Overview'},
    desc:{cs:'KDE JSME TEĎ · Ranní briefing — agregát KPIs. Realita vs. model. Jeden pohled na celý stav.',
          en:'WHERE WE ARE · Morning briefing — KPI aggregate. Reality vs. model. One view on full state.'},
    url:'overview.html', color:'violet' },

  { num:'06', icon:'📊', name:{cs:'KPI přehled',                en:'Executive KPI Strip'},
    desc:{cs:'8 karet — open tasks, closed, countdown B2C, git commits, měsíční cost.',
          en:'8 cards — open tasks, closed, B2C countdown, git commits, monthly cost.'},
    url:'kpi.html', color:'blue' },

  { num:'07', icon:'🏦', name:{cs:'Finanční přehled',           en:'Financial Cockpit'},
    desc:{cs:'Monthly cost tracker, cash injection pipeline ($200k+), ROI argument.',
          en:'Monthly cost tracker, cash injection pipeline ($200k+), ROI argument.'},
    url:'financial.html', color:'green' },

  { num:'08', icon:'💸', name:{cs:'Sledování rozpočtu',         en:'Budget Track'},
    desc:{cs:'Milestone price tags, value delivery chart, cash back / návratnost.',
          en:'Milestone price tags, value delivery chart, cash back / ROI.'},
    url:'budget-track.html', color:'amber' },

  { num:'09', icon:'🗺️', name:{cs:'Milníkový plán',            en:'Milestone Timeline'},
    desc:{cs:'Fáze 0 → s.r.o. → B2C Beta → Launch → Enterprise · Klíčové milníky a datumy.',
          en:'Phase 0 → LLC → B2C Beta → Launch → Enterprise · Key milestones and dates.'},
    url:'timeline.html', color:'blue' },

  { num:'10', icon:'🎯', name:{cs:'Centrum řízení úkolů',       en:'Task Control Center'},
    desc:{cs:'OIL + BOIL unified — Priority Board (S1–S4), BIZ↔TECH Linked View, Capacity Split.',
          en:'OIL + BOIL unified — Priority Board (S1–S4), BIZ↔TECH Linked View, Capacity Split.'},
    url:'task-control.html', color:'amber' },

  { num:'11', icon:'📋', name:{cs:'TECH Task Board (OIL)',      en:'TECH Task Board (OIL)'},
    desc:{cs:'Všechny AIQ tasky — filtry, expand → OIL_CONTEXT detail. Burndown chart.',
          en:'All AIQ tasks — filters, expand → OIL_CONTEXT detail. Burndown chart.'},
    url:'oil-board.html', color:'violet' },

  { num:'12', icon:'💼', name:{cs:'BIZ Task Board (BOIL)',      en:'BIZ Task Board (BOIL)'},
    desc:{cs:'Všechny BIZ tasky — filtry stream/oblast/typ, expand → BKONTEXT detail.',
          en:'All BIZ tasks — filters stream/area/type, expand → BKONTEXT detail.'},
    url:'boil-board.html', color:'amber' },

  { num:'13', icon:'🏛', name:{cs:'Organizace a koordinace',    en:'Organization & Coordination'},
    desc:{cs:'Discussion Log — živý záznam strategických rozhodnutí. Odpovědnosti, kontakty.',
          en:'Discussion Log — live record of strategic decisions. Responsibilities, contacts.'},
    url:'org-coordination.html', color:'violet' },

  { num:'14', icon:'🪄', name:{cs:'Jednací místnost',           en:'Meeting Room'},
    desc:{cs:'Digitální flipchart + discussion board. Strategická místnost pro real-time spolupráci.',
          en:'Digital flipchart + discussion board. Strategic room for real-time collaboration.'},
    url:'meeting-room.html', color:'orange' },

  { num:'15', icon:'📜', name:{cs:'Záznam rozhodnutí',          en:'Decision Log'},
    desc:{cs:'Klíčová rozhodnutí — datum, kdo rozhodl, dopad, linked task.',
          en:'Key decisions — date, who decided, impact, linked task.'},
    url:'decisions.html', color:'amber' },

  { num:'16', icon:'⚖️', name:{cs:'Kapacita a odpovědnost',    en:'Capacity & Responsibility'},
    desc:{cs:'Claude vs David split, odpovědnostní matice, bottleneck (REVIEW tasky).',
          en:'Claude vs David split, responsibility matrix, bottleneck (REVIEW tasks).'},
    url:'capacity.html', color:'violet' },

  { num:'17', icon:'👥', name:{cs:'Projektový tým',             en:'Project Team'},
    desc:{cs:'Aktuální tým, stakeholders, target partneři (Anthropic, AWS, MS).',
          en:'Current team, stakeholders, target partners (Anthropic, AWS, MS).'},
    url:'team.html', color:'blue' },

  { num:'18', icon:'🔧', name:{cs:'Zdroje a náklady',           en:'Sources & Costs'},
    desc:{cs:'Lidská práce + AI Resources + SW & Tech + HW + Marketing + Budget per kategorie.',
          en:'Human work + AI Resources + SW & Tech + HW + Marketing + Budget per category.'},
    url:'sources.html', color:'green' },

  { num:'19', icon:'🧭', name:{cs:'Metodika',                   en:'Methodology'},
    desc:{cs:'AI pravidla, model selection guide (Opus/Sonnet/Haiku), budget strategie, workflow.',
          en:'AI rules, model selection guide (Opus/Sonnet/Haiku), budget strategy, workflow.'},
    url:'methodology.html', color:'violet' },

  { num:'20', icon:'🔗', name:{cs:'Dokumentace a odkazy',       en:'Documentation & Links'},
    desc:{cs:'Centrální správa linků — vždy nejnovější verze. Copy link per stránku. Jedno místo pro sdílení.',
          en:'Central link manager — always latest version. Copy link per page. One sharing hub.'},
    url:'documentation.html', color:'green' },

  { num:'21', icon:'🔀', name:{cs:'Výběr verze',                  en:'Release Selector'},
    desc:{cs:'Přehled všech nasazených verzí AppIQ — výběr verze ke spuštění.',
          en:'All deployed AppIQ versions — select a version to launch.'},
    url:'release-selector.html', color:'blue' },

  { num:'22', icon:'🎛️', name:{cs:'AI Control Room',             en:'AI Control Room'},
    desc:{cs:'Platformní infrastruktura — hooky, auditní log, health checks, session metriky.',
          en:'Platform infrastructure — hooks, audit log, health checks, session metrics.'},
    url:'ai-control-room.html', color:'blue' },

  { num:'23', icon:'🚀', name:{cs:'Deploy Control Room',         en:'Deploy Control Room'},
    desc:{cs:'[to be planned] Správa nasazení — pipeline, preflight, GitHub Pages, verze v produkci.',
          en:'[to be planned] Deployment management — pipeline, preflight, GitHub Pages, live versions.'},
    url:'#', color:'blue' },

  { num:'24', icon:'🔍', name:{cs:'Quality Control Room',        en:'Quality Control Room'},
    desc:{cs:'[to be planned] Stav testování — test tasky, code review log, vizuální audit.',
          en:'[to be planned] Quality status — test tasks, code review log, visual audit.'},
    url:'#', color:'blue' },

  { num:'25', icon:'🗄️', name:{cs:'Data Control Room',          en:'Data Control Room'},
    desc:{cs:'[to be planned] Zdraví datové vrstvy — JSON validace, OIL↔Context konzistence, DISC sekvence.',
          en:'[to be planned] Data layer health — JSON validation, OIL↔Context consistency, DISC sequence.'},
    url:'#', color:'blue' },

  { num:'26', icon:'📦', name:{cs:'Archive Control Room',        en:'Archive Control Room'},
    desc:{cs:'[to be planned] Správa archivace — session history, zálohovací zdraví, transcript rotace.',
          en:'[to be planned] Archive management — session history, backup health, transcript rotation.'},
    url:'#', color:'blue' },

  { num:'27', icon:'🏛️', name:{cs:'Founders Board',              en:'Founders Board'},
    desc:{cs:'Strategický brief pro leadership a investory — situace, produkt, AI window, diferenciace, ask.',
          en:'Strategic brief for leadership and investors — situation, product, AI window, differentiation, ask.'},
    url:'founders-board.html', color:'violet' },

  { num:'28', icon:'⬡', name:{cs:'Product Hub',                 en:'Product Hub'},
    desc:{cs:'6 otázek — celý příběh platformy. WHO WE ARE · WHAT WE OFFER · HOW WE WORK · HOW MUCH · HOW TO START · GO TO MARKET.',
          en:'6 questions — the full platform story. WHO WE ARE · WHAT WE OFFER · HOW WE WORK · HOW MUCH · HOW TO START · GO TO MARKET.'},
    url:'product-hub.html', color:'violet' },
];

window.COCKPIT_CLUSTERS = [
  {
    id: 'strategy',
    icon: '♟️',
    color: 'violet',
    name: { cs: 'Strategie',      en: 'Strategy' },
    desc: { cs: 'Vize · obchodní model · byznys architektura', en: 'Vision · business model · architecture' },
    sections: ['01', '03', '04', '27', '28']
  },
  {
    id: 'status',
    icon: '📡',
    color: 'blue',
    name: { cs: 'Stav projektu',  en: 'Project Status' },
    desc: { cs: 'Přehled · KPI · odpočítávání do launche', en: 'Overview · KPIs · launch countdown' },
    sections: ['02', '05', '06']
  },
  {
    id: 'finance',
    icon: '💰',
    color: 'green',
    name: { cs: 'Finance',        en: 'Finance' },
    desc: { cs: 'Finanční přehled · budget · zdroje a náklady', en: 'Financial overview · budget · sources & costs' },
    sections: ['07', '08', '18']
  },
  {
    id: 'execution',
    icon: '⚙️',
    color: 'amber',
    name: { cs: 'Exekuce',        en: 'Execution' },
    desc: { cs: 'Milníky · task control · TECH board · BIZ board', en: 'Milestones · task control · TECH board · BIZ board' },
    sections: ['09', '10', '11', '12']
  },
  {
    id: 'team',
    icon: '🤝',
    color: 'pink',
    name: { cs: 'Tým a řízení',   en: 'Team & Governance' },
    desc: { cs: 'Organizace · rozhodnutí · kapacita · tým', en: 'Organization · decisions · capacity · team' },
    sections: ['13', '14', '15', '16', '17']
  },
  {
    id: 'knowledge',
    icon: '🧠',
    color: 'blue',
    name: { cs: 'Znalosti',       en: 'Knowledge' },
    desc: { cs: 'Metodika · dokumentace a klíčové odkazy · výběr verze', en: 'Methodology · documentation & key links · release selector' },
    sections: ['19', '20', '21']
  },
  {
    id: 'control',
    icon: '🎛️',
    color: 'blue',
    name: { cs: 'Control',        en: 'Control' },
    desc: { cs: 'Platformní infrastruktura · nasazení · kvalita · data · archivace', en: 'Platform infrastructure · deployment · quality · data · archiving' },
    sections: ['22', '23', '24', '25', '26']
  },
];

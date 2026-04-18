// ═══════════════════════════════════════════════════════════════════════════════
// HOPI AppIQ — Jazyková služba (_i18n.js)
// Umístění: CO_PROJECT root (sdíleno všemi stránkami)
//
// Použití:
//   HTML:  <element data-i18n="key">fallback text</element>
//          <element data-i18n-html="key"></element>
//   JS:    I18n.t('key')
//   Init:  I18n.init()   ← zavolat na konci každé stránky
//   Switch: I18n.setLang('en')
//
// Přidat jazyk: přidat sekci do _T níže, stejné klíče jako 'cs'
// ═══════════════════════════════════════════════════════════════════════════════

window.I18n = (function () {

  // ── Metadata jazyků ──────────────────────────────────────────────────────────
  var _META = {
    cs: { name: 'Čeština',    flag: '🇨🇿', scope: 'all',     status: 'active'  },
    en: { name: 'English',    flag: '🇬🇧', scope: 'all',     status: 'active'  },
    sk: { name: 'Slovenčina', flag: '🇸🇰', scope: 'finance', status: 'planned' },
    hu: { name: 'Magyar',     flag: '🇭🇺', scope: 'finance', status: 'planned' },
    pl: { name: 'Polski',     flag: '🇵🇱', scope: 'finance', status: 'planned' },
    de: { name: 'Deutsch',    flag: '🇩🇪', scope: 'finance', status: 'planned' },
    ro: { name: 'Română',     flag: '🇷🇴', scope: 'finance', status: 'planned' },
    bg: { name: 'Български',  flag: '🇧🇬', scope: 'finance', status: 'planned' },
    hr: { name: 'Hrvatski',   flag: '🇭🇷', scope: 'finance', status: 'planned' }
  };

  // ── Překlady ─────────────────────────────────────────────────────────────────
  var _T = {

    // ════════════════════════════════════════════════════════════
    // CS — čeština (referenční jazyk, fallback pro všechny)
    // ════════════════════════════════════════════════════════════
    cs: {

      // ── Společné ──
      'common.loading':   'Načítám…',
      'common.refresh':   '↻ Obnovit',
      'common.save':      '💾 Uložit',
      'common.cancel':    'Zrušit',
      'common.close':     'Zavřít',
      'common.back':      '← Studio Hub',
      'common.open':      'Otevřít',
      'common.yes':       'Ano',
      'common.no':        'Ne',
      'common.planned':   'PLANNED',
      'common.active':    'ACTIVE',
      'common.stub':      'STUB',

      // ── Studio Hub ──
      'hub.title':        'Studio Hub',
      'hub.subtitle':     'HOPI AppIQ — Developer workspace · Standalone centra nahrazují overlay panel',
      'hub.stamp.loading':'Načítám stav…',
      'hub.stamp.file':   'Studio Hub — file:// mód',
      'hub.section.centers': 'Studio centra',
      'hub.section.status':  'Stav projektu',
      'hub.section.oil':     'Otevřené úkoly — OIL Backlog',
      'hub.oil.active':   'Aktivní úkoly (HIGH + IN PROGRESS)',
      'hub.oil.admin':    '→ Otevřít Admin Center',
      'hub.release.title':'Release',
      'hub.deploy.title': 'Deploy — GitHub Pages',
      'hub.stat.version': 'Verze',
      'hub.stat.archived':'Archivováno',
      'hub.stat.web':     'WEB složka',
      'hub.stat.app':     'APP složka',
      'hub.stat.published':'Publikováno',
      'hub.stat.commit':  'Commit',
      'hub.stat.branch':  'Branch',
      'hub.stat.url':     'URL',
      'hub.status.unavail':'_status.json nedostupný (file:// protokol)',
      'hub.status.http':  'Spusťte přes HTTP server nebo DO_SERVER.ps1',
      'hub.oil.unavail':  'OIL.json nedostupný (file:// protokol)',
      'hub.oil.all_closed':'✅ Všechny úkoly uzavřeny — gratulace!',
      'hub.footer.copy':  '© 2026 HOPI Holding a.s. — Group Controlling | David Gogela · Powered by Claude AI',

      // ── Karty center ──
      'card.admin.name':  'Admin Center',
      'card.admin.desc':  'OIL Backlog — sledování úkolů, editace, stavový flow. Release & Deploy — archivace, GitHub Pages publikace.',
      'card.dev.name':    'Dev Center',
      'card.dev.desc':    'System Map — ARCH_MAP.md viewer s filtrováním dle streamu. Responsivita. Architektura platformy.',
      'card.test.name':   'Test Center',
      'card.test.desc':   'QA checklisty per verzi, sign-off workflow, log known issues. Napojení na OIL.json.',
      'card.promo.name':  'Promo Web',
      'card.promo.desc':  'Landing page platformy HOPI AppIQ. Žádné dev nástroje. Hero, filozofie, HOPIQ, brand identity, launch.',
      'card.docs.name':   'Documentation Center',
      'card.docs.desc':   'Tech Spec, Business Spec, Diagramy — živá dokumentace platformy. Generováno z DOCS_CONFIG.',
      'card.prez.name':   'Prezentace',
      'card.prez.desc':   'Architektonický dokument platformy — bilingvní CS/EN, v6+. Slides pro management a stakeholdery.',
      'card.app.name':    'Finance Portal',
      'card.app.desc':    'HOPI AppIQ | Finance — Fáze 0. Kalendář uzávěrek, tracking, org. struktura, reportování, FX, SAP, BNS, Power BI.',

      // ── Admin Center ──
      'admin.title':      'Admin Center',
      'admin.tab.backlog':'📋 OIL Backlog',
      'admin.tab.release':'📦 Release & Deploy',
      'admin.tab.lang':   '🌐 Jazyky',
      'admin.oil.add':    '+ Přidat úkol',
      'admin.oil.connect':'🔗 Načíst OIL.json',
      'admin.oil.save':   '💾 Uložit',
      'admin.oil.audit':  '🔍 Audity',
      'admin.oil.help':   '❓ Nápověda',
      'admin.oil.settings':'⚙️ Nastavení',
      'admin.oil.title.placeholder':'Název úkolu…',
      'admin.oil.desc.placeholder': 'Popis úkolu…',
      'admin.oil.assignee.placeholder':'Řeší…',

      // ── Dev Center ──
      'dev.title':        'Dev Center',
      'dev.tab.archmap':  '🗺 Arch Map',
      'dev.tab.resp':     '🔔 Responsivita',
      'dev.tab.diagram':  '🏛 Architektura platformy',

      // ── Test Center ──
      'test.title':       'Test Center',
      'test.badge':       'PŘIPRAVUJE SE',
      'test.subtitle':    'QA centrum platformy HOPI AppIQ — checklisty, sign-off workflow a sledování known issues.',
      'test.planned':     'Implementace naplánována po dokončení Admin a Dev center.',
      'test.feat1.title': 'QA Checklisty',
      'test.feat1.desc':  'Testovací checklisty per verzi — WEB i APP stream.',
      'test.feat2.title': 'Sign-off Workflow',
      'test.feat2.desc':  'Formální schválení release Davidem Gogelou před deployem.',
      'test.feat3.title': 'Known Issues',
      'test.feat3.desc':  'Log otevřených bugů a regresí — napojení na OIL.json.',
      'test.oil.note':    'Sleduj stav implementace v OIL →',

      // ── OIL stavy a priority ──
      'oil.status.open':       '🔵 OPEN',
      'oil.status.inprogress': '🟠 IN PROGRESS',
      'oil.status.review':     '🟣 REVIEW',
      'oil.status.closed':     '✅ CLOSED',
      'oil.status.returned':   '🔴 RETURNED',
      'oil.status.cancelled':  '⚫ CANCELLED',
      'oil.prio.high':         'HIGH',
      'oil.prio.med':          'MED',
      'oil.prio.low':          'LOW',
      'oil.filter.all':        'ALL',
      'oil.more':              'dalších',
      'oil.open_admin':        'Otevřít Admin Center',

      // ── SCR-01 Intro screen ──
      'scr01.cta':  'Start presentation preview',

      // ── SCR-02 Story Behind (David doplní EN) ──
      'scr02.arc1a': 'Přišlo to tiše.',
      'scr02.arc1b': 'Svět se začal měnit.',
      'scr02.arc1c': 'Najednou jsme to všichni cítili.',
      'scr02.arc2a': 'Někteří čekali. Jiní se báli.',
      'scr02.arc2b': 'Já hledal.',
      'scr02.arc2c': 'Nástroje. Aplikace. Modely.',
      'scr02.arc2d': 'Nic nebylo moje.',
      'scr02.arc3a': 'Až se objevil Claude.',
      'scr02.arc3b': 'Poprvé někdo skutečně myslel se\u00a0mnou.',
      'scr02.arc3c': 'To je ono.',
      'scr02.arc3d': 'To se za mého života nebude opakovat.',
      'scr02.arc4a': 'Rozhodl jsem se.',
      'scr02.arc4b': 'Bez záruky. Bez mapy. Jen ta jistota.',
      'scr02.arc5a': 'Týdny intenzivní práce.',
      'scr02.arc5b': 'Ráno. Večer. Víkendy.',
      'scr02.arc5c': 'I Claude byl ve vleku.',
      'scr02.arc6a': 'A výsledek se dostavil.',
      'scr02.invite':'…tak pojďme se na to podívat',
      'scr02.nav':   'Přejít na přehled (nebo klikni kamkoli)',

      // ── SCR-03 Teaser ──
      'scr03.hints.label':  'Klíčové myšlenky prezentace',
      'scr03.h1.title':     'Podnikatelský záměr — vize autora',
      'scr03.h1.desc':      'David Gogela, Head of Group Controlling · osobní iniciativa, vlastní intelektuální vlastnictví, 5 pilířů záměru a plán vstupu investora',
      'scr03.h2.title':     'AI mění pravidla hry — okno je TEĎ',
      'scr03.h2.desc':      'Jako internet v 90. letech · firmy které to pochopí první, ovládnou odvětví · Anthropic / Claude jako strategický partner',
      'scr03.h3.title':     'Interní efektivita — meritem pro HOPI',
      'scr03.h3.desc':      'Finance pilot v provozu · 9 jazyků · modulární rozšíření na Operations, Purchasing, Legal · 5 000+ uživatelů skupiny',
      'scr03.h4.title':     'Tržní potenciál — od pilotu ke globálnímu SaaS',
      'scr03.h4.desc':      'Interní pilot → spin-off HOPI TechIQ s.r.o. → 6. divize skupiny → komerční SaaS · budujeme IT firmu zevnitř místo akvizice',
      'scr03.h5.title':     'Platforma nové generace — AppIQ',
      'scr03.h5.desc':      'Modulární · AI-native · enterprise-grade · mobile-first · multi-language · strategická partnerství: ARTIN, INTECS, Anthropic',
      'scr03.cta':          'Vstoupit do prezentace',
      'scr03.skip':         'přeskočit úvod',
      'scr03.back':         'Zpět na Story',

      // ── Language Management ──
      'lang.title':         'Správa jazyků',
      'lang.subtitle':      'Jazykové mutace platformy HOPI AppIQ',
      'lang.registry':      'Registr jazyků',
      'lang.col.lang':      'Jazyk',
      'lang.col.scope':     'Scope',
      'lang.col.status':    'Status',
      'lang.col.coverage':  'Pokrytí klíčů',
      'lang.scope.all':     'Studio + Finance',
      'lang.scope.finance': 'Finance Portal',
      'lang.status.active': 'Aktivní',
      'lang.status.planned':'Plánováno',
      'lang.howto.title':   'Jak přidat nový jazyk',
      'lang.howto.s1':      'Otevřít _i18n.js v CO_PROJECT root',
      'lang.howto.s2':      'Přidat sekci se stejnými klíči jako cs: { ... }',
      'lang.howto.s3':      'Přeložit všechny klíče (Studio: ~60 klíčů · Finance: ~40 klíčů)',
      'lang.howto.s4':      'Přidat metadata do _META (name, flag, scope, status)',
      'lang.howto.s5':      'Finance Portal: přidat volbu do language switcheru',
      'lang.howto.s6':      'Studio stránky: lang switch automaticky zobrazí nový jazyk',
      'lang.keys.title':    'Přehled klíčů',
      'lang.keys.key':      'Klíč',
      'lang.keys.cs':       'CS',
      'lang.keys.en':       'EN',
      'lang.keys.missing':  '⚠ chybí',

      // ── Kapacita (Admin Center) ──
      'admin.tab.capacity': '📊 Kapacita',
      'cap.unit.label':     'Jednotky:',
      'cap.unit.d.note':    '(1d = 8h)',
      'cap.summary.total':  'Celkem úkolů',
      'cap.summary.with_est':'S odhadem',
      'cap.summary.total_est':'Odhadnutý čas',
      'cap.summary.total_act':'Skutečný čas',
      'cap.summary.coverage': 'Pokrytí daty',
      'cap.effort.title':   'Effort (T-shirt)',
      'cap.effort.xs':      'XS — <30 min',
      'cap.effort.s':       'S — 30 min – 2 h',
      'cap.effort.m':       'M — 2 – 4 h',
      'cap.effort.l':       'L — 4 – 8 h',
      'cap.effort.xl':      'XL — 8+ h',
      'cap.effort.none':    'úkolů bez effort kategorie',
      'cap.assignee.title': 'Podle řešitele',
      'cap.type.title':     'Podle typu úkolu',
      'cap.type.none':      'úkolů bez taskType',
      'cap.domain.title':   'Podle domény',
      'cap.backlog.title':  'Otevřené úkoly',
      'cap.col.tasks':      'Úkolů',
      'cap.col.assignee':   'Řešitel',
      'cap.col.estimated':  'Odhad',
      'cap.col.actual':     'Skutečný',
      'cap.col.type':       'Typ',
      'cap.col.effort':     'Effort',
      'cap.no_oil':         'Načtěte OIL.json → Načíst OIL.json',
      'cap.no_data':        'Žádná kapacitní data. Doplňte estimatedTime, actualTime, effort a taskType do OIL úkolů.',
      'cap.type.development':'Vývoj',
      'cap.type.fix':       'Oprava',
      'cap.type.content':   'Obsah',
      'cap.type.design':    'Design',
      'cap.type.review':    'Review',
      'cap.type.approval':  'Schválení',
      'cap.type.test':      'Test',
      'cap.type.release':   'Release',
      'cap.type.archive':   'Archivace',
      'cap.type.research':  'Průzkum',
      'cap.type.docs':      'Dokumentace',
      'cap.form.tasktype':  '— Typ úkolu —',
      'cap.form.effort':    '— Effort —',
      'cap.form.esttime':   'Odhad (min)',
      'cap.form.acttime':   'Skutečný (min)',
      'cap.col.domain':     'Doména',
      'cap.col.id':         'ID',
      'cap.col.title':      'Název',
      'cap.col.priority':   'Priorita',
      'cap.col.status':     'Status',

      // ── OIL inline edit field labels ──
      'oil.field.desc':       'Popis',
      'oil.field.domain':     'Doména',
      'oil.field.module':     'Modul',
      'oil.field.component':  'Komponenta',
      'oil.field.assignee':   'Řeší',
      'oil.field.comment':    'Komentář',
      'oil.field.created':    'Zadáno',
      'oil.field.tasktype':   'Typ úkolu',
      'oil.inline.save':      'Uložit',

      // ── Documentation Center (FC-7) ──
      'docs.title':         'Documentation Center',
      'docs.tab.tech':      '📋 Tech Spec',
      'docs.tab.biz':       '📊 Business Spec',
      'docs.tab.diag':      '📐 Diagramy',

      // ── Language tab extras ──
      'lang.key.filter':    'Filtrovat klíče…',
      'lang.loading':       'Načítám jazykovou službu…',

      // ── Dev Center ──
      'dev.arch.map.title':   'Mapa vazeb — file connections',
      'dev.arch.files.title': 'Soubory projektu',
      'dev.resp.col.range':   'Rozsah',
      'dev.resp.col.format':  'Formát',
      'dev.resp.col.note':    'Poznámka',
      'dev.resp.col.oil':     'OIL úkol',
      'dev.resp.status.ok':          'OK',
      'dev.resp.status.acceptable':  'PŘIJATELNÉ',
      'dev.resp.status.risk':        'RIZIKO',

      // ── Finance Portal (APP stream) ──
      'app.title':          'HOPI AppIQ | Finance',
      'app.subtitle':       'Group Controlling Portal',
      'app.mod.calendar':   'Kalendář uzávěrek',
      'app.mod.tracking':   'Tracking',
      'app.mod.orgchart':   'Org. struktura',
      'app.mod.reporting':  'Reporting',
      'app.mod.fx':         'Kurzy měn',
      'app.mod.sap':        'SAP',
      'app.mod.bns':        'BNS',
      'app.mod.sharepoint': 'SharePoint',
      'app.mod.powerbi':    'Power BI',
      'app.mod.help':       'Nápověda'
    },

    // ════════════════════════════════════════════════════════════
    // EN — English
    // ════════════════════════════════════════════════════════════
    en: {

      // ── Common ──
      'common.loading':   'Loading…',
      'common.refresh':   '↻ Refresh',
      'common.save':      '💾 Save',
      'common.cancel':    'Cancel',
      'common.close':     'Close',
      'common.back':      '← Studio Hub',
      'common.open':      'Open',
      'common.yes':       'Yes',
      'common.no':        'No',
      'common.planned':   'PLANNED',
      'common.active':    'ACTIVE',
      'common.stub':      'STUB',

      // ── Studio Hub ──
      'hub.title':        'Studio Hub',
      'hub.subtitle':     'HOPI AppIQ — Developer workspace · Standalone centers replace overlay panel',
      'hub.stamp.loading':'Loading status…',
      'hub.stamp.file':   'Studio Hub — file:// mode',
      'hub.section.centers': 'Studio centers',
      'hub.section.status':  'Project status',
      'hub.section.oil':     'Open tasks — OIL Backlog',
      'hub.oil.active':   'Active tasks (HIGH + IN PROGRESS)',
      'hub.oil.admin':    '→ Open Admin Center',
      'hub.release.title':'Release',
      'hub.deploy.title': 'Deploy — GitHub Pages',
      'hub.stat.version': 'Version',
      'hub.stat.archived':'Archived',
      'hub.stat.web':     'WEB folder',
      'hub.stat.app':     'APP folder',
      'hub.stat.published':'Published',
      'hub.stat.commit':  'Commit',
      'hub.stat.branch':  'Branch',
      'hub.stat.url':     'URL',
      'hub.status.unavail':'_status.json unavailable (file:// protocol)',
      'hub.status.http':  'Run via HTTP server or DO_SERVER.ps1',
      'hub.oil.unavail':  'OIL.json unavailable (file:// protocol)',
      'hub.oil.all_closed':'✅ All tasks closed — congratulations!',
      'hub.footer.copy':  '© 2026 HOPI Holding a.s. — Group Controlling | David Gogela · Powered by Claude AI',

      // ── Center cards ──
      'card.admin.name':  'Admin Center',
      'card.admin.desc':  'OIL Backlog — task tracking, editing, status flow. Release & Deploy — archiving, GitHub Pages publishing.',
      'card.dev.name':    'Dev Center',
      'card.dev.desc':    'System Map — ARCH_MAP.md viewer with stream filtering. Responsiveness. Platform architecture.',
      'card.test.name':   'Test Center',
      'card.test.desc':   'QA checklists per version, sign-off workflow, known issues log. Connected to OIL.json.',
      'card.promo.name':  'Promo Web',
      'card.promo.desc':  'HOPI AppIQ platform landing page. No dev tools. Hero, philosophy, HOPIQ, brand identity, launch.',
      'card.docs.name':   'Documentation Center',
      'card.docs.desc':   'Tech Spec, Business Spec, Diagrams — live platform documentation. Generated from DOCS_CONFIG.',
      'card.prez.name':   'Presentation',
      'card.prez.desc':   'Platform architectural document — bilingual CS/EN, v6+. Slides for management and stakeholders.',
      'card.app.name':    'Finance Portal',
      'card.app.desc':    'HOPI AppIQ | Finance — Phase 0. Closing calendar, tracking, org chart, reporting, FX, SAP, BNS, Power BI.',

      // ── Admin Center ──
      'admin.title':      'Admin Center',
      'admin.tab.backlog':'📋 OIL Backlog',
      'admin.tab.release':'📦 Release & Deploy',
      'admin.tab.lang':   '🌐 Languages',
      'admin.oil.add':    '+ New task',
      'admin.oil.connect':'🔗 Load OIL.json',
      'admin.oil.save':   '💾 Save',
      'admin.oil.audit':  '🔍 Audits',
      'admin.oil.help':   '❓ Help',
      'admin.oil.settings':'⚙️ Settings',
      'admin.oil.title.placeholder':'Task title…',
      'admin.oil.desc.placeholder': 'Task description…',
      'admin.oil.assignee.placeholder':'Assigned to…',

      // ── Dev Center ──
      'dev.title':        'Dev Center',
      'dev.tab.archmap':  '🗺 Arch Map',
      'dev.tab.resp':     '🔔 Responsiveness',
      'dev.tab.diagram':  '🏛 Platform Architecture',

      // ── Test Center ──
      'test.title':       'Test Center',
      'test.badge':       'COMING SOON',
      'test.subtitle':    'HOPI AppIQ QA center — checklists, sign-off workflow and known issues tracking.',
      'test.planned':     'Implementation planned after Admin and Dev centers are complete.',
      'test.feat1.title': 'QA Checklists',
      'test.feat1.desc':  'Test checklists per version — WEB and APP stream.',
      'test.feat2.title': 'Sign-off Workflow',
      'test.feat2.desc':  'Formal release approval by David Gogela before deploy.',
      'test.feat3.title': 'Known Issues',
      'test.feat3.desc':  'Open bugs and regression log — connected to OIL.json.',
      'test.oil.note':    'Track implementation status in OIL →',

      // ── OIL statuses ──
      'oil.status.open':       '🔵 OPEN',
      'oil.status.inprogress': '🟠 IN PROGRESS',
      'oil.status.review':     '🟣 REVIEW',
      'oil.status.closed':     '✅ CLOSED',
      'oil.status.returned':   '🔴 RETURNED',
      'oil.status.cancelled':  '⚫ CANCELLED',
      'oil.prio.high':         'HIGH',
      'oil.prio.med':          'MED',
      'oil.prio.low':          'LOW',
      'oil.filter.all':        'ALL',
      'oil.more':              'more',
      'oil.open_admin':        'Open Admin Center',

      // ── SCR-01 ──
      'scr01.cta':  'Start presentation preview',

      // ── SCR-02 Story Behind — David doplní EN překlad ──
      // Fallback: zobrazí se CS verze dokud není EN přeložena
      'scr02.arc1a': 'It came quietly.',
      'scr02.arc1b': 'The world began to change.',
      'scr02.arc1c': 'Suddenly, we all felt it.',
      'scr02.arc2a': 'Some waited. Others feared.',
      'scr02.arc2b': 'I searched.',
      'scr02.arc2c': 'Tools. Applications. Models.',
      'scr02.arc2d': 'Nothing felt like mine.',
      'scr02.arc3a': 'Then Claude appeared.',
      'scr02.arc3b': 'For the first time, someone truly thought with\u00a0me.',
      'scr02.arc3c': 'This is it.',
      'scr02.arc3d': 'This will not happen again in my lifetime.',
      'scr02.arc4a': 'I made my decision.',
      'scr02.arc4b': 'No guarantees. No map. Just that certainty.',
      'scr02.arc5a': 'Weeks of intense work.',
      'scr02.arc5b': 'Mornings. Evenings. Weekends.',
      'scr02.arc5c': 'Even Claude was swept along.',
      'scr02.arc6a': 'And the result came.',
      'scr02.invite': '…so let\'s take a look',
      'scr02.nav':   'Next (or click anywhere)',

      // ── SCR-03 Teaser ──
      'scr03.hints.label':  'Key ideas of the presentation',
      'scr03.h1.title':     'Business initiative — author\'s vision',
      'scr03.h1.desc':      'David Gogela, Head of Group Controlling · personal initiative, own intellectual property, 5 pillars and investor entry plan',
      'scr03.h2.title':     'AI is changing the rules — the window is NOW',
      'scr03.h2.desc':      'Like the internet in the 90s · companies that understand this first will dominate industries · Anthropic / Claude as strategic partner',
      'scr03.h3.title':     'Internal efficiency — proof of concept for HOPI',
      'scr03.h3.desc':      'Finance pilot in production · 9 languages · modular expansion to Operations, Purchasing, Legal · 5,000+ group users',
      'scr03.h4.title':     'Market potential — from pilot to global SaaS',
      'scr03.h4.desc':      'Internal pilot → spin-off HOPI TechIQ s.r.o. → 6th group division → commercial SaaS · building an IT company from within instead of acquisition',
      'scr03.h5.title':     'Next-generation platform — AppIQ',
      'scr03.h5.desc':      'Modular · AI-native · enterprise-grade · mobile-first · multi-language · strategic partnerships: ARTIN, INTECS, Anthropic',
      'scr03.cta':          'Enter presentation',
      'scr03.skip':         'skip intro',
      'scr03.back':         'Back to Story',

      // ── Language Management ──
      'lang.title':         'Language Management',
      'lang.subtitle':      'Language versions of the HOPI AppIQ platform',
      'lang.registry':      'Language Registry',
      'lang.col.lang':      'Language',
      'lang.col.scope':     'Scope',
      'lang.col.status':    'Status',
      'lang.col.coverage':  'Key Coverage',
      'lang.scope.all':     'Studio + Finance',
      'lang.scope.finance': 'Finance Portal',
      'lang.status.active': 'Active',
      'lang.status.planned':'Planned',
      'lang.howto.title':   'How to add a new language',
      'lang.howto.s1':      'Open _i18n.js in CO_PROJECT root',
      'lang.howto.s2':      'Add a section with the same keys as cs: { ... }',
      'lang.howto.s3':      'Translate all keys (Studio: ~60 keys · Finance: ~40 keys)',
      'lang.howto.s4':      'Add metadata to _META (name, flag, scope, status)',
      'lang.howto.s5':      'Finance Portal: add option to language switcher',
      'lang.howto.s6':      'Studio pages: lang switch will automatically show the new language',
      'lang.keys.title':    'Key Overview',
      'lang.keys.key':      'Key',
      'lang.keys.cs':       'CS',
      'lang.keys.en':       'EN',
      'lang.keys.missing':  '⚠ missing',

      // ── Capacity (Admin Center) ──
      'admin.tab.capacity': '📊 Capacity',
      'cap.unit.label':     'Units:',
      'cap.unit.d.note':    '(1d = 8h)',
      'cap.summary.total':  'Total Tasks',
      'cap.summary.with_est':'With Estimate',
      'cap.summary.total_est':'Estimated Time',
      'cap.summary.total_act':'Actual Time',
      'cap.summary.coverage': 'Data Coverage',
      'cap.effort.title':   'Effort (T-shirt)',
      'cap.effort.xs':      'XS — <30 min',
      'cap.effort.s':       'S — 30 min – 2 h',
      'cap.effort.m':       'M — 2 – 4 h',
      'cap.effort.l':       'L — 4 – 8 h',
      'cap.effort.xl':      'XL — 8+ h',
      'cap.effort.none':    'tasks without effort category',
      'cap.assignee.title': 'By Assignee',
      'cap.type.title':     'By Task Type',
      'cap.type.none':      'tasks without taskType',
      'cap.domain.title':   'By Domain',
      'cap.backlog.title':  'Open Backlog',
      'cap.col.tasks':      'Tasks',
      'cap.col.assignee':   'Assignee',
      'cap.col.estimated':  'Estimated',
      'cap.col.actual':     'Actual',
      'cap.col.type':       'Type',
      'cap.col.effort':     'Effort',
      'cap.no_oil':         'Load OIL.json → Load OIL.json',
      'cap.no_data':        'No capacity data. Add estimatedTime, actualTime, effort and taskType to OIL tasks.',
      'cap.type.development':'Development',
      'cap.type.fix':       'Fix',
      'cap.type.content':   'Content',
      'cap.type.design':    'Design',
      'cap.type.review':    'Review',
      'cap.type.approval':  'Approval',
      'cap.type.test':      'Test',
      'cap.type.release':   'Release',
      'cap.type.archive':   'Archive',
      'cap.type.research':  'Research',
      'cap.type.docs':      'Docs',
      'cap.form.tasktype':  '— Task type —',
      'cap.form.effort':    '— Effort —',
      'cap.form.esttime':   'Estimate (min)',
      'cap.form.acttime':   'Actual (min)',
      'cap.col.domain':     'Domain',
      'cap.col.id':         'ID',
      'cap.col.title':      'Title',
      'cap.col.priority':   'Priority',
      'cap.col.status':     'Status',

      // ── OIL inline edit field labels ──
      'oil.field.desc':       'Description',
      'oil.field.domain':     'Domain',
      'oil.field.module':     'Module',
      'oil.field.component':  'Component',
      'oil.field.assignee':   'Assignee',
      'oil.field.comment':    'Comment',
      'oil.field.created':    'Created',
      'oil.field.tasktype':   'Task type',
      'oil.inline.save':      'Save',

      // ── Language tab extras ──
      'lang.key.filter':    'Filter keys…',
      'lang.loading':       'Loading language service…',

      // ── Dev Center ──
      'dev.arch.map.title':   'Connection Map — file connections',
      'dev.arch.files.title': 'Project Files',
      'dev.resp.col.range':   'Range',
      'dev.resp.col.format':  'Format',
      'dev.resp.col.note':    'Note',
      'dev.resp.col.oil':     'OIL task',
      'dev.resp.status.ok':          'OK',
      'dev.resp.status.acceptable':  'ACCEPTABLE',
      'dev.resp.status.risk':        'RISK',

      // ── Finance Portal ──
      'app.title':          'HOPI AppIQ | Finance',
      'app.subtitle':       'Group Controlling Portal',
      'app.mod.calendar':   'Closing Calendar',
      'app.mod.tracking':   'Tracking',
      'app.mod.orgchart':   'Org Chart',
      'app.mod.reporting':  'Reporting',
      'app.mod.fx':         'FX Rates',
      'app.mod.sap':        'SAP',
      'app.mod.bns':        'BNS',
      'app.mod.sharepoint': 'SharePoint',
      'app.mod.powerbi':    'Power BI',
      'app.mod.help':       'Help'
    },

    // ════════════════════════════════════════════════════════════
    // SK — Slovenčina (Finance Portal stub)
    // ════════════════════════════════════════════════════════════
    sk: {
      'app.title':        'HOPI AppIQ | Finance',
      'app.subtitle':     'Group Controlling Portál',
      'app.mod.calendar': 'Kalendár uzávierok',
      'app.mod.tracking': 'Sledovanie',
      'app.mod.orgchart': 'Org. štruktúra',
      'app.mod.reporting':'Reporting',
      'app.mod.fx':       'Kurzy mien',
      'app.mod.sap':      'SAP',
      'app.mod.bns':      'BNS',
      'app.mod.sharepoint':'SharePoint',
      'app.mod.powerbi':  'Power BI',
      'app.mod.help':     'Pomoc'
    },

    // ════════════════════════════════════════════════════════════
    // HU — Magyar (Finance Portal stub)
    // ════════════════════════════════════════════════════════════
    hu: {
      'app.title':        'HOPI AppIQ | Finance',
      'app.subtitle':     'Csoport Kontrolling Portál',
      'app.mod.calendar': 'Zárási naptár',
      'app.mod.tracking': 'Követés',
      'app.mod.orgchart': 'Szervezeti ábra',
      'app.mod.reporting':'Riporting',
      'app.mod.fx':       'Devizaárfolyamok',
      'app.mod.sap':      'SAP',
      'app.mod.bns':      'BNS',
      'app.mod.sharepoint':'SharePoint',
      'app.mod.powerbi':  'Power BI',
      'app.mod.help':     'Súgó'
    },

    // ════════════════════════════════════════════════════════════
    // PL — Polski (Finance Portal stub)
    // ════════════════════════════════════════════════════════════
    pl: {
      'app.title':        'HOPI AppIQ | Finance',
      'app.subtitle':     'Portal Kontrolingu Grupowego',
      'app.mod.calendar': 'Kalendarz zamknięć',
      'app.mod.tracking': 'Śledzenie',
      'app.mod.orgchart': 'Schemat org.',
      'app.mod.reporting':'Raportowanie',
      'app.mod.fx':       'Kursy walut',
      'app.mod.sap':      'SAP',
      'app.mod.bns':      'BNS',
      'app.mod.sharepoint':'SharePoint',
      'app.mod.powerbi':  'Power BI',
      'app.mod.help':     'Pomoc'
    },

    // ════════════════════════════════════════════════════════════
    // DE — Deutsch (Finance Portal stub)
    // ════════════════════════════════════════════════════════════
    de: {
      'app.title':        'HOPI AppIQ | Finance',
      'app.subtitle':     'Gruppencontrolling-Portal',
      'app.mod.calendar': 'Abschlusskalender',
      'app.mod.tracking': 'Verfolgung',
      'app.mod.orgchart': 'Organigramm',
      'app.mod.reporting':'Reporting',
      'app.mod.fx':       'Wechselkurse',
      'app.mod.sap':      'SAP',
      'app.mod.bns':      'BNS',
      'app.mod.sharepoint':'SharePoint',
      'app.mod.powerbi':  'Power BI',
      'app.mod.help':     'Hilfe'
    },

    // ════════════════════════════════════════════════════════════
    // RO — Română (Finance Portal stub)
    // ════════════════════════════════════════════════════════════
    ro: {
      'app.title':        'HOPI AppIQ | Finance',
      'app.subtitle':     'Portal Controlling de Grup',
      'app.mod.calendar': 'Calendar închideri',
      'app.mod.tracking': 'Urmărire',
      'app.mod.orgchart': 'Organigramă',
      'app.mod.reporting':'Raportare',
      'app.mod.fx':       'Cursuri valutare',
      'app.mod.sap':      'SAP',
      'app.mod.bns':      'BNS',
      'app.mod.sharepoint':'SharePoint',
      'app.mod.powerbi':  'Power BI',
      'app.mod.help':     'Ajutor'
    },

    // ════════════════════════════════════════════════════════════
    // BG — Български (Finance Portal stub)
    // ════════════════════════════════════════════════════════════
    bg: {
      'app.title':        'HOPI AppIQ | Finance',
      'app.subtitle':     'Портал за групов контролинг',
      'app.mod.calendar': 'Календар затваряния',
      'app.mod.tracking': 'Проследяване',
      'app.mod.orgchart': 'Орг. структура',
      'app.mod.reporting':'Отчитане',
      'app.mod.fx':       'Валутни курсове',
      'app.mod.sap':      'SAP',
      'app.mod.bns':      'BNS',
      'app.mod.sharepoint':'SharePoint',
      'app.mod.powerbi':  'Power BI',
      'app.mod.help':     'Помощ'
    },

    // ════════════════════════════════════════════════════════════
    // HR — Hrvatski (Finance Portal stub)
    // ════════════════════════════════════════════════════════════
    hr: {
      'app.title':        'HOPI AppIQ | Finance',
      'app.subtitle':     'Portal grupnog kontrolinga',
      'app.mod.calendar': 'Kalendar zatvaranja',
      'app.mod.tracking': 'Praćenje',
      'app.mod.orgchart': 'Org. struktura',
      'app.mod.reporting':'Izvještavanje',
      'app.mod.fx':       'Tečajevi valuta',
      'app.mod.sap':      'SAP',
      'app.mod.bns':      'BNS',
      'app.mod.sharepoint':'SharePoint',
      'app.mod.powerbi':  'Power BI',
      'app.mod.help':     'Pomoć'
    }

  }; // konec _T

  // ── Interní stav ─────────────────────────────────────────────────────────────
  var _lang = 'cs';
  var _INLINE = new Set(['SPAN','A','STRONG','EM','B','I','BUTTON','LABEL','CODE','TD','TH','LI','SMALL','SUB','SUP']);

  // ── DOM update ───────────────────────────────────────────────────────────────
  // Pomocná funkce: vrátí true pokud klíč existuje v _T store (v aktuálním jazyce nebo CS fallback)
  // Zabrání přepsání překladů jiných systémů (PREZ_TR v PORTAL_PRESENTATION.html)
  function _hasKey(key) {
    return (_T[_lang] && _T[_lang][key] !== undefined) || (_T.cs && _T.cs[key] !== undefined);
  }

  function _applyDOM() {
    // 1. data-i18n (textContent) — přeskočit klíče které nejsou v _T store
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!_hasKey(key)) return;
      var val = _resolve(key);
      if (val) el.textContent = val;
    });
    // 2. data-i18n-html (innerHTML)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (!_hasKey(key)) return;
      var val = _resolve(key);
      if (val) el.innerHTML = val;
    });
    // 3. data-i18n-title (title attribute)
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-title');
      if (!_hasKey(key)) return;
      var val = _resolve(key);
      if (val) el.title = val;
    });
    // 4. data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (!_hasKey(key)) return;
      var val = _resolve(key);
      if (val) el.placeholder = val;
    });
    // 5. Legacy .lang-cz / .lang-en (promo web + PORTAL_PRESENTATION backward compat)
    // Pozor: CSS třída je 'lang-cz' (ne 'lang-cs') — mapujeme _lang='cs' → 'lang-cz'
    document.querySelectorAll('.lang-cz,.lang-en').forEach(function (el) {
      var targetClass = _lang === 'cs' ? 'lang-cz' : 'lang-' + _lang;
      var isTarget = el.classList.contains(targetClass);
      // pro jazyky bez CSS class (sk,hu,...) zobraz cz jako fallback
      var fallback = (_lang !== 'cs' && _lang !== 'en') && el.classList.contains('lang-cz');
      var show = isTarget || fallback;
      el.style.display = show ? (_INLINE.has(el.tagName) ? 'inline' : 'block') : 'none';
    });
    // 6. lang-switch tlačítka
    document.querySelectorAll('.lang-btn[data-lang]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === _lang);
    });
    // 7. <html lang="">
    document.documentElement.lang = _lang;
  }

  function _resolve(key) {
    if (!key) return '';
    var val = (_T[_lang] || {})[key];
    // prázdný string = záměrně prázdné (SCR-02 EN placeholder) → fallback na cs
    if (val === undefined || val === '') val = _T.cs[key];
    return val !== undefined ? val : key;
  }

  // ── Veřejné API ──────────────────────────────────────────────────────────────
  var I18n = {

    /** Přeloží klíč v aktuálním jazyce */
    t: function (key) { return _resolve(key); },

    /** Nastaví jazyk, uloží do localStorage, aktualizuje DOM */
    setLang: function (lang) {
      if (!_T[lang]) return;
      _lang = lang;
      try { localStorage.setItem('hopi_lang', lang); } catch (e) {}
      _applyDOM();
    },

    /** Vrátí aktuální jazyk */
    getLang: function () { return _lang; },

    /** Vrátí seznam kódů všech definovaných jazyků */
    langs: function () { return Object.keys(_T); },

    /** Vrátí metadata jazyka (name, flag, scope, status) */
    meta: function (lang) { return _META[lang] || { name: lang, flag: '🌐', scope: 'unknown', status: 'unknown' }; },

    /** Vrátí všechny klíče definované v CS (referenční jazyk) */
    allKeys: function () { return Object.keys(_T.cs); },

    /** Vrátí % pokrytí klíčů pro daný jazyk (jen nenulové hodnoty) */
    coverage: function (lang) {
      var all = Object.keys(_T.cs);
      if (!_T[lang]) return 0;
      var filled = all.filter(function (k) { return !!(_T[lang][k]); }).length;
      return Math.round(filled / all.length * 100);
    },

    /** Přístup k raw datům (pro Language tab key browser) */
    data: function () { return _T; },

    /** Inicializace — načte jazyk z localStorage, aplikuje na DOM */
    init: function () {
      try { var stored = localStorage.getItem('hopi_lang'); if (stored && _T[stored]) _lang = stored; } catch (e) {}
      _applyDOM();
    }
  };

  return I18n;

})();

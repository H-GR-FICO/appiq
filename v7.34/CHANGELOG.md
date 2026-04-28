# CHANGELOG — HOPI AppIQ | Souhrnný přehled

Formát: `[typ]` — **Přidáno** · **Opraveno** · **Změněno** · **Odstraněno**

---

## v7.34 — Cockpit: BOS Card · Product Hub · Founders Board CTA · Music Fix · Navigation Fix · 2026-04-28

> Datum: 2026-04-28 · Session: David Gogela + Claude · AIQ-00494, AIQ-00495, AIQ-00496, AIQ-00497, AIQ-00500, AIQ-00501, AIQ-00502

### Hotfix (post-deploy smoke test, 2026-04-28)

**BOS Card — launcher link + obsah (AIQ-00501)**
- `cockpit/founders-board.html`: oprava odkazu (`bos-card.html` → `bos-card-appiq.html`) — karta se nyní správně vyplní při otevření z Founders Board
- `cockpit/bos-card-appiq.html`: aktualizace obsahu — HOPI TECHNOLOGY = nová 6. divize HOPI Group; HOPI TechIQ s.r.o. = nosná AI společnost (IP, tým, brand, P&L)
- Resources rozděleny do 3 streamů: STREAM 1 (interní tým HOPI TechIQ), STREAM 2 (spolupráce HOPI Holding), EXTERNÍ KONZULTACE
- `cockpit/product-hub.html`: BOS Card tile z "Coming Soon" na živý odkaz

**Brand Concepts — back button 404 (AIQ-00500)**
- `BRAND_CONCEPTS.html`: back link opravena z neexistující cesty na `cockpit/product-hub.html`

**Navigation — Product Hub back button (AIQ-00502)**
- `document.referrer` nahrazen `sessionStorage._nav_from` (referrer nefunguje na GitHub Pages)
- `cockpit/product-hub.html`: tile click nastaví marker před navigací
- `cockpit/_shell.js`: čte a maže marker, zobrazí `← Product Hub` místo `← Cockpit`
- `CEO_BRIEF.html`, `INVESTOR_BRIEF.html`, `INVESTOR_ENTRY.html`, `ANTHROPIC_ONEPAGER.html`: totéž pro portálové stránky

### Přidáno

**BOS Card — Business Overview Summary (AIQ-00495)**
- `cockpit/bos-card.html` — 8 sekcí (Vision, Strategy, Goals, KPIs, Risks, Team, Budget, Timeline)
- `fillCard()` API — dynamické plnění karet z dat
- PDF export, launcher z cockpitu

**BOS Card Persistence Layer (AIQ-00497)**
- localStorage persistence pro BOS Card data
- JSON download/import pro zálohu a sdílení
- Toast notifikace při uložení/načtení

**Product Hub — sekce 28 (AIQ-00494)**
- `cockpit/product-hub.html` — přehled produktů a modulů

### Opraveno

**Music seek fix — preload + sessionStorage (AIQ-00496)**
- `preload='none'` v MANAGEMENT_COCKPIT.html i `_shell.js` — eliminuje čekání na 19MB MP3 při načítání stránky
- `pagehide` handler v MANAGEMENT_COCKPIT.html nyní zapisuje čas do obou klíčů (`hopi_cockpit_time` i `hopi_shell_time`) — opravena diskontinuita při forward navigaci
- Odstraněn debug overlay `_showDbg()` a `localStorage._dbg_back` z produkčního kódu

---

## v7.33 [patch 2] — Cockpit: Brand identity · Visual enhancements · Navigation fixes · 2026-04-25

> Datum: 2026-04-25 · Session: David Gogela + Claude · AIQ-00410, AIQ-00441, AIQ-00442, AIQ-00443, AIQ-00444

### Přidáno

**P6 Brand composition na password overlay (AIQ-00410)**
- Původní cockpit-og.svg obrázek nahrazen plnou P6 HTML kompozicí
- HOPI TechIQ (20px, purple) → "presents" (13px, italic, muted) → AppIQ (72/80px orange/green dominant) → Claude · Anthropic (9/14px, terra cotta)
- Zachován nadpis MANAGEMENT COCKPIT + podtitulek PROJECT CONTROL CENTER

**LF2 SVG logo v topnav a sub-stránkách (AIQ-00410)**
- MANAGEMENT_COCKPIT.html topnav: text "⬡ MANAGEMENT COCKPIT" nahrazen inline LF2 SVG (height=22px)
- _shell.js: LF2 SVG přidán do topbaru vedle back-link (height=18px, opacity=0.85)
- Logo přítomno na všech cockpit sub-stránkách automaticky přes shell

**Animated gradient accent bar (AIQ-00441)**
- 5px pruh position:fixed top:0, purple→green→orange animovaný gradient (6s loop)
- Glow shadow: rgba(168,85,247,.6) + rgba(34,197,94,.3)
- Implementováno v MANAGEMENT_COCKPIT.html i _shell.js (všechny sub-stránky)

**Section hero strip + CSS utility classes (AIQ-00442)**
- _shell.js: c-section-hero strip injektován mezi topbar a motto ribbon — identifikuje sekci (18px, uppercase, violet accent bar 3px vlevo)
- c-live::before — animated pulse dot (7px green, glow) pro live-data indikaci — použito v kpi.html
- c-glow-green / c-glow-red / c-glow-amber / c-glow-violet — text-shadow glow třídy pro KPI hodnoty
- overview.html: val-v/val-g/val-a/val-r/val-b třídy rozšířeny o text-shadow glow

**Back navigation — ⬡ Cockpit link (AIQ-00444)**
- CEO_BRIEF.html: přidán violet "⬡ Cockpit" link v nav-right
- INVESTOR_BRIEF.html: přidán violet "⬡ Cockpit" link v nav-right
- INVESTOR_ENTRY.html: přidán "⬡ Cockpit" inline link nad obsahem
- ANTHROPIC_ONEPAGER.html: přidán "⬡ Cockpit" link v pravém sloupci header sekce

### Opraveno

**Topnav 404 fix — Brief/Vision/Case/Journey links (AIQ-00443)**
- Brief → INVESTOR_BRIEF.html (bylo: BUSINESS_BRIEF.html — neexistuje)
- Vision → CEO_BRIEF.html (bylo: PRODUCT_VISION.html — neexistuje)
- Case → INVESTOR_ENTRY.html (bylo: CASE_STUDY.html — neexistuje)
- Journey → ANTHROPIC_ONEPAGER.html (bylo: JOURNEY.html — neexistuje)

### Změněno

**versions.json — [Component] tags retroaktivně (v7.12–v7.33)**
- Všechny changes záznamy označeny komponentovými tagy: [Cockpit], [Shell], [Platform], [Selector], [Studio Hub], [Prezentace], [Pitch], [Docs]
- Starý systém [Vývoj]/[Design]/[Oprava] v v7.23 nahrazen komponentovými tagy
- Pushnut jako samostatný commit 85ab3d2 před deployem v7.34

---

## v7.33 — Cockpit: Music back-nav fix · Phase-bar removed · Clean main page · 2026-04-24

> Datum: 2026-04-24 · Session: David Gogela + Claude · AIQ-00435, AIQ-00436, AIQ-00438, AIQ-00439

### Opraveno

**Hudba — přerušení při back navigation na desktopu (AIQ-00435)**
- `pageshow` handler přešel na DOM check `audioEl.paused` místo interního `_bgPlaying` flagu
- Browser pauzuje audio v bfcache — flag zůstával `true`, DOM byl `true` → hudba se neobnovila
- Opraveno v MANAGEMENT_COCKPIT.html i `_shell.js` (všechny cockpit sub-stránky)
- HUDBA KONTINUITA PRAVIDLO zavedeno jako závazné pro všechny produkty s hudbou (CLAUDE.md)

**Čistší hlavní stránka cockpitu (AIQ-00436, AIQ-00439)**
- Odstraněn zastaralý footer element s textem `v8.0 · AIQ-00309` + CSS + JS `updateFooter()`
- Obnoven version badge (`HOPI AppIQ · vX.XX`) pod agentem — byl omylem odebrán v předchozím kroku

### Odstraněno

**Phase-bar — scrollovatelný strip fází projektu (AIQ-00438)**
- Read-only element způsoboval posuvnou lištu při zúžení okna na notebooku
- Smazán: CSS (`.phase-bar`, `.phase-step`, `.phase-dot`) + HTML blok + reference v `showUI()`

---

## v7.32 — Cockpit: Stream+Dept sloupce · Mojibake fix · Mobile scroll · FICO Portal link · 2026-04-24

> Datum: 2026-04-24 · Session: David Gogela + Claude · AIQ-00419, AIQ-00422, AIQ-00423, AIQ-00424, AIQ-00425

### Přidáno

**Cockpit tabulky — nové sloupce Stream + Dept s plným řazením (AIQ-00422, AIQ-00423)**
- TECH Tasks (oil-board.html): přidány sloupce Stream a Dept, klikatelné řazení na Effort, Stream, Dept, Assignee
- BIZ Tasks (boil-board.html): přidán sloupec Dept, klikatelné řazení na Effort, Stream, Dept, Assignee
- Správné pořadí Effort řazení: XS → S → M → L → XL (konstanta EFFORT_ORDER)

### Opraveno

**9 315 oprav diakritiky v OIL.json a BOIL.json (AIQ-00425)**
- CP1250 Mojibake: UTF-8 bajty chybně uloženy přes Windows-1250 enkódování → dvojité kódování
- Opraveno skriptem `_fix_mojibake.ps1` — 3 průchody, 9 315 záměn (á, é, í, č, ž, ř, š, ů, —, –, →, ·)
- oil-data.js a boil-data.js přegenerovány s čistými daty

**Mobile cockpit tabulky — sloupce a horizontální scroll (AIQ-00424)**
- `body { overflow-x: hidden }` + wrapper `overflow-x: auto` — tabulka scrolluje horizontálně, ne stránka
- `min-width: 900px` na tabulce zajistí prostor pro všechny sloupce
- `-webkit-overflow-scrolling: touch` pro plynulý scroll na iOS

**FICO Portál — link z mobilu neskončí "Page not found" (AIQ-00422)**
- Opravena logika `openPath` v documentation.html: lokálně = relativní cesta, GitHub Pages = plná URL
- `isLocal = location.protocol === 'file:'` guard zajistí správnou URL na každém prostředí

**DO_DEPLOY.ps1 — hotfix changelog automatizace (AIQ-00419)**

---

## HOPI NEXUS 1.0 — Strategic Milestone · 2026-04-23

> Ratifikace: David Gogela + Claude · 2026-04-23 · Adresář: NEXUS/

**HOPI NEXUS ratifikován jako Control Brain Center pro AI & Human Cooperation.**
Slogan: *"Humans & AI effectively together"* · Tagline: *"The Intelligence behind IQ"*

NEXUS je meta-vrstva nad všemi produkty (AppIQ, TechIQ) — Multi-agent Operating System,
který definuje jak stavíme, ne co stavíme.

### Vytvořeno v session 9 (NXS-1.0 Foundation)
- `CORE.md` — 20 domén, architektura, filozofie, session lifecycle
- `USTAVA.md` — 7-článková ústava, ratifikováno DG + AI
- `CODEX.md` — 8 knih zákonů (CODEX-001 až CODEX-010)
- `ROLES.md` — 10 rolí: R01–R07 core + R08 POLICE · R09 MEDIC · R10 FIREFIGHTER
- `EMERGENCY/` — Emergency Plan (4 úrovně) + Security Policy (SEC-001–012)
- `BUILDING_BLOCKS.md` — 4-level taxonomie (Atoms → Molecules → Compounds → Systems)
- `WORLD.md` — 7D klasifikační prostor (ACTOR, COMPONENT, LIFECYCLE, SCOPE, INTERACTION, PURPOSE, QUALITY)
- `AGENTS/` — _templates, _training (20 behavioral tests), _registry (7 agentů AG-001–007)

36 NXS tasků zaregistrováno. Priorita: NXS-00035 (Anthropic 3-Pager) + NXS-00036 (HOPI Board Pitch).

---

## v7.31 — Hudba přežije back button · Budget Matrix čitelný na mobilu · KPI živá data · Version badge · 2026-04-24

> Datum: 2026-04-24 · Session: David Gogela + Claude · AIQ-00405, AIQ-00406, AIQ-00411, AIQ-00412, AIQ-00416, AIQ-00418

### Přidáno

**Version badge na všech stránkách platformy (AIQ-00418)**
- `HOPI AppIQ · v7.31` fixně v pravém dolním rohu na každé stránce WEB + APP streamu
- Platí i na overlayích (password overlay, jazyk. výběr Finance Portálu) — z-index 100001
- Auto-update verze při každém `DO_DEPLOY.ps1` — nový soubor `_ver-badge.js`
- Platform rule zapsáno do CLAUDE.md vedle FONT PRAVIDLO a Vizuální kvalita

### Opraveno

**Cockpit KPI — živá data ze všech tasků (AIQ-00411)**
- kpi.html zobrazuje 8 live KPI karet (active, closed, BIZ, countdown B2C...)
- Root cause: `fetch()` nefunguje na `file://` protokolu → nahrazeno bundled `window.OIL_DATA` / `window.BOIL_DATA`
- Chart.js CDN přesunut z `<head>` na konec `<body>` — odstraněn render-blocking

**Finance Portal — výběr jazyka vždy při otevření z cockpitu (AIQ-00416)**
- Odkaz z dokumentace vždy zobrazí CS/EN výběr (`?welcome=1` URL param)
- Startup script rozšířen: `?welcome=1` odstraní `gc_lang_shown` ze sessionStorage

**documentation.html — aktualizace odkazů a sekcí (AIQ-00412)**
- BASE_VER v7.26→v7.31, 15 stale sekcí → 20 aktuálních sekcí cockpitu s path + openPath
- APP_BASE opraven na `/app/` (správná deploy cesta Finance Portálu)

**Hudba pokračuje po stisku device back button na mobilu (AIQ-00406)**
- `beforeunload` nahrazen `pagehide` — umožní bfcache v iOS Safari a Chrome; stránka je obnovena ze stavu místo fresh-loadu
- Přidán `pageshow(e.persisted=true)` handler — při bfcache restore okamžitě obnoví přehrávání
- Odstraněn `muted=true` trik — způsoboval silent-playing bug (`_bgPlaying=true` ale neslyšitelné; `pointerdown` listener neretrioval)
- `visibilitychange` rozšířen o `play()` před fade — paused audio se po obnovení stránky znovu spustí
- Opraveno v `MANAGEMENT_COCKPIT.html` i `cockpit/_shell.js`

**Budget Decision Matrix čitelný na mobilu — methodology.html (AIQ-00405)**
- CSS selector `.budget-tier-row:first-child` → `.budget-tier-row:nth-child(2)` — původní selector matchoval `<h3>`, ne header row; header nebyl nikdy skryt
- `.budget-rule { overflow: hidden }` — pojistka proti přetékání
- `.bt-reason { width: 100%; overflow-wrap: break-word }` — dlouhé texty se zalomí místo přetečení

---

## v7.29 — HOPIQ na všech sekcích · čistší AI · oprava OG obrázku · 2026-04-24

> Datum: 2026-04-24 · Session: David Gogela + Claude · AIQ-00399..00401

### Přidáno / Opraveno

**HOPIQ agent dostupný ve všech 22 sekcích cockpitu (AIQ-00400)**
- Nový `cockpit/_hopiq.js` — standalone modul auto-injektuje floating chatbota do každé sub-stránky
- Wiring přes `_shell.js` → `injectHopiq()` v `init()` — žádné změny na individuálních stránkách
- Guard zabraňuje dvojí inicializaci (main cockpit má agenta v HTML, sub-stránky přes _hopiq.js)
- Načítá data bundles (`oil-data.js`, `boil-data.js`, `kb.js`) automaticky ze stejné složky

**Čistější AI odpovědi — deduplication system promptu (AIQ-00399)**
- Odstraněn duplicitní statický obsah z `hopiqBuildSystem()`: navMap, bmText, sekce NAVIGACE/PROJEKT/HOPI GROUP
- Veškerý statický obsah je již v `window.HOPIQ_KB` (32KB KB) — posílat dvakrát = zbytečné tokeny
- Zachovány pouze live/dynamická data: počty tasků, openList, closedList, discList

**OG preview obrázek — tmavé pozadí, žádná bílá plocha (AIQ-00401)**
- `cockpit-og.png` regenerován pomocí Python/Pillow z designu SVG
- Původní PNG (Chrome headless screenshot) měl bílou plochu ~130px ve spodní části
- Nový PNG 1200×630 — celý tmavý, WhatsApp/Teams link preview zobrazí správně

---

## v7.28 — OG náhled odkazu · Cockpit preview · Deploy pipeline · Task Control fix · 2026-04-23

> Datum: 2026-04-23 · Session: David Gogela + Claude · AIQ-00393..00396

### Přidáno / Opraveno

**Management Cockpit — preview obrázek na hlavní stránce (AIQ-00394)**
- Po přihlášení viditelný `cockpit-og.png` přímo v hero sekci (520px, 82% opacity, violet border)
- Dříve byl obrázek pouze v přihlašovacím překryvu — po přihlášení nezobrazován

**Sdílení odkazu — WhatsApp / Teams (AIQ-00394)**
- Nová URL v7.28 + `og:image` + `twitter:image` = absolutní PNG URL s `?v=2` cache-bust
- WhatsApp a Teams zobrazí správný náhled cockpitu při sdílení odkazu

**Task Control Center — CORS fix (AIQ-00393)**
- `fetch(OIL.json)` + `fetch(BOIL.json)` → `window.OIL_DATA` + `window.BOIL_DATA` (inline bundle)
- Stejný vzor jako AIQ-00380 (overview.html); data se načítají na `file://` i HTTPS

**Deploy pipeline zpevněn (AIQ-00394)**
- `DO_DEPLOY.ps1`: přidán krok auto-sync `Development/ → Release/` (robocopy /MIR) před deployem — zabraňuje nasazení stale Release/
- `DO_DEPLOY.ps1`: přidána náhrada PNG URL v OG meta tagu vedle SVG
- `QUICK_REDEPLOY.ps1`: nový skript pro hotfixy — přímý sync `Development/ → repos/vX.XX/` bez Release/ mezikroku, bez PREFLIGHT, bez changelog podmínky

---

## v7.27 — Cluster navigace · Auth redesign · Music fix · OG image · deploy

> Datum: 2026-04-23 · Session: David Gogela + Claude · AIQ-00380..00392

### Přidáno / Opraveno

**Cluster navigace — kompletní hierarchie (AIQ-00386)**
- cockpit → cluster → sekce → Zpět → cluster → Zpět → cockpit
- `?back=` URL parametr: cluster.html enkóduje vlastní URL do linků na sekce; `_shell.js renderShell()` dekóduje a použije jako href Zpět tlačítka

**Auth redesign — fresh tab = heslo, sub-pages = bez promptu (AIQ-00385, 00387, 00392)**
- Heslo overlay zobrazeno vždy při fresh tabu (sessionStorage prázdná = žádný auto-skip)
- User gesture při kliknutí VSTOUPIT = Chrome povolí autoplay hudby
- `_shell.js checkAuth()` vrací `true` — Chrome `file://` nesdílí storage cross-directory; sub-pages důvěřují navigaci z cockpitu

**Hudba funguje spolehlivě (AIQ-00382, 00390)**
- Music button toggle opravený: test `_bgPlaying` místo `_bgIsOn` (play vs pause)
- `checkAuth()` resetuje `MUS_KEY='1'` před `showUI()` — dřívější mute preference nepřeruší autoplay

**OG image PNG pro sociální sítě (AIQ-00389)**
- `cockpit-og.png` (1200×630px) — WhatsApp, Teams, Twitter vyžadují PNG/JPEG, ne SVG
- Opravena URL v meta tagu (`og:image`, `twitter:image`) — chyběla podsložka `HOPI_AppIQ_WebPage/Development/`

**Documentation & Links opravy (AIQ-00388, 00391)**
- Management Cockpit Hub: Copy button → správná GitHub Pages URL; Open → lokální soubor (přes `openPath`)
- Finance Portal: Open button → WEB URL (APP_BASE + path)
- Null-safety: `(name || {})[lang] || ''` — ochrana před `"undefined"` stringem na tiles

**Sekce 5 overview.html fix (AIQ-00380)**
- `fetch()` na `file://` blokován CORS; přechod na inline data bundle (oil-data.js, boil-data.js)

**Motto strip fix (AIQ-00384)**
- `nth-child` selektory rozbity bilinguální strukturou (2 spany na motto); přepsáno na pojmenované třídy `.cm1–.cm5 + .cdot`

---

## v7.26 — Cockpit: kompletní CS/EN překlad + bilingvní opravy · deploy

> Datum: 2026-04-23 · Session: David Gogela + Claude · AIQ-00359, AIQ-00360

### Přidáno / Opraveno

**Cockpit sub-stránky — kompletní bilinguální CS/EN (AIQ-00359)**
- Všech 20 cockpit sub-stránek plně bilingvních: Shell.init section={cs,en}, IIFE pro statický HTML, getLang() logika pro JS-rendered content
- Pokryto: launch-plan, motivation, team, kpi, timeline, overview, methodology, financial, decisions, capacity, budget-track, documentation, sources, business-architecture, business-model, meeting-room, org-coordination, oil-board, boil-board, task-control
- Bug fix: `task-control.html` četl `appiq_lang` místo `hopi_lang` — překlady tam vůbec nefungovaly

**MANAGEMENT COCKPIT — bilingvní opravy (AIQ-00360)**
- Sekce labely: "SEKCE / SECTIONS" a "COCKPIT STORY / PŘÍBĚH COCKPITU" → dynamický single-language text
- Story strip CSS: text nebyl viditelný — opraveny barvy, velikosti, opacity šipek a písmen

---

## v7.25 — MANAGEMENT COCKPIT: 3 nové sekce + Compliance opravy

> Datum: 2026-04-22 · Session: David Gogela + Claude · AIQ-00313..00317, BIZ-00122..00123

### Přidáno

**MANAGEMENT COCKPIT rozšířen na 16 sekcí — 3 nové live dashboardy**

**Sekce 02 — Executive Overview Dashboard (`cockpit/overview.html`)**
- Ranní briefing: live OIL+BOIL statistiky na jedné obrazovce bez přepínání
- 5 widgetových bloků: Project Pulse (open/closed/S1/REVIEW), Execution (kapacita Claude vs. David), Launch Countdown (B2C/B2B/HOPI GROUP), Strategic (tým/partneři), Finance (placeholders)
- Každý widget kliknutelný na příslušnou plnou sekci

**Sekce 03 — Launch Plan · Countdown (`cockpit/launch-plan.html`)**
- Živé odpočítávání k 3 milníkům: HOPI GROUP (01.06.2026), B2C (01.01.2027), B2B (01.01.2028)
- Progress bar pro každý track (procenta uplynulé doby)
- Department rollout timeline: Finance → Legal → Operations → HR/IT → Dceřiné (~30 společností)
- Info karty: B2C profily (H1–H4, Freemium→Premium, PLG) + B2B parametry

**Sekce 08 — Task Control Center (`cockpit/task-control.html`)**
- Tab 1 Priority Board: Kanban S1-KRITICKÝ / S2-ZÁVAŽNÝ / S3-STŘEDNÍ / S4-NÍZKÝ, filtr ALL/AIQ/BIZ/REVIEW
- Tab 2 Linked View: BIZ task (BOIL) jako accordion, pod ním linked AIQ tasky z OIL, vizuální BIZ→TECH šipka
- Tab 3 Capacity Split: Claude vs. David počet + suma estimatedTime, REVIEW bottleneck list, domain breakdown
- Čte OIL.json + BOIL.json dynamicky (žádné hardcoded hodnoty)

### Opraveno

**9 Anthropic compliance a platform accuracy oprav (AIQ-00313)**
- Odstraněna slova "production", "reální uživatelé", "reálná data" kde nepravdivé
- PoC/pilot framing opraven v PERSONAL_PITCH.html, PORTAL_PRESENTATION.html, BUSINESS_CASE.html
- CS i EN verze konzistentní

**MANAGEMENT COCKPIT vizuální opravy (AIQ-00317)**
- Název "MNG COCKPIT" → "MANAGEMENT COCKPIT" (auth overlay, topnav, hero h1)
- Kontrast muted textu: `#6b7280` → `#94a3b8` (čitelnější labely)
- Patkové písmo → bezpatkové (`'Segoe UI', system-ui, sans-serif`) na všech popisných prvcích
- Integrace `_shell.js` opravena — topbar (← Zpět na Cockpit) funguje na všech 3 nových stránkách

---

## v7.24 — Anthropic Journey + David vs Goliáš

> Datum: 2026-04-22 · Session: David Gogela + Claude · AIQ-00301 · BIZ-00104

### Přidáno

**David vs Goliáš — nová sekce v INVESTOR_BRIEF.html (`s-david-goliash`)**
- Faktické srovnání Anthropic ($61,5 mld valuace, $7,3 mld kapitál, 1 500+ lidí, 4 roky, globální) × HOPI Group (€0,5 mld, 30+ let, 8 zemí CEE, #1 FBN CZ/SK) × AppIQ (8 týdnů, ~$1k, 1+AI)
- Mobile-responsive grid — CSS třídy `dg-grid` / `dg-divider` / `dg-line`, stacking na ≤600px
- Punchline: *"Oni dělají motor. My stavíme auto. A jedeme."*

**Anthropic Journey — nová sekce v INVESTOR_BRIEF.html (`s-journey`)**
- Fáze 0 · Zítra (55 min): 3 konkrétní kroky — Startup Program přihláška, LinkedIn build in public, přímý kontakt. Výstup: $25k–$100k kreditů, vstup do Anthropic CRM, viditelnost v ekosystému
- Fáze 1 · 2026: API zákazník, living proof, dokumentace
- Fáze 2 · 2026–2027: B2C launch, CEE referenční zákazník, developer spotlight
- Fáze 3 · 2027+: joint GTM, co-development, white-label možnosti
- Závěrečný citát: *"Nezajímá nás rychlý handshake. Zajímá nás být partnerem, který si to zaslouží."*

---

## Přehled streamů

| Stream | Složka | Changelog | Aktuální verze |
|--------|--------|-----------|----------------|
| Aplikace | `HOPI_AppIQ/` | `HOPI_AppIQ/CHANGELOG.md` | v1.2-Phase0 |
| Web + Prezentace | `HOPI_AppIQ_WebPage/` | `HOPI_AppIQ_WebPage/CHANGELOG.md` | v1.1-WebPage |

*Tento soubor je souhrnný přehled — detaily jsou vždy v per-stream changelogu výše.*

---

## v8.0-ARCH — HOPI TechIQ Platform: Architektonický redesign + 9D produktový model

> Datum: 2026-04-20 · Session: David Gogela + Claude · AIQ-00187..00201, BIZ-00030..00039
> **Žádný kód nebyl nasazen.** Čistě architektonický a dokumentační den.

### Přidáno

**HOPI TechIQ Platform v8.0 — nová platforma (AIQ-00195)**
- Fyzická adresářová struktura: **211 složek** pod `HOPI_TechIQ/`
- Kompletně oddělena od legacy `HOPI_AppIQ_WebPage/` (která zůstává nedotčena)
- Dimenzionální mapování: PRODUCT/ jako primární top-level, 9D model zakódován do struktury

**9D Produktový model — schválen Davidem**
- DIM 1: Svět (Enterprise / Home)
- DIM 2: Sektor (Private / Public / State)
- DIM 3: Industry (20+ odvětví × sektor — healthcare, defense, finance, logistics, IT, education...)
- DIM 4: Scale (L0a Dítě → L6 Holding / Rodina → Rozšířená rodina)
- DIM 5: Doménová funkce (12+ oblastí per svět)
- DIM 6: Mód (Assemble No-Code / Template Low-Code / Custom Pro-Code)
- DIM 7: AI Maturita (S0 Manuální → S4 Autonomní)
- DIM 8: Platformová Zóna (Studio → Publish → Marketplace/APP Story → Use → Market → Invest)
- DIM 9: Obchodní model (B2B / B2B2C / B2C / Marketplace / White-label / Reseller)

**APP Story Marketplace koncept**
- 7-krokový lifecycle: ①Vznik → ②Discovery(AI) → ③Onboarding(AI) → ④Adopce → ⑤Komunita → ⑥Evoluce → ⑦Monetizace
- Revenue share: 70% tvůrce / 30% platforma

**Dokumentace `HOPI_TechIQ/DOCS/architecture/` (AIQ-00196, 197, 198)**
- `PRODUCT_MODEL.md` — 9D model, taxonomie, manifest schema, průsečíkové příklady
- `REPO_STRUCTURE.md` — folder architektura, pravidla, jak přidat novou Industry (7 kroků, nula platform kódu)
- `PLATFORM_OVERVIEW.md` — co platforma je, pro koho, business model, roadmap, persony

**Integration Architecture — 4 vrstvy (AIQ-00188)**
- Visual Layer → API Gateway → Connector Layer → AI/MCP
- 8 connectorů: SAP · BNS · SharePoint · Teams · Power BI · Monday · IDWare · HOPI Web
- MCP (Model Context Protocol) — standard Anthropic, každý konektor = MCP server

**DATA Layer — Database Readiness (AIQ-00201)**
- 12 dimenzionálních tabulek (DIM_WORLD, DIM_SECTOR, DIM_INDUSTRY, DIM_SCALE_LEVEL...)
- 4 faktové tabulky (FACT_USAGE, FACT_BILLING, FACT_AI_CALLS, FACT_PLATFORM_METRICS)
- Junction tabulky pro M:N vztahy
- `_data.js` dual-mode contract: JSON mode → REST API → SQL = změna POUZE v `_data.js`

**CLAUDE.md — 4 nové sekce**
- PLATFORM CORE: modulární architektura, Event Bus, 5 závazných pravidel
- 9D PRODUKTOVÝ MODEL: referenční rámec, manifest princip, APP Story lifecycle
- HOPI TechIQ Adresářová architektura: dimension-to-folder mapping, folder strom, 5 pravidel
- DATA LAYER + INTEGRATION ARCHITECTURE: DB readiness, 4-vrstvá integrace

**OIL.json — nové úkoly AIQ-00187 až AIQ-00201**
- AIQ-00187: DEV_GUIDE.md | AIQ-00188: Integration Layer | AIQ-00189–190: Studio + Publication Layer
- AIQ-00191–194: Vertical taxonomies + BIZ HUB | AIQ-00195: fyzická struktura (CLOSED)
- AIQ-00196–198: Documentation (lze CLOSED) | AIQ-00199–200: Investor + Marketing WEB
- AIQ-00201: DATA layer dimensional model + seeds

**BOIL.json — nové úkoly BIZ-00030 až BIZ-00039**
- BIZ-00031–032: Studio spec, Publication Layer | BIZ-00033: GTM strategie
- BIZ-00034–036: Enterprise/Home taxonomie, Vertical Layer | BIZ-00037: BIZ HUB investor sekce
- BIZ-00038–039: Investor WEB (INVEST zóna), Marketing WEB (MARKET zóna)

**BOIL_CONTEXT.md — vytvořen (nový soubor)**
- Kontext k BIZ-00017 (brand), BIZ-00024 (CEO/CFO summary), BIZ-00025 (Anthropic Partnership)
- BIZ-00029 (BIZ HUB evoluce), BIZ-00031–039 (Studio, Publication, GTM, Investor, Market)

### Branding
- LT3 Violet `#A855F7` schválen jako HOPI TechIQ brand barva (David, 2026-04-20)

### Klíčová rozhodnutí
- HOPI TechIQ Hub = root bez hesla | TECH HUB = stávající bomba | BIZ HUB = nová bomba za heslem
- Stream-tagged versioning: TECH=v8.x, BIZ=b1.x
- Modulární Platform Core architektura závazná pro veškerý nový kód
- DB readiness: přechod JSON→DB = POUZE `_data.js`, struktura adresářů se nemění

---

## v7.23 — Navigation propojení stránek + OG images v2 + music tab-pause

> Datum: 2026-04-21 · Session: David Gogela + Claude · AIQ-00294, AIQ-00295

### Hlavní změny

- [Vývoj] Navigace — kompletní propojení PITCH ↔ CEO ↔ ENTRY ↔ BRIEF (karty + nav tlačítka)
- [Design] OG Images v2 — centrovaný layout, 3 PNG (Business Vision / Business Case / Investor Gateway)
- [Oprava] Music tab-pause — auto-stop při přepnutí záložky na všech 3 stránkách

### Přidáno

**Navigace — propojení všech 4 stránek (AIQ-00295)**
- `PERSONAL_PITCH.html` — 2 viditelné karty uvnitř `#doc-content`:
  - **CEO Brief → Business Vision** (oranžová karta)
  - **Investor Brief → Investor Gateway** (fialová karta)
- `CEO_BRIEF.html` — tlačítko `← Personal Pitch` v nav baru
- `INVESTOR_ENTRY.html` — tlačítko `← Personal Pitch` nad kartami dokumentů
- `INVESTOR_BRIEF.html` — tlačítko `← Investor Entry` v nav baru
- Kompletní obousměrná navigace: PITCH ↔ CEO ↔ ENTRY ↔ BRIEF

**OG Images — centrovaný redesign v2 (AIQ-00294)**
- `og-image-ceo.png` — oranžový (#E8750A), headline "Business Vision", 1200×630 px
- `investor-og.png` — fialový (#A855F7), headline "Business Case", 1200×630 px
- `investor-entry-og.png` — gradient violet→orange, headline "Investor Gateway", 1200×630 px
- Nový design: centered layout, 140px bold headline, top+bottom 8px color bar
- Nahrazuje starý left-bar design z v7.22

### Opraveno

**Music — auto-pause při přepnutí záložky (AIQ-00295)**
- `CEO_BRIEF.html` — `visibilitychange` listener: fade + pause při `document.hidden`
- `INVESTOR_BRIEF.html` — totéž, adaptováno pro `playing` proměnnou
- `PERSONAL_PITCH.html` — totéž, volá existující `stopMusic()`
- Fix problému: více otevřených záložek hrálo hudbu současně

---

## v7.22 — CEO Brief, MIND-SET REVOLUTION, page split + music

> Datum: 2026-04-20 · Session: David Gogela + Claude · AIQ-00151..00157

### Přidáno

**CEO Brief — MIND-SET REVOLUTION slide (AIQ-00155)**
- Nová sekce s2b mezi dual brand a business narrative
- 8 předpokladů projektu: 0–3 kritické (K/O), 4–7 podmínky úspěchu
- Bilingvní CS/EN, 2-sloupcový layout (oranžové + modré karty)
- K/O rozhodování pouze majitel firmy (bod 3), aktivní krytí Majitele a CEO HOPI Skupiny (bod 5)

**Version selector split — index.html + selector.html (AIQ-00156)**
- `index.html`: welcome overlay + bomba pouze — žádný music button
- `selector.html`: výběr verzí, hudba, music button v nav (nová stránka)
- Bomba → redirect `selector.html?lang=cs&music=1` → Gladiator spustí se na version selectoru

**CEO Brief — Business Accelerator sekce (AIQ-00150)**
- Section 0: 3 karty — Výsledky, Záměr, Metoda
- Kanonický citát Davida Gogely

### Opraveno

**CEO Brief — hudba po odemčení heslem (AIQ-00152)**
- `checkPw()` volá `window.ceoMusicStart()` po odkrytí obsahu
- Pattern zrcadlí PERSONAL_PITCH ppMusicStart

**CEO Brief — partner karty Artin + Intecs (AIQ-00153)**
- Přesný text dle aktuálních webových stránek firem
- Artin: 25+ let, 200+ tým CZ/SK/NL, AI/cloud/BI
- Intecs: 18+ let, 300+ klientů, Power BI/DWH, Microsoft Gold
- Poznámka: probíhá pilot AI v tvorbě PBI reportů

**Gladiator — spouštění při bombě (AIQ-00154)**
- Bomba (L5) spouští Gladiator přes `_hm.start()`, ale až po přechodu na selector.html
- selector.html čte `?music=1` a nastaví `appiq_music='on'` pro _hopiq.js auto-start

### Změněno

**PERSONAL_PITCH — odkaz na CEO Brief (AIQ-00151)**
- Strategický docs nav přidán dovnitř `#doc-content` (auto-skryt před heslem)
- Link: CEO Brief — Business Vision → (otevírá se v nové záložce)

---

## v7.21 post-release — Maintenance Mode + Business Strategy + Font Fix

> Datum: 2026-04-19 · Session: David Gogela + Claude · AIQ-00102..00115

### Přidáno

**Maintenance Mode — přístup na platformu (AIQ-00104)**
- Studio Hub: widget pro zapnutí/vypnutí Maintenance Mode přes GitHub API
- GitHub Pages root: fullscreen overlay CS/EN při zapnuté údržbě
- Admin Center: nová záložka Platforma — GitHub PAT token + developer bypass (localStorage)
- `versions.json`: nové pole `maintenance: false`

**Business Strategy Layer (AIQ-00113)**
- Nový soubor `BOIL.json` — Business OIL, prefix BIZ-NNNNN, citlivá data, 23 úkolů
- Nový soubor `BKONTEXT.md` — business kontext, rozhodnutí, hiring roadmap, tech stack s cenami
- 3 produktové streamy definovány: B2B Pilot (HOPI GROUP), B2C SaaS Home (01.07.2027), B2B SaaS Enterprise (01.01.2028)
- Nové entity: HOPI TechIQ s.r.o. (planned Q2 2026), HOPI AI Lab (founding)

**AI Agents strategie (AIQ-00106..00112)**
- Plán 5 AI agentů: Helper, DocWriter, Admin, Tester, Developer
- Pořadí nasazení, tréninkové plány, Studio UI sekce AI Agents

**OIL schema — userExplanation (AIQ-00105)**
- Nové pole `userExplanation` přidáno ke všem 114 AIQ úkolům

### Opraveno

**Promo L4 — CTA a vizuál (AIQ-00102)**
- CTA „Co je nového →" → dismissFull (ne navigace na Hub)
- Dark navy/teal cinematic redesign, orbital SVG, scan line efekt
- Button CSS reset: `border:none; appearance:none; -webkit-appearance:none`

**Finance portal — nefunkční odkaz (AIQ-00103)**
- Studio Hub: odkaz opraven `../../HOPI_AppIQ/Development/index.html` → `../../app/index.html`

**Prezentace — čitelnost na projektoru (AIQ-00115)**
- PORTAL_PRESENTATION + PERSONAL_PITCH: base font 14 → 16px
- h2: 28→32px, h3: 18→22px, h4: 15→18px; content text 12–13 → 15–16px
- 33 pravidel v PORTAL_PRESENTATION, 19 inline replacements v PERSONAL_PITCH

---

## v7.21 — HOPIQ AI Chatbot + Version Selector 2.0 + Admin Release fix

> Datum: 2026-04-19 · Session: David Gogela + Claude · AIQ-00083..86

### Přidáno

**HOPIQ chatbot — nativní AI integrace do AppIQ Studio (AIQ-00085, AIQ-00086)**
- Nový soubor `_hopiq.js` — floating chat widget (vpravo dole) přidaný do všech stránek AppIQ Studio
- Nový soubor `_hopiq.css` — styly widgetu v AppIQ dark theme (#007d32 brand, tmavé pozadí)
- Cloudflare Worker proxy `https://hopi-appiq.dgogela.workers.dev` — drží Anthropic API klíč jako secret, řeší CORS
- Model: `claude-haiku-4-5-20251001` (rychlý, ekonomický, vhodný pro chat)
- Widget přidán do: Hub (index.html), PORTAL_PRESENTATION.html, PERSONAL_PITCH.html, admin/index.html, docs/index.html
- Systémový prompt obsahuje kompletní znalost platformy: navigace AppIQ Studio, archivační procedura (DO_ARCHIVE.ps1, ARCHIVE_PROTOCOL.json), deploy procedura (DO_DEPLOY.ps1, GitHub Pages), OIL task tracker (AIQ-NNNNN formát, statusy), Admin Center záložky, Documentation Center (TS/BS/GD sekce), Finance portál moduly, aktuální verze v7.21, strategický záměr (HOPI pilot → spin-off → SaaS)
- Infrastruktura: Anthropic API account (console.anthropic.com, dgogela@hopiholding.eu), Cloudflare Workers free tier (100k req/den)

**Version Selector 2.0 — GitHub Pages landing page (AIQ-00083)**
- Hero CTA tlačítko per verze — přenese uživatele na hlavní stránku verze (v7.21 → Studio Hub, v7.12 → Prezentace)
- Inline přehled změn — bullet body přímo pod verzí (z `changes[]` pole v versions.json)
- Modal "Detailní změny" — kliknutím zobrazí kompletní changelog verze v overlay modalu
- CS/EN přepínač — integrován přes `_i18n.js` (`I18n.setLang()`), zachovává stav při přerenderování
- Nové i18n klíče: `vs.btn.open`, `vs.btn.changes`, `vs.changes.title` (CS + EN)
- `versions.json` rozšířen o pole: `mainUrl`, `mainLabel`, `changes[]`

**_status.js — Admin Center Release záložka (AIQ-00084)**
- Nový soubor `_status.js` — nastaví `window._STUDIO_STATUS` při načtení stránky jako script tag
- Funguje na všech třech prostředích: Development (file://), Release (file://), GitHub Pages (HTTPS)
- `admin/index.html` načítá `_status.js` před `_i18n.js`; `loadStudioStatus()` použije data okamžitě bez čekání na fetch
- `DO_ARCHIVE.ps1` generuje `_status.js` automaticky po zápisu `_status.json`
- `DO_DEPLOY.ps1` nový krok [8b] — generuje `$VER_FOLDER/_status.js` PŘED `git add/commit` (dostane se do repo)

### Změněno

- `DO_DEPLOY.ps1` — krok [8b] přidán před git commit; fix PS 5.1 array serialization bug (z v7.20)
- `DO_ARCHIVE.ps1` — generuje `_status.js` vedle `_status.json`
- `CLAUDE.md` — přidáno STOP pravidlo (organicky vznikající úkoly) + Crash recovery procedura

### Plánováno (zaregistrováno v OIL, neimplementováno)

- AIQ-00087: Training Centre — 7. Functional Center s AI specialisty
- AIQ-00088: AI PBI Designer
- AIQ-00089: AI PBI Analyser
- AIQ-00090: AI Data Story Teller
- AIQ-00091: AI Document Reader

---

## 2026-04-19 — Session pokračování (HOPIQ chatbot + Training Centre plán)

### Web — post-v7.20 (GitHub Pages hotfix + nové features)

**Version selector (`_ghpages_root_index.html`):**
- Přidán hero CTA button per verze (`mainUrl`/`mainLabel` v versions.json)
- Přidán inline přehled změn (`changes[]` array v versions.json)
- Přidán modal "Detailní změny" (gprot-modal vzor, openChangesModal)
- Přidány i18n klíče: `vs.btn.open`, `vs.btn.changes`, `vs.changes.title` (CS+EN)

**Admin Center Release záložka:**
- Nový soubor `_status.js` — inline fallback pro file:// protokol (window._STUDIO_STATUS)
- `admin/index.html`: načítá `_status.js` jako script tag, funguje na Development + Release + GitHub Pages
- `DO_ARCHIVE.ps1` + `DO_DEPLOY.ps1`: generují `_status.js` automaticky po každém běhu
- `DO_DEPLOY.ps1` krok [8b]: kopíruje `_status.js` do versioned složky PŘED git commitem

**HOPIQ chatbot widget (AIQ-00085):**
- Nový soubor `_hopiq.js` — floating chat widget, dark theme, AppIQ brand
- Nový soubor `_hopiq.css` — styly widgetu
- Cloudflare Worker proxy: `https://hopi-appiq.dgogela.workers.dev`
- Model: `claude-haiku-4-5-20251001`
- Integrován do: Hub, PORTAL_PRESENTATION.html, PERSONAL_PITCH.html, admin/index.html, docs/index.html
- Systémový prompt rozšířen o kompletní AppIQ znalost (8 sekcí): navigace, archivace, deploy, OIL, verze, dokumentace

**OIL + CLAUDE.md:**
- Přidány pravidla: STOP pravidlo pro organicky vznikající úkoly, Crash recovery procedura
- Memory soubory aktualizovány o incident 2026-04-19

**Plánováno — Training Centre (AIQ-00087..91):**
- Training Centre jako 7. Functional Center v AppIQ Studio
- 4 AI specialisté: AI PBI Designer, AI PBI Analyser, AI Data Story Teller, AI Document Reader

---

## 2026-04-19 — Session release v7.20 (i18n opravy — prezentace + Personal Pitch)

### Web — v7.20

**Opraveno: i18n dual-system konflikt + PERSONAL_PITCH jazykový přepínač — AIQ-00078, AIQ-00080, AIQ-00081**
- **`_i18n.js`:** Fix `lang-cz` vs `lang-cs` třída — v CS módu se přestaly zobrazovat přeložené texty v Promo webu (AIQ-00078)
- **`_i18n.js`:** Přidána `_hasKey()` helper funkce + guard `if (!_hasKey(key)) return` do všech 4 bloků `_applyDOM()` — zabraňuje přepsání `PREZ_TR` překladů 252 prezentačních klíčů (AIQ-00080)
- **`PERSONAL_PITCH.html`:** Přepracován `setLang()` na CSS-based systém — 3 pravidla `body.lang-en` s `!important`, toggle jedné třídy místo iterace přes DOM elementy (AIQ-00081)

---

## 2026-04-18 — Session release v7.19 (Archive Protocol)

### Web — v7.19

**Nové: ARCHIVE_PROTOCOL.json — protokol archivace — AIQ-00065 REVIEW**
- **`DO_ARCHIVE.ps1`:** Po archivaci generuje `ARCHIVE_PROTOCOL.json` se: status (OK/WARN), počtem souborů, velikostí v kB, breakdown dle typu (html/js/json/md/mp3/...), verify checklist (povinné soubory přítomny?), diff oproti předchozímu archivu (+přidáno/-odstraněno/~změněno), CHANGELOG excerpt pro danou verzi
- **`DO_ARCHIVE.ps1`:** Protokol uložen do `Archive/{session}/ARCHIVE_PROTOCOL.json` i `Release/ARCHIVE_PROTOCOL.json` (→ GitHub Pages)
- **`DO_ARCHIVE.ps1`:** PS výstup v okně: počet souborů, kB, status, +N/−N/~N diff
- **`admin/index.html`:** Po archivaci se automaticky otevře výsledkový modal s protokolem — status badge, statistiky, verify checklist, diff pills (přidáno=zelená, odstraněno=červená, změněno=oranžová), CHANGELOG excerpt
- **`_ghpages_root_index.html`:** Tlačítko 📋 Protokol u každé verze (latest card i history list) — otevírá modal se stejnou strukturou; načítá `protocolUrl` z `versions.json`
- **`DO_DEPLOY.ps1`:** Přidáno `protocolUrl` do každého záznamu v `versions.json`

---

## 2026-04-18 — Session release v7.18 (GitHub Pages multi-version publishing)

### Web — v7.18

**Nové: Multi-version GitHub Pages deployment — AIQ-00046 REVIEW**
- **`DO_DEPLOY.ps1`:** Přepsán na versioned deployment — každá verze nasazena do `v{ver}/HOPI_AppIQ_WebPage/Development/`
- **Struktura:** `v7.18/HOPI_AppIQ_WebPage/Development/` = kompletní kopie Release/ (zachovány relativní cesty)
- **`_i18n.js` snapshot:** Kopírován do `v{ver}/_i18n.js` — funguje `../../_i18n.js` z Development/
- **`versions.json`:** Nový index všech verzí s metadaty (version, date, session, title, URLs)
- **`_ghpages_root_index.html`:** Version selector landing page — zobrazí latest verzi jako hero, seznam archivovaných verzí
- **Archive detection:** `docs/index.html` detekuje archivní mód přes `../VERSION.txt` — funguje i v GitHub Pages verzi
- **Backward compat:** Nový deploy přidává versioned složky, stará struktura neodstraněna
- **`_status.json`:** Rozšíren o `deployLatest` URL pro aktuální verzi
- **Root URL:** `https://h-gr-fico.github.io/appiq/` → version selector, default = latest

---

## 2026-04-18 — Session release v7.17 (FC-7 + archive version binding)

### Web — v7.17

**Nové: Documentation Center (FC-7) — AIQ-00049 REVIEW**
- **Přidáno:** `docs/index.html` — nové Functional Center FC-7 s živou dokumentací
- **Architektura:** `DOCS_CONFIG` jako single source of truth (fcs, domains, phases, stack, integrations, roles, localStorage, oilSchema)
- **Tab: 📋 Tech Spec** — 6 sekcí (TS-1 až TS-6): Platform Overview + File Structure, Tech Stack + Browser Requirements, Data Layer (OIL.json schema v3.0 + localStorage), Integration Points, Deployment Guide, Security Model + Extension Guide
- **Tab: 📊 Business Spec** — 4 sekce (BS-1 až BS-4): Executive Summary + Business Case, Module Catalog, Deployment Phases + Roadmap, User Roles + KPIs
- **Tab: 📐 Diagramy** — 4 diagramy (GD-1 až GD-4): Architecture Schema (HTML/CSS z DOCS_CONFIG), Navigation Flow (Mermaid), Business Process (Mermaid), Technical Data Flow (Mermaid)
- **Live data:** OIL.json fetch (stats pro TS-3 a BS-1), `I18n.coverage()` pro TS-2 i18n pokrytí, `PREZ_VERSION` z `_ver.js` v nav
- **Lazy loading:** Mermaid.js CDN se načte pouze při otevření záložky Diagramy
- **Přidána karta FC-7** do Studio Hub (`Development/index.html`) — barva `#26c6da`, chip ACTIVE
- **`_i18n.js`:** 2 nové klíče `card.docs.name` + `card.docs.desc` (CS + EN)

**Nové: Version binding — DOCS_CONFIG připoutaný k verzi (tato session)**
- **`docs/index.html`:** `DOCS_CONFIG._version` čte `PREZ_VERSION` z `_ver.js` při init → bake-in verze při archivaci
- **`docs/index.html`:** `loadArchiveInfo()` — detekuje archivní mód přes `../VERSION.txt`, načítá `../CHANGELOG.md`
- **`docs/index.html`:** Archivní panel v TS-1 — verze, datum archivace, session ID, release notes z CHANGELOG (první `##` sekce)
- **`docs/index.html`:** OIL.json fallback cesta `../OIL.json` pro archivní data (live = `../../../OIL.json`)
- **`docs/index.html`:** Indikátor zdroje dat: 🟢 live / 🟡 archiv / 🔵 cache v TS-3
- **`AUTO_ARCHIVE.bat`:** Kontrola verze `_ver.js` + 5s Ctrl+C okno před archivací
- **`AUTO_ARCHIVE.bat`:** `CHANGELOG.md` kopírován do `Archive/session_xxx/` → release notes pro FC-7
- **`AUTO_ARCHIVE.bat`:** `OIL.json` kopírován do `Archive/session_xxx/` → data snapshot pro FC-7
- **`AUTO_ARCHIVE.bat`:** Kontrola existence `docs/index.html` při archivaci
- **`VERSION.txt`:** Rozšíren o verzi — formát: `session | datum | verze | popis`

---

## 2026-04-18 — Session release v7.16 (i18n audit — hardcoded texty opraveny)

### Web — v7.16 (PREZ_VERSION)

**Admin Center (FC-5) — i18n kompletní (AIQ-00064 CLOSED)**
- **Opraveno:** `renderCapTab()` — všechny sekční hlavičky, tabulkové hlavičky, summary card labels → `I18n.t()`
- **Opraveno:** `_capTypeLbl()` — hardcoded CZ mapa nahrazena `I18n.t('cap.type.*')`
- **Opraveno:** Toolbar tlačítka (Přidat úkol, Načíst OIL.json, Uložit, Audity, Nápověda, Nastavení) → `data-i18n`
- **Opraveno:** Add-form taskType/effort select options → `data-i18n` na každé `<option>`
- **Opraveno:** Input placeholders (title, desc, assignee, esttime) → `data-i18n-placeholder`
- **Opraveno:** Inline edit field labels (Popis, Doména, Modul, Komponenta, Řeší, Komentář, Zadáno, Typ úkolu, Effort, Odhad, Skutečný, Uložit, Zrušit) → `I18n.t()`
- **Opraveno:** Lang tab loading message a filter placeholder → `I18n.t()`
- **Opraveno:** Inline edit ttOpts/effOpts build → `I18n.t()` místo hardcoded CZ map

**Dev Center (FC-3) — i18n opraveno**
- **Opraveno:** `renderResp()` — tabulkové hlavičky (Rozsah, Formát, Status, Poznámka, OIL úkol) → `I18n.t()`
- **Opraveno:** `renderResp()` — status labels (OK, PŘIJATELNÉ, RIZIKO) → `I18n.t()`
- **Opraveno:** `_renderArch()` — "Mapa vazeb — file connections", "Soubory projektu" → `I18n.t()`

**`_i18n.js` — 25 nových klíčů (CS + EN)**
- `cap.col.domain/id/title/priority/status` — tabulkové hlavičky
- `oil.field.*` (9 klíčů) — inline edit field labels
- `oil.inline.save` — tlačítko Uložit bez emoji
- `lang.key.filter`, `lang.loading` — lang tab
- `dev.arch.map.title`, `dev.arch.files.title` — Dev Center Arch Map
- `dev.resp.col.*` (4 klíče), `dev.resp.status.*` (3 klíče) — Dev Center Responsivita

---

## 2026-04-18 — Session release v7.15 (Kapacita — resource tracking + OIL schéma)

### Web — v7.15 (PREZ_VERSION)

**Admin Center (FC-5) — záložka 📊 Kapacita (AIQ-00048 REVIEW)**
- **Přidáno:** 4. záložka `📊 Kapacita` v Admin Center
  - Summary cards: Celkem úkolů / S odhadem / Odhadnutý čas / Skutečný čas / Pokrytí daty
  - Přepínač jednotek: `min` / `h` / `d` (1d = 8h), výchozí `h`
  - Effort (T-shirt) distribuce: `XS — <30 min`, `S — 30 min–2 h`, `M — 2–4 h`, `L — 4–8 h`, `XL — 8+ h` — barevné pruhy, počty
  - Breakdown podle řešitele (Claude vs. David): úkolů, odhadnutý čas, skutečný čas
  - Breakdown podle taskType (11 kategorií): Vývoj/Oprava/Obsah/Design/Review/Schválení/Test/Release/Archivace/Průzkum/Dokumentace
  - Breakdown podle domény (Studio/Finance/Platform/…)
  - Otevřené úkoly — tabulka s effort badge, typem, odhadem, skutečným časem
- **Přidáno:** OIL schéma rozšířeno o nová pole:
  - `taskType` — 11 kategorií (development, fix, content, design, review, approval, test, release, archive, research, docs)
  - `effort` — T-shirt (XS/S/M/L/XL) — inline časový ekvivalent vždy zobrazen
  - `estimatedTime` — odhad v minutách
  - `actualTime` — skutečný čas v minutách
- **Přidáno:** Add-form v OIL Backlog — nový řádek: Typ úkolu / Effort (s inline ekvivalenty) / Odhad (min)
- **Přidáno:** Inline edit řádek — nová pole: Typ úkolu, Effort, Odhad (min), Skutečný (min)
- **Přidáno:** OIL Backlog tabulka — nový sloupec Effort (barevný T-shirt kód s tooltipem)
- **Přidáno:** `_i18n.js` — klíče pro záložku Kapacita (CS + EN): `admin.tab.capacity`, `cap.*` (40+ klíčů)

**OIL-first konvence (nová)**
- **Přidáno:** CLAUDE.md + _SESSION_START/CLAUDE.md — sekce `OIL-first konvence`
  - Každý úkol musí být vytvořen v OIL.json před zahájením práce
  - Povinná pole: taskType, effort, estimatedTime, actualTime, assignee
  - T-shirt tabulka pro rychlou orientaci
- **Přidáno:** AIQ-00048 — první úkol se všemi novými poli (taskType, effort, estimatedTime, actualTime)

---

## 2026-04-18 — Session release v7.14 (i18n — modulární jazyková architektura)

### Web + Prezentace — v7.14 (PREZ_VERSION)

**_i18n.js — centrální jazyková služba (AIQ-00047 CLOSED)**
- **Přidáno:** `_i18n.js` na CO_PROJECT root — universal language service pro všechny komponenty
  - CZ jako referenční jazyk (fallback pro všechny), EN kompletní
  - SK/HU/PL/DE/RO/BG/HR stuby pro Finance Portal (`app.*` klíče)
  - API: `I18n.t(key)`, `I18n.setLang()`, `I18n.getLang()`, `I18n.langs()`, `I18n.meta()`, `I18n.coverage()`, `I18n.data()`, `I18n.init()`
  - Fallback řetězec: `_T[lang][key] || _T.cs[key]` — prázdné EN hodnoty padají zpět na CS
  - Persistence: `localStorage('hopi_lang')` sdílená mezi všemi stránkami

**Studio Hub (FC-1) — i18n integrace**
- **Přidáno:** CZ/EN lang-switch tlačítka v nav (zelená aktivní barva)
- **Přidáno:** `data-i18n` na všechny statické texty (nadpisy, karty center, sekce, footer)
- **Změněno:** `renderStatus()`, `renderOILMini()` — hardcoded CZ strings → `I18n.t('...')`
- **Přidáno:** Re-render OIL mini na změnu jazyka (zachování dat při přepnutí)

**Admin Center (FC-5) — i18n + záložka Jazyky**
- **Přidáno:** CZ/EN lang-switch v nav
- **Přidáno:** 3. záložka `🌐 Jazyky` — správa jazykových mutací:
  - Registr jazyků (tabulka: jazyk, scope, status, % pokrytí klíčů s barevným pruhem)
  - How-to guide — jak přidat nový jazyk (6 kroků)
  - Key browser — tabulka všech CS klíčů s EN hodnotami, full-text filtr

**Dev Center (FC-3) — i18n integrace**
- **Přidáno:** CZ/EN lang-switch v nav
- **Přidáno:** `data-i18n` na nav a záložky (Arch Map, Responsivita/Responsiveness, Architektura platformy)

**Test Center (FC-4) — i18n integrace**
- **Přidáno:** CZ/EN lang-switch v nav
- **Přidáno:** Kompletní `data-i18n` markup — badge, title, subtitle, feature cards, OIL note

**PORTAL_PRESENTATION.html — SCR-03 EN překlad + bridge**
- **Přidáno:** `_i18n.js` script tag, bridge `setLang()` → `I18n.setLang()`
- **Přidáno:** `data-i18n` na SCR-03 teaser — hints label, všechny 5 hint titles/descs, CTA, skip, back
- **Přidáno:** `data-i18n` na SCR-02 invite text + nav button title (EN = placeholder → fallback CS)
- SCR-02 Story Behind EN texty = prázdné (`''`) → fallback na CS — David doplní překlad

**Promo Web (FC-6) — bridge**
- **Přidáno:** `_i18n.js` script tag, bridge `setLang()` → `I18n.setLang()`

**Finance Portal — sync hopi_lang**
- **Přidáno:** `_i18n.js` script tag
- **Přidáno:** Sync `gc_lang_v1` ↔ `hopi_lang` (mapování `cz` → `cs`) při volbě jazyka i při init

---

## 2026-04-18 — Session release v7.13 (Studio Architecture complete — před i18n)

### Web + Prezentace — v7.13 (PREZ_VERSION)

**Studio Architecture — kompletní přechod na standalone centra (FC-1 až FC-6)**
- **Přidáno:** `Development/index.html` → Studio Hub (FC-1) — dashboard, nav cards, _status.json + OIL mini panel
- **Přidáno:** `Development/admin/index.html` → Admin Center (FC-5) — OIL Backlog + Release & Deploy
- **Přidáno:** `Development/dev/index.html` → Dev Center (FC-3) — Arch Map, Responsivita, Architektura platformy
- **Přidáno:** `Development/test/index.html` → Test Center stub (FC-4) — QA checklisty (PLANNED)
- **Přidáno:** `Development/promo/index.html` → Promo Web (FC-6) — čistý marketing web bez Studio overlay
- **Odstraněno:** Studio overlay panel (CSS + JS + HTML) z promo webu — přesunuto do standalone center
- **Opraveno:** Všechny relativní cesty v promo/ (`../../` → `../../../` pro root soubory)
- **Opraveno:** Hudební tlačítko CSS vráceno do promo webu po čištění OIL bloku
- Verze před zahájením i18n (CZ/EN + 9 jazyků Finance Portal) — checkpoint pro možnou publikaci

---

## 2026-04-18 — Session release v7.10 (PERSONAL_PITCH kompletní)

### Web + Prezentace — v7.10 (PREZ_VERSION)

**PERSONAL_PITCH.html — dokončení všech částí (AIQ-00044 CLOSED)**
- **Přidáno:** s-cast1b — Část I Oblast 2: ROI · ROCE · EBITDA · Valuace (dvě perspektivy: návratnost kapitálu + tržní hodnota)
  - Perspektiva A: ROI ~6M CZK/rok, ROCE vložený kapitál ~€800K M0–M36, EBITDA dopad skupiny
  - Perspektiva B: pre-seed €200K–500K → M36 konzervativní €12M → agresivní €86M (ARR × multiple)
  - Valuace timeline vizuál, key message: "Vstoupit teď = vstoupit za pre-seed cenu"
- **Přidáno:** s-cast3b — Část III Oblast 2: Hodnota vlastního vkladu Davida
  - 3 karty: Sweat equity €30K–60K / IP hodnota €100K–200K / Osobní závazek (odložená odměna)
  - David vs. HOPI srovnávací tabulka — 5 položek každá strana
  - Closing quote: "Nevstupuje jako uchazeč — vstupuje jako zakladatel s hotovým produktem"
- **Upraveno:** JS DOM reorder — pořadí I/1 → I/2 → II/1 → II/2 → II/3 → III/1 → III/2
- **Upraveno:** Cover dlaždice Část I + Část III — "Oblast 1 · Oblast 2" místo generického "Kompletní"

**AUTO_ARCHIVE.bat — explicitní pokrytí nových souborů**
- **Přidáno:** Verifikační echo pro PERSONAL_PITCH.html a _audio/story_personal.mp3
  (xcopy /E již zahrnoval oba soubory; přidáno pro přehlednost a detekci chybějících souborů)

---

## 2026-04-17 — Session release v7.9 (responsivní design + Tech Arch RESP)

### Web + Prezentace — v7.9 (PREZ_VERSION)

**Responsivní design — promo web (index.html)**
- **Přidáno:** 5-tier breakpointy: ≥3200px / ≥1920px / ≤1200px / ≤768px / ≤480px
- **Přidáno:** clamp() typografie pro ultrawide a Full HD
- **Přidáno:** Mobile: gridy → 1 sl., CTA přes šířku, skrytí dekorativních prvků

**Responsivní design — prezentace (PORTAL_PRESENTATION.html)**
- **Přidáno:** min-width blok: 1920px a 3440px (ultrawide) — padding, max-width, clamp titulky
- **Opraveno:** SCR-01 Intro, SCR-02 Story, SCR-03 Teaser — mobile 600px fixes (padding, fonty)

**Responsivní design — Finance portál (HOPI_AppIQ/Development/index.html)**
- **Přidáno:** 5-tier breakpointy: ≥1920px / ≤1200px / ≤1024px / ≤900px / ≤768px / ≤480px
- **Opraveno:** Mobile Preview tlačítko — `setProperty('display','block','important')` přebíjí CSS `!important` media query

**Tech Arch panel (IDX-ARCH) — nová záložka**
- **Přidáno:** RESPONSIVE_DATA.js — compatibility matrix pro 3 streamy (single source of truth)
- **Přidáno:** Záložka 🔔 Responsivita v Tech Arch panelu — dynamická, nezávislá na ARCH_MAP.md fetch
- **Přidáno:** Color-coded status OK / PŘIJATELNÉ / RIZIKO + OIL reference per řádek

**OIL + dokumentace**
- **Přidáno:** AIQ-00039 (MED) — Prezentace: HD 1366×768 + tablet + mobil
- **Přidáno:** AIQ-00040 (LOW) — Finance portál: tablet 768–1024px
- **Přidáno:** AIQ-00041 (LOW) — Promo web: mobilní zobrazení
- **Přidáno:** OIL_CONTEXT — kontext + testovací postup + návrhy oprav pro všechny 3 úkoly
- **Změněno:** ARCH_MAP.md DRAFT 0.1 → 0.2 (prefix RESP-xx, breakpoint tabulka, vazby)

---

## 2026-04-17 — Session release

### Web + Prezentace — v7.3-WebPage
- **Přidáno:** Slide #s-hopi6 — 7-etapový záměr HOPI TECHNOLOGY, HOPI TechIQ s.r.o., timeline, milestones
- **Přidáno:** Slide #s-strategy — strategický slide pro majitele skupiny (B2B/B2C, mobile-first, platforma-first, Anthropic partnerství)
- **Přidáno:** Slide #s-proposal — podnikatelský záměr Davida Gogely, 5 pilířů, investor vstup
- **Přidáno:** Slide #s-financial — cash-flow pohled Fáze 1/2A/2B s EUR/CZK toggle
- **Přidáno:** Slide #s-moment — pre-slide AI game changer (internet 90s analogie)
- **Přidáno:** Slide #s-partners — strategická partnerství (ARTIN, INTECS, Anthropic)
- **Přidáno:** SVG loga — HOPI TECH (HT monogram, zelený) a HOPI AppIQ (diamond IQ, orange/green)
- **Přidáno:** Hudba — background audio (on-click start, capture listener, localStorage state)
- **Opraveno:** "HOPI Intelligent Portal" → "HOPI AppIQ" (5× výskytů), TOC 0D→0E
- **Archivováno:** v7.3-WebPage_20260417

---

## 2026-04-16 — Souběžný release obou streamů

### Aplikace — v1.2-Phase0
- **Přidáno:** Changelog sekce v Settings → Developer (CHANGELOG_DATA, NEW/FIX badges)
- **Změněno:** Restrukturalizace do `HOPI_AppIQ/` stream; nový MAKE_RELEASE.bat

### Web + Prezentace — v1.1-WebPage
- **Přidáno:** Changelog panel v prezentaci (📋 v6.1, PREZ_CHANGELOG_DATA, modal)
- **Přidáno:** Mermaid diagramy přeloženy do angličtiny
- **Změněno:** Restrukturalizace do `HOPI_AppIQ_WebPage/` stream; Development/Release/Archive
- **Změněno:** Appka se spouští v nové záložce (target="_blank")
- **Opraveno:** Relativní cesty po restrukturalizaci

---

## 2026-04-16 — Předchozí releases (před restrukturalizací)

### Aplikace — v1.1-Phase0
- Help System (? FAB, F1, modal 8 modulů, 9 jazyků), Release Manager Nápověda, Settings/Developer tab
- Fix: logo HOPI inline SVG, navigační tlačítka, HTML entity v JS textContent

### Aplikace — v1.0-Phase0
- Počáteční release — Group Controlling Portal, 9 jazyků, Release Manager, MAKE_RELEASE.bat, HOPI AppIQ WebPage

### Web + Prezentace — v1.0-WebPage
- Počáteční release — promo web + prezentace PORTAL_PRESENTATION.html v6.1 (CS/EN bilingvní)

---

## Plánované verze

| Stream | Verze | Obsah |
|--------|-------|-------|
| Aplikace | v1.3-Phase0 | Help System — doplnění SK/HU/PL/DE/RO/BG/HR překladů nápovědy |
| Aplikace | v1.4-Phase0 | Brand — výběr a nasazení finálního logotypu HOPI AppIQ |
| Web | v1.2-WebPage | Changelog panel na promo webu (PROMO_CHANGELOG_DATA) |
| Web | v1.3-WebPage | Aktualizace obsahu promo webu pro v6 architekturu |
| Aplikace | v2.0-Phase1 | První rozšíření mimo Finance — Operations nebo Purchasing sub-portál |

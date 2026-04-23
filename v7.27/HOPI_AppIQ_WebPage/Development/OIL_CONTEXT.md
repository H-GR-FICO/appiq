# OIL_CONTEXT.md — Kontext a výtah z diskusí per úkol

---

## AIQ-00360 — MANAGEMENT_COCKPIT.html: bilinguální labely + story strip CSS fix (2026-04-23)

**Datum:** 2026-04-23 | **Status:** CLOSED | **Assignee:** Claude | **Completed:** 2026-04-23

### Oprava 1 — Bilingvní labely (DISC-260423-003)
`"SEKCE / SECTIONS"` a `"COCKPIT STORY / PŘÍBĚH COCKPITU"` — obě hodnoty měly lomítko s oběma jazyky natvrdo v HTML. Opraveno: přidány ID (`sections-heading`, `cockpit-story-label`), text nastavuje `renderSections()` dle aktivního jazyka.

### Oprava 2 — Story strip CSS visibility
Text story stripu nebyl viditelný:
- `.story-strip-label`: `font-size: 9px; color: var(--muted)` → `11px; var(--text)`
- `.story-arrow`: `color: var(--border)` = `#1a2a4a` na tmavém bg = neviditelné → `var(--muted)`
- `.story-step`: `font-size` 12→13px, padding zvětšen
- `.story-step .sn`: `opacity: 0.65` → `0.85`
- Pill backgrounds: `0.12` → `0.18`, borders: `0.22` → `0.40`

---

## AIQ-00359 — Cockpit sub-stránky: translation audit (hardcoded CZ → bilinguální) (2026-04-22)

**Datum:** 2026-04-22 | **Status:** CLOSED | **Assignee:** Claude | **Completed:** 2026-04-23

### Kontext
Všechny cockpit sub-stránky (19 souborů) měly hardcoded CZ texty v page-title, section headers, button labels, placeholder textech a status labelech. Shell topbar byl přeložen přes `_shell.js`, ale obsah stránek nikoliv.

### Implementation notes
Použitý pattern per stránka:
1. `Shell.init({ section: {cs:'...', en:'...'} })` — bilingual section name v topbaru
2. IIFE po Shell.init pro statický HTML: `if (Shell.getLang() !== 'en') return; /* querySelector patches */`
3. JS-rendered content: `Shell.getLang() === 'en' ? 'EN text' : 'CZ text'` ternary přímo ve template literals
4. Data-driven objects (decisions, business-model): const s language-conditional objekty

### Pokryté soubory (20 souborů, ne 19)
`launch-plan, motivation, team, kpi, timeline, overview, methodology, financial, decisions, capacity, budget-track, documentation, sources, business-architecture, business-model, meeting-room, org-coordination, oil-board, boil-board, task-control`

### Bug fix nalezený při auditu
`task-control.html` četl localStorage klíč `appiq_lang` místo `hopi_lang` → language switch tam vůbec nefungoval. Opraveno v rámci tohoto úkolu.

### Vazba
Prerekvizita AIQ-00354 (i18n refactor) — po refactoru bude translation vrstva nahrazena JSON klíči.

---

## AIQ-00358 — Oprava chybné cesty _shell.js: org-coordination + meeting-room (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** Claude

### Root cause
`org-coordination.html` a `meeting-room.html` měly `<script src="../_shell.js">` místo `<script src="_shell.js">`. Cesta `../` hledala soubor v `Development/` kde neexistuje — `Shell` byl `undefined`, `Shell.init()` vyhodilo ReferenceError, topbar se nevykreslil, hudba nehrála.

### Proč ostatní stránky fungovaly
Všechny ostatní sub-stránky používají `_shell.js` (bez `../`). Tyto dvě stránky byly pravděpodobně vytvořeny/editovány v okamžiku kdy byla `_shell.js` testována v Development/ nebo šlo o překlep.

### Oprava
- `org-coordination.html`: `src="../_shell.js"` → `src="_shell.js"`, sectionNum `19` → `13` (po reorderingu)
- `meeting-room.html`: `src="../_shell.js"` → `src="_shell.js"`
- Music path `../cockpit-music.mp3` správně ponecháno (soubor je v `Development/`)

---

## AIQ-00357 — BOIL Board: fetch BOIL.json + zobrazení BIZ úkolů (2026-04-22)

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** Claude

### Záměr
`boil-board.html` (sekce 12 — BIZ Task Board) nyní zobrazuje placeholder. Implementovat live data z BOIL.json analogicky k OIL boardu (AIQ-00356).

### Implementační plán
1. `fetch('../BOIL.json')` → parsovat BIZ-NNNNN úkoly
2. Tabulka/karty s: id, title, status, priority, domain, assignee, createdAt
3. Filtry: status, priority, domain, taskType
4. Stats panel: celkem, open, in-progress, review, closed
5. Expandovatelný detail s BKONTEXT záznamy (fetch('../BKONTEXT.md') → parse per BIZ)

---

## AIQ-00356 — OIL Board: fetch OIL.json + zobrazení AIQ úkolů (2026-04-22)

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** Claude

### Záměr
`oil-board.html` (sekce 11 — TECH Task Board) nyní zobrazuje placeholder. Implementovat live data z OIL.json.

### Implementační plán
1. `fetch('../OIL.json')` → parsovat `tasks[]` array
2. Tabulka/karty: id (AIQ-NNNNN), title, status, priority, taskType, effort, assignee, createdAt
3. Filtry: status, priority, taskType, effort, domain, modul
4. Stats panel: celkem, open, in-progress, review, closed, dnes uzavřeno
5. Expandovatelný detail s context z OIL_CONTEXT.md (fetch('../OIL_CONTEXT.md') → parse per AIQ ID)
6. Rychlý export: "Dnes uzavřeno" → pro release notes

---

## AIQ-00354 — Cockpit i18n refactor: překlady z inline JS → _translations/*.json (2026-04-22)

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** Claude

### Kontext
Aktuální pattern `{cs: 'Motivační prostor', en: 'Motivation Chamber'}` inline v SECTIONS array nešká luje. Pro každý nový jazyk = 140+ editací přímo v HTML. David identifikoval problém při přidávání překladů sekcí (AIQ-00353).

### Navržené řešení
```
cockpit/_translations/
  cs.json    ← { "section.01.name": "Motivační prostor", "section.01.desc": "...", ... }
  en.json    ← { "section.01.name": "Motivation Chamber", ... }
  de.json    ← přidání nového jazyka = jen tento soubor
```
SECTIONS array bude referovat klíče: `name: 'section.01.name'`  
`_shell.js` dostane lightweight `t(key)` funkci která načte správný JSON a přeloží.

### Přidání jazyka po refactoru
1. Vytvořit `cockpit/_translations/xx.json`
2. Přidat `xx` do lang switcher options
3. Hotovo — nula změn v HTML nebo JS logice

### BLOCKER
Implementovat **před přidáním 3. jazyka** do cockpitu. Dokud jsou jen cs/en, tech debt je únosný.

---

## AIQ-00352 — Cockpit Story strip nad sekcemi (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** Claude

### Implementation notes
- Přidán `.story-strip` div do `MANAGEMENT_COCKPIT.html` — umístění: mezi `sections-header` a `sections-grid`.
- 12 barevných pills seskupuje 20 sekcí do logických kroků: `01 Proč → 02 Kdy → 03–04 Jak → 05 Kde jsme → 06 Čísla → 07–08 Peníze → 09 Milníky → 10–12 Práce → 13–15 Koordinace → 16–17 Tým → 18–19 Metodika → 20 Dokumenty`
- Barvy: violet=strategické (Proč, Kde jsme, Koordinace, Metodika), blue=časové/operativní (Kdy, Čísla, Milníky, Tým), amber=akční (Jak, Práce), green=finanční/výstupní (Peníze, Dokumenty)
- Strip je horizontálně scrollovatelný na mobile (`overflow-x: auto`)
- Label: `COCKPIT STORY / PŘÍBĚH COCKPITU` v mono muted, 9px

---

## AIQ-00351 — Cockpit sekce: Launch Plan přesunut na pozici 02 (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** Claude

### Implementation notes
- SECTIONS array: Launch Plan přesunut z `num:'05'` na `num:'02'`. Přečíslování: Business Model 02→03, Architecture 03→04, Overview 04→05.
- Finální sekvence úvodu cockpitu: **Motivation(01) → Launch Plan/Countdown(02) → Business Model(03) → Architecture(04) → Executive Overview(05)**
- Odůvodnění: ranní briefing pattern = proč (motivace) → kdy (countdown, urgence) → jak (obchodní model) → kde jsme (aktuální stav). Countdown dlaždice s živými daty (Dnů do B2C/B2B) posiluje denní motivaci hned za úvodní sekcí.

---

## AIQ-00350 — Cockpit UI v2: překlad dlaždic, serif mot-quote, Decision Log reorder (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** Claude

### Implementation notes
- **Překlad hardcoded řetězců:** `renderSections()` v MANAGEMENT_COCKPIT.html — `'SEKCE'` → `lang === 'cs' ? 'SEKCE' : 'SECTION'`, `'Otevřít →'` → `lang === 'cs' ? 'Otevřít →' : 'Open →'`. Ostatní strings (sec-name, sec-desc, kpi-lbl) byly již přeloženy správně.
- **Serif font v mot-quote:** `motivation.html` `.mot-quote` nemělo explicitní `font-family`. Přidáno `font-family: var(--c-font-sans)` — bez inheritance chain, garantovaně sans-serif.
- **Decision Log reorder:** SECTIONS array — Decision Log přesunut z num:'19' na num:'15' (za Meeting Room 14). Nové pořadí: OIL(11)→BOIL(12)→Org(13)→Meeting(14)→Decision Log(15)→Capacity(16)→Team(17)→Sources(18)→Methodology(19)→Documentation(20). Logická sekvence: Tasks → Coordination → Decisions.

---

## AIQ-00349 — Cockpit hudba: currentTime persistence + autoplay fallback (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** Claude

### Implementation notes
- **Problém:** každá cockpit stránka vytváří nový `<audio>` element → přehrávání startuje od 0:00 při každé navigaci.
- **Fix — sessionStorage:** `MUSIC_TIME_KEY = 'hopi_audio_time'`. Při opuštění stránky (`beforeunload`) se ukládá `audio.currentTime`. Při načtení nové stránky se v `canplay` event obnoví pozice. Fallback pro cached audio: `readyState >= 3 && savedTime > 0`.
- **Autoplay fix:** `audio.play()` rejection → `document.addEventListener('click', ..., { once: true })` spustí hudbu při první interakci uživatele. Browser policy vyžaduje user gesture; auth button click v novém tabu nestačí při prvním načtení.
- **Soubory:** `cockpit/_shell.js` (sub-pages) + `MANAGEMENT_COCKPIT.html` `initMusic()` (hlavní cockpit). Obě implementace konzistentní.
- **sessionStorage scope:** přetrvá v rámci tabu, resetuje se při zavření prohlížeče/tabu.

---

## AIQ-00347 — Cockpit UI fix: font, tile velikost, přesun sekcí (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** Claude

### Implementation notes
- **Příčina "patkového" písma:** `--c-font-mono: 'Courier New'` — Courier New má serif patky. Používá se v `_cockpit.css` a MANAGEMENT_COCKPIT.html pro KPI hodnoty, labely, tagy.
- **Fix — jedno místo = všechny stránky:** `_cockpit.css` `--c-font-mono` → `'Consolas', 'Cascadia Code', system-ui, sans-serif`. Consolas je sans-serif monospace (žádné patky). Stejná změna v MANAGEMENT_COCKPIT.html `--mono`.
- **Tile velikosti:** `sec-num` 10→12px, `sec-name` 16→18px, `sec-icon` 28→30px, `sec-desc` 12→13px
- **Přesun sekcí 19+20:** Org & Coordination → sekce 13, Meeting Room → sekce 14. Ostatní posunuto: stará 13→15, 14→16, 15→17, 16→18, 17→19, 18→20. Logika: Tasks(10) → OIL(11) → BOIL(12) → Org(13) → Meeting(14) = přirozená sekvence koordinace.
- **AIQ-00348** zaregistrován pro budoucí logické seskupení sekcí do skupin

### Test task
- AIQ-00347-T1 — David vizuálně ověří: žádné Courier New, tile labely čitelné, pořadí sekcí správné

---

## AIQ-00345 — Archive Verify List: Kompletní pokrytí cockpit souborů (2026-04-22)

**Datum:** 2026-04-22 | **Status:** CLOSED | **Assignee:** Claude

### Kontext
David požádal o kontrolu archivačních skriptů před deployem. Odhalena kritická mezera: `DO_ARCHIVE.ps1` verify list měl pouze 6 cockpit souborů z 25 skutečně existujících. Chybějící soubory by prošly archivací (xcopy kopíruje vše), ale VERIFY krok by je nezachytil jako chybějící.

### Implementation notes
- **DO_ARCHIVE.ps1** — `$webChecks` doplněno o 19 HTML souborů + `cockpit\business-model.json` + `cockpit\discussion-log.json`
- **AUTO_ARCHIVE.bat** — existence checks doplněny pro totéž (23 souborů celkem místo 4)
- **CLAUDE.md** — nové pravidlo "Aktualizační pravidla — Archive verify list": každý nový soubor v projektu = povinná aktualizace obou skriptů
- Nová CLAUDE.md rule je souřadná s existujícím ARCH_MAP.md pravidlem
- DISC-260422-030

---

## AIQ-00344 — Deploy Integrity Rule: Pravidlo 6 (2026-04-22)

**Datum:** 2026-04-22 | **Status:** CLOSED | **Assignee:** Claude

### Implementation notes
- Davidova instrukce: "deploy musí být vždy funkční" — formalizovat jako pravidlo před deployem
- Přidáno jako **Pravidlo 6** do sekce "Deployment bezpečnostní pravidla" v CLAUDE.md
- Checklist 6 bodů: HTML otevřitelnost, JS bez chyb, JSON validita, navigace, golden path nové featury, CHANGELOG datum
- Závazné pořadí uzávěru session: integrity check → deploy → archiv
- DISC-260422-029

---

## AIQ-00343 — discussion-log.json: Externalizace dat (Data Layer oddělena od UI) (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** Claude | **Linked:** AIQ-00341

### Kontext
David položil otázku škálovatelnosti: "nedoběhne nás velikost databáze, technické možnosti souboru? poběží to do nekonečna?" Analýza ukázala, že embedded DECISIONS[] pole v HTML je architektonický anti-pattern s konkrétními limity (500 záznamů = degradace editoru, 2000+ = 3MB soubor, neúnosná údržba).

### Implementation notes
- **Problém:** `const DECISIONS = [...]` bylo embedded přímo v `cockpit/org-coordination.html` (cca 180 řádků, 41 záznamů) — mísení dat s UI, anti-pattern
- **Řešení:** Nový soubor `cockpit/discussion-log.json` = pure data (44 záznamů, compact JSON formát, 1 záznam = 1 řádek)
- **org-coordination.html změny:**
  - `const DECISIONS = [...]` nahrazen `let DECISIONS = [];`
  - Init sekce nahrazena `fetch('discussion-log.json')` s loading state (spinner) + error handling (srozumitelná hláška pro file:// protokol)
  - `getAllEntries()` funguje bez změny — merguje pendingEntries + DECISIONS
  - `generateDiscId()` funguje bez změny — počítá prefix v getAllEntries()
- **Webserver požadavek:** fetch() API nefunguje přes `file://` protokol — nutný webserver (VS Code Live Server, GitHub Pages). Error state zobrazí srozumitelnou hlášku.
- **Migrace v9.x:** Změna `fetch('discussion-log.json')` → `fetch('/api/v1/disc-log')` = 1 řádek kódu, zbytek se nemění
- **Škálovatelnost:** JSON soubor do 5000 záznamů = cca 1.5MB, přijatelné. Nad 5000 = API endpoint. Jasná exit strategie.
- **DISC-260422-021** — rozhodnutí zaznamenáno v discussion-log.json

### Test task
- **AIQ-00343-T1** — Integration test: David ověří fetch loading, JSON rendering, statistiky, filtry, entry form ID generování s externími daty, error state

---

## AIQ-00342 — Discussion Log Entry Form + Participant Identity (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** David Gogela | **Linked:** AIQ-00341

### Implementation notes

**Trigger:** David upozornil, že schéma sice definuje `participants`, ale chybí UI kde se účastníci mohou sami identifikovat a přidat záznam.

**Dodáno:**

**1. org-coordination.html — "➕ Přidat záznam" modal**
- Nové tlačítko v toolbaru (fialový okraj, viditelný)
- Modal overlay (klik mimo = zavřít, ESC friendly)
- **Participant selector** — 7 čipů: DG · AI · ARTIN · INTECS · HOPI-MGMT · HOPI-IT · ANTHROPIC
  - Multi-select (více účastníků = společná diskuse)
  - První vybraný = facilitátor (označen ★)
  - Minimálně 1 musí být vybran (guard)
  - Default: DG předvybrán
- **Type selector** — 6 barevných čipů (DECISION violet / ACTION amber / RISK red / INSIGHT blue / QUESTION yellow / NOTE gray)
- Doména + Priorita (dropdowns)
- **Output selector** — 6 čipů s barvami per audience (INVESTOR amber / ANTHROPIC violet / CEO_BRIEF blue / HOPI_MGMT green / INTERNAL gray / PUBLIC yellow)
- Textarea pro text, input pro "kde" reference, input pro assignee (viditelný jen pro ACTION)
- **Po odeslání:** automatický DISC-YYMMDD-NNN ID, uložení do localStorage (`disc_pending_entries`)

**Pending section:**
- Zobrazí se nad logem jakmile jsou čekající záznamy
- Každý záznam: ID + typ + doména + účastníci + text + tlačítko smazat
- "📋 Export MD pro sync" → stáhne `.md` soubor s formátovanými bloky pro append do DISCUSSION_LOG.md
- "🗑 Smazat vše" s potvrzením

**Pending záznamy v log view:**
- Pending entries se mergují s DECISIONS[] (pending = první)
- Zobrazují se v separátní session skupině "Live Entry (čeká na sync)"
- Stats bar a session count jsou dynamické (počítají z merged datasetu)

**2. meeting-room.html — "Kdo píše?" selector**
- Persistent selector nad vstupním polem Discussion Board
- Chips: DG · AI · ARTIN · INTECS · HOPI-MGMT · Jiný (single-select, aktivní = orange)
- Každý thread/reply ukládá `author` a `avatar` z vybraného účastníka
- Platí globálně — jednou vybrat, platí pro všechna vlákna i odpovědi v session
- Avatar badge v threadu odpovídá autorovi

**REVIEW body:** Formulář vizuálně OK? Participant chips přehledné? Export MD formát správný pro DISCUSSION_LOG.md?

---

## AIQ-00341 — DISCUSSION_LOG v2 schema + Total Audit Log pravidlo (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** David Gogela | **Linked:** AIQ-00338

### Implementation notes

**Trigger:** David (2026-04-22): "žádná diskuse nezůstane nezapsaná, chceme se vrátit ke všemu, musí existovat totální audit log + identifikaci osoby, agenta, účastníků diskuse"

**Dodáno v tomto tasku:**

**1. DISCUSSION_LOG.md v2.0** (přepsáno z v1.1)
- Nový formát: block per záznam (ne tabulka) — umožňuje 10+ polí bez ořezu
- ID konvence: `DISC-YYMMDD-NNN` (datové + sekvenční)
- Nová povinná pole: `type`, `domain`, `priority`, `status`, `participants`, `output`
- Retroaktivní záznamy označeny `[~RETRO]`, přibližné časy `~HH:MM`
- 40 záznamů z 7 sessions (2026-04-18 → 2026-04-22)
- Metodická sekce: jak přidávat záznamy, konvence, linking

**2. CLAUDE.md — sekce "DISCUSSION LOG — Totální audit log"**
- Umístění: PŘED sekcí BRAINSTORMING CAPTURE
- Obsah: ID konvence, tabulka povinných polí, kódy účastníků (DG/AI/HOPI-MGMT/HOPI-IT/ARTIN/INTECS/ANTHROPIC), typová taxonomie (6 typů), output tagy (6), preset filtrové dotazy (8), linking pravidla (DECISION+BUSINESS → BKONTEXT, ACTION → OIL.json), trigger pravidla (logovat PŘED dalším krokem, check na začátku/konci session)

**3. org-coordination.html v2.0** (přepsáno z v1.1)
- DECISIONS[] array = 40 záznamů s plným schema v2.0
- 6 filtrů: search, type, domain, priority, status, output, session
- 11 preset reportů: Investor Report, Anthropic Pitch, CEO Brief, Open Decisions, Critical Only, Architecture Decisions, Business Decisions, Team Decisions, Open Actions, Process Decisions, Recent Session
- Badge systém: type (violet/amber/red/blue/green/gray), priority (red/amber/blue/gray), status (green/yellow/gray/blue), output tagy (amber/violet/blue/green/gray/yellow)
- Export: JSON (filtred) + Markdown (filtered, formátovaný pro sdílení)
- Participant codes zobrazeny v kartě

**Schéma záznamu v2.0:**
```
id: DISC-YYMMDD-NNN
datum / čas (~HH:MM) / [~RETRO]
type: DECISION | ACTION | INSIGHT | RISK | QUESTION | NOTE
domain: PRODUCT | ARCHITECTURE | BUSINESS | PROCESS | BRAND | DEPLOY | STRATEGY | TEAM
priority: CRITICAL | HIGH | MEDIUM | LOW
status: CONFIRMED | OPEN | SUPERSEDED | DONE | CANCELLED
participants: [DG, AI, ...]
output: [INVESTOR, ANTHROPIC, CEO_BRIEF, HOPI_MGMT, INTERNAL, PUBLIC]
assignee: (pro ACTION typ)
text: hlavní text záznamu
kde: [BIZ-XXXXX, AIQ-XXXXX, ...]
superseded_by: DISC-YYMMDD-NNN (pokud status=SUPERSEDED)
```

**REVIEW body:** 40 záznamů — chybí rozhodnutí? Preset reporty jsou správně nakonfigurovány? Export funguje?

---

## AIQ-00340 — Meeting Room: Sekce 20 cockpitu (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** David Gogela | **Linked:** AIQ-00309

### Implementation notes

**Dodáno:** `cockpit/meeting-room.html`

**Panel 1 — Digital Flipchart:**
- Sticky notes ve 5 barvách (žlutá/zelená/modrá/fialová/červená)
- Přidávání/mazání notes, editace textu v místě
- localStorage persistance — notes přežijí reload
- Export JSON (soubor se stáhne)
- Clear board s potvrzením

**Panel 2 — Discussion Board:**
- Vytváření threadů (textarea + button)
- Odpovědi na thready (Enter = odeslat)
- Hlasování 👍 per thread (toggle)
- localStorage persistance
- HTML escape pro bezpečné zobrazení

**Architektura:** Tab switcher (Flipchart/Discussion Board), Shell.init pattern, `.cockpit-page` CSS.
**Datový zdroj:** localStorage (offline-first, žádný backend v Phase 1).

**REVIEW body:** UX odpovídá záměru? Chybí funkce? Sticky notes velikost OK?

---

## AIQ-00339 — Organization & Coordination: Sekce 19 cockpitu (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** David Gogela | **Linked:** AIQ-00309

### Implementation notes

**Dodáno:** `cockpit/org-coordination.html`

**Sekce 1 — Discussion Log viewer:**
- 40 rozhodnutí z 7 sessions (2026-04-18 → 2026-04-22)
- Zpětně doplněno z JSONL transkriptu + BKONTEXT + session znalosti
- Stats bar: celkem rozhodnutí / sessions / dní záznamu / dnes přidáno
- Filtrace: search (text) + select (session)
- Session bloky s collapse/expand
- Per-rozhodnutí: číslo + text (tučné klíčové slovo) + "kde zachyceno" tagy

**Sekce 2 — Odpovědnosti & Kontakty:**
- David Gogela: Product Owner, schvalování, HOPI relations, investor
- Claude: Development, architecture, OIL, deployment, session briefing
- ARTIN s.r.o.: Technology Partner P2 (backend, SAP)
- INTECS: Technology Partner P2 (IT infra, security, SharePoint)

**Architektura:** Embedded JS array (DECISIONS[]), render funkce, filterLog(), Shell.init pattern.
**Budoucí napojení:** Fetch z GitHub API (`DISCUSSION_LOG.md`) — zatím embedded pro rychlost.

**REVIEW body:** Chybí nějaké rozhodnutí? Odpovědnosti správné? Kontakty úplné?

---

## AIQ-00338 — DISCUSSION_LOG.md: Živý záznam rozhodnutí (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** David Gogela | **Linked:** —

### Implementation notes

**Dodáno:** `DISCUSSION_LOG.md` (root projektu)

**Trigger:** Context komprese 2026-04-22 způsobila ztrátu celého ranního brainstormingu. Ochrana: BRAINSTORM_LOG.md (CLAUDE.md protokol). Tento soubor = second layer ochrany pro strategická rozhodnutí.

**Obsah:** 40 rozhodnutí, 7 sessions (2026-04-18 → 2026-04-22). Zpětné doplnění z:
- JSONL transkript audit (agent prošel 599 řádků, 25 rozhodnutí)
- BKONTEXT.md záznamy (BIZ-00122, 00124, 00125, 00126, 00127)
- Session knowledge (CLAUDE.md, OIL.json, session summary)

**Formát:** `## Session YYYY-MM-DD — Label` → tabulka `# | Čas | Rozhodnutí | Kde zachyceno`

**Pravidlo:** Appendovat pouze, nikdy přepisovat. Ukládat do `_SESSION_START/DISCUSSION_LOG.md` při archivaci.

**REVIEW body:** Chybí rozhodnutí z předchozích sessions? Formát vyhovuje?

---

## AIQ-00337 — Business Architecture: Sekce 03 cockpitu (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** David Gogela | **Linked:** AIQ-00309

### Implementation notes

**Dodáno:** `cockpit/business-architecture.html`

**Obsah:** 9D produktový model (9 karet), fázový plán Phase 1→3, 5-vrstvá tech architektura (Visual→Data→Workflow→Integration→AI), 5 zákonů platformy, tržní diferenciace (6 karet), 5 klíčových architektonických dokumentů s AIQ linky.

**Narativní pozice:** Sekce 03 = "PROČ TO FUNGUJE" — zasazuje Business Sales Model (sekce 02) do kontextu platformové strategie. Zodpovídá otázku: proč je architektura jiná než u konkurence a proč škáluje.

**REVIEW body:** Obsah správný? Chybí nějaká diferenciace? Dokumenty aktuální?

---

## AIQ-00336 — Business Sales Model: Technická dokumentace obchodního modelu (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** David Gogela | **Linked:** BIZ-00124

### Implementation notes (2026-04-22)

**Dodáno:**
- `cockpit/business-model.json` — single source of truth, plně modulární schema
- `cockpit/business-model.html` — live UI: scénář switcher + ARR grid + exit valuace + segment tabulky + HOPI transfer pricing + cost assumptions
- `MANAGEMENT_COCKPIT.html` — přidána sekce 17 do SECTIONS[]
- `cockpit/motivation.html` — doplněna valuační sekce s live přepínačem scénářů z business-model.json

**Architektura:**
- 4 scénáře: Conservative 8% / Middle 10% / Ambitious 15% / Dream 22% (freemium konverze)
- Exit paths: Acquisition 12× / PE Buyout 6× / IPO 25× / HOPI Group 10× (baseline)
- Segmenty: HOME B2C (3), Enterprise B2B (3), Cockpit B2B (3), Cockpit HOME (2), HOPI Internal (5)
- Transfer pricing: OECD cost-plus, €9.99 × 28% × 1.05 = €2.94 → €3.00/user
- DB-ready: přidání segmentu = nový JSON objekt, swap → _data.js only

**REVIEW body pro Davida:**
1. Ověřit čísla segmentů (ceny OK?)
2. Počty uživatelů HOPI divisí jsou placeholder (30/25/20/15/10) — doplnit reálná čísla
3. Dream scénář Y1/Y2 ARR jsou null — doplnit po diskusi s majiteli HOPI
4. GitHub API write (AIQ-00319) zatím není live — čísla jsou read-only z JSON

### Účel sekce

Interaktivní revenue simulátor — single source of truth pro všechna finanční čísla platformy. Editovatelná pole → okamžitý přepočet → persistence přes GitHub API.

### Soubory

```
cockpit/business-model.html     ← UI sekce
cockpit/business-model.json     ← datový soubor (GitHub API read/write)
```

### business-model.json — kompletní schéma

```json
{
  "version": "1.0",
  "lastUpdated": "2026-04-22",

  "cost_assumptions": {
    "gross_margin_pct": 72,
    "api_cost_per_session_eur": 0.10,
    "avg_sessions_per_user_monthly": 30,
    "payment_processing_pct": 2.9,
    "hosting_per_user_eur": 0.20
  },

  "segments": [
    {
      "id": "b2c-individual",
      "group": "B2C_HOME",
      "name": { "cs": "Jednotlivec", "en": "Individual" },
      "unit": "user",
      "billing_period": "monthly",
      "pricing_model": "flat",
      "price": 9.99,
      "currency": "EUR",
      "active": true
    },
    {
      "id": "b2c-couple",
      "group": "B2C_HOME",
      "name": { "cs": "Pár", "en": "Couple" },
      "unit": "user",
      "billing_period": "monthly",
      "pricing_model": "flat",
      "price": 14.99,
      "currency": "EUR",
      "active": true
    },
    {
      "id": "b2c-family",
      "group": "B2C_HOME",
      "name": { "cs": "Rodina", "en": "Family" },
      "unit": "user",
      "billing_period": "monthly",
      "pricing_model": "flat",
      "price": 19.99,
      "currency": "EUR",
      "active": true
    },
    {
      "id": "b2c-freemium",
      "group": "B2C_HOME",
      "name": { "cs": "Freemium", "en": "Freemium" },
      "unit": "user",
      "billing_period": "monthly",
      "pricing_model": "freemium",
      "price": 0,
      "currency": "EUR",
      "freemium_conversion_rate": 0.10,
      "freemium_target_segment": "b2c-individual",
      "active": true
    },
    {
      "id": "b2b-startup",
      "group": "B2B_ENT",
      "name": { "cs": "Startup", "en": "Startup" },
      "unit": "company",
      "billing_period": "monthly",
      "pricing_model": "flat",
      "price": 49,
      "currency": "EUR",
      "active": true
    },
    {
      "id": "b2b-business",
      "group": "B2B_ENT",
      "name": { "cs": "Business", "en": "Business" },
      "unit": "company",
      "billing_period": "monthly",
      "pricing_model": "flat",
      "price": 149,
      "currency": "EUR",
      "active": true
    },
    {
      "id": "b2b-enterprise",
      "group": "B2B_ENT",
      "name": { "cs": "Enterprise", "en": "Enterprise" },
      "unit": "company",
      "billing_period": "monthly",
      "pricing_model": "flat",
      "price": 499,
      "currency": "EUR",
      "active": true
    },
    {
      "id": "hopi-supply-chain",
      "group": "HOPI_INTERNAL",
      "name": { "cs": "Supply Chain", "en": "Supply Chain" },
      "unit": "user",
      "billing_period": "monthly",
      "pricing_model": "flat",
      "price": 3.00,
      "currency": "EUR",
      "transfer_pricing": true,
      "tp_method": "cost_plus",
      "tp_markup_pct": 5,
      "active": true
    }
  ],

  "scenarios": [
    {
      "id": "conservative",
      "name": "Conservative",
      "freemium_conversion_override": 0.08,
      "projections": [
        { "segment_id": "b2c-individual", "year": 2027, "units": 200 },
        { "segment_id": "b2c-individual", "year": 2028, "units": 800 },
        { "segment_id": "b2c-individual", "year": 2029, "units": 2000 },
        { "segment_id": "b2c-freemium",   "year": 2027, "units": 2500 }
      ]
    },
    {
      "id": "middle",
      "name": "Middle",
      "freemium_conversion_override": 0.10,
      "projections": [
        { "segment_id": "b2c-individual", "year": 2027, "units": 500 },
        { "segment_id": "b2c-individual", "year": 2028, "units": 2000 },
        { "segment_id": "b2c-individual", "year": 2029, "units": 5000 }
      ]
    },
    {
      "id": "ambitious",
      "name": "Ambitious",
      "freemium_conversion_override": 0.15,
      "projections": [
        { "segment_id": "b2c-individual", "year": 2027, "units": 1200 },
        { "segment_id": "b2c-individual", "year": 2028, "units": 5000 },
        { "segment_id": "b2c-individual", "year": 2029, "units": 15000 }
      ]
    },
    {
      "id": "dream",
      "name": "Dream ✨",
      "freemium_conversion_override": 0.22,
      "projections": []
    }
  ],

  "internal_billing": [
    { "entity_id": "hopi-supply-chain", "segment_id": "hopi-supply-chain", "users": 30 },
    { "entity_id": "hopi-foods",        "segment_id": "hopi-supply-chain", "users": 25 },
    { "entity_id": "hopi-agriculture",  "segment_id": "hopi-supply-chain", "users": 20 },
    { "entity_id": "hopi-services",     "segment_id": "hopi-supply-chain", "users": 15 },
    { "entity_id": "hopi-holding",      "segment_id": "hopi-supply-chain", "users": 10 }
  ]
}
```

### Klíčové výpočty — formule

**Měsíční revenue per segment:**
```
monthly_revenue = units × segment.price
```

**ARR per segment:**
```
arr = monthly_revenue × 12
```

**Freemium → placení uživatelé:**
```
paying_users = freemium_units × freemium_conversion_rate
converted_arr = paying_users × target_segment.price × 12
```

**Transfer pricing (HOPI Internal):**
```
reference_price = 9.99  (nejnižší arm's length tržní cena = b2c-individual)
full_costs = reference_price × (1 − gross_margin_pct / 100)
           = 9.99 × 0.28 = €2.80
transfer_price = full_costs × (1 + tp_markup_pct / 100)
               = 2.80 × 1.05 = €2.94 → €3.00
```

**Interní měsíční faktura per divize:**
```
monthly_invoice = users × transfer_price
               = např. Supply Chain: 30 × €3.00 = €90/měsíc
```

**Celkový ARR scénáře:**
```
total_arr = Σ(arr per segment) + converted_arr(freemium) + Σ(monthly_invoice × 12)(internal)
```

**Valuace dle exit cesty:**
```
acquisition_val = total_arr × 12    (12× ARR multiple)
pe_buyout_val   = total_arr × 6     (6× ARR multiple)
ipo_val         = total_arr × 25    (25× ARR multiple)
hopi_group_val  = total_arr × 10    (přidaná hodnota k HOPI Group €500M)
```

### Pole — technický slovník

| Pole | Typ | Popis |
|------|-----|-------|
| `segment.id` | string | Unikátní ID segmentu (slug) |
| `segment.group` | string | Skupina: B2C_HOME / B2B_ENT / HOPI_INTERNAL |
| `segment.unit` | string | Fakturační jednotka: user / company / family / seat |
| `segment.pricing_model` | string | flat / per_unit / tiered / usage_based / freemium |
| `segment.price` | number | Cena v EUR/měsíc |
| `segment.freemium_conversion_rate` | number | 0.0–1.0, jen pro freemium segmenty |
| `segment.transfer_pricing` | bool | true = HOPI internal, podléhá TP pravidlům |
| `scenario.freemium_conversion_override` | number | Přepíše globální rate pro daný scénář |
| `projection.units` | number | Počet platících unit v daném roce |
| `cost_assumptions.gross_margin_pct` | number | Hrubá marže v %, základ pro TP výpočet |
| `internal_billing.users` | number | Počet uživatelů dané divize |

### Rozšiřitelnost — jak přidat nový segment

```json
// Přidání nového B2B segmentu (bez změny kódu):
{
  "id": "b2b-government",
  "group": "B2B_PUBLIC",
  "name": { "cs": "Veřejný sektor", "en": "Government" },
  "unit": "department",
  "billing_period": "annual",
  "pricing_model": "flat",
  "price": 2999,
  "currency": "EUR",
  "active": true
}
```

### Feeds — co tato sekce napájí

| Sekce | Co čte | Pole |
|-------|--------|------|
| Motivation Chamber (01) | Valuace per scénář | total_arr × exit_multiple |
| Executive Overview (02) | Live ARR widget | current_year total_arr |
| Budget Track (05) | ROI výpočet | cumulative investment vs. arr |
| Financial Cockpit (06) | Revenue forecast | monthly_revenue per segment |

---

## AIQ-00323 až AIQ-00335 — Cockpit FULL BUILD + Anthropic Case (2026-04-22)

**Datum:** 2026-04-22 | **Status:** OPEN → IN PROGRESS | **Assignee:** Claude | **Cíl session:** Plně oživit Management Cockpit + dokončit Anthropic outreach balíček

### Strategický záměr — proč dnes

David Gogela rozhodl maximalizovat dnešní session: postavit všech 12 chybějících cockpit sekcí a finalizovat Anthropic Case. Management Cockpit musí být funkční jako celek — připravený na prezentaci funkčnosti (investor demo, Anthropic outreach, HOPI Group pilot).

### Skupiny tasků a přístup

**Vlna 1 — AIQ-00323 až AIQ-00329 (statická data + OIL.json fetch)**
Sekce 07 · 09 · 10 · 11 · 12 · 14 · 15 — bez externích integrací. Data buď z OIL.json/BOIL.json (fetch) nebo statické JSON soubory. Nejrychlejší na build, nejvyšší okamžitá hodnota pro demo.

**Vlna 2 — AIQ-00330, AIQ-00331 (+ GitHub API kontext)**
Sekce 04 KPI Strip a 01 Motivation Chamber — potřebují git commit count přes GitHub API (public endpoint, bez auth). Stavějí na AIQ-00319 základech.

**Vlna 3 — AIQ-00332, AIQ-00333, AIQ-00334 (+ JSON data soubory)**
Sekce 05 Budget Track, 06 Financial Cockpit, 13 Sources — každá dostane vlastní JSON seed soubor (budget-data.json, financial-data.json, sources-data.json). **Architektonické rozhodnutí (2026-04-22):** Phase 1 = manuální JSON zadaný Davidem, Phase 2 = SAP swap výhradně přes `_data.js`. Frontend se nemění.

**Anthropic — AIQ-00335**
Finalizace kompletního outreach balíčku: ANTHROPIC_2PAGER.html (schválení + screenshoty od Davida), cover email draft. Cíl: jeden odkaz + email = kompletní případ pro Anthropic Developer Relations.

### JSON soubory — schéma (závazné pro DB swap)

```json
// budget-data.json
{ "phases": [{ "id": "phase0", "title": "Phase 0", "investment": 0, "value": 0, "status": "active" }],
  "monthly": [{ "month": "2026-02", "ai_credits": 0, "hw": 0, "sw": 0, "hours": 0 }] }

// financial-data.json
{ "monthly_cost": [...], "cash_pipeline": { "target": 200000, "current": 0 }, "roi": { "invested": 0, "value": 0 } }

// sources-data.json
{ "categories": [{ "id": "human", "title": "Lidská práce", "phase1": "...", "phase2": "..." }] }

// decisions.json
{ "decisions": [{ "id": "DEC-001", "date": "2026-04-20", "title": "...", "who": "David Gogela", "impact": "HIGH", "linkedTask": "AIQ-NNNNN" }] }

// milestones.json
{ "milestones": [{ "id": "m1", "title": "Phase 0 Start", "date": "2026-02-01", "status": "done", "linkedPhase": 0 }] }
```

### Všechny sekce — Shell pattern (závazný pro každou stránku)

```html
<!-- Každá cockpit sub-stránka musí mít: -->
<script src="../_shell.js"></script>   <!-- topbar Zpět na Cockpit, auth check -->
<script src="../_hopiq.js"></script>   <!-- HOPIQ widget (po AIQ-00320) -->
<!-- Init: Shell.init({ sectionId: 'XX', sectionTitle: '...' }) -->
```

### Dnešní pořadí buildu (optimalizováno pro rychlost)

```
1. cockpit/oil-board.html      (AIQ-00324) ← nejvyšší demo hodnota
2. cockpit/boil-board.html     (AIQ-00325)
3. cockpit/capacity.html       (AIQ-00326)
4. cockpit/timeline.html       (AIQ-00323) ← milestones.json
5. cockpit/decisions.html      (AIQ-00329) ← decisions.json
6. cockpit/team.html           (AIQ-00327)
7. cockpit/methodology.html    (AIQ-00328)
8. cockpit/kpi.html            (AIQ-00330)
9. cockpit/motivation.html     (AIQ-00331)
10. cockpit/budget-track.html  (AIQ-00332) ← budget-data.json
11. cockpit/financial.html     (AIQ-00333) ← financial-data.json
12. cockpit/sources.html       (AIQ-00334) ← sources-data.json
13. Anthropic Case             (AIQ-00335)
```

---

## AIQ-00319 až AIQ-00322 — Cockpit Assistant: GitHub API + Widget + Standalone + Action Catalog (2026-04-22)

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** Claude | **Linked:** AIQ-00318

### Proč tato skupina úkolů vznikla — kontext pro organizaci

David Gogela rozhodl nasadit HOPIQ agenta na Management Cockpit a přidat plnou read/write integraci přes GitHub API. Toto je **architektonické rozhodnutí s dopadem na celou platformu** — nejen widget na stránce, ale první implementace živého datového mostu mezi AI agentem a zdrojovými soubory projektu.

**Klíčová architektonická rozhodnutí (závazná):**

1. **GitHub Pages = statický hosting, zápis NENÍ možný nativně** — jedinou cestou bez backendu je GitHub REST API. Toto je vědomé rozhodnutí: přijatelné pro interní nástroj za heslovým zámkem, v Phase 2 (v9.x) nahradí REST API backend.

2. **GitHub Personal Access Token v localStorage** — po odemčení cockpitu (heslo HOPI2026) uloží agent PAT token do localStorage. Security model: token je za dvěma vrstvami (GitHub autentikace + cockpit heslo). Pro interní nástroj přijatelné, pro veřejný SaaS NE.

3. **Action-dispatch pattern** — agent nevrací volný text, vrací strukturovaný JSON `{action: "createTask", params: {...}}`. Frontend JS dispatch tuto akci provede. Toto odděluje AI rozhodování od provedení = čistá architektura, testovatelné, rozšiřitelné.

4. **Per-section system prompt** — každá cockpit sekce má vlastní AI kontext (Finance sekce ≠ Launch Plan ≠ Task Control). Kontext předává `_shell.js` při inicializaci agenta.

5. **Widget + Standalone kombinace** — Widget = rychlé dotazy přímo na sekci. Standalone (`cockpit/assistant.html`) = hlubší práce (denní briefing, review tasků, vytváření tasků). Obě implementace sdílí stejnou _hopiq.js instanci s různým módem.

### Implementační pořadí (závazné)

```
AIQ-00319  GitHub API Data Layer     ← PRVNÍ — prerekvizita pro vše
    ↓
AIQ-00320  Widget na sub-stránky     ← read-only lze bez 319
    ↓
AIQ-00322  Action Catalog            ← logika co agent dělá
    ↓
AIQ-00321  Standalone stránka        ← UI pro plnou práci
```

### GitHub API — technický detail pro IT

```javascript
// Čtení souboru
GET https://api.github.com/repos/h-gr-fico/appiq/contents/OIL.json
Headers: { Authorization: 'token <PAT>' }
→ response.content = base64 → atob() → JSON.parse()

// Zápis souboru (update)
PUT https://api.github.com/repos/h-gr-fico/appiq/contents/OIL.json
Body: {
  message: "Cockpit Agent: createTask AIQ-00XXX",
  content: btoa(JSON.stringify(updatedOIL)),  // base64
  sha: <SHA z předchozího GET>  // povinné pro update
}
```

SHA conflict: pokud někdo jiný zapsal soubor mezi GET a PUT → 409 error → re-fetch SHA → retry.

### 8 akcí agenta — katalog

| Akce | Co dělá | Read/Write |
|------|---------|-----------|
| `listOpenTasks` | Filtr OIL/BOIL dle assignee/domain/status | Read |
| `createTask` | Nový AIQ záznam, auto-ID, zápis do OIL.json | Write |
| `updateTaskStatus` | Změní status+timestamps | Write |
| `getDailyBriefing` | OPEN HIGH + REVIEW queue + capacity split | Read |
| `navigateToSection` | Přesměruje na cockpit sekci | UI |
| `explainMetric` | Vysvětlí KPI v kontextu sekce | Read |
| `summarizeSection` | Shrne stav sekce (počty, trendy) | Read |
| `getReviewQueue` | Tasky čekající na Davidovo schválení | Read |

### Kde to vede — Phase 2+

Tato implementace (GitHub API) je **záměrně dočasná**. V Phase 2 (v9.x) přijde REST API backend — swap bude POUZE v `_data.js`. Frontend, agentní logika, action catalog = beze změny. Toto je Backend Readiness princip platformy v praxi.

---

## AIQ-00317 — COCKPIT: Vizuální fix — název, kontrast, sans-serif, _shell.js (2026-04-22)

**Datum:** 2026-04-22 | **Status:** CLOSED | **Assignee:** Claude | **Linked:** AIQ-00314 | **actualTime:** 30 min

### Co bylo opraveno

**MANAGEMENT_COCKPIT.html:**
- Název "MNG COCKPIT" → "MANAGEMENT COCKPIT" na 3 místech: auth overlay h2, topnav-logo div, hero h1
- `--muted: #6b7280` → `--muted: #94a3b8` v `:root` (světlejší, čitelnější)
- Hardcoded `color:#6b7280; font-family:monospace` na auth overlay subtitlu → `color:#94a3b8; font-family:'Segoe UI',...`
- Přidána CSS proměnná `--sans: 'Segoe UI', system-ui, sans-serif`
- 13 CSS pravidel přepnuto z `var(--mono)` na `var(--sans)`: hero-label, hero-sub, hero-kpi-lbl, phase-step, sections-header h2, sec-num, sec-kpi-lbl, sec-open-btn, sec-tag, b2c-countdown-label, b2c-launch-sublabel, .b2c-ms, footer, b2c-plan-link

**cockpit/overview.html, launch-plan.html, task-control.html:**
- Readability block rozšířen: `--c-font-mono: 'Segoe UI', system-ui, sans-serif` → přepíše všechny mono labely na sans-serif

**Integrační oprava (_shell.js):**
- Všem 3 novým sub-stránkám chyběl `<script src="_shell.js"></script>`
- Shell.init() byl voláno s guard `if (typeof Shell !== 'undefined')` → tiše selhávalo
- Opraveno: přidán tag před hlavní `<script>` blok v každé stránce
- Po opravě: topbar "← Zpět na Cockpit", section title, music/lang tlačítka fungují

### Klíčové poznámky
- CSS variable mismatch: MANAGEMENT_COCKPIT.html používá `--muted` (bez `c-`), cockpit sub-stránky `--c-muted` — proto readability fix v sub-stránkách neovlivnil hlavní stránku; každá stránka opravena samostatně
- Tato oprava je součástí session pokračování po context window compression

---

## AIQ-00316 — COCKPIT sekce 07: Task Control Center (2026-04-22)

**Datum:** 2026-04-22 | **Status:** IN PROGRESS | **Assignee:** Claude | **Linked:** BIZ-00123

### Co se implementuje

Nová cockpit sekce `cockpit/task-control.html` na pozici 07. Unified OIL+BOIL dashboard se 3 záložkami.

### Architektura

```
cockpit/task-control.html
  ├── Data loading: fetch('../../../OIL.json') + fetch('../../../BOIL.json')
  ├── Tab 1: Priority Board
  │     ├── Kanban grid: S1 | S2 | S3 | S4
  │     ├── Karta: ID badge + název + assignee icon + status badge
  │     └── Filtr: ALL | AIQ | BIZ | REVIEW
  ├── Tab 2: Linked View
  │     ├── BIZ task jako accordion row (expandable)
  │     ├── Pod ním: AIQ tasky kde linkedTask === BIZ-ID
  │     └── Context snippet: note pole (první 200 znaků)
  └── Tab 3: Capacity Split
        ├── Claude vs. David: count + estimatedTime suma
        ├── REVIEW list: tasky se status === 'REVIEW'
        └── Domain breakdown: group by domain field
```

### Data model — co se čte

Z `OIL.json`: pole `tasks[]` — filtr na status !== 'CLOSED' pro aktivní view
Z `BOIL.json`: pole `tasks[]` — filtr na status !== 'CLOSED'
Severity: field `severity` (S1-KRITICKÝ / S2-ZÁVAŽNÝ / S3-STŘEDNÍ / S4-NÍZKÝ)
Linked: field `linkedTask` — string s ID (BIZ-NNNNN nebo AIQ-NNNNN)

### Klíčové implementační poznámky

- Soubor používá Shell pattern stejný jako ostatní cockpit sekce (auth přes parent)
- Relativní cesta k JSON: `../../OIL.json` z `cockpit/` složky
- Filtr REVIEW = status === 'REVIEW' (čeká na Davidovo schválení)
- Tab 2 Linked View: iteruje BOIL tasks, pro každý hledá v OIL tasks kde task.linkedTask === biz.id

---

## AIQ-00315 — COCKPIT sekce 02: Executive Overview Dashboard (2026-04-22)

**Datum:** 2026-04-22 | **Status:** IN PROGRESS | **Assignee:** Claude | **Linked:** BIZ-00123

### Co se implementuje

Nová cockpit sekce `cockpit/overview.html` na pozici 02. Ranní briefing — 5 widgetových bloků.

### Layout

```
cockpit/overview.html
  ├── Blok 1: Business Health   [Investice | Pipeline | Měsíční cost | Valuace cíl]
  ├── Blok 2: Project Pulse     [Open AIQ | Open BIZ | Closed/týden | REVIEW čeká]
  ├── Blok 3: Execution         [Claude % | David % | Milestones hotovo | Dnů do B2C]
  ├── Blok 4: Strategic         [Open rozhodnutí | Partneři status | Fáze nyní]
  └── Blok 5: Launch Countdown  [Dnů do 01.01.2027 | Founding Members target]
```

### Data loading

- Project Pulse (bloky 2, 3): počítá dynamicky z OIL.json + BOIL.json (fetch)
- Launch Countdown: JS Date diff od 2027-01-01
- Business Health, Strategic: placeholder hodnoty s `--` dokud nejsou propojeny live sekce
- Každý widget má `→ sekce XX` link na plnou cockpit sekci

### Poznámky

- Hodnoty z finančních sekcí (03, 04) zatím placeholder — sekce nejsou data-connected
- Project Pulse počítá LIVE z JSON souborů (stejná logika jako OIL Board sekce 06+07)
- Widget design: číslo (velké) + label + trend indicator (→, ↑, ↓) + odkaz

---

## AIQ-00314 — COCKPIT: Přečíslování SECTIONS + insert 2 nových sekcí (2026-04-22)

**Datum:** 2026-04-22 | **Status:** IN PROGRESS | **Assignee:** Claude | **Linked:** AIQ-00315

### Co se implementuje

Aktualizace `SECTIONS` pole v `MANAGEMENT_COCKPIT.html`:
- Insert `overview.html` jako sekce num:'02' (posun starých 02-06 → 03-07)
- Insert `task-control.html` jako sekce num:'07' (posun starých 07-14 → 08-16)
- Výsledek: 16 sekcí (bylo 14)

### Mapování před → po

| Původní # | Název | Nové # |
|-----------|-------|--------|
| 01 | Motivation Chamber | 01 (beze změny) |
| — | **Executive Overview Dashboard** | **02 (NOVÁ)** |
| 02 | Executive KPI Strip | 03 |
| 03 | Budget Track | 04 |
| 04 | Financial Cockpit | 05 |
| 05 | Milestone Timeline | 06 |
| — | **Task Control Center** | **07 (NOVÁ)** |
| 06 | OIL Task Board | 08 |
| 07 | BOIL Task Board | 09 |
| 08 | Capacity & Responsibility | 10 |
| 09 | Project Team | 11 |
| 10 | Sources | 12 |
| 11 | Methodology | 13 |
| 12 | Decision Log | 14 |
| 13 | Documentation & Links | 15 |
| 14 | B2C Launch Plan · Countdown | 16 |

---

## AIQ-00313 — Compliance corrections: 9 editů ve 4 souborech (2026-04-22)

**Datum:** 2026-04-22 | **Status:** CLOSED | **Assignee:** Claude | **Linked:** BIZ-00121 + BIZ-00122

### Co bylo uděláno

Komplexní audit a oprava všech nepřesných tvrzení na platformě — 2 skupiny:
- **Skupina A:** Anthropic ToS compliance — 4 edity
- **Skupina B:** PoC vs. Production accuracy — 5 editů

Business kontext a zdůvodnění: viz **BIZ-00122** v BKONTEXT.md.

---

### Skupina A — Anthropic ToS (4 edity)

**A1 — PERSONAL_PITCH.html, CZ verze (~ř.693)**
```
PŘED: "Oslovit a formalizovat ARTIN · INTECS · Anthropic — aktivní piloty jsou již v chodu."
PO:   "Oslovit a formalizovat ARTIN · INTECS — aktivní piloty jsou v chodu. Anthropic — zahájit strategic partnership outreach (deck připraven)."
```

**A2 — PERSONAL_PITCH.html, EN verze (~ř.694)**
```
PŘED: "Reach out and formalize ARTIN · INTECS · Anthropic — active pilots already underway."
PO:   "Reach out and formalize ARTIN · INTECS — active pilots underway. Anthropic — initiate strategic partnership outreach (deck ready)."
```

**A3 — INVESTOR_BRIEF.html, og:description meta tag (ř.8)**
```
PŘED: "... Anthropic partnership."
PO:   "... Powered by Claude API."
```
KRITICKÉ: og:description = LinkedIn/Slack preview text — viditelný bez kliknutí na dokument.

**A4 — INVESTOR_BRIEF.html, Anthropic area sekce (~ř.530-532)**
```
PŘED: area-title  "Anthropic — HOPI AI Lab"
      badge CZ    "Aktivní"
      badge EN    "Active"
      area-desc   "Formální AI Lab ve spolupráci s Anthropic"
PO:   area-title  "Anthropic — Strategický AI Partner (outreach)"
      badge CZ    "V přípravě"
      badge EN    "In Progress"
      area-desc   "Cíl: referenční zákazník Claude API pro CEE"
```

---

### Skupina B — PoC Accuracy (5 editů)

**B1 — PERSONAL_PITCH.html, Finance Phase row (~ř.472-473)**
```
PŘED CZ: "Finance Phase 0 — v provozu, reální uživatelé, reálná data skupiny"
PŘED EN: "Finance Phase 0 — live, real users, real group data"
PO CZ:   "Finance Phase 0 — funkční PoC, nasazen live, interní pilot: David Gogela"
PO EN:   "Finance Phase 0 — functional PoC, deployed live, internal pilot: David Gogela"
```

**B2 — INVESTOR_BRIEF.html, users sekce (~ř.636-637)**
```
PŘED CZ: "Reální uživatelé: David, CEO, CFO HOPI Group"
PŘED EN: "Real users: David, CEO, CFO HOPI Group"
PO CZ:   "Interní pilot: David Gogela (builder, první uživatel). CEO a CFO platformu zhodnotili."
PO EN:   "Internal pilot: David Gogela (builder, first user). CEO and CFO evaluated the platform."
```

**B3 — CEO_BRIEF.html, HOPI AI Lab claim (~ř.1000-1005)**
```
PŘED CZ: "HOPI AI Lab = CEE implementační laboratoř Anthropicu"
PŘED EN: "HOPI AI Lab = CEE implementation lab for Anthropic"
PO CZ:   "Cíl: stát se referenčním zákazníkem Claude API pro CEE. HOPI AppIQ = živý důkaz enterprise + HOME B2C nasazení."
PO EN:   "Goal: become reference customer for Claude API in CEE. HOPI AppIQ = live proof of enterprise + HOME B2C deployment."
```

**B4 — CEO_BRIEF.html, nasazení claim + badge (~ř.533 + 568-572)**
```
PŘED CZ: "Živé nasazení v HOPI Group dnes"
PŘED EN: "Live deployment in HOPI Group today"
PŘED badge: "PRODUKCE"
PŘED text: "Reálný uživatel. Reálná data. Reálné procesy."
PO CZ:   "Funkční PoC, nasazen live — HOPI Group = první deployment target."
PO EN:   "Functional PoC, deployed live — HOPI Group = first deployment target."
PO badge: "PoC · PILOT"
PO text: "Reálný builder. Reálná platforma. Reálné use cases."
```

**B5 — ANTHROPIC_2PAGER.html, dva product claim texty (~ř.459 + 730)**
```
PŘED ř.459: "live in production, running inside a real €0.5B Central European holding company.
            Not a demo. Not a prototype. A product."
PO ř.459:  "fully functional and deployed, built for a real €0.5B Central European holding company.
            Not a static deck. Not a mockup. A working platform."

PŘED ř.730: "live in production inside a real company"
PO ř.730:  "a working platform deployed and accessible today, built inside a real company
            for real enterprise use cases"
```

---

### Technické poznámky

- Všechny edity provedeny přes Edit tool (old_string → new_string) — přesná shoda textu ověřena Readem před každým editem
- CZ+EN konzistence: každá oprava aktualizovala obě jazykové varianty (`span.lang-cz` + `span.lang-en`) ve stejném nebo navazujícím editu
- PORTAL_PRESENTATION.html: 2 lokace (~ř.1799, 2752-2753) obsahují stará tvrzení — flagováno S3-STŘEDNÍ, deferred do příští session

---

## AIQ-00311 — Multi-Agent Architecture: provider-agnostic abstraction layer (2026-04-22)

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** Claude | **Linked:** BIZ-00120

### Kontext

Strategický požadavek BIZ-00120: AppIQ nesmí být závislé na jediném AI poskytovateli. Technické řešení = abstrakční vrstva `_agent.js` nad Claude / Azure OpenAI / Gemini / ChatGPT. Výběr modelu = config, ne kód.

### Navrhovaná architektura

```
_config.js
  AppIQ.config.ai.provider = 'anthropic' | 'azure' | 'gemini' | 'openai'
  AppIQ.config.ai.model = 'claude-sonnet-4-6' | 'gpt-4o' | 'gemini-1.5-pro'

_agent.js  ← nový modul (partner _hopiq.js)
  AgentService.complete(prompt, options) → unified interface
  AgentService.providers = { anthropic, azure, google, openai }

_hopiq.js (chatbot widget)
  PŘED: fetch('https://api.anthropic.com/...') ← direktní, locked-in
  PO:   AgentService.complete(prompt, {context}) ← abstrakce, provider-agnostic
```

Provider swap = změna `AppIQ.config.ai.provider` v `_config.js`. Nula změn v `_hopiq.js`, HTML, nebo jiných modulech.

### Model selection logika

| Task type | Doporučený model | Důvod |
|-----------|-----------------|-------|
| Complex reasoning (arch, strategy) | Claude Opus 4.7 | Nejlepší na složité analýzy |
| Standard chat, HOPIQ | Claude Sonnet 4.6 | Poměr cena/výkon |
| Quick, repetitivní responses | Claude Haiku 4.5 | Rychlost, minimum cost |
| Enterprise MS-ecosystem klient | Azure OpenAI GPT-4o | MS compliance, GDPR EU |
| Multimodal (scan faktury, obrázky) | Gemini 1.5 Pro | Silnější multimodal |

### Doporučení pro v8.x (aktuální verze)

1. **Postavit `_agent.js` abstrakci TEĎ** — i když budeme používat jen Claude
2. **NE user-facing provider choice** v v8.x (příliš brzy, quality variance matice)
3. **Claude = default** pro vše; Azure OpenAI = enterprise opt-in (MS klienti)
4. **Nikdy API klíče v frontend kódu** → vždy přes backend proxy (Cloudflare Worker)
5. **Benchmark před každým novým providerem** — quality, latency, cost per 1M tokens

### Security poznámka

API klíče musí zůstat na backend (Cloudflare Worker / server). Frontend nikdy nedostane raw API klíč. `_agent.js` komunikuje s vlastním backendem, ne přímo s providerem.

### Status

OPEN / research fáze. Před implementací: BIZ-00120 musí potvrdit provider prioritu. Pak AIQ-00311 přejde do IN PROGRESS a Claude navrhne konkrétní implementaci.

---

## AIQ-00305 — ANTHROPIC_ONEPAGER: platform screenshots sekce (2026-04-22)

**Datum:** 2026-04-22 | **Status:** CLOSED | **Assignee:** Claude | **Linked:** AIQ-00302

### Co bylo uděláno
- Přidána sekce "The platform — live & deployed" do ANTHROPIC_ONEPAGER.html
- 3 `.sc-frame` karty s browser chrome (traffic lights, URL bar): Finance Portal (LIVE) · Management Cockpit (NEW) · Investor Brief (LIVE)
- Každý frame: ikona, label, status badge (LIVE/NEW), přímý `open →` odkaz
- Reálné screenshoty nebyly k dispozici — záměrný vizuální placeholder (vypadá jako browser window)
- Hotfix s reálnými obrazovkami: `sc-body { background-image: url(...) }` kdykoliv

---

## AIQ-00310 — COCKPIT: Documentation sekce — živý seznam linků (2026-04-22)

**Datum:** 2026-04-22 | **Status:** CLOSED | **Assignee:** Claude | **Linked:** AIQ-00309

### Co bylo uděláno
- Vytvořen `cockpit/documentation.html` — centrální správce URL celé platformy
- Klíčová hodnota: konstanta `BASE_VER = 'v7.24'` — všechny URL generovány automaticky z ní; při deployi nové verze = 1 změna → všechny linky správné
- 4 kategorie linků: Marketing & Investor (7 stránek), AppIQ Studio (7 stránek), Finance Portal APP (1), Management Cockpit v8.0 (15 sub-stránek)
- Status badges: LIVE (GitHub Pages) / DEV (lokálně, čeká na deploy) / PLÁNOVÁNO
- Copy-to-clipboard per link + filter (ALL/LIVE/DEV/PLANNED/🔒) + full-text search
- CZ/EN přes Shell.getLang()
- Karta sekce 15 přidána do MANAGEMENT_COCKPIT.html SECTIONS pole

### Klíčové rozhodnutí
- BASE_VER jako single source of truth pro URL management — David nemusí pamatovat verze
- Stránka sama sebe zobrazuje jako DEV (není ještě na GitHub Pages)
- Cockpit sub-stránky zobrazeny jako PLANNED s budoucí GitHub URL pro v7.25

---

## AIQ-00309 — MANAGEMENT_COCKPIT build (2026-04-22, CLOSED)

**Datum:** 2026-04-22 | **Status:** CLOSED | **Assignee:** Claude | **Linked:** BIZ-00116
**actualTime:** 420 min | **completedAt:** 2026-04-22 18:30 | **durationDays:** 0

### Implementace — všechny soubory

**Infrastruktura:**
- `cockpit-og.svg` — airplane cockpit SVG image (1200×630px)
- `cockpit/_shell.js` — sdílený shell modul (auth, lang, music, topbar+ribbon inject)
- `cockpit/_cockpit.css` — kompletní design system (~280 řádků, CSS vars)
- `cockpit/_template.html` — šablona pro nové sekce
- `MANAGEMENT_COCKPIT.html` — hub s auth overlay (HOPI2026), 14 karet, live OIL+BOIL data, B2C countdown banner

**14 sekcí (cockpit/ složka):**
1. `motivation.html` — Motivation Chamber: hero quote, 6 big-num karet, Phase→Exit mapa, TAM/SAM/SOM, 6 motto karet
2. `kpi.html` — Executive KPI Strip: 8 live KPI karet, Chart.js donut + bar (effort distribuce), Claude/David split bar
3. `budget-track.html` — Budget Track: ROI hero (200–500×), 6 milestone karet, dual-axis chart (cost vs value), cash injection pipeline tabulka
4. `financial.html` — Financial Cockpit: Phase 1/2/3 tab switcher, cost breakdown per phase, runway bar, burn rate + revenue vs náklady chart
5. `timeline.html` — B2C Launch Timeline: countdown hero (dnů do 01.01.2027), 7 milestones (done/now/next/future), phase sub-grid, budget karty
6. `oil-board.html` — OIL Task Board: live fetch(../OIL.json), Chart.js donut, expand/collapse detail, sort + filter + search
7. `boil-board.html` — BOIL Task Board: live fetch(../BOIL.json), stream filter pills, amber accent, expand detail
8. `capacity.html` — Capacity & Responsibility: Claude/David split (live z OIL), bottleneck REVIEW tasks, RACI tabulka, stacked bar chart
9. `team.html` — Project Team: person cards, stakeholders grid, target partneři (Anthropic/AWS/MS), 3-phase hiring plan s CZK saláry
10. `sources.html` — Sources & Resources: budget přehled tabulka, human work bars, AI zdroje karty, SW&Tech, HW, marketing kanály
11. `methodology.html` — Methodology: model selection guide (Opus/Sonnet/Haiku), budget decision matrix, OIL-first workflow (5 kroků), architekturní principy, deployment pravidla, TOTAL AGILE
12. `decisions.html` — Decision Log: 12 ADR seeded inline, filtrovatelné po kategorii + search, expandovatelné detail (kontext/rozhodnutí/důsledky/linked task)
13. `documentation.html` — Documentation & Links: BASE_VER konstanta, 4 kategorie URL, copy-to-clipboard, filter + search (AIQ-00310)
14. `timeline.html` (section 14 karta) — B2C Launch Plan shortcut: oddělená karta s B2C countdown KPI

### Klíčová rozhodnutí
- Option B architektura: hub + subpages — udržovatelné, paralelní vývoj sekcí
- BASE_VER = single source of truth pro všechna URL v documentation.html
- Decision Log seeded inline (bez DECISIONS.json) — 12 ADR pokrývá klíčová rozhodnutí projektu
- Duplicitní sekce 13 (stará "Motivation" ghost entry) odstraněna → 14 čistých sekcí

---

## AIQ-00308 — Claude model selection guide: Opus / Sonnet / Haiku (2026-04-22)

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** Claude | **Linked:** BIZ-00116 (Management Cockpit — Methodology sekce)

### Kontext
David požaduje jasná pravidla, kdy použít který Claude model — pro úsporu budgetu a maximální efektivitu. Výstup bude součástí Methodology sekce Management Cockpitu. Poznámka: David říká "Octopus 4.7" — správně je to **Opus 4.7** (claude-opus-4-7).

### Přehled modelů (2026-04-22)

| Model | ID | Pozice | Cena (přibližně) |
|-------|-----|--------|-----------------|
| **Claude Opus 4.7** | `claude-opus-4-7` | Nejsilnější | ~$15/M input, $75/M output |
| **Claude Sonnet 4.6** | `claude-sonnet-4-6` | Vyvážený ← **aktuálně používáme** | ~$3/M input, $15/M output |
| **Claude Haiku 4.5** | `claude-haiku-4-5-20251001` | Rychlý, levný | ~$0.25/M input, $1.25/M output |

### Kdy použít který model

#### Opus 4.7 — "Velký mozek" (použít výjimečně)
Nasadit jen tehdy, kdy výsledek přímo ovlivňuje klíčové rozhodnutí nebo veřejný výstup:
- Tvorba investor dokumentů (Business Case, Vision, Cockpit)
- Komplexní architektonická rozhodnutí (nová platforma, nový modul)
- Strategický brainstorming (nová oblast, nový trh)
- Ladění složitých bugů po 2+ neúspěšných pokusech se Sonnetem
- Příprava textů pro Anthropic / investory (první draft)
- Multi-step reasoning: finanční model, P&L, ROI výpočty

**Pravidlo:** Opus = když kvalita výstupu přímo stojí peníze nebo reputaci.

#### Sonnet 4.6 — "Denní kůň" (default pro veškerou práci)
Pro 90 % všech sessionů v Claude Code:
- HTML / CSS / JS vývoj (nové sekce, stránky, komponenty)
- OIL.json + BOIL.json management
- BKONTEXT / OIL_CONTEXT zápisy
- Debugging a opravy
- Refaktoring kódu
- Contennt tvorba (texty, překlady)
- Session startup a briefing

**Pravidlo:** Sonnet = default. Přecházej na Opus jen pro výjimečné úkoly.

#### Haiku 4.5 — "Rychlý asistent" (pro runtime a opakované úkoly)
- HOPIQ chatbot odpovědi (runtime v produktu — každý token stojí peníze při škálování)
- Jednoduchá klasifikace a extrakce dat
- Rychlé překlady krátkých textů
- Automatizované tagy a kategorizace dokumentů
- Jednoduché validace vstupu

**Pravidlo:** Haiku = production runtime kde jde o náklady na uživatele. Pro Claude Code sessions nedoporučeno — úspora je malá, ztráta kvality velká.

### Fast Mode (Claude Code funkce)
- Fast mode = Opus 4.6 s rychlejším výstupem (není downgrade na slabší model)
- Zapnout příkazem `/fast` v Claude Code
- Kdy použít: rychlé iterace v Opus-grade quality (editace textu, krátké tasky)
- Kdy nepoužívat: dlouhé, složité tasky (fast mode může zkrátit reasoning)

### Praktická doporučení pro Davida

| Situace | Model | Poznámka |
|---------|-------|---------|
| Běžná vývojová session | Sonnet 4.6 | Default |
| Píšeme investor dokument | Opus 4.7 | Zahájit session s Opus |
| Strategické rozhodnutí | Opus 4.7 | Stojí za to |
| HOPIQ chatbot v produktu | Haiku 4.5 | Runtime náklady |
| Debugging (2+ pokusů) | Opus 4.7 | Upgrade Sonnet → Opus |
| Krátký fix / hotfix | Sonnet 4.6 | Opus zbytečný |
| Brainstorming (velký) | Opus 4.7 | Kvalita reasoning |
| OIL/BOIL zápisy | Sonnet 4.6 | Nepotřebujeme Opus |

### Cenový dopad (odhad)
Typická session (30 min, střední složitost):
- Sonnet: ~$0.10–0.30
- Opus: ~$0.50–1.50
- Haiku: ~$0.01–0.05

Při 20 sessions/měsíc: Sonnet ~$4–6/měsíc vs Opus ~$20–30/měsíc.
**Závěr:** Výchozí Sonnet + Opus jen pro klíčové sessiony = 60–70 % úspora při stejné kvalitě pro 90 % práce.

### Další doporučení pro snížení nákladů
1. **Prompt caching** — dlouhé system prompty (CLAUDE.md) se cachují → druhé načtení je 90% levnější
2. **Context komprese** — Claude Code automaticky komprimuje, ale čím kratší session, tím levnější
3. **Batch API** — pro hromadné zpracování dat mimo session (netýká se Claude Code přímo)
4. **1 session = 1 téma** — nevracet se ke starým tématům v téže session

---

## AIQ-00307 — ANTHROPIC_ONEPAGER_v2.html: alternativní design odmítnut (2026-04-22)

**Datum:** 2026-04-22 | **Status:** CLOSED | **Assignee:** Claude

**Implementation notes:** Na Davidovu žádost vytvořen alternativní design `ANTHROPIC_ONEPAGER_v2.html` — dramaticky odlišný od v1. Vivid orange gradient hero band (`#CC4A00 → #E8750A → #F59E0B → #CC785C`), bílý text na barevném pozadí, 4-column stats bar (8 weeks / ~$1k / v7.25 / 2027), barevné VS sloupce, kompaktnější layout bez scrollu. **Rozhodnutí:** David vybral v1 (branding prezentace). Důvod: v1 obsahuje správný branding. V2 soubor zachován v `Development/` jako design reference pro budoucí iterace.

---

## AIQ-00306 — v7.25 Deploy na GitHub Pages (OPEN — zítra)

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** Claude

**Kontext:** Deploy v7.25 odložen na 2026-04-23 ráno. Důvod: David dodá reálné screenshoty z platformy, které budou přidány do ANTHROPIC_ONEPAGER.html (AIQ-00305) před deployem — čistší jedna verze v7.25 namísto dvou za sebou. Bloker: (1) AIQ-00305 screenshoty, (2) CHANGELOG Layer 1 schválení Davidem. Files k deploy: INVESTOR_BRIEF.html, ANTHROPIC_ONEPAGER.html, CEO_BRIEF.html, INVESTOR_ENTRY.html, _i18n.js (root), _ver.js (bump na v7.25).

---

## AIQ-00305 — ANTHROPIC_ONEPAGER.html: platform screenshots sekce (OPEN — zítra)

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** Claude

**Kontext:** David přinese reálné screenshoty z platformy zítra ráno (2026-04-23). Přidat pod stávající kartu `screenshots-strip` blok — 3–4 thumbnaily klíčových obrazovek (Finance portal dashboard, HOPIQ chatbot, Investor Brief přehled). Implementace: `<img>` tagy nebo base64 embedded. Blocker pro AIQ-00306 deploy v7.25.

---

## AIQ-00304 — _i18n.js: ?lang=en URL parametr (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** Claude

**Implementation notes:** `_i18n.js` init() rozšířen o čtení `URLSearchParams('lang')`. Priorita: URL parametr > localStorage > default 'cs'. Pokud URL obsahuje `?lang=en` (nebo jiný platný kód), jazyk se nastaví a uloží do localStorage — platí pro celou session. Standardní průchod platformou beze změny. Klíčový use-case: sdílený odkaz `INVESTOR_BRIEF.html?lang=en` pro Anthropic kontakty → vždy otevře anglicky bez ohledu na předchozí stav prohlížeče. Nasazeno v7.25.

---

## AIQ-00303 — HOPIQ chatbot: přidán na všechny platform stránky (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** Claude

**Implementation notes:** Ověřeno grep — PERSONAL_PITCH.html a PORTAL_PRESENTATION.html měly chatbot již dříve. Přidán `<script src=”../../_hopiq.js”></script>` do: CEO_BRIEF.html, INVESTOR_ENTRY.html, INVESTOR_BRIEF.html. Do ANTHROPIC_ONEPAGER.html přidán při vytvoření souboru. Všechny stránky platformy teď mají živý HOPIQ chatbot — investor/CEO uvidí funkční AI demo při prvním otevření. Nasazeno v7.25.

---

## AIQ-00302 — ANTHROPIC_ONEPAGER.html: standalone propagační one-pager (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** Claude

**Implementation notes:** Nový soubor `HOPI_AppIQ_WebPage/Development/ANTHROPIC_ONEPAGER.html`. Standalone tmavý one-pager pro přímý Anthropic outreach (příloha k LinkedIn DM). EN only. Struktura: (1) P6 logo lockup — “HOPI TechIQ presents AppIQ · AI by Claude · Anthropic”. (2) Hook headline: “1 person. 1 AI. 8 weeks. Live.” (3) Produkt popis + use case chips (Finance, HR, Operations, HOME B2C). (4) Kompaktní David vs Goliáš tabulka — Anthropic vs AppIQ klíčová fakta. (5) Traction grid — v7.25, 109 commits, 8 zemí, B2C 2027. (6) P3 partnership lockup pod punchline “You build the engine. We build the car. And we're driving.” (7) Footer s URL `INVESTOR_BRIEF.html?lang=en` + heslem `HOPI2026`. HOPIQ chatbot přidán. Strategický záměr: BIZ-00104 / BIZ-00105.

---

## AIQ-00301 — Anthropic Journey: David vs Goliáš + 3-fázová narace (INVESTOR_BRIEF.html)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** Claude

**Implementation notes:** Přidány 2 nové sekce do INVESTOR_BRIEF.html. (1) `s-david-goliash` — faktické srovnání Anthropic ($61,5 mld valuace, $7,3 mld kapitál, 1 500+ zaměstnanců, 4 roky, globální) × HOPI Group (€0,5 mld, 30+ let, 5 divisí, 8 zemí CEE, #1 FBN CZ/SK) × AppIQ (8 týdnů, ~$1k API, 1+AI, v7.24 live). Mobile-responsive pomocí CSS tříd `dg-grid`/`dg-divider`/`dg-line` + media query ≤600px stacking. Punchline: “Oni dělají motor. My stavíme auto. A jedeme.” (2) `s-journey` — 4-fázová Anthropic Journey: Fáze 0 (zítra, 55 min: Startup Program přihláška + LinkedIn build in public + přímý kontakt, výstup $25k–$100k kreditů + vstup do Anthropic CRM), Fáze 1 (2026: API zákazník, living proof), Fáze 2 (2026–2027: B2C launch, CEE referenční zákazník), Fáze 3 (2027+: joint GTM, co-development, white-label). Závěrečný citát: “Nezajímá nás rychlý handshake. Zajímá nás být partnerem, který si to zaslouží.” Scope poznámka: obsah vložen do INVESTOR_BRIEF.html (CEO ho brzy čte); standalone stránka vznikne při BIZ-00103 refaktoru. Nasazeno v7.24. Strategický záměr: BIZ-00104.

---

## AIQ-00017, AIQ-00021, AIQ-00022, AIQ-00023 — Prezentace v7 Final Release (2026-04-16)

**Datum:** 2026-04-16 | **Status:** CLOSED | **Assignee:** Claude / David

- **AIQ-00017:** Přidána grafika a animace do prezentace pro emocionální dopad — parallax efekty, animované přechody mezi slidy, ikonografika.
- **AIQ-00021:** Final Review záměru prezentace vs. architektonický rámec — potvrzeno že prezentace odpovídá architektonické vizi platformy, žádné odchylky.
- **AIQ-00022:** Final Release v7 — prezentace vydána jako verze 7.0, nasazena na GitHub Pages.
- **AIQ-00023:** SharePoint odkaz na Release prezentaci připraven pro CEO/CFO mail — David zajistil distribuci vedení HOPI.

---

## AIQ-00082 — Release v7.20 — archivace + GitHub Pages deploy (2026-04-19)

**Datum:** 2026-04-19 | **Status:** CLOSED | **Assignee:** David Gogela

První multi-version deploy — zavedení versioned složkové struktury `v7.20/` na GitHub Pages. Od tohoto bodu každá verze existuje jako samostatná složka, starší verze zůstávají dostupné. Milestone: přechod z single-version na rolling release model.

---

## AIQ-00113 — Business Strategy setup — BOIL.json + BKONTEXT.md (2026-04-19)

**Datum:** 2026-04-19 | **Status:** CLOSED | **Assignee:** Claude

Zaveden druhý task tracker pro business stream. BOIL.json (Business Open Issue List) + BKONTEXT.md (business kontext) vytvořeny jako paralelní systém k OIL.json. Přidány 3 business streamy: B2B Enterprise, B2C SaaS Home, HOPI Internal Pilot. Rename B2C SaaS Home potvrzen jako primární Phase 1 cíl.

---

## AIQ-00115 — Fix: Základní písmo prezentací 18px (2026-04-19)

**Datum:** 2026-04-19 | **Status:** CLOSED | **Assignee:** Claude

PORTAL_PRESENTATION.html + PERSONAL_PITCH.html — zvýšena základní velikost písma na 18px (bylo 16px). Husté slidy reviewovány a rozvolněny pro lepší čitelnost. Dopad: NB-M a menší zařízení.

---

## AIQ-00122 — Fix: OG image chybí na versioned stránkách (2026-04-20)

**Datum:** 2026-04-20 | **Status:** CLOSED | **Assignee:** Claude

OG (Open Graph) meta tagy ukazovaly na absolutní cestu která nefungovala v versioned složkách. Opraveno na relativní cesty. Dotčeno: PORTAL_PRESENTATION.html, Hub index.html, PERSONAL_PITCH.html.

---

## AIQ-00129 — Fix: FIN portál mobile — vývojová verze nenasazena (2026-04-19)

**Datum:** 2026-04-19 | **Status:** CLOSED | **Assignee:** Claude

Finance portál (index.html v HOPI_AppIQ/) — mobile choice layout nebyl zkopírován do `C:\repos\appiq\v7.21\app\`. Opraveno manuálním nasazením vývojové verze do repo složky.

---

## AIQ-00130 — Fix: PORTAL_PRESENTATION dd-step dlaždice na mobilu (2026-04-20)

**Datum:** 2026-04-20 | **Status:** CLOSED | **Assignee:** Claude

Discovery-Delivery step dlaždice se na mobilech (PH-S, PH-M) protahovaly do 1-sloupcového layoutu místo 2-sloupcového. Přidán `@media (max-width: 768px)` override na konec CSS. Pravidlo: @media bloky vždy na konec souboru.

---

## AIQ-00131, AIQ-00132 — Hudba: toggle fix + perzistence napříč Studio centry (2026-04-20)

**Datum:** 2026-04-20 | **Status:** CLOSED | **Assignee:** Claude

- **AIQ-00131:** Oprava toggle logiky — button state se neaktualizoval při pause/play. Přidáno uložení pozice přehrávání do localStorage, přenos pozice na Studio Hub.
- **AIQ-00132:** Hudba přesunuta do `_hopiq.js` — sdílená architektura pro všechna Studio centra (Hub, DevCenter, TestCenter, AdminCenter). Princip: jeden soubor, jedna instance, sdílený stav.

---

## AIQ-00133 — Fix: Maintenance Mode chybný error handling (2026-04-20)

**Datum:** 2026-04-20 | **Status:** CLOSED | **Assignee:** Claude

GitHub API volání pro versions.json selhávalo s neočekávanou chybou místo graceful fallback. Přidána token validace při uložení + správný error handling. Maintenance mode přepnut na `false` v versions.json.

---

## AIQ-00141 — Fix: HOPIQ panel z-index na PORTAL_PRESENTATION (2026-04-19)

**Datum:** 2026-04-19 | **Status:** CLOSED | **Assignee:** Claude

HOPIQ chatbot floating widget byl překrytý slideshow overlay na PORTAL_PRESENTATION.html. Opraveno zvýšením z-index HOPIQ panelu nad overlay vrstvu.

---

## AIQ-00142 — Fix: Hudba na version selectoru — kompletní oprava toggle (2026-04-19)

**Datum:** 2026-04-19 | **Status:** CLOSED | **Assignee:** Claude

Version selector měl vlastní instanci audio přehrávače, která kolidovala s globální instancí v _hopiq.js. Refaktorováno: selector deleguje na globální music controller. Toggle button state synchronizován s audio.paused stavem.

---

## AIQ-00143 — Fix: Vypnout Maintenance Mode (2026-04-19)

**Datum:** 2026-04-19 | **Status:** CLOSED | **Assignee:** Claude

`versions.json` — `maintenance: true` přepnuto na `false` po dokončení release. Aplikace znovu dostupná pro uživatele.

---

## AIQ-00144 — Fix: AUTO_ARCHIVE + BOIL.json + BKONTEXT.md (2026-04-19)

**Datum:** 2026-04-19 | **Status:** CLOSED | **Assignee:** Claude

DO_ARCHIVE.ps1 a AUTO_ARCHIVE.bat neobsahovaly BOIL.json a BKONTEXT.md v META sekci. Přidány copy příkazy pro oba soubory. Bez této opravy by business data nebyla archivována při každém session snapshotu.

---

## AIQ-00146 až AIQ-00156 — CEO_BRIEF.html kompletní tvorba (2026-04-20)

**Datum:** 2026-04-20 | **Status:** CLOSED | **Assignee:** Claude

Nový standalone strategický dokument CEO_BRIEF.html — kompletní business pitch pro CEO/CFO HOPI.

| Task | Co bylo uděláno |
|------|----------------|
| AIQ-00146 | Nová stránka CEO_BRIEF.html — dark glassmorphism, branding HOPI AppIQ, business vision highlights |
| AIQ-00147 | Ambient music (story_personal.mp3) — stejná architektura jako PERSONAL_PITCH |
| AIQ-00148 | Password overlay — heslo HOPI2026, sdílené s PERSONAL_PITCH |
| AIQ-00149 | Bilingvní CS/EN — kompletní překlady, stejný i18n systém jako PERSONAL_PITCH |
| AIQ-00150 | Sekce "David & Claude: Business Accelerator" — AI synergie narativ, citát, produktivita |
| AIQ-00151 | PERSONAL_PITCH.html — přidán odkaz na CEO_BRIEF (přechodné propojení před BIZ_HUB) |
| AIQ-00152 | Fix: hudba nehrála po odemčení — `checkPw()` nevolal `ceoMusicStart()` |
| AIQ-00153 | Update partner karty — Artin + Intecs, přesný text z webů + pilot note |
| AIQ-00154 | Version selector — hudba spuštěna po kliknutí na bombu (Gladiátor theme) |
| AIQ-00155 | Nový slide MIND-SET REVOLUTION — "Tradiční řízení skončilo, nový řád začíná" |
| AIQ-00156 | Version selector split: `index.html` (welcome+bomba) → `selector.html` (verze+hudba) |

Výsledek: CEO_BRIEF.html = kompletní, nasazeno v7.20+, heslo HOPI2026.

---

## AIQ-00154 — Hudba po bombu kliknutí

*(Zahrnuty v batch AIQ-00146–00156 výše.)*

---

## AIQ-00176 — HOPI TechIQ logo design — 3 barevné koncepty (2026-04-20)

**Datum:** 2026-04-20 | **Status:** CLOSED | **Assignee:** Claude

Navrženy 3 varianty loga HOPI TechIQ:
- Varianta A: HOPI bílé + Tech modré + IQ zelené
- Varianta B: HOPI bílé + Tech violet #A855F7 + IQ zelené ← **David schválil**
- Varianta C: monochromatická

Výsledek: TechIQ brand color = Violet #A855F7. HOPI=bílá, IQ=zelená, Tech=fialová. Závazná volba pro všechny budoucí materiály.

---

## AIQ-00233 — CEO_BRIEF: nový slide "Proč jinak?" (2026-04-21)

**Datum:** 2026-04-21 | **Status:** REVIEW | **Assignee:** Claude

Nová sekce CEO_BRIEF.html: "Proč jinak? Nový řád věcí + definice týmu." Positioning platformy jako průlom oproti tradičnímu SW vývoji. Definice týmu David+Claude jako Business Accelerator model. Čeká na David UAT.

---

## AIQ-00234 — CEO_BRIEF + INVESTOR_BRIEF: nav/logo/music/content fixes (2026-04-21)

**Datum:** 2026-04-21 | **Status:** REVIEW | **Assignee:** Claude

Batch oprav pro oba dokumenty:
- Nav loga aktualizována na vector SVG verze
- Hero brand statement — silnější opening statement
- Music button odstraněno z nav (přesunuto do floating controls)
- INVESTOR_BRIEF: detail expansion sekcí (rozšíření obsahu na klíčových místech)

Čeká na David UAT.

---

## AIQ-00235 — CEO_BRIEF: stats update + milestone promo badge (2026-04-21)

**Datum:** 2026-04-21 | **Status:** CLOSED | **Assignee:** Claude

Aktualizace statistik v CEO_BRIEF.html na dnešní data (2026-04-21): počty tasků, verze, datum. Přidán milestone promo badge na začátek stránky pro vizuální impact při prvním pohledu.

---

## AIQ-00280 — Kompletní auditní a archivační proces — nulová mezera v know-how

**Datum:** 2026-04-21 | **Status:** REVIEW | **Assignee:** Claude | **Priorita:** HIGH

### Záměr
David explicitně zadal: nesmí existovat nepokrytá mezera v know-how mezi Davidem a Claudem. Vše — každé rozhodnutí, každá implementace, každý brainstorming — musí být dohledatelné bez nutnosti dovysvětlování.

### Rozsah úkolu (5 částí)
1. **Doplnit OIL_CONTEXT.md** — záznamy pro AIQ-00231 až AIQ-00279 (dnešní session + Strategic Recon G+H)
2. **Doplnit BKONTEXT.md** — záznamy pro BIZ-00030 až BIZ-00100 (skupinové záznamy pro OPEN batche)
3. **Audit checklist** — standardizovaný checklist pro konec každé session (integrita kontextů)
4. **Ověřit AUTO_ARCHIVE.bat** — zda pokrývá BKONTEXT.md a BRAINSTORM_LOG.md v META sekci
5. **Finální integrity run** — po dokončení ověřit nulové mezery

### Příčina vzniku
Context compression způsobila ztrátu synchronizace kontextů. OIL_CONTEXT zaostával za OIL.json, protože kontext byl svázán s “koncem session” místo s momentem uzavření tasku. Opraven v CLAUDE.md 2026-04-21 — OIL_CONTEXT/BKONTEXT jsou nyní povinné ihned při CLOSED/REVIEW.

### Co bylo uděláno
1. **OIL_CONTEXT doplněn** — 32 CLOSED/REVIEW tasků (AIQ-00017, 00021–00023, 00082, 00113, 00115, 00122, 00129–00133, 00141–00144, 00146–00156, 00176, 00233–00235). Výsledek: 0 CLOSED/REVIEW bez kontextu.
2. **BKONTEXT doplněn** — BIZ-00042 (REVIEW) + 4 skupinové záznamy pro OPEN batche (BIZ-00005–00023, BIZ-00030–00056, BIZ-00042, BIZ-00057–00100). Výsledek: 0 REVIEW bez kontextu.
3. **CLAUDE.md aktualizován** — OIL_CONTEXT + BKONTEXT jsou povinné kroky ihned při CLOSED/REVIEW, zakotveno ve 3 místech (OIL-first, STOP pravidlo, Konec session checklist).
4. **AUTO_ARCHIVE.bat opraven** — BOIL_CONTEXT.md (neexistující název) → BKONTEXT.md + přidána kontrola BRAINSTORM_LOG.md.
5. **Paměť uložena** — `feedback_context_mandatory.md` + MEMORY.md index.

### Zbývající (acceptable gaps)
- 57 OPEN tasků v BKONTEXT bez individuálního záznamu — pokryty skupinovými záznamy, práce nezačala. Per pravidlo: batch OPEN = skupinový záznam.

### Výsledek integrity check
```
OIL_CONTEXT CLOSED/REVIEW bez kontextu: 0 ✅
BKONTEXT REVIEW bez kontextu:           0 ✅
AUTO_ARCHIVE BKONTEXT.md:               OK ✅
AUTO_ARCHIVE BRAINSTORM_LOG.md:         OK ✅
```

---

## AIQ-00236 — CEO_BRIEF + INVESTOR_BRIEF brand vector loga + úklid music systému

**Datum:** 2026-04-21 | **Status:** REVIEW

### Co bylo uděláno
- Nav logo: nahrazeno text-SVG → LF3 brand vector (viewBox 2000x318) v OBOU souborech. “by” → “presents”.
- Hero logo: nahrazeno diamant SVG → LF2 brand vector (viewBox 1260x240.6796, height=68) v OBOU souborech.
- Music system: odstraněn celý IIFE + CSS z CEO_BRIEF.html i INVESTOR_BRIEF.html.
- Nav-tag “Důvěrný dokument”: odstraněn z nav-right v obou souborech.
- Evidence table CEO_BRIEF: ~$900 → ~$1k, 91 → 109 (git commits total).

---

## AIQ-00237 — CEO_BRIEF teaser “Co je nového dnes”

**Datum:** 2026-04-21 | **Status:** REVIEW

### Záměr
Výrazný teaser na začátku CEO_BRIEF s dnešním datem, nové slidy, změny oproti předchozí verzi. Vizuálně dominantní, CEO/majitel ho vidí hned po otevření dokumentu. Propojit s AIQ-00239 (auto-update script bude generovat obsah teaseru).

### Implementace (2026-04-21)
Daily Teaser banner přidán na začátek CEO_BRIEF.html před HERO sekci. Gradient background s oranžovo-zelenou barvou (#E8750A / #1DB954). Obsahuje: DAILY BRIEF badge s dnešním datem, headline s novinkami, 3-sloupcový grid (NOVÁ SEKCE / BRAND UPDATE / STATISTIKY). Datum: 2026-04-21. Deployováno v v7.22. David čeká na UAT.

---

## AIQ-00238 — TOTAL AGILE Management slide

**Datum:** 2026-04-21 | **Status:** REVIEW

### Záměr Davida
David Gogela chce prezentovat přístup **TOTAL AGILE Management** jako doporučení pro vedení HOPI Group:
- “Traditional LEADERSHIP is already GONE” — silný statement
- Měníme metodiku managementu za pochodu
- Revoluce v myšlení a přístupu k práci — celá skupina HOPI
- Doporučení: AGILE na všech úrovních organizace

### Umístění
Nová sekce `#s-total-agile` v CEO_BRIEF po sekci “Proč to teď dělat jinak?” a před BUSINESS NARRATIVE.

### Implementace (2026-04-21)
Sekce obsahuje: (1) eyebrow “David Gogela doporučuje · Nová metodika řízení”, (2) headline “Traditional Leadership [červený přeškrtnutý text] is already GONE.”, (3) subtext “Připravte se — měníme organizaci na VŠECH ÚROVNÍCH. Toto je revoluce v myšlení.”, (4) TOTAL AGILE statement banner, (5) flip tabulka (5 řádků): Info / Rozhodování / Cíle / AI role / Transparentnost — Old Way vs. TOTAL AGILE way, (6) 3 recommendation cards: Denní cadence / AI copilot pro každého / Radikální transparentnost dat, (7) citát Davida: “To, co jsme dnes postavili za 8 týdnů, staré vedení by plánilo 2 roky.” Deployováno v v7.22. David čeká na UAT.

---

## AIQ-00240 — Deploy v7.22

**Datum:** 2026-04-21 | **Status:** CLOSED

Development → Release → DO_DEPLOY.ps1 → GitHub Pages. Zahrnuto: AIQ-00236, 237, 238 (brand loga, teaser, TOTAL AGILE). Pak další deploye pro AIQ-00241–246. Celkem 4 deploye v session. Poslední commit: investor-og.svg + INVESTOR_ENTRY.html + INVESTOR_BRIEF OG meta.

---

## AIQ-00246 — INVESTOR_ENTRY.html + OG image

**Datum:** 2026-04-21 | **Status:** REVIEW

### Co bylo uděláno
Vytvořeny 2 nové soubory:
1. **`INVESTOR_ENTRY.html`** — veřejná teaser stránka (bez hesla). Obsahuje: OG preview image jako hero, HOPI AppIQ brand, stats (8 týdnů / ~$1k / 109 commits / LIVE / Phase 1), tags (LIVE / Anthropic partnership / CEE WorldWide), Anthropic teaser chip, CTA "Otevřít Investor Brief →" s heslo upozorněním.
2. **`investor-og.svg`** (1200×630) — statický SVG banner pro social sharing (Teams, email, WhatsApp, LinkedIn). Obsahuje: HOPI AppIQ logo, "Investment Readiness", klíčové stats, Anthropic brand teaser, "powered by Claude · Anthropic" badge.

OG meta tagy aktualizovány v INVESTOR_BRIEF.html (přidány og:image, og:image:width/height, twitter:image).

Link: h-gr-fico.github.io/appiq/v7.22/HOPI_AppIQ_WebPage/Development/INVESTOR_ENTRY.html

---

## AIQ-00243 — INVESTOR_BRIEF Anthropic sekce rozšíření: parallely, Davidův citát, kontakty, roadmap

**Datum:** 2026-04-21 | **Status:** REVIEW

### Co bylo uděláno
Sekce `#s-anthropic` rozšířena o dvě nové subsekce:

**⑤ Proč si myslím, že by to mohlo fungovat** — 8 paralel HOPI vs. Anthropic:
- "V čele obou firem stojí rodina" (HOPI = rodinná firma; Anthropic = sourozenci Dario+Daniela Amodei — opraveno: Anthropic není tradiční rodinná firma, ale oba top lídři jsou skuteční sourozenci)
- Technology DNA
- Obě usilují o globální trh a ještě ho nemají
- Safety-first mentalita (HOPI = food safety; Anthropic = Constitutional AI)
- Long-term thinking (HOPI = generační firma; Anthropic = mission "long-term benefit of humanity")
- Privátní vlastnictví = svoboda rozhodování
- Underdog vs. velcí hráči (HOPI vs. logistické korporace; Anthropic vs. OpenAI/Google)
- Autentický zakladatelský příběh (HOPI TechIQ zevnitř skupiny; Anthropic = tým z OpenAI odešel kvůli hodnotám)

Davidův citát: "Když jsem si blíže prostudoval Anthropic, uvědomil jsem se, že hledáme partnera — a ne dodavatele..."

**⑥ Jak rozvinout partnerství** — 3 klíčové kontakty (Daniela Amodei, Dario Amodei, Steve Corfield) + 4-krokový partnership roadmap:
1. Claude Partner Network registrace (partnerportal.anthropic.com) — zdarma, odpověď do 5 dní
2. LinkedIn přímý kontakt Daniela Amodei / Steve Corfield
3. Discovery call → BIZ-00049 pitch
4. Smlouva + pricing + osobní setkání Q3 2026

---

## AIQ-00244 — INVESTOR_BRIEF sekce 'Prezentace HOPI Group + záměr'

**Datum:** 2026-04-21 | **Status:** REVIEW

### Co bylo uděláno
Nová sekce `#s-hopi-vision` přidána před Anthropic sekci. Obsahuje:
- HOPI Group stats grid: 30+ let, 5 divizí, 5 zemí CEE, #1 FBN CZ/SK
- Division chips: Supply Chain, Foods, Agriculture, Services, Holding
- 3-krokový journey: TEĎKA (interní pilot) → 2027 (komerční SaaS) → 2028+ (globální trh)
- Brand vision lockup: HOPI AppIQ · by · HOPI TECHNOLOGY · powered by · AI Claude by Anthropic

---

## AIQ-00245 — INVESTOR_BRIEF HOPI & ANTHROPIC Together PROMO sekce

**Datum:** 2026-04-21 | **Status:** REVIEW

### Co bylo uděláno
Nová sekce `#s-together` s PROMO designem. Davidovo motto:
*"Zatím jednáme lokálně, ale myslíme globálně... Nyní je čas to změnit. Pojďme společně do toho!"*

Obsahuje: hero PROMO banner s Davidovým citátem, HOPI & Anthropic Together lockup, 7 shared vision chips (V čele rodina / Technology DNA / Globální ambice / Safety first / Long-term thinking / Underdog spirit / Privátní · svobodní · odvážní), dvě side-by-side quote cards (HOPI říká / Anthropic říká), "Timing je dokonalý" banner.

Deployováno v7.22 — 2026-04-21. David čeká na UAT.

---

## AIQ-00239 — CEO Brief daily send systém

**Datum:** 2026-04-21 | **Status:** OPEN

### Záměr
TOTAL AGILE princip: CEO Brief se posílá KAŽDÝ DEN. Vedení HOPI Group vidí progress pořád aktuálně.

### Komponenty
1. **Auto-stats script** (CEO_BRIEF_UPDATE.ps1): načte git log, OIL.json counts, spočítá delta oproti předchozímu dni, vygeneruje obsah teaseru.
2. **History button**: tlačítko v CEO_BRIEF → modal s timeline verzí (denně/týdně/měsíčně/ročně).
3. **CLAUDE.md pravidlo**: přidáno — CEO Brief se archivuje a odesílá každý den. ✅

### Track record
History modal = auditovatelný track record pro CEO a majitele — “kam jsme šli, kde jsme teď, kam půjdeme”.

---

## AIQ-00241 — INVESTOR_BRIEF sekce “Proč Anthropic?”

**Datum:** 2026-04-21 | **Status:** REVIEW

### Záměr
Investor Brief rozšířen o strategickou sekci představující Anthropic jako klíčového AI partnera HOPI Group a AppIQ platformy. Cíl: přesvědčit majitele a investory o hodnotě tohoto partnerství.

### Implementace (2026-04-21)
Nová sekce `#s-anthropic` vložena před CTA (po sekci 90-Day Plan). Obsahuje:
- **① Kdo je Anthropic** — 4-sloupcový grid: Company / Funding ($7.7B) / Product (Claude) / CEE presence
- **② Co HOPI od Anthropic očekává** — 4 karty (fialová #A855F7): Claude API páteř / Totální AI integrace HOPI / Technická+licenční podpora / Vstřícná cenová politika
- **③ Co HOPI nabízí Anthropic** — 8 karet (terra cotta #CC785C): Enterprise laboratoř / FBN leadership / CEE footprint / AppIQ WorldWide / Úzká spolupráce osobně / Zpětná vazba pro modely / Product journey / Enterprise integrace SAP+Monday+MS365 + chip bar s HOPI oblastmi
- **④ TOTAL Strategic Partnership** — win-win tabulka + brand lockup LF4 (cíl)
- Closing quote: “Anthropic nám dá nejlepší AI na světě. My jim dáme nejlepší enterprise laboratoř v CEE.”
- Barva Anthropic: #CC785C (terra cotta proxy, dle brand) / Barva HOPI TechIQ: #A855F7

Deployováno v v7.22. David čeká na UAT. Propojeno s BIZ-00048–54 (BOIL business tasks).

---

## AIQ-00242 — BRAND_CONCEPTS LF4 logo (HOPI AppIQ powered by Claude by Anthropic)

**Datum:** 2026-04-21 | **Status:** REVIEW

### Záměr
Vytvořit nové brand logo LF4 = LF3 + “powered by” + “Claude by Anthropic”. Toto je cílové logo pro případ, že partnerství s Anthropic bude dojednáno.

### Implementace (2026-04-21)
LF4 přidán do BRAND_CONCEPTS.html v sekci “Finální výběr” jako samostatná karta s `grid-column:1/-1` (přes celou šířku), border-color `rgba(204,120,92,.4)`.

SVG viewBox=”0 0 3200 318” height=”46”. Kompozice:
- Vlevo: LF3 kompletní (green bar + HOPI paths + AppIQ text + “presents” + HOPI TECHNOLOGY group)
- Střed: “powered by” connector (x=2120, fill=rgba(255,255,255,0.25), italic)
- Vpravo translate(2250,0): “Claude” (fill=#CC785C, font-size=200, font-weight=700) + “by” italic + “Anthropic” (fill=rgba(255,255,255,0.72), font-size=150, font-weight=300, letter-spacing=8) + terra cotta closing bar

Status badge: “CÍL · čeká na odsouhlasení partnerství”

---

> VytvoĹ™eno: 2026-04-17 | Aktualizovat prĹŻbÄ›ĹľnÄ› po kaĹľdĂ© session.
> FormĂˇt: `## AIQ-NNNNN â€” NĂˇzev` â†’ kontext, rozhodnutĂ­, klĂ­ÄŤovĂ© poznĂˇmky.
> Audit zĂˇznamy: `## AUD-NNNNN â€” NĂˇzev` â†’ rozsah, nĂˇlezy, plĂˇn oprav.

---

## AIQ-00160 aĹľ AIQ-00175 â€” HOPI TechIQ Platform Architecture (v8.0 milestone)

**Datum:** 2026-04-20 | **Status:** OPEN (vĹˇechny)

### ArchitektonickĂ© rozhodnutĂ­

Session 2026-04-20: David schvĂˇlil kompletnĂ­ architektonickĂ˝ refaktor platformy. NovĂˇ hierarchie:

```
HOPI TECHNOLOGY Hub (divize â€” budoucĂ­, BIZ-00030)
â””â”€â”€ HOPI TechIQ Hub (root landing, AIQ-00161) â€” OPEN
    â”śâ”€â”€ TECH HUB (AIQ-00162) â€” Studio, Finance App
    â”‚   â””â”€â”€ selector.html â†’ Studio v8.xx
    â””â”€â”€ BIZ HUB (AIQ-00163 + AIQ-00164) â€” Strategic docs
        â””â”€â”€ BIZ_HUB.html â†’ Personal Pitch, CEO Brief...
```

### KlĂ­ÄŤovĂˇ rozhodnutĂ­

| Bod | RozhodnutĂ­ |
|-----|------------|
| Root landing | Open, bez hesla |
| Bomba | Root = ĹľĂˇdnĂˇ; TECH HUB = stĂˇvajĂ­cĂ­ bomba; BIZ HUB = novĂˇ bomba (za heslem) |
| BIZ heslo | HOPI2026 â†’ biz_unlocked localStorage |
| VerzovĂˇnĂ­ | Stream-tagged: TECH = v8.xx, BIZ = b1.x, HQ = r1.x, FULL = milestony |
| Deploy | DO_DEPLOY.ps1 -hub TECH/BIZ/HQ/FULL |
| Archiv pĹ™ed zmÄ›nami | AIQ-00160 CRITICAL â€” bez deploy, live v7.22 zĹŻstane funkÄŤnĂ­ |

### Dependency chain

`AIQ-00160 â†’ AIQ-00161 â†’ AIQ-00162 + AIQ-00163 â†’ AIQ-00164 â†’ AIQ-00165 â†’ AIQ-00166`
`AIQ-00163 â†’ AIQ-00167 (shared auth)`
`AIQ-00161..167 â†’ AIQ-00168 (docs update)`

### ProÄŤ teÄŹ

David ÄŤekĂˇ na souhlas CEO a majitelĹŻ (WhatsApp odeslĂˇno 2026-04-20). Deploy novĂ© architektury aĹľ po souhlasu. Archiv v7.22 (AIQ-00160) jako zĂˇchrannĂˇ sĂ­ĹĄ.

---

## AIQ-00125 â€” Fix: HOPIQ agent chybĂ­ v Studio centrech

**Datum:** 2026-04-19 | **Status:** REVIEW

Root cause: `admin/index.html` mÄ›l cestu `../../../../_hopiq.js` (4 ĂşrovnÄ› nahoru) mĂ­sto sprĂˇvnĂ˝ch `../../../_hopiq.js` (3 ĂşrovnÄ› k CO_PROJECT root). Soubory `dev/`, `test/`, `promo/` nemÄ›ly `_hopiq.js` vĹŻbec. Reference ve `docs/index.html` (`../../../`) byla sprĂˇvnÄ› â€” pouĹľita jako vzor. Opraveno.

---

## AIQ-00126 â€” Feature: FIN portĂˇl mobile â€” pĹ™epĂ­naÄŤ zobrazenĂ­

**Datum:** 2026-04-19 | **Status:** REVIEW

### ProblĂ©m
`mkInit()` spustila mobilnĂ­ KPI view pĹ™i kaĹľdĂ©m reloadu â€” ĹľĂˇdnĂˇ pamÄ›ĹĄ preference. TlaÄŤĂ­tko "PlnĂˇ verze" fungovalo jen pro aktuĂˇlnĂ­ session.

### Implementace
- **`#mob-view-choice`** â€” novĂ˝ full-screen modal (CSS + HTML) zobrazenĂ˝ pĹ™i prvnĂ­ nĂˇvĹˇtÄ›vÄ› na mobilu
  - TlaÄŤĂ­tko "đź“± MobilnĂ­ pĹ™ehled" â†’ `mkChooseMobile()` â†’ uloĹľĂ­ `appiq_portal_view='mobile'`
  - TlaÄŤĂ­tko "đź–Ą PlnĂ˝ portĂˇl" â†’ `mkChooseFull()` â†’ uloĹľĂ­ `appiq_portal_view='full'`
- **`mkInit()`** â€” pĹ™epracovĂˇn: ÄŤte localStorage, aplikuje preferenci bez dotazu; bez preference â†’ zobrazĂ­ modal
- **`mkShowFull()`** â€” pĹ™idĂˇn `localStorage.setItem('appiq_portal_view','full')`
- **`mkResetViewChoice()`** â€” novĂˇ funkce, odstranĂ­ klĂ­ÄŤ a zavolĂˇ `mkInit()` (zobrazĂ­ modal znovu)
- **TlaÄŤĂ­tko âš™** ve footer mob-kpi â€” volĂˇ `mkResetViewChoice()` pro zmÄ›nu preference kdykoli

---

## AIQ-00127 â€” Fix: Admin Center mobile tab bar overflow

**Datum:** 2026-04-19 | **Status:** REVIEW

5 tabĹŻ (`.ac-tab` s `white-space:nowrap`) pĹ™etĂ©kalo horizontĂˇlnÄ› na mobilu. Oprava: `@media (max-width:600px)` blok pĹ™idĂˇn na konec CSS â€” `.ac-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch}` + `.ac-tab{padding:8px 10px; font-size:11px}`.

---

## AIQ-00124 â€” Fix: browser auto-translate rozbĂ­jĂ­ strĂˇnky po pĹ™epnutĂ­ na EN

**Datum:** 2026-04-19 | **Status:** REVIEW | **NahlĂˇsil:** David Gogela

### ProblĂ©m

Po pĹ™epnutĂ­ na EN se strĂˇnka nesmyslnÄ› "pĹ™eloĹľila" prohlĂ­ĹľeÄŤem â€” texty nebyly naĹˇe pĹ™eklady, ale automatickĂ˝ strojovĂ˝ pĹ™eklad browseru.

### Root cause

`_i18n.js` Ĺ™.789: `document.documentElement.lang = _lang;`

Tato Ĺ™Ăˇdka pĹ™i `setLang('en')` zmÄ›nĂ­ `<html lang="cs">` na `<html lang="en">`. Browser (Chrome/Safari s auto-translate) pak vidĂ­: *strĂˇnka se hlĂˇsĂ­ jako anglickĂˇ, ale obsahuje ÄŤeskĂ˝ text* â†’ spustĂ­ automatickĂ˝ pĹ™eklad. NaĹˇe bilingvnĂ­ texty se smĂ­chajĂ­ s browser pĹ™ekladem â†’ chaos.

### ProÄŤ dĹ™Ă­ve nefungovalo / nynĂ­ funguje

PravdÄ›podobnÄ› byl auto-translate v browseru novÄ› aktivovĂˇn, nebo byl `lang` atribut dĹ™Ă­ve staticky "cs" (nezmÄ›nÄ›n). NynĂ­ `I18n.setLang()` aktivnÄ› mÄ›nĂ­ `lang` atribut â†’ spouĹˇtĂ­ trigger pro browser auto-translate.

### Oprava (Claude, 2026-04-19)

VĹˇechny 3 hlavnĂ­ strĂˇnky:
- `<html lang="cs" translate="no">` â€” zakĂˇĹľe browser auto-translate (W3C standard)
- `<meta name="google" content="notranslate">` â€” zakĂˇĹľe Google Translate

NaĹˇe strĂˇnky majĂ­ vlastnĂ­ CS/EN systĂ©m, browser pĹ™eklad je kontraproduktivnĂ­.

---

## AIQ-00123 â€” Fix: "presents" bilingvizace (teaser SCR-03)

**Datum:** 2026-04-19 | **Status:** REVIEW | **NahlĂˇsil:** David Gogela

### ProblĂ©m

David nahlĂˇsil 4 vizuĂˇlnĂ­ chyby na PORTAL_PRESENTATION mobile:
1. Jazyk tlaÄŤĂ­tko "ÄŚR" mĂ­sto "CZ"
2. Story screen pĹ™etĂ©kĂˇ
3. Ĺ patnĂ© texty: "zjevil Claude", "tĂ˝dennĂ­ prĂˇce"
4. Teaser: mĂ­sto "presents" zobrazuje "dĂˇrky"

### Root cause analĂ˝za (po kontrole zdrojovĂ©ho kĂłdu)

| Chyba | Zdroj | PĹ™Ă­ÄŤina | Oprava |
|-------|-------|---------|--------|
| "ÄŚR" | Ĺ™.1513: `CZ` â€” sprĂˇvnÄ› | Browser cache | Force-refresh |
| Story texty | Ĺ™.1355: "AĹľ se objevil Claude." âś“, Ĺ™.1365: "TĂ˝dny intenzivnĂ­ prĂˇce." âś“ | Browser cache | Force-refresh |
| "dĂˇrky" | Ĺ™.1413: `<div class="t-presents-sep">presents</div>` â€” bez data-i18n | Browser auto-translate pĹ™eklĂˇdĂˇ EN "presents" jako "dĂˇrky" (gifts) | **PĹ™idat data-i18n** |
| Story overflow | hotfix5 (AIQ-00116) jiĹľ v source â€” Ĺ™.769 justify-content:flex-start!important | NenĂ­ v zdroji, ÄŤekĂˇ na deploy | Deploy + test |

### Oprava provedena (Claude, 2026-04-19)

- `PORTAL_PRESENTATION.html` Ĺ™.1413: pĹ™idĂˇn `data-i18n="scr03.presents"`, fallback text zmÄ›nÄ›n na `"pĹ™edstavuje"`
- `_i18n.js`: pĹ™idĂˇn klĂ­ÄŤ `scr03.presents` â€” CS: `"pĹ™edstavuje"`, EN: `"presents"`

### ProÄŤ "dĂˇrky" a ne "presents"

_i18n.js zpracovĂˇvĂˇ POUZE elementy s `[data-i18n]` atributem. Hardcoded text "presents" bez atributu nenĂ­ systĂ©mem pĹ™eklĂˇdĂˇn. MobilnĂ­ Chrome nebo Safari s povolenĂ˝m auto-pĹ™ekladem identifikoval anglickĂ© slovo "presents" a pĹ™eloĹľil ho jako ÄŤeskĂ© podstatnĂ© jmĂ©no "dĂˇrky" (= gifts/presents). SprĂˇvnĂ© ÄŤeskĂ© sloveso je "pĹ™edstavuje" (= introduces/presents).

### ZbĂ˝vĂˇ

- David ovÄ›Ĺ™Ă­ CS/EN pĹ™epĂ­nĂˇnĂ­ na teaser screenu (test AIQ-00123T)
- Po deployi v7.22 ovÄ›Ĺ™it story overflow (AIQ-00116 hotfix5)

---

## AIQ-00117 + AIQ-00118 â€” Device Preview & Visual QA

**Datum:** 2026-04-20 | **Status:** OPEN | **IniciovĂˇno:** AIQ-00116 (mobile CSS fix)

### ProblĂ©m

SĂ©rie CSS oprav pro mobilnĂ­ zobrazenĂ­ (AIQ-00116) odhalila systĂ©movĂ˝ problĂ©m: vizuĂˇlnĂ­ zmÄ›ny nelze ovÄ›Ĺ™it pĹ™ed pushnutĂ­m na GitHub Pages. KaĹľdĂˇ oprava vyĹľadovala nÄ›kolik iteracĂ­ (hotfix1â€“4) protoĹľe chyby byly viditelnĂ© aĹľ na ĹľivĂ©m webu. NavĂ­c GitHub Pages keĹˇuje obsah, takĹľe uĹľivatelĂ© mohou vidÄ›t starou verzi jeĹˇtÄ› hodiny po deployi.

SekundĂˇrnĂ­ jev: text "AĹľ se objevil Claude" se na DavidovÄ› telefonu zobrazoval jako "A Claude se zjevil" â€” zdrojovĂ˝ kĂłd je sprĂˇvnĂ˝, pĹ™Ă­ÄŤina je starĂˇ mezipamÄ›ĹĄ prohlĂ­ĹľeÄŤe (force-refresh = zavĹ™Ă­t zĂˇloĹľku a znovu otevĹ™Ă­t).

### NavrhovanĂ© Ĺ™eĹˇenĂ­ â€” dvÄ› vrstvy

**Vrstva 1 â€” Workflow (AIQ-00117, research):**
- Definovat kdy a jak testovat vizuĂˇlnĂ­ zmÄ›ny pĹ™ed deployem
- NovĂ© pole v OIL.json: `deviceImpact: ["mobile","tablet","desktop","all"]` pro CSS/design Ăşkoly
- Pravidlo: Ăşkoly s `deviceImpact` obsahujĂ­cĂ­m "mobile" vyĹľadujĂ­ vizuĂˇlnĂ­ kontrolu v DevTools pĹ™ed pushnutĂ­m

**Vrstva 2 â€” Studio nĂˇstroj (AIQ-00118, development):**
- NovĂˇ sekce v DevCenter: **Device Preview**
- TĹ™i iframe panely vedle sebe: mobil (390px), tablet (768px), desktop (1366px)
- Technicky: `<iframe src="..." style="transform:scale(X); transform-origin:top left; width:Ypx; height:Zpx;">` v kontejneru sprĂˇvnĂ© velikosti
- Breakpoint checker: zobrazĂ­ aktivnĂ­ `@media` pravidla pro kaĹľdĂ˝ viewport
- Visual change tracker: seznam poslednĂ­ch commitĹŻ s CSS zmÄ›nami + ovlivnÄ›nĂ© soubory

### TechnickĂˇ realizovatelnost

Iframe preview pĹ™es CSS scale je standardnĂ­ technika (pouĹľĂ­vĂˇ Figma, Webflow, Chrome DevTools). Funguje pouze pro same-origin obsah (lokĂˇlnĂ­ soubory nebo stejnĂˇ domĂ©na) â€” na GitHub Pages bude fungovat protoĹľe vĹˇe je na stejnĂ© domĂ©nÄ›.

### RozhodnutĂ­ z diskuse
- UmĂ­stÄ›nĂ­: tab v DevCenter (ne novĂ˝ FC â€” DevCenter je sprĂˇvnĂ© mĂ­sto pro vĂ˝vojĂˇĹ™skĂ© nĂˇstroje)
- NejdĹ™Ă­ve AIQ-00117 (research + design spec, ~90 min), pak AIQ-00118 (implementace, ~360 min)
- PoĹ™adĂ­: nĂ­zkĂˇ priorita vĹŻÄŤi jinĂ˝m OPEN ĂşkolĹŻm, ale HIGH pro prevenci dalĹˇĂ­ch regresĂ­

---

## AIQ-00106..00112 â€” Strategie AI Agents v AppIQ Studiu

**Datum:** 2026-04-19 | **Status:** Strategie CLOSED, implementace OPEN | **Priorita:** HIGH
**Kontext:** David chce do AppIQ Studia pĹ™idat 5 specializovanĂ˝ch AI agentĹŻ + UI sekci pro jejich sprĂˇvu. ZatĂ­m ĹľĂˇdnĂ˝ kĂłd â€” pouze strategie, trĂ©ninkovĂ© plĂˇny a plĂˇn nasazenĂ­.

---

### 5 agentĹŻ â€” pĹ™ehled

| ID | Agent | Role | SloĹľitost | Effort | PoĹ™adĂ­ nasazenĂ­ |
|----|-------|------|-----------|--------|-----------------|
| AIQ-00111 | AI AppIQ Helper | UĹľivatelskĂ˝ asistent (FAQ, navigace, portĂˇl) | LOW | S | 1. |
| AIQ-00112 | AI AppIQ DocWriter | DokumentaÄŤnĂ­ asistent (spec, changelog, CS/EN) | MED | M | 2. |
| AIQ-00110 | AI AppIQ Admin | AdministrĂˇtorskĂ˝ asistent (OIL, deploy, release) | MED | M | 3. |
| AIQ-00109 | AI AppIQ Tester | TestovacĂ­ asistent (testcases, OIL testy, UAT) | MED | M | 4. |
| AIQ-00108 | AI AppIQ Developer | VĂ˝vojovĂ˝ asistent (kĂłd, architektura, celĂ˝ projekt) | HIGH | L | 5. |

---

### Definice agentĹŻ

#### AI AppIQ Helper (AIQ-00111) â€” nasadit jako 1.
**Role:** Asistent pro bÄ›ĹľnĂ© uĹľivatele Finance portĂˇlu a AppIQ Studia.
**Co umĂ­:**
- OdpovĂ­dĂˇ na FAQ o Finance portĂˇlu (Calendar, Tracking, OrgChart, FX, SAPâ€¦)
- PomĂˇhĂˇ s navigacĂ­ â€” "kde najdu â€¦?"
- VysvÄ›tluje funkce portĂˇlu laikovi
- Troubleshooting zĂˇkladnĂ­ch problĂ©mĹŻ
**Knowledge base:** FAQ Finance portĂˇlu, navigaÄŤnĂ­ mapa, HOPIQ integrace, zĂˇkladnĂ­ popis modulĹŻ
**TĂłn:** PĹ™ĂˇtelskĂ˝, srozumitelnĂ˝, bez technickĂ©ho Ĺľargonu
**Kdy nasadit:** TĂ˝den 1-2 (nejjednoduĹˇĹˇĂ­)

---

#### AI AppIQ DocWriter (AIQ-00112) â€” nasadit jako 2.
**Role:** Asistent pro psanĂ­ dokumentace platformy AppIQ.
**Co umĂ­:**
- PĂ­Ĺˇe technickĂ© specifikace (ve formĂˇtu TS-x ze sekce docs/)
- PĂ­Ĺˇe business specifikace (ve formĂˇtu BS-x)
- Generuje changelog zĂˇznamy (ve formĂˇtu CHANGELOG.md)
- PĂ­Ĺˇe OIL_CONTEXT zĂˇznamy pro novĂ© AIQ Ăşkoly
- PĹ™eklĂˇdĂˇ dokumentaci CS â†” EN v AppIQ stylu
- DodrĹľuje ARCH_MAP kĂłdy a naming conventions
**Knowledge base:** ARCH_MAP.md, PORTAL_ARCHITECTURE.md, OIL_CONTEXT.md formĂˇty, CHANGELOG.md vzor, branding guidelines CS/EN
**TĂłn:** ProfesionĂˇlnĂ­, strukturovanĂ˝, pĹ™esnĂ˝
**Kdy nasadit:** TĂ˝den 2

---

#### AI AppIQ Admin (AIQ-00110) â€” nasadit jako 3.
**Role:** Asistent pro sprĂˇvce platformy.
**Co umĂ­:**
- PomĂˇhĂˇ s OIL management (vytvĂˇĹ™enĂ­, aktualizace AIQ zĂˇznamĹŻ)
- ProvĂˇzĂ­ release procesem (DO_ARCHIVE, DO_DEPLOY, versions.json)
- PomĂˇhĂˇ s Maintenance Mode (GitHub API toggle)
- RadĂ­ pĹ™i prĂˇci s Admin Center
- OdpovĂ­dĂˇ na otĂˇzky o kapacitĂˇch a backlogu
**Knowledge base:** OIL schema, Admin Center dokumentace, deployment workflow, GitHub API flow, CLAUDE.md konvence
**TĂłn:** PĹ™esnĂ˝, step-by-step, orientovanĂ˝ na akci
**Kdy nasadit:** TĂ˝den 2-3

---

#### AI AppIQ Tester (AIQ-00109) â€” nasadit jako 4.
**Role:** Asistent pro testovĂˇnĂ­ platformy.
**Co umĂ­:**
- Generuje testovacĂ­ pĹ™Ă­pady pro novĂ© funkce (functional, visual, integration, acceptance)
- PomĂˇhĂˇ s tvorbou companion test taskĹŻ v OIL
- Analyzuje vĂ˝sledky testĹŻ, navrhuje opravy
- VytvĂˇĹ™Ă­ regresnĂ­ testovacĂ­ plĂˇny po zmÄ›nĂˇch
- Kontroluje testovacĂ­ pokrytĂ­ dle OIL schĂ©matu
**Knowledge base:** OIL testovacĂ­ schema (testType), acceptance kritĂ©ria AppIQ, deployment checklist, known issues
**TĂłn:** SystematickĂ˝, detailnĂ­, checklistovĂ˝
**Kdy nasadit:** TĂ˝den 3

---

#### AI AppIQ Developer (AIQ-00108) â€” nasadit jako 5. (nejkomplexnÄ›jĹˇĂ­)
**Role:** HlavnĂ­ vĂ˝vojovĂ˝ asistent AppIQ platformy.
**Co umĂ­:**
- Generuje HTML/CSS/JS kĂłd v AppIQ stylu a konvencĂ­ch
- Navrhuje architekturu novĂ˝ch funkcĂ­ (BLOK 0-8 framework)
- ProvĂˇdĂ­ code review dle AppIQ standardĹŻ
- PomĂˇhĂˇ s debugging a root cause analysis
- Naviguje v kĂłdovĂ© zĂˇkladnÄ› â€” vĂ­ kde co je
- DodrĹľuje OIL-first konvenci (vytvĂˇĹ™Ă­ AIQ zĂˇznamy)
- ZnĂˇ deployment pipeline (DO_DEPLOY, DO_ARCHIVE, git commit flow)
**Knowledge base:** CelĂˇ architektura (PORTAL_ARCHITECTURE.md, ARCH_MAP.md), kĂłdovĂ© konvence HTML/CSS/JS AppIQ, OIL schema, deployment workflow, CLAUDE.md pravidla, klĂ­ÄŤovĂ© soubory projektu
**TĂłn:** TechnickĂ˝, pĹ™esnĂ˝, orientovanĂ˝ na implementaci
**Kdy nasadit:** TĂ˝den 4-5

---

### TrĂ©ninkovĂ˝ plĂˇn â€” univerzĂˇlnĂ­ template (per agent)

| FĂˇze | NĂˇzev | DĂ©lka | VĂ˝stup |
|------|-------|-------|--------|
| 1 | Identita a persona | 0.5 dne | JmĂ©no, role, tĂłn, omezenĂ­, avatar ikona |
| 2 | Knowledge base | 1 den | Sada dokumentĹŻ / kontextĹŻ vloĹľenĂ˝ch do systĂ©movĂ©ho promptu |
| 3 | SystĂ©movĂ˝ prompt v0 | 0.5 dne | PrvnĂ­ verze â€” Claude pĂ­Ĺˇe, David schvaluje strukturu |
| 4 | TestovacĂ­ scĂ©nĂˇĹ™e | 0.5 dne | 15-20 otĂˇzek + oÄŤekĂˇvanĂ© odpovÄ›di per agent |
| 5 | TestovĂˇnĂ­ + iterace | 1-2 dny | Claude testuje â†’ upravuje prompt â†’ David testuje |
| 6 | UAT David | 1 den | David finĂˇlnÄ› schvĂˇlĂ­ agenta |
| 7 | Deployment | 0.5 dne | Integrace do Studio AI Agents sekce, go live |
| **Celkem** | | **5â€“6 dnĂ­ per agent** | |

---

### PoĹ™adĂ­ a timeline nasazenĂ­

```
TĂ˝den 1    : AIQ-00107 â€” Studio UI sekce AI Agents (paralelnÄ› s trĂ©ninkem)
TĂ˝den 1â€“2  : AIQ-00111 â€” AI AppIQ Helper (trĂ©nink + nasazenĂ­)
TĂ˝den 2    : AIQ-00112 â€” AI AppIQ DocWriter (trĂ©nink + nasazenĂ­)
TĂ˝den 2â€“3  : AIQ-00110 â€” AI AppIQ Admin (trĂ©nink + nasazenĂ­)
TĂ˝den 3    : AIQ-00109 â€” AI AppIQ Tester (trĂ©nink + nasazenĂ­)
TĂ˝den 4â€“5  : AIQ-00108 â€” AI AppIQ Developer (trĂ©nink + nasazenĂ­)

Celkem:    5â€“6 tĂ˝dnĹŻ pro vĹˇech 5 agentĹŻ
```

**ZdĹŻvodnÄ›nĂ­ poĹ™adĂ­:**
1. Helper â€” nejkratĹˇĂ­ knowledge base, nejrychlejĹˇĂ­ vĂ˝sledek, nejniĹľĹˇĂ­ riziko
2. Docwriter â€” stĹ™ednĂ­ sloĹľitost, okamĹľitĂˇ hodnota (pomĂˇhĂˇ Claudovi psĂˇt dokumentaci)
3. Admin â€” pomĂˇhĂˇ Davidovi pĹ™i kaĹľdodennĂ­ sprĂˇvÄ› OIL + releasu
4. Tester â€” sniĹľuje manuĂˇlnĂ­ prĂˇci pĹ™i testovĂˇnĂ­
5. Developer â€” nejrozsĂˇhlejĹˇĂ­ knowledge base, nejvyĹˇĹˇĂ­ hodnota ale i nejvyĹˇĹˇĂ­ pĹ™Ă­prava

---

### Studio UI â€” AI Agents sekce (AIQ-00107)

**UmĂ­stÄ›nĂ­:** NovĂˇ strĂˇnka v AppIQ Studiu (samostatnĂ˝ soubor `agents/index.html` nebo zĂˇloĹľka v Hub)
**Design:**
- Grid karet agentĹŻ (5 karet)
- KaĹľdĂˇ karta obsahuje:
  - Avatar ikona (jedineÄŤnĂˇ per agent)
  - JmĂ©no agenta
  - KrĂˇtkĂ˝ popis role (1 vÄ›ta)
  - Status badge: `đź”µ PlĂˇnovĂˇn` | `đźź  V trĂ©ninku` | `đźźŁ V testu` | `âŹł ÄŚekĂˇ na nasazenĂ­` | `âś… AktivnĂ­`
  - Progress bar (fĂˇze 1â€“7)
  - TlaÄŤĂ­tko "OtevĹ™Ă­t" (aktivnĂ­ jen pro status AktivnĂ­)
- Filtr: VĹˇichni / AktivnĂ­ / V trĂ©ninku / PlĂˇnovĂˇni
- Detail modal / side panel: trĂ©ninkovĂ˝ plĂˇn s milnĂ­ky, datum nasazenĂ­, odkaz na AIQ zĂˇznam

**InicializaÄŤnĂ­ stav vĹˇech 5 agentĹŻ pĹ™i spuĹˇtÄ›nĂ­ sekce:** `đź”µ PlĂˇnovĂˇn`
**Po zahĂˇjenĂ­ trĂ©ninku:** status se mÄ›nĂ­ dle AIQ zĂˇznamu

---

### RozhodnutĂ­ (David, 2026-04-19)

- Ĺ˝ĂˇdnĂ˝ kĂłd zatĂ­m â€” jen strategie a OIL zĂˇznamy
- PoĹ™adĂ­ nasazenĂ­: Helper â†’ Docwriter â†’ Admin â†’ Tester â†’ Developer
- Studio UI sekce jako samostatnĂˇ strĂˇnka (`agents/index.html`)
- KaĹľdĂ˝ agent = samostatnĂ˝ AIQ Ăşkol (AIQ-00108..00112) + companion test task pĹ™i zahĂˇjenĂ­
- Agent lifecycle: PlĂˇnovĂˇn â†’ V trĂ©ninku â†’ V testu â†’ ÄŚekĂˇ na nasazenĂ­ â†’ AktivnĂ­

---

## AIQ-00080 â€” Fix: _i18n.js _applyDOM() â€” pĹ™episovĂˇnĂ­ PREZ_TR pĹ™ekladĹŻ (252 klĂ­ÄŤĹŻ)

**Datum:** 2026-04-19 | **Status:** CLOSED | **Priorita:** HIGH
**Kontext:** David reportoval key names mĂ­sto textĹŻ v celĂ© prezentaci (nadpisy sekcĂ­, TOC, role, dlaĹľdice). ProblĂ©m byl rozsĂˇhlejĹˇĂ­ neĹľ se zdĂˇlo â€” postihoval 252 klĂ­ÄŤĹŻ.

### Implementace (v7.20 â€” 2026-04-19)

**Root cause â€” dvojĂ­ pĹ™ekladovĂ˝ systĂ©m:**
- `PORTAL_PRESENTATION.html` mĂˇ vlastnĂ­ `PREZ_TR` objekt (274 klĂ­ÄŤĹŻ, CZ+EN) + funkci `setLang()`
- `_i18n.js` mĂˇ `_applyDOM()` kterĂˇ zpracovĂˇvĂˇ VĹ ECHNY `[data-i18n]` elementy na strĂˇnce
- PoĹ™adĂ­ v `setLang()`: 1) lang-cz/lang-en spans â†’ 2) **PREZ_TR pĹ™eloĹľĂ­ data-i18n** âś“ â†’ 4) `I18n.setLang()` â†’ `_applyDOM()` â†’ **PĹEPĂŤĹ E PREZ_TR pĹ™eklad key stringem** âś—

**Fix â€” _i18n.js:**
```javascript
// PĹ™idĂˇna helper funkce:
function _hasKey(key) {
    return (_T[_lang] && _T[_lang][key] !== undefined) || (_T.cs && _T.cs[key] !== undefined);
}

// V kaĹľdĂ©m querySelectorAll bloku _applyDOM() pĹ™idĂˇna podmĂ­nka:
if (!_hasKey(key)) return;  // pĹ™eskoÄŤit klĂ­ÄŤe mimo _T store â†’ zachovat PREZ_TR pĹ™eklad
```

**VĂ˝sledek:** `_applyDOM()` nynĂ­ zpracovĂˇvĂˇ jen klĂ­ÄŤe definovanĂ© v `_i18n.js` store. PrezentaÄŤnĂ­ klĂ­ÄŤe (s00_*, s01_*, ..., toc_*, biz_*, atd.) jsou ponechĂˇny `PREZ_TR` systĂ©mu.

**Supersedes:** AIQ-00079 (ĹˇpatnĂˇ oprava â€” pĹ™idĂˇnĂ­ s18_ klĂ­ÄŤĹŻ do _i18n.js, odstranÄ›no)

---

## AIQ-00081 â€” Fix: PERSONAL_PITCH.html â€” setLang() obsah mizĂ­ po kliknutĂ­ CS

**Datum:** 2026-04-19 | **Status:** CLOSED | **Priorita:** MED
**Kontext:** David reportoval: po kliknutĂ­ na tlaÄŤĂ­tko CS v PERSONAL_PITCH.html zmizĂ­ obsah strĂˇnky. DruhĂ˝ test: po prvnĂ­ opravÄ› ÄŤernĂˇ obrazovka.

### Implementace (v7.20 â€” 2026-04-19)

**Root cause 1 â€” display empty string:** `setLang()` pĹŻvodnÄ› pouĹľĂ­vala `el.style.display = ''` pro zobrazenĂ­ aktivnĂ­ho jazyka. Empty string odstraĹuje inline styl a spolĂ©hĂˇ na CSS kaskĂˇdu â€” pokud CSS pravidlo Ĺ™Ă­kĂˇ `display:none`, prvek zĹŻstane skrytĂ˝.

**ChybnĂˇ prvnĂ­ oprava:** PĹ™idĂˇn IIFE, kterĂ˝ pĹ™i naÄŤtenĂ­ strĂˇnky ÄŤte `hopi_lang` z localStorage a volĂˇ `setLang('en')` pokud byl uloĹľen. ZpĹŻsobilo **ÄŤernou obrazovku**: user mÄ›l `'en'` v localStorage (z promo webu), IIFE skryl vĹˇechny `.lang-cz` elementy jeĹˇtÄ› pĹ™ed zadĂˇnĂ­m hesla â†’ celĂ˝ obsah skryt.

**FinĂˇlnĂ­ fix â€” pouze ÄŤistĂ˝ setLang():**
```javascript
function setLang(lang){
  var isCz = (lang === 'cz' || lang === 'cs');
  document.querySelectorAll('.lang-cz').forEach(function(el){
    el.style.display = isCz ? 'inline' : 'none';   // explicitnĂ­ hodnoty
  });
  document.querySelectorAll('.lang-en').forEach(function(el){
    el.style.display = !isCz ? 'inline' : 'none';
  });
  // ... classList, placeholder
}
```

**KlĂ­ÄŤovĂˇ rozhodnutĂ­:**
- Ĺ˝ĂˇdnĂ˝ localStorage, ĹľĂˇdnĂ˝ IIFE â€” strĂˇnka vĹľdy startuje v CS (vĂ˝chozĂ­ stav)
- `display:'inline'` mĂ­sto `''` â€” vĹˇechny `.lang-cz`/`.lang-en` elementy jsou `<span>`, `inline` je vĹľdy sprĂˇvnĂ©
- Funkce akceptuje `'cz'` i `'cs'` jako identifikĂˇtor CS jazyka

### Revize 3 (finĂˇlnĂ­) â€” CSS-based language system (2026-04-19)

**Symptom 3. revize:** `display:'inline'` pĹ™Ă­stup stĂˇle zpĹŻsoboval ÄŤernou obrazovku â€” pĹ™Ă­ÄŤina nebyla identifikovatelnĂˇ ze statickĂ© analĂ˝zy.

**Root cause (zĂˇvÄ›r):** JavaScript iterace pĹ™es DOM elementy je kĹ™ehkĂˇ â€” inline `style="display:none"` v HTML vs JS-nastavenĂ© inline hodnoty mohou kolidovat zĂˇvisle na poĹ™adĂ­ volĂˇnĂ­ a browser cache.

**FinĂˇlnĂ­ fix â€” CSS-based:**
```css
/* V <style> bloku strĂˇnky */
body:not(.lang-en) .lang-en { display:none!important; }  /* CS mode: skryj EN */
body.lang-en .lang-cz { display:none!important; }         /* EN mode: skryj CS */
body.lang-en .lang-en { display:inline!important; }       /* EN mode: zobraz EN */
```

```javascript
/* setLang() â€” zjednoduĹˇeno na 4 Ĺ™Ăˇdky */
function setLang(lang){
  var isCz = (lang === 'cz' || lang === 'cs');
  document.body.classList.toggle('lang-en', !isCz);   // jedinĂ˝ pĹ™epĂ­naÄŤ
  document.getElementById('btn-cz').classList.toggle('active', isCz);
  document.getElementById('btn-en').classList.toggle('active', !isCz);
  document.getElementById('pw-input').placeholder = isCz ? 'Zadejte heslo\u2026' : 'Enter password\u2026';
}
```

**ProÄŤ to funguje:** `!important` v CSS pravidle pĹ™ekonĂˇ inline `style="display:none"` v HTML. Jeden toggle tĹ™Ă­dy na `body` = celĂ˝ systĂ©m reaguje pĹ™es kaskĂˇdu. Ĺ˝ĂˇdnĂˇ JS iterace, ĹľĂˇdnĂˇ kolize.

**Potvrzeno Davidem:** funguje âś“

---

## AIQ-00079 â€” Fix: _i18n.js â€” chybÄ›jĂ­cĂ­ klĂ­ÄŤe s18_ â€” SUPERSEDED

**Datum:** 2026-04-19 | **Status:** CLOSED (superseded) | **Priorita:** HIGH
**PoznĂˇmka:** PĹŻvodnĂ­ oprava pĹ™idala s18_ klĂ­ÄŤe do _i18n.js â€” ale sprĂˇvnĂˇ oprava je AIQ-00080 (_hasKey guard v _applyDOM). PĹ™idanĂ© klĂ­ÄŤe odstranÄ›ny â€” patĹ™Ă­ jen do PREZ_TR.

---

## AIQ-00078 â€” Fix: _i18n.js â€” lang-cz vs lang-cs tĹ™Ă­da â€” prĂˇzdnĂˇ mĂ­sta v Promo Web

**Datum:** 2026-04-18 | **Status:** CLOSED | **Priorita:** HIGH
**Kontext:** David reportoval prĂˇzdnĂˇ mĂ­sta v Promo Web po pĹ™epnutĂ­ jazyka. ProblĂ©m se projevoval jen pĹ™i pĹ™epnutĂ­ do CS â€” v EN vĹˇe fungovalo sprĂˇvnÄ›.

### Implementace (v7.20 â€” 2026-04-18)

**Root cause:** `_applyDOM()` v `_i18n.js` buildovala CSS tĹ™Ă­du jako `'lang-' + _lang`. Pro `_lang='cs'` vzniklo `'lang-cs'`. Ale Promo Web a PORTAL_PRESENTATION.html pouĹľĂ­vajĂ­ tĹ™Ă­du `'lang-cz'` (z = Czech, ne s = CS locale). VĂ˝sledek: v CS mĂłdu vĹˇechny `.lang-cz` elementy byly skryty (`display:none`) â†’ prĂˇzdnĂˇ mĂ­sta vĹˇude.

**Fix â€” _i18n.js Ĺ™Ăˇdky 724-731:**
```javascript
// PĹED (buggy):
var isTarget = el.classList.contains('lang-' + _lang);
var fallback = (_lang !== 'cs' && _lang !== 'en') && el.classList.contains('lang-cs');

// PO (fixed):
var targetClass = _lang === 'cs' ? 'lang-cz' : 'lang-' + _lang;
var isTarget = el.classList.contains(targetClass);
var fallback = (_lang !== 'cs' && _lang !== 'en') && el.classList.contains('lang-cz');
```

**ProÄŤ to trvalo tak dlouho:** `_lang` internÄ› pouĹľĂ­vĂˇ `'cs'` (ISO 639-1), ale HTML tĹ™Ă­dy v promo/prezentaci byly pojmenovĂˇny `'lang-cz'` (TLD konvence). EN fungoval sprĂˇvnÄ›, protoĹľe `'lang-en'` = `'lang-' + 'en'`. Chyba existovala od poÄŤĂˇtku, projevila se aĹľ pĹ™i testovĂˇnĂ­ pĹ™epĂ­nĂˇnĂ­.

---

## AIQ-00077 â€” SystĂ©m testovacĂ­ch ĂşkolĹŻ â€” companion test tasks + testType/linkedTask schema

**Datum:** 2026-04-18 | **Status:** CLOSED | **Priorita:** HIGH
**Kontext:** David chce Ĺ™Ă­dit testovĂˇnĂ­ a mĂ­t pĹ™ehled o vĹˇem co nebylo otestovĂˇno. OdsouhlasenĂ˝ pĹ™Ă­stup: MoĹľnost B (companion test tasky v OIL), pak C (FC-4 Test Center). testType = single value (jeden typ na task, pro komplexnĂ­ feature vĂ­c taskĹŻ). 7 typĹŻ: functional, visual, content, integration, regression, acceptance, code-review.

### Implementace (v7.20 â€” 2026-04-18)

**OIL schema:**
- `testType` â€” jeden z 7 typĹŻ testu
- `linkedTask` â€” AIQ-NNNNN odkaz na testovanĂ˝ development/fix task

**Companion test tasky vytvoĹ™eny (AIQ-00067..00076):**
- AIQ-00067: functional test Archive Protocol modal (â†’ AIQ-00065) â€” David
- AIQ-00068: integration test Archive Protocol end-to-end (â†’ AIQ-00065) â€” Claude
- AIQ-00069: functional test Kapacita zĂˇloĹľka (â†’ AIQ-00048) â€” David
- AIQ-00070: visual test Kapacita zĂˇloĹľka (â†’ AIQ-00048) â€” David
- AIQ-00071: functional test FC-7 Documentation Center (â†’ AIQ-00049) â€” David
- AIQ-00072: visual test FC-7 + Hub karta (â†’ AIQ-00049) â€” David
- AIQ-00073: integration test GitHub Pages multi-version deploy (â†’ AIQ-00046) â€” David
- AIQ-00074: functional test durationDays UI (â†’ AIQ-00066) â€” David
- AIQ-00075: functional test i18n audit Admin/Dev Center (â†’ AIQ-00064) â€” David
- AIQ-00076: functional test _i18n.js pĹ™epĂ­nĂˇnĂ­ napĹ™Ă­ÄŤ FC (â†’ AIQ-00047) â€” David

**Admin Center:**
- Filtr **đź§Ş Testy** â€” zobrazĂ­ jen taskType=test Ăşkoly pĹ™es oba streamy
- testType barevnĂ˝ badge v title sloupci + `â†’ AIQ-NNNNN` odkaz na zdrojovĂ˝ task
- Inline edit test taskĹŻ: pole Typ testu + Testuje AIQ
- CSS: `.oil-test-badge`, `.oil-linked-ref`

**CLAUDE.md:** Pravidlo â€” kaĹľdĂ˝ development/fix task â†’ companion test task(y). Tabulka testType typĹŻ.

---

## AIQ-00066 â€” OIL schema â€” durationDays + createdAt/completedAt na vĹˇech Ăşkolech

**Datum:** 2026-04-18 | **Status:** CLOSED | **Priorita:** MED
**Kontext:** David poĹľadoval, aby kaĹľdĂ˝ Ăşkol v OIL.json mÄ›l evidovĂˇny datumy zadĂˇnĂ­ a splnÄ›nĂ­, a automaticky poÄŤĂ­tanĂ˝ poÄŤet dnĂ­. CĂ­l: transparentnĂ­ sledovĂˇnĂ­ velocity (jak dlouho trvalo splnÄ›nĂ­) + dynamickĂ© zobrazenĂ­ vÄ›ku otevĹ™enĂ˝ch ĂşkolĹŻ.

### Implementace (v7.20 â€” 2026-04-18)

**Schema rozĹˇĂ­Ĺ™enĂ­:**
- `createdAt` / `completedAt` â€” standardizovat na `YYYY-MM-DD HH:mm`
- `durationDays` â€” integer pro CLOSED (calendar days completedAt - createdAt), null pro ostatnĂ­

**Batch migrace OIL.json:**
- Python skript `_add_duration_days.py` proĹˇel 66 ĂşkolĹŻ â€” 18 CLOSED dostalo computed hodnotu (0 nebo 1 den, protoĹľe projekt je mladĂ˝)
- Skript smazĂˇn po ĂşspÄ›ĹˇnĂ©m spuĹˇtÄ›nĂ­

**Admin Center zmÄ›ny:**
- `_oilDaysBadge(t)` helper â€” CLOSED = zelenĂˇ + uloĹľenĂˇ hodnota, ostatnĂ­ = oranĹľovĂˇ + dynamickĂ˝ vĂ˝poÄŤet od dneĹˇnĂ­ho dne
- Backlog tabulka: novĂ˝ sloupec "DnĂ­" (entre Effort a DomĂ©naa)
- Capacity tab: novĂˇ summary card "PrĹŻmÄ›rnĂ© Ĺ™eĹˇenĂ­ (Xd)" z CLOSED ĂşkolĹŻ
- Capacity open backlog: novĂ˝ sloupec "VÄ›k" (ĹľivĂ˝ poÄŤet dnĂ­)
- `oilCycleStatus()`: pĹ™i pĹ™echodu na CLOSED automaticky vypoÄŤĂ­tĂˇ a uloĹľĂ­ `durationDays`
- `addOILTask()`: inicializuje `durationDays: null`

**CLAUDE.md:** DoplnÄ›na dokumentace tĹ™Ă­ polĂ­ v OIL-first konvenci.

---

## AIQ-00046 â€” GitHub: multi-version publishing â€” vĂ˝bÄ›r zobrazenĂ© verze

**Datum:** 2026-04-18 | **Status:** REVIEW | **Priorita:** MED
**Kontext:** GitHub Pages aktuĂˇlnÄ› hostuje vĹľdy jen nejnovÄ›jĹˇĂ­ verzi (root /). CĂ­l: kaĹľdĂˇ archivovanĂˇ verze dostane vlastnĂ­ trvalou URL (/v7.12/, /v7.13/, â€¦), root vĹľdy = latest.

### OdsouhlasenĂˇ architektura
- DO_DEPLOY.ps1 rozĹˇĂ­Ĺ™en o krok: po nasazenĂ­ do rootu zkopĂ­ruje release takĂ© do `/vX.XX/` podsloĹľky
- `versions.json` v root repo: index vĹˇech verzĂ­ s datem a popisem zmÄ›n
- Studio panel (Release & Deploy) zobrazĂ­ dropdown dostupnĂ˝ch verzĂ­ + odkaz na kaĹľdou
- Root `/` = redirect nebo symlink na nejnovÄ›jĹˇĂ­ verzi

### TechnickĂ© otĂˇzky k rozhodnutĂ­
- Root = pĹ™Ă­mĂˇ kopie latest (aktuĂˇlnĂ­ pĹ™Ă­stup, jednoduchĂ©) nebo redirect strĂˇnka s vĂ˝bÄ›rem?
- PodsloĹľky verzovat od v7.12 (aktuĂˇlnĂ­) nebo zaÄŤĂ­t od pĹ™Ă­ĹˇtĂ­ho deploye?

### ZĂˇvislosti
- Navazuje na AIQ-00045 (versions.json je sdĂ­lenĂ˝ datovĂ˝ zdroj)
- ĹeĹˇit jako druhĂ© po AIQ-00045

### Implementace (v7.18 â€” 2026-04-18)

**RozhodnutĂ­:**
- Root = branded version selector page (ne pĹ™Ă­mĂˇ kopie) â€” `_ghpages_root_index.html` â†’ `index.html`
- Versioned deploy od prvnĂ­ho novĂ©ho deploye (starĂ© plochĂ© soubory zĹŻstĂˇvajĂ­ pro backward compat)

**Co bylo vytvoĹ™eno:**
- `DO_DEPLOY.ps1` pĹ™epsĂˇn: kaĹľdĂ˝ deploy = `v{ver}/HOPI_AppIQ_WebPage/Development/` struktura (zachovĂˇvĂˇ relativnĂ­ cesty)
- `_i18n.js` snapshot kopĂ­rovĂˇn do `v{ver}/` (pro `../../_i18n.js` z Development/)
- `versions.json` upsert â€” pĹ™idĂˇ novĂ˝ zĂˇznam nebo aktualizuje existujĂ­cĂ­; obsahuje `version, date, session, title, presentationUrl, hubUrl, pitchUrl, docsUrl, protocolUrl`
- `_ghpages_root_index.html` â€” HOPI AppIQ branded version selector; latest jako hero card, archivovanĂ© jako seznam; dynamicky naÄŤĂ­tĂˇ `versions.json`
- `_status.json` rozĹˇĂ­Ĺ™en o `deployLatest` (pĹ™Ă­mĂˇ URL na verzi)
- Archive detection v `docs/index.html` funguje i v GitHub Pages struktuĹ™e (detekce pĹ™es `../VERSION.txt`)

---

## AIQ-00045 â€” Studio: zĂˇloĹľka Verze â€” pĹ™ehled verzĂ­ s changelogem

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED
**Kontext:** Studio panel mĂˇ 3 zĂˇloĹľky (Backlog / System Map / Release & Deploy). PĹ™idat 4. zĂˇloĹľku Verze â€” pĹ™ehled archivovanĂ˝ch verzĂ­ s datem a changelogem, rozbalitelnĂ© per verze.

### OdsouhlasenĂ˝ design
- 4. tab v Studio panelu: ikona đź•, label "Verze"
- Seznam verzĂ­ v chronologickĂ©m poĹ™adĂ­ (newest first)
- KaĹľdĂˇ verze: ÄŤĂ­slo verze + datum + poÄŤet zmÄ›n (badge)
- RozbalenĂ­ verze: klĂ­ÄŤovĂ© zmÄ›ny danĂ© session (bullet list)

### DatovĂ˝ zdroj â€” 2 moĹľnosti
**A) `_versions.json`** â€” DO_ARCHIVE.ps1 pĹ™i kaĹľdĂ© archivaci pĹ™idĂˇ zĂˇznam (verze, datum, zmÄ›ny). StrukturovanĂ©, snadno ÄŤitelnĂ© v JS. **PreferovĂˇno.**
**B) Parse CHANGELOG.md** â€” sloĹľitÄ›jĹˇĂ­ parsing, ale data uĹľ existujĂ­.

### RozhodnutĂ­
â†’ ZavĂ©st `_versions.json`. DO_ARCHIVE.ps1 na konci pĹ™idĂˇ novĂ˝ zĂˇznam. David doplnĂ­ popis zmÄ›n buÄŹ ruÄŤnÄ› nebo skrze Studio UI.

### ZĂˇvislosti
- `_versions.json` je sdĂ­lenĂ˝ datovĂ˝ zdroj pro AIQ-00046

---

## AUD-00001 â€” KomplexnĂ­ audit: Branding Â· ZĂˇmÄ›r Â· PĹ™eklady CS/EN

**Datum:** 2026-04-18 | **Status:** OPEN | **Verze:** v7.10
**Rozsah:** PORTAL_PRESENTATION.html, PERSONAL_PITCH.html, OIL_CONTEXT.md, ARCH_MAP.md
**NĂˇstroj:** DedikovanĂ˝ audit agent (Claude Sonnet 4.6) â€” ~7 000 Ĺ™ĂˇdkĹŻ kĂłdu, 751 bilingvnĂ­ch pĂˇrĹŻ

### Statistika nĂˇlezĹŻ

| ZĂˇvaĹľnost | PoÄŤet | Oblasti |
|-----------|-------|---------|
| đź”´ HIGH   | 1     | Branding |
| đźźˇ MED    | 3     | Branding (1), PĹ™eklady (1), ZĂˇmÄ›r (1) |
| đźź˘ LOW    | 5     | PĹ™eklady (4), ZĂˇmÄ›r (1) |
| **Celkem** | **9** | |

### Oblast 1 â€” Branding (2 nĂˇlezy)

**AUD-00001-01 HIGH:** `PERSONAL_PITCH.html` Ĺ™. 543, 544, 565
`HOPI Technology` (mixed case) â†’ musĂ­ bĂ˝t `HOPI TECHNOLOGY`
Lokace: timeline uzel "2027 Â· 20 let" a badge oblasti

**AUD-00001-02 MED:** `PERSONAL_PITCH.html` Ĺ™. 86
CSS `::after` footer obsahuje `ZĂˇmÄ›r Davida Gogely` â€” hardcoded ÄŤesky v CSS, nepĹ™eloĹľĂ­ se pĹ™i pĹ™epnutĂ­ do EN.
Opce: zkrĂˇtit na neutrĂˇlnĂ­ `HOPI TECHNOLOGY Â· Â© 2026` nebo `lang-cz/lang-en` CSS tĹ™Ă­dy.

### Oblast 2 â€” Konzistence zĂˇmÄ›ru (2 nĂˇlezy)

**PozitivnĂ­ nĂˇlez:** PORTAL_PRESENTATION.html mĂˇ vĹˇechny plĂˇnovanĂ© slidy. PERSONAL_PITCH.html mĂˇ vĹˇech 7 oblastĂ­. FilosofickĂˇ konzistence: pĹ™Ă­bÄ›h David + HOPI + AppIQ = novĂˇ divize â†’ SaaS je provĂˇzĂˇn v obou dokumentech.

**AUD-00001-05 MED:** BSL CSS knihovna (AIQ-00043) implementovĂˇna v PERSONAL_PITCH.html ale chybĂ­ v PORTAL_PRESENTATION.html. StarĹˇĂ­ slidy stĂˇle inline styly.
Vazba na AIQ-00043 (OPEN).

**AUD-00001-06 LOW:** ARCH_MAP.md â€” chybĂ­ DOC kĂłdy pro sekce `#s01`â€“`#s09`.
Vazba na AIQ-00034 (IN PROGRESS).

### Oblast 3 â€” PĹ™eklady CS/EN (5 nĂˇlezĹŻ)

**AUD-00001-03 MED:** `PERSONAL_PITCH.html` â€” password overlay (6 prvkĹŻ) celĂ˝ ÄŤesky.
Prvky: pw-title, pw-subtitle, pw-label, placeholder, pw-btn, pw-footer.
Dopad: EN pĹ™Ă­jemce vidĂ­ ÄŤeskou vstupnĂ­ obrazovku. Opravit: obalit kaĹľdĂ˝ prvek do lang-cz/lang-en.

**AUD-00001-04 LOW:** `PERSONAL_PITCH.html` Ĺ™. 1176 â€” JS error `'NesprĂˇvnĂ© heslo. Zkuste znovu.'`
Oprava: podmĂ­nÄ›nĂ˝ text dle aktivnĂ­ho jazyka.

**AUD-00001-07 LOW:** `PREZ_TR` Ĺ™. 5726 â€” pĹ™eklep `portal` mĂ­sto `portĂˇl` v CS originĂˇlu.

**AUD-00001-08 LOW:** `PREZ_TR` Ĺ™. 5737 â€” EN `sign-in for everything` â†’ doporuÄŤeno `one login for all`.

**AUD-00001-09 LOW:** `PREZ_TR` Ĺ™. 5763 â€” EN `Deployable Organisational Model` â†’ pro management pitch lĂ©pe `Scalable Organisational Model`.

### PlĂˇn oprav (Sprint A / B / C)

**Sprint A â€” rychlĂ© (dÄ›lat ihned):**
- AUD-00001-01: 3Ă— `HOPI Technology` â†’ `HOPI TECHNOLOGY` v PERSONAL_PITCH.html
- AUD-00001-03: password overlay â€” obalit 6 prvkĹŻ do lang-cz/lang-en
- AUD-00001-04: JS error text â€” pĹ™idat EN variantu

**Sprint B â€” obsahovĂ©:**
- AUD-00001-02: CSS `::after` footer â€” zkrĂˇtit nebo CSS lang varianty
- AUD-00001-08, 09: 2 slabĂ© EN pĹ™eklady v PREZ_TR

**Sprint C â€” technickĂ˝ dluh:**
- AUD-00001-05: BSL CSS blok do PORTAL_PRESENTATION.html (AIQ-00043)
- AUD-00001-06: ARCH_MAP DOC kĂłdy (AIQ-00034)
- AUD-00001-07: pĹ™eklep `portal` â†’ `portĂˇl`

### SystĂ©movĂ© rozhodnutĂ­ (2026-04-18)

> **AUD ÄŤĂ­slovĂˇnĂ­:** `AUD-NNNNN` â€” 5 ÄŤĂ­slic, sekvenÄŤnĂ­, nezĂˇvislĂ© na AIQ sĂ©rii.
> **Periodicita:** VelkĂ˝ audit min. 1Ă— za major verzi nebo pĹ™ed kaĹľdou klĂ­ÄŤovou prezentacĂ­.
> **NĂˇlezy trackovanĂ©** v OIL.json `"audits"` pole + vizualizovĂˇny v UI zĂˇloĹľce đź”Ť Audity.
> **Vazba AIQ â†” AUD:** Pokud nĂˇlez vede k novĂ©mu AIQ Ăşkolu, propojit pĹ™es `linkedAIQ` pole.

---

## AIQ-00044 â€” OsobnĂ­ pitch: Leadership Â· Road mapa Â· Hodnota Â· SpoluprĂˇce

**Status:** OPEN (2026-04-17) Â· Priorita: HIGH Â· Assignee: Claude
**AdresĂˇt:** GĹ skupiny HOPI + minoritnĂ­ vlastnĂ­k (3. nejvĂ˝Ĺˇe postavenĂˇ osoba)
**VĂ˝stup:** NovĂˇ sada slidĹŻ â€” jeden dokument, tĹ™i ÄŤĂˇsti

### ZĂˇmÄ›r

David Gogela prezentuje sĂˇm sebe jako sprĂˇvnou osobu s vizĂ­, businessovĂ˝m cĂ­tÄ›nĂ­m a podnikatelskĂ˝m plĂˇnem. CĂ­l: otevĹ™Ă­t cestu k formĂˇlnĂ­mu partnerstvĂ­ s majiteli a zhmotĹenĂ­ ĹľivotnĂ­ho zĂˇmÄ›ru.

---

### âś… OdsouhlasenĂˇ struktura (2026-04-17)

**Jeden dokument, tĹ™i ÄŤĂˇsti â€” sekvenÄŤnĂ­ pĹ™esvÄ›dÄŤovĂˇnĂ­:**

```
ÄŚĂST I   â€” Produkt a pĹ™Ă­leĹľitost
           â†’ ÄŤtenĂˇĹ™ musĂ­ bĂ˝t nejdĹ™Ă­v nadĹˇenĂ˝ z produktu

ÄŚĂST II  â€” Leadership
           â†’ teprve pak se prodĂˇ osoba

ÄŚĂST III â€” SpoluprĂˇce a podmĂ­nky
           â†’ nabĂ­dka pĹ™ichĂˇzĂ­ aĹľ jako tĹ™etĂ­ krok, kdyĹľ je ÄŤtenĂˇĹ™ pĹ™ipraven
```

DĹŻvod sekvence: pokud vidĂ­ equity a ÄŤĂ­sla dĹ™Ă­v neĹľ je nadĹˇenĂ˝ z produktu, prvnĂ­ reakce je "kolik to stojĂ­" mĂ­sto "to chci". KaĹľdĂˇ ÄŤĂˇst stojĂ­ sama o sobÄ›.

AdresĂˇt (GĹ + minoritnĂ­ vlastnĂ­k) mĂˇ kontext a autoritu â€” citlivĂ˝ obsah v jednom dokumentu je v poĹ™Ăˇdku.

---

### Obsah â€” 7 tematickĂ˝ch oblastĂ­

#### ÄŚĂST I â€” Produkt a pĹ™Ă­leĹľitost

*(Navazuje na stĂˇvajĂ­cĂ­ slidy PORTAL_PRESENTATION.html â€” mĹŻĹľe bĂ˝t shrnutĂ­ nebo novĂ© slidy)*

**Oblast 1 â€” Hodnota diverzifikace rizika pro HOPI**
StrategickĂˇ rovina: co AppIQ pĹ™inĂˇĹˇĂ­ ostatnĂ­m divizĂ­m skupiny.

- **Supply Chain** â€” optimalizace logistickĂ˝ch procesĹŻ, prediktivnĂ­ AI plĂˇnovĂˇnĂ­
- **Foods** â€” vĂ˝robnĂ­ efektivita, sledovĂˇnĂ­ nĂˇkladĹŻ, AI quality control
- **Agriculture** â€” vĂ˝nosovĂ© modely, poÄŤasĂ­ + trh predikce, cost tracking
- **Services** â€” standardizace procesĹŻ, reporting, zĂˇkaznickĂ© portĂˇly
- **Holding** â€” finanÄŤnĂ­ konsolidace, Group Controlling (AppIQ Phase 0 = ĹľivĂ˝ dĹŻkaz)

KlĂ­ÄŤovĂ© sdÄ›lenĂ­: AppIQ nenĂ­ IT nĂˇstroj pro jednu divizi â€” je to **platformovĂˇ infrastruktura pro celou skupinu**. KaĹľdĂˇ divize, kterĂˇ ho nasadĂ­, sniĹľuje nĂˇklady, zvyĹˇuje efektivitu a pĹ™ispĂ­vĂˇ k silnÄ›jĹˇĂ­ investiÄŤnĂ­ pozici HOPI jako celku.

Hodnoty k vizualizaci:
- SnĂ­ĹľenĂ­ nĂˇkladĹŻ na reporting (odhad hodin/rok per divize)
- Standardizace procesĹŻ â†’ mĂ©nÄ› chyb, rychlejĹˇĂ­ rozhodovĂˇnĂ­
- AI zapojenĂ­ â†’ automatizace opakovanĂ˝ch Ăşloh
- RozloĹľenĂ­ technologickĂ©ho rizika â†’ HOPI nenĂ­ zĂˇvislĂ˝ na jednom dodavateli

**Oblast 2 â€” Hodnota firmy nynĂ­ a v budoucnosti**
FinanÄŤnĂ­ rovina â€” dvÄ› perspektivy:

*Perspektiva A â€” EBITDA a nĂˇvratnost kapitĂˇlu:*
- **ROI** (Return on Investment): investice do AppIQ (tĂ˝m, licence, infrastruktura) vs. Ăşspory generovanĂ© nasazenĂ­m v jednotlivĂ˝ch divizĂ­ch
  - PĹ™Ă­klad: 5 divizĂ­ Ă— prĹŻmÄ›rnĂˇ Ăşspora 500h/rok Ă— prĹŻmÄ›rnĂˇ hodinovĂˇ sazba = roÄŤnĂ­ ROI
- **ROCE** (Return on Capital Employed): jak efektivnÄ› vloĹľenĂ˝ kapitĂˇl generuje provoznĂ­ zisk
  - VloĹľenĂ˝ kapitĂˇl: M0â€“M36 investice do AppIQ
  - VĂ˝nos: internĂ­ Ăşspory + budoucĂ­ SaaS revenue
- **EBITDA dopad**: AppIQ jako tech divize generuje vlastnĂ­ EBITDA â†’ zvyĹˇuje celkovou EBITDA skupiny a tĂ­m i valuaci HOPI

*Perspektiva B â€” TrĹľnĂ­ hodnota produktu:*
- **DneĹˇnĂ­ hodnota**: PoC existuje, architektura je navrĹľena, Finance Phase 0 funguje â†’ sweat equity Davida + IP hodnota kĂłdu + business know-how
  - Odhad: comparable early-stage SaaS â€” â‚¬200Kâ€“500K pre-seed valuace (konzervativnĂ­)
- **BudoucĂ­ hodnota po realizaci** (M36+): SaaS produkt s platĂ­cĂ­mi zĂˇkaznĂ­ky
  - Valuace SaaS = ARR Ă— multiple (typicky 8â€“15Ă—)
  - PĹ™Ă­klad: 50 zĂˇkaznĂ­kĹŻ Ă— â‚¬2K/mÄ›sĂ­c ARR = â‚¬1.2M ARR Ă— 10Ă— = **â‚¬12M valuace**
  - PĹ™Ă­klad agresivnĂ­: 200 zĂˇkaznĂ­kĹŻ Ă— â‚¬3K/mÄ›sĂ­c = â‚¬7.2M ARR Ă— 12Ă— = **â‚¬86M valuace**
- KlĂ­ÄŤovĂ© sdÄ›lenĂ­: **vstoupit teÄŹ = vstoupit za pre-seed cenu, realizovat za growth valuaci**

---

#### ÄŚĂST II â€” Leadership

**Oblast 3 â€” ProÄŤ zrovna David? ProÄŤ prĂˇvÄ› teÄŹ?**

Argumenty (vizualizovat jako karty nebo timeline):
- **Insider vĂ˝hoda** â€” znĂˇ HOPI zevnitĹ™: procesy, lidi, IT, finance, kultura
- **Proof of concept** â€” AppIQ Phase 0 existuje a funguje. Postavil ho sĂˇm, s AI, za zlomek ceny externĂ­ho dodavatele
- **Dual kompetence** â€” rozumĂ­ businessu (controlling, finance, group management) I technologii (AI-native development) â€” kombinace vzĂˇcnĂˇ na trhu
- **Skin in the game** â€” nenĂ­ konzultant zvenku. Je to zamÄ›stnanec HOPI s osobnĂ­m zĂˇvazkem k vĂ˝sledku
- **Timing** â€” AI transformace probĂ­hĂˇ prĂˇvÄ› teÄŹ. Kdo nezaÄŤne v 2026, bude dohĂˇnÄ›t 5+ let a platit externĂ­m dodavatelĹŻm mnohem vĂ­c
- Vazba na AIQ-00033 (Marketing narrative â€” 6 ARCs osobnĂ­ho pĹ™Ă­bÄ›hu)

**Oblast 4 â€” Road mapa**

VizuĂˇlnĂ­ timeline zamÄ›Ĺ™enĂˇ na "David jako kapitĂˇn":
- **M0â€“M1**: SchvĂˇlenĂ­ zĂˇmÄ›ru, sestavenĂ­ tĂ˝mu (2â€“3 lidĂ©), kick-off
- **M1â€“M6**: SEED â€” Finance rollout, prvnĂ­ vĂ˝sledky, internĂ­ validace
- **M6â€“M12**: PILOT â€” rozĹˇĂ­Ĺ™enĂ­ na 2â€“3 divize, prvnĂ­ mÄ›Ĺ™itelnĂ© Ăşspory
- **M12â€“M24**: SCALE-IN â€” Group rollout, vĹˇechny divize, HOPI TechIQ s.r.o. formalizovĂˇna
- **M24â€“M36**: SCALE-OUT â€” prvnĂ­ externĂ­ zĂˇkaznĂ­ci, komerÄŤnĂ­ produkt
- **M36+**: SaaS â€” plnÄ› komerÄŤnĂ­ platforma, vlastnĂ­ revenue

**Oblast 5 â€” DalĹˇĂ­ kroky**

OdpovÄ›ÄŹ na otĂˇzku "a co se stane po tomto setkĂˇnĂ­?":
- **TĂ˝den 1**: FormĂˇlnĂ­ souhlas / feedback od GĹ
- **TĂ˝den 2â€“4**: Definice podmĂ­nek spoluprĂˇce (prĂˇvnĂ­, finanÄŤnĂ­)
- **MÄ›sĂ­c 1**: SchvĂˇlenĂ­ rozpoÄŤtu M0â€“M6 (10â€“20 MD ext. + internĂ­ tĂ˝m)
- **MÄ›sĂ­c 2**: Kick-off SEED fĂˇze

---

#### ÄŚĂST III â€” SpoluprĂˇce a podmĂ­nky

**Oblast 6 â€” Struktura vstupu do podnikĂˇnĂ­**

Co David nabĂ­zĂ­ / co ĹľĂˇdĂˇ:

| Strana | Vklad | Forma |
|--------|-------|-------|
| **David** | ÄŚas, expertise, hotovĂ˝ PoC, architektura, vize, budoucĂ­ pĹ™Ă­jmy (odloĹľenĂˇ odmÄ›na) | ZakladatelskĂ˝ podĂ­l HOPI TechIQ s.r.o. |
| **HOPI Holding** | Brand, distribuce, internĂ­ zĂˇkaznĂ­ci, rozpoÄŤet M0â€“M6, infrastruktura | InvestorskĂ˝ podĂ­l, strategickĂ˝ partner |

MoĹľnĂ© formy vstupu (k diskuzi s prĂˇvnĂ­kem):
- KapitĂˇlovĂˇ ĂşÄŤast v HOPI TechIQ s.r.o. (David 51%, HOPI 49% nebo jinĂ˝ pomÄ›r)
- Smlouva o spoluprĂˇci + profit share
- InternĂ­ startup s opcemi (ESOP)

**Oblast 7 â€” Hodnota vlastnĂ­ho vkladu Davida**

Jak sprĂˇvnÄ› ocenit a nabĂ­dnout vlastnĂ­ zdroje jako spoluĂşÄŤast:
- **Sweat equity**: ÄŤas strĂˇvenĂ˝ na vĂ˝voji PoC (odhad: 200â€“400h Ă— trĹľnĂ­ sazba senior architekta â‚¬150/h = â‚¬30Kâ€“60K)
- **IP hodnota**: kĂłd, architektura, know-how â€” co by stĂˇlo externÄ›? (odhad: â‚¬100Kâ€“200K)
- **BudoucĂ­ zĂˇvazek**: David se zavazuje k X letĹŻm vedenĂ­ projektu â†’ odloĹľenĂˇ odmÄ›na mĂ­sto trĹľnĂ­ mzdy = dodateÄŤnĂ˝ vklad
- KlĂ­ÄŤovĂ© sdÄ›lenĂ­: David nevstupuje s prĂˇzdnĂ˝ma rukama â€” vstupuje s hotovĂ˝m produktem, know-how a osobnĂ­m zĂˇvazkem

---

### ZĂˇvislosti

| AIQ | Popis | Vztah |
|-----|-------|-------|
| AIQ-00033 | Marketing narrative â€” 6 ARCs | ZĂˇklad pro Oblast 3 (Leadership) |
| AIQ-00036 | TĂ˝m & Start â€” ESOP struktura | Vstup do ÄŚĂˇsti III |
| AIQ-00043 | CSS komponentovĂˇ knihovna | TechnickĂ˝ zĂˇklad pro stavbu slidĹŻ |
| AIQ-00020 | Draft mail CEO/CFO | NaÄŤasovĂˇnĂ­ odeslĂˇnĂ­ |
| AIQ-00038 | Projektor ladÄ›nĂ­ | PĹ™ed fyzickĂ˝m pitchem |

### KlĂ­ÄŤovĂˇ rozhodnutĂ­ (2026-04-17)

> **Struktura**: Jeden dokument, tĹ™i ÄŤĂˇsti â€” odsouhlaseno âś…
> **AdresĂˇt**: GĹ skupiny HOPI + minoritnĂ­ vlastnĂ­k â€” citlivĂ˝ obsah v jednom dokumentu je OK âś…
> **Sekvence**: Produkt â†’ Leadership â†’ PodmĂ­nky â€” odsouhlaseno âś…
> **FinanÄŤnĂ­ dimenze**: EBITDA/ROI/ROCE + trĹľnĂ­ valuace SaaS â€” pĹ™idat do ÄŚĂˇsti III âś…
> **Diverzifikace rizika**: hodnota pro vĹˇechny divize HOPI â€” pĹ™idat do ÄŚĂˇsti I âś…

---

## AIQ-00043 â€” CSS komponentovĂˇ knihovna pro novĂ© slidy

**Status:** OPEN (2026-04-17) Â· Priorita: MED Â· Assignee: Claude
**VĂ˝stup:** CSS tĹ™Ă­dy v PORTAL_PRESENTATION.html pro responsive-first stavbu novĂ˝ch slidĹŻ

### Kontext

StĂˇvajĂ­cĂ­ biz-scale slidy majĂ­ ~90% inline stylĹŻ â†’ nelze ĹˇkĂˇlovat CSS breakpointy (viz AIQ-00037). NovĂ© slidy mohou bĂ˝t od zaÄŤĂˇtku postaveny jinak â€” na CSS tĹ™Ă­dĂˇch s breakpointy.

### TĹ™Ă­dy k definovĂˇnĂ­

| TĹ™Ă­da | Nahrazuje inline | Breakpointy |
|-------|-----------------|-------------|
| `.bsl-label` | `font-size:10px;letter-spacing:2px;color:rgba(...)` | height 768, width 900, 1920+ |
| `.bsl-eyebrow` | alias `.bsp-eyebrow` â€” rozĹˇĂ­Ĺ™it | existujĂ­cĂ­ |
| `.bsl-title` | alias `.bsp-title` â€” rozĹˇĂ­Ĺ™it | existujĂ­cĂ­ |
| `.bsl-grid-2col` | `display:grid;grid-template-columns:1fr 1fr` | â†’ 1fr na â‰¤768px |
| `.bsl-grid-3col` | `display:grid;grid-template-columns:1fr 1fr 1fr` | â†’ 1fr na â‰¤900px |
| `.bsl-card` | `padding:20px;border-radius:12px;border:1px solid` | padding ĹˇkĂˇluje |
| `.bsl-insight` | alias `.scale-insight` â€” rozĹˇĂ­Ĺ™it | existujĂ­cĂ­ |
| `.bsl-phase-row` | grid fĂˇzovĂ˝ch karet | â†’ stack na â‰¤768px |
| `.bsl-value-big` | `font-size:48px;font-weight:900` | clamp() |
| `.bsl-tag` | badge/tag prvky | font-size ĹˇkĂˇluje |

### KlĂ­ÄŤovĂ© rozhodnutĂ­ (2026-04-17)

> Implementovat pĹ™ed prvnĂ­m novĂ˝m slidem. UloĹľit jako CSS blok `/* â•â• BSL KOMPONENTY â•â• */` v PORTAL_PRESENTATION.html.

---

## AIQ-00042 â€” Formalizovat archivaÄŤnĂ­ proceduru

**Status:** OPEN (2026-04-17) Â· Priorita: HIGH Â· Assignee: Claude
**VĂ˝stup:** AUTO_ARCHIVE.bat v2 + kompletnĂ­ checklist + ovÄ›Ĺ™enĂˇ procedura

### ProÄŤ vznikl

PĹ™i archivaci session v7.9 se ukĂˇzalo, Ĺľe stĂˇvajĂ­cĂ­ AUTO_ARCHIVE.bat a manuĂˇlnĂ­ kroky nejsou dostateÄŤnÄ› systematickĂ© â€” archiv neobsahoval vĹľdy vĹˇe potĹ™ebnĂ© (chybÄ›la aplikace, .md soubory, nekonzistentnĂ­ pojmenovĂˇnĂ­ sloĹľek).

### Co aktuĂˇlnÄ› chybĂ­ / je problematickĂ©

| ProblĂ©m | Popis |
|---------|-------|
| PojmenovĂˇnĂ­ archivĹŻ | MĂ­chajĂ­ se `session_TIMESTAMP` a `v7.x-WebPage_TIMESTAMP` â€” nenĂ­ konzistentnĂ­ |
| ChybÄ›jĂ­cĂ­ META soubory | `PORTAL_ARCHITECTURE.md` a `CLAUDE.md` nejsou archivovĂˇny nikde |
| ChybÄ›jĂ­cĂ­ BRIEFING.md | NenĂ­ v AUTO_ARCHIVE.bat â€” kopĂ­ruje se jen ruÄŤnÄ› |
| Ĺ˝ĂˇdnĂˇ verifikace | Bat neovÄ›Ĺ™uje, zda klĂ­ÄŤovĂ© soubory skuteÄŤnÄ› existujĂ­ pĹ™ed kopĂ­rovĂˇnĂ­m |
| NovĂ© soubory bez aktualizace batu | `RESPONSIVE_DATA.js` pĹ™idĂˇn v7.9, bat o nÄ›m nevĂ­ (xcopy to Ĺ™eĹˇĂ­, ale explicitnĂ­ checklist chybĂ­) |
| `pause` na konci | Blokuje automatizovanĂ© spouĹˇtÄ›nĂ­ |

### NavrhovanĂ˝ kompletnĂ­ checklist (Claude navrhne implementaci)

**WEB stream â€” musĂ­ bĂ˝t v kaĹľdĂ©m archivu:**
- `index.html`
- `PORTAL_PRESENTATION.html`
- `BRAND_CONCEPTS.html`
- `_ver.js`
- `ARCH_MAP_DATA.js`
- `RESPONSIVE_DATA.js`
- `PLATFORM_VISION.md`
- `_audio/` (sloĹľka)
- `assets/` (sloĹľka)

**APP stream â€” musĂ­ bĂ˝t v kaĹľdĂ©m archivu:**
- `index.html`

**META snapshot (`_SESSION_START/`) â€” musĂ­ obsahovat:**
- `BRIEFING.md` â† nynĂ­ chybĂ­ v batu
- `OIL.json`
- `OIL_CONTEXT.md`
- `ARCH_MAP.md`
- `CHANGELOG.md`
- `PORTAL_ARCHITECTURE.md` â† nynĂ­ chybĂ­ v batu
- `CLAUDE.md` â† nynĂ­ chybĂ­ v batu

**PojmenovĂˇnĂ­ archivĹŻ:**
- AktuĂˇlnÄ›: `session_20260417_2300` â€” neobsahuje verzi
- NĂˇvrh: `v7.9_20260417_2300` â€” okamĹľitÄ› jasnĂ© jakĂˇ verze

**VerifikaÄŤnĂ­ krok:**
- Po dokonÄŤenĂ­ zkontrolovat pĹ™Ă­tomnost klĂ­ÄŤovĂ˝ch souborĹŻ
- Vypsat poÄŤet souborĹŻ v kaĹľdĂ©m archivu
- Upozornit pokud nÄ›co chybĂ­

### KlĂ­ÄŤovĂ© rozhodnutĂ­ (2026-04-17)

> David: "urgent jako dalĹˇĂ­ krok" â€” Ĺ™eĹˇit jako prvnĂ­ bod pĹ™Ă­ĹˇtĂ­ session, pĹ™ed pĹ™idĂˇvĂˇnĂ­m novĂ©ho obsahu.
> Claude navrhne novou verzi AUTO_ARCHIVE.bat v2 a checklist k odsouhlasenĂ­.

---

## AIQ-00041 â€” Promo web: mobilnĂ­ zobrazenĂ­ optimalizace

**Status:** OPEN (2026-04-17) Â· Priorita: LOW Â· Stream: WEB
**VĂ˝stup:** OptimalizovanĂ˝ promo web pro telefony (360â€“768px)

### Kontext

Promo web je primĂˇrnÄ› navrĹľen pro desktop/laptop. Na mobilnĂ­m telefonu technicky funguje, ale je informaÄŤnÄ› bohatĂ˝ â€” uĹľivatel musĂ­ hodnÄ› scrollovat. IdentifikovĂˇno pĹ™i responsivnĂ­m review v7.8.

### KonkrĂ©tnĂ­ ĹľlutĂ© oblasti

| Oblast | Ĺ Ă­Ĺ™ka | Symptom |
|--------|-------|---------|
| Tablet/velkĂ˝ telefon | 481â€“768px | Gridy â†’ 1 sloupec, CTA pĹ™es ĹˇĂ­Ĺ™ku â€” funkÄŤnĂ­, ale hodnÄ› obsahu na malĂ© obrazovce |
| MalĂ˝ telefon | â‰¤480px | Arch/OIL tlaÄŤĂ­tka v navu schovĂˇna, HOPI stamp animace pryÄŤ, hero min 26px |
| Micro telefon | â‰¤360px | NeotestovĂˇno â€” potenciĂˇl overflow nebo pĹ™ekryv prvkĹŻ |

### NĂˇvrhy optimalizace (k diskuzi)

1. **Sticky bottom nav** â€” pro mobil pĹ™idat spodnĂ­ navigaÄŤnĂ­ liĹˇtu (Home / Prezentace / PortĂˇl) mĂ­sto top nav tlaÄŤĂ­tek
2. **Hero text zkrĂˇtit** â€” na mobilu hero title a slogan majĂ­ zkrĂˇcenĂ© varianty (data-mobile atribut?)
3. **Pillars section** â€” na mobilu moĹľnĂˇ zobrazit pouze ikonu + nĂˇzev, ne celĂ˝ popis
4. **Otestovat na reĂˇlnĂ˝ch rozliĹˇenĂ­ch** â€” 360px (Galaxy S), 390px (iPhone 14), 430px (iPhone 15 Plus)

### KlĂ­ÄŤovĂ© rozhodnutĂ­ (2026-04-17)

> Promo web posĂ­lĂˇ David managementu â€” pravdÄ›podobnÄ› notebook. MobilnĂ­ verze LOW priorita, Ĺ™eĹˇit aĹľ po hlavnĂ­ch contentu a prezentaci.

---

## AIQ-00040 â€” Finance portĂˇl: tablet 768â€“1024px optimalizace

**Status:** OPEN (2026-04-17) Â· Priorita: LOW Â· Stream: APP
**VĂ˝stup:** PouĹľitelnĂ˝ portĂˇl na tabletu v landscape mode

### Kontext

Finance portĂˇl je internĂ­ pracovnĂ­ nĂˇstroj â€” primĂˇrnÄ› desktop. ÄŚervenĂˇ oblast na 768â€“1024px identifikovĂˇna pĹ™i responsivnĂ­m review v7.8. Na tabletu (iPad landscape, Windows tablet) je portĂˇl viditelnÄ› nepohodlnĂ˝.

### KonkrĂ©tnĂ­ ÄŤervenĂ© problĂ©my

| Oblast | Symptom | TechnickĂˇ pĹ™Ă­ÄŤina |
|--------|---------|-------------------|
| Topbar wrappuje | DruhĂ˝ Ĺ™Ăˇdek pĹ™eteÄŤe do 2 Ĺ™ĂˇdkĹŻ | `flex-wrap:wrap` pĹ™i â‰¤1024px + mnoho prvkĹŻ |
| `height:calc(100vh - 160px)` | VĂ˝Ĺˇka `.tbl-wrap` a `.sb` je spoÄŤĂ­tĂˇna staticky â€” pĹ™i taller topbaru obsah pĹ™eteÄŤe | Hardcoded konstanta |
| Sidebar 150px | PĹ™Ă­liĹˇ ĂşzkĂ˝ pro `.sb-title`, statistiky, task rows | `width:150px` na â‰¤900px |
| Datetime schovĂˇn | `#tb-datetime` hidden na â‰¤1024px â€” uĹľivatel nevidĂ­ ÄŤas | ZĂˇmÄ›rnĂ© ale viditelnĂ© |

### NĂˇvrhy implementace (k diskuzi)

1. **DynamickĂ˝ topbar height** â€” zmÄ›Ĺ™it topbar vĂ˝Ĺˇku JS a nastavit CSS promÄ›nnou `--topbar-h`, pouĹľĂ­t v `calc(100vh - var(--topbar-h))`
2. **Collapsible sidebar** â€” na â‰¤1024px sidebar schovat za ikonovou liĹˇtu (hamburger / chevron)
3. **Breakpoint 900px â†’ 1024px** â€” posunout "full collapse" sidebar breakpoint vĂ˝Ĺˇe
4. **PrioritnĂ­ test**: otevĹ™Ă­t portĂˇl v DevTools na 900Ă—800 a 1024Ă—768 a zmapovat reĂˇlnĂ© pĹ™eteÄŤenĂ­

### KlĂ­ÄŤovĂ© rozhodnutĂ­ (2026-04-17)

> PortĂˇl = internĂ­ desktop tool. Tablet je okrajovĂ˝ pĹ™Ă­pad. Implementovat po stabilizaci funkcĂ­ Phase 0. Koordinovat s pĹ™Ă­padnou mobilnĂ­ verzĂ­ (mob-kpi je vĂ˝chozĂ­ mobilnĂ­ UI).

---

## AIQ-00039 â€” Prezentace: responsivita HD 1366Ă—768 + tablet + mobil

**Status:** OPEN (2026-04-17) Â· Priorita: MED Â· Stream: WEB
**VĂ˝stup:** Prezentace bez vizuĂˇlnĂ­ch problĂ©mĹŻ na HD notebooku a tabletu

### Kontext

NejkritiÄŤtÄ›jĹˇĂ­ responsivnĂ­ problĂ©m v celĂ©m projektu. HD notebook (1366Ă—768) je stĂˇle velmi rozĹˇĂ­Ĺ™enĂ˝ v korporĂˇtnĂ­m prostĹ™edĂ­ â€” HOPI mĂˇ pravdÄ›podobnÄ› desĂ­tky takovĂ˝ch zaĹ™Ă­zenĂ­. Prezentace se odesĂ­lĂˇ managementu na neznĂˇmĂˇ zaĹ™Ă­zenĂ­.

### KonkrĂ©tnĂ­ ÄŤervenĂ© a ĹľlutĂ© problĂ©my

| Oblast | RozliĹˇenĂ­ | Status | Symptom |
|--------|-----------|--------|---------|
| HD notebook | 1366Ă—768 | đź”´ | DvojitĂ˝ zĂˇsah: ĹˇĂ­Ĺ™ka â‰¤1366px (padding 36px, bsp-title 26px) + vĂ˝Ĺˇka â‰¤768px (padding-top 60px, bsp-title 24px). VĂ˝sledek: velmi komprimovanĂ© slidy |
| Tablet (iPad) | â‰¤900px | đźźˇ | Gridy â†’ 1 sloupec, Back/PDF skryty, `.sp-value` hidden â€” ÄŤitelnĂ© ale ochuzennĂ© |
| Mobil | â‰¤600px | đź”´ | `min-height:auto` = slidy nejsou fullscreen, scrollujĂ­, cover je kompaktnĂ­ â€” obsah nenĂ­ navrĹľen pro takto malou obrazovku |

### TestovacĂ­ postup pro HD 1366Ă—768

1. OtevĹ™Ă­t prezentaci v Chrome DevTools
2. Nastavit viewport: 1366Ă—768 (nebo 1366Ă—697 po odeÄŤtu Windows taskbaru)
3. ProjĂ­t kaĹľdĂ˝ slide â€” zkontrolovat:
   - PĹ™etĂ©kajĂ­ elementy pĹ™es `min-height:100vh`?
   - Je `bsp-title` 24px ÄŤitelnĂ˝?
   - Jsou scale-phases viditelnĂ© bez scrollovĂˇnĂ­?
4. PrioritnÄ› zkontrolovat: SLD-0F (finanÄŤnĂ­ tabulka), SLD-0T (market hub diagram), SLD-0S (team cards)

### NĂˇvrhy oprav

1. **Height 768px breakpoint pro bsp-title** â€” pĹ™idat `@media(max-height:768px){ .bsp-title{font-size:22px} }` (aktuĂˇlnÄ› je tam, zkontrolovat zda nestaÄŤĂ­)
2. **SLD-0F finanÄŤnĂ­ tabulka** â€” komplexnĂ­ inline grid, moĹľnĂ© pĹ™eteÄŤenĂ­ na 1366px â€” ovÄ›Ĺ™it
3. **SLD-0T market diagram** â€” hub diagram, ovÄ›Ĺ™it zda se vejde
4. **PĹ™idat `overflow:hidden` na `.biz-scale-page`** â€” zabrĂˇnit nechtÄ›nĂ©mu pĹ™eteÄŤenĂ­

### ZĂˇvislosti

- AIQ-00038 â€” projektor ladÄ›nĂ­ (koordinovat: HD notebook a projektor majĂ­ podobnĂ© problĂ©my)
- AIQ-00037 â€” inline refactoring (kompletnĂ­ fix vyĹľaduje refactoring, ale rychlĂ˝ fix je moĹľnĂ˝ i bez nÄ›j)

### KlĂ­ÄŤovĂ© rozhodnutĂ­ (2026-04-17)

> IdentifikovĂˇno pĹ™i responsivnĂ­m pĹ™ehledu v7.8. MED priorita â€” Ĺ™eĹˇit pĹ™ed pitchem nebo sdĂ­lenĂ­m prezentace s managementem na neznĂˇmĂ˝ch zaĹ™Ă­zenĂ­ch.

---

## AIQ-00038 â€” Prezentace: ladÄ›nĂ­ pro plĂˇtno/projektor

**Status:** OPEN (2026-04-17) Â· Priorita: MED
**VĂ˝stup:** DoladÄ›nĂˇ PORTAL_PRESENTATION.html pro projekci pĹ™ed majiteli skupiny HOPI

### Kontext

Jakmile se pĹ™iblĂ­ĹľĂ­ termĂ­n pitche majiteli skupiny HOPI, bude potĹ™eba projĂ­t prezentaci speciĂˇlnÄ› pro projektor/plĂˇtno. ProhlĂ­ĹľeÄŤ na notebooku â‰  obraz na projektoru â€” jinĂ˝ kontrast, jinĂˇ vzdĂˇlenost, jinĂ˝ svÄ›telnĂ˝ podmĂ­nky.

### Co konkrĂ©tnÄ› Ĺ™eĹˇit

1. **Kontrast a ÄŤitelnost** â€” tmavĂ© pozadĂ­ + bĂ­lĂ© texty jsou obecnÄ› dobrĂ© pro projektory; ovÄ›Ĺ™it zda svÄ›tlejĹˇĂ­ ÄŤĂˇsti (dokumentaÄŤnĂ­ sekce s bĂ­lĂ˝m pozadĂ­m) nejsou na projektoru pĹ™Ă­liĹˇ oslnivĂ©
2. **Velikosti fontĹŻ pro vzdĂˇlenou projekci** â€” titulky min 60px, tÄ›lo min 16px viditelnĂ© z 5â€“8 metrĹŻ
3. **Animace** â€” otestovat zda scroll-reveal animace a canvas efekty vypadajĂ­ dobĹ™e na projektoru nebo zda je lepĹˇĂ­ je vypnout (pĹ™idat `?mode=static` toggle?)
4. **PomÄ›r stran** â€” standardnĂ­ projektor 16:9 (1920Ă—1080); nastavit DevTools na 1920Ă—1080 a ovÄ›Ĺ™it kaĹľdĂ˝ slide
5. **PDF export** â€” zĂˇloĹľnĂ­ varianta pokud projektor nefunguje s webem; otestovat tlaÄŤĂ­tko PDF

### KlĂ­ÄŤovĂ© rozhodnutĂ­ (2026-04-17)

> David: "jakmile se pĹ™iblĂ­ĹľĂ­ termĂ­n prezentace majiteli, tak musĂ­me doladit plĂˇtno"
> Pitch termĂ­n zatĂ­m neznĂˇmĂ˝ â€” otevĹ™Ă­t Ăşkol jako aktivnĂ­ jakmile David obdrĹľĂ­ potvrzenĂ­ data.

### ZĂˇvislosti

- AIQ-00020 â€” CEO/CFO mail â†’ pitch termĂ­n
- AIQ-00033 â€” Marketing narrative â†’ obsah musĂ­ bĂ˝t uzavĹ™en pĹ™ed ladÄ›nĂ­m pro plĂˇtno

---

## AIQ-00037 â€” Refactoring: inline styly â†’ CSS tĹ™Ă­dy

**Status:** OPEN (2026-04-17) Â· Priorita: LOW
**VĂ˝stup:** PlnÄ› responzivnĂ­ biz-scale slidy ĹˇkĂˇlovatelnĂ© od 320px po 3440px+

### TechnickĂ˝ kontext

**ProblĂ©m:** Biz-scale slidy v PORTAL_PRESENTATION.html pouĹľĂ­vajĂ­ z ~90 % inline styly (`style="font-size:10px"`, `style="display:grid;grid-template-columns:1fr 140px 1fr"`). CSS tĹ™Ă­dy (media queries) nemohou tyto hodnoty pĹ™epsat bez `!important` a attribute selectoru `[style*="..."]`, coĹľ je kĹ™ehkĂ©.

**AktuĂˇlnĂ­ stav:** CSS-class prvky se ĹˇkĂˇlujĂ­ sprĂˇvnÄ›:
- `bsp-title`, `bsp-sub`, `bsp-eyebrow` â€” majĂ­ clamp() hodnoty pro 1920px+ a 3200px+
- Padding slidĹŻ â€” ĹˇkĂˇluje se
- Cover, TOC, `.page` dokumentaÄŤnĂ­ sekce â€” ĹˇkĂˇlujĂ­ se

**Co neĹˇkaluje:** Inline obsah uvnitĹ™ biz-scale slidĹŻ:
- Labely 8â€“10px (dekorativnĂ­ popisky jako "Platforma", "Stream 1", timestamps)
- Inline grid-template-columns (fixnĂ­ proporce)
- Inline padding/gap uvnitĹ™ karet

**ProÄŤ LOW priorita:** Management, kterĂ˝ dostane odkaz na prezentaci, pravdÄ›podobnÄ› nemĂˇ ultrawide monitor. Refactoring je kosmetickĂ˝ pro edge case.

### Rozsah refactoringu (pro pĹ™Ă­ĹˇtĂ­ implementaci)

| Slide | OdhadovanĂ˝ poÄŤet inline definic |
|-------|---------------------------------|
| #s-moment | ~10 |
| #s-proposal | ~8 |
| #s-financial | ~20 (komplexnĂ­ tabulka) |
| #s-hopi6 | ~12 |
| #s-strategy | ~10 |
| #s-market | ~15 (hub diagram) |
| #s-team | ~14 (fĂˇzovĂ© karty) |
| #s-brand, #s-partners | ~8 kaĹľdĂ˝ |
| vision-page, schema-page, devdeploy-page | ~10 kaĹľdĂˇ |

**PĹ™Ă­stup:** Pro kaĹľdou inline hodnotu vytvoĹ™it CSS tĹ™Ă­du + pĹ™idat ji do media queries. Nebo pouĹľĂ­t CSS custom properties (variables) s hodnotami per breakpoint.

### KlĂ­ÄŤovĂ© rozhodnutĂ­ (2026-04-17)

> David: "tuto zmÄ›nu budu chtĂ­t, ale naplĂˇnuj jako nĂ­zkou prioritu"
> Implementovat v klidnÄ›jĹˇĂ­ fĂˇzi, ne pĹ™ed pitch termĂ­nem.

---

## AIQ-00036 â€” Slide: TĂ˝m a konfigurace pro start

**Status:** OPEN (2026-04-17) Â· Priorita: HIGH
**VĂ˝stup:** NovĂ˝ biz-scale slide `SLD-TEAM` v PORTAL_PRESENTATION.html

### KlĂ­ÄŤovĂˇ rozhodnutĂ­ (2026-04-17)

> **RychlĂ˝ start, ĹˇkolĂ­me internÄ›.** Senior vÄ›ci = externĂ­ partneĹ™i (ARTIN, INTECS). InternĂ­ nĂˇbor v HOPI â€” atraktivnĂ­ projekt, kdo se chce pĹ™ihlĂˇsit. PostupnĂ˝ nĂˇbÄ›h dle objemu, kapacity, penÄ›z a zdrojĹŻ.

### ZĂˇmÄ›r a kontext

David chce slide, kterĂ˝ ukĂˇĹľe co je potĹ™eba pro rozjezd AppIQ â€” jak pro internĂ­ nasazenĂ­, tak pro pĹ™Ă­pravu externĂ­ho scale-out. DĹŻraz na konkrĂ©tnost: lidĂ©, nĂˇstroje, licence, prostor.

### Struktura tĂ˝mu (zadĂˇnĂ­ od Davida)

**David Gogela** = hlava tĂ˝mu, architekt platformy, business owner produktu

**TĂ˝m 3 lidĂ­ pro start** (hledat/definovat profily):
- PravdÄ›podobnĂ© role: Full-stack developer, AI/Prompt engineer, UX/Product designer
- KaĹľdĂ˝ musĂ­ bĂ˝t schopen AppIQ samostatnÄ› rozvĂ­jet pod DavidovĂ˝m vedenĂ­m
- KaĹľdĂ˝ dostane nejlepĹˇĂ­ Claude AI konfiguraci + plnou palbu kreditu

### Claude developer konfigurace â€” zjistit a navrhnout

K diskuzi a ovÄ›Ĺ™enĂ­ (aktuĂˇlnĂ­ stav k 2026-04-17):
- **Claude MAX** â€” nejlepĹˇĂ­ pĹ™edplatnĂ© pro vĂ˝vojĂˇĹ™e (5x vĂ­ce vĂ˝konu, Claude Code, Projects)
- **Claude Code** â€” CLI nĂˇstroj pro pĹ™Ă­mou prĂˇci s kĂłdem v terminĂˇlu
- **Anthropic API** â€” pĹ™Ă­mĂ˝ API pĹ™Ă­stup pro budovĂˇnĂ­ aplikacĂ­ (klĂ­ÄŤe, rate limity, tiers)
- **Model:** claude-opus-4-6 pro nejnĂˇroÄŤnÄ›jĹˇĂ­ Ăşkoly, claude-sonnet-4-6 pro dennĂ­ prĂˇci
- OrientaÄŤnĂ­ cena: Claude MAX ~$100/mÄ›sĂ­c/osobu + API kredity dle spotĹ™eby
- Pro tĂ˝m 4 (David + 3): ~$400-500/mÄ›sĂ­c pro AI nĂˇstroje

### Ĺ kĂˇlovĂˇnĂ­ tĂ˝mu po fĂˇzĂ­ch â€” dle objemu, kapacity, zdrojĹŻ

| FĂˇze | Popis | TĂ˝m | Zdroj lidĂ­ | FinancovĂˇnĂ­ | Horizont |
|------|-------|-----|-----------|-------------|----------|
| **SEED** | Rozjezd, proof of concept | David + 2â€“3 | InternĂ­ nĂˇbor HOPI (dobrovolnĂ­ci) + 1 junior ext. | HOPI rozpoÄŤet | M0â€“M6 |
| **PILOT** | Finance rollout, prvnĂ­ vĂ˝sledky | David + 4â€“5 | +1â€“2 internĂ­, senior vÄ›ci = ARTIN/INTECS externnÄ› | HOPI + prvnĂ­ Ăşspory | M6â€“M12 |
| **SCALE-IN** | HOPI Group, vĂ­ce divizĂ­ | David + 6â€“8 | CĂ­lenĂ˝ nĂˇbor, prvnĂ­ dedikovanĂ­ AppIQ lidĂ© | InternĂ­ ROI krytĂ­ nĂˇkladĹŻ | M12â€“M24 |
| **SCALE-OUT** | Externalizace, prvnĂ­ platĂ­cĂ­ zĂˇkaznĂ­ci | David + 10â€“15 | Mix internĂ­/externĂ­, prvnĂ­ komerÄŤnĂ­ tĂ˝m | Revenue ze zĂˇkaznĂ­kĹŻ | M24â€“M36 |
| **SaaS** | PlnĂ˝ komerÄŤnĂ­ produkt | 20+ | PlnĂˇ firma HOPI TechIQ s.r.o. | SaaS revenue | M36+ |

**KlĂ­ÄŤovĂ˝ princip:** V kaĹľdĂ© fĂˇzi tĂ˝m nepĹ™ekroÄŤĂ­ to, co je financovĂˇno vĂ˝sledky tĂ© fĂˇze. Ĺ˝ĂˇdnĂ˝ burn bez pokrytĂ­.

### UpĹ™esnÄ›nĂ­ od Davida (2026-04-17)

**M0â€“M6 rozpoÄŤet:**
- InternĂ­ mzdovĂ˝ rozpoÄŤet: zatĂ­m nedefinovĂˇn
- SubdodĂˇvky / externĂ­ konzultace: **10â€“20 MD** â€” budget zatĂ­m neschvĂˇlen, ale realistickĂ˝
- PartneĹ™i (ARTIN, INTECS): zapojit na konzultace M0â€“M6, pokud se osvÄ›dÄŤĂ­ â†’ dalĹˇĂ­ch 10â€“20 MD v dalĹˇĂ­ch fĂˇzĂ­ch

**Equity / profit sharing:**
- **ANO** â€” David otevĹ™en sdĂ­lenĂ­ pro sebe i pro tĂ˝m
- ModernĂ­ pĹ™Ă­stup, zvyĹˇuje atraktivitu projektu
- Forma: ESOP nebo profit share (upĹ™esnit v prĂˇvnĂ­ fĂˇzi, HOPI TechIQ s.r.o.)
- Pro slide: zmĂ­nit jako souÄŤĂˇst nabĂ­dky internĂ­m kandidĂˇtĹŻm

**Role a profily:**
- ZatĂ­m bez konkrĂ©tnĂ­ho inzerĂˇtu
- Role abstraktnĂ­ â€” definovat v dalĹˇĂ­m kole (slide ukĂˇĹľe typy rolĂ­, ne konkrĂ©tnĂ­ JD)

**InternĂ­ nĂˇbor HOPI:**
- CĂ­lit na lidi v HOPI kteĹ™Ă­ chtÄ›jĂ­ bĂ˝t souÄŤĂˇstĂ­ tech projektu
- AtraktivnĂ­: novĂˇ technologie, AI, moĹľnost rĹŻstu, potenciĂˇlnĂ­ podĂ­l

### Vazby v prezentaci
- ProvĂˇzat s `SLD-0F` (FinanÄŤnĂ­ rozvaha â€” nĂˇklady na tĂ˝m)
- ProvĂˇzat s `DOC-08` (FĂˇzovĂ˝ plĂˇn & MilnĂ­ky)
- ZvĂˇĹľit umĂ­stÄ›nĂ­: za `SLD-0F` nebo jako souÄŤĂˇst `SLD-0C` (6. divize)

---

## AIQ-00035 â€” Slide: TrĹľnĂ­ strategie â€” modulĂˇrnĂ­ ĹˇkĂˇlovĂˇnĂ­, Business vs. Retail

**Status:** OPEN (2026-04-17) Â· Priorita: HIGH
**VĂ˝stup:** NovĂ˝ biz-scale slide `SLD-MARKET` v PORTAL_PRESENTATION.html

### ZĂˇmÄ›r a kontext

David chce slide o trĹľnĂ­ strategii pĹ™i externĂ­m scale-out: jak modulĂˇrnÄ› budovat AppIQ tak, aby:
1. Existovalo **aktivnĂ­ jĂˇdro** (core platform) â€” vĹľdy funkÄŤnĂ­, vĹľdy prodejnĂ©
2. Kolem jĂˇdra se pĹ™idĂˇvajĂ­ moduly/aplikace â€” platforma roste, ale nikdy nenĂ­ "rozbitĂˇ"
3. Produkt je kdykoliv nabĂ­dnutelnĂ˝ zĂˇkaznĂ­kovi bez ohledu na to, v jakĂ© fĂˇzi vĂ˝voje jsme

### KlĂ­ÄŤovĂˇ rozhodnutĂ­ (2026-04-17)

> **Retail stream = od zaÄŤĂˇtku, paralelnÄ› s Business.** David: "ObrovskĂ˝ potenciĂˇl na planetÄ› â€” musĂ­me to zaÄŤĂ­t rozmĂ˝Ĺˇlet od zaÄŤĂˇtku." Nejde o vĂ˝hled â€” jde o souÄŤĂˇst zĂˇkladnĂ­ strategie.

### Dva paralelnĂ­ streamy (zadĂˇnĂ­ od Davida)

**Stream 1 â€” Business (firemnĂ­ aplikace)**
PĹ™Ă­klady k rozpracovĂˇnĂ­:
- Finance & Controlling (HOPI AppIQ Phase 0 â€” jiĹľ existuje)
- HR & People Management (dochĂˇzka, hodnocenĂ­, onboarding)
- Operations & Logistics (pĹ™epravy, sklady, KPI dashboard)
- Procurement (schvalovacĂ­ workflow, dodavatelĂ©)
- Legal & Compliance (smlouvy, GDPR, reporty)
- Executive Dashboard (C-level pĹ™ehled skupiny)

**Stream 2 â€” Retail / Personal (domĂˇcĂ­ & osobnĂ­ aplikace)**
PĹ™Ă­klady k rozpracovĂˇnĂ­:
- RodinnĂ© finance (budget, vĂ˝daje, spoĹ™enĂ­, cĂ­le)
- OsobnĂ­ plĂˇnovĂˇnĂ­ (Ăşkoly, projekty, habity, cĂ­le)
- Smart Home asistent (zaĹ™Ă­zenĂ­, energie, spotĹ™eba)
- Health & Wellness tracker (pohyb, spĂˇnek, strava)
- VzdÄ›lĂˇvĂˇnĂ­ & rozvoj (kurzy, knihy, progres)
- RodinnĂ˝ organizĂ©r (kalendĂˇĹ™, nĂˇkupy, udĂˇlosti)

### VizuĂˇlnĂ­ koncept (nĂˇvrh)

MoĹľnosti k diskuzi:
- **Hexagonal grid** â€” jĂˇdro uprostĹ™ed, moduly jako pĹ™ilĂ©hajĂ­cĂ­ hexagony (rozrĹŻstĂˇ se)
- **Orbit model** â€” jĂˇdro = planeta, moduly = obÄ›ĹľnĂ© drĂˇhy (Business orbit + Retail orbit)
- **DÄ›lenĂˇ osa** â€” levĂˇ polovina Business, pravĂˇ Retail, jĂˇdro uprostĹ™ed (most)

### KlĂ­ÄŤovĂˇ zprĂˇva pro slide

> *"StavĂ­me jednou, nasazujeme vĹˇude â€” stejnĂ© jĂˇdro, nekoneÄŤnĂ© moĹľnosti."*
> KaĹľdĂˇ fĂˇze vĂ˝voje = prodejitelnĂ˝ produkt. Ĺ˝ĂˇdnĂ˝ "work in progress" z pohledu zĂˇkaznĂ­ka.

### Vazby v prezentaci
- ProvĂˇzat s `SLD-0E` (StrategickĂ˝ pohled â€” diverzifikace rizika)
- ProvĂˇzat s `DOC-12` (ArchitektonickĂˇ roadmap â€” Bloky 4â€“7)
- ProvĂˇzat s `DOC-13` (VĂ˝hled â€” SkalovĂˇnĂ­ mimo HOPI)
- ZvĂˇĹľit umĂ­stÄ›nĂ­: za `SLD-0E` nebo jako samostatnĂ˝ slide pĹ™ed/za `SLD-0C`

---

## AIQ-00034 â€” ArchitekturnĂ­ mapa: kĂłdy a vazby vĹˇech objektĹŻ

**Status:** IN PROGRESS (2026-04-17)
**VĂ˝stup:** `ARCH_MAP.md` v root projektu

### ZĂˇmÄ›r a kontext

David poĹľadoval zmapovĂˇnĂ­ architektury celĂ©ho projektu â€” WEB stream (promo web), PREZ stream (prezentace), APP stream (aplikace). CĂ­l: kaĹľdĂ˝ objekt (screen, slide, sekce, modul) dostane krĂˇtkĂ˝ kĂłd, aby se dalo odkazovat jednoduĹˇe mĂ­sto opisovĂˇnĂ­ dlouhĂ˝ch nĂˇzvĹŻ souborĹŻ.

### NavrĹľenĂ˝ systĂ©m kĂłdovĂˇnĂ­

| Prefix | Co oznaÄŤuje | PĹ™Ă­klad |
|--------|-------------|---------|
| `SCR-xx` | Overlay screeny v prezentaci | `SCR-01` = Intro screen |
| `IDX-xx` | Sekce promo webu (index.html) | `IDX-01` = Hero |
| `SLD-xx` | Biz-scale slidy prezentace | `SLD-0W` = s-moment |
| `DOC-xx` | Doc sekce prezentace (s00â€“s25) | `DOC-00` = s00 Executive summary |
| `MOD-xx` | Overlay modĂˇly v prezentaci | `MOD-01` = Brand modal |
| `APP-xx` | Moduly Finance portĂˇlu | `APP-01` = KalendĂˇĹ™ |

### Vazby mezi objekty â€” klĂ­ÄŤovĂ©

- `IDX` â†’ `SLD/DOC` (via href PORTAL_PRESENTATION.html)
- `IDX` â†’ `APP` (via href HOPI_AppIQ/Release/index.html)
- `IDX` â†’ `BRAND_CONCEPTS.html` (link Brand Concepts)
- `SCR-01` â†’ `SCR-02` (closeIntroScreen â†’ story)
- `SCR-02` â†’ `SCR-03` (closeStoryScreen â†’ teaser)
- `SCR-03` â†’ prezentace (closeTeaserOverlay)
- `MOD-01` â†’ `BRAND_CONCEPTS.html` (iframe)
- Navigace v prezentaci: TOC linky, prev/next tlaÄŤĂ­tka

### PoznĂˇmky k implementaci
- KĂłdy jsou VIRTUĂLNĂŤ â€” nepĹ™idĂˇvajĂ­ se do HTML jako ID, jsou jen pro referenci v komunikaci Davidâ†”Claude a v dokumentaci
- `ARCH_MAP.md` je ĹľivĂ˝ dokument â€” aktualizovat pĹ™i pĹ™idĂˇnĂ­ novĂ˝ch objektĹŻ
- V OIL_CONTEXT.md a BRIEFING.md pouĹľĂ­vat kĂłdy ve vazbĂˇch na slidy/screeny

---

## AIQ-00030 â€” Pre-slide: GlobĂˇlnĂ­ kontext AI (slide 0W)

**Status:** CLOSED (2026-04-17)
**Slide:** `#s-moment` (TOC 0W) â€” absolutnÄ› prvnĂ­ slide za cover strĂˇnkou

### ZĂˇmÄ›r a kontext
David poĹľadoval ĂşvodnĂ­ slide, kterĂ˝ pĹ™ed celĂ˝m zĂˇmÄ›rem nastavĂ­ globĂˇlnĂ­ kontext:
- AI je game changer stejnĂ© magnitude jako internet v 90. letech â€” ale 5Ă— rychlejĹˇĂ­ adopce
- Urgence: "Kdo chvĂ­li stĂˇl, stojĂ­ opodĂˇl" â€” okno 2024â€“2027 se otevĂ­rĂˇ nynĂ­
- Technologie neznĂˇ hranice â€” stejnĂ˝ produkt funguje v Praze i Singapuru
- PĹ™Ă­leĹľitost pro HOPI: transformace celĂ© skupiny + vstup na globĂˇlnĂ­ trh
- David se nabĂ­zĂ­ jako leader â€” nĂˇpad â†’ zĂˇmÄ›r â†’ funkÄŤnĂ­ prototyp â†’ plĂˇn

### KlĂ­ÄŤovĂ© designovĂ© rozhodnutĂ­
- TĂłn: dramatickĂ˝, ale faktickĂ˝ â€” ne panika, ale urgence
- VizuĂˇlnĂ­ struktura: Internet 90s vs. AI 2020s srovnĂˇvacĂ­ grid (levĂˇ/pravĂˇ strana)
- CitĂˇt: ÄŤeskĂ© pĹ™Ă­slovĂ­ "Kdo chvĂ­li stĂˇl, stojĂ­ opodĂˇl" jako urgency hook
- Closing: osobnĂ­ nabĂ­dka Davida jako leadra â€” pĹ™echod na #s-proposal
- Background: tmavĹˇĂ­ gradient (odliĹˇenĂ­ od ostatnĂ­ch biz-scale-page)

### Slide poĹ™adĂ­ (celĂˇ ĂşvodnĂ­ sekvence)
```
Cover â†’ #s-moment (0W) â†’ #s-proposal (â…) â†’ #s-financial (0F) â†’ TOC â†’ zbytek
```

---

## AIQ-00032 â€” Slide #s-partners: StrategickĂˇ partnerstvĂ­ ARTIN Â· INTECS Â· Anthropic

**Status:** CLOSED (2026-04-17)
**Slide:** `#s-partners` (TOC 0P) â€” vloĹľen za #s-strategy, pĹ™ed #s-build

### ZĂˇmÄ›r a kontext

David oznaÄŤil strategickĂˇ partnerstvĂ­ jako klĂ­ÄŤovĂ˝ bod dlouhodobĂ©ho zĂˇmÄ›ru a podmĂ­nku business ĂşspÄ›chu AppIQ. TĹ™i partneĹ™i tvoĹ™Ă­ ekosystĂ©m pro cestu od HOPI Group k celosvÄ›tovĂ©mu trhu.

### ARTIN â€” Artificial Intelligence

**Status:** AKTIVNĂŤ PILOT â€” PROBĂŤHĂ NYNĂŤ đźź˘
**Role:** PĹ™inĂˇĹˇĂ­ umÄ›lou inteligenci do rĹŻznĂ˝ch business oblastĂ­ a reĂˇlnĂ˝ch aplikacĂ­ â€” AI intelligence/logic layer
**PĹ™Ă­spÄ›vek na pilotnĂ­ch projektech:**
- **AI FINCO PBI Designer** â€” AI logika pro generovĂˇnĂ­ Power BI reportĹŻ; NLP â†’ report struktura
- **AI FINCO PBI Analyser** â€” AI vrstva pro interpretaci dat, business kontext, anomĂˇlie
**ProÄŤ ARTIN:** AI v podnikovĂ˝ch procesech v praxi â€” nejen teorie, ale reĂˇlnÄ› nasazenĂˇ inteligence
**ZĂˇjem:** EminentnĂ­ zĂˇjem o dlouhodobou spoluprĂˇci s HOPI

### INTECS â€” Intelligent Technologies

**Status:** AKTIVNĂŤ PILOT â€” PROBĂŤHĂ NYNĂŤ đźź˘ *(opraveno 2026-04-17: pĹŻvodnÄ› zapsĂˇno jako "JednĂˇnĂ­", ale INTECS se aktivnÄ› podĂ­lĂ­ na obou projektech)*
**Role:** Partner pro Microsoft Ĺ™eĹˇenĂ­ a platformu MS Power BI â€” MS/Power BI platform layer
**ZamÄ›Ĺ™enĂ­:** HlubokĂˇ znalost Power BI Embedded, licencovĂˇnĂ­, RLS architektury, MS ekosystĂ©m
**PĹ™Ă­spÄ›vek na pilotnĂ­ch projektech:**
- **AI FINCO PBI Designer** â€” Power BI Embedded, workspace API, RLS, dataset management
- **AI FINCO PBI Analyser** â€” Power BI datovĂ˝ model, DAX optimalizace, report distribuce
**ProÄŤ INTECS:** Power BI v produkci â€” licencovĂˇnĂ­, ĹˇkĂˇlovĂˇnĂ­, enterprise nasazenĂ­
**ZĂˇjem:** DlouhodobĂ© partnerstvĂ­ s HOPI je pro INTECS strategickĂˇ priorita

### Komplementarita ARTIN + INTECS

ARTIN a INTECS nejsou konkurenti â€” jsou komplementĂˇrnĂ­ partneĹ™i:
- **ARTIN** = AI intelligence layer (umÄ›lĂˇ inteligence, NLP, business logika)
- **INTECS** = MS Power BI platform layer (infrastruktura, embed, licencovĂˇnĂ­)
- Dohromady dodĂˇvajĂ­ AI-powered BI Ĺ™eĹˇenĂ­ na Microsoft infrastruktuĹ™e

### Anthropic / Claude AI

**Status:** STRATEGICKĂť CĂŤL Â· LONG-SHOT AMBICE đź”µ
**Dnes:** Claude Agent = core AI vrstva AppIQ â€” tvorba aplikacĂ­, analĂ˝zy, dokumentace, architekt platformy. David + Claude budujĂ­ AppIQ spoleÄŤnÄ› od zĂˇkladu.
**StrategickĂˇ ambice:** Oslovit Anthropic s nabĂ­dkou formĂˇlnĂ­ho partnerstvĂ­.
- AppIQ = **flagship showcase AI-native enterprise platformy s globĂˇlnĂ­m dosahem**
- Anthropic hledĂˇ enterprise reference cases pro Claude â€” AppIQ (validovanĂ˝ na 500+ uĹľivatelĂ­ch skupiny) je pĹ™esnÄ› to, co by je mohlo zaujmout
- "Kdo se bojĂ­, nesmĂ­ do lesa" â€” odvĂˇĹľnĂˇ ambice, ale logickĂˇ

**KlĂ­ÄŤovĂ© zdĹŻvodnÄ›nĂ­ (David, 2026-04-17):**
TĹ™i partnerstvĂ­ tvoĹ™Ă­ ideĂˇlnĂ­ ekosystĂ©m:
- **ARTIN** = AI intelligence layer (aktivnĂ­ pilot, reĂˇlnĂ© nasazenĂ­ AI do business procesĹŻ)
- **INTECS** = MS Power BI platform layer (aktivnĂ­ pilot, Power BI expertise v produkci)
- **Anthropic** = globĂˇlnĂ­ AI lĂ­dr (nejlepĹˇĂ­ AI backbone, mezinĂˇrodnĂ­ dosah a reference)

Kombinace tÄ›chto tĹ™Ă­ spojenectvĂ­ je klĂ­ÄŤovĂ˝m faktorem business ĂşspÄ›chu na CEE i globĂˇlnĂ­m trhu.

---

## AIQ-00031 â€” Prezentace v7.1: Cash-flow, EUR/CZK toggle, trh B2B/B2C, loga, Anthropic

**Status:** CLOSED (2026-04-17)
**Slidy:** `#s-financial` (pĹ™epracovĂˇn), `#s-strategy` (rozĹˇĂ­Ĺ™en), `#s-proposal` (logo), `#s-hopi6` (logo)

### #s-financial â€” novĂˇ struktura (Cash-flow po fĂˇzĂ­ch)

PĹ™echod od statickĂ© investiÄŤnĂ­ tabulky na cash-flow pohled s EUR/CZK toggle:

| FĂˇze | ObdobĂ­ | Popis | Investice | EBITDA |
|------|--------|-------|-----------|--------|
| FĂˇze 1 | M0â€“M24 | InternĂ­ pilot + skupinovĂ˝ rollout | ~â‚¬400K / ~10M KÄŤ | zĂˇpornĂ© (pre-revenue) |
| FĂˇze 2A | M24â€“M36 | PĹ™Ă­prava vstupu na trh | ~â‚¬400K / ~10M KÄŤ | zĂˇpornĂ© (investiÄŤnĂ­) |
| FĂˇze 2B | M36+ | KomerÄŤnĂ­ launch + ĹˇkĂˇlovĂˇnĂ­ | â€” | Y1: â’â‚¬0.15M, Y2: BEP, Y3â€“Y5: zisk |

**EUR/CZK toggle:** primĂˇrnÄ› EUR (1 EUR = 25 KÄŤ). Implementace: `.curr-eur-val` / `.curr-czk-val` tĹ™Ă­dy, JS funkce `toggleFinCurr()`, tlaÄŤĂ­tko v pravĂ©m hornĂ­m rohu slidu. DefaultnĂ­ stav: EUR zobrazeno, CZK skryto.

**KlĂ­ÄŤovĂˇ ÄŤĂ­sla (EUR):**
- CelkovĂˇ investice M0â€“M36: ~â‚¬800K
- BEP: Rok 2 (M48â€“M60)
- KumulativnĂ­ zisk 5 let: ~â‚¬4.8M
- Valuace rok 5 (5Ă— ARR): ~â‚¬19M

### #s-strategy â€” rozĹˇĂ­Ĺ™enĂ­: CĂ­lovĂ˝ trh a filozofie produktu

David zadal (2026-04-17) klĂ­ÄŤovĂ© filozofickĂ© aspekty:

**B2B trh (4 tiery):**
- SMB: rodinnĂ© firmy, menĹˇĂ­ holdingy Â· 10â€“200 uĹľiv. Â· CEE
- Mid-market: skupiny 200â€“1000 uĹľiv. Â· vĂ­ce zemĂ­ Â· multi-entity finance
- Enterprise: korporace 1000+ uĹľiv. Â· white-label SaaS Â· globĂˇlnĂ­ ops
- GlobĂˇlnĂ­ hrĂˇÄŤi: Fortune 500 Â· PE portfolia Â· nejvÄ›tĹˇĂ­ svÄ›tovĂ© skupiny

**B2C trh:**
- RetailovĂˇ klientela Â· aplikace pro domĂˇcĂ­ pouĹľitĂ­ Â· osobnĂ­ produktivita
- RodinnĂ© finance Â· domĂˇcĂ­ AI asistent

**Mobile-first strategie:**
- Telefon jako primĂˇrnĂ­ platforma (office agenda se pĹ™esouvĂˇ na mobil â€” doma i v businessu)
- AppIQ cĂ­lĂ­ na vĹˇechna zaĹ™Ă­zenĂ­, primĂˇrnÄ› smartphone

**Platforma-first filozofie (KLĂŤÄŚOVĂť ASPEKT):**
> VlastnĂ­ AppIQ aplikace (Finance, Operations, HRâ€¦) jsou *sekundĂˇrnĂ­m benefitem*. PrimĂˇrnĂ­m cĂ­lem je vybudovat **kompaktnĂ­ platformu pro rychlou tvorbu aplikacĂ­ vĹˇeho druhu za pomoci AI** â€” aby to vĹŻbec mohlo vznikat.

Toto je zĂˇsadnĂ­ pĹ™eformulovĂˇnĂ­ â€” AppIQ nenĂ­ "jen" enterprise portal, ale **platforma pro AI-nativnĂ­ tvorbu aplikacĂ­** s vlastnĂ­mi aplikacemi jako proof-of-concept.

**StrategickĂ© partnerstvĂ­ â€” Anthropic / Claude AI:**
- Claude Agent = klĂ­ÄŤovĂ˝ development partner (jiĹľ dnes)
- Ambice: formĂˇlnÄ› oslovit Anthropic s nabĂ­dkou partnerstvĂ­
- ZdĹŻvodnÄ›nĂ­: "Kdo se bojĂ­, nesmĂ­ do lesa" â€” AppIQ mĹŻĹľe bĂ˝t ukĂˇzkovĂ˝m use-casem AI-native enterprise platformy celosvÄ›tovĂ©ho dosahu
- Toto je long-shot strategickĂ˝ cĂ­l, ale fundamentĂˇlnÄ› sprĂˇvnĂ˝ smÄ›r

### Loga â€” inline SVG (bez externĂ­ch zĂˇvislostĂ­)

**HOPI TECH (HT monogram):**
- ZelenĂ˝ gradient (#1A6040 â†’ #0A3820)
- HT text, font-weight 900, bĂ­lĂ˝
- UmĂ­stÄ›nĂ­: divize 6 box v #s-hopi6
- RozmÄ›r: 36Ă—36px, border-radius 8

**HOPI AppIQ (Diamond IQ mark):**
- Orange â†’ green gradient (#E8750A â†’ #1A6040)
- Diamond (polygon) shape s "IQ" textem uvnitĹ™
- UmĂ­stÄ›nĂ­: #s-proposal (52Ă—52px), #s-strategy closing box (32Ă—32px)
- RĹŻznĂ© `id` pro linearGradient: `iq-bg` a `iq-bg2` (aby se nepĹ™ekrĂ˝valy)

---

## AIQ-00028 â€” Slide #s-proposal: PodnikatelskĂ˝ zĂˇmÄ›r Davida Gogely

**Status:** CLOSED (2026-04-17)
**Slide:** `#s-proposal` (TOC â…) â€” hned za #s-moment, pĹ™ed TOC

### ZĂˇmÄ›r a kontext
David chce jasnÄ› rĂˇmovat celou prezentaci jako svĹŻj osobnĂ­ podnikatelskĂ˝ zĂˇmÄ›r:
- TĂłn: sebevÄ›domÄ›, ale pokornÄ› â€” "pĹ™inĂˇĹˇĂ­m zĂˇmÄ›r, o rozhodnutĂ­ ĹľĂˇdĂˇm vĂˇs"
- Investor angle: vstupuje osobnÄ› jako investor (kĹŻĹľe na talĂ­Ĺ™i), protoĹľe tomu vÄ›Ĺ™Ă­
- 5 pilĂ­Ĺ™ĹŻ: SilnĂˇ myĹˇlenka + Vize + FunkÄŤnĂ­ prototyp + PlĂˇn + StrategickĂ© partnerstvĂ­ (Claude AI)
- Claude AI / Anthropic explicitnÄ› jmenovĂˇno jako strategickĂ© partnerstvĂ­
- 3 konkrĂ©tnĂ­ ĹľĂˇdosti od majitelĹŻ (souhlas, vznik divize, mandĂˇt vĂ©st)

### KlĂ­ÄŤovĂˇ citace (opening callout)
> "PĹ™inĂˇĹˇĂ­m zĂˇmÄ›r podloĹľenĂ˝ funkÄŤnĂ­m produktem, reĂˇlnĂ˝mi vĂ˝sledky a pĹ™esvÄ›dÄŤenĂ­m, za kterĂ© jsem ochoten ruÄŤit i osobnÄ› â€” jako investor. O rozhodnutĂ­ ĹľĂˇdĂˇm vĂˇs jako majitele. O mandĂˇt vĂ©st ji â€” ĹľĂˇdĂˇm jako ÄŤlovÄ›k, kterĂ˝ ji postavil."

---

## AIQ-00029 â€” Slide #s-financial: FinanÄŤnĂ­ rozvaha zĂˇmÄ›ru (slide 0F)

**Status:** CLOSED (2026-04-17)
**Slide:** `#s-financial` (TOC 0F) â€” za #s-proposal, pĹ™ed TOC

### FinanÄŤnĂ­ model â€” pĹ™edpoklady
- **Cena:** 90 tis. CZK / zĂˇkaznĂ­k / mÄ›sĂ­c (avg, Enterprise SaaS pro holding skupiny)
- **Investice M0â€“M36:** ~20M CZK celkem (3M + 7M + 10M po fĂˇzĂ­ch)
- **David osobnÄ›:** 2M CZK seed investice

### 5letĂˇ projekce (od M36 komerÄŤnĂ­ho launche)
| Rok | ZĂˇkaznĂ­ci | TrĹľby | EBITDA | Zisk po dani |
|-----|-----------|-------|--------|-------------|
| 1 (M36â€“M48) | 3 | 3.2M CZK | â’3.8M | â’3.8M |
| 2 (M48â€“M60) | 10 | 10.8M CZK | ~BEP | â’0.2M |
| 3 (M60â€“M72) | 25 | 27M CZK | +13M | +10M |
| 4 (M72â€“M84) | 50 | 54M CZK | +36M | +29M |
| 5 (M84â€“M96) | 90 | 97M CZK | +74M | +60M |

**Summary:** ~20M CZK investice Â· BEP Rok 2 Â· ~120M CZK kumulativnĂ­ zisk 5 let Â· ~485M CZK valuace rok 5 (5Ă— ARR)
ÄŚĂ­sla jsou konzervativnĂ­ projekce k diskusi â€” zĂˇmÄ›rnÄ›.

---

## AIQ-00019 â€” Slide s-hopi6: AppIQ jako 6. divize HOPI

**Status:** CLOSED (2026-04-17)
**Slide:** `#s-hopi6` v PORTAL_PRESENTATION.html

### VĂ˝voj struktury
- PĹŻvodnÄ› navrĹľeny 3 etapy â†’ David rozĹˇĂ­Ĺ™il na 6 â†’ pak na 7 etap (split etapy 2 na dvÄ›).
- FinĂˇlnĂ­ poÄŤet etap: **7**.

### 7 etap â€” finĂˇlnĂ­ struktura

| # | NĂˇzev | UĹľivatelĂ© | TrvĂˇnĂ­ (+M) | ÎŁ od startu | PoznĂˇmka |
|---|-------|-----------|-------------|-------------|----------|
| 1 | Pilot FI-CO | ~35 | +2M | M2 | Group Controlling, probĂ­hĂˇ |
| 2 | FINANCE â€” Accounting & Taxes / Controlling / Treasury | ~50 | +3M | M5 | InternĂ­ Finance HOPI Holding |
| 3 | FINANCE / LEGAL / PURCHASING | ~75 | +2M | M7 | RozĹˇĂ­Ĺ™enĂ­ mimo core Finance |
| 4 | Go-live â€” HOPI Holding | ~200 | +5M | M12 | CelĂˇ mateĹ™skĂˇ spoleÄŤnost |
| 5 | Roll-out â€” HOPI Group (dceĹ™inĂ© spoleÄŤnosti) | 500+ | +12M | **M24** | **MILESTONE 1** â€” internĂ­ rollout skupiny (~2 roky) |
| 6 | Spin-off â€” HOPI TechIQ s.r.o. | â€” | +12M | **M24** | **SOUBÄšĹ˝NÄš s fĂˇzĂ­ 5** â€” startuje M12, konÄŤĂ­ M24 |
| 7 | KomerÄŤnĂ­ SaaS â€” globĂˇlnĂ­ trh | âž | +12M | **M36** | Prep od M18; launch po M24; **MILESTONE 2** (~3 roky) |

**KlĂ­ÄŤovĂ© rozhodnutĂ­ o soubÄ›Ĺľnosti (David, 2026-04-17):**
- FĂˇze 5+6 probĂ­hajĂ­ **paralelnÄ›** (M12â€“M24) â€” fĂˇze 6 je prĂˇvnĂ­/korporitnĂ­, nezĂˇvisĂ­ na dokonÄŤenĂ­ fĂˇze 5
- FĂˇze 7 technickĂˇ pĹ™Ă­prava startuje od M18 soubÄ›ĹľnÄ› s fĂˇzemi 5+6
- VĂ˝sledek: MILESTONE 2 = M36 (~3 roky) mĂ­sto M54 â€” Ăşspora ~18 mÄ›sĂ­cĹŻ
- **CelkovĂˇ dĂ©lka (sekvenÄŤnĂ­): M12 â†’ M36 pro comerciĂˇlnĂ­ launch = ~3 roky od startu projektu**

**GlobĂˇlnĂ­ trh** (ne pouze CEE) â€” David upĹ™esnil 2026-04-17. FĂˇze 7 = global, CEE jako prvnĂ­ trh.

### OIL badge systĂ©m (implementovĂˇno 2026-04-17)
Slidy prezentace obsahujĂ­ malĂ˝ oranĹľovĂ˝ badge `AIQ-NNNNN` v sekci-labelu nebo eyebrow oblasti.
Badge je klikatelnĂ˝ pro vĂ˝bÄ›r textu (user-select:all). SlouĹľĂ­ k navigaci: slide â†’ OIL task â†’ OIL_CONTEXT.md.

| Slide | Badge | OIL task |
|-------|-------|----------|
| #s00c | AIQ-00014 | Platform Architecture â€” dva streamy |
| #s-hopi6 | AIQ-00019 | AppIQ jako 6. divize HOPI (tento kontext) |
| #s25 | AIQ-00015 | AppIQ Studio â€” TOC + stub |
| #s-strategy (0E) | AIQ-00027 | StrategickĂ˝ slide â€” diverzifikace rizika, globĂˇlnĂ­ trh |

### KlĂ­ÄŤovĂ© strategickĂ© poznĂˇmky (od Davida, 2026-04-17)

**FĂˇze 1â€“4 â€” HOLDING-DRIVEN:**
- Funkce jsou nasazovĂˇny prĹŻĹ™ezovÄ› tam, kde mĂˇ mateĹ™skĂˇ spoleÄŤnost interakci s dceĹ™inĂ˝mi spoleÄŤnostmi.
- TlaÄŤeno z pozice holdingu â€” ne z pozice jednotlivĂ˝ch divisĂ­.
- **KlĂ­ÄŤovĂˇ poznĂˇmka:** MĂˇ obrovskĂ˝ vliv na efektivitu celĂ©ho holdingu jako mateĹ™skĂ© spoleÄŤnosti z pohledu Ĺ™Ă­zenĂ­ divize skupiny.

**FĂˇze 5 â€” DCERY:**
- Roll-out do internĂ­ch organizacĂ­ dceĹ™inĂ˝ch spoleÄŤnostĂ­ skupiny HOPI.
- NejdelĹˇĂ­ fĂˇze â€” 500+ uĹľivatelĹŻ, ~30 spoleÄŤnostĂ­, 8 zemĂ­, 9 jazykĹŻ.

### NĂˇzev firmy â€” spin-off (etapa 6)
- FinĂˇlnĂ­ volba: **HOPI TechIQ s.r.o.**
- ZamĂ­tnutĂ© alternativy: AppIQ s.r.o., HOPI Digital s.r.o., Orbiq s.r.o., Nexora s.r.o., IntelliCore s.r.o.

### KlĂ­ÄŤovĂ˝ argument (slide)
> Jednou z cest, jak budovat technologicky profilovanou skupinu HOPI â€” vedle technologiĂ­ nasazovanĂ˝ch v odvÄ›tvĂ­ch jako Foods nebo Supply Chain â€” bylo koupit start-up nebo firmu s produktem, kterĂ˝ by se dal dĂˇle rozvĂ­jet. AppIQ je lepĹˇĂ­ alternativa: produkt vznikĂˇ pĹ™Ă­mo na provozu skupiny, okamĹľitÄ› se validuje, technologickĂ© IP zĹŻstĂˇvĂˇ 100 % v HOPI a vĂ˝sledkem je vlastnĂ­ tech divize s komerÄŤnĂ­m potenciĂˇlem â€” bez akviziÄŤnĂ­ho rizika a za zlomek ceny.

---

## AIQ-00014 â€” Slide s00c: Platform Architecture (dva streamy)

**Status:** CLOSED (2026-04-17)
**Slide:** `#s00c` v PORTAL_PRESENTATION.html

### Kontext
- Vizualizuje dva streamy: WEB STREAM (AppIQ Studio) a APP STREAM (Runtime aplikace).
- Zobrazuje expanznĂ­ cestu: Finance â†’ Operations â†’ Purchasing â†’ HR â†’ SaaS.
- Obsahuje odkaz na GitHub Pages live URL.

---

## AIQ-00026 â€” GitHub Pages deployment

**Status:** CLOSED (2026-04-17)
**URL:** `https://h-gr-fico.github.io/appiq/`

### Kontext
- `_deploy/` sloĹľka â€” self-contained copy prezentace pro sdĂ­lenĂ­ jako single URL.
- Logo PNG muselo bĂ˝t zkopĂ­rovĂˇno do `_deploy/app/` (externĂ­ zĂˇvislost mimo HTML).
- GitHub web UI neumĂ­ spolehlivÄ› nahrĂˇt podsloĹľky drag&drop â€” nutnĂ© vytvoĹ™it `app/index.html` pĹ™es "Create new file" s typem cestu `app/index.html`.
- SharePoint hosting byl zamĂ­tnut jako nevyhovujĂ­cĂ­ pro single-URL sdĂ­lenĂ­.

---

## AIQ-00018 â€” Ambient music (Web Audio API)

**Status:** CLOSED (2026-04-17)

### Kontext
- ProcedurĂˇlnĂ­ A-minor chord pad pĹ™es Web Audio API (7 hlasĹŻ: 55, 110, 130.8, 165, 196, 220, 261.6 Hz).
- LFO modulace, delay/reverb chain, fade in/out.
- **Auto-start na prvnĂ­ interakci** (click/scroll/keydown) â€” browser policy neumoĹľĹuje autoplay bez interakce.
- Opt-out: localStorage key `appiq_music_pref = '0'` zabrĂˇnĂ­ auto-startu.
- TlaÄŤĂ­tko v navigaci s animovanĂ˝mi vlnkami.

---

## AIQ-00027 â€” StrategickĂ˝ slide: AppIQ v rozvoji skupiny HOPI

**Status:** CLOSED (2026-04-17)
**Slide:** `#s-strategy` (TOC 0D, navazuje na `#s-hopi6`)

### ÄŚtyĹ™i pilĂ­Ĺ™e strategickĂ©ho slidu (zadal David, 2026-04-17)

**1. Jak AppIQ zapadĂˇ do rozvoje skupiny HOPI**
- PrĹŻĹ™ezovĂˇ platforma â€” propojuje vĹˇechny divize na jednotnĂ˝ technologickĂ˝ zĂˇklad.
- NenĂ­ product jednĂ© divize â€” je to infrastruktura celĂ© skupiny.
- Analogie: HOPI mĂˇ logistiku jako prĹŻĹ™ezovou kompetenci â†’ AppIQ je technologickĂˇ prĹŻĹ™ezovĂˇ kompetence.

**2. Diverzifikace rizika skupiny**
- HOPI funguje v odvÄ›tvĂ­ch s cyklickĂ˝mi riziky (zemÄ›dÄ›lstvĂ­, potraviny, logistika).
- AppIQ pĹ™idĂˇvĂˇ technologickĂ˝ byznys s jinĂ˝m rizikovĂ˝m profilem â€” SaaS, ĹˇkĂˇlovatelnĂ˝, nĂ­zkĂ© marginĂˇlnĂ­ nĂˇklady.
- TechnologickĂˇ platforma jako novĂ˝ zdroj hodnoty â€” vedle odvÄ›tvovĂ˝ch byznysĹŻ.

**3. PropojenĂ­ vĹˇech divizĂ­ na modernĂ­ AI technologie**
- JednotnĂˇ platforma mĂ­sto sila â€” Finance, Operations, Purchasing, HR, Management.
- AI asistence cross-company â€” jeden model nasazovanĂ˝ napĹ™Ă­ÄŤ divizemi.
- SdĂ­lenĂˇ data, sdĂ­lenĂ© reporty, sdĂ­lenĂˇ inteligence.

**4. GlobĂˇlnĂ­ trĹľnĂ­ potenciĂˇl**
- Produkt validovanĂ˝ na skuteÄŤnĂ©m provozu velkĂ© skupiny (HOPI Group â€” 8 zemĂ­, 30+ spol.).
- CEE jako prvnĂ­ trh, ale produkt je globĂˇlnÄ› ĹˇkĂˇlovatelnĂ˝.
- White-label SaaS: kaĹľdĂˇ holding skupina mĹŻĹľe dostat vlastnĂ­ nasazenĂ­.
- Nejde o lokĂˇlnĂ­ niche â€” jde o globĂˇlnĂ­ adresovatelnĂ˝ trh (Enterprise SaaS pro holdingovĂ© skupiny).

### Jak pĹ™esvÄ›dÄŤit majitele â€” klĂ­ÄŤovĂ© argumenty (David, 2026-04-17)

**Kontext:** Majitel (vlastnĂ­k skupiny HOPI) musĂ­ rozhodnout o HOPI TECHNOLOGY divizi. Toto je kritickĂ© rozhodnutĂ­ â€” bez souhlasu majitele se nelze pohnout do fĂˇze 5+.

**Argument 1 â€” Diversifikace rizika skupiny:**
> "HOPI pĹŻsobĂ­ v odvÄ›tvĂ­ch s cyklickĂ˝mi riziky (zemÄ›dÄ›lstvĂ­, potraviny, logistika). HOPI TECHNOLOGY pĹ™idĂˇvĂˇ byznys s odliĹˇnĂ˝m rizikovĂ˝m profilem â€” SaaS ekonomika, nĂ­zkĂ© marginĂˇlnĂ­ nĂˇklady, ĹˇkĂˇlovatelnĂ˝ vĂ˝nos. NesniĹľuje to stĂˇvajĂ­cĂ­ byznys, pĹ™idĂˇvĂˇ novĂ˝ pilĂ­Ĺ™."

**Argument 2 â€” In-house mĂ­sto akvizice:**
> "Alternativou bylo koupit tech firmu nebo startup s produktem. Cena: 50Mâ€“500M+ KÄŤ + akvizÄŤnĂ­ prĂ©mie + integraÄŤnĂ­ nĂˇklady. AppIQ vznikl zevnitĹ™ na provozu skupiny. IP je 100 % HOPI. NĂˇklady: zlomek akvizice. Riziko: nulovĂ© oproti akvizici."

**Argument 3 â€” DĹŻkaz funguje, ne teorie:**
> "FĂˇze 1â€“4 nejsou pitch deck. Jsou to reĂˇlnĂ© vĂ˝sledky: Holding live, X uĹľivatelĹŻ, X procesĹŻ zautomatizovĂˇno. To je nejsilnÄ›jĹˇĂ­ argument â€” ne co plĂˇnujeme, ale co jsme postavili."

**Argument 4 â€” Timing â€” momentum:**
> "Technologie se mÄ›nĂ­ rychle. Okno pro budovĂˇnĂ­ AI-native enterprise platformy je otevĹ™enĂ© teÄŹ. Za 3 roky bude plnĂ© konkurentĹŻ s desĂ­tkami milionĹŻ dolarĹŻ financovĂˇnĂ­. Dnes mĂˇme nĂˇskok: validace na reĂˇlnĂ©m provozu velkĂ© skupiny â€” to nikdo z CEE nemĂˇ."

**Argument 5 â€” 6. pilĂ­Ĺ™ skupiny, ne exit:**
> "HOPI TECHNOLOGY zĹŻstĂˇvĂˇ souÄŤĂˇstĂ­ skupiny. NenĂ­ to exit ani prodej. Je to novĂ˝ byznys stream â€” stejnÄ› jako FOODS nebo SERVICES â€” s tĂ­m rozdĂ­lem, Ĺľe jeho produkt (AppIQ) propojuje a zesiluje vĹˇechny ostatnĂ­ pilĂ­Ĺ™e skupiny."

### Struktury slidu AIQ-00027
1. Titulek: "HOPI TECHNOLOGY â€” proÄŤ teÄŹ a proÄŤ zevnitĹ™"
2. Grid 5+1 (stĂˇvajĂ­cĂ­ divize + TECHNOLOGY) â€” pĹ™ebrat z #s-hopi6
3. 4 argumenty pro majitele (boxy/callouts)
4. Timeline: fĂˇze 1-4 = proof, fĂˇze 5-7 = scale
5. ZĂˇvÄ›reÄŤnĂ˝ callout: "AppIQ je nosnĂ˝ produkt HOPI TechIQ s.r.o. â€” prvnĂ­ produkt novĂ© divize TECHNOLOGY"

### Vazby na ostatnĂ­ slidy
- Navazuje na: `#s-hopi6` (AIQ-00019) â€” 7-etapovĂ˝ zĂˇmÄ›r + timeline
- Navazuje na: `#s00c` (AIQ-00014) â€” architektura platformy
- Slide badge: `AIQ-00027`
- Viz takĂ©: OIL_MAP.md sekce 4 (vazby ĂşkolĹŻ)

---

## AIQ-00013 â€” PORTAL_ARCHITECTURE.md BLOK 8

**Status:** CLOSED (2026-04-17)

### Kontext
- BLOK 8 = AppIQ Studio architektura (6 Functional Centers: FC-1 Hub, FC-2 Runtime, FC-3 Dev, FC-4 Test, FC-5 Admin, FC-6 Promo+Docs).
- Dva streamy APP/WEB dokumentovĂˇny.
- GitHub Pages hosting v BLOK 8.7.
- Verze PORTAL_ARCHITECTURE.md povĂ˝Ĺˇena 0.1 â†’ 0.2.

---

## Cluster DOC-A â€” FC-7 Documentation Center (shell)

---

## AIQ-00049 â€” FC-7 Documentation Center: shell (docs/index.html)

**Datum:** 2026-04-18 | **Status:** REVIEW | **Priorita:** HIGH | **Assignee:** Claude
**taskType:** development | **effort:** S (30 minâ€“2 h) | **estimatedTime:** 60 min | **actualTime:** 45 min

### ZĂˇmÄ›r a kontext

David poĹľadoval novĂ© Functional Center FC-7 Documentation Center â€” samostatnou strĂˇnku `docs/index.html` v AppIQ Studiu. Jde o pĹ™edpoklad (prerekvizitu) pro vĹˇechny dokumentaÄŤnĂ­ Ăşkoly (AIQ-00050â€“00063). FC-7 musĂ­ bĂ˝t funkÄŤnĂ­ jako prĂˇzdnĂ˝ shell s navigacĂ­ pĹ™ed tĂ­m, neĹľ se zaÄŤnou plnit obsahem.

### UmĂ­stÄ›nĂ­ v architektuĹ™e

| FC | Cesta | Popis |
|----|-------|-------|
| FC-1 | `Development/index.html` | Studio Hub |
| FC-2 | `HOPI_AppIQ/Development/index.html` | Runtime |
| FC-3 | `Development/dev/index.html` | Dev Center |
| FC-4 | `Development/test/index.html` | Test Center |
| FC-5 | `Development/admin/index.html` | Admin Center |
| FC-6 | `Development/promo/index.html` | Promo Web |
| **FC-7** | **`Development/docs/index.html`** | **Documentation Center** â† novĂ˝ |

### OdsouhlasenĂˇ struktura FC-7 â€” 3 zĂˇloĹľky

| Tab | ID | Obsah |
|-----|-----|-------|
| đź“‹ Tech Spec | `#pane-tech` | Technical Specification (TS-1 aĹľ TS-6) |
| đź“Š Business Spec | `#pane-biz` | Business Specification (BS-1 aĹľ BS-4) |
| đź“ Diagramy | `#pane-diag` | Graphical Documentation (GD-1 aĹľ GD-4) |

### TechnickĂˇ rozhodnutĂ­

- StejnĂ˝ vizuĂˇlnĂ­ styl jako ostatnĂ­ FC (tmavĂ© pozadĂ­, zelenĂˇ akcentnĂ­ barva `#1A6040`)
- Nav odkaz z Studio Hubu (FC-1) pĹ™idat jako novou kartu `đź“š Docs`
- `_i18n.js` integrace: `data-i18n` markup, CZ/EN lang-switch v nav
- ÄŚistĂ˝ HTML/JS, ĹľĂˇdnĂ© build tooly â€” konzistentnĂ­ s ostatnĂ­mi FC
- Mermaid.js CDN skript pro tab Diagramy (lazy load jen pĹ™i aktivaci tabu)

### ZĂˇvislosti

- MusĂ­ bĂ˝t hotovĂ© pĹ™ed: AIQ-00050â€“00063 (vĹˇechny dokumentaÄŤnĂ­ sekce)
- Navazuje na: FC-1 Hub (pĹ™idat nav kartu), `_i18n.js` (pĹ™idat klĂ­ÄŤe pro doc centrum)
- ARCH_MAP.md: pĹ™idat FC-7 a zĂˇloĹľky jako novĂ© objekty

### Implementace (v7.17 â€” 2026-04-18)

**Co bylo vytvoĹ™eno:**
- `docs/index.html` â€” plnÄ› funkÄŤnĂ­ FC-7 shell (~950 Ĺ™ĂˇdkĹŻ)
- `DOCS_CONFIG` JS objekt jako single source of truth (fcs, domains, phases, stack, integrations, roles, localStorage, oilSchema â€” 20 polĂ­)
- 3 zĂˇloĹľky: Tech Spec (TS-1..TS-6), Business Spec (BS-1..BS-4), Diagramy (GD-1..GD-4)
- Live data: fetch `OIL.json` (stats TS-3 a BS-1), `I18n.coverage()` pro i18n pokrytĂ­, `PREZ_VERSION` v nav
- Lazy Mermaid.js â€” naÄŤĂ­tĂˇ se aĹľ pĹ™i otevĹ™enĂ­ zĂˇloĹľky Diagramy
- Archive mode: detekce pĹ™es `../VERSION.txt`, fallback OIL.json pĹ™es `../OIL.json`, release notes z `../CHANGELOG.md`
- ArchivnĂ­ panel v TS-1 (verze, datum, session ID, CHANGELOG excerpt se syntax coloring)
- FC-7 karta pĹ™idĂˇna do Studio Hub â€” barva `#26c6da`, chip ACTIVE
- `_i18n.js`: 2 novĂ© klĂ­ÄŤe `card.docs.name` + `card.docs.desc` (CS + EN)

**KlĂ­ÄŤovĂ© technickĂ© rozhodnutĂ­:**
- `DOCS_CONFIG._version` ÄŤte `PREZ_VERSION` z `_ver.js` pĹ™i init â†’ verze baked-in pĹ™i archivaci
- `_oilSource` global: `'live' | 'archive' | 'cache' | null` â†’ indikĂˇtor zdroje dat v TS-3
- `I18n.langs()` (ne `allLangs()` â€” neexistuje) pro vĂ˝ÄŤet jazykĹŻ

---

## Cluster DOC-B â€” Technical Specification (TS-1 aĹľ TS-6)

### Kontext clusteru

CĂ­lovĂˇ skupina: **IT tĂ˝m** â€” internĂ­ IT HOPI + potenciĂˇlnĂ­ integraÄŤnĂ­ partneĹ™i (ARTIN, INTECS). Obsah musĂ­ bĂ˝t pĹ™esnĂ˝, kompletnĂ­ a strukturovanĂ˝ pro technickĂ© ÄŤtenĂ­. Popis stĂˇvajĂ­cĂ­ho stavu (Phase 0) s vĂ˝hledem na integraci (Phase 1+).

Dokumentace nemĂˇ build tooly â€” ÄŤistĂ˝ HTML/JS, inline styling konzistentnĂ­ s projektem. Zdrojem pravdy jsou: `PORTAL_ARCHITECTURE.md`, `ARCH_MAP.md`, `_ver.js`, aktuĂˇlnĂ­ kĂłd souborĹŻ.

### Rozsah Technical Spec

| Sekce | KĂłd | Obsah |
|-------|-----|-------|
| TS-1 | Platform Overview | Co je AppIQ, dva streamy, FC architektura, Phase 0 scope |
| TS-2 | Technology Stack | HTML5/CSS3/JS (vanilla), Web Audio, `_i18n.js`, `_ver.js`, Mermaid |
| TS-3 | Data Layer | JSON schĂ©mata (OIL.json), localStorage klĂ­ÄŤe, datovĂ© toky |
| TS-4 | Integration Points | SAP, BNS, SharePoint, Power BI (ARTIN/INTECS), Auth model |
| TS-5 | Deployment Guide | GitHub Pages, AUTO_ARCHIVE.bat, DO_DEPLOY.ps1, struktura sloĹľek |
| TS-6 | Security + Extension | Phase 0 no-auth model, Phase 1 auth plĂˇn, jak pĹ™idat modul |

---

## AIQ-00050 â€” TS-1: Platform Overview

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED | **Assignee:** Claude
**taskType:** docs | **effort:** M (2â€“4 h) | **estimatedTime:** 180 min

### Obsah sekce

1. **Co je HOPI AppIQ** â€” definice, ĂşÄŤel, cĂ­lovĂˇ skupina (HOPI Group â†’ SaaS)
2. **Dva streamy** â€” APP (Finance portal SPA) vs. WEB (AppIQ Studio)
3. **FC architektura** â€” tabulka FC-1 aĹľ FC-7 s cestami, popisy, statusy
4. **Phase 0 scope** â€” co je hotovĂ©, co je planned, co je out-of-scope
5. **VerzovĂˇnĂ­** â€” `_ver.js`, PREZ_VERSION, konvence v7.xx
6. **KomunikaÄŤnĂ­ architektura** â€” jak FC spolu komunikujĂ­ (localStorage, shared JS)

### KlĂ­ÄŤovĂˇ rozhodnutĂ­

> Pure JS, ĹľĂˇdnĂ© frameworky â€” zĂˇmÄ›rnĂ© pro pĹ™enositelnost a jednoduchost.
> Phase 0 = no external dependencies beyond CDN Mermaid â€” vĹˇe funguje offline (OneDrive).
> VersionovĂˇnĂ­ je PREZ_VERSION (prezentaÄŤnĂ­) + APP-VERSION â€” odliĹˇnĂ© pro dva streamy.

---

## AIQ-00051 â€” TS-2: Technology Stack

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED | **Assignee:** Claude
**taskType:** docs | **effort:** S (30 minâ€“2 h) | **estimatedTime:** 90 min

### Obsah sekce

1. **Core technologie** â€” HTML5, CSS3, Vanilla JS (ES6+), ĹľĂˇdnĂ© build tooly
2. **KlĂ­ÄŤovĂ© soubory** â€” `_i18n.js` (i18n), `_ver.js` (verzovĂˇnĂ­), `RESPONSIVE_DATA.js` (responsivita)
3. **Mermaid.js** â€” CDN, verze, pouĹľitĂ­ pro diagramy v FC-7
4. **Web Audio API** â€” ambient music v prezentaci
5. **Storage** â€” localStorage klĂ­ÄŤe (tabulka: klĂ­ÄŤ, typ, ĂşÄŤel, scope)
6. **Canvas API** â€” particle efekty v prezentaci
7. **VĂ˝vojovĂ© prostĹ™edĂ­** â€” VS Code + Claude Code CLI, OneDrive sync

### localStorage klĂ­ÄŤe (dokumentovat)

| KlĂ­ÄŤ | Typ | ĂšÄŤel | Scope |
|------|-----|------|-------|
| `hopi_lang` | string (cs/en) | AktivnĂ­ jazyk | VĹˇechny FC |
| `appiq_music_pref` | string (0/1) | Hudba on/off | Prezentace |
| `gc_lang_v1` | string (cz/en/...) | Jazyk Finance portĂˇlu | APP stream |

---

## AIQ-00052 â€” TS-3: Data Layer

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED | **Assignee:** Claude
**taskType:** docs | **effort:** M (2â€“4 h) | **estimatedTime:** 150 min

### Obsah sekce

1. **OIL.json schĂ©ma** â€” kompletnĂ­ pole, typy, enumy (status, priority, taskType, effort, domain)
2. **_status.json** â€” schĂ©ma stavovĂ©ho souboru (verze, datum, stav, poznĂˇmky)
3. **DatovĂ© toky** â€” kdo ÄŤte/pĂ­Ĺˇe jakĂ˝ soubor (diagram nebo tabulka)
4. **Fetch pattern** â€” jak Admin Center naÄŤĂ­tĂˇ OIL.json, error handling
5. **RozĹˇĂ­Ĺ™enĂ­ schĂ©matu** â€” jak sprĂˇvnÄ› pĹ™idat novĂ© pole do OIL.json (konvence null defaulty)
6. **BudoucĂ­ datovĂˇ vrstva** â€” Phase 1 plĂˇn (API backend, DB)

### OIL.json klĂ­ÄŤovĂˇ pole (dokumentovat)

| Pole | Typ | Enum hodnoty | PovinnĂ© |
|------|-----|-------------|---------|
| `id` | string | AIQ-NNNNN | âś… |
| `title` | string | â€” | âś… |
| `status` | string | OPEN, IN PROGRESS, REVIEW, CLOSED, CANCELLED | âś… |
| `priority` | string | HIGH, MED, LOW | âś… |
| `taskType` | string | development, fix, content, design, review, approval, test, release, archive, research, docs | âś… od v7.15 |
| `effort` | string | XS, S, M, L, XL | âś… od v7.15 |
| `estimatedTime` | number (min) | â€” | âś… od v7.15 |
| `actualTime` | number (min) \| null | â€” | âś… od v7.15 |
| `assignee` | string | Claude, David Gogela | âś… |
| `domain` | string | Studio, Finance, Platform, ... | âś… |

---

## AIQ-00053 â€” TS-4: Integration Points

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED | **Assignee:** Claude
**taskType:** docs | **effort:** M (2â€“4 h) | **estimatedTime:** 150 min

### Obsah sekce

NejdĹŻleĹľitÄ›jĹˇĂ­ sekce pro IT tĂ˝m pĹ™ed prvnĂ­ integracĂ­. Popis aktuĂˇlnĂ­ho stavu (Phase 0 = ĹľĂˇdnĂ© ĹľivĂ© integrace) a plĂˇnu pro Phase 1+.

1. **SAP** â€” data potĹ™ebnĂˇ pro Finance modul (GL, cost centers, reporting), pĹ™Ă­stup (API/BAPI/OData), kontext HOPI SAP instance
2. **BNS (Business Navigator System)** â€” reporting systĂ©m HOPI, datovĂ© vĂ˝stupy, moĹľnĂ˝ import/export
3. **SharePoint** â€” sdĂ­lenĂ­ dokumentĹŻ, moĹľnĂˇ autentizace pĹ™es MS identity
4. **Power BI** â€” ARTIN + INTECS piloty (AI FINCO PBI Designer + Analyser), Power BI Embedded, RLS
5. **Autentizace** â€” Phase 0: password overlay (local), Phase 1 plĂˇn: SSO / MS Entra ID / HOPI AD
6. **API konvence** â€” nĂˇvrh REST struktury pro Phase 1 backend

### KlĂ­ÄŤovĂ© rozhodnutĂ­

> Phase 0 zĂˇmÄ›rnÄ› bez ĹľivĂ˝ch integracĂ­ â€” vĹˇe mockovanĂ© nebo ruÄŤnÄ› zadanĂ©. CĂ­l Phase 0 = UI/UX validace, ne datovĂˇ integrace. Integrace Ĺ™eĹˇĂ­ Phase 1.
> Dokumentace Phase 0 stavu je vstupem pro RFP/specifikaci pro ARTIN a INTECS.

### ZĂˇvislosti

- Koordinovat s AIQ-00032 (ARTIN/INTECS partnerstvĂ­ â€” kontext integracĂ­)
- Tato sekce je podkladem pro AI FINCO PBI pilot diskuse

---

## AIQ-00054 â€” TS-5: Deployment Guide

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED | **Assignee:** Claude
**taskType:** docs | **effort:** M (2â€“4 h) | **estimatedTime:** 180 min

### Obsah sekce

1. **VĂ˝vojovĂ© prostĹ™edĂ­** â€” sloĹľka OneDrive, VS Code, Claude Code CLI, ĹľivĂ˝ nĂˇhled (Live Server nebo pĹ™Ă­mĂ© otevĹ™enĂ­)
2. **Struktura sloĹľek** â€” kompletnĂ­ strom projektu s popisem kaĹľdĂ© klĂ­ÄŤovĂ© sloĹľky/souboru
3. **VerzovacĂ­ konvence** â€” PREZ_VERSION, session verze (v7.xx), jak aktualizovat `_ver.js`
4. **AUTO_ARCHIVE.bat** â€” postup archivace, kam archivovat, co archivovat
5. **GitHub Pages deployment** â€” DO_DEPLOY.ps1, `h-gr-fico.github.io/appiq/`, ruÄŤnĂ­ kroky
6. **NovĂˇ verze â€” checklist** â€” co udÄ›lat pĹ™i vydĂˇnĂ­ novĂ© verze (OIL, CHANGELOG, BRIEFING, archiv)

### KlĂ­ÄŤovĂˇ rozhodnutĂ­

> Deployment je zĂˇmÄ›rnÄ› manuĂˇlnĂ­ (bat/ps1 skripty) â€” ĹľĂˇdnĂ© CI/CD pipeline v Phase 0.
> GitHub Pages = public hosting prezentace; Finance portĂˇl se **nesnasazuje** na GitHub Pages (internĂ­ nĂˇstroj).

---

## AIQ-00055 â€” TS-6: Security & Extension Guide

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED | **Assignee:** Claude
**taskType:** docs | **effort:** M (2â€“4 h) | **estimatedTime:** 150 min

### Obsah sekce

1. **Phase 0 security model** â€” password overlay (lokĂˇlnĂ­ hash), bez server-side auth, omezenĂ­ a rizika
2. **Phase 1 auth plĂˇn** â€” MS Entra ID / SSO, session management, role-based access
3. **Jak pĹ™idat novĂ˝ modul Finance portĂˇlu** â€” krok po kroku (HTML sekce, nav link, JS init, i18n klĂ­ÄŤe)
4. **Jak pĹ™idat novĂ© Functional Center** â€” template pro novĂ˝ FC (kopie struktury FC-3/FC-4)
5. **Jak rozĹˇĂ­Ĺ™it OIL.json schĂ©ma** â€” konvence (null defaulty, backward compatibility)
6. **i18n â€” jak pĹ™idat pĹ™eklad** â€” odkaz na zĂˇloĹľku Jazyky v Admin Center + postup pĹ™idĂˇnĂ­ jazyka do `_i18n.js`

### KlĂ­ÄŤovĂ© rozhodnutĂ­

> Security v Phase 0 je vÄ›domĂ˝ kompromis â€” dokument to musĂ­ jasnÄ› Ĺ™Ă­ct, ne skrĂ˝t.
> Extension guide je klĂ­ÄŤovĂ˝ pro onboarding novĂ˝ch ÄŤlenĹŻ tĂ˝mu (cĂ­lovĂ˝ ÄŤtenĂˇĹ™: novĂ˝ developer v SEED fĂˇzi).

---

## Cluster DOC-C â€” Business Specification (BS-1 aĹľ BS-4)

### Kontext clusteru

CĂ­lovĂˇ skupina: **vedenĂ­ projektu, stakeholdeĹ™i, management HOPI** â€” ne technici. Obsah je orientovanĂ˝ na hodnotu, business procesy a rozhodnutĂ­, ne na implementaÄŤnĂ­ detaily. Stylem bliĹľĹˇĂ­ executive summary neĹľ technickĂ© dokumentaci.

Zdrojem pro obsah jsou: `PORTAL_PRESENTATION.html`, `PERSONAL_PITCH.html`, `OIL_CONTEXT.md`, diskuse v session.

### Rozsah Business Spec

| Sekce | KĂłd | Obsah |
|-------|-----|-------|
| BS-1 | Executive Summary | Co je AppIQ, status, business value, roadmap 1 strana |
| BS-2 | Module Catalog | PĹ™ehled vĹˇech modulĹŻ + aplikacĂ­ (Phase 0 + planned) |
| BS-3 | Deployment Phases | 7 etap (Pilot â†’ SaaS), milnĂ­ky, timeline, odpovÄ›dnosti |
| BS-4 | User Roles & KPIs | Typy uĹľivatelĹŻ, pĹ™Ă­stupovĂˇ prĂˇva, mÄ›Ĺ™itelnĂ© vĂ˝sledky |

---

## AIQ-00056 â€” BS-1: Executive Summary

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED | **Assignee:** Claude
**taskType:** docs | **effort:** S (30 minâ€“2 h) | **estimatedTime:** 90 min

### Obsah sekce

1. **Co je HOPI AppIQ** â€” 3â€“4 vÄ›ty, bez technickĂ©ho Ĺľargonu
2. **AktuĂˇlnĂ­ stav** â€” Phase 0 live, co funguje, kdo pouĹľĂ­vĂˇ
3. **Business value** â€” klĂ­ÄŤovĂ© pĹ™Ă­nosy (Ăşspory, standardizace, AI, ĹˇkĂˇlovĂˇnĂ­)
4. **Roadmap** â€” 3 Ĺ™Ăˇdky: internĂ­ pilot â†’ spin-off â†’ SaaS
5. **KlĂ­ÄŤovĂˇ ÄŤĂ­sla** â€” investice, BEP, valuace (pĹ™ebrat z `#s-financial`)
6. **Kontakt** â€” David Gogela, role, e-mail

### Zdroje obsahu

- `PERSONAL_PITCH.html` â†’ ÄŚĂˇst I Oblast 1 (hodnota), Oblast 2 (valuace)
- `OIL_CONTEXT.md` â†’ AIQ-00019 (7 etap), AIQ-00027 (5 argumentĹŻ pro majitele)
- `#s-financial` â†’ cash-flow tabulka, klĂ­ÄŤovĂˇ ÄŤĂ­sla

---

## AIQ-00057 â€” BS-2: Module Catalog

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED | **Assignee:** Claude
**taskType:** docs | **effort:** S (30 minâ€“2 h) | **estimatedTime:** 90 min

### Obsah sekce

PĹ™ehled vĹˇech modulĹŻ a aplikacĂ­ platformy â€” co existuje (Phase 0), co je plĂˇnovĂˇno.

| DomĂ©na | Modul | Status | Popis |
|--------|-------|--------|-------|
| Finance | Calendar | Phase 0 âś… | FinanÄŤnĂ­ kalendĂˇĹ™ |
| Finance | Tracking | Phase 0 âś… | Tracking kontrolingu |
| Finance | OrgChart | Phase 0 âś… | OrganizaÄŤnĂ­ struktura |
| Finance | Reporting | Phase 0 âś… | PĹ™ehledy a reporty |
| Finance | FX | Phase 0 âś… | Kurzy mÄ›n |
| Finance | SAP | Planned | SAP integrace |
| Finance | BNS | Planned | BNS integrace |
| Finance | SharePoint | Planned | Document store |
| Studio | Hub | Live âś… | Dashboard center |
| Studio | AdminCenter | Live âś… | OIL + Deploy + Kapacita + Jazyky |
| Studio | DevCenter | Live âś… | Arch Map, Responsivita |
| Studio | TestCenter | Live âś… | QA checklisty |
| Studio | PromoWeb | Live âś… | Marketing web |
| Studio | DocsCenter | Planned | Dokumentace (FC-7) |
| Platform | HelpSystem | Phase 0 âś… | 9 jazykovĂ˝ help |
| Platform | ReleaseManager | Phase 0 âś… | Release sprĂˇva |
| Operations | â€” | Planned Phase 1 | Logistika, sklady |
| Purchasing | â€” | Planned Phase 1 | SchvalovacĂ­ workflow |

---

## AIQ-00058 â€” BS-3: Deployment Phases

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED | **Assignee:** Claude
**taskType:** docs | **effort:** S (30 minâ€“2 h) | **estimatedTime:** 60 min

### Obsah sekce

PĹ™ehled 7 etap nasazenĂ­ â€” vizuĂˇlnÄ› pĹ™ehlednĂ˝, orientovanĂ˝ na business rozhodovatelĂ©.

1. **7-etapovĂˇ tabulka** â€” pĹ™ebrat z `OIL_CONTEXT.md AIQ-00019` (viz vĂ˝Ĺˇe v tomto souboru)
2. **MilnĂ­ky a odpovÄ›dnosti** â€” kdo co schvaluje, kdo dodĂˇvĂˇ
3. **FinancovĂˇnĂ­ per fĂˇze** â€” orientaÄŤnĂ­ nĂˇklady, zdroj financovĂˇnĂ­
4. **ZĂˇvislosti** â€” co musĂ­ nastat pĹ™ed kaĹľdou fĂˇzĂ­
5. **Rizika** â€” top 3 rizika per etapa, mitigace

### KlĂ­ÄŤovĂ˝ zdroj

- `OIL_CONTEXT.md` â†’ AIQ-00019 (7 etap detailnÄ›)
- `#s-financial` â†’ cash-flow per fĂˇze
- `PERSONAL_PITCH.html` â†’ ÄŚĂˇst II Oblast 4 (Road mapa)

---

## AIQ-00059 â€” BS-4: User Roles & KPIs

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED | **Assignee:** Claude
**taskType:** docs | **effort:** S (30 minâ€“2 h) | **estimatedTime:** 60 min

### Obsah sekce

1. **Typy uĹľivatelĹŻ** â€” Group Controlling / Finance Manager / Divisional Controller / IT Admin / Executive
2. **PĹ™Ă­stupovĂˇ prĂˇva** (plĂˇnovanĂˇ Phase 1 role-based)
3. **MÄ›Ĺ™itelnĂ© KPIs** â€” co AppIQ zlepĹˇĂ­, jak to zmÄ›Ĺ™it
4. **User journey** â€” jak konkrĂ©tnĂ­ uĹľivatel pracuje s platformou (1 pĹ™Ă­klad)

### KlĂ­ÄŤovĂ© KPIs k dokumentaci

| Oblast | KPI | Baseline | CĂ­l |
|--------|-----|---------|-----|
| Reporting | ÄŚas na sestavenĂ­ mÄ›sĂ­ÄŤnĂ­ho reportu | X h | â’60% |
| Procesy | PoÄŤet manuĂˇlnĂ­ch krokĹŻ v odsouhlasenĂ­ | X | â’80% |
| PĹ™Ă­stupnost | ÄŚas na zĂ­skĂˇnĂ­ dat z SAP/BNS | X h | real-time |
| Compliance | Audit trail pro GDPR | manuĂˇlnĂ­ | automatickĂ˝ |

---

## Cluster DOC-D â€” Graphical Documentation (GD-1 aĹľ GD-4)

### Kontext clusteru

GrafickĂˇ dokumentace musĂ­ slouĹľit **dvÄ›ma skupinĂˇm souÄŤasnÄ›**:
- **VedenĂ­ projektu** â€” vysokoĂşrovĹovĂ˝ pohled, co platforma dÄ›lĂˇ a jak roste
- **Technici** â€” detailnĂ­ pohled na architekturu, datovĂ© toky, integrace

TechnickĂˇ implementace: **Mermaid.js** pro flowcharty a diagramy tokĹŻ (textovĂ© definice = versionovatelnĂ©), **SVG/HTML** pro architekturnĂ­ schĂ©ma (vÄ›tĹˇĂ­ grafickĂˇ kontrola). VĹˇe inline v HTML strĂˇnce, ĹľĂˇdnĂ© obrĂˇzky jako soubory.

### Rozsah Graphical Docs

| Diagram | KĂłd | Typ | Publikum |
|---------|-----|-----|---------|
| Architecture Schema | GD-1 | SVG/HTML | Management + Tech |
| Navigation Flow | GD-2 | Mermaid flowchart | Tech |
| Business Process Diagrams | GD-3 | Mermaid sequence/flowchart | Management + Tech |
| Technical Data Flow | GD-4 | Mermaid flowchart | Tech |

---

## AIQ-00060 â€” GD-1: Architecture Schema (schĂ©ma platformy)

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED | **Assignee:** Claude
**taskType:** design | **effort:** M (2â€“4 h) | **estimatedTime:** 180 min

### ZĂˇmÄ›r

VizuĂˇlnĂ­ schĂ©ma celĂ© platformy â€” statickĂ˝ pĹ™ehled co existuje a jak je to propojeno. PrimĂˇrnÄ› pro management (prvnĂ­ pohled musĂ­ okamĹľitÄ› Ĺ™Ă­ct "co to je"), ale dostateÄŤnÄ› detailnĂ­ pro techniky.

### NavrhovanĂ˝ vizuĂˇlnĂ­ koncept

TĹ™Ă­ĂşrovĹovĂ˝ diagram (vrstvenĂ˝):
```
â”Śâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  UĹ˝IVATELĂ‰  â† Group Controlling / Finance / Execs   â”‚
â”śâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  APPIQ STUDIO  â†  FC-1 Hub  â”‚ FC-3..FC-7 Centers    â”‚
â”śâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  APLIKACE  â† Finance Portal â”‚ Operations â”‚ Purchasing â”‚
â”śâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  PLATFORM  â† i18n â”‚ Auth â”‚ OIL â”‚ Release â”‚ Brand     â”‚
â”śâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  INTEGRACE  â† SAP â”‚ BNS â”‚ SharePoint â”‚ Power BI      â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
```

### TechnickĂˇ implementace

- SVG nebo HTML/CSS grid s barevnĂ˝m kĂłdovĂˇnĂ­m per vrstvu
- ZelenĂˇ = Studio, oranĹľovĂˇ = Aplikace, modrĂˇ = Platform, ĹˇedĂˇ = Integrace
- InteraktivnĂ­: klik na FC otevĹ™e tooltip s popisem (popover nebo title)
- DvÄ› varianty: Management (3 vrstvy, bez detailĹŻ) + Tech (5 vrstev, s detaily) â€” pĹ™epĂ­naÄŤ

### KlĂ­ÄŤovĂ© rozhodnutĂ­

> SchĂ©ma musĂ­ bĂ˝t pochopitelnĂ© bez dalĹˇĂ­ho vysvÄ›tlenĂ­ â€” "self-explaining diagram".
> BarevnĂ© kĂłdovĂˇnĂ­ konzistentnĂ­ s AppIQ Studio UI (zelenĂˇ = brand color).

---

## AIQ-00061 â€” GD-2: Navigation Flow (flow platformy)

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED | **Assignee:** Claude
**taskType:** design | **effort:** S (30 minâ€“2 h) | **estimatedTime:** 90 min

### ZĂˇmÄ›r

Diagram navigaÄŤnĂ­ho toku â€” jak uĹľivatel prochĂˇzĂ­ systĂ©mem od vstupu po akci. PrimĂˇrnÄ› pro techniky (onboarding, testovĂˇnĂ­), ale srozumitelnĂ˝ pro kaĹľdĂ©ho.

### NavrhovanĂ˝ scope

```
Vstup (URL / odkaz) â†’ Promo Web (FC-6)
                     â†“
               Studio Hub (FC-1)
              /    |    |    |    \
           FC-3  FC-4  FC-5  FC-7  Prezentace
                              â†“
                         FC-7 Docs
                        [Tech|Biz|Diag]
                     â†“
           Finance PortĂˇl (FC-2 / APP stream)
                [Login â†’ Moduly]
```

### Implementace (Mermaid)

```mermaid
flowchart TD
  URL[PĹ™Ă­stup] --> PROMO[Promo Web FC-6]
  PROMO --> HUB[Studio Hub FC-1]
  HUB --> DEV[Dev Center FC-3]
  HUB --> TEST[Test Center FC-4]
  HUB --> ADMIN[Admin Center FC-5]
  HUB --> DOCS[Docs Center FC-7]
  HUB --> PREZ[Prezentace]
  HUB --> APP[Finance PortĂˇl FC-2]
  DOCS --> TECH[Tech Spec]
  DOCS --> BIZ[Business Spec]
  DOCS --> DIAG[Diagramy]
  APP --> LOGIN[Password]
  LOGIN --> MODULES[Finance Moduly]
```

---

## AIQ-00062 â€” GD-3: Business Process Diagrams (procesy platformy)

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED | **Assignee:** Claude
**taskType:** design | **effort:** M (2â€“4 h) | **estimatedTime:** 150 min

### ZĂˇmÄ›r

Diagramy klĂ­ÄŤovĂ˝ch business procesĹŻ â€” jak uĹľivatel vykonĂˇvĂˇ prĂˇci v AppIQ. SlouĹľĂ­ managementu pro pochopenĂ­ hodnoty a technikĹŻm pro testovĂˇnĂ­ a integraci.

### Procesy k diagramovĂˇnĂ­

1. **Finance reporting flow** â€” uĹľivatel sestavĂ­ mÄ›sĂ­ÄŤnĂ­ report: pĹ™ihlĂˇsit â†’ Tracking â†’ Reporting â†’ export
2. **OIL workflow** â€” David/Claude zadajĂ­ Ăşkol â†’ IN PROGRESS â†’ REVIEW â†’ CLOSED (aktuĂˇlnĂ­ ĹľivotnĂ­ cyklus)
3. **Release process** â€” novĂˇ verze: vĂ˝voj â†’ archivace â†’ deploy â†’ CHANGELOG update
4. **Onboarding uĹľivatele** â€” novĂ˝ uĹľivatel dostane pĹ™Ă­stup, nastavĂ­ jazyk, projde Help System

### Dual-audience strategie

- **Management verze:** Sequence diagram â€” kdo co dÄ›lĂˇ, kdy, jakĂ˝ vĂ˝sledek
- **Tech verze:** Flowchart â€” detailnĂ­ kroky, podmĂ­nky, error stavy

### Implementace

Mermaid.js sequence diagramy + flowcharty. KaĹľdĂ˝ proces = samostatnĂˇ sekce v tabu Diagramy s pĹ™epĂ­naÄŤem Management/Tech view.

---

## AIQ-00063 â€” GD-4: Technical Data Flow (technickĂ˝ datovĂ˝ tok)

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED | **Assignee:** Claude
**taskType:** design | **effort:** M (2â€“4 h) | **estimatedTime:** 150 min

### ZĂˇmÄ›r

Diagram datovĂ˝ch tokĹŻ â€” jak data proudĂ­ systĂ©mem. KlĂ­ÄŤovĂ˝ dokument pro IT tĂ˝m pĹ™ed integracĂ­ (SAP, BNS, Power BI). OdpovĂ­dĂˇ na: "Kde data vznikajĂ­? Kde se uklĂˇdajĂ­? Kdo je ÄŤte?"

### DatovĂ© toky k dokumentaci

1. **OIL.json flow** â€” Claude edituje â†’ fetch v Admin Center â†’ render v UI â†’ uloĹľenĂ­ zpÄ›t
2. **i18n flow** â€” `_i18n.js` â†’ `hopi_lang` localStorage â†’ vĹˇechny FC render
3. **VerzovacĂ­ flow** â€” `_ver.js` â†’ Studio Hub + Admin Center header
4. **Finance data flow (Phase 0)** â€” ruÄŤnÄ› zadanĂˇ data â†’ localStorage/sessionStorage â†’ moduly
5. **BudoucĂ­ integrace flow (Phase 1)** â€” SAP API â†’ backend â†’ Finance Portal (plĂˇn)

### Mermaid implementace

Flowchart s jasnÄ› odliĹˇenĂ˝mi vrstvami:
- `[Zdroj dat]` â€” zelenĂ© hranatĂ˝ box
- `(ZpracovĂˇnĂ­)` â€” oranĹľovĂ˝ kulatĂ˝ box
- `[(ĂšloĹľiĹˇtÄ›)]` â€” modrĂ˝ vĂˇlec
- `{UI/Render}` â€” ĹˇedĂ˝ kosoÄŤtverec

---

## Cluster RELEASE-A â€” Archive Protocol + Deployment Pipeline

---

## AIQ-00065 â€” Archive Protocol: vĂ˝sledkovĂ˝ modal + ARCHIVE_PROTOCOL.json

**Datum:** 2026-04-18 | **Status:** REVIEW | **Priorita:** HIGH | **Assignee:** Claude
**taskType:** development | **effort:** M (2â€“4 h) | **estimatedTime:** 180 min | **actualTime:** 95 min

### ZĂˇmÄ›r a kontext

David poĹľadoval, aby pĹ™i kaĹľdĂ© archivaci bylo vygenerovĂˇno a zobrazeno:
1. Soupis archivovanĂ˝ch souborĹŻ a komponent s poÄŤtem
2. PorovnĂˇnĂ­ s pĹ™edchozĂ­ verzĂ­ (co pĹ™ibylo, co ubylo, proÄŤ)
3. Status archivace (OK / WARN)
4. Protokol uloĹľenĂ˝ k archivovanĂ© verzi â€” zobrazitelnĂ˝ na GitHub Pages

CĂ­l: **ovÄ›Ĺ™it kompletnost archivace** â€” kaĹľdĂ˝ archiv musĂ­ bĂ˝t provozuschopnĂ˝ ve sprĂˇvnĂ©m stavu.

### OdsouhlasenĂˇ architektura

**DatovĂ˝ soubor:** `ARCHIVE_PROTOCOL.json`
- GenerovĂˇn v `DO_ARCHIVE.ps1` po VERIFY kroku
- UloĹľen do `Archive/{session}/ARCHIVE_PROTOCOL.json` (lokĂˇlnĂ­ archiv)
- UloĹľen do `Release/ARCHIVE_PROTOCOL.json` â†’ pĹ™es `DO_DEPLOY.ps1` na GitHub Pages
- Struktura: `schemaVersion, status, version, session, timestamp, stats, verify, diff, changelog`

**Admin Center:** Po archivaci se automaticky otevĹ™e modal s protokolem â€” status badge, statistiky, verify checklist, diff pills, CHANGELOG excerpt

**GitHub Pages version selector:** TlaÄŤĂ­tko đź“‹ u kaĹľdĂ© verze â†’ modal se stejnou strukturou

### Implementace (v7.19 â€” 2026-04-18)

**`DO_ARCHIVE.ps1` â€” novĂˇ sekce [PROTOCOL]:**
- `Get-ChildItem -Recurse -File` â†’ `totalFiles`, `totalSizeKb`, `byType` (html/js/json/md/mp3/â€¦)
- Verify checklist: kaĹľdĂ˝ soubor z `$webChecks` â†’ `{ file, ok: true/false }`
- Diff: `Sort-Object LastWriteTime -Descending` â†’ pĹ™edchozĂ­ archiv; porovnĂˇnĂ­ map `rel â†’ size`; vĂ˝sledek: `added/removed/changed`
- CHANGELOG excerpt: regex `(?s)(## v{ver}[^\n]*\n.+?)(?=\n## |\n---|\z)` â†’ max 3 000 znakĹŻ
- Status: `OK` pokud `$fail -eq 0`, jinak `WARN`
- ZĂˇpis: `[System.IO.File]::WriteAllText()` â†’ `Archive/{stamp}/ARCHIVE_PROTOCOL.json` + `Release/ARCHIVE_PROTOCOL.json`

**`admin/index.html` â€” Archive Protocol Modal:**
- Po `archiveAt` detekci v polling: `loadArchiveProtocol(s.archiveWeb)`
- Fetch: `../../Archive/{stamp}/ARCHIVE_PROTOCOL.json`
- Render: status badge (zelenĂˇ/oranĹľovĂˇ/ÄŤervenĂˇ), statistickĂ© chipy, verify checklist (âś“/âś—), diff pills (3 barvy), CHANGELOG `<pre>`
- Klik mimo modal = zavĹ™Ă­t

**`_ghpages_root_index.html`:**
- đź“‹ tlaÄŤĂ­tko v latest-card i v history listu
- `openProtocolModal(url, version)` â†’ fetch `protocolUrl` z `versions.json` â†’ stejnĂ˝ render

**`DO_DEPLOY.ps1` + `versions.json`:**
- PĹ™idĂˇno pole `protocolUrl: "v{ver}/HOPI_AppIQ_WebPage/Development/ARCHIVE_PROTOCOL.json"`

### TechnickĂ© detaily

- Diff algoritmus: porovnĂˇnĂ­ soubor â†’ velikost (ne hash) â€” dostaÄŤujĂ­cĂ­ pro completeness check
- PĹ™edchozĂ­ archiv: `Sort-Object LastWriteTime -Descending | Select-Object -First 1` (po vylouÄŤenĂ­ aktuĂˇlnĂ­ho)
- OmezenĂ­ diff zobrazenĂ­: max 12 pills + "+N dalĹˇĂ­ch" badge
- `byType` kategorie: html, js, css, json, md, mp3, png, jpg, svg, ico, txt, ps1, bat â†’ ostatnĂ­ jako `other`


---

## AIQ-00083 â€” Version selector: brand + legacy + CS/EN + hero CTA + changes modal

**Status:** CLOSED Â· Effort: M Â· 2026-04-19 Â· Claude

### Kontext
GitHub Pages version selector (`_ghpages_root_index.html`) byl vylepĹˇen v sĂ©rii iteracĂ­ v session 2026-04-19. PĹŻvodnĂ­ stav: generickĂˇ strĂˇnka s chybnĂ˝m logem, chybÄ›jĂ­cĂ­ historiĂ­ verzĂ­, bez pĹ™epĂ­nĂˇnĂ­ jazykĹŻ.

### Co bylo udÄ›lĂˇno
1. **Brand fix** â€” `.logo-bar` 3px #007d32, `HOPI <span class="app">App</span><span class="iq">IQ</span>` (shodnĂ© s Hub)
2. **v7.12 legacy entry** â€” pĹ™idĂˇn do `versions.json` jako archivnĂ­ zĂˇznam (nemĂˇ versioned sloĹľku, odkazuje na root-level soubory)
3. **CS/EN pĹ™epĂ­naÄŤ** â€” `I18n.setLang()` + `.lang-btn[data-lang]`, `vs.*` klĂ­ÄŤe v `_i18n.js`
4. **Hero CTA tlaÄŤĂ­tko** â€” z `mainUrl`/`mainLabel` v `versions.json`; v7.20 â†’ Studio Hub, v7.12 â†’ Prezentace
5. **Inline changes summary** â€” `changes[]` array v `versions.json`, render jako `.ver-summary-item` bullet body
6. **DetailnĂ­ zmÄ›ny modal** â€” `openChangesModal(version)`, `_changesData` registry, reuse `.gprot-modal` vzoru
7. **i18n klĂ­ÄŤe** â€” `vs.btn.open`, `vs.btn.changes`, `vs.changes.title` v CS+EN

### KlĂ­ÄŤovĂˇ rozhodnutĂ­
- `_changesData` jako globĂˇlnĂ­ JS registry (plnÄ›nĂ˝ pĹ™i render()) â€” modal nepotĹ™ebuje dalĹˇĂ­ fetch
- `mainUrl`/`mainLabel` jsou pole v `versions.json` â€” DO_DEPLOY.ps1 je pĹ™idĂˇ automaticky od v7.21
- v7.12 legacy: nemĂˇ vlastnĂ­ versioned sloĹľku (deploy byl pĹ™ed multi-version strukturou)

---

## AIQ-00084 â€” Admin Center Release tab: _status.js fix (Development + Release + GitHub Pages)

**Status:** CLOSED Â· Effort: S Â· 2026-04-19 Â· Claude

### Kontext
Release zĂˇloĹľka v Admin Center zobrazovala jen pomlÄŤky. PĹ™Ă­ÄŤina: `loadStudioStatus()` pouĹľĂ­val `fetch('../../../_status.json')` â€” fetch je blokovĂˇn na `file://` protokolu (lokĂˇlnĂ­ spuĹˇtÄ›nĂ­). Data se nenaÄŤetla vĹŻbec.

### ĹeĹˇenĂ­: _status.js soubor
StejnĂ˝ vzor jako `_ver.js` â€” soubor generovanĂ˝ skripty, naÄŤĂ­tanĂ˝ jako `<script>` tag (funguje na file://).

**`_status.js`** (novĂ˝, CO_PROJECT root):
```js
window._STUDIO_STATUS = { version, archiveAt, archiveWeb, archiveApp, deployAt, deployCommit, ... };
```

**`admin/index.html`:**
- `<script src="../../../_status.js">` pĹ™ed `_i18n.js`
- `loadStudioStatus()` â€” okamĹľitÄ› renderuje z `window._STUDIO_STATUS`, fetch slouĹľĂ­ jen jako refresh na http

**DO_ARCHIVE.ps1** â€” generuje `_status.js` po zĂˇpisu `_status.json` (`ConvertTo-Json -Compress`)

**DO_DEPLOY.ps1 â€” krok [8b]** (novĂ˝, pĹ™ed git add/commit):
- ÄŚte existujĂ­cĂ­ `_status.json` (archivnĂ­ data)
- SestavĂ­ `$snapStatus` (deployCommit = '' â€” hash jeĹˇtÄ› nenĂ­ znĂˇm)
- ZapĂ­Ĺˇe `$REPO_DIR\$VER_FOLDER\_status.js` â€” dostane se do commitu â†’ GitHub Pages

### ProÄŤ pĹ™ed commitem (krok 8b, ne 10)
Krok 10 pĹ™ichĂˇzĂ­ PO git push â€” pĹ™Ă­liĹˇ pozdÄ› pro zahrnutĂ­ do commitu. Krok 8b je pĹ™ed `git add -A`.

### PokrytĂ­
| ProstĹ™edĂ­ | Soubor | Cesta |
|---|---|---|
| Development (file://) | `$ROOT\_status.js` | `../../../_status.js` âś“ |
| Release (file://) | `$ROOT\_status.js` | `../../../_status.js` âś“ |
| GitHub Pages | `v7.20\_status.js` (v repo) | `../../../_status.js` âś“ |

---

## AIQ-00085 â€” HOPIQ chatbot: Claude API integrace (FĂˇze 1)

**Status:** IN PROGRESS Â· Effort: M Â· 2026-04-19 Â· Claude + David Gogela

### Kontext a motivace

Session 2026-04-19. David Gogela inicioval integraci Clauda jako nativnĂ­ souÄŤĂˇsti HOPI AppIQ ze dvou dĹŻvodĹŻ:
1. **PrezentaÄŤnĂ­** â€” live AI demo pro pitch Group CEO a Group CFO; chatbot musĂ­ fungovat z ĹľivĂ©ho odkazu (GitHub Pages), ne jen lokĂˇlnÄ›
2. **EfektivnostnĂ­** â€” dlouhodobĂ© AI funkce v portĂˇlu (reporting summaries, anomĂˇlie, asistent pro uĹľivatele)

David zastupuje HOPI organizaci â€” veĹˇkerĂˇ rozhodnutĂ­ o infrastruktuĹ™e a externĂ­ch sluĹľbĂˇch jsou rozhodnutĂ­ organizace, ne jednotlivce.

### PrĹŻzkum architektury â€” rozhodovacĂ­ log

**PoĹľadavek:** chatbot dostupnĂ˝ z ĹľivĂ©ho GitHub Pages odkazu (ne jen lokĂˇlnÄ›).

**HodnocenĂ© moĹľnosti:**

| Varianta | Popis | DĹŻvod zamĂ­tnutĂ­ / pĹ™ijetĂ­ |
|---|---|---|
| PĹ™Ă­mĂ© volĂˇnĂ­ Anthropic API z browseru | API klĂ­ÄŤ v JS kĂłdu | âťŚ bezpeÄŤnostnĂ­ riziko, CORS blokovĂˇn |
| LokĂˇlnĂ­ Node.js proxy (localhost:3001) | proxy bÄ›ĹľĂ­ na DavidovÄ› PC | âťŚ nefunguje pro vzdĂˇlenĂ© prohlĂ­ĹľeÄŤe (CEO/CFO) |
| Azure Functions | HOPI mĂˇ Azure, serverless | âš  moĹľnĂ© dlouhodobÄ›, ale sloĹľitÄ›jĹˇĂ­ setup |
| **Cloudflare Workers** | free tier, deploy 5 min, CORS OK | âś… **ZVOLENO** |

**DĹŻvod volby Cloudflare Workers:**
- Free tier: 100 000 requestĹŻ/den â€” pro demo i pilotnĂ­ provoz dostaÄŤujĂ­cĂ­
- Deploy: 5 minut bez nutnosti serveru nebo kreditu
- API klĂ­ÄŤ jako environment secret â€” nikdy nevystaven v kĂłdu
- Funguje jako HTTPS endpoint â€” GitHub Pages mĹŻĹľe volat bez CORS problĂ©mĹŻ
- NevyĹľaduje Azure konfiguraci (rychlejĹˇĂ­ pro FĂˇzi 1)

### PlatebnĂ­ model â€” rozhodnutĂ­

**Claude Code** (David mĂˇ) a **Anthropic API** jsou oddÄ›lenĂ© produkty s oddÄ›lenou fakturacĂ­.

- Claude Code = pĹ™edplatnĂ© (vĂ˝vojovĂ˝ nĂˇstroj)
- Anthropic API = pay-as-you-go (pro vlastnĂ­ aplikace)

Model pro HOPIQ chatbot: **claude-haiku-4-5-20251001**
- Input: $0.80 / 1M tokenĹŻ
- Output: $4.00 / 1M tokenĹŻ
- Jedna zprĂˇva â‰ 500â€“1000 tokenĹŻ â†’ nĂˇklady v jednotkĂˇch centĹŻ
- DoporuÄŤenĂ˝ poÄŤĂˇteÄŤnĂ­ kredit: $10 (vydrĹľĂ­ mÄ›sĂ­ce pro demo + pilotnĂ­ provoz)

RozhodnutĂ­: David zakoupĂ­ API kredit na console.anthropic.com pod firemnĂ­ identitou (dgogela@hopiholding.eu).

### ImplementaÄŤnĂ­ plĂˇn â€” dva bloky

**Blok A (David, ~20 min):**
1. console.anthropic.com â†’ onboarding â†’ API kredit ($10) â†’ vygenerovat API klĂ­ÄŤ
2. cloudflare.com â†’ Create account â†’ Workers & Pages â†’ Create Worker â†’ vloĹľit kĂłd â†’ pĹ™idat `ANTHROPIC_API_KEY` secret â†’ Deploy â†’ zĂ­skat Worker URL

**Blok B (Claude, ~120 min):**
1. Cloudflare Worker kĂłd (CORS proxy, Anthropic API volĂˇnĂ­, HOPI system prompt)
2. `_hopiq.js` â€” floating button widget, chat panel, fetch â†’ Worker URL, render odpovÄ›dĂ­
3. `_hopiq.css` â€” dark theme konzistentnĂ­ s AppIQ
4. Integrace do vĹˇech strĂˇnek AppIQ:
   - `HOPI_AppIQ_WebPage/Development/index.html` (Hub)
   - `PORTAL_PRESENTATION.html`
   - `PERSONAL_PITCH.html`
   - `admin/index.html`
   - `docs/index.html`
5. Archivace (DO_ARCHIVE.ps1) + Deploy (DO_DEPLOY.ps1) na GitHub Pages

### System prompt â€” zĂˇmÄ›r

Claude bude v kontextu HOPI AppIQ znĂˇt:
- Co je HOPI Holding a jeho divisional struktura
- Co je AppIQ â€” AI-powered Enterprise Application Platform
- JakĂ© jsou cĂ­le platformy (Finance pilot â†’ spin-off â†’ SaaS)
- Jak navigovat AppIQ Studio (Hub, Prezentace, Docs, Admin)
- Kdo je uĹľivatel (internĂ­ HOPI nebo investor/partner)

### BlokĂˇtory a zĂˇvislosti

- AIQ-00085-B blokovĂˇn AIQ-00085-A (potĹ™ebuje Worker URL)
- AIQ-00085-T1 blokovĂˇn dokonÄŤenĂ­m AIQ-00085-B

### FĂˇze 2 â€” plĂˇnovĂˇno po pilotu

- Azure Functions jako produkÄŤnĂ­ proxy (HOPI Azure stack)
- Sonnet 4.6 pro komplexnĂ­ analytickĂ© dotazy
- Kontext: OIL.json, reporting data, stav portĂˇlu â†’ AI vĂ­ co se dÄ›je v reĂˇlnĂ©m ÄŤase
- Features: shrnutĂ­ reportĹŻ, detekce anomĂˇliĂ­, AI asistent pro Finance uĹľivatele

---

## AIQ-00085-A â€” Blok A: Anthropic API klĂ­ÄŤ + Cloudflare Worker setup

**Status:** CLOSED Â· Effort: XS (skuteÄŤnÄ› ~45 min) Â· 2026-04-19 Â· David Gogela

### PrĹŻbÄ›h setup krok po kroku

**Anthropic API klĂ­ÄŤ:**
1. David pĹ™istoupil na console.anthropic.com pod firemnĂ­m ĂşÄŤtem
2. Cloudflare vyĹľadoval onboarding dotaznĂ­k â€” David ho vyplnil (kategorie: Build and scale apps globally)
3. ZjiĹˇtÄ›no: Anthropic API a Claude Code jsou oddÄ›lenĂ© produkty s oddÄ›lenou fakturacĂ­
4. David mĂˇ firemnĂ­ ĂşÄŤet â†’ platba Ĺ™eĹˇena pĹ™es firemnĂ­ identitu (dgogela@hopiholding.eu)
5. API klĂ­ÄŤ vygenerovĂˇn pod nĂˇzvem `david-onboarding-api-key` (nĂˇzev je jen label, nemĂˇ vliv na funkci)
6. KlĂ­ÄŤ formĂˇt: `sk-ant-api03-...` (~100 znakĹŻ), zobrazen jen jednou pĹ™i vytvoĹ™enĂ­

**Cloudflare Worker:**
1. Cloudflare ĂşÄŤet vytvoĹ™en zdarma na cloudflare.com
2. FiremnĂ­ nĂˇzev workspace: `hopi-appiq` (Cloudflare vyĹľaduje lowercase)
3. Worker URL: `https://hopi-appiq.dgogela.workers.dev`
4. Worker typ: Hello World â†’ nasazen pĹ™es Cloudflare dashboard

**ProblĂ©my a Ĺ™eĹˇenĂ­ pĹ™i setup:**
| ProblĂ©m | PĹ™Ă­ÄŤina | ĹeĹˇenĂ­ |
|---|---|---|
| Editor neĹˇel editovat pĹ™ed deployem | Cloudflare UI Hello World flow â€” editor je read-only pĹ™ed prvnĂ­ deployi | Kliknout Deploy s vĂ˝chozĂ­m kĂłdem, pak editovat |
| HTTP 403 po deployi | OÄŤekĂˇvanĂ© â€” Hello World Worker vracĂ­ 403 na GET bez sprĂˇvnĂ©ho kĂłdu | Ignorovat, pokraÄŤovat s editacĂ­ kĂłdu |
| Conflict `Variable name already in use` | Secret byl pĹ™idĂˇn dvakrĂˇt pĹ™i opakovanĂ©m pokusu | Edit existujĂ­cĂ­ho secretu mĂ­sto vytvĂˇĹ™enĂ­ novĂ©ho |
| Cloudflare UI complexity | NastavenĂ­ Variables/Secrets nenĂ­ intuitivnĂ­ pro novĂ©ho uĹľivatele | Settings â†’ Variables and Secrets â†’ tuĹľka (edit) â†’ Save and deploy |

### VĂ˝slednĂ˝ stav

- **Worker URL:** `https://hopi-appiq.dgogela.workers.dev`
- **Secret:** `ANTHROPIC_API_KEY` = `sk-ant-...` (nastaven a nasazen)
- **Worker kĂłd:** proxy na Anthropic API (haiku-4-5-20251001), CORS headers
- **Blok B:** odblokovĂˇn â€” Claude mĹŻĹľe implementovat widget

### PoznĂˇmka pro organizaci

Cloudflare Worker setup byl ÄŤasovÄ› nĂˇroÄŤnÄ›jĹˇĂ­ neĹľ odhadovanĂ˝ch 20 minut (skuteÄŤnÄ› ~45 min) kvĹŻli neintuitivnĂ­mu UI. Pro budoucĂ­ onboarding novĂ˝ch ÄŤlenĹŻ tĂ˝mu doporuÄŤujeme pĹ™ipravit step-by-step screenshot nĂˇvod.

---

## AIQ-00085-B â€” Blok B: _hopiq.js widget + deploy

**Status:** CLOSED Â· Effort: M (skuteÄŤnÄ› ~90 min) Â· 2026-04-19 Â· Claude

### Implementace

**`_hopiq.js`** â€” floating chat widget (CO_PROJECT root, sdĂ­leno vĹˇemi strĂˇnkami):
- IIFE (Immediately Invoked Function Expression) â€” bez globĂˇlnĂ­ho namespace pollution
- `PROXY_URL = 'https://hopi-appiq.dgogela.workers.dev'`
- `MODEL = 'claude-haiku-4-5-20251001'`
- DynamickĂˇ detekce cesty k `_hopiq.css` podle hloubky strĂˇnky (depth poÄŤĂ­tĂˇno z `window.location.pathname`)
- Floating button: zelenĂ˝ kruh (#007d32), ikona chat bubliny, badge "AI"
- Chat panel: dark theme (#161b22), HOPIQ brand s zelenou teÄŤkou, scroll, typing animace
- `_messages[]` array â€” udrĹľuje konverzaÄŤnĂ­ historii pro kontext
- Fetch na Cloudflare Worker â†’ `{ messages, system }` â†’ Anthropic API
- Enter odeĹˇle zprĂˇvu, Shift+Enter = novĂ˝ Ĺ™Ăˇdek
- Auto-resize textarea (max 90px)

**`_hopiq.css`** â€” styly widgetu konzistentnĂ­ s AppIQ dark theme

**Integrace do strĂˇnek** (cesty k `_hopiq.js`):
| StrĂˇnka | Cesta |
|---|---|
| Hub (Development/index.html) | `../../../_hopiq.js` â†’ `v7.20/_hopiq.js` |
| PORTAL_PRESENTATION.html | `../../_hopiq.js` â†’ `v7.20/_hopiq.js` |
| PERSONAL_PITCH.html | `../../_hopiq.js` â†’ `v7.20/_hopiq.js` |
| admin/index.html | `../../../../_hopiq.js` â†’ root `_hopiq.js` |
| docs/index.html | `../../../_hopiq.js` â†’ `v7.20/_hopiq.js` |

**GitHub Pages deploy** â€” commit `5a6ed61`:
- `_hopiq.js` + `_hopiq.css` â†’ repo root (pro admin cestu)
- `v7.20/_hopiq.js` + `v7.20/_hopiq.css` â†’ versioned folder
- VĹˇech 5 HTML souborĹŻ aktualizovĂˇno v `v7.20/HOPI_AppIQ_WebPage/Development/`

### PrvnĂ­ live test

David otestoval dotaz: *"vyhledej mi dokumentaci k poslednĂ­ archivaci"*

**VĂ˝sledek:** Widget funguje â€” odpovÄ›ÄŹ pĹ™iĹˇla pĹ™es Cloudflare Worker. Obsah odpovÄ›di byl generickĂ˝ (neznal specifika AppIQ archivaÄŤnĂ­ procedury).

**IdentifikovanĂ˝ gap:** SystĂ©movĂ˝ prompt obsahuje obecnĂ˝ kontext HOPI/AppIQ, ale neznĂˇ:
- ArchivaÄŤnĂ­ procedura: `DO_ARCHIVE.ps1`, `ARCHIVE_PROTOCOL.json`, Admin Center â†’ Release zĂˇloĹľka
- OIL task tracker: formĂˇt AIQ-NNNNN, statusy, OIL.json struktura
- Documentation Center: TS-1..6, BS-1..4, GD-1..4 sekce
- Verze a changelog: aktuĂˇlnĂ­ v7.20, co bylo zmÄ›nÄ›no

â†’ VytvoĹ™en AIQ-00086 pro rozĹˇĂ­Ĺ™enĂ­ systĂ©movĂ©ho promptu.

---

## AIQ-00086 â€” HOPIQ chatbot: rozĹˇĂ­Ĺ™enĂ­ systĂ©movĂ©ho promptu

**Status:** OPEN Â· Effort: S Â· 2026-04-19 Â· Claude

### Kontext

IdentifikovĂˇno z prvnĂ­ho live testu (viz AIQ-00085-B). HOPIQ chatbot funguje technicky, ale odpovĂ­dĂˇ genericky na AppIQ-specifickĂ© dotazy. SystĂ©movĂ˝ prompt v `_hopiq.js` (konstanta `SYSTEM_PROMPT`) potĹ™ebuje rozĹˇĂ­Ĺ™enĂ­.

### Co pĹ™idat do systĂ©movĂ©ho promptu

1. **Archivace** â€” DO_ARCHIVE.ps1 generuje archiv do `HOPI_AppIQ_WebPage/Archive/{stamp}/`, vĂ˝sledek v `ARCHIVE_PROTOCOL.json`, Admin Center â†’ Release zĂˇloĹľka â†’ tlaÄŤĂ­tko đź“‹ Protokol
2. **Deploy** â€” DO_DEPLOY.ps1 publikuje na GitHub Pages `https://h-gr-fico.github.io/appiq/`, version selector na root URL
3. **OIL task tracker** â€” formĂˇt AIQ-NNNNN, soubor `OIL.json`, statusy OPENâ†’IN PROGRESSâ†’REVIEWâ†’CLOSED
4. **AppIQ Studio navigace** â€” Hub je rozcestnĂ­k, zĂˇloĹľky: Dev Center, Test Center, Admin Center, Promo Web, Documentation Center
5. **Admin Center zĂˇloĹľky** â€” OIL Backlog, Release & Deploy, Jazyky, Kapacita
6. **AktuĂˇlnĂ­ verze** â€” v7.20, datum 2026-04-19, changelog pĹ™Ă­stupnĂ˝ v `CHANGELOG.md`

---

## AIQ-00086 â€” HOPIQ systĂ©movĂ˝ prompt: rozĹˇĂ­Ĺ™enĂ­ o AppIQ znalosti

**Status:** CLOSED Â· Effort: S (30 min) Â· 2026-04-19 Â· Claude

### Kontext

Po prvnĂ­m live testu (David: "vyhledej mi dokumentaci k poslednĂ­ archivaci") HOPIQ odpovÄ›dÄ›l genericky â€” neznal specifika AppIQ archivace, Admin Center zĂˇloĹľek ani navigaci. IdentifikovanĂ˝ gap vedl k okamĹľitĂ©mu vytvoĹ™enĂ­ AIQ-00086.

### Co bylo pĹ™idĂˇno do SYSTEM_PROMPT (8 sekcĂ­)

1. **Organizace** â€” HOPI Holding divize, David Gogela role, strategickĂ˝ zĂˇmÄ›r (pilot â†’ spin-off â†’ SaaS), argument "budujeme IT firmu zevnitĹ™"
2. **Platforma** â€” WEB stream vs. APP stream, 3 fĂˇze architektury (Phase 0 Portal â†’ Phase 1 Data â†’ Phase 2 AI Agents)
3. **Navigace AppIQ Studio** â€” Hub, Dev Center, Test Center, Admin Center, Promo, Documentation Center, Prezentace, Personal Pitch
4. **Admin Center zĂˇloĹľky** â€” OIL Backlog (AIQ-NNNNN), Release & Deploy (Archivovat/Publikovat), Jazyky, Kapacita
5. **ArchivaÄŤnĂ­ procedura** â€” DO_ARCHIVE.ps1, vĂ˝stup do Archive/{stamp}/, ARCHIVE_PROTOCOL.json, Admin Center â†’ Protokol
6. **Deploy** â€” DO_DEPLOY.ps1, GitHub Pages https://h-gr-fico.github.io/appiq/, versions.json, 1â€“2 min na refresh
7. **OIL task tracker** â€” formĂˇt AIQ-NNNNN, statusy OPENâ†’CLOSED, taskType, effort, assignee
8. **AktuĂˇlnĂ­ verze + Dokumentace** â€” v7.20 (2026-04-19), Documentation Center TS/BS/GD sekce, klĂ­ÄŤovĂ© soubory

### VĂ˝sledek

Commit 84d753c. HOPIQ nynĂ­ odpovĂ­dĂˇ konkrĂ©tnÄ› na dotazy o AppIQ platformÄ›, navigaci, procedurĂˇch a stavu.

---

## AIQ-00087 â€” Training Centre: novĂ© Functional Center pro AI specialisty

**Status:** OPEN Â· Effort: M Â· 2026-04-19 Â· Claude

### Kontext a zĂˇmÄ›r

Session 2026-04-19. David Gogela inicioval vznik Training Centre jako strategickĂ©ho rozĹˇĂ­Ĺ™enĂ­ AppIQ Studio. ZĂˇmÄ›r: budovat specializovanĂ© AI asistenty (specialisty) pro konkrĂ©tnĂ­ byznys Ăşlohy, nejen generickĂ˝ chatbot. HOPIQ widget = generĂˇlnĂ­ asistent, Training Centre = speciĂˇlnĂ­ tĂ˝my.

### StrategickĂˇ motivace

- HOPIQ obecnĂ˝ chatbot: navigace, odpovÄ›di o platformÄ›, obecnĂˇ podpora
- AI specialistĂ©: hlubokĂˇ odbornost v konkrĂ©tnĂ­ domĂ©nÄ› (Power BI, Finance, Data)
- KaĹľdĂ˝ specialista = jinĂ˝ systĂ©movĂ˝ prompt, jinĂ˝ "charakter", jinĂˇ odbornost
- DlouhodobĂ˝ zĂˇmÄ›r: rozĹˇiĹ™ovat tĂ˝m specialistĹŻ podle potĹ™eb HOPI Group (HR, Logistics, Operations...)

### Architektura â€” rozhodnutĂ­ pending

**Varianta A:** SdĂ­lenĂ˝ `_hopiq.js` widget s pĹ™epĂ­nĂˇnĂ­m systĂ©movĂ©ho promptu (context switch)
- VĂ˝hoda: jeden widget, mĂ©nÄ› kĂłdu
- NevĂ˝hoda: sloĹľitÄ›jĹˇĂ­ state management, uĹľivatel musĂ­ vybrat specialistu

**Varianta B:** SamostatnĂ© instance per specialista (kaĹľdĂ˝ mĂˇ vlastnĂ­ chat panel na Training Centre strĂˇnce)
- VĂ˝hoda: paralelnĂ­ konverzace s rĹŻznĂ˝mi specialisty, ÄŤistĹˇĂ­ UX
- NevĂ˝hoda: vĂ­ce DOM elementĹŻ

â†’ DoporuÄŤenĂ­: Varianta B pro Training Centre (kaĹľdĂ˝ specialista = vlastnĂ­ karta s vlastnĂ­m chatem)

### ZĂˇvislosti

AIQ-00088, AIQ-00089, AIQ-00090 definujĂ­ obsah systĂ©movĂ˝ch promptĹŻ specialistĹŻ.
Hub (index.html) bude potĹ™ebovat novou kartu FC-8 Training Centre.
ARCH_MAP.md bude potĹ™ebovat aktualizaci.

---

## AIQ-00088 â€” AI Specialist: AI PBI Designer

**Status:** OPEN Â· Effort: S Â· 2026-04-19 Â· Claude

### ZĂˇmÄ›r

Specialista pro nĂˇvrh Power BI reportĹŻ a datovĂ˝ch modelĹŻ. CĂ­lovĂ˝ uĹľivatel: David Gogela a budoucĂ­ Finance uĹľivatelĂ© HOPI Group.

### Scope systĂ©movĂ©ho promptu

- Star schema design, relationships, grain definition
- DAX: measures vs. calculated columns, iterator funkce, time intelligence
- VizuĂˇly: kterĂ˝ visual pro jakĂ˝ use case (tabulka vs. matrix vs. bar chart vs. card)
- HOPI specifika: SAP BNS jako zdroj, mÄ›ny CZK/EUR/HUF/PLN, Group Controlling KPIs
- Report layout best practices pro management audience

### DatovĂ˝ kontext (David dodĂˇ)

- Struktura SAP BNS dat pro HOPI Group
- KlĂ­ÄŤovĂ© KPIs (co sleduje Group Controlling)
- Specifika FX reportingu (CZK base, multi-currency)

---

## AIQ-00089 â€” AI Specialist: AI PBI Analyser

**Status:** OPEN Â· Effort: S Â· 2026-04-19 Â· Claude

### ZĂˇmÄ›r

Specialista pro interpretaci a analĂ˝zu Power BI vĂ˝sledkĹŻ. Transformuje surovĂˇ ÄŤĂ­sla na analytickĂ© zĂˇvÄ›ry.

### Scope systĂ©movĂ©ho promptu

- Variance analysis: plĂˇn vs. skuteÄŤnost, MoM, YoY, rolling
- AnomĂˇlie: identifikace outlierĹŻ, neoÄŤekĂˇvanĂ˝ch zmÄ›n
- FX dopad: jak kurzovĂ© pohyby ovlivĹujĂ­ vĂ˝sledky v EUR vs. CZK
- SezĂłnnost: HOPI business cykly (Agriculture, Foods, Supply Chain)
- DoporuÄŤenĂ­: co proĹˇetĹ™it, co reportovat vedenĂ­

### StrategickĂˇ hodnota

Tento specialista je mostem mezi AppIQ Finance portĂˇlem (data) a management reportingem. V Phase 1 (Data Integration) mĹŻĹľe pĹ™ijĂ­mat data pĹ™Ă­mo z portĂˇlu jako kontext pro analĂ˝zu.

---

## AIQ-00090 â€” AI Specialist: AI Data Story Teller

**Status:** OPEN Â· Effort: S Â· 2026-04-19 Â· Claude

### ZĂˇmÄ›r

Strategicky nejcennÄ›jĹˇĂ­ specialista pro pitch fĂˇzi. Transformuje finanÄŤnĂ­ data a vĂ˝sledky do narativnĂ­ho pĹ™Ă­bÄ›hu pro Group CEO a Group CFO.

### Scope systĂ©movĂ©ho promptu

- Executive summary framework: Situation â†’ Complication â†’ Resolution (SCR)
- KlĂ­ÄŤovĂ© otĂˇzky: Co se stalo? ProÄŤ? Co to znamenĂˇ pro firmu? Co udÄ›lĂˇme?
- FormĂˇt komentĂˇĹ™ĹŻ: struÄŤnĂ©, bez Ĺľargonu, action-oriented
- HOPI leadership kontext: Group CEO a Group CFO â€” jejich priority a rozhodovacĂ­ styl
- PĹ™eklad: technickĂ© vĂ˝sledky â†’ business implikace

### ProÄŤ nejcennÄ›jĹˇĂ­

CEO/CFO nebudou ÄŤĂ­st reporty â€” budou se ptĂˇt AI Data Story Tellera: "Jak jsme skonÄŤili Q1?" a dostanou narrative odpovÄ›ÄŹ s doporuÄŤenĂ­m. To je pĹ™esnÄ› AppIQ hodnotovĂˇ propozice.

---

## AIQ-00091 â€” AI Specialist: AI Document Reader

**Status:** OPEN Â· Effort: S Â· 2026-04-19 Â· Claude

### ZĂˇmÄ›r

Specialista pro prĂˇci s dokumenty â€” umoĹľĹuje uĹľivateli vloĹľit text dokumentu do chatu a klĂˇst otĂˇzky nad jeho obsahem. NejpraktiÄŤtÄ›jĹˇĂ­ specialista pro kaĹľdodennĂ­ prĂˇci ve Finance a Holding.

### Scope systĂ©movĂ©ho promptu

- Extrakce strukturovanĂ˝ch dat z nestrukturovanĂ©ho textu (smlouvy, faktury, reporty)
- ShrnutĂ­ dlouhĂ˝ch dokumentĹŻ do executive summary
- PorovnĂˇnĂ­ dvou dokumentĹŻ (co se zmÄ›nilo, co pĹ™ibylo, co chybĂ­)
- Identifikace rizik, zĂˇvazkĹŻ, termĂ­nĹŻ, smluvnĂ­ch podmĂ­nek
- OdpovÄ›di na konkrĂ©tnĂ­ otĂˇzky: "JakĂˇ je vĂ˝povÄ›dnĂ­ lhĹŻta?", "JakĂˇ je celkovĂˇ hodnota kontraktu?"

### HOPI dokumentovĂ˝ kontext

- Typy dokumentĹŻ: dodavatelskĂ© smlouvy, rĂˇmcovĂ© smlouvy, internĂ­ smÄ›rnice, Board materiĂˇly, reporty pro HOPI Group management
- Finance dokumenty: rozpoÄŤtovĂ© zprĂˇvy, audit reporty, SAP vĂ˝stupy, BNS reporty
- Compliance: GDPR, internĂ­ kontrolnĂ­ systĂ©m HOPI

### FĂˇze 2

Integrace File API (Anthropic supports file upload) â€” uĹľivatel nahraje PDF pĹ™Ă­mo do chatu bez nutnosti kopĂ­rovat text.

### StrategickĂˇ hodnota

OkamĹľitÄ› pouĹľitelnĂ˝ pro Davida a jeho tĂ˝m â€” dennĂ­ prĂˇce s dokumenty je jeden z nejvÄ›tĹˇĂ­ch time sinks ve Finance. Demonstruje ROI AppIQ konkrĂ©tnÄ› a mÄ›Ĺ™itelnÄ›.

---

## AIQ-00092 â€” Release v7.21 â€” HOPIQ chatbot + Version Selector 2.0

**Status:** CLOSED Â· Effort: S Â· 2026-04-19 Â· Claude

### Co bylo archivovĂˇno a nasazeno

- DO_ARCHIVE.ps1 â†’ archiv `v7.21-WebPage_20260419_1012` (18 souborĹŻ ovÄ›Ĺ™eno OK)
- DO_DEPLOY.ps1 â†’ commit `fe2e121` + fix title `13138c0`, celkem 44 souborĹŻ, 3 verze v versions.json
- GitHub Pages live: https://h-gr-fico.github.io/appiq/

### Opravy v DO_DEPLOY.ps1 provedenĂ© v tĂ©to session

1. **Krok [6] upsert** â€” pĹ™idĂˇno zachovĂˇnĂ­ `mainUrl`, `mainLabel`, `changes`, `title`, `promoLevel`, `promoText`, `promoTextEn` z existujĂ­cĂ­ho zĂˇznamu
2. **Krok [7b]** â€” sync root shared files (`_hopiq.js`, `_hopiq.css`, `_i18n.js`) do repo rootu pĹ™i kaĹľdĂ©m deployi
3. **CHANGELOG.md encoding** â€” pĹ™idĂˇno `-Encoding UTF8` + opravena regex character class pro dash (`[-\u2014\u2013]`)

### Non-kritickĂˇ chyba

DO_ARCHIVE.ps1 Ĺ™Ăˇdek ~208: `.ContainsKey()` â†’ `.Contains()` â€” byType statistiky v protokolu chybĂ­, archivace probÄ›hla OK. EvidovĂˇno jako AIQ-00093.

---

## AIQ-00093 â€” Fix: DO_ARCHIVE.ps1 .ContainsKey() â†’ .Contains()

**Status:** OPEN MED Â· Effort: XS Â· 2026-04-19 Â· Claude

### Root cause

PowerShell `[System.Collections.Specialized.OrderedDictionary]` nemĂˇ metodu `.ContainsKey()` â€” sprĂˇvnĂˇ je `.Contains()`. Chyba na Ĺ™Ăˇdku ~208 v sekci generovĂˇnĂ­ PROTOKOLU. Archivace jinak probÄ›hne kompletnÄ›, pouze `byType` statistiky v `ARCHIVE_PROTOCOL.json` jsou prĂˇzdnĂ©.

### Fix

```powershell
# ChybnÄ›:
if ($byType.ContainsKey($ext)) { ... }
# SprĂˇvnÄ›:
if ($byType.Contains($ext)) { ... }
```

---

## AIQ-00094 â€” Version selector: HOPIQ chatbot + status bar + release notes feed

**Status:** CLOSED Â· Effort: S Â· 2026-04-19 Â· Claude

### TĹ™i funkce pĹ™idanĂ© na prvnĂ­ strĂˇnku (https://h-gr-fico.github.io/appiq/)

**1. HOPIQ chatbot widget**
- `<link rel="stylesheet" href="_hopiq.css">` + `<script src="_hopiq.js"></script>` pĹ™idĂˇny do `_ghpages_root_index.html`
- `_hopiq.js` a `_hopiq.css` jsou v repo rootu â€” dostupnĂ© pro version selector
- DO_DEPLOY.ps1 krok [7b] zajiĹˇĹĄuje sync tÄ›chto souborĹŻ pĹ™i kaĹľdĂ©m deployi

**2. Status bar**
- TenkĂ˝ zelenĂ˝ pruh pod headerem
- Zobrazuje: zelenĂˇ teÄŤka + LIVE + aktuĂˇlnĂ­ verze + datum + session ID
- Data z `versions.json` (jiĹľ naÄŤtenĂ©ho), volitelnÄ› commit hash z `window._STUDIO_STATUS`
- ZobrazĂ­ se po vybrĂˇnĂ­ jazyka (nebo rovnou po naÄŤtenĂ­ dat)

**3. Release notes feed**
- NovĂˇ sekce pod version history listem
- Timeline design s teÄŤkami na levĂ© stranÄ›
- KaĹľdĂˇ verze: badge, datum, title, rozbalenĂ˝ seznam zmÄ›n
- Latest verze mĂˇ zelenou teÄŤku s glowem a LATEST pill

### Commit

`ae3c445` â€” 5 souborĹŻ, push OK

---

## AIQ-00095 â€” Version selector: PROMO banner + Welcome dialog + 5-level sounds

**Status:** CLOSED Â· Effort: M Â· 2026-04-19 Â· Claude

### Welcome dialog â€” "Ready for AI?"

ZobrazĂ­ se pĹ™i prvnĂ­m naÄŤtenĂ­ strĂˇnky (full-screen overlay). ĂšÄŤel: 1) prezentaÄŤnĂ­ dojem, 2) vĂ˝bÄ›r jazyka (CS/EN) nastavĂ­ i18n, 3) user gesture odemkne Web Audio API pro zvuky.

**Komponenty:**
- Logo HOPI AppIQ (malĂ©, v zĂˇhlavĂ­ dialogu)
- SVG neural network illustration (animovanĂ© â€” 3 vrstvy: Input/Hidden/Output, pulzujĂ­cĂ­ nodes, flowing signal)
- Headline "Ready for AI?" (universĂˇlnĂ­ EN, pochopitelnĂ© v obou jazycĂ­ch)
- Subtitle "Vyberte jazyk Â· Select language" (bilingvnĂ­)
- DvÄ› tlaÄŤĂ­tka: đź‡¨đź‡ż ÄŚesky | đź‡¬đź‡§ English
- Verze hint (naÄŤte se z versions.json background fetch)
- Fade-out animace po vĂ˝bÄ›ru jazyka (0.5s)

**Neural network SVG:**
- 3 vrstvy: Input (3 nodes, #007d32), Hidden (4 nodes, #00bcd4), Output (2 nodes, #3fb950)
- StatickĂ© connection lines (opacity 0.1â€“0.22)
- 6 animovanĂ˝ch "flow" lines (stroke-dasharray + dashoffset animation)
- Glow filter na nodes, pulsing animation s rĹŻznĂ˝mi delays
- Inline SVG, bez externĂ­ch souborĹŻ

### PROMO banner â€” 5 ĂşrovnĂ­

Zobrazuje se pod status barem. ÄŚte `promoLevel`, `promoText`, `promoTextEn` z `versions.json` (latest verze).

| ĂšroveĹ | NĂˇzev CS | NĂˇzev EN | Ikona | Barva | Animace |
|--------|----------|----------|-------|-------|---------|
| 1 | Tweak | Tweak | đź”§ | ĹˇedĂˇ | ĹľĂˇdnĂˇ |
| 2 | Update | Update | âšˇ | cyan/blue | pulse |
| 3 | Feature | Feature | đźš€ | zelenĂˇ | glow |
| 4 | Bomba vybuchla | Bomb dropped | đź’Ą | oranĹľovĂˇ | shake + jiskry |
| 5 | SvÄ›t se zatĹ™Ăˇsl | World shook | đźŚŤ | ÄŤervenĂˇ/zlatĂˇ | quake + flash overlay |

**Jiskry (level 4):** 12 dynamicky generovanĂ˝ch `<span class="spark">` s nĂˇhodnou polohou a CSS transform animacĂ­.
**Flash (level 5):** Dynamicky vloĹľen `<div class="flash-overlay">` s keyframe animacĂ­, odstranÄ›n po 1.5s.
**đź”Š tlaÄŤĂ­tko** na pravĂ© stranÄ› banneru pro zopakovĂˇnĂ­ zvuku.

### Web Audio API â€” 6 zvukĹŻ

VĹˇechny syntetickĂ© (bez souborĹŻ), inicializovĂˇny po user gesture (klik na lang button).

| Zvuk | Popis | Technika |
|------|-------|---------|
| Welcome | Ascending arpeggio C4â†’E4â†’G4â†’C5â†’sparkle | 5Ă— sine oscillator |
| Level 1 | Soft ping | 1Ă— sine 880Hz |
| Level 2 | Double ping | 2Ă— sine ascending |
| Level 3 | 4-note chime | 4Ă— sine C5â†’E5â†’G5â†’C6 |
| Level 4 | Impact boom + bright transient + rising sweep | noise burst + sawtooth + sine + sweeping osc |
| Level 5 | Epic orchestral hit | noise rumble + low sawtooth + C major chord (8 tones) + impact noise |

Welcome sound se pĹ™ehraje ihned po vĂ˝bÄ›ru jazyka. Level sound se pĹ™ehraje s 800ms zpoĹľdÄ›nĂ­m po zobrazenĂ­ banneru.

### versions.json schema â€” novĂˇ pole

```json
"promoLevel": 4,
"promoText": "HOPIQ chatbot je ĹľivĂ˝ â€” Claude AI teÄŹ odpovĂ­dĂˇ pĹ™Ă­mo z AppIQ",
"promoTextEn": "HOPIQ chatbot is live â€” Claude AI now responds directly from AppIQ"
```

AI auto-assignment: Claude pĹ™iĹ™azuje `promoLevel` manuĂˇlnÄ› pĹ™i kaĹľdĂ©m deployi dle heuristiky:
- Tweaks/fixy â†’ 1â€“2
- NovĂˇ UI funkce â†’ 3
- PrĹŻlomovĂˇ feature (chatbot, centrum, novĂ˝ modul) â†’ 4
- PlatformovĂ˝ posun (architektura, spin-off milestone) â†’ 5

**v7.21 = Level 4 (Bomba vybuchla)** â€” HOPIQ chatbot je ĹľivĂ˝ pĹ™es Claude API, prvnĂ­ AI funkce v produkci.

### DO_DEPLOY.ps1 â€” zachovĂˇnĂ­ promo polĂ­

PĹ™idĂˇno do upsert logiky (krok [6]):
```powershell
promoLevel  = if ($existingEntry -and $existingEntry.promoLevel) { $existingEntry.promoLevel } else { $null }
promoText   = if ($existingEntry -and $existingEntry.promoText)  { $existingEntry.promoText }  else { $null }
promoTextEn = if ($existingEntry -and $existingEntry.promoTextEn){ $existingEntry.promoTextEn} else { $null }
```

### Commit history

- `400e583` â€” welcome dialog + PROMO banner + sounds + neural SVG (671 insertions)
- `262efa4` â€” versions.json promoLevel + promoText pro v7.21

---

## AIQ-00096 â€” Version selector: PROMO fullscreen intro + collapse animace + MP3 zvuk

**Status:** CLOSED Â· Effort: S Â· 2026-04-19 Â· Claude

### Motivace

Po implementaci PROMO banneru (AIQ-00095) David poĹľadoval vĂ˝raznÄ›jĹˇĂ­ efekt: banner nejdĹ™Ă­ve zaplnĂ­ celou obrazovku (jako billboard) a teprve potĂ© se sloĹľĂ­ na malĂ˝ pruh. SyntetickĂ˝ zvuk WebAudio nahrazen existujĂ­cĂ­m orchestrĂˇlnĂ­m MP3.

### Fullscreen intro

- `.promo-full` element: `position:fixed; inset:0; z-index:7000` â€” pokrĂ˝vĂˇ celou viewport
- ZobrazĂ­ se po vĂ˝bÄ›ru jazyka, trvĂˇ 2800ms
- Obsahuje: velkĂ˝ ikona, PROMO label, velkĂ˝ text (Variant B), CTA odkaz na Hub
- `transform-origin: top center` â€” zĂˇklad pro collapse animaci

**Barva pro Level 4:**
```css
background: radial-gradient(ellipse at 50% 30%, #4a1500 0%, #1a0800 55%, #0d0500 100%)
```

### Collapse animace

Po 2800ms se pĹ™idĂˇ tĹ™Ă­da `.collapsing` â†’ spustĂ­ se keyframe `pf-collapse`:
```css
@keyframes pf-collapse {
  0%  { transform:scaleY(1); opacity:1; }
  45% { transform:scaleY(0.06) scaleX(1.03); opacity:0.85; }
  80% { transform:scaleY(0.01); opacity:0.2; }
  100%{ transform:scaleY(0); opacity:0; }
}
```
Po 700ms (animace hotova) se element odstranĂ­ a volĂˇ `renderPromoBannerSmall()`.

### MP3 zvuk

- Soubor: `_audio/rubyzephyr-imperium-aeternum-v1-430851.mp3` (orchestrĂˇlnĂ­, jiĹľ existoval v repo)
- `new Audio()` s fade-in (0 â†’ 0.75, intervaly 40ms)
- Fade-out start: 4000ms pro L4, 5500ms pro L5
- Fallback: pokud `audio.play()` zamĂ­tnuto â†’ `playSoundForLevel(ctx, 4)` (Web Audio synth)
- Fade-out: 0.75 â†’ 0 v intervalech 50ms, potĂ© `audio.pause()`

### Sparks â€” big mode

`spawnSparks(container, 20, big=true)` pro fullscreen:
- StĹ™ed sparks: `window.innerWidth/2` Â± 80px, `window.innerHeight/2` Â± 60px
- `dx`: Â±150px, `dy`: -(80â€“280px)
- 28 sparks pro Level 5, 20 pro Level 4
- StejnĂˇ particle technika jako small banner, ale ve viewport koordinĂˇtech

### Promo text â€” Variant B (finĂˇlnĂ­)

CS: `"Tohle HOPI jeĹˇtÄ› nevidÄ›lo. Claude AI je ĹľivĂ˝ v AppIQ. TeÄŹ hned. Zeptej se."`
EN: `"HOPI has never seen this. Claude AI is live in AppIQ. Right now. Ask it."`

VybrĂˇn po iteraci pĹ™es 5 variant â€” nejlepĹˇĂ­ pomÄ›r expresivita vs. ÄŤitelnost.

### Commit

`9b126bc` â€” index.html + versions.json + _status.js (DO_DEPLOY.ps1 deploy, 2026-04-19 11:24)

---

## AIQ-00099 â€” OG/social preview image + Windows emoji CSS badges

**Status:** CLOSED Â· Effort: S Â· 2026-04-19 Â· Claude

### Motivace

David poĹľadoval, aby pĹ™i sdĂ­lenĂ­ odkazu `https://h-gr-fico.github.io/appiq/` na mobilech (WhatsApp, iMessage, LinkedIn) bylo vidÄ›t logo HOPI AppIQ mĂ­sto prĂˇzdnĂ©ho nĂˇhledu. ParalelnÄ›: emoji vlajky đź‡¨đź‡ż đź‡¬đź‡§ se zobrazujĂ­ sprĂˇvnÄ› na mobilech ale ne na Windows PC.

### OG/social preview image

- Soubor: `og-image.png` (1200Ă—630 px, 90374 B)
- GenerovĂˇno PowerShellem pĹ™es .NET System.Drawing
- Design: tmavĂ© pozadĂ­ gradient, HOPI AppIQ logo text, "by HOPI TECHNOLOGY", AI orbital grafika, v7.21 badge
- UmĂ­stÄ›nĂ­: `C:\repos\appiq\og-image.png` + `CO_PROJECT\og-image.png`
- Meta tagy pĹ™idĂˇny do `_ghpages_root_index.html` `<head>`:
  - `og:image`, `og:title`, `og:description`, `og:site_name`, `og:locale`
  - `twitter:card summary_large_image`, `twitter:image`
- DO_DEPLOY.ps1: rozĹˇĂ­Ĺ™en seznam sdĂ­lenĂ˝ch souborĹŻ o `og-image.png`
- SociĂˇlnĂ­ scrapery cachujĂ­ preview 24â€“48h â€” okamĹľitĂ˝ efekt nenĂ­ garantovĂˇn

### Windows emoji fix

- ProblĂ©m: country flag emoji (đź‡¨đź‡ż đź‡¬đź‡§) nezobrazujĂ­ se jako vlajky na Windows OS â€” renderujĂ­ se jako text "CZ"/"GB"
- ĹeĹˇenĂ­: CSS badge spany mĂ­sto emoji
  ```css
  .wc-lang-cc { display:inline-block; font-size:0.65rem; font-weight:900; padding:2px 7px; border-radius:4px; }
  .wc-cc-cs   { background:rgba(63,185,80,.15); color:#3fb950; border:1px solid rgba(63,185,80,.3); }
  .wc-cc-en   { background:rgba(0,188,212,.15); color:var(--accent); border:1px solid rgba(0,188,212,.3); }
  ```
- Buttons: `<span class="wc-lang-cc wc-cc-cs">CZ</span>` mĂ­sto đź‡¨đź‡ż

### Commits

- `4067cba` â€” og-image.png pĹ™idĂˇn do repo
- `47bc7ee` â€” OG meta tagy + emoji CSS badges v index.html

---

## AIQ-00097 â€” Fix: version selector â€” dialog + naÄŤĂ­tĂˇnĂ­ verzĂ­ (session 2026-04-19)

**Status:** CLOSED Â· Effort: S Â· 2026-04-19 Â· Claude

### Root cause â€” SyntaxError

HlavnĂ­ pĹ™Ă­ÄŤina vĹˇech problĂ©mĹŻ: **SyntaxError na Ĺ™Ăˇdku 722** v inline IIFE:

```javascript
// Ĺ PATNÄš â€” parser ÄŤte ++ jako postfix increment operĂˇtor
'/'+(+(vf.passed||0)++(vf.failed||0))+' OK)'

// SPRĂVNÄš
'/'+((vf.passed||0)+(vf.failed||0))+' OK)'
```

`(+(vf.passed||0)++)` = pokus o postfix `++` na vĂ˝razu (ne promÄ›nnĂ©) â†’ `SyntaxError: Invalid left-hand side expression in postfix operation`. ProtoĹľe SyntaxError nastane pĹ™i parsovĂˇnĂ­, **celĂ˝ `<script>` blok selĹľe** â€” `window.startApp` nikdy nenĂ­ definovĂˇn.

DĹŻsledek:
- Dialog se zavĹ™el (inline `onclick` fungoval) ale `if(window.startApp)` bylo false â†’ `startApp` nebyl zavolĂˇn
- `_overlayDone` zĹŻstal `false` navĹľdy
- `renderAll` nebyl nikdy zavolĂˇn â†’ obsah zĹŻstal jako "NaÄŤĂ­tĂˇm pĹ™ehled verzĂ­" navĹľdy
- Console: `Uncaught SyntaxError: Invalid left-hand side expression in postfix operation`

### OpravnĂˇ cesta (chronologicky)

1. **Bulletproof onclick** â€” pĹ™idĂˇn `document.getElementById('welcomeOverlay').style.display='none'` pĹ™Ă­mo do onclick atributu (pĹ™ed zavolĂˇnĂ­m startApp)
2. **Defensive renderAll** â€” try/catch kolem renderPromoBanner aby render() vĹľdy probÄ›hl
3. **Timeout fallback** â€” 6s timeout: pokud `_overlayDone&&!_versData`, zobrazit chybovou zprĂˇvu
4. **Cache-busting** â€” `?v=7.21` na `_hopiq.css`, `_i18n.js`, `_hopiq.js`
5. **render() try/catch** â€” render() takĂ© chrĂˇnÄ›n, t() defensivnÄ› pĹ™istupuje k window.I18n
6. **startApp refactor** â€” `_overlayDone=true` synchronnÄ›, renderAll volĂˇno pĹ™Ă­mo bez setTimeout
7. **SyntaxError fix** (root cause) â€” `++(vf.failed||0)` â†’ `+(vf.failed||0)`

### ArchitektonickĂˇ pouÄŤenĂ­

- SyntaxError v jakĂ©koli ÄŤĂˇsti inline `<script>` zablokuje celĂ˝ blok â€” vĹľdy lint JS pĹ™ed deploiem
- `_overlayDone` setTimeout pattern je nĂˇchylnĂ˝ na race conditions â†’ lepĹˇĂ­ synchronnĂ­ pĹ™Ă­stup
- Bulletproof onclick: kritickĂˇ UI akce musĂ­ bĂ˝t v HTML atributu, ne zĂˇvislĂˇ na JS inicializaci

### Commits

- `191e3ec` â€” defensive renderAll + 6s timeout + cache-bust
- `c93fde4` â€” render() try/catch + defensive t() + promo 1.5s
- `2d8d8be` â€” startApp synchronnĂ­ volĂˇnĂ­
- `6b530eb` â€” **SyntaxError fix** (root cause)

---

## AIQ-00098 â€” Promo L4: bez auto-dismiss

**Status:** CLOSED Â· Effort: XS Â· 2026-04-19 Â· Claude

### ZmÄ›na chovĂˇnĂ­

PĹŻvodnĂ­: promo fullscreen se automaticky zavĹ™el po 2.8s (pak 1.5s po opravÄ›).
NovĂ©: promo zĹŻstane viditelnĂ© dokud uĹľivatel sĂˇm neklikne.

### Motivace

David chce, aby promo "viselo" â€” uĹľivatel si ho pĹ™eÄŤte a sĂˇm se rozhodne kdy pokraÄŤovat. Klik na CTA "Co je novĂ©ho â†’" pĹ™ejde do Studio Hubu, klik kamkoliv jinam = collapse na small banner.

### Implementace

```javascript
// OdstranÄ›no:
// setTimeout(dismissFull, 1500);

// Hint text upraven:
'kliknutĂ­m kamkoliv pĹ™eskoÄŤit'
```

CTA tlaÄŤĂ­tko mĂˇ `onclick="event.stopPropagation()"` â€” klik na CTA nezavolĂˇ dismissFull, jen naviguje na mainUrl.

### Commit

`6bfb10a`

---

## AIQ-00100 â€” VlastnĂ­ domĂ©na AppIQ

**Status:** OPEN Â· Effort: S Â· Assignee: David Gogela

### ArchitektonickĂ˝ kontext

SouÄŤasnĂ˝ stav: AppIQ bÄ›ĹľĂ­ na `https://h-gr-fico.github.io/appiq/` (GitHub Pages, subdomĂ©na githuba).

ProblĂ©my s aktuĂˇlnĂ­m setupem:
- URL nenĂ­ brandovanĂˇ â€” v prezentacĂ­ch CEO/CFO vypadĂˇ amatĂ©rsky
- ZĂˇvislost na GitHub username (h-gr-fico) â€” migrace by rozbila vĹˇechny sdĂ­lenĂ© linky
- HOPIQ chatbot Cloudflare Worker URL je takĂ© doÄŤasnĂˇ

### DoporuÄŤenĂˇ cesta

**FĂˇze 1 (internĂ­ pilot):** `appiq.hopi.cz`
- CNAME na `h-gr-fico.github.io`
- GitHub Pages custom domain nastavenĂ­
- NutnĂ©: pĹ™Ă­stup k HOPI DNS (IT oddÄ›lenĂ­)

**FĂˇze 2 (spin-off/komerÄŤnĂ­):** `appiq.io` nebo `hopiappiq.com`
- SamostatnĂˇ domĂ©na pĹ™i vzniku AppIQ s.r.o.
- GitHub Pages nebo pĹ™esun na vlastnĂ­ hosting

### Co je potĹ™eba pro FĂˇzi 1

1. Souhlas IT oddÄ›lenĂ­ s DNS CNAME zĂˇznamem pro `appiq.hopi.cz`
2. Registrace custom domain v GitHub Pages settings (repo h-gr-fico/appiq)
3. GitHub automaticky vydĂˇ HTTPS certifikĂˇt (Let's Encrypt)
4. Aktualizovat vĹˇechny internĂ­ linky a OG meta tagy

---

## AIQ-00101 â€” PĹ™esun welcome/entry flow z GitHub Pages do platformy

**Status:** OPEN Â· Effort: M Â· Dependency: AIQ-00100

### ArchitektonickĂ© rozhodnutĂ­ (2026-04-19)

**SouÄŤasnĂ˝ stav:** Welcome dialog + language selector + PROMO banner jsou v `_ghpages_root_index.html` (GitHub Pages root). Toto je sprĂˇvnĂ© pro aktuĂˇlnĂ­ fĂˇzi, protoĹľe GitHub Pages URL je primĂˇrnĂ­ vstupnĂ­ bod.

**BudoucĂ­ stav:** Jakmile AppIQ pobÄ›ĹľĂ­ na vlastnĂ­ domĂ©nÄ› s autentizacĂ­:
- Welcome/entry flow pĹ™ejde do platformy samotnĂ© (Studio Hub nebo dedikovanĂˇ landing page)
- GitHub Pages root se stane ÄŤistĂ˝m **version archive + changelog** bez interaktivnĂ­ch prvkĹŻ
- HOPIQ chatbot widget bude souÄŤĂˇstĂ­ autentizovanĂ© platformy (ne veĹ™ejnĂ©ho showcase)

### Co se pĹ™esune

| Prvek | Z | Do |
|-------|---|----|
| Welcome dialog (jazyk) | _ghpages_root_index.html | platform/index.html nebo login page |
| PROMO banner | _ghpages_root_index.html | Studio Hub |
| Language selector | GlobĂˇlnĂ­ (sdĂ­lenĂ˝) | ZĹŻstane sdĂ­lenĂ˝, init v platformÄ› |
| HOPIQ widget | VĹˇechny strĂˇnky | Platforma (autentizovanĂ© strĂˇnky) |

### Trigger

Spustit po dokonÄŤenĂ­ AIQ-00100 (vlastnĂ­ domĂ©na). NespouĹˇtÄ›t dĹ™Ă­ve â€” bylo by pĹ™edÄŤasnĂ© a zpĹŻsobilo by dvojĂ­ maintenance.

---

## AIQ-00102 â€” Promo L4 redesign â€” cinematic vizuĂˇl + CTA dismiss

**Status:** REVIEW Â· Effort: S Â· Commit: 3c17b63

### ZadĂˇnĂ­ (David, 2026-04-19)

DvÄ› vÄ›ci:
1. CTA tlaÄŤĂ­tko nesmĂ­ navigovat na Studio Hub â€” musĂ­ kolabovat promo a odhalit version selector (uĹľivatel uĹľ je na strĂˇnce)
2. VizuĂˇlnĂ­ redesign L4 ("Bomba vybuchla"): mĂ©nÄ› dÄ›tskĂ˝ vĂ˝buch, vĂ­ce dynamiky, corporate/premium atmosfĂ©ra

### Implementace

**CSS (L4):** Nahrazena reddish explosion (`#4a1500` bg, `#f0883e` akcent, pf-shake + pf-bounce animace) â†’ dark navy cinematic design:
- PozadĂ­: `radial-gradient(ellipse at 50% 35%, #001a30 â†’ #000d1a â†’ #000508)`
- Scanning line: `pf-l4::before` â€” horizontĂˇlnĂ­ linie animovĂˇna od topâ†’bottom (3.5s, opacity fade)
- Orbital SVG: tĹ™i soustĹ™ednĂ© rotujĂ­cĂ­ kruhy + pulzujĂ­cĂ­ dot (`#00bcd4` teal, dasharray animace)
- BarevnĂˇ paleta: `var(--accent)` / `#00bcd4` (teal) namĂ­sto oranĹľovĂ©

**JS (showPromoFullscreen):**
- Pro L4/L5: `iconHtml` je orbital SVG mĂ­sto emoji div
- CTA: `<button class="pf-cta">Prozkoumat verze â†“</button>` (bez `href`) â€” click se probublĂˇ na `el.addEventListener('click', dismissFull)`
- Skip text: "kliknutĂ­m kamkoliv pokraÄŤovat" (ne "pĹ™eskoÄŤit")

### OtevĹ™enĂ©

- MP3 zvuk pro L4: David hledĂˇ soubor. Po dodĂˇnĂ­: pĹ™idat do `playMp3Sound()` jako L4-specific track â†’ viz AIQ-00102-P1

---

## AIQ-00103 â€” Fix: Finance portal â€” nefunkÄŤnĂ­ odkaz v Studio Hub

**Status:** CLOSED Â· Effort: XS Â· Commit: 3c17b63

### Root cause

Studio Hub (v7.21) odkazoval na `../../HOPI_AppIQ/Release/index.html`. V deployi v7.21 ale Finance portal nenĂ­ v `HOPI_AppIQ/` â€” je v `app/index.html` (deployment skript ji tam pĹ™ekopĂ­roval pod kratĹˇĂ­ cestou).

### Fix

| Soubor | StarĂ˝ link | NovĂ˝ link |
|--------|------------|-----------|
| `v7.21/HOPI_AppIQ_WebPage/Development/index.html` | `../../HOPI_AppIQ/Release/index.html` | `../../app/index.html` |
| `_ghpages_root_index.html` (source) | `../../HOPI_AppIQ/Release/index.html` | `../../HOPI_AppIQ/Development/index.html` |

Display URL text aktualizovĂˇn stejnÄ› v obou souborech.

---

## AIQ-00104 â€” Maintenance Mode â€” toggle v Studio + overlay na GitHub Pages

**Status:** OPEN Â· Effort: M Â· Assignee: Claude Â· ÄŚekĂˇ na: rozhodnutĂ­ David (varianta A vs B)

### ZadĂˇnĂ­ (David, 2026-04-19)

TlaÄŤĂ­tko v Studio Hub, kterĂ© pĹ™epĂ­nĂˇ "Maintenance Mode" pro veĹ™ejnou GitHub Pages strĂˇnku.

**Stav ZAPNUTO** zobrazĂ­ fullscreen overlay s:
- Logo HOPI AppIQ by HOPI TECHNOLOGY
- CS: "ĂšDRĹ˝BA SYSTĂ‰MU â€” Stavte se pozdÄ›ji. DÄ›kujeme za pochopenĂ­. VĂ˝vojovĂ˝ tĂ˝m platformy AppIQ."
- EN: "SYSTEM MAINTENANCE â€” Please come back later. Thank you for your understanding. AppIQ Platform Development Team."

### ArchitektonickĂ© omezenĂ­

GitHub Pages = statickĂ© soubory. Studio Hub bÄ›ĹľĂ­ v prohlĂ­ĹľeÄŤi a nemĹŻĹľe pĹ™Ă­mo commitovat do gitu. Proto dvÄ› varianty:

### Varianta A â€” PS1 script (jednoduchĂ©, terminĂˇl)

1. `versions.json` dostane pole `"maintenance": false`
2. Root `index.html` na naÄŤtenĂ­ zkontroluje flag â†’ zobrazĂ­ overlay pokud `true`
3. Studio Hub: toggle button zobrazĂ­ aktuĂˇlnĂ­ stav + po kliknutĂ­ zkopĂ­ruje PS1 pĹ™Ă­kaz do schrĂˇnky
4. David spustĂ­ pĹ™Ă­kaz v terminĂˇlu (10 sekund) â†’ git push â†’ GitHub Pages rebuild (~1 min)
5. NovĂ© soubory: `DO_MAINTENANCE_ON.ps1`, `DO_MAINTENANCE_OFF.ps1`

**Pro:** JednoduchĂ©, bez tokenĹŻ, offline. **Proti:** VyĹľaduje terminĂˇl.

### Varianta B â€” GitHub API (profesionĂˇlnĂ­, bez terminĂˇlu)

1. `versions.json` dostane pole `"maintenance": false`
2. Root `index.html` na naÄŤtenĂ­ zkontroluje flag â†’ zobrazĂ­ overlay pokud `true`
3. Admin Center: jednorĂˇzovĂ© zadĂˇnĂ­ GitHub Personal Access Token (PAT) â†’ uloĹľeno do localStorage
4. Studio Hub: toggle button zavolĂˇ GitHub REST API (`PUT /repos/H-GR-FICO/appiq/contents/versions.json`) pĹ™Ă­mo z prohlĂ­ĹľeÄŤe
5. GitHub Pages rebuild (~1 min) â†’ strĂˇnka pĹ™ejde do maintenance/normĂˇlnĂ­ho mĂłdu
6. PAT potĹ™ebuje scope: `repo` (nebo `contents:write`)

**Pro:** Jeden klik z prohlĂ­ĹľeÄŤe, ĹľĂˇdnĂ˝ terminĂˇl. **Proti:** JednorĂˇzovĂ˝ setup PAT, token v localStorage.

### RozhodnutĂ­ ÄŤekĂˇ na Davida

- Volba B je doporuÄŤenĂˇ â€” profesionĂˇlnĂ­, bez terminĂˇlu
- Po potvrzenĂ­ varianty Claude implementuje celĂ© Ĺ™eĹˇenĂ­ (3 soubory + volitelnÄ› 2 PS1 skripty)

### TechnickĂˇ poznĂˇmka k overlay

Overlay bude `position:fixed; inset:0; z-index:9999` â€” pĹ™ekryje vĹˇe vÄŤetnÄ› PROMO/welcome dialogu. NaÄŤĂ­tĂˇnĂ­: synchronnĂ­ check hned po fetchnutĂ­ `versions.json`, pĹ™ed `renderAll()`. Logo: stĂˇvajĂ­cĂ­ HOPI AppIQ SVG/img asset.

### RozhodnutĂ­ (David, 2026-04-19)

**Zvolena Varianta B â€” GitHub API pĹ™Ă­mĂ˝ toggle z prohlĂ­ĹľeÄŤe.**

DĹŻvod: David chce jednĂ­m klikem z prohlĂ­ĹľeÄŤe bez terminĂˇlu. BezpeÄŤnost: PAT token s `repo` scope uloĹľen v localStorage Admin Center â€” pĹ™ijatelnĂ© pro internĂ­ nĂˇstroj.

**PĹ™idĂˇno:** vĂ˝vojĂˇĹ™skĂ˝ bypass â€” Admin Center nastavĂ­ `localStorage['appiq_dev_bypass']='1'` â†’ David vidĂ­ normĂˇlnĂ­ strĂˇnku i pĹ™i zapnutĂ© maintenance. TestovĂˇnĂ­ anonymnĂ­m oknem (Ctrl+Shift+N) = pohled bÄ›ĹľnĂ©ho nĂˇvĹˇtÄ›vnĂ­ka.

### ImplementaÄŤnĂ­ plĂˇn (Varianta B)

| Soubor | ZmÄ›na |
|--------|-------|
| `versions.json` | + `"maintenance": false` |
| `_ghpages_root_index.html` | maintenance overlay (position:fixed, z-index:9999, logo + CS/EN text) |
| `index.html` (deployed root) | stejnĂ© |
| Studio Hub `index.html` | maintenance toggle widget (badge stav + ON/OFF tlaÄŤĂ­tko â†’ GitHub API) |
| Admin Center `admin/index.html` | PAT token input + dev bypass toggle |

### GitHub API flow (toggle)

1. `GET /repos/H-GR-FICO/appiq/contents/versions.json` â†’ zĂ­skat SHA + base64 obsah
2. DekĂłdovat, pĹ™epnout `maintenance` flag
3. `PUT /repos/H-GR-FICO/appiq/contents/versions.json` â†’ novĂ˝ obsah + SHA + commit zprĂˇva
4. GitHub Pages rebuild ~1 min â†’ overlay se zobrazĂ­/zmizĂ­

### PAT setup (David, jednorĂˇzovÄ›)

GitHub.com â†’ Settings â†’ Developer settings â†’ Personal access tokens â†’ Tokens (classic) â†’ New token â†’ scope: `repo` â†’ Generate â†’ zkopĂ­rovat â†’ Admin Center â†’ pole "GitHub Token" â†’ UloĹľit

---

## AIQ-00105 â€” OIL: pole userExplanation ke vĹˇem ĂşkolĹŻm

**Datum:** 2026-04-19 | **Status:** CLOSED | **Priorita:** MED
**Kontext:** David nerozumÄ›l nÄ›kterĂ˝m technickĂ˝m termĂ­nĹŻm v OIL.json (taskType, testType, effort, â€¦). PoĹľĂˇdal o pĹ™idĂˇnĂ­ pole, kterĂ© vysvÄ›tluje kaĹľdĂ˝ Ăşkol jednoduĹˇe â€” jako laikovi.

### RozhodnutĂ­ (David, 2026-04-19)

**Zvolena Varianta C â€” doplnit VĹ ECHNY existujĂ­cĂ­ zĂˇznamy (113 ĂşkolĹŻ) + pĹ™idat pole do schema.**

- Pole `userExplanation` pĹ™idĂˇno za `note` v kaĹľdĂ©m task objektu
- FormĂˇt: plain Czech, max 2 vÄ›ty, ĹľĂˇdnĂ˝ technickĂ˝ Ĺľargon
- RetroaktivnÄ› doplnÄ›no 113 zĂˇznamĹŻ v jednĂ© batch operaci
- Schema rozĹˇĂ­Ĺ™eno: kaĹľdĂ˝ novĂ˝ AIQ task musĂ­ mĂ­t `userExplanation` od vzniku

### User explanation pravidlo (od v7.21)

KaĹľdĂ˝ novĂ˝ zĂˇznam v OIL.json musĂ­ obsahovat pole `userExplanation` â€” vysvÄ›tlenĂ­ pro netechnickĂ©ho ÄŤtenĂˇĹ™e:
- max 2 vÄ›ty
- bez technickĂ©ho Ĺľargonu (ĹľĂˇdnĂ© "IIFE", "base64", "DOM", "SHA"...)
- odpovÄ›ÄŹ na otĂˇzku: "Co jsme udÄ›lali a proÄŤ je to dĹŻleĹľitĂ©?"

---

## AIQ-00128 â€” Feature: Background music tok (promo â†’ version selector â†’ Studio Hub)

**Datum:** 2026-04-19 | **Status:** REVIEW | **Priorita:** HIGH
**Kontext:** David poĹľadoval specifickĂ˝ tok hudby â€” bomba vybuchne (bez hudby), uĹľivatel klikne a pokraÄŤuje na vĂ˝bÄ›r verzĂ­ kde se hudba spustĂ­ a zobrazĂ­ se đź”Š tlaÄŤĂ­tko. Preference (zapnuto/vypnuto) se pĹ™enĂˇĹˇĂ­ do Studio Hub.

### ZĂˇmÄ›r (David)

> "na promo obrazovce vybuchne bomba, uĹľivatel klikne a jde dĂˇl a hudba se pustĂ­ aĹľ na vĂ˝bÄ›ru verzĂ­, tam zĂˇroveĹ pĹ™ibude tlaÄŤĂ­tko na ztlumenĂ­ a tato volba se pĹ™enĂˇĹˇĂ­ jiĹľ dĂˇle, pokud jde do studia, hraje stĂˇle tato hudba"

### Implementace

**`repos/appiq/index.html` (version selector):**
- `showPromoFullscreen`: ĹľĂˇdnĂ© `playMp3Loop()` â€” promo bez hudby
- `dismissFull()`: po 650ms (animace) â†’ `startBgMusic()`
- `startBgMusic()`: pokud `appiq_music !== 'off'` â†’ spustĂ­ loop + uloĹľĂ­ 'on' + zobrazĂ­ `#music-toggle`
- `#music-toggle` tlaÄŤĂ­tko: `display:none` v HTML, zobrazĂ­ se aĹľ po dismiss promo
- iOS pre-unlock: v `startApp()` vytvoĹ™Ă­ `_unlock` Audio element v rĂˇmci gesture handleru

**`HOPI_AppIQ_WebPage/Development/index.html` (Studio Hub):**
- IIFE blok s `hubStartMusic()`, `hubStopMusic()`, `hubToggleMusic()`, `hubUpdateBtn()`
- `DOMContentLoaded`: ÄŤte `localStorage.getItem('appiq_music')` â†’ pokud 'on' â†’ autostart
- `#hub-music-btn` v `.hub-nav-right` â€” toggle đź”Š/đź”‡
- SRC: `../../_audio/rubyzephyr-imperium-aeternum-v1-430851.mp3`

### localStorage klĂ­ÄŤe
- `appiq_music`: `'on'` | `'off'` â€” preference pro hudbu (cross-page)

### Deployment
- Commit `da28b40` â€” pushed to main
- Synced: `repos/appiq/v7.21/HOPI_AppIQ_WebPage/Development/index.html`

---

## AIQ-00128T â€” TEST: Background music tok

**Datum:** 2026-04-19 | **Status:** OPEN | **Assignee:** David Gogela
**Linked:** AIQ-00128

### Test checklist
- [ ] Promo (bomb) obrazovka: hudba NEHRAJE
- [ ] Klik na promo â†’ version selector: hudba se spustĂ­, zobrazĂ­ se đź”Š tlaÄŤĂ­tko
- [ ] Toggle đź”Š/đź”‡ na version selectoru funguje, uklĂˇdĂˇ volbu
- [ ] PĹ™echod na Studio Hub: pokud 'on' â†’ hudba autostart
- [ ] đź”‡ v Studio Hub nav funguje
- [ ] Refresh strĂˇnky â€” preference zachovĂˇna

---

## AIQ-00134 â€” HOPIQ Knowledge Base: Cloudflare Worker KV scraping

**Datum:** 2026-04-19 | **Status:** OPEN | **Assignee:** Claude
**Effort:** M | **Est:** 180 min

### Kontext a rozhodnutĂ­
- David chce HOPIQ chatbota natrĂ©novat na obsah z hopiholding.eu + dcery (~15 odkazĹŻ)
- OvÄ›Ĺ™eno: hopiholding.eu je statickĂ© HTML, ~2 500 slov, scraping pĹ™es fetch funguje
- Zvolena Varianta B: Cloudflare Worker + KV cache (ne manuĂˇlnĂ­ kopĂ­rovĂˇnĂ­ textĹŻ)
- KV cache = scraping jednou dennÄ› (Cron trigger), chat requesty ÄŤtou z cache â†’ ĹľĂˇdnĂ© zpomalenĂ­
- NĂˇklady: ~$0.032/dotaz pĹ™i 30k slovech â€” pĹ™ijatelnĂ© pro pilotnĂ­ fĂˇzi
- Odkaz seznam: Worker naÄŤte hopiholding.eu, extrahuje href, fetchuje i dcery

### TechnickĂˇ architektura
- KV namespace: `HOPIQ_KB` (vytvoĹ™Ă­ David v Cloudflare dashboard)
- Cron trigger: `0 6 * * *` (kaĹľdĂ˝ den v 6:00 UTC)
- Worker: pĹ™i chat requestu ÄŤte KV klĂ­ÄŤ `kb_content`, pĹ™idĂˇ do system promptu jako `## HOPI GROUP KNOWLEDGE BASE`
- Fallback: pokud KV prĂˇzdnĂ© â†’ pokraÄŤuje bez KB sekce (chatbot funguje normĂˇlnÄ›)

### Kroky implementace
1. David vytvoĹ™Ă­ KV namespace v Cloudflare dashboard (nĂˇvod pĹ™ipravĂ­ Claude)
2. Claude upravĂ­ Worker kĂłd: cron handler + scraping funkce + KV read v message handleru
3. Test: manuĂˇlnĂ­ spuĹˇtÄ›nĂ­ cron, ovÄ›Ĺ™enĂ­ KV obsahu, test chatbota

---

## AIQ-00134-T1 â€” TEST: HOPIQ Knowledge Base integrace

**Datum:** 2026-04-19 | **Status:** OPEN | **Assignee:** Claude
**Linked:** AIQ-00134

### Test checklist
- [ ] Cron trigger spustitelnĂ˝ manuĂˇlnÄ› (wrangler dev --test-scheduled)
- [ ] KV obsahuje scraped text po spuĹˇtÄ›nĂ­
- [ ] Worker pĹ™idĂˇvĂˇ KB sekci do system promptu
- [ ] Chatbot odpovĂ­dĂˇ relevantnÄ› na dotazy o HOPI skupinÄ›
- [ ] Fallback: KV prĂˇzdnĂ© â†’ chat funguje normĂˇlnÄ›

---

## AIQ-00135 â€” HOPIQ Center: dedicated Studio sekce

**Datum:** 2026-04-19 | **Status:** OPEN | **Assignee:** Claude
**Effort:** M | **Est:** 180 min

### Kontext a rozhodnutĂ­
- David chce centralizovat sprĂˇvu HOPIQ chatbota + budoucĂ­ch agentĹŻ do jednĂ© Studio sekce
- NovĂˇ karta v Studio Hub + novĂˇ strĂˇnka hopiq/index.html
- ZĂˇloĹľky: Chatbot (live konzole), Knowledge Base (KV status), Agents (placeholder Phase 2)
- VizuĂˇl konzistentnĂ­ s ostatnĂ­mi centry (dark theme, nav header, _hopiq.js)
- Dependency na AIQ-00134 pouze pro Knowledge Base zĂˇloĹľku â€” zbytek nezĂˇvislĂ˝

### Struktura strĂˇnky
- `HOPI_AppIQ_WebPage/Development/hopiq/index.html`
- Nav: logo + "HOPIQ Center" + music btn
- ZĂˇloĹľky: đź¤– Chatbot | đź“š Knowledge Base | đź”® Agents
- Chatbot zĂˇloĹľka: embedded chat UI (full-screen verze HOPIQ widgetu)
- KB zĂˇloĹľka: seznam URL zdrojĹŻ, datum poslednĂ­ aktualizace z KV, tlaÄŤĂ­tko Force refresh
- Agents zĂˇloĹľka: placeholder "Phase 2 â€” AI Agents coming soon" s roadmap popisem

---

## AIQ-00135-T1 â€” TEST: HOPIQ Center funkÄŤnost a vizuĂˇl

**Datum:** 2026-04-19 | **Status:** OPEN | **Assignee:** David Gogela
**Linked:** AIQ-00135

### Test checklist
- [ ] Hub karta zobrazena, odkaz funkÄŤnĂ­
- [ ] ZĂˇloĹľky pĹ™epĂ­najĂ­ sprĂˇvnÄ›
- [ ] Chatbot konzole odesĂ­lĂˇ dotazy a vracĂ­ odpovÄ›di
- [ ] Knowledge Base zĂˇloĹľka zobrazuje status KV
- [ ] Nav header konzistentnĂ­ s ostatnĂ­mi centry
- [ ] Dark theme, logo, _hopiq.js widget funkÄŤnĂ­

---

## AIQ-00136 â€” Research: Effective Work with AI

**Datum:** 2026-04-19 | **Status:** OPEN | **Assignee:** Claude | **Priority:** TOP

### Kontext
David narĂˇĹľel na vyÄŤerpĂˇnĂ­ kreditu a tokenĹŻ. CĂ­l: systematizovat spoluprĂˇci Davidâ†”Claude tak, aby kaĹľdĂˇ session byla maximĂˇlnÄ› efektivnĂ­ a levnĂˇ.

### Model selection framework (nĂˇvrh)
| Effort | taskType | DoporuÄŤenĂ˝ model | Cena input/1M |
|--------|----------|-----------------|---------------|
| XS/S | fix, content, test, docs | Haiku 4.5 | $0.80 |
| S/M | development, research | Sonnet 4.6 (aktuĂˇlnĂ­) | $3.00 |
| L/XL | architecture, complex refactor | Opus 4.7 | $15.00 |

### Token-saving pravidla (nĂˇvrh)
1. **Glob/Grep mĂ­sto Read** â€” neÄŤĂ­st celĂ© soubory pokud hledĂˇme konkrĂ©tnĂ­ ÄŤĂˇst
2. **Explore agent** â€” pro prĹŻzkum codebase, ne main context
3. **Batch operace** â€” vĂ­ce zmÄ›n v jednom kole, ne iterace po jednĂ©
4. **Pre-task scope** â€” David zadĂˇ: co pĹ™esnÄ› chce, co NEmÄ›nit, success criteria â†’ mĂ©nÄ› revision round
5. **Session focus** â€” jeden vÄ›tĹˇĂ­ cĂ­l per session, ne 5 malĂ˝ch tĂ©mat
6. **CLAUDE.md diet** â€” trimovat redundantnĂ­ pravidla (kaĹľdĂ© naÄŤtenĂ­ stojĂ­ tokeny)
7. **Prompt caching** â€” Worker cachuje system prompt â†’ 90% Ăşspora na opakovanĂ© HOPIQ dotazy (AIQ-00138)
8. **Haiku pro HOPIQ** â€” jiĹľ implementovĂˇno âś“

### Anti-patterns (plĂ˝tvĂˇnĂ­ tokeny)
- OtevĹ™enĂ© otĂˇzky bez kontextu ("co bychom mohli udÄ›lat s X?")
- ÄŚtenĂ­ velkĂ˝ch souborĹŻ bez grep/offset
- OpakovanĂ© vysvÄ›tlovĂˇnĂ­ co je AppIQ/HOPI na zaÄŤĂˇtku session (â†’ proto BRIEFING.md)
- Revize vizuĂˇlu bez specifikace co pĹ™esnÄ› vadĂ­
- "UdÄ›lej to hezÄŤĂ­" bez reference k existujĂ­cĂ­mu stylu

### DodateÄŤnĂˇ doporuÄŤenĂ­ pro Davida
- ZadĂˇvat Ăşkoly ve formĂˇtu: **[Co]** + **[Kde]** + **[ProÄŤ]** + **[Co NEmÄ›nit]**
- PĹ™ed session Ĺ™Ă­ct: "dnes chci dokonÄŤit X a Y" â†’ Claude si sestavĂ­ plĂˇn
- Pro jednoduchĂ© dotazy pouĹľĂ­vat HOPIQ chatbot mĂ­sto Claude Code (Haiku = 10Ă— levnÄ›jĹˇĂ­)
- Schvalovat REVIEW tasky v dĂˇvkĂˇch na konci session, ne prĹŻbÄ›ĹľnÄ›

---

## AIQ-00137 â€” Feature: AI Work Center (FC-9)

**Datum:** 2026-04-19 | **Status:** OPEN | **Assignee:** Claude | **Priority:** TOP

### Struktura centra
- `aiwork/index.html` â€” 4 zĂˇloĹľky
- **đź“Š Model Guide** â€” tabulka taskTypeâ†’model, kalkulĂˇtor spotĹ™eby, vysvÄ›tlenĂ­ rozdĂ­lĹŻ
- **đź“ť Prompt Cookbook** â€” Ĺˇablony pro fix/feature/review/arch, anti-patterns, pĹ™Ă­klady
- **đź“‹ Pravidla** â€” formalizovanĂˇ pravidla Davidâ†”Claude (zobrazeno i v CLAUDE.md)
- **đź’° Token Tracker** â€” odhad spotĹ™eby aktuĂˇlnĂ­ho sprintu dle OIL.json

### Hub karta
- Barva: `#0891b2` (cyan â€” AI/efficiency feel, odliĹˇnĂˇ od HOPIQ fialovĂ©)
- FC-9, ikona: âšˇ

---

## AIQ-00138 â€” Feature: Prompt Caching ve Worker

**Datum:** 2026-04-19 | **Status:** OPEN | **Assignee:** Claude | **Priority:** TOP

### TechnickĂˇ implementace
Anthropic API podporuje prompt caching â€” pĹ™idat `cache_control` na system ÄŤĂˇst:
```json
{
  "system": [{"type": "text", "text": "...", "cache_control": {"type": "ephemeral"}}],
  "messages": [...]
}
```
Worker musĂ­ zmÄ›nit zpĹŻsob odesĂ­lĂˇnĂ­ system promptu z string na array. TTL cache: 5 minut.
Ăšspora: ~90% na system prompt tokeny pĹ™i opakovanĂ˝ch dotazech ve stejnĂ© session.

---

## AIQ-00139 â€” Docs: CLAUDE.md token/cost optimalizace

**Datum:** 2026-04-19 | **Status:** OPEN | **Assignee:** Claude | **Priority:** TOP

### Co pĹ™idat do CLAUDE.md
- Model selection tabulka (taskType + effort â†’ model)
- Token-saving pravidla (batch, Explore agent, pre-scope)
- Pravidlo: pro jednoduchĂ© dotazy David â†’ HOPIQ chatbot (ne Claude Code)
- Session opening checklist (kratĹˇĂ­ neĹľ souÄŤasnĂ˝)

---

## AIQ-00140 â€” Content: Prompt Trainer â€” vĂ˝vojĂˇĹ™i + testeĹ™i

**Datum:** 2026-04-19 | **Status:** OPEN | **Assignee:** Claude | **Priority:** TOP

### Struktura knihovny

**Pro vĂ˝vojĂˇĹ™e:**
- `fix:` Oprava bugu â€” [soubor:Ĺ™Ăˇdek], [popis chovĂˇnĂ­], [oÄŤekĂˇvanĂ© chovĂˇnĂ­], [co NEmÄ›nit]
- `feature:` NovĂˇ funkce â€” [nĂˇzev], [kde], [acceptance criteria], [vizuĂˇlnĂ­ reference]
- `refactor:` Refaktor â€” [co], [proÄŤ], [co musĂ­ zĹŻstat funkÄŤnĂ­]
- `review:` Code review â€” [soubor], [na co se zamÄ›Ĺ™it], [kontext]
- `arch:` Architektura â€” [problĂ©m], [kontext systĂ©mu], [constraints]

**Pro testery:**
- `uat:` UAT checklist â€” [feature], [user flow], [edge cases k ovÄ›Ĺ™enĂ­]
- `bug:` Bug report â€” [kroky k reprodukci], [expected vs actual], [prostĹ™edĂ­]
- `regression:` Regrese â€” [co se zmÄ›nilo], [co ovÄ›Ĺ™it Ĺľe funguje dĂˇl]
- `acceptance:` Acceptance criteria â€” [user story], [kritĂ©ria splnÄ›nĂ­]

### FormĂˇt kaĹľdĂ© Ĺˇablony
```
## [nĂˇzev]
**Kdy pouĹľĂ­t:** ...
**Template:**
[COPY-PASTE READY TEXT S PLACEHOLDERY]
**PĹ™Ă­klad:**
[VYPLNÄšNĂť PĹĂŤKLAD]
**Anti-pattern:** Co NEdÄ›lat
```

---

## AIQ-00137 â€” Budget Center zĂˇloĹľka (5th tab) â€” design spec

**Datum:** 2026-04-19 | **Aktualizace k:** zĂˇloĹľka 5 â€” Budget Center

### Data model (localStorage `hopiq_budget_topups`)
```json
[
  {"id": 1, "date": "2026-04-17", "amount": 50, "currency": "USD", "note": ""},
  {"id": 2, "date": "2026-04-19", "amount": 50, "currency": "USD", "note": ""}
]
```
DobitĂ­ se loguje ruÄŤnÄ› â€” David zadĂˇ datum + ÄŤĂˇstku. Frekvence: kaĹľdĂ© 2â€“3 dny.

### Selector obdobĂ­
- AktuĂˇlnĂ­ mÄ›sĂ­c (default)
- MinulĂ˝ mÄ›sĂ­c
- PoslednĂ­ch 7 / 30 dnĂ­
- VlastnĂ­ rozsah (date picker odâ€“do)

### VĂ˝poÄŤty za vybranĂ© obdobĂ­
- **Dobito:** souÄŤet top-up zĂˇznamĹŻ v obdobĂ­
- **ÄŚerpĂˇno (odhad):** souÄŤet `costUsdEstimate` CLOSED taskĹŻ v obdobĂ­ (z OIL.json dle `completedAt`)
- **ZbĂ˝vĂˇ (odhad):** dobito â’ ÄŤerpĂˇno
- **PlĂˇnovĂˇno:** souÄŤet `costUsdEstimate` OPEN/IN PROGRESS taskĹŻ = budoucĂ­ ÄŤerpĂˇnĂ­

### OIL schema â€” novĂˇ pole (pĹ™idat ke kaĹľdĂ©mu tasku)
```json
"modelRecommended": "haiku|sonnet|opus",
"costUsdEstimate": 1.20
```
Auto-fill pravidlo:
| effort | taskType | model | costUsd |
|--------|----------|-------|---------|
| XS | any | haiku | 0.05 |
| S | fix/content/test | haiku | 0.10 |
| S | development/research | sonnet | 1.00 |
| M | development | sonnet | 2.50 |
| L | development | sonnet | 5.00 |
| L | architecture | opus | 12.00 |
| XL | any | opus | 20.00 |

### VizuĂˇl
- Progress bar: ÄŤerpĂˇno / celkem dobito (ÄŤervenĂˇ nad 80%)
- Timeline: sloupcovĂ˝ chart â€” dny v obdobĂ­, zelenĂ© sloupce = dobitĂ­, oranĹľovĂˇ ÄŤĂˇra = kumulativnĂ­ burn
- Tabulka top-upĹŻ: datum, ÄŤĂˇstka, smazat tlaÄŤĂ­tko
- FormulĂˇĹ™: datum (default dnes) + ÄŤĂˇstka + mÄ›na (USD/EUR) + PĹ™idat

---

## AIQ-00145 â€” Coordination Center (BRIEFING.md + CLAUDE.md viewer)

**ZadĂˇnĂ­ (2026-04-20):** PĹ™idat do Studio Hub novou feature kartu "Coordination Center" kterĂˇ zobrazuje obsah `BRIEFING.md` a `CLAUDE.md` â€” aby Claude i David mÄ›li vĹľdy pĹ™Ă­stup k aktuĂˇlnĂ­mu stavu session a dohodnutĂ˝m pravidlĹŻm pĹ™Ă­mo ze Studia, bez hledĂˇnĂ­ souborĹŻ.

**ZĂˇmÄ›r:**
- BRIEFING.md = kde jsme skonÄŤili, otevĹ™enĂ© Ăşkoly, klĂ­ÄŤovĂˇ rozhodnutĂ­
- CLAUDE.md = pravidla projektu, konvence, workflow
- Oba soubory jsou v `_SESSION_START/` (synced pĹ™i archivaci) â€” ideĂˇlnĂ­ zdroj pro fetch

**TechnickĂ© poznĂˇmky:**
- Markdown â†’ HTML loader: staÄŤĂ­ zĂˇkladnĂ­ (nadpisy `#`, tuÄŤnĂ© `**`, seznamy `- `, kĂłd bloky)
- Soubory jsou na OneDrive, ne na GitHub Pages â†’ fetch musĂ­ poÄŤĂ­tat s relativnĂ­ cestou nebo inline embed pĹ™i buildu
- Alternativa: zobrazit soubory pĹ™Ă­mo z GitHub repo (raw.githubusercontent.com) â€” vĹľdy aktuĂˇlnĂ­
- UmĂ­stÄ›nĂ­ v Hubu: novĂˇ karta FC-10 nebo panel v existujĂ­cĂ­ struktuĹ™e

**Companion test:** AIQ-00145-T1 (David Gogela, functional test)

---

## AIQ-00201 â€” DATA Layer: Dimensional Model (DB-Ready)

**Datum:** 2026-04-20 | **Status:** OPEN

### StrategickĂ© potvrzenĂ­

Session 2026-04-20: David explicitnÄ› poĹľĂˇdal o potvrzenĂ­ database readiness. **Potvrzeno:**

PĹ™echod na libovolnou databĂˇzi (PostgreSQL, Azure SQL, SAP HANA, Oracle, MongoDB...) vyĹľaduje:
1. Spustit `DATA/_migrations/` skripty â†’ vytvoĹ™Ă­ tabulky
2. Naplnit `DATA/_seeds/` JSON do DB â†’ seed ÄŤĂ­selnĂ­ky
3. Upravit `_data.js` â†’ volĂˇ API mĂ­sto JSON (1 soubor)
4. VĹˇe ostatnĂ­ â†’ BEZE ZMÄšNY

Pattern: **Backend for Frontend (BFF) + Repository Abstraction Layer.**
Model: Salesforce / SAP BTP / ServiceNow. ProfesionĂˇlnĂ­ pĹ™Ă­stup.

### TĹ™i typy platformovĂ˝ch dat

```
TYP 1 â€” Infrastruktura (ÄŤĂ­selnĂ­ky + dimenze)    â†’ DATA/_schemas/dimensions/ + _seeds/
TYP 2 â€” Tenant/App data (co zĂˇkaznĂ­k uklĂˇdĂˇ)    â†’ DATA/_schemas/entities/ + TENANT isolation
TYP 3 â€” Analytika (usage, billing, AI)          â†’ DATA/_schemas/facts/ (star schema)
```

### Dimension tabulky (ÄŤĂ­selnĂ­ky) â€” kompletnĂ­ seznam

| Tabulka | KlĂ­ÄŤovĂ© sloupce | Vazba |
|---------|----------------|-------|
| DIM_WORLD | id, name_cs, name_en | root |
| DIM_SECTOR | id, world_id, name | â†’ DIM_WORLD |
| DIM_INDUSTRY | id, sector_id, parent_id (hierarchie) | â†’ DIM_SECTOR |
| DIM_SCALE_LEVEL | id, world_id, level_num, parent_id | â†’ DIM_WORLD |
| DIM_DOMAIN | id, world_id, name_cs, name_en | â†’ DIM_WORLD |
| DIM_MODE | id, name, time_estimate_hours | standalone |
| DIM_AI_LEVEL | id, level_num, name_cs, description | standalone |
| DIM_COMPLIANCE | id, name, mandatory_for, region | standalone |
| DIM_INTEGRATION | id, name, connector_type, auth_type | standalone |
| DIM_TIER | id, level, max_users, ai_level_max, price | standalone |
| DIM_LANGUAGE | id, name, flag, rtl | standalone |
| DIM_ZONE | id, name, folder_path, persona | standalone |

### VazbovĂ© tabulky (propojenĂ© ÄŤĂ­selnĂ­ky)

INDUSTRY_COMPLIANCE (industry â†” compliance) Â· MANIFEST_SCALE Â· MANIFEST_DOMAIN Â· MANIFEST_MODULE Â· MANIFEST_INTEGRATION Â· MANIFEST_COMPLIANCE Â· MANIFEST_INHERITANCE Â· TIER_FEATURE Â· USER_ROLE Â· TENANT_SCALE

### FaktovĂ© tabulky (star schema)

FACT_USAGE Â· FACT_BILLING Â· FACT_AI_CALLS Â· FACT_INTEGRATION_CALLS Â· FACT_PLATFORM_METRICS (centrĂˇlnĂ­, napojenĂˇ na vĹˇechny dimenze)

### Vztah k manifest.json souborĹŻm

```
MARKETPLACE/_registry/enterprise-catalog.json  â†â†’  DATA/_seeds/dim_industry.json
        â†‘                                                  â†‘
  Developer view                                    DB-ready view
  (volnĂ© JSON)                                      (normalizovanĂ˝)
```

ObÄ› reprezentace jsou v sync â€” `_data.js` pĹ™epĂ­nĂˇ mezi nimi dle `AppIQ.config.backend`.

### _data.js dual-mode kontrakt

```javascript
// config pĹ™epĂ­naÄŤ (AppIQ.config.backend = 'json' | 'api')
DataService.getIndustries = async (filter) =>
  AppIQ.config.backend === 'api'
    ? await fetch(`/api/v1/dimensions/industries?${filter}`)
    : await readLocalSeeds('dim_industry.json', filter)

// StejnĂ© API pro volajĂ­cĂ­ kĂłd â€” vĹľdy:
const industries = await DataService.getIndustries({ sector: 'private' })
```

### SloĹľkovĂˇ struktura â€” NEMÄšNĂŤ SE

DATA/ folder a vĹˇechny podsloĹľky jiĹľ existujĂ­ (AIQ-00195). PĹ™ibyde obsah:
- `DATA/_schemas/dimensions/` â†’ SQL CREATE TABLE soubory
- `DATA/_schemas/facts/` â†’ star schema SQL
- `DATA/_schemas/entities/` â†’ TENANT, APP, USER SQL
- `DATA/_schemas/relationships/` â†’ vazbovĂ© tabulky SQL
- `DATA/_migrations/001_init_dimensions.sql` â†’ prvnĂ­ migrace
- `DATA/_seeds/` â†’ JSON ÄŤĂ­selnĂ­ky (DB-ready format)

---

## AIQ-00195 aĹľ AIQ-00200 â€” 9D Architektura: FyzickĂˇ struktura + Dokumentace + Web

**Datum:** 2026-04-20 | **Status:** IN PROGRESS (AIQ-00195) / OPEN (ostatnĂ­)

### StrategickĂ© rozhodnutĂ­ â€” klĂ­ÄŤovĂˇ diskuse dne

Session 2026-04-20: David schvĂˇlil kompletnĂ­ 9D produktovĂ˝ model a odpovĂ­dajĂ­cĂ­ adresĂˇĹ™ovou architekturu. Toto je nejdĹŻleĹľitÄ›jĹˇĂ­ architektonickĂ© rozhodnutĂ­ projektu.

### 9 DimenzĂ­ produktovĂ©ho modelu

| # | Dimenze | Hodnoty |
|---|---------|---------|
| 1 | **SvÄ›t** | Enterprise Â· Home |
| 2 | **Sektor** | Private Â· Public Â· State |
| 3 | **Industry** | 20+ odvÄ›tvĂ­ Ă— sektor (viz PRODUCT_MODEL.md) |
| 4 | **Scale** | Enterprise L1â€“L6 Â· Home L0aâ€“L5 |
| 5 | **DomĂ©novĂˇ funkce** | 12+ oblastĂ­ per svÄ›t |
| 6 | **MĂłd** | Assemble Â· Template Â· Custom |
| 7 | **AI Maturita** | S0 ManuĂˇlnĂ­ â†’ S4 AutonomnĂ­ |
| 8 | **PlatformovĂˇ ZĂłna** | StudioÂ·PublishÂ·MarketplaceÂ·UseÂ·MarketÂ·Invest |
| 9 | **ObchodnĂ­ model** | B2BÂ·B2B2CÂ·B2CÂ·MarketplaceÂ·White-labelÂ·Reseller |

### MapovĂˇnĂ­ dimenzĂ­ na folder strukturu

```
DIM 8 (ZĂłna)          â†’ Top-level sloĹľky: STUDIO/ MARKETPLACE/ HUB/ MARKET/ INVEST/
DIM 1,2,3 (WorldĂ—SectorĂ—Industry) â†’ MARKETPLACE/app-catalog/enterprise/{private,public,state}/[industry]/
DIM 4,5,7 (Scale,Domain,AI)       â†’ manifest.json DATA soubory (ne sloĹľky)
DIM 6 (MĂłd)           â†’ app-catalog/ vs template-store/ vs STUDIO/
DIM 9 (Biz model)     â†’ CICD/_configs/tiers/ + _config.js feature flags
```

### APP Story â€” Marketplace ĹľivotnĂ­ cyklus

â‘ Vznik â†’ â‘ˇDiscovery (AI) â†’ â‘˘Onboarding (AI) â†’ â‘ŁAdopce â†’ â‘¤Komunita â†’ â‘ĄEvoluce â†’ â‘¦Monetizace (70/30 revenue share)

### manifest.json â€” klĂ­ÄŤovĂ˝ princip ĹˇkĂˇlovĂˇnĂ­

```json
{
  "id": "enterprise.private.healthcare.hospital-operations",
  "world": "enterprise", "sector": "private", "industry": "healthcare",
  "scale": ["L1","L2","L3","L4"],
  "domains": ["operations","hr","reporting"],
  "mode": ["assemble","template"],
  "aiLevel": "S2",
  "compliance": ["gdpr","hipaa"],
  "tiers": ["pro","business","enterprise"],
  "extends": "enterprise.private.base",
  "modules": ["scheduling","hr","reporting"],
  "integrations": ["sap","teams","powerbi"]
}
```

**PĹ™idĂˇnĂ­ novĂ© industrie = pĹ™idĂˇnĂ­ sloĹľky + manifest.json. Nula Ĺ™ĂˇdkĹŻ kĂłdu.**

### DokumentaÄŤnĂ­ vrstva (vĂ˝stupy AIQ-00196, 197, 198)

```
HOPI_TechIQ/DOCS/architecture/
â”śâ”€â”€ PRODUCT_MODEL.md        â† 9D model, taxonomie, manifest schema
â”śâ”€â”€ REPO_STRUCTURE.md       â† Folder architektura + dimension mapping
â”śâ”€â”€ PLATFORM_OVERVIEW.md    â† Co platforma je, pro koho, jak funguje
â”śâ”€â”€ DEV_GUIDE.md            â† Onboarding pro vĂ˝vojĂˇĹ™e (AIQ-00187)
â”śâ”€â”€ INTEGRATION_ARCHITECTURE.md â† API Gateway + Connectors + MCP (AIQ-00188)
â””â”€â”€ decisions/              â† Architecture Decision Records
```

### Web vrstvy (vĂ˝stupy AIQ-00199, 200)

- **INVEST/product-design/** â€” investor-grade HTML, 9D vizuĂˇl, business model
- **MARKET/website/** â€” veĹ™ejnĂ˝ marketing web, zĂˇkaznickĂˇ perspektiva, SEO

### Dependency chain

```
AIQ-00195 (fyzickĂˇ struktura)
â†’ AIQ-00196 (PRODUCT_MODEL.md)
â†’ AIQ-00197 (REPO_STRUCTURE.md)
â†’ AIQ-00198 (PLATFORM_OVERVIEW.md)
â†’ AIQ-00199 (Investor HTML â€” vychĂˇzĂ­ z docs)
â†’ AIQ-00200 (Marketing web â€” vychĂˇzĂ­ z docs)
```

---

## AIQ-00191 aĹľ AIQ-00194 â€” Vertical Layer + Investor Docs

**Datum:** 2026-04-20 | **Status:** OPEN

### Kontext

Session 2026-04-20: David definoval potĹ™ebu plnĂ© vertikĂˇlnĂ­ taxonomie jako souÄŤĂˇsti App Catalog a Template Store architektury. ÄŚtyĹ™i technickĂ© Ăşkoly jako companion k BIZ-00034â€“00037.

### KlĂ­ÄŤovĂ˝ princip

VertikĂˇly = data (manifest.json), ne kĂłd. PĹ™idĂˇnĂ­ novĂ© business oblasti = pĹ™idĂˇnĂ­ manifestu. Infrastruktura sdĂ­lena. Model: Salesforce AppExchange / SAP BTP.

### Folder struktura â€” dopad

```
PRODUCT/publication/
â”śâ”€â”€ _registry/               â† enterprise-catalog.json + home-catalog.json
â”śâ”€â”€ app-catalog/
â”‚   â”śâ”€â”€ enterprise/[vertikĂˇla]/manifest.json
â”‚   â””â”€â”€ home/[vertikĂˇla]/manifest.json
â””â”€â”€ template-store/
    â”śâ”€â”€ enterprise/ (by-org-level, by-function, by-industry)
    â””â”€â”€ home/ (individual, family)
```

### Vazby

AIQ-00191 (Enterprise catalog) â†” BIZ-00034
AIQ-00192 (Home catalog) â†” BIZ-00035
AIQ-00193 (Vertical Layer Architecture) â†” BIZ-00036
AIQ-00194 (BIZ HUB Produktâ†’Design HTML) â†” BIZ-00037

---

## AIQ-00189 a AIQ-00190 â€” Studio Spec + Publication Layer Spec

**Datum:** 2026-04-20 | **Status:** OPEN

### Kontext

Session 2026-04-20: David definoval kompletnĂ­ produktovou vizi. DvÄ› novĂ© technickĂ© specifikace jako companion k BIZ-00031 a BIZ-00032.

**AIQ-00189 â€” Studio Tech Spec:**
ChybÄ›jĂ­cĂ­ funkce: Release Manager, CI/CD Dashboard, Team Management, API Explorer, Design System Viewer, Audit Trail, AI Code Assistant embedded, Notification Center, Database Admin. VĂ˝stup: STUDIO_TECH_SPEC.md.

**AIQ-00190 â€” Publication Layer Tech Spec:**
TĹ™i mody: ASSEMBLE (No-Code) / TEMPLATE (Low-Code) / CUSTOM (Pro-Code). SouÄŤĂˇsti: App Catalog, Template Store, Builder UI, Deployment Manager, Usage Analytics, Marketplace (fĂˇze 3+). AI prĹŻvodce na kaĹľdĂ©m modu. VĂ˝stup: PUBLICATION_LAYER_TECH_SPEC.md.

### Vazba na business stream

AIQ-00189 â†” BIZ-00031 | AIQ-00190 â†” BIZ-00032 | TrĹľnĂ­ strategie â†’ BIZ-00033

---

## AIQ-00188 â€” Integration Layer Architecture (API Gateway + Connectors + MCP)

**Datum:** 2026-04-20 | **Status:** OPEN

### StrategickĂ© rozhodnutĂ­

Session 2026-04-20: David explicitnÄ› poĹľĂˇdal o promyĹˇlenĂ­ celĂ© integraÄŤnĂ­ architektury "za 1000 krokĹŻ dĂˇl" â€” aby platforma mohla nativnÄ› napojit SAP, BNS, Monday, SharePoint, Teams, Power BI, IDWare a HOPI web bez budoucĂ­ho refaktoru.

### ÄŚtyĹ™vrstvĂˇ architektura

```
VISUAL LAYER  â†’  API GATEWAY  â†’  CONNECTOR LAYER  â†’  AI LAYER (MCP)
```

KaĹľdĂˇ vrstva se mÄ›nĂ­ nezĂˇvisle. `_data.js` = jedinĂ˝ kontaktnĂ­ bod mezi frontend a vĹˇĂ­m ostatnĂ­m.

### SystĂ©my k napojenĂ­

SAP (P1), BNS (P1), SharePoint (P1), Teams (P2), Power BI (P2), Monday (P2), IDWare (P3), HOPI Web (P3)

### MCP â€” klĂ­ÄŤovĂˇ technologie

Model Context Protocol (Anthropic standard) = kaĹľdĂ˝ konektor se zaregistruje jako MCP server â†’ Claude API mĹŻĹľe nativnÄ› dotazovat libovolnĂ˝ systĂ©m bez speciĂˇlnĂ­ho kĂłdu.

### VĂ˝stup Ăşkolu

`INTEGRATION_ARCHITECTURE.md` â€” referenÄŤnĂ­ dokument: fĂˇzovĂ˝ plĂˇn, API kontrakt _data.js, MCP server template, konektor Ĺˇablona.

### ZapsĂˇno do CLAUDE.md

Sekce "INTEGRATION ARCHITECTURE" pĹ™idĂˇna jako zĂˇvaznĂ˝ rĂˇmec â€” platĂ­ pro kaĹľdĂ˝ budoucĂ­ krok.

---

## AIQ-00178 aĹľ AIQ-00186 â€” Platform Core (ModulĂˇrnĂ­ architektura v8.0)

**Datum:** 2026-04-20 | **Status:** OPEN (vĹˇechny, poĹ™adĂ­ zĂˇvaznĂ©)

### StrategickĂ© rozhodnutĂ­

Session 2026-04-20: David explicitnÄ› poĹľĂˇdal o kompletnĂ­ re-build platformy jako modulĂˇrnĂ­ho systĂ©mu s jednotnĂ˝m jĂˇdrem. CitĂˇt: *"chtÄ›l bych, aby celĂˇ platforma sdĂ­lela jednotĂ­cĂ­ prvky a mÄ›la jednotnĂ© jĂˇdro, kterĂ© nĂˇs pak bude prolinkovĂˇvat vĹˇemi moduly a nebudem Ĺ™eĹˇit ty technickĂ© problĂ©my"* a *"radĹˇi pomaleji a sprĂˇvnÄ›, kaĹľdĂ˝ dalĹˇĂ­ refaktor stojĂ­ penĂ­ze"*.

Toto je **zĂˇvaznĂˇ strategickĂˇ dohoda** â€” zapsĂˇna do CLAUDE.md sekce "PLATFORM CORE".

### PÄ›t zĂˇvaznĂ˝ch pravidel

| # | Pravidlo | Co to znamenĂˇ |
|---|----------|---------------|
| 1 | Single Responsibility | KaĹľdĂ˝ modul dÄ›lĂˇ JEDNU vÄ›c |
| 2 | Event Bus | Moduly komunikujĂ­ POUZE pĹ™es `AppIQ.emit()` / `AppIQ.on()` |
| 3 | Data Layer | VeĹˇkerĂ˝ pĹ™Ă­stup k datĹŻm pĹ™es `_data.js` â€” swap JSONâ†’RESTâ†’SQL bez zmÄ›ny modulĹŻ |
| 4 | DRY | Ĺ˝ĂˇdnĂ˝ duplicitnĂ­ kĂłd mezi soubory |
| 5 | Backend-Ready | Auth pĹ™ipraven na JWT/OAuth2, data layer na REST API |

### Folder struktura

```
/_core/
  _core.js          â€” Event Bus + Module Loader (AIQ-00179)
  _config.js        â€” Environment & Feature Config (AIQ-00180)
  _platform.css     â€” Design System: CSS variables, responsive (AIQ-00181)

/_modules/
  _hopiq.js         â€” ChatBot modul, event-driven (AIQ-00182)
  _i18n.js          â€” Language / translations, event-driven (AIQ-00183)
  _music.js         â€” Standalone music player (AIQ-00184)
  _auth.js          â€” Auth module, JWT/OAuth2 ready (AIQ-00185)
  _data.js          â€” Data Service Layer â€” JSON â†’ REST API â†’ SQL (AIQ-00186)

/_translations/
  cs.json           â€” Czech strings
  en.json           â€” English strings
```

### PoĹ™adĂ­ buildu (zĂˇvaznĂ©)

```
AIQ-00178 (file structure)
â†’ AIQ-00179 (_core.js)
â†’ AIQ-00180 (_config.js)
â†’ AIQ-00181 (_platform.css)
â†’ AIQ-00182 (_hopiq.js)
â†’ AIQ-00183 (_i18n.js)
â†’ AIQ-00184 (_music.js)
â†’ AIQ-00185 (_auth.js)
â†’ AIQ-00186 (_data.js)
â†’ AIQ-00161 (TechIQ Hub)
â†’ AIQ-00162 (TECH HUB)
â†’ AIQ-00163+164 (BIZ HUB)
```

### PĹ™Ă­stup "frame by frame"

KaĹľdĂ˝ krok se ukazuje Davidovi jako wireframe / nĂˇvrh â†’ schvĂˇlenĂ­ â†’ implementace. Ĺ˝ĂˇdnĂ˝ kĂłd bez souhlasu. PomalejĹˇĂ­ tempo = sprĂˇvnĂˇ architektura = nulovĂ˝ budoucĂ­ refaktor.

### Backend readiness zĂˇruky

| Vrstva | NynĂ­ | Po integraci |
|--------|------|-------------|
| Data | JSON soubory | REST API / SQL â€” jen `_data.js` se mÄ›nĂ­ |
| Auth | localStorage flag | JWT / OAuth2 â€” jen `_auth.js` se mÄ›nĂ­ |
| i18n | JSON soubory | CMS / DB â€” jen `_i18n.js` se mÄ›nĂ­ |
| Config | JS constants | ENV variables / remote config |

---

## AIQ-00187 â€” DEV_GUIDE.md â€” Developer onboarding dokumentace

**Datum:** 2026-04-20 | **Status:** OPEN TOP | **Assignee:** Claude

### ZĂˇmÄ›r

PrĹŻvodce pro novĂ© vĂ˝vojĂˇĹ™e vstupujĂ­cĂ­ do projektu. MusĂ­ Ĺ™Ă­ci: jak postavit lokĂˇlnĂ­ prostĹ™edĂ­, jak psĂˇt modul (Event Bus vzor), jak pĹ™idat Industry (manifest.json), jak spustit testy, jak nasadit. CĂ­l: vĂ˝vojĂˇĹ™ ÄŤte 30 minut, pak mĹŻĹľe pracovat.

### KlĂ­ÄŤovĂ© sekce

1. Quickstart (clone â†’ install â†’ run)
2. Platform Core â€” popis _core.js, _config.js, _platform.css
3. PsanĂ­ modulu â€” Event Bus vzor + template
4. PĹ™idĂˇnĂ­ Industry/Domain â€” 7 krokĹŻ (manifest.json)
5. Data layer â€” _data.js dual-mode kontrakt
6. Testing konvence
7. Deploy pipeline

### VĂ˝stup

`HOPI_TechIQ/DOCS/architecture/DEV_GUIDE.md`

---

## AIQ-00188 â€” Integration Layer Architecture

**Datum:** 2026-04-20 | **Status:** OPEN TOP | **Assignee:** Claude

### ZĂˇmÄ›r

FormĂˇlnĂ­ dokument popisujĂ­cĂ­ 4-vrstvou integraÄŤnĂ­ architekturu. Vstup: strategickĂˇ dohoda zapsanĂˇ v CLAUDE.md (sekce INTEGRATION ARCHITECTURE).

### ÄŚtyĹ™i vrstvy

```
VISUAL LAYER    â†’ HTML + _modules/ + _core/  â† teÄŹ stavĂ­me (v8.x)
      â†“ jedinĂ˝ kontakt = _data.js
API GATEWAY     â†’ Cloudflare Workers / Azure API  â† fĂˇze 2 (v9.x)
      â†“
CONNECTOR LAYER â†’ jeden konektor = jeden systĂ©m  â† fĂˇze 3 (v10.x)
      â†“ MCP (Model Context Protocol)
AI LAYER        â†’ Claude API + MCP servery  â† fĂˇze 3â€“4 (v11.x)
```

### 8 connectorĹŻ (v poĹ™adĂ­ priority)

| SystĂ©m | Typ | Priorita |
|--------|-----|---------|
| SAP | Finance, FX, organizace | P1 |
| BNS | Reporting | P1 |
| MS SharePoint | Dokumenty, smlouvy | P1 |
| MS Teams | Komunikace, notifikace | P2 |
| MS Power BI | BI datovĂ© sady | P2 |
| Monday.com | Projekty, roadmapy | P2 |
| IDWare | Identity, pĹ™Ă­stupy | P3 |
| HOPI Web | VeĹ™ejnĂ˝ obsah | P3 |

### MCP princip

KaĹľdĂ˝ konektor bude zaregistrovĂˇn jako MCP server (Anthropic Model Context Protocol). AI Agent se ptĂˇ pĹ™es MCP â†’ konektor volĂˇ backend systĂ©m â†’ vrĂˇtĂ­ data. AI nikdy nevolĂˇ backend pĹ™Ă­mo.

### VĂ˝stup

`HOPI_TechIQ/DOCS/architecture/INTEGRATION_ARCHITECTURE.md`

---

## AIQ-00189 + AIQ-00190 â€” Studio tech spec + Publication Layer

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** Claude

### Studio (AIQ-00189) â€” chybÄ›jĂ­cĂ­ funkce

David identifikoval 8 funkcĂ­ chybÄ›jĂ­cĂ­ch v pĹŻvodnĂ­m Studio konceptu:
- Release Manager, CI/CD Dashboard, Team Management, API Explorer
- Design System Viewer, Audit Trail, AI Code Assistant, Notification Center

Toto jsou novĂ© sloĹľky v `STUDIO/` â€” `release-manager/`, `cicd-dashboard/`, `team-management/`, `api-explorer/`, `design-system/`, `audit-trail/`, `ai-assistant/`, `notification-center/`. SloĹľky **vytvoĹ™eny** v rĂˇmci AIQ-00195 (211 sloĹľek). TechnickĂ˝ spec musĂ­ definovat co kaĹľdĂˇ funkce dÄ›lĂˇ, jakĂ© jsou vstupy/vĂ˝stupy, jak se integruje s Platform Core.

### Publication Layer (AIQ-00190) â€” 3 mody vstupu

```
ASSEMBLE  (No-Code)   â†’ hotovĂˇ app + konfigurace  â†’ hodiny do nasazenĂ­
TEMPLATE  (Low-Code)  â†’ Ĺˇablona + guided wizard   â†’ dny do nasazenĂ­
CUSTOM    (Pro-Code)  â†’ plnĂ© Studio, vĂ˝voj         â†’ tĂ˝dny do nasazenĂ­
```

SouÄŤĂˇsti Publication Layer: App Catalog â†’ Template Store â†’ Builder UI â†’ Deployment Manager â†’ Usage Analytics â†’ Marketplace (fĂˇze 3+).

---

## AIQ-00191 â€” AIQ-00194 â€” Vertical taxonomy + BIZ HUB design

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** Claude

### Enterprise vertical taxonomy (AIQ-00191)

FormĂˇlnĂ­ JSON katalog vĹˇech Enterprise vertikĂˇl â€” zĂˇklad pro `MARKETPLACE/_registry/enterprise-catalog.json`.

**Private sector industries (19):**
finance, healthcare, logistics, manufacturing, retail, it-services, energy, real-estate, construction, pharma, automotive, media, legal, consulting, food-beverage, agriculture, education, tourism, other

**Public sector types (5):** hospital, school, university, ngo, foundation

**State sector agencies (9):** ministry, municipality, army, police, fire, courts, customs, social-services, other

### Home vertical taxonomy (AIQ-00192)

JSON katalog Home vertikĂˇl â€” zĂˇklad pro `MARKETPLACE/_registry/home-catalog.json`.

**Individual domains (8):** personal-finance, health, fitness, education, home-management, productivity, travel, hobbies

**Family domains (5):** family-finance, parenting, household, health-family, education-family

### BIZ HUB Produktâ†’Design HTML (AIQ-00194)

Investor-grade HTML sekce v BIZ HUB zobrazujĂ­cĂ­ 9D model vizuĂˇlnÄ›. Persony: investor, CEO, CFO. Obsah: 9D model diagram, vertikĂˇlnĂ­ taxonomie, APP Story lifecycle, obchodnĂ­ model tabulka.

---

## AIQ-00195 â€” FyzickĂˇ adresĂˇĹ™ovĂˇ struktura 211 sloĹľek

**Datum:** 2026-04-20 | **Status:** CLOSED | **Assignee:** Claude

### Co bylo vytvoĹ™eno

KompletnĂ­ fyzickĂˇ struktura 211 sloĹľek pod `CO_PROJECT/HOPI_TechIQ/`. VytvoĹ™eno v jednĂ© session pomocĂ­ PowerShell skriptu. Ĺ˝ĂˇdnĂ© soubory â€” pouze prĂˇzdnĂ© sloĹľky (obsah se pĹ™idĂˇ postupnÄ› dle OIL plĂˇnu).

### KlĂ­ÄŤovĂ© sekce

| Top-level | Popis | Sub-sloĹľky |
|-----------|-------|------------|
| PLATFORM/ | SdĂ­lenĂˇ infrastruktura | _core, _modules, _components, _translations, _assets |
| STUDIO/ | ZĂłna BUILD | 12 nĂˇstrojĹŻ incl. release-manager, cicd-dashboard, ai-assistant |
| MARKETPLACE/ | ZĂłna PUBLISH | enterprise/private (19), public (5), state (9); home/individual (8), family (5) |
| INTEGRATION/ | Konektory | 8 connectorĹŻ Ă— {config, models, services, tests} |
| DATA/ | DatovĂˇ vrstva | schemas, migrations, models, seeds, cache |
| AI/ | AI vrstva | agents, mcp-servers, prompts, rag, evaluation |
| SECURITY/ | BezpeÄŤnost | auth, rbac, audit, compliance (gdpr, hipaa, iso27001, soc2, egovernment) |

### Pravidla pro budoucnost

1. NovĂˇ industry â†’ manifest.json do pĹ™Ă­sluĹˇnĂ© sloĹľky, NE novĂˇ sloĹľka
2. NovĂ˝ Platform modul â†’ PLATFORM/_modules/, NE novĂˇ top-level sloĹľka
3. KaĹľdĂˇ novĂˇ sloĹľka MUSĂŤ dostat README.md s 1 vÄ›tou (viz AIQ-00203)

---

## AIQ-00196 + AIQ-00197 + AIQ-00198 â€” DokumentaÄŤnĂ­ trojice

**Datum:** 2026-04-20 | **Status:** OPEN (lze CLOSED â€” soubory existujĂ­) | **Assignee:** Claude

### TĹ™i soubory vytvoĹ™eny

VĹˇechny tĹ™i soubory **fyzicky existujĂ­** v `HOPI_TechIQ/DOCS/architecture/`. Ăškoly lze pĹ™epnout na CLOSED.

| Soubor | AIQ | Obsah |
|--------|-----|-------|
| PRODUCT_MODEL.md | AIQ-00196 | 9D model kompletnĂ­, taxonomie, manifest schema, prĹŻseÄŤĂ­ky |
| REPO_STRUCTURE.md | AIQ-00197 | Folder architektura, dimensionâ†’folder mapping, pravidla, naming |
| PLATFORM_OVERVIEW.md | AIQ-00198 | Co platforma je, proÄŤ vznikla (David story), zĂłny, persony, roadmap |

### KlĂ­ÄŤovĂ© sdÄ›lenĂ­ PLATFORM_OVERVIEW.md

> *"Jeden vĂ˝vojĂˇĹ™ + AI = 100+ vertikĂˇl."* â€” manifest princip ĹˇkĂˇlovĂˇnĂ­

---

## AIQ-00199 + AIQ-00200 â€” Investor WEB + Marketing WEB

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude (technickĂ˝) / David (content)

### OdliĹˇenĂ­ (klĂ­ÄŤovĂ© rozhodnutĂ­)

| | Investor WEB (AIQ-00199) | Marketing WEB (AIQ-00200) |
|---|---|---|
| **Persona** | Investor, potenciĂˇlnĂ­ partner | ZĂˇkaznĂ­k (buyer), IT admin |
| **Jazyk** | Business, trĹľnĂ­ pĹ™Ă­leĹľitost | Product, use-case, benefity |
| **CTA** | "Domluvit schĹŻzku", "StĂˇhnout pitch" | "VyzkouĹˇet", "Demo", "Kontakt" |
| **Obsah** | 9D model, financials, team, TAM | Features, pricing, integrace |
| **Folder** | INVEST/product-design/ | MARKET/website/ |

StrategickĂˇ dohoda 2026-04-20: JSOU DVA ODLIĹ NĂ‰ WEBY. Investor nechce vidÄ›t pricing, zĂˇkaznĂ­k nechce vidÄ›t cap table.

---

## AIQ-00201 â€” DATA Layer: Dimensional Model

**Datum:** 2026-04-20 | **Status:** OPEN TOP | **Assignee:** Claude

### TĹ™i typy dat

| Typ | TeÄŹ (v8.x) | Po DB integraci | Kde se mÄ›nĂ­ |
|-----|-----------|-----------------|-------------|
| ÄŚĂ­selnĂ­ky/dimenze | `DATA/_seeds/*.json` | DB dimension tabulky | pouze `_data.js` |
| Tenant/app data | localStorage / JSON | Tenant-isolated DB | pouze `_data.js` |
| Analytika | logfile | Data warehouse (star schema) | pouze `_data.js` |

### 12 Dimension tabulek

DIM_WORLD Â· DIM_SECTOR Â· DIM_INDUSTRY (hierarchickĂ˝) Â· DIM_SCALE_LEVEL (hierarchickĂ˝) Â· DIM_DOMAIN Â· DIM_MODE Â· DIM_AI_LEVEL Â· DIM_COMPLIANCE Â· DIM_INTEGRATION Â· DIM_TIER Â· DIM_LANGUAGE Â· DIM_ZONE

### Junction tabulky (M:N vazby)

MANIFEST_SCALE Â· MANIFEST_DOMAIN Â· MANIFEST_MODULE Â· MANIFEST_INTEGRATION Â· MANIFEST_COMPLIANCE Â· MANIFEST_INHERITANCE Â· TENANT_SCALE Â· USER_ROLE Â· TIER_FEATURE Â· INDUSTRY_COMPLIANCE

### FactovĂ© tabulky (star schema)

FACT_USAGE Â· FACT_BILLING Â· FACT_AI_CALLS Â· FACT_INTEGRATION_CALLS Â· FACT_PLATFORM_METRICS

### _data.js dual-mode kontrakt (zĂˇvaznĂ˝ vzor)

```javascript
DataService.getIndustries = async (filter) =>
  AppIQ.config.backend === 'api'
    ? fetch(`/api/v1/dimensions/industries?${qs(filter)}`)
    : readLocalSeeds('dim_industry.json', filter)
// VolajĂ­cĂ­ kĂłd se NIKDY nemÄ›nĂ­ â€” swap JSON â†’ DB = 0 Ĺ™ĂˇdkĹŻ mimo _data.js
```

### ExplicitnĂ­ potvrzenĂ­ (David poĹľadoval, 2026-04-20)

> *"pĹ™echod JSONâ†’DB = zmÄ›na POUZE v `_data.js`"* â€” potvrzeno, zapsĂˇno v CLAUDE.md.
> Pattern: BFF (Backend for Frontend) + Repository Abstraction Layer.
> PouĹľĂ­vajĂ­: Salesforce, SAP BTP, ServiceNow.

---

## AIQ-00202 â€” CLAUDE.md session startup (CLOSED)

**Datum:** 2026-04-20 | **Status:** CLOSED | **Assignee:** Claude

### Co bylo zmÄ›nÄ›no

Session startup sekce v CLAUDE.md aktualizovĂˇna na dual-track systĂ©m:
- **v8.0 vÄ›tev:** PRODUCT_MODEL.md + PLATFORM_OVERVIEW.md + REPO_STRUCTURE.md
- **Legacy vÄ›tev:** PORTAL_ARCHITECTURE.md + ARCH_MAP.md + PORTAL_PRESENTATION.html + index.html
- **Pravidlo:** BRIEFING.md urÄŤuje kterou vÄ›tev naÄŤĂ­st. PĹ™i pochybnostech â€” obÄ›.

---

## AIQ-00203 â€” README.md soubory pro HOPI_TechIQ/ sloĹľky

**Datum:** 2026-04-20 | **Status:** OPEN MED | **Assignee:** Claude

### Kontext

CLAUDE.md pravidlo: *"kaĹľdĂˇ novĂˇ sloĹľka dostane README.md s 1 vÄ›tou popisem"*. 211 sloĹľek vytvoĹ™eno bez README.md. Prioritizace: nejdĹ™Ă­v 15 top-level sloĹľek (nejvĂ­c viditelnĂ©, most navigated). Sub-sloĹľky dostĂˇvajĂ­ README.md inkrementĂˇlnÄ› pĹ™i budovĂˇnĂ­ obsahu.

---

## AIQ-00204 â€” manifest.json JSONSchema

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

Manifest princip je pĂˇteĹ™ platformy (viz PRODUCT_MODEL.md). MĂˇme pĹ™Ă­klad, nemĂˇme validĂˇtor. JSONSchema umoĹľnĂ­: (1) automatickou validaci pĹ™i pĹ™idĂˇnĂ­ novĂ© industry, (2) IDE autocomplete pro vĂ˝vojĂˇĹ™e, (3) formĂˇlnĂ­ kontrakt API pro catalog registry.

### PovinnĂˇ pole schema

```json
{
  "id": "string (pattern: world.sector.industry)",
  "name": { "cs": "string", "en": "string" },
  "scale": ["array of DIM_SCALE_LEVEL ids"],
  "domains": ["array of DIM_DOMAIN ids"],
  "modes": ["ASSEMBLE" | "TEMPLATE" | "CUSTOM"],
  "aiCapabilities": ["array of capability strings"],
  "compliance": ["array of DIM_COMPLIANCE ids"],
  "integrations": ["array of DIM_INTEGRATION ids"],
  "modules": ["array of module ids"],
  "businessModels": ["B2B" | "B2B2C" | "B2C" | "Marketplace" | "White-label" | "Reseller"]
}
```

---

## AIQ-00205 â€” 9D Cross-dimensional validity matrix

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext a pĹ™Ă­klady

| Rule | PlatnĂ© | NeplatnĂ© |
|------|--------|---------|
| Defense industry | Private + State sektor | âťŚ Public sektor |
| Home World | nemĂˇ DIM 2 Sektor | âťŚ nesmĂ­ mĂ­t sector field |
| S4 AutonomnĂ­ AI | enterprise tiers | âťŚ Free tier |
| State sector scale | L2â€“L6 | âťŚ L0a, L0b (dĂ­tÄ›/teenager) |
| SMB scale (L1-L3) | Private + Public sektor | âťŚ State sektor (jen L2-L6) |

### PouĹľitĂ­

1. Validace manifest.json pĹ™i pĹ™idĂˇnĂ­ novĂ© industry
2. UI filtr v App Catalog (ĹˇedĂ©/zakĂˇzanĂ© kombinace)
3. AI prĹŻvodce pĹ™i konfiguraci â€” nenavrhne nevalidnĂ­ kombinaci

---

## AIQ-00206 â€” ADR-001 Architecture Decision Record: 9D model

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

Architecture Decision Records (ADR) jsou standardnĂ­ praxe pro zachycenĂ­ PROÄŚ bylo udÄ›lĂˇno konkrĂ©tnĂ­ architektonickĂ© rozhodnutĂ­. Bez ADR budoucĂ­ vĂ˝vojĂˇĹ™i vidĂ­ jen CO bylo rozhodnuto, ne PROÄŚ. Toto je zvlĂˇĹˇtÄ› dĹŻleĹľitĂ© pro 9D model â€” komplexnĂ­ rozhodnutĂ­ s mnoha alternativami.

### Co ADR-001 zachytĂ­

- **Context:** PĹŻvodnĂ­ 3D model (World Ă— Scale Ă— Domain) â†’ iterativnĂ­ expanze
- **Decision:** 9 dimenzĂ­ jako kompletnĂ­ produktovĂ˝ model
- **Alternatives considered:** Flat taxonomy, 2D (World Ă— Industry), product-per-industry approach
- **Consequences:** manifest.json princip, folder architektura, pricing matrix
- **Status:** Accepted (David schvĂˇlil 2026-04-20)

---

## AIQ-00207 â€” Fix: AUTO_ARCHIVE.bat BKONTEXT.md â†’ BOIL_CONTEXT.md

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

Soubor byl pĹ™ejmenovĂˇn z `BKONTEXT.md` na `BOIL_CONTEXT.md` pro konzistenci s `BOIL.json`. AUTO_ARCHIVE.bat (Ĺ™Ăˇdky 99-100) stĂˇle hledĂˇ starĂ˝ nĂˇzev. PĹ™i archivaci vypĂ­Ĺˇe "META: BKONTEXT.md - preskakuji" bez chyby â€” ale soubor se NEarchivuje. MezitĂ­m manuĂˇlnÄ› kopĂ­rovĂˇno v kaĹľdĂ© session.

### Fix

Nahradit v AUTO_ARCHIVE.bat: `BKONTEXT.md` â†’ `BOIL_CONTEXT.md` (2 vĂ˝skyty: copy pĹ™Ă­kaz + check).

---

## AIQ-00208 â€” Business Model Matrix (REVIEW)

**Datum:** 2026-04-20 | **Status:** REVIEW | **Assignee:** Claude

### Kontext

David poĹľadoval "pĹ™edzpracovat zĂˇklad multidimenzionĂˇlnĂ­ matice obchodnĂ­ho modelu" a propojit s reĂˇlnĂ˝mi vzorci z praxe. ZĂˇmÄ›r: toto bude zĂˇklad pro pricing matrix (BIZ-00040), GTM strategii (BIZ-00033) a investor deck (BIZ-00038).

### VĂ˝stupy

| Soubor | Obsah |
|--------|-------|
| `HOPI_TechIQ/DOCS/architecture/BUSINESS_MODEL_MATRIX.md` | 7 matic, 6 archetypĹŻ, pravidla |
| `HOPI_TechIQ/DATA/_seeds/biz_model_matrix.json` | StrukturovanĂˇ data: 20 buyer profiles, revenue streams, compliance map, AI maturity tier floor |

### 7 matic dokumentu

1. **Buyer Profile â†’ Business Model** â€” 20 profilĹŻ: Enterprise (E1-E6, PU1-PU3, ST1-ST3) + Home (H1-H4) + Partner (P1, P2) + Marketplace (M1) + B2B2C
2. **MĂłd (DIM 6) Ă— DIM 9** â€” jak zpĹŻsob nasazenĂ­ urÄŤuje komerÄŤnĂ­ vzorec
3. **AI Maturita Ă— Tier** â€” vyĹˇĹˇĂ­ S-ĂşroveĹ = vyĹˇĹˇĂ­ tier floor
4. **Industry Ă— Compliance Ă— Tier floor** â€” compliance = premium justifikace
5. **Revenue stream taxonomy** â€” R1-R10 s fĂˇzemi v8.x â†’ v12.x
6. **Deal archetypes** â€” 6 reĂˇlnĂ˝ch archetypĹŻ (HOPI Group, Czech SMB Finance, Czech Hospital, Home Family, CEE SI Partner, Czech Municipality)
7. **Negative profiles** â€” kdo NENĂŤ zĂˇkaznĂ­k a proÄŤ

### KlĂ­ÄŤovĂ© strukturĂˇlnĂ­ pravidla (7)

1. Enterprise World = B2B zĂˇklad, Home World = B2C zĂˇklad
2. Scale L1-L2 = self-service, L3-L4 = inside, L5-L6 = field/tender
3. MĂłd ASSEMBLE = nulovĂ© impl. nĂˇklady, CUSTOM = signifikantnĂ­
4. Compliance industry = Enterprise tier floor
5. AI Maturity S3+ = Enterprise tier only
6. B2B2C = vĹľdy Enterprise deal + DPA
7. Marketplace = oddÄ›lenĂˇ P&L linka


---

## AIQ-00209 Ă˘â‚¬â€ť Workflow + Process Architecture (dokument + rozhodnutia)

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

David rozlisoval PROCESS a WORKFLOW jako ruzne koncepty Ă˘â‚¬â€ť dulezite rozliseni pro produkt. Diskuse vedla k architektonickemu rozhodnuti pridani 2 novych vrstev do platformove architektury.

### Klic rozliseni: PROCESS != WORKFLOW

| Dimenze | PROCESS | WORKFLOW |
|---------|---------|---------|
| Co je | Podnikovy governance | Technicke provedeni |
| Kdo ho vlastni | Business owner (CFO, HR, CEO) | Platforma / developer |
| Existence | Nezavisla na SW | Existuje pouze v SW |
| Zmena | Zmena procesu = business rozhodnuti | Zmena workflowu = konfigurace |
| Priklady | Schvalovaci pravidla, SLA, kdo podepisuje | Trigger, vetve, podmienky, timeouty |

### Hierarchie

```
PROCESS (business governance Ă˘â‚¬â€ť kdo, co, proc, SLA)
  WORKFLOW (technicke provedeni Ă˘â‚¬â€ť trigger, branch, condition, timeout)
    TASK (jednotkova akce Ă˘â‚¬â€ť formulare, AI call, integrace, notifikace)
      ACTION (atomic krok Ă˘â‚¬â€ť DB write, API call, email send)
```

### 5-vrstva platforma (rozsireni z puvodne 4 vrstev)

```
VISUAL LAYER       HTML + _modules/ + _core/
      v pouze _data.js
DATA LAYER         JSON -> SQL -> REST API
      v pouze _workflow.js
WORKFLOW LAYER     [NOVA] stavovy stroj, persistent DB, process engine
      v pouze _data.js + konektory
INTEGRATION LAYER  Cloudflare Workers / Azure API + konektory
      v MCP servery
AI AGENT LAYER     [NOVA] 7 agentu orchestrace
```

### 7 AI Agent typu (Platform Core)

| Agent | Role | Trigger |
|-------|------|---------|
| Process Monitor | Hlida SLA, eskaluje delay | Casovac + workflow events |
| Approval Assistant | Pomaha zadateli pripravit podklady | Pred odeslim schvaleni |
| Coordination Agent | Orchestruje multi-step workflowy | Workflow start |
| Test Orchestrator | Spousti testy, agreguje vysledky | CI/CD event |
| Code Review Agent | Kontrola kodu pred merge | PR event |
| Data Validator | Overuje datovou kvalitu | Data import |
| BI Trigger Agent | Spousti BI refresh pri udalostech | Fact tabulka write |

### Schvalovaci scenare Ă˘â‚¬â€ť Enterprise

| Scenar | Zadatel | Schvalovatel | SLA |
|--------|---------|--------------|-----|
| Budget request | Dept Head | CFO + CEO | 5 pracovnich dni |
| Smlouva > 500K | Legal + Finance | CEO + Board | 10 pracovnich dni |
| IT zmena (prod) | Developer | IT Manager | 2 pracovni dny |
| HR najem | HR Manager | Dept Head + CFO | 5 pracovnich dni |
| Vyjimka z procesu | Zadatel | Process Owner | 3 pracovni dny |

### Schvalovaci scenare Ă˘â‚¬â€ť HOME

| Scenar | Zadatel | Schvalovatel | SLA |
|--------|---------|--------------|-----|
| Rodinny rozpocet | Rodic | Oba rodice | Ihned (notifikace) |
| Zdravotni vydaj > limit | Kdokoli | Definovany "admin" rodiny | 24 hodin |
| Skolni aktivita ditete | Rodic | Oba rodice | 48 hodin |
| Velky nakup (> X Kc) | Kdokoli | Rodinny spravce | 24 hodin |
| Zmena rodinnych pravidel | Spravce | Vetsina clenou | 72 hodin |

### Notifikace a alerty

**Kanaly podle priority:**

| Kanal | Pouziti | Faze |
|-------|---------|------|
| In-app (bell icon) | Vzdy Ă˘â‚¬â€ť vsechny notifikace | v8.x |
| Email async | Async Ă˘â‚¬â€ť schvaleni, deadliny, reporty | v8.x |
| Teams webhook | Enterprise Ă˘â‚¬â€ť real-time upozorneni | v9.x |
| Push notification | HOME + Mobile Ă˘â‚¬â€ť urgentni | v10.x (Phase 3) |

**Alert vs Notification:**

| Typ | Barva | Zpusob | Priklady |
|-----|-------|--------|---------|
| ALERT | Cerveny | Vyzaduje akci, nesmi byt ignorovan | Schvaleni ceka, SLA blizi se, chyba integrace |
| NOTIFICATION | Modry | Informace, nezavazna | Workflow dokoncen, report vygenerovan, novinka |

### Vyskyt v manifestu (rozsireni schema)

```json
"workflows": [
  {
    "id": "budget-approval",
    "trigger": "budget_request_submitted",
    "steps": ["notify_approvers", "wait_approval", "update_status", "notify_requester"],
    "sla_hours": 120,
    "escalation": "process_owner"
  }
]
```

### Implementacni plan

AIQ-00210 (_workflow.js spec) -> AIQ-00212 (DB schema) -> implementace v8.x
AIQ-00211 (_agent.js spec) -> implementace faze 2

---

## AIQ-00210 Ă˘â‚¬â€ť _workflow.js Ă˘â‚¬â€ť Workflow Engine Module (spec)

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

Novy Platform Core modul. Zodpovida za stateful workflow execution Ă˘â‚¬â€ť na rozdil od Event Bus (stateless, fire-and-forget), _workflow.js udrzuje stav workflow v persistent DB.

### Klic rozdil: Event Bus vs Workflow Engine

| Aspekt | Event Bus (AppIQ.emit) | Workflow Engine (_workflow.js) |
|--------|----------------------|-------------------------------|
| Stav | Stateless | Stateful Ă˘â‚¬â€ť DB |
| Trvani | Milisekundy | Hodiny az dny |
| Persistence | Ne | Ano |
| Vizibilita | Zadna | Dashboard, audit log |
| Pouziti | Komunikace modulu | Schvaleni, procesy, automatizace |

### API kontrakt (spec)

```javascript
WorkflowEngine.start(workflowId, context)
WorkflowEngine.advance(instanceId, action, data)
WorkflowEngine.getStatus(instanceId)
WorkflowEngine.listPending(userId)
WorkflowEngine.cancel(instanceId, reason)
WorkflowEngine.escalate(instanceId)
```

### Vazby

- Cte: manifest.json -> workflows[]
- Pise: WORKFLOW_INSTANCE, WORKFLOW_STEP tabulky (AIQ-00212)
- Emituje events pro: _notifications.js (AIQ-00215)
- Volano z: _data.js (Data Layer kontrakt)

---

## AIQ-00211 Ă˘â‚¬â€ť _agent.js Ă˘â‚¬â€ť AI Agent Orchestration Module (spec)

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

Novy Platform Core modul pro orchestraci 7 AI agentu (viz AIQ-00209). Agenti pracuji na pozadi, komunikuji pres Event Bus, pristupuji k datum pres _data.js.

### Zavazna pravidla

1. Vsechny agenti = promluvy _agent.js API, nikdy prime volani Claude API z HTML
2. Agenti pristupuji k datum POUZE pres _data.js
3. Komunikace agent -> modul = pouze pres AppIQ.emit()
4. Kazdy agent ma `agentId`, `type`, `trigger`, `permissions[]`

### API kontrakt (spec)

```javascript
AgentOrchestrator.register(agentConfig)
AgentOrchestrator.trigger(agentId, context)
AgentOrchestrator.getAgentStatus(agentId)
AgentOrchestrator.listActive()
AgentOrchestrator.terminate(agentId, reason)
```

### Vazby

- Pouziva: Claude API (pres _config.js endpoint)
- Pise/cte: DATA/_schemas/entities/ (agenti)
- Emituje events pro: vsechny moduly pres Event Bus
- Listenuje na: workflow events, data events, CI events

---

## AIQ-00212 Ă˘â‚¬â€ť Workflow DB Schema

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

DB tabulky pro Workflow Engine. Navrzeno pro backend readiness Ă˘â‚¬â€ť v8.x bezi na localStorage/IndexedDB, v9.x+ na SQL backend (pouze zmena v _data.js).

### Tabulky

```
PROCESS_DEFINITION     id, name, owner_role, sla_hours, created_by
WORKFLOW_TEMPLATE      id, process_id, trigger_event, steps_json, escalation_rule
WORKFLOW_INSTANCE      id, template_id, status, context_json, started_at, sla_deadline
WORKFLOW_STEP          id, instance_id, step_name, status, assignee_id, completed_at
WORKFLOW_ESCALATION    id, instance_id, reason, escalated_to, escalated_at
APPROVAL_REQUEST       id, workflow_step_id, requester_id, approvers_json, decision, decided_at
NOTIFICATION_LOG       id, recipient_id, channel, type, payload_json, sent_at, read_at
```

### Vrstevna implementace (phased)

| Verze | Uloziste | Zmena v kodu |
|-------|---------|-------------|
| v8.x | localStorage / IndexedDB | zadna |
| v9.x | SQL (PostgreSQL / SQLite) | pouze _data.js |
| v10.x | Multi-tenant DB | pouze _data.js + auth |

---

## AIQ-00213 Ă˘â‚¬â€ť Smart Document Hub (spec)

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

Nova HOME Phase 1 feature. AI cte, klasifikuje, sumarizuje a archivuje uzivatelske dokumenty. Sdilena RAG infrastruktura napaja jak Platform Help (platform-authored docs) tak Document Hub (user-authored docs).

### AI schopnosti

| Schopnost | Popis | Faze |
|----------|-------|------|
| Klasifikace | AI rozpozna typ dokumentu (faktura, smlouva, zprava...) | v8.x |
| Extrakce | Klic pole: datum, castka, protipartner | v8.x |
| Sumarizace | 1-3 vety srozumitelne pro uzivatele | v8.x |
| Q&A | "Kdy konci pojisteni?" Ă˘â‚¬â€ť AI odpovi z dokumentu | v8.x |
| Upominka | AI detekuje deadliny a prida notifikaci | v9.x |
| Kategorizace | Auto-trideni do slozek per HOME domain | v8.x |

### Architektura

```
_documents.js             <- novy Platform Core modul
  |-- AI/rag/             <- RAG infrastruktura (sdilena)
  |-- DATA/_schemas/documents/  <- schema ulozeni
  |-- _data.js            <- jediny pristupovy bod
```

### Uloziste dokumentu

| Verze | Uloziste | Limit |
|-------|---------|-------|
| v8.x | base64 v localStorage / IndexedDB | ~50 MB/uzivatel |
| v9.x+ | S3-compatible cloud pres _data.js | bez limitu |

### Vazby na OIL

- AIQ-00214: Document DB Schema
- AIQ-00215: _notifications.js (upominky z dokumentu)
- BIZ-00044: Business case pro Document Hub

---

## AIQ-00214 Ă˘â‚¬â€ť Document DB Schema

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

DB tabulky pro Smart Document Hub. Navrzeno pro phased upgrade z localStorage na cloud storage.

### Tabulky

```
DOCUMENT               id, user_id, filename, mime_type, size_bytes, uploaded_at
DOCUMENT_METADATA      doc_id, doc_type, extracted_fields_json, summary, language, confidence_score
DOCUMENT_CATEGORY      doc_id, domain_id, category, auto_classified, user_confirmed
DOCUMENT_STORAGE       doc_id, storage_type (local/s3), storage_ref, encrypted
RAG_CHUNK              id, doc_id, chunk_text, chunk_index, embedding_ref
DOCUMENT_REMINDER      doc_id, reminder_type, trigger_date, notification_sent
```

### Phased storage upgrade

```
v8.x: storage_type = 'local' -> base64 v IndexedDB
v9.x: storage_type = 's3'    -> S3 bucket ref (pouze _data.js zmena)
```

---

## AIQ-00215 Ă˘â‚¬â€ť _notifications.js Ă˘â‚¬â€ť Platform Core Modul

**Datum:** 2026-04-20 | **Status:** OPEN MED | **Assignee:** Claude

### Kontext

Novy modul pro centralni spravu notifikaci a alertu. Zavisly na tomto modulu: _workflow.js, _agent.js, _documents.js. Modul nevznika bez tohoto modulu.

### Alert vs Notification Ă˘â‚¬â€ť implementace

```javascript
// Alert Ă˘â‚¬â€ť vyzaduje akci
Notifications.alert(userId, { type: 'approval_pending', title: '...', actionUrl: '...' })

// Notification Ă˘â‚¬â€ť informace
Notifications.notify(userId, { type: 'workflow_complete', title: '...', data: {...} })
```

### Kanaly a implementace

| Kanal | v8.x | v9.x+ |
|-------|------|-------|
| In-app bell | DOM injection + localStorage | WebSocket push |
| Email | Cloudflare Worker SMTP relay | Dedicated email service |
| Teams | N/A | Teams webhook konektor |
| Push | N/A | FCM / APNS (Phase 3) |

### NOTIFICATION_LOG tabulka

Kazda odeslana notifikace se loguje (viz AIQ-00212 NOTIFICATION_LOG). GDPR: notifikace obsahujici osobni udaje musi mit retention policy.

---

## AIQ-00216 Ă˘â‚¬â€ť Phase 1 HOME Manifests

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

Vytvorit manifest.json soubory pro HOME Phase 1 domeny. Prioritni poradi (David, 2026-04-20): Finance (1) -> Health & Wellness (2) -> Education (3) -> Home Management (4).

### Manifest struktura (rozsirena o nova pole)

```json
{
  "id": "home.finance",
  "world": "Home",
  "domain": "PersonalFinance",
  "scale_levels": ["H1", "H2", "H3", "H4"],
  "modes": ["assemble", "template"],
  "ai_maturity": ["S0", "S1", "S2"],
  "tier_floor": "free",
  "modules": ["budget", "expenses", "savings", "invoices", "investments"],
  "extends": "home.base",
  "documentTypes": ["invoice", "bank_statement", "insurance_contract", "tax_document"],
  "workflows": [
    {
      "id": "family-budget-approval",
      "trigger": "budget_change_requested",
      "steps": ["notify_partner", "wait_approval", "apply_change"],
      "sla_hours": 24
    }
  ],
  "aiCapabilities": ["expense_classification", "budget_forecast", "anomaly_detection"]
}
```

### Umisteni souboru

```
MARKETPLACE/app-catalog/home/individual/personal-finance/manifest.json
MARKETPLACE/app-catalog/home/family/health-wellness/manifest.json
MARKETPLACE/app-catalog/home/family/education/manifest.json
MARKETPLACE/app-catalog/home/family/home-management/manifest.json
```

---

## AIQ-00217 Ă˘â‚¬â€ť ADR-002: Two-Deployment Architecture

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

Architektonicke rozhodnuti: HOME B2C a HOPI Enterprise pilot jsou ODDELENE deploymenty, sdileji Platform Core knihovnu. Rozhodnutie David, 2026-04-20.

### Rozhodnuti

**HOME deployment** (Phase 1 primary):
- Freemium -> Premium (PLG motion)
- HOME domeny: Finance, Health, Education, Home Management
- Bez enterprise features (ne RBAC, ne SLA, ne Tender workflows)
- AI maturity: S0-S2 (max S2 v Phase 1)

**HOPI Enterprise deployment** (Phase 1 living proof):
- Interni pilot, NE revenue deal
- Enterprise domeny: Finance (controlling), Supply Chain, HR
- Plne RBAC, schvalovaci workflowy, integrace SAP/BNS
- AI maturity: S1-S3 (postupne)

### Sdilena Platform Core knihovna

```
PLATFORM/_core/         <- sdileno obema deploymenty
PLATFORM/_modules/      <- sdileno obema deploymenty
PLATFORM/_components/   <- sdileno obema deploymenty
```

### Duvod separace

Enterprise a HOME maji odlisne: compliance pozadavky, AI agent typy, workflow komplexitu, pricing tiery, schvalovaci scenare. Jedno deployovani by vedlo ke kompromisni architekture nevhodne pro oba trhy.

### Investor story

"Platforma nejdriv fungovala pro nas (HOPI). Pak jsme ji dali do rukou lidi (HOME B2C). A ted ji davame firmam (Phase 2 Enterprise)."

### Dokumentacni companion

`HOPI_TechIQ/DOCS/architecture/decisions/ADR-002-two-deployment-architecture.md`

---


---

## AIQ-00219 Ă˘â‚¬â€ť AI Language Center (multi-language architektura)

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

Rozhodnutie David 2026-04-20: cela platforma musi byt multi-jazykova od zakladu. HOPI = mezinarodni skupina. Nestaci CS+EN Ă˘â‚¬â€ť musi byt jednoduche pridat dalsi jazyky bez zasahu do kodu.

### Architektura AI Language Center

Rozsireni _i18n.js na v2:
- Centralni _translations/{lang}.json per jazyk
- AI-assisted preklad: chybejici klic v novem jazyce Ă˘â€ â€™ AI navrhne preklad, clovek potvrdÄ‚Â­
- Language Center UI v Studio: tabulka vsech klicu, stav prekladu per jazyk, inline editace
- Detekce chybejicich prekladu pri build-time (warning)
- Pridani noveho jazyka = novy soubor {lang}.json, zadny kod se nemeni

### Dopad

Plati pro VSE: HTML stranky, manifesty, dokumentaci, UI komponenty, notifikace. Kazdy retezec je prekladatelny.

---

## AIQ-00220 Ă˘â‚¬â€ť Platform Object Registry

**Datum:** 2026-04-20 | **Status:** OPEN TOP | **Assignee:** Claude

### Kontext

Kazdy pojmenovany objekt platformy dostane unikatni kod. Toto je zaklad pro Design Lab, Inspector, Platform Map, Dependency Graph. Bez Registry nema Inspector co zobrazit.

### Kody per typ

SCR (screen/page) | SEC (sekce stranky) | UI (komponenta) | MOD (modul) | MAN (manifest) | WF (workflow) | DS (data schema) | PA (arch soubor) | AG (AI agent)

### Zaznam struktury

```json
{
  "code": "UI-001",
  "type": "UI",
  "cs_name": "Tlacitko prehravace",
  "en_name": "Music player button",
  "file_path": "PLATFORM/_modules/_music.js",
  "status": "stable",
  "dependencies": ["MOD-002"]
}
```

### AI zapojeni

AI auto-registruje nove objekty pri vytvoreni. AI najde objekt z prirozenÄ‚Â©ho popisu ("to tlacitko vlevo" -> UI-001).

---

## AIQ-00221 Ă˘â‚¬â€ť _inspector.js (Debug overlay)

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

Resi problem z 2026-04-19 (music button debug horror): David nevedel jak presne popsat chybny element. Reseni: toggle Shift+D = kazdy element na strance zobrazi code badge.

### Funkce

- Shift+D: zapne/vypne inspect mod
- V inspect modu: kazdy element ma overlay s kodem (UI-001, MOD-002, SCR-001-SEC-003)
- Klik na element = predvyplneny bug report: kod objektu + verze + zarizeni
- AI identifikuje element z prirozenÄ‚Â©ho popisu

### Bug reporting protokol (pro Davida)

1. Zapnout Inspector (Shift+D)
2. Kliknout na chybny element -> vid code badge
3. Napsat: "[kod] Ă˘â‚¬â€ť [popis problemu] Ă˘â‚¬â€ť [zarizeni]"
Priklad: "UI-001 Ă˘â‚¬â€ť klik nespusti prehravani na mobile Ă˘â‚¬â€ť PH-M"

---

## AIQ-00222 Ă˘â‚¬â€ť Platform Map

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

Interaktivni HTML stranka ktera vizualne zobrazuje 9D model, folder architekturu, zony, hierarchii komponent. David jako hlavni designer potrebuje videt celu platformu najednou.

### Obsah

- 9D model (vizualni bubly/karty)
- Folder strom (HOPI_TechIQ/ hierarchie)
- Zony (Studio, Marketplace, HUB, INVEST, MARKET)
- Klik na uzel = detail (kod, popis, vazby, soubor)
- AI vysvetleni on-click

---

## AIQ-00223 Ă˘â‚¬â€ť Dependency Graph

**Datum:** 2026-04-20 | **Status:** OPEN MED | **Assignee:** Claude

### Kontext

SVG/D3 diagram: manifesty Ă˘â€ â€™ moduly Ă˘â€ â€™ workflow Ă˘â€ â€™ domeny. Ukazuje vazby mezi objekty platformy. David vidi flow a procesy vizualne.

### AI zapojeni

AI detekuje cirkularne zavislosti, navrhuje refaktor, analyzuje dopad zmeny objektu na zbytek platformy.

---

## AIQ-00224 Ă˘â‚¬â€ť Design Lab

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

Unified design, test a dokumentacni prostredi v Studio. Jedno misto kde David dela vse: vizualni navrh, testovani, dokumentaci, process design.

### Layout

Object Tree (vlevo) + Live Preview (stred) + Documentation (vpravo). Toggle: Visual | Inspector | Docs | Code | Responsive | Workflow.

### Obsah (sub-featy)

- Component Catalog (AIQ-00225)
- Responsive Preview 15 devices (AIQ-00226)
- Process/Workflow Designer s AI (AIQ-00227)
- Dependency Graph (AIQ-00223)
- Object Inspector (AIQ-00221)

### AI zapojeni (CORE)

AI generuje varianty komponent, navrhuje CSS opravy, detekuje a11y problemy, identifikuje element z natural language.

---

## AIQ-00225 Ă˘â‚¬â€ť Component Catalog

**Datum:** 2026-04-20 | **Status:** OPEN MED | **Assignee:** Claude

### Kontext

Kazda UI komponenta testovatelna izolovanĂ„â€ş (storybook pristup). Zobrazuje: kod (UI-001), CS/EN nazev, status (stable/experimental/deprecated), varianty.

### AI zapojeni

AI kategorizuje nove komponenty, navrhuje kde a jak pouzit, detekuje a11y problemy.

---

## AIQ-00226 Ă˘â‚¬â€ť Responsive Preview (15 device variant)

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

15 device variant: UW-L(3440) UW-M(2560) UW-S(1920) | WD-L(1680) WD-M(1440) WD-S(1280) | NB-L(1366) NB-M(1280) NB-S(1024) | TB-L(1024) TB-M(834) TB-S(768) | PH-L(430) PH-M(390) PH-S(360).

Kazdy device: ramecek/bezel, spravny viewport, prepinani jednim klikem.

### AI zapojeni

AI identifikuje responsive problemy (pretekajici elementy, spatne zarovnani) a navrhuje breakpoint fixe.

### Bug reporting s device kodem

David hlasi: "Na PH-S sec-hero preteka" -> vim presne: 360px viewport, sekce hero.

---

## AIQ-00227 Ă˘â‚¬â€ť Process Flow & Workflow Designer

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

### Kontext

Vizualni drag-and-drop navrhare procesu v Studio. Klicova feature pro Enterprise (schvalovaci procesy) i HOME (rodinne workflow). Soucast Design Lab.

### Vizualni canvas

Uzly: Start | Step | Decision | Parallel | AI Action | Wait | End
Spojeni: Sequential / Conditional (if/else) / Parallel branch
Mody: Swimlane view | Flowchart view | Timeline view
Simulate mode: proklik workflow krok po kroku

### AI zapojeni (CORE)

| Feature | Popis |
|---------|-------|
| Text-to-Flow | Napises "schvalovaci proces pro faktury nad 100K" -> AI vygeneruje cely diagram |
| AI validace | Detekuje smycky, nedosazitelne kroky, chybejici eskalace |
| AI coach | "Tento chain ma 7 kroku Ă˘â‚¬â€ť prumer v industry je 3. Zjednodusit?" |
| AI odhad | Predikuje prumernou delku procesu z historickych dat |
| Export | Diagram -> manifest.json workflows[] automaticky |

### Technicke zavislosti

_workflow.js (AIQ-00210) + _agent.js (AIQ-00211). Slozka STUDIO/workflow-builder/ existuje.

---


---

## AIQ-00218 Ă˘â‚¬â€ť Education & Training: pridani do Enterprise DIM 5

**Datum:** 2026-04-20 | **Status:** CLOSED | **Assignee:** Claude

Rozhodnuti David 2026-04-20: Education & Training musi byt i v Enterprise svete (ne jen v Home). Duvod: AI coaching, e-learning, lecturing, certifikace jsou obrovska prilezitost cross-sector. Pridano jako 13. Enterprise domena do PRODUCT_MODEL.md DIM 5 (moduly: E-learning, AI coaching, Lecturing, Certifikace, Skills tracking, Onboarding kurzy). Aktualizovano take v CLAUDE.md a BOIL_CONTEXT.md (BIZ-00034 Enterprise taxonomie).

---

## AIQ-00228 Ă˘â‚¬â€ť TechIQ Hub: design varianta B (mini landing pro uzivatele)

**Datum:** 2026-04-20 | **Status:** OPEN HIGH | **Assignee:** Claude

Rozhodnuti David 2026-04-20: TechIQ Hub root (HUB/index.html) = varianta B. NENI investor landing page Ă˘â‚¬â€ť je to navigacni branka pro uzivatele. Uzivatel musi vedet kam jde. Obsah: kratky popis platformy, brand storytelling, 2 jasna CTA tlacitka TECH HUB / BIZ HUB. Zadny long-form pitch Ă˘â‚¬â€ť ten patri do INVEST zony. Zavisi na: AIQ-00220 (Object Registry), Platform Core.

---

## AIQ-00001 az AIQ-00012 Ă˘â‚¬â€ť Legacy OPEN: stare v6/v7 ukoly (ponechano OPEN)

**Datum:** pred 2026-04-20 | **Status:** OPEN (vsechny) | **Poznamka:** David rozhodl ponechat OPEN

Ukoly z vyvoje v6/v7 platformy (2025Ă˘â‚¬â€ś2026). Vetsina je superseded novou v8.0 architekturou:
- AIQ-00007/08/09/10/11 (Studio Hub, Dev/Test/Admin, promo presun) Ă˘â€ â€™ nahrazeno STUDIO/ v8.0
- AIQ-00004 (Help System preklady) Ă˘â€ â€™ nahrazeno AI Language Center (AIQ-00219)
- AIQ-00003 (promo web v6) Ă˘â€ â€™ nahrazeno MARKET/ zonou v8.0
- AIQ-00001/02/05/06/12 Ă˘â€ â€™ zvazit pri spusteni v8.0

Ponechany jako OPEN na budouci rozhodnuti.

---

## AIQ-00016, AIQ-00024, AIQ-00025 Ă˘â‚¬â€ť Stare OPEN: Demo, OIL panel, Multi-user

**Datum:** 2026 | **Status:** OPEN

- AIQ-00016: Demo 2026-04-17 end-to-end review a finalizace Ă˘â‚¬â€ť pravdepodobne superseded, overit
- AIQ-00024: OIL panel Ă˘â‚¬â€ť Context blok (klik) + context/arch_refs pole Ă˘â‚¬â€ť relevantni pro Admin Center
- AIQ-00025: Multi-user deployment kompatibilita (SAP, BNS, Teams) Ă˘â‚¬â€ť relevantni pro v9.x Connector Layer

---

## AIQ-00114, AIQ-00119, AIQ-00120, AIQ-00121 Ă˘â‚¬â€ť Legacy v7.x OPEN

**Datum:** 2026 | **Status:** OPEN

- AIQ-00114: PERSONAL PITCH Ă˘â‚¬â€ť sekce Business Plan (roadmapa 3 streamu + milniky) Ă˘â‚¬â€ť zvazit aktualizaci pro v8.0 pitch
- AIQ-00119: Zapnout Maintenance Mode pred archivaci v7.21 Ă˘â‚¬â€ť pravdepodobne prekroceno (v7.22 jiz existuje)
- AIQ-00120: Archive v7.21 pred vydanim v7.22 Ă˘â‚¬â€ť pravdepodobne prekroceno
- AIQ-00121: Release v7.22 na GitHub Pages Ă˘â‚¬â€ť pravdepodobne prekroceno (v7.22 je live)

Doporuceni: zkontrolovat v dalsi Legacy session, uzavrit co je dokonceno.

---

## AIQ-00157, AIQ-00158, AIQ-00159 Ă˘â‚¬â€ť IN PROGRESS / OPEN v7.22

**Datum:** 2026-04-19 | **Status:** IN PROGRESS / OPEN

- AIQ-00157 (IN PROGRESS): Release v7.22 Ă˘â‚¬â€ť CEO Brief, MIND-SET slide, page split, hudba. Byl rozpracovan na konci session 2026-04-19 pred presunem na v8.0 architekturu. Pozastaveno.
- AIQ-00158 (IN PROGRESS): Hotfix _hopiq.js + _hopiq.css chybi v versioned slozce v7.22. Pozastaveno.
- AIQ-00159 (OPEN): Studio hudba total refactor Ă˘â‚¬â€ť SPA shell nebo iframe pro seamless prehravani. Velky ukol, odlozeno na post v8.0.

Vsechny tri pozastaveny kvuli prechodu na v8.0. Vratit se az v8.0 bude stabilni nebo pri Legacy hotfix sessioni.

---

## AIQ-00169 az AIQ-00174 Ă˘â‚¬â€ť Test tasks pro TechIQ Hub architekturni ukoly

**Datum:** 2026-04-20 | **Status:** OPEN

Companion test ukoly pro AIQ-00161 az AIQ-00166 (TechIQ Hub, TECH HUB, BIZ HUB, auth refactor, versioning, deploy). Cekaji na dokonceni implementace rodicovskych ukolu. Poradi je zavazne: nejdrive implementace (AIQ-00161+), pak tyto testy.

---

---

## AIQ-00229 -- AUTO_ARCHIVE v2.0

**Datum:** 2026-04-20  **Status:** CLOSED  **Assignee:** Claude

### Co bylo udelano

David pozadoval kompletni archivaci vsech streamu projektu ke kazdemu casovemu snimku.

**Nove soubory:**
- AUTO_ARCHIVE.bat v2.0 -- rozsireni o [TECHIQ] a [LOG] sekce
- ARCHIVE_LOG_WRITER.ps1 -- parametrizovany PS1, generuje kumulativni ARCHIVE_LOG.md

**Archivacni procedura nyni pokryva:**

Stream [WEB]: HOPI_AppIQ_WebPage/Development -> Release -> Archive/session_STAMP/ (legacy stream)
Stream [APP]: HOPI_AppIQ/Development -> Release -> Archive/session_STAMP/ (legacy stream)
Stream [TECHIQ]: HOPI_TechIQ/ (cely strom, bez snapshots/) -> RELEASES/snapshots/session_STAMP/
Stream [META]: OIL+BOIL+CLAUDE+BRIEFING+CHANGELOG+ARCH_MAP+skripty -> _SESSION_START/
Stream [LOG]: Kumulativni ARCHIVE_LOG.md (Markdown tabulka per session) -> koren projektu

**Klicove technicke rozhodnutĂ­:**
Pouzit robocopy s parametrem /XD (exclude directory) pro RELEASES/snapshots/ protoze cil archivu
je uvnitr zdrojoveho stromu HOPI_TechIQ/ (bez exclude by doslo k nekonecne rekurzi).
Testovano: 17 souboru / 221 slozek / 66.7 KB, snapshots spravne vylouceny, zdrojove soubory nedotceny.

**Trigger:** dvojklik na AUTO_ARCHIVE.bat nebo volani z terminalu
**Zaruka:** zadna data nejsou smazana, pouze kopirovana. Zdrojove soubory zustavaji nedotceny.

---

## AIQ-00281 — Hudba: platformové pravidlo do CLAUDE.md

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** Claude

Nové platformové pravidlo schválené Davidem: hudba = default ON na VŠECH stránkách HOPI TechIQ platformy. Výjimky pouze explicitně domluvené (příklad: bomb animace přepíše audio). Každá oblast platformy bude mít vlastní hudební + grafickou úpravu. Pravidlo zapsat do CLAUDE.md.

---

## AIQ-00282 — Hudba: implementace na INVESTOR_BRIEF, CEO_BRIEF, INVESTOR_ENTRY

**Datum:** 2026-04-21 | **Status:** REVIEW | **Assignee:** Claude

**Implementation notes:**
- INVESTOR_BRIEF.html: `invMusicToggle()` + `ibMusicStart()` — Web Audio API 6-hlas A-minor ambient pad (sine, LFO tremolo, delay feedback). Button `#inv-music-btn` 🎵, active class (green), localStorage preference `inv_music`. Autostart po password.
- CEO_BRIEF.html: `ceoMusicToggle()` + `ceoMusicStart()` — stejný pattern, `#ceo-music-btn`. localStorage `ceo_music`.
- INVESTOR_ENTRY.html: nemá nav s lang/music tlačítky — není potřeba.
- Test: AIQ-00282-T1 — David ověří play/pause, localStorage, vizuál.

---

## AIQ-00283 — Logo sjednocení "HOPI AppIQ by HOPI TECHNOLOGY"

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** Claude

Vpravo nahoře na všech stránkách standardizovat na: **HOPI AppIQ by HOPI TECHNOLOGY** — stejné jako v prezentaci a brand konceptu. Aktuální stav: nesjednoceno. Stránky: INVESTOR_BRIEF, CEO_BRIEF, INVESTOR_ENTRY, BRAND_CONCEPTS.

---

## AIQ-00284 — HOPI Group investor slide: DE/BG/HR

**Datum:** 2026-04-21 | **Status:** CLOSED | **Assignee:** Claude

**Implementation notes:** Stat v HOPI GROUP sekci: číslo `5` → `8`, label → "zemí v CEE+DACH regionu". Country tag pills doplněny o `· DE · BG · HR`. Celkově: CZ · SK · PL · HU · RO · DE · BG · HR = 8 zemí.

---

## AIQ-00285 — Brand koncept: výběr finálního Claude+Anthropic lockupu

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David Gogela

4 návrhy přidány do BRAND_CONCEPTS.html (sekce LF4 — Návrhy výběru):
- P1: "Powered by Claude" minimální badge (pill tvar, terra cotta)
- P2: Technology strip — terra cotta pruh dole s "AI Core · Claude · Anthropic"
- P3: × Partnership lockup — HOPI AppIQ × Claude, rovnocenné pozice ★ DOPORUČENO
- P4: Vertikální stack — TechIQ presents / AppIQ / AI by Claude · Anthropic

David vybere. Po výběru: AIQ-00285-T1 implementace.

Stávající LF4 ("Claude by Anthropic" jako text v SVG lockupu) = zastaralá verze, nahradit vybraným návrhem.

---

## AIQ-00286 — Úvodní slide: HOPI TechIQ presents HOPI AppIQ

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** Claude

Úvodní slide přepracovat: HOPI TechIQ logo (violet #A855F7) nahoře + text "presents" (malý, kurzívou) + HOPI AppIQ logo (green/orange) pod ním. Obě loga velká, reprezentativní. Odstranit duplicity — teď je 2x AppIQ text zbytečně.

---

## AIQ-00287 — Anthropic text: oprava formulace

**Datum:** 2026-04-21 | **Status:** CLOSED | **Assignee:** Claude

**Implementation notes:** Chip "🏠 V čele rodina" → "👥 Vedena zakladateli" / "👥 Founder-led" v HOPI & Anthropic sekci. V parallels sekci je Anthropic správně popsán jako "VC-backed startup, ALE: CEO Dario Amodei a President Daniela Amodei jsou skuteční sourozenci" — bez použití "rodinná firma". HOPI je stále správně "tradiční rodinná firma" (vlastnictví).

---

## AIQ-00288 — "90 Days" slide: přepracovat na 01.01.2027

**Datum:** 2026-04-21 | **Status:** REVIEW | **Assignee:** Claude

**Implementation notes:** Sekce přejmenována na "Cesta k prvním platícím uživatelům · B2C Launch 01.01.2027". 4-fázový plán: Fáze 1 Q2 2026 (Základ) → Fáze 2 Q3 2026 (MVP+Beta) → Fáze 3 Q4 2026 (Launch Prep) → 🚀 01.01.2027 (B2C Live). Dynamický odpočet (ctdown-days/hours/mins/secs) aktualizovaný každou sekundu do půlnoci 01.01.2027. Právní podmíněnost zachována jako note box.

---

## AIQ-00289 — Nový slide: AI-driven development 90%/10%

**Datum:** 2026-04-21 | **Status:** REVIEW | **Assignee:** Claude

**Implementation notes:** Nová sekce `#s-ai-dev` v INVESTOR_BRIEF.html za Go-to-Market sekcí. Obsah: pipeline 6 kroků (Záměr 10% → AI Architektura → AI Kód → Human Review 10% → AI Test → Deploy CI/CD), vizuální bar 90%AI/10%Human, stats row (7 týdnů, 221+ složek, 17.8k LoC, ~$900 API, 298 OIL tasks), citát o technology moat. CZ/EN bilingvní.

---

## AIQ-00290 — Překlady CZ/EN: ověřit a opravit nepřesné znaky

**Datum:** 2026-04-21 | **Status:** REVIEW | **Assignee:** Claude

**Implementation notes:** Opraveno: "bilingvní CS/EN" → "CZ/EN" v INVESTOR_BRIEF.html (CZ i EN verze textu). Nav lang tlačítka CS→CZ na INVESTOR_BRIEF i CEO_BRIEF. Cyrilice v CLAUDE.md (AI-first marketing spec) jsou encoding artefakty v tom souboru — HTML stránky jsou čisté UTF-8. Žádná cyrilice v generovaných HTML stránkách nalezena.


---

## AIQ-00285 — Brand koncept: finální výběr Claude+Anthropic lockupu ✓ CLOSED

**Datum:** 2026-04-21 | **Status:** CLOSED | **Assignee:** David Gogela

**FINÁLNÍ VÝBĚR Davida:**
- **P6** — Čistý brand hierarchy (HOPI TechIQ malé + AppIQ dominantní bez HOPI a bez čar + Claude · Anthropic) → pro titulní slide, investor deck, CEO Brief
- **P3** — & Partnership lockup (HOPI AppIQ & Claude, rovnocenné pozice) → pro Anthropic partnership slide, co-branding, press kit

**Změna oproti původnímu návrhu:** Symbol × → & (křížek = matematik, & = partnerství — "HOPI AppIQ and Claude")

**P6 logika:** HOPI TechIQ = kdo uvádí · AppIQ = hlavní brand (stojí sám, globální produkt) · Claude · Anthropic = kdo podporuje (AI vrstva)
**P3 logika:** Dvě rovnocenné strany, partnerský vztah, přirozené čtení

Oba finální výběry označeny v BRAND_CONCEPTS.html jako "✓ FINÁLNÍ VÝBĚR". Implementace do stránek: AIQ-00285-T1.

---

## AIQ-00295 — Navigation propojení stránek ✓ CLOSED

**Datum:** 2026-04-21 | **Status:** CLOSED | **Assignee:** Claude

**Implementation notes:** PERSONAL_PITCH — 2 viditelné karty (📄 CEO Brief oranžová + 🔒 Investor Gateway fialová) přidány na začátek #doc-content, zobrazí se po odemčení heslem. CEO_BRIEF nav-right — přidán ← Personal Pitch odkaz. INVESTOR_ENTRY — přidán ← Personal Pitch div nad .card. INVESTOR_BRIEF nav-right — přidán ← Investor Entry odkaz. Hudba: visibilitychange listener přidán do všech 3 stránek — auto-pause fade-out 0.6s při přepnutí tabu, eliminuje kolizi hudby. Commit e98fd24 + d182053.

---

## AIQ-00294 — OG image redesign centrovaný layout ✓ CLOSED

**Datum:** 2026-04-21 | **Status:** CLOSED | **Assignee:** Claude

**Implementation notes:** 3. iterace OG images — centrovaný obsah (ne left-bar), top/bottom 8px barevné pruhy, 140px headline. og-image-ceo.png (Business Vision, oranžová), investor-og.png (Business Case, fialová), investor-entry-og.png (Investor Gateway, gradient). Root příčina chyby: Edge --screenshot s relativní cestou → fix absolutní cesta. og:image URL v CEO_BRIEF přesunuta z root na v7.22 verzovanou cestu. Commit c2da877.

---

## AIQ-00291 — OG Image PNG fix ✓ REVIEW

**Datum:** 2026-04-21 | **Status:** REVIEW | **Assignee:** Claude

**Root cause:** `og:image` meta tag odkazoval na `investor-og.svg`. Sociální platformy (Teams, WhatsApp, LinkedIn, Facebook) SVG jako og:image nepodporují — proto se nezobrazoval žádný náhledový obrázek u sdílených odkazů. Stejný problém platil pro `<img src="investor-og.svg">` v hero kartě INVESTOR_ENTRY.html — některé kontexty renderingu SVG jako `<img>` nepodporují.

**Fix:**
1. `investor-og.png` (1200×630 PNG, ~96KB) vygenerován přes PowerShell `System.Drawing` — vizuálně replikuje SVG (tmavé pozadí, logo HOPI AppIQ, stats boxy: 8 týdnů / ~$1k / 109 commits / LIVE, brand badge Claude·Anthropic)
2. `INVESTOR_BRIEF.html` — `og:image` + `twitter:image` → `.png`; přidán `og:image:type=image/png`
3. `INVESTOR_ENTRY.html` — `og:image` + `twitter:image` → `.png`; `<img src>` hero karty → `.png`; přidán `og:image:type=image/png`
4. Deploy: git commit `06c44a6`, push → GitHub Pages v7.22

**Test (David — AIQ-00291-T1):** Sdílet odkaz přes Teams/WhatsApp a ověřit, že se zobrazí náhledový obrázek. Ověřit hero kartu v INVESTOR_ENTRY.html.

## AIQ-00296 — PREPARE_RELEASE.ps1 automatické release notes ✓ REVIEW

**Datum:** 2026-04-21 | **Status:** REVIEW | **Assignee:** Claude

**Implementation notes:** Skript `PREPARE_RELEASE.ps1` — spouštět před každým `DO_DEPLOY.ps1`. Čte `OIL.json`, filtruje dnešní CLOSED tasky (bez test/archive), sestaví 2-vrstvé notes: Layer 1 = hlavní změny per taskType skupiny (Vývoj/Oprava/Design/Obsah), Layer 2 = per-task detail s rozbitým note. Zobrazí draft + 3 možnosti: `ano` (použít auto-titulek), vlastní text (custom titulek), `ne` (zrušit). Po odsouhlasení zapíše sekci do `CHANGELOG.md` a bumpe `_ver.js`. Pravidlo přidáno do CLAUDE.md jako Pravidlo 5 (platí vždy). Motivace: release notes se dříve psaly ručně, vše je v OIL.json → zbytečná práce navíc.

---

## AIQ-00298 — Release notes inteligentní flow ✓ CLOSED

**Datum:** 2026-04-21 | **Status:** CLOSED | **Assignee:** Claude

**Implementation notes:** CLAUDE.md Pravidlo 5 aktualizováno. Nový flow: Claude čte OIL.json + OIL_CONTEXT.md → Layer 2 ze všech CLOSED tasků (mechanicky z note) → Layer 1 = Claude sám vybírá 3-5 nejdůležitějších změn vlastním úsudkem → zobrazí v chatu → David schválí/upraví wording → Claude zapíše CHANGELOG + bumpe _ver.js → DO_DEPLOY. PREPARE_RELEASE.ps1 zůstává jako fallback bez Claude. DO_DEPLOY PREFLIGHT blokuje bez dnešního CHANGELOG záznamu.

---

## AIQ-00297 — AUTO_ARCHIVE.bat [GIT] záloha ✓ CLOSED

**Datum:** 2026-04-21 | **Status:** CLOSED | **Assignee:** Claude

**Implementation notes:** Přidána [GIT] sekce do AUTO_ARCHIVE.bat — robocopy /MIR z C:\repos\appiq do OneDrive\_GIT_BACKUP\appiq (včetně .git složky = plná git history). Přidány proměnné GIT_STAT + GIT_FILES, [GIT] řádek do ZAVER souhrnu. Ochrana před výpadkem GitHubu — obnova možná přes git clone z OneDrive zálohy. Testováno: 234 souborů zkopírováno OK, CHYBY: 0.

---

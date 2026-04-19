# CHANGELOG — HOPI AppIQ | Souhrnný přehled

Formát: `[typ]` — **Přidáno** · **Opraveno** · **Změněno** · **Odstraněno**

---

## Přehled streamů

| Stream | Složka | Changelog | Aktuální verze |
|--------|--------|-----------|----------------|
| Aplikace | `HOPI_AppIQ/` | `HOPI_AppIQ/CHANGELOG.md` | v1.2-Phase0 |
| Web + Prezentace | `HOPI_AppIQ_WebPage/` | `HOPI_AppIQ_WebPage/CHANGELOG.md` | v1.1-WebPage |

*Tento soubor je souhrnný přehled — detaily jsou vždy v per-stream changelogu výše.*

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

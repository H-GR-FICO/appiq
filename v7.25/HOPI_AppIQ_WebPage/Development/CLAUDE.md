# CLAUDE.md — AppIQ Studio · Session Startup Instructions

> Tento soubor je automaticky načten Claudem na začátku každé session.
> Aktualizuj ho při změnách struktury projektu nebo konvencí.

---

## Session Startup — povinné pořadí čtení

Na začátku každé session načti VŽDY v tomto pořadí:

1. `_SESSION_START/BRIEFING.md` — kde jsme skončili, co je otevřené, klíčová rozhodnutí
2. `OIL.json` — aktuální stav všech úkolů (AIQ-NNNNN)
3. `OIL_CONTEXT.md` — kontext a výtah z diskusí ke každému úkolu

### Pokud session je o HOPI TechIQ Platform v8.0+ (nová platforma)

4a. `HOPI_TechIQ/DOCS/architecture/PRODUCT_MODEL.md` — 9D model, taxonomie, manifest schema ← **referenční model pro veškerá rozhodnutí**
4b. `HOPI_TechIQ/DOCS/architecture/PLATFORM_OVERVIEW.md` — co platforma je, pro koho, roadmap
4c. `HOPI_TechIQ/DOCS/architecture/REPO_STRUCTURE.md` — folder architektura, pravidla

### Pokud session je o Legacy stream (v7.22 — HOPI AppIQ WebPage/AppIQ)

4x. `PORTAL_ARCHITECTURE.md` — architektonický rámec platformy (BLOK 0–8)
5x. `ARCH_MAP.md` — kódy a vazby všech objektů (screeny, slidy, sekce, moduly)
6x. `HOPI_AppIQ_WebPage/Development/PORTAL_PRESENTATION.html` — aktuální stav prezentace
7x. `HOPI_AppIQ/Development/index.html` — aktuální stav runtime aplikace

> **Pravidlo:** Pokud je v BRIEFING.md aktivní práce na v8.0 (HOPI_TechIQ/), načti větev v8.0.
> Pokud je aktivní práce na v7.22 (HOPI_AppIQ_WebPage/), načti větev Legacy.
> Při pochybnostech načti obě větve.

---

## Projekt — přehled

**Název:** HOPI AppIQ — AI-powered Enterprise Application Platform
**Owner:** David Gogela, Head of Group Controlling, HOPI Holding
**Cíl:** Interní pilot (Finance Phase 0) → rollout na divize HOPI → spin-off tech entita → komerční SaaS

### Dva streamy
| Stream | Složka | Popis |
|--------|--------|-------|
| APP | `HOPI_AppIQ/` | Runtime aplikace (Finance portal, SPA) |
| WEB | `HOPI_AppIQ_WebPage/` | AppIQ Studio (Hub, Promo, Prezentace, Dev/Test/Admin) |

### Klíčové soubory
| Soubor | Účel |
|--------|------|
| `OIL.json` | Task tracker — Open Issue List (AIQ-NNNNN formát) |
| `OIL_CONTEXT.md` | Kontext, rozhodnutí a výtahy z diskusí per úkol |
| `ARCH_MAP.md` | Architekturní mapa — kódy a vazby všech objektů (WEB/PREZ/APP) |
| `PORTAL_ARCHITECTURE.md` | Živá architektonická dokumentace (BLOK 0–8) |
| `HOPI_AppIQ_WebPage/Development/PORTAL_PRESENTATION.html` | Prezentace platformy v6+ (bilingvní CS/EN) |
| `HOPI_AppIQ/Development/index.html` | Runtime aplikace (Group Controlling Portal) |
| `CHANGELOG.md` | Souhrnný changelog obou streamů |
| `_SESSION_START/BRIEFING.md` | Dynamický stav — aktualizovat na konci každé session |

---

## CEO BRIEF — Denní komunikační pravidlo (závazné, 2026-04-21)

> Strategické rozhodnutí David Gogela. TOTAL AGILE princip — management vidí progress POŘÁD AKTUÁLNĚ.

- **CEO Brief se odesílá každý den.** Bez výjimky.
- **Claude na konci každé session aktualizuje Daily Teaser** v CEO_BRIEF.html (datum, co přibylo, klíčové změny).
- **Track record** = auditovatelná historie (denně/týdně/měsíčně/ročně) — implementace viz AIQ-00239.
- Obsah denního update: nové sekce, aktualizované statistiky (git commits, OIL tasks, čas), klíčová rozhodnutí.
- Po každém deployi: aktualizovat datum a obsah Daily Teaser banneru na aktuální den.

---

## FÁZOVÝ PLÁN — Go-to-Market (závazné, 2026-04-20)

> Strategické rozhodnutí David Gogela. Platí pro veškerá produktová a architektonická rozhodnutí.

```
PHASE 1 (2026–2027)  ← TEĎKA
├── HOME B2C          primární revenue — freemium → premium, PLG motion
│   Profily: Jednotlivec · Pár · Rodina · Rozšířená rodina (H1–H4)
└── HOPI Group pilot  living proof — interní, žádný revenue deal
    Role: "Stavíme to pro sebe → víme že to funguje → prodáváme světu"

PHASE 2 (2027–2028)
└── Enterprise B2B    HOPI pilot = referenční zákazník pro první dealy
    Profily: Velká firma, Střední firma, Veřejné instituce

PHASE 3 (2028+)
└── Marketplace · White-label · Reseller · B2B2C
```

**Dopad na každé rozhodnutí:**
- Architektura v8.x = optimalizována pro HOME B2C (jednoduché onboarding, rychlé time-to-value)
- HOPI pilot ≠ enterprise feature requirements (nepřidávat enterprise komplexitu kvůli internímu piloту)
- Phase 2 Enterprise features = teprve po validaci HOME B2C

---

## HOPI Group — organizační struktura

Divize: **SUPPLY CHAIN · FOODS · AGRICULTURE · SERVICES · HOLDING**
- HOLDING obsahuje: IT oddělení, Finance (David), Group Management
- Cíl: AppIQ = budoucí **6. divize HOPI Tech / AppIQ s.r.o.**
- Klíčový argument pro leadership: "budujeme IT firmu zevnitř místo akvizice"

---

## ID úkolů — konvence

Formát: `AIQ-NNNNN` (5 číslic, sekvenční)
- Příklad: `AIQ-00001`, `AIQ-00023`
- OIL = název metodiky a panelu, AIQ = prefix ID úkolů
- Parsing v JS: `parseInt(t.id.replace('AIQ-',''), 10)`, `padStart(5,'0')`

---

## Doménový slovník (OIL_DOMAINS)

| Doména | Moduly |
|--------|--------|
| Studio | Hub, DevCenter, TestCenter, AdminCenter, Promo, Docs, Presentation |
| Finance | Calendar, Tracking, OrgChart, Reporting, FX, SAP, BNS, SharePoint, HelpSystem |
| Operations | HelpSystem |
| Purchasing | HelpSystem |
| Platform | Brand, Architecture, PMO, OIL, ReleaseManager, Changelog, HelpSystem, Presentation, Auth, AppCatalog, TranslationStore |

---

## Workflow konvence

- **Status flow:** 🔵 OPEN → 🟠 IN PROGRESS → 🟣 REVIEW → ✅ CLOSED | 🔴 RETURNED → IN PROGRESS
- **Claude aktualizuje:** status na IN PROGRESS při zahájení, CLOSED po dokončení + note
- **David aprobuje:** REVIEW → CLOSED nebo RETURNED
- **Auto-sort:** status (OPEN nahoru) → priorita (HIGH nahoru) → datum (nejstarší nahoru)

## STOP pravidlo — organicky vznikající úkoly (platí vždy, bez výjimky)

Pokud během práce vznikne nový úkol, který nebyl naplánován (objev, fix, refactor, zlepšení):

**1. ZASTAV — nevytvářej žádný kód ani soubory**
**2. Zaregistruj nový AIQ záznam v OIL.json (status IN PROGRESS)**
**3. Teprve pak pokračuj v práci**
**4. Po dokončení: OIL_CONTEXT.md (AIQ) nebo BKONTEXT.md (BIZ) — povinně, ihned**

Platí pro vše — i pro 5minutový fix. Bez výjimky.

## BRAINSTORMING CAPTURE — pravidlo (platí vždy, bez výjimky)

> Strategické rozhodnutí David Gogela 2026-04-21. Brainstormingy jsou extrémně důležité — nesmí se ztratit.

**Trigger:** David řekne "pojďme out-of-the-box" / "pošlu ti zadání" / pošle velký strategický vstup.

### Povinný postup:

1. **IHNED po přijetí brainstorming vstupu:**
   - Zapsat celý vstup do `_SESSION_START/BRAINSTORM_LOG.md` (append, ne přepisovat)
   - Formát: `## Brainstorm YYYY-MM-DD HH:MM\n[celý vstup]`

2. **Před jakoukoliv diskusí nebo zpracováním:**
   - Potvrdit Davidovi: "Brainstorming uložen do BRAINSTORM_LOG.md ✅"

3. **Při zahájení zpracování:**
   - Zaregistrovat AIQ/BIZ záznamy pro každou oblast DŘÍVE než se začne psát kód nebo dokumenty

4. **Proč toto pravidlo existuje:**
   - Context window compression způsobila ztrátu celého ranního brainstormingu 2026-04-21
   - David si ho musel posílat ručně — drahocenný čas a riziko ztráty
   - BRAINSTORM_LOG.md = záchranná síť pro případ přerušení session

### BRAINSTORM_LOG.md — umístění a formát
```
_SESSION_START/BRAINSTORM_LOG.md

## Brainstorm 2026-04-21 06:00 — Strategic Recon (8 oblastí, 63+ tasků)
[celý originální vstup]

## Brainstorm 2026-04-22 09:00 — [název tématu]
[celý originální vstup]
```

**Nikdy nepřepisovat — pouze appendovat nové sekce.**

---

## Crash recovery / session continuation

Pokud je session obnovena po přerušení (context summary, crash, nová konverzace):

1. Přečti `_SESSION_START/BRIEFING.md` — kde jsme skončili
2. Přečti `OIL.json` — ověř poslední AIQ ID a stav open úkolů
3. **NEZAČÍNEJ práci dokud nemáš OIL záznam (IN PROGRESS) pro aktuální úkol**
4. Pokud práce již probíhá bez záznamu — zastav, zaregistruj zpětně, pak pokračuj

---

## OIL-first konvence (platí od v7.15)

**Před každým vývojovým úkolem musí Claude:**
1. Vytvořit záznam v `OIL.json` s těmito poli:
   - `id` — AIQ-NNNNN (sekvenční)
   - `taskType` — `development | fix | content | design | review | approval | test | release | archive | research | docs`
   - `effort` — T-shirt: `XS | S | M | L | XL` (viz tabulka níže)
   - `estimatedTime` — odhad v minutách (číslo)
   - `actualTime` — skutečný čas v minutách (doplnit po dokončení, na začátku null)
   - `assignee` — `Claude` nebo `David Gogela`
   - `status` — `IN PROGRESS` při zahájení
   - `createdAt` — `YYYY-MM-DD HH:mm` (povinné)
   - `completedAt` — `YYYY-MM-DD HH:mm` (doplnit po dokončení, na začátku null)
   - `durationDays` — počet kalendářních dní od createdAt do completedAt; pro CLOSED = integer, pro ostatní = null (Admin Center počítá dynamicky)
2. Po dokončení: doplnit `actualTime`, `completedAt`, `durationDays`, přepnout status na CLOSED nebo REVIEW
3. **IHNED po změně statusu na CLOSED nebo REVIEW: zapsat záznam do `OIL_CONTEXT.md`** — co bylo uděláno, klíčová rozhodnutí, poznámky k implementaci. Toto není volitelné a neodkládá se na konec session.
4. Pro každý `development` nebo `fix` task: vytvořit companion test task(y) se `taskType: "test"`, polem `testType` a `linkedTask` (odkaz na původní AIQ)

**Test task — povinná pole navíc:**
- `testType` — `functional | visual | content | integration | regression | acceptance | code-review`
- `linkedTask` — AIQ-NNNNN odkaz na testovaný úkol
- `assignee` — David Gogela (UAT) nebo Claude (technická/integrační kontrola)

**testType — kdy použít:**
| Typ | Kdy |
|-----|-----|
| `functional` | Projít feature krok po kroku, ověřit chování a edge cases |
| `visual` | Layout, barvy, branding konzistence, responsive |
| `content` | Texty, překlady CS/EN, správnost čísel a faktů |
| `integration` | Propojení komponent — OIL.json → UI, skripty → soubory, deploy → GitHub Pages |
| `regression` | Ověřit že existující věci fungují po změně (Claude) |
| `acceptance` | Finální sign-off — splňuje záměr úkolu? (David) |
| `code-review` | Správnost kódu, konzistence, bezpečnost (Claude) |

**T-shirt → čas:**

| Effort | Rozsah | Minuty |
|--------|--------|--------|
| XS | < 30 min | 0–29 |
| S | 30 min – 2 h | 30–120 |
| M | 2 – 4 h | 121–240 |
| L | 4 – 8 h | 241–480 |
| XL | 8+ h | 480+ |

## Klíčová feedback pravidla

- Správnost před rychlostí — žádné zkratky
- Neměnit akceptované prvky (logo, barvy, subtitle) bez explicitního souhlasu
- Vždy recap změn na konci odpovědi
- Krátké a konkrétní odpovědi — David čte v kontextu práce, ne jako esej

## Aktualizační pravidla — ARCH_MAP.md

Kdykoli je přidán nebo změněn jakýkoli pojmenovaný objekt v projektu, **ihned aktualizovat ARCH_MAP.md**:
- Nový overlay screen → přidat řádek do tabulky SCR-xx
- Nový slide (biz-scale) → přidat řádek do SLD-xx
- Nová dokumentační sekce → přidat řádek do DOC-xx
- Nový modál → přidat řádek do MOD-xx
- Nová sekce index.html → přidat řádek do IDX-xx
- Nový modul Finance portálu → přidat řádek do APP-xx
- Nový logo/brand prvek → přidat do příslušné tabulky (LF-xx, BC-xx)
- Nová vazba mezi soubory → aktualizovat MAPA VAZEB
- Při přidání objektu aktualizovat také verzi a datum v záhlaví ARCH_MAP.md

---

## Vizuální kvalita — pravidlo (platí vždy, bez výjimky)

**Vizuál prodává. Musí být 100% správný na všech zařízeních před každým deployem.**

- Každý CSS/layout úkol musí mít `deviceImpact` ověřeno před pushnutím
- Nové `@media` bloky patří **na konec CSS** (za všechny base styly), jinak base pravidla přepíší mobile overrides
- Pokud nelze vizuálně ověřit v DevTools před pushnutím → explicitně upozornit Davida a počkat na jeho souhlas
- Až bude AIQ-00118 (Device Preview) hotov → povinný krok před každým CSS deployem

---

## Deployment bezpečnostní pravidla (platí vždy)

### Kde jsou soubory
| Místo | Co to je |
|-------|----------|
| `OneDrive / CO_PROJECT / HOPI_AppIQ_WebPage/Development/` | Zdrojové soubory — tady vyvíjíme |
| `C:\repos\appiq\vX.XX\...` | Lokální kopie pro GitHub |
| `h-gr-fico.github.io/appiq/vX.XX/...` | **Živý web** — každý push jde rovnou sem |

### Pravidlo 1 — Nová funkce = nová verze
Větší změna (nový slide, nová feature, refactor) → vždy spustit `DO_DEPLOY.ps1` → vznikne nová složka `vX.XX/` → push. Předchozí verze zůstane nedotčená.

### Pravidlo 2 — Hotfix = patch do aktuální verze
Malá oprava (CSS, text, drobný bug) → opravit přímo v aktuální verzi (např. `v7.21/`) → push. Přijatelné riziko, protože předchozí verze je stále k dispozici.

### Pravidlo 3 — Staré verze NIKDY nesmazat
Složky `v7.20/`, `v7.19/`... jsou záchranná síť. Pokud nová verze nefunguje, David pošle odkaz na starší verzi za 30 sekund. Mazat pouze pokud David explicitně řekne.

### Pravidlo 4 — Před push většího změny: lokální test
Před pushnutím nové verze otevřít soubory z `C:\repos\appiq\vX.XX\...` v prohlížeči přes `file://` a ověřit funkčnost.

### Pravidlo 5 — Release notes VŽDY před deployem (AIQ-00296, AIQ-00298)

**Povinný flow (Claude je v session):**
1. Claude přečte dnešní CLOSED tasky z `OIL.json` + detail z `OIL_CONTEXT.md`
2. Claude sestaví **Layer 2** — detail ze všech tasků (z `note` pole)
3. Claude sestaví **Layer 1** — sám vybere 3–5 nejdůležitějších změn (vlastní úsudek)
4. Zobrazí obě vrstvy Davidovi v chatu — David schválí nebo upraví wording
5. Claude zapíše sekci do `CHANGELOG.md` + bumpe `_ver.js`
6. Teprve pak `DO_DEPLOY.ps1`

**Fallback (Claude není v session):**
- Spustit `PREPARE_RELEASE.ps1` — mechanická verze bez inteligentního výběru Layer 1

**DO_DEPLOY.ps1 PREFLIGHT** blokuje deploy pokud CHANGELOG nemá dnešní datum. Bez výjimky.

---

## PLATFORM CORE — Modulární architektura (platí od v8.0, závazná pro vždy)

> Strategická dohoda David + Claude, 2026-04-20. Platí bez výjimky pro veškerý nový kód.

### Princip — "Skládankový přístup"

Každá stránka = HTML kostra + deklarace modulů. Žádný kód nepatří do více souborů.

```
/_core/         ← Jádro (nikdy neměníme strukturu)
  _config.js    ← prostředí, feature flags, API endpoints
  _core.js      ← event bus, module loader, shared utilities
  _platform.css ← design system (barvy, typo, spacing, responsive)

/_modules/      ← Moduly (každý dělá jednu věc)
  _i18n.js      ← jazyk: CS/EN, překlady, localStorage
  _music.js     ← hudba: play/pause/stop, localStorage
  _hopiq.js     ← chatbot: Claude API, floating widget
  _auth.js      ← autentizace: hesla, tokeny, biz_unlocked
  _data.js      ← DATA LAYER — jediné místo pro přístup k datům

/_translations/ ← Překlady (data oddělená od kódu)
  cs.json
  en.json
```

### 5 závazných pravidel

1. **Single Responsibility** — každý modul dělá JEDNU věc. Nikdy víc.
2. **Event Bus** — moduly komunikují POUZE přes `AppIQ.emit()` / `AppIQ.on()`. Žádné přímé volání mezi moduly.
3. **Data Layer** — veškerý přístup k datům jde přes `_data.js`. Nikdy fetch() přímo v HTML nebo jiném modulu.
4. **DRY** — pokud je stejný kód na dvou místech, patří do modulu. Žádná duplicita.
5. **Backend-Ready** — data layer navržen tak, aby swap JSON → REST API → SQL znamenal změnu POUZE v `_data.js`.

### Event Bus — povinný vzor komunikace

```javascript
// Správně:
AppIQ.emit('lang:changed', 'en');     // vysílá
AppIQ.on('lang:changed', fn);         // naslouchá

// Špatně:
_music.setLang('en');                 // přímé volání mezi moduly — ZAKÁZÁNO
```

### Responsive — povinný vzor

```css
/* Base styly = mobile first (žádný @media) */
.component { display: flex; flex-direction: column; }

/* Tablet a desktop = vždy NA KONCI _platform.css */
@media (min-width: 768px)  { .component { flex-direction: row; } }
@media (min-width: 1200px) { .component { gap: 32px; } }
```

### Backend readiness — vrstvy

| Teď | Budoucnost | Změna v kódu |
|-----|-----------|-------------|
| JSON soubory | REST API | pouze _data.js |
| localStorage auth | JWT / OAuth2 | pouze _auth.js |
| Cloudflare Worker | vlastní AI backend | pouze _config.js + _data.js |

### Pořadí buildu při každé nové feature

1. Patří do existujícího modulu? → přidej tam
2. Je to nová odpovědnost? → nový modul v `/_modules/`
3. Je to data? → přes `_data.js`
4. Je to vizuál? → přes `_platform.css` CSS proměnné
5. Teprve pak HTML stránka

---

## 9D PRODUKTOVÝ MODEL — Referenční rámec (závazný, 2026-04-20)

> Strategická dohoda David + Claude, 2026-04-20. Toto je mentální model celé platformy.
> Plná dokumentace: `HOPI_TechIQ/DOCS/architecture/PRODUCT_MODEL.md`

### 9 dimenzí — přehled

| # | Dimenze | Hodnoty |
|---|---------|---------|
| 1 | Svět | Enterprise · Home |
| 2 | Sektor | Private · Public · State |
| 3 | Industry | 20+ odvětví (Healthcare★, Defense, IT, Finance, Logistics...) |
| 4 | Scale | E: L1 Jednotlivec → L6 Holding \| H: L0a Dítě → L5 Rodina |
| 5 | Doménová funkce | 13+ oblastí Enterprise (Finance, HR, **Education & Training**★, Operations, Health...) · 12 Home domén |
| 6 | Mód | Assemble (No-Code) · Template (Low-Code) · Custom (Pro-Code) |
| 7 | AI Maturita | S0 Manuální → S4 Autonomní |
| 8 | Platformová Zóna | Studio · Publish · Marketplace · Use · Market · Invest |
| 9 | Obchodní model | B2B · B2B2C · B2C · Marketplace · White-label · Reseller |

### Klíčový princip: Vertikály = Data, ne Kód

Přidání nové industrie/domény = přidání `manifest.json`. Nula řádků platformového kódu.

### APP Story — Marketplace životní cyklus

①Vznik → ②Discovery(AI) → ③Onboarding(AI) → ④Adopce → ⑤Komunita → ⑥Evoluce → ⑦Monetizace

---

## HOPI TechIQ — Adresářová architektura (závazná, 2026-04-20)

> Schváleno Davidem 2026-04-20. Plná dokumentace: `HOPI_TechIQ/DOCS/architecture/REPO_STRUCTURE.md`

### Mapování dimenzí na strukturu

```
DIM 8 (Zóna)     → Top-level složky
DIM 1,2,3        → MARKETPLACE/app-catalog/[world]/[sector]/[industry]/
DIM 4,5,7        → manifest.json (data soubory, NE složky)
DIM 6            → app-catalog/ vs template-store/ vs STUDIO/
DIM 9            → CICD/_configs/tiers/
```

### Folder strom (top-level)

```
HOPI_TechIQ/
├── PLATFORM/          ← Sdílená infrastruktura (_core, _modules, _components...)
├── STUDIO/            ← Zóna BUILD (dev, test, admin, release, cicd, team...)
├── MARKETPLACE/       ← Zóna PUBLISH + APP STORY
│   ├── _registry/     ← enterprise-catalog.json + home-catalog.json
│   ├── app-catalog/
│   │   ├── enterprise/
│   │   │   ├── private/   ← [industry]/manifest.json
│   │   │   ├── public/    ← [type]/manifest.json
│   │   │   └── state/     ← [agency]/manifest.json
│   │   └── home/
│   │       ├── individual/ ← [domain]/manifest.json
│   │       └── family/     ← [domain]/manifest.json
│   ├── template-store/ ← by-scale/ by-function/ by-industry/
│   ├── app-story/      ← story-cards/ reviews/ community/
│   └── builder/        ← wizard-engine/ step-definitions/
├── HUB/               ← Zóna USE (index.html, tech-hub/, biz-hub/)
├── MARKET/            ← Zóna MARKET (website/, demos/, case-studies/)
├── INVEST/            ← Zóna INVEST (product-design/, pitch/, ceo-brief/)
├── INTEGRATION/       ← Gateway + Connectors (sap, sharepoint, teams...)
├── DATA/              ← Schemas, migrations, models, seeds
├── AI/                ← Agents, MCP-servers, prompts, RAG, evaluation
├── SECURITY/          ← Auth, RBAC, Audit, Compliance (gdpr, hipaa, iso27001...)
├── TESTING/           ← Unit, integration, E2E, UAT, fixtures
├── MONITORING/        ← Logs, metrics, alerts, health
├── CICD/              ← Pipelines, scripts, configs (environments + tiers)
├── DOCS/              ← architecture/ api/ user/ runbooks/ decisions/
└── RELEASES/          ← versions/ CHANGELOG.md release-notes/
```

### Dokumentační vrstva

```
HOPI_TechIQ/DOCS/architecture/
├── PRODUCT_MODEL.md          ← 9D model, taxonomie, manifest schema (AIQ-00196)
├── REPO_STRUCTURE.md         ← Folder architektura + dimension mapping (AIQ-00197)
├── PLATFORM_OVERVIEW.md      ← Co platforma je, pro koho, jak funguje (AIQ-00198)
├── DEV_GUIDE.md              ← Developer onboarding (AIQ-00187)
└── INTEGRATION_ARCHITECTURE.md ← API, connectors, MCP (AIQ-00188)
```

### Pravidla — nikdy neporušit

1. Přidáváš industrii/doménu? → manifest.json, NE nový kód
2. Přidáváš platformovou zónu? → nová top-level složka + DOCS entry
3. Přidáváš business data? → MARKETPLACE/_registry/ JSON katalog
4. Přidáváš kód? → patří do PLATFORM/_modules/ nebo STUDIO/
5. Každá nová složka dostane README.md s 1 větou popisem

---

## WORKFLOW + PROCESS LAYER — Architektura (závazná, 2026-04-20)

> Strategická dohoda David + Claude, 2026-04-20. Nová 5. architektonická vrstva.

### PROCES ≠ WORKFLOW — zásadní rozdíl

```
PROCES    = business governance  — CO firma chce dělat, kdo, proč, SLA
WORKFLOW  = technická exekuce    — JAK to software provede, triggery, větve
TASK      = jednotka práce       — konkrétní úkol pro člověka nebo systém
ACTION    = atomická operace     — jedno volání API, jeden zápis do DB
```

Hierarchie: `PROCES → WORKFLOW → TASK → ACTION`

Jeden proces má více workflow (schvalovací, eskalační, auditovací). Jeden workflow obsluhuje více procesů.

### 5 architektonických vrstev (rozšíření ze 4)

```
VISUAL LAYER      HTML + _modules/ + _core/
      ↓
DATA LAYER        _data.js → JSON / REST / SQL
      ↓
WORKFLOW LAYER    [v8.x+] _workflow.js — state machine, persistentní stav   ← NOVÉ
      ↓
INTEGRATION LAYER Connectors (SAP, SharePoint, MCP...)
      ↓
AI AGENT LAYER    _agent.js — agenti orchestrují přes všechny vrstvy        ← NOVÉ
```

### Nové Platform Core moduly

```
PLATFORM/_modules/
  _workflow.js      ← workflow state machine + step executor (AIQ-00210)
  _agent.js         ← AI agent orchestration (AIQ-00211)
  _documents.js     ← Smart Document Hub + RAG interface (AIQ-00213)
  _notifications.js ← email, in-app, Teams webhook (AIQ-00215)
```

### Event Bus vs. Workflow Engine — kdy co použít

| Situace | Použij |
|---------|--------|
| Okamžitá reakce (klik, lang change) | Event Bus (`AppIQ.emit/on`) |
| Stavový proces přes čas (hodiny, dny) | `_workflow.js` + DB |
| AI rozhodnutí v procesu | `_agent.js` |
| Notifikace uživatele | `_notifications.js` |

### AI Agenti — 7 typů (závazný katalog)

| Agent | Úroveň | Co dělá |
|-------|--------|---------|
| Process Monitor | Proces | Hlídá KPIs, detekuje bottlenecky, navrhuje zlepšení |
| Approval Assistant | Workflow | Shrne kontext, navrhne rozhodnutí schvalovateli |
| Coordination Agent | Workflow | "Co dál a kdo to má udělat?" |
| Test Orchestrator | Workflow | Spustí testy, reportuje výsledky |
| Code Review Agent | Task | Zkontroluje kód před merge |
| Data Validator | Action | Ověří data před vstupem do procesu |
| BI Trigger Agent | Action | Monitoruje KPIs, spouští procesy při thresholdech |

### Schvalovací scénáře — příklady

**Enterprise:**
- Budget approval: iniciátor → nadřízený → CFO → SAP update → notifikace
- Smlouva: právník draft → business owner → CEO podpis → archivace
- IT change: developer → tech lead → ops → deploy

**HOME:**
- Rodinný rozpočet: člen rodiny navrhne → rodinný admin schválí → finance app aktualizuje
- Zdravotní výdaj: zadat účtenku → AI kategorizuje → připomenout pro daňové přiznání
- Školní aktivita: dítě požádá → rodič schválí → calendar event + platba

### Notifikace + Alerty — kanály a kdy

```
In-app          → vždy (každý event v platformě)
Email           → asynchronní akce (schválení čeká, deadline blíží se)
Teams webhook   → Enterprise workflow kroky, eskalace
Push (budoucí)  → mobilní app (Phase 3+)
```

Alert vs. Notifikace: Alert = akce vyžadována (červená). Notifikace = informace (modrá).

---

## SMART DOCUMENT HUB — Produktová schopnost (závazná, 2026-04-20)

> Klíčová Phase 1 HOME B2C feature. Sdílí infrastrukturu s HOPIQ nápovědou.

### Princip

`_documents.js` + `AI/rag/` = jedna infrastruktura, dva use-cases:
- **Nápověda platformy** — dokumenty autorem platforma, RAG dotazy = "Jak přidat modul?"
- **User Document Hub** — dokumenty autorem uživatel, RAG dotazy = "Najdi moji pojistku"

### AI schopnosti nad dokumenty

| Schopnost | HOME příklad | Enterprise příklad |
|-----------|-------------|-------------------|
| Čtení + extrakce | Pojistka → datum obnovy, částka | Faktura → splatnost, částka, dodavatel |
| Klasifikace | Automatická kategorie (zdraví, finance...) | Smlouva, faktura, report, compliance |
| Sumarizace | "Tato smlouva říká..." | "Klíčové body faktury: ..." |
| Archivace | Navrhne složku + tagy | Retention policy dle compliance |
| Akce | Odeslat emailem, sdílet, připomenout | Workflow trigger, podpis, SAP zápis |
| Alert | "Pojistka vyprší za 28 dní" | "Faktura po splatnosti 5 dní" |

### Document storage — rozhodnutí

- **v8.x:** browser storage / base64 (prototype, bez backendu)
- **v9.x+:** cloud storage S3-compatible, přístup výhradně přes `_data.js`

### DB tabulky

```
DOCUMENT              — metadata (id, owner, type, name, storage_ref, created)
DOCUMENT_VERSION      — verzování (každá změna = nová verze)
DOCUMENT_TAG          — AI + manuální tagy
DOCUMENT_ACTION_LOG   — audit (kdo, co, kdy)
DOCUMENT_SHARE        — sdílení (komu, práva, expiry)
```

---

## PHASE 1 — Go-to-Market závazná rozhodnutí (2026-04-20)

### Dvě separátní nasazení (ADR-002)

HOME B2C a HOPI Enterprise pilot = **dva separátní produkty**.
Sdílí Platform Core library (`_core.js`, `_platform.css`, moduly).
Nemusí řešit enterprise komplexitu v HOME B2C od začátku.

### HOME B2C domain priority

```
1. Finance       ← domain knowledge z HOPI, nejvyšší willingness to pay
2. Zdraví        ← největší trh, denní engagement, retence
3. Vzdělávání    ← silné pro Family segment, upsell H1→H3
4. Domácnost     ← praktické, pravidelné použití, retence
```

### HOPI pilot role

Interní, žádný revenue deal. Role: **living proof** = "Stavíme to pro sebe."
HOPI pilot ≠ enterprise feature requirements. Enterprise komplexita jde do Phase 2.

---

## DATA LAYER — Database Readiness (závazné, 2026-04-20)

> Explicitně potvrzeno: přechod JSON → libovolná DB = změna POUZE `_data.js`.
> Plná dokumentace: `HOPI_TechIQ/DOCS/architecture/PRODUCT_MODEL.md` + `DATA/_schemas/`

### Tři typy dat — kde žijí

| Typ | Teď (v8.x) | Po integraci DB | Změna v kódu |
|-----|-----------|----------------|-------------|
| Číselníky / dimenze | `DATA/_seeds/*.json` | DB dimension tabulky | pouze `_data.js` |
| Tenant / app data | localStorage / JSON | Tenant-isolated DB | pouze `_data.js` |
| Analytika | logfile | Data warehouse (star schema) | pouze `_data.js` |

### Dimension tabulky — 9D model jako databáze

```
DIM_WORLD · DIM_SECTOR · DIM_INDUSTRY (hierarchický)
DIM_SCALE_LEVEL (hierarchický) · DIM_DOMAIN · DIM_MODE
DIM_AI_LEVEL · DIM_COMPLIANCE · DIM_INTEGRATION
DIM_TIER · DIM_LANGUAGE · DIM_ZONE
```

### Vazbové tabulky (propojené číselníky)

```
INDUSTRY_COMPLIANCE · MANIFEST_SCALE · MANIFEST_DOMAIN
MANIFEST_MODULE · MANIFEST_INTEGRATION · TIER_FEATURE
TENANT_SCALE · USER_ROLE · MANIFEST_INHERITANCE
```

### Faktové tabulky (star schema)

```
FACT_USAGE · FACT_BILLING · FACT_AI_CALLS · FACT_PLATFORM_METRICS
```

### _data.js — dual-mode kontrakt (závazný vzor)

```javascript
// Přepínač: AppIQ.config.backend = 'json' | 'api'
DataService.getIndustries = async (filter) =>
  AppIQ.config.backend === 'api'
    ? fetch(`/api/v1/dimensions/industries?${filter}`)
    : readLocalSeeds('dim_industry.json', filter)
// Volající kód se NIKDY nemění
```

### Vztah manifest.json ↔ DB seed

```
MARKETPLACE/_registry/enterprise-catalog.json  ←→  DATA/_seeds/dim_industry.json
        developer view                                    DB-ready view
```

### Přechod na DB — přesné kroky (pro IT)

```
1. Spustit DATA/_migrations/001_init_dimensions.sql
2. Naplnit tabulky z DATA/_seeds/*.json
3. Upravit AppIQ.config.backend = 'api' v _config.js
4. Nasadit REST API backend
5. HTML, moduly, manifesty — BEZE ZMĚNY
```

### Složková struktura — NEMĚNÍ SE

DATA/ folder existuje. Přibývá obsah (ne nové složky):
`_schemas/dimensions/` · `_schemas/facts/` · `_schemas/entities/`
`_schemas/relationships/` · `_migrations/` · `_seeds/` · `_models/`

---

## INTEGRATION ARCHITECTURE — Závazný rámec (platí od v8.0, pro každý budoucí krok)

> Strategická dohoda David + Claude, 2026-04-20. Platí bez výjimky pro veškerý nový kód.

### Čtyři vrstvy platformy

```
VISUAL LAYER       HTML + _modules/ + _core/         ← teď stavíme
      ↓ jediný kontakt = _data.js
API GATEWAY        Cloudflare Workers / Azure API    ← fáze 2 (v9.x)
      ↓
CONNECTOR LAYER    Jeden konektor = jeden systém     ← fáze 3 (v10.x)
      ↓ MCP (Model Context Protocol)
AI LAYER           Claude API + MCP servery          ← fáze 3–4
```

### Systémy k napojení (Connector Layer)

| Systém | Typ dat | Priorita |
|--------|---------|---------|
| SAP | Finance, FX, pohyby, organizace | P1 |
| BNS | Reporting | P1 |
| MS SharePoint | Dokumenty, Wiki, smlouvy | P1 |
| MS Teams | Komunikace, notifikace | P2 |
| MS Power BI | BI datové sady, dashboardy | P2 |
| Monday.com | Projekty, úkoly, roadmapy | P2 |
| IDWare | Přístupy, identita, karty | P3 |
| HOPI Web | Veřejný obsah, novinky | P3 |

### 4 závazná pravidla integrace

1. **_data.js = jediný kontaktní bod** — žádný HTML soubor, žádný modul nikdy nevolá externí systém přímo
2. **Jeden konektor = jeden systém** — SAP konektor nezná Monday, Monday konektor nezná SAP
3. **MCP pro AI** — AI přistupuje k datům přes MCP servery, ne přímými API voláními
4. **Fázový postup** — každá fáze mění POUZE svou vrstvu, ostatní vrstvy se nedotýkají

### Fázový plán

| Verze | Co přibyde | Co se nemění |
|-------|-----------|-------------|
| v8.x (teď) | Visual layer + `_data.js` čte JSON | — |
| v9.x | `_data.js` → REST API backend + SQL databáze | Celý frontend |
| v10.x | Connector Layer (SAP, SharePoint, ...) | Frontend + API Gateway |
| v11.x | MCP servery → AI vidí vše | Vše ostatní |

### Co to znamená pro každý nový kód

- Přidáváš data? → vždy přes `_data.js`, nikdy přímo
- Přidáváš integraci? → vždy jako nový konektor, izolovaně
- AI má sahat na data? → vždy přes MCP server daného konektoru
- Cokoliv backend-specific? → patří za `_data.js`, ne do HTML/modulů

Referenční dokument: `INTEGRATION_ARCHITECTURE.md` (AIQ-00188)

---

## Konec session — co udělat

> **VAROVÁNÍ: OIL_CONTEXT.md a BKONTEXT.md se NIKDY nekopírují zastaralé. Nejdříve aktualizovat, pak kopírovat.**

1. **Zkontrolovat OIL_CONTEXT.md** — každý task uzavřený (CLOSED/REVIEW) dnes musí mít záznam. Chybí-li → doplnit TEĎKA.
2. **Zkontrolovat BKONTEXT.md** — každý BIZ task uzavřený nebo nově registrovaný jako skupina musí mít záznam. Chybí-li → doplnit TEĎKA.
3. Aktualizovat `_SESSION_START/BRIEFING.md` — kde jsme skončili, co je otevřené
4. Zkopírovat aktuální `OIL.json` do `_SESSION_START/OIL.json`
5. Zkopírovat `OIL_CONTEXT.md` do `_SESSION_START/OIL_CONTEXT.md`
6. Zkopírovat `BKONTEXT.md` do `_SESSION_START/BKONTEXT.md`
7. Zkopírovat `ARCH_MAP.md` do `_SESSION_START/ARCH_MAP.md`
8. Aktualizovat relevantní CHANGELOG.md
9. Spustit plnou archivaci: `AUTO_ARCHIVE.bat`

> Kroky 4–8 jsou automatizovány v `AUTO_ARCHIVE.bat` (plná archivace — WEB+APP+TECHIQ+META+LOG).

---

## ARCHIVAČNÍ PROTOKOL — závazný postup (platí vždy)

**Trigger:** David říká "archivujeme" nebo "archiv"

### Krok 1 — Dialog před archivací
Claude provede checklist a položí Davidovi otázky:
- Jsou všechny rozpracované OIL úkoly správně ve stavu IN PROGRESS nebo CLOSED?
- Je BRIEFING.md aktuální (dnešní rozhodnutí, správné pořadí na zítřek)?
- Je něco co jsme řekli ale nezapsali do OIL / BOIL / kontextů?
- Chceme archivovat i legacy streamy (WEB + APP), nebo jen TECHIQ + META?

### Krok 2 — Davidovo potvrzení
David potvrdí: "ano, archivuj" nebo opraví co chybí.

### Krok 3 — Fyzická archivace
Claude spustí `_run_archive_now.ps1` a počká na výsledek.

### Krok 4 — Potvrzení Claudem (povinné)
Claude explicitně potvrdí:
```
Archivace dokončena — session_YYYYMMDD_HHMM
[WEB]    HOPI_AppIQ_WebPage\Archive\session_STAMP\   ✅
[APP]    HOPI_AppIQ\Archive\session_STAMP\            ✅
[TECHIQ] HOPI_TechIQ\RELEASES\snapshots\session_STAMP\ ✅  (X souborů, Y složek)
[META]   _SESSION_START\                              ✅
[LOG]    ARCHIVE_LOG.md aktualizován                  ✅
```

**Bez tohoto potvrzení session NENÍ uzavřena.**


---

## AI-FIRST MARKETING SPEC (zavazna, 2026-04-20)

> Strategicke rozhodnuti David Gogela. Plati pro veskerou komunikaci, investor deck, pitch, MARKET web.

**"Fully Integrated AI Solution" â€” AI neni feature. AI je pateret kazde vrstvy platformy.**

### AI pritomnost per vrstva

| Vrstva | AI co dela |
|--------|-----------|
| Platform Core (_hopiq.js) | HOPIQ chatbot asistent na kazde strance |
| _i18n.js (AI Language Center) | Auto-preklad novych jazyku, detekce chybejicich prekladu |
| _workflow.js | AI rozhoduje v S3/S4 procesech bez cloveka |
| _agent.js | 7 AI agentu orchestruji procesy |
| _documents.js | AI cte, klasifikuje, sumarizuje, upomina |
| Studio - Design Lab | AI generuje komponenty, navrhuje opravy, detekuje a11y problemy |
| Studio - Workflow Designer | Text-to-flow, AI validace, AI coach, AI odhad |
| Studio - Inspector | AI identifikuje element z prirozenĂ©ho popisu |
| Marketplace | AI discovery (najdi spravnou app), AI onboarding (guided setup) |
| HOME | AI budget advisor, AI health coach, AI education tutor |
| Enterprise | AI Approval Assistant, AI Process Monitor, AI BI Trigger |

### AI Maturity progression (DIM 7) = AI journey zakaznika

```
S0 Manualni  -> uzivatel zacina, AI neni nutne
S1 Prehledy  -> AI analyzuje a vizualizuje data
S2 Asistovany -> AI navrhuje, clovek rozhoduje
S3 Automatizovany -> AI rozhoduje v definovanych procesech
S4 Autonomni -> AI agenti pracuji nezavisle
```

AI Maturity neni feature list â€” je to **progrese hodnoty v case** = retencni mechanismus.

---

## PLATFORM OBJECT REGISTRY (zavazna konvence, 2026-04-20)

> Kazdy pojmenovany objekt platformy musi mit unikatni kod.
> Implementace: AIQ-00220 | Soubor: DATA/_seeds/platform-registry.json

### Kody per typ objektu

| Prefix | Typ | Priklady |
|--------|-----|---------|
| SCR | Screen / Page | SCR-001 = HUB/index.html |
| SEC | Section (cast stranky) | SEC-001-003 = SCR-001 treti sekce |
| UI | UI component | UI-001 = Music button |
| MOD | Platform module | MOD-001 = _core.js, MOD-002 = _i18n.js |
| MAN | Manifest | MAN-001 = home/finance/manifest.json |
| WF | Workflow template | WF-001 = family-budget-approval |
| DS | Data schema | DS-001 = DOCUMENT schema |
| PA | Platform architecture file | PA-001 = _config.js |
| AG | AI Agent | AG-001 = Process Monitor agent |

### Zaznam struktury

```json
{
  "code": "UI-001",
  "type": "UI",
  "cs_name": "Tlacitko prehravace",
  "en_name": "Music player button",
  "cs_desc": "Spusti/pozastavi hudbu, ulozi stav do localStorage",
  "en_desc": "Plays/pauses music, persists state in localStorage",
  "file_path": "PLATFORM/_modules/_music.js",
  "status": "stable",
  "dependencies": ["MOD-002"]
}
```

### Status hodnoty

| Status | Vyznam |
|--------|--------|
| stable | Hotovo, otestovano, v produkci |
| experimental | Praci, muze se zmenit |
| deprecated | Nahradit, v pristi verzi odstranit |

---

## DESIGN LAB â€” Architektura (zavazna, 2026-04-20)

> Unified design, test a dokumentacni prostredi v STUDIO.
> Implementace: AIQ-00224 | Umisteni: STUDIO/design-lab/index.html

### Layout

```
+--------------------------------------------------------------+
| [Visual] [Inspector] [Docs] [Code] [Responsive] [Workflow]   |  Toggle bar
+----------------+------------------------+--------------------+
|                |                        |                    |
|  Object Tree   |    LIVE PREVIEW        |  Documentation     |
|  (kody, strom) |  (stranka/komponenta)  |  (CS/EN popis)     |
|                |                        |                    |
+----------------+------------------------+--------------------+
```

### 6 modu (toggle)

| Mod | Co ukazuje |
|-----|-----------|
| Visual | Cisty nahled stranky/komponenty |
| Inspector | Shift+D overlay â€” code badges na kazdem elementu |
| Docs | Dokumentace vybraneho objektu (CS/EN) |
| Code | HTML/CSS snippet komponenty |
| Responsive | 15-device preview (viz nize) |
| Workflow | Process/Workflow Designer s AI |

### Bug reporting protokol

Kdyz David najde problem:
1. Zapne Inspector mod (Shift+D)
2. Klikne na chybny element -> vidi kod (napr. UI-001)
3. Tlacitko "Nahlasit problem" -> predvyplneny formulare: kod objektu + verze + zarizeni
4. Napise mi: "UI-001 â€” [popis problemu]"

Toto eliminuje hĂˇdĂˇnĂ­ a nejasnosti pri ladeni.

---

## RESPONSIVE PREVIEW â€” Device Matrix (zavazna, 2026-04-20)

> 15 device variant pro testovani responzivniho designu.
> Implementace: AIQ-00226 | Soucast Design Lab (AIQ-00224)

| Kod | Kategorie | Velikost | Sirka (px) | Typicky device |
|-----|-----------|---------|-----------|---------------|
| UW-L | Ultra-wide | Large | 3440 | 34" ultrawide monitor |
| UW-M | Ultra-wide | Medium | 2560 | 27" QHD |
| UW-S | Ultra-wide | Small | 1920 | 24" FHD |
| WD-L | Wide desktop | Large | 1680 | 22-24" monitor |
| WD-M | Wide desktop | Medium | 1440 | MacBook Pro external |
| WD-S | Wide desktop | Small | 1280 | Starsi wide monitor |
| NB-L | Notebook | Large | 1366 | 16" notebook |
| NB-M | Notebook | Medium | 1280 | 15" notebook |
| NB-S | Notebook | Small | 1024 | 14" notebook |
| TB-L | Tablet | Large | 1024 | iPad Pro 12.9" landscape |
| TB-M | Tablet | Medium | 834 | iPad Pro 11" / Air |
| TB-S | Tablet | Small | 768 | iPad mini / standard |
| PH-L | Phone | Large | 430 | iPhone Pro Max / Samsung Ultra |
| PH-M | Phone | Medium | 390 | iPhone Pro / flagship Android |
| PH-S | Phone | Small | 360 | Compact Android |

### Pouziti v ladeni

Kdyz opravuji CSS: "Testovano na NB-M a PH-M â€” ostatni neovereno, David prosim zkontroluj TB-S."
Kdyz David hlasi problem: "Na PH-S sec-hero preteka" -> vim presne: 360px viewport.

---

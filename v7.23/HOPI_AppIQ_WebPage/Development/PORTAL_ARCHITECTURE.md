# HOPI Intelligent Portal — Architecture Decisions

> Živý dokument. Aktualizován průběžně během architektonické revize.
> Verze: 0.2 — BLOK 8 doplněn
> Datum zahájení: 2026-04-15

---

## STATUS REVIZE

```
✅ BLOK 0 — Kontext a východiska          ODSOUHLASENO
✅ BLOK 1 — State management              ODSOUHLASENO
✅ BLOK 2 — Identita, bezpečnost, 4D model ODSOUHLASENO
✅ BLOK 3 — Modulární systém & Platform   ODSOUHLASENO
⬜ BLOK 4 — Data architektura
⬜ BLOK 5 — i18n & Settings
⬜ BLOK 6 — Moduly
⬜ BLOK 7 — Build & Deploy
✅ BLOK 8 — AppIQ Studio                  ODSOUHLASENO
```

---

## BLOK 0 — Kontext a východiska

### 0.1 Vize aplikace
Portal je **orchestrátor a integrační platforma** — centrum, do kterého se zapojují moduly.
Není závislý na žádném konkrétním systému pro svůj chod.

```
Trajectory:
  Fáze 0  →  Fáze 1           →  Fáze 2
  Portál     Integrace dat        AI agenti na procesech
  (teď)      (SAP, SPO, PBI)      (SharePoint, DWH, ERP)
```

### 0.2 Infrastruktura
- Hosting: Azure Static Web Apps
- Auth: Microsoft Entra ID (Azure AD) + MSAL
- Backend: Azure Functions (serverless)
- Uživatelé: ~50, interní, Microsoft 365 tenant
- Prostředí: Hybrid (Azure + On-premise)

### 0.3 Fázový přístup

| | Fáze 0 (teď) | Fáze 1 (po IT) | Fáze 2 (výhled) |
|---|---|---|---|
| Hosting | soubor / statická stránka | Azure Static Web Apps | beze změny |
| Auth | Admin heslo (SHA-256) | MSAL + Azure AD SSO | Role přes AD skupiny |
| Backend | žádný | Azure Functions | rozšíření |
| Data | BAKED_STATE + localStorage | Azure Table Storage / Cosmos DB | plná DB |
| AI | Claude API (přímé volání) | Azure OpenAI (přes Function) | Agenti |

### 0.4 Klíčové principy
- **Modulární architektura** — každý modul nezávislý, pluginovatelný
- **API-ready design** — Phase 0 kód psán tak, aby přechod na backend byl výměna vrstvy, ne rewrite
- **Žádné vendor lock-in** pro core logiku — Azure je infrastruktura, ne závislos aplikační logiky
- **SharePoint = modul** — jeden z pluginů, ne centrum

### 0.5 Aplikační spouštěče (desktop apps)
- **Primární:** Windows Protocol Handlers (sap://, bns://, ...) — IT nasadí přes GPO
- **Fallback:** User-configurable path v User Settings
- **Webové aplikace** (ID WARE, budoucí): window.open(url) — URL v Admin Config

---

## BLOK 1 — State Management & Persistence

### 1.0 Řízený stav aplikace (AppState)

**ODSOUHLASENO:** Každá změna dat v aplikaci prochází jednou definovanou cestou (AppState), nikoli přímým zápisem do globální proměnné.

```
AppState.get('admin.firms')                          // čtení
AppState.set('admin.firms', data, 'FirmsModule')    // zápis — s identifikací zdroje
AppState.subscribe('admin.firms', () => render())   // reakce na změnu
```

Každá změna je: validována → uložena do správné vrstvy → notifikována relevantním modulům → zaznamenána.

---

### 1.1 Čtyři vrstvy AppState

**ODSOUHLASENO:** AppState má čtyři jasně oddělené prostory s hierarchií oprávnění.

```
AppState.core.*      Aplikační jádro — co aplikace umí
                     Mění se POUZE nasazením nové verze (IT/developer)
                     Read-only pro admin i uživatele
                     Obsahuje: verze, dostupné moduly, dostupné funkce, schema verze

AppState.admin.*     Admin konfigurace — co je povoleno a jak nastaveno
                     Může konfigurovat pouze to, co core poskytuje
                     Persistentní, sdílené mezi všemi uživateli
                     Obsahuje: firmy, divize, URL, názvy, povolené moduly...

AppState.user.*      Uživatelská konfigurace — osobní přizpůsobení
                     Může konfigurovat pouze to, co admin povoluje
                     Persistentní, izolované per uživatel
                     Obsahuje: jazyk, skryté dlaždice, oblíbené, cesty k apps...

AppState.runtime.*   Dočasný stav — co se právě děje
                     Nikdy se neukládá, zmizí po zavření záložky
                     Obsahuje: aktuální stránka, admin session, otevřená okna...
```

**Hierarchie oprávnění:**
```
Jádro definuje:   co MŮŽE existovat
Admin definuje:   co SMÍ být použito
User definuje:    co JÁ chci vidět
Runtime drží:     co SE PRÁVĚ DĚJE
```

**Příklad řízeného rollout nové funkce:**
```
IT nasadí AI Agenti modul →  core.modules['ai-agents'].available = true
Admin zatím nezapne      →  admin.modules['ai-agents'].enabled  = false
Uživatelé modul nevidí   →  dokud admin vědomě nepovolí
```

---

### 1.1 Třívrstvý settings model

```
Layer 3: FACTORY DEFAULTS    hardcoded konstanty (DEFAULT_*)
                              mění se pouze s novou verzí aplikace
                              nikdy nepřepíše vyšší vrstvy

Layer 2: ADMIN CONFIG        nastavení pro celou organizaci
                              přetíží Factory Defaults
                              aktualizace aplikace ho NIKDY nepřepíše

Layer 1: USER CONFIG         osobní přizpůsobení uživatele
                              přetíží Admin Config
                              izolováno per uživatel
```

**Value resolution:**
```javascript
getSetting(key) → User Config ?? Admin Config ?? Factory Defaults
```

### 1.2 Reset operace

| Operace | Co smaže | Výsledek |
|---|---|---|
| User Soft Reset | Layer 1 (User Config) | Uživatel vidí Admin Config |
| Admin Soft Reset (per sekce) | Konkrétní klíč v Layer 2 | Jen ta věc padne na Factory Default |
| Admin Hard Reset | Celý Layer 2 | Vše na Factory Defaults — vyžaduje potvrzení + auto-backup |

### 1.3 Persistence storage (Fáze 0 → 1)

| Vrstva | Fáze 0 | Fáze 1 |
|---|---|---|
| Factory Defaults | kód (konstanty) | kód (konstanty) |
| Admin Config | BAKED_STATE (SK_ADMIN) | databáze — sdílená všem |
| User Config | localStorage (SK_USER) | databáze — per user (AD OID) |

**SK_ klíče (Fáze 0):**
```
SK_ADMIN  = 'gc_admin_v1'    // Admin Config
SK_USER   = 'gc_user_v1'     // User Config
```
*Stávající granulární klíče (SK_TRK, SK_FIRMS, ...) se sloučí pod SK_ADMIN / SK_USER.*

---
### 1.3 Migrační strategie

**ODSOUHLASENO:** Čistý přepis — bez postupné migrace přes aliasy.

Důvod: Aplikace je v prototype fázi, žádní produkční uživatelé, jediný vývojář.
IT prostředí (Azure AD, hosting, protocol handlers) zatím není připraveno —
tento čas využijeme pro implementaci nové architektury.

Postup:
1. Dokončit architektonickou revizi (Bloky 2–7)
2. Implementovat čistý přepis na nové architektuře (~9–12 konverzací)
3. Nasazení až s IT prostředím — jednou, správně

Protocol handlers (sap://, bns://): aplikace bude připravena je volat.
Až IT nasadí Group Policy, začnou fungovat automaticky bez změny kódu.

---

### 1.2 Publish / Subscribe — komunikace mezi moduly

**ODSOUHLASENO:** Moduly nekomunikují přímo mezi sebou. Komunikují výhradně přes AppState.

```
Modul oznámí změnu:  AppState.set('admin.firms', data, 'FirmsModule')
Modul poslouchá:     AppState.subscribe('admin.firms', () => render())
```

Modul, který mění data, neví ani nepotřebuje vědět, kdo na změnu reaguje.
Každý nový modul se sám přihlásí k odběru toho, co potřebuje.
Přidání nového modulu nevyžaduje změnu v existujících modulech.

*Zbývající bloky budou doplněny průběžně.*

---

## BLOK 2 — Identita & bezpečnost

### 2.1 Přístupové režimy

**ODSOUHLASENO:** Tři režimy, konfigurovatelné v Admin Settings > System.

```
CHRÁNĚNO (výchozí)   Přístup jen se sdíleným přístupovým kódem
DEMO                 Přístup pro kohokoliv s odkazem
                     Admin nastaví: read-only / plná funkcionalita / banner / platnost
UZAVŘENO             Zobrazí jen info stránku (údržba, příprava)
```

### 2.2 Autentizace — fázová strategie

**ODSOUHLASENO:**

```
Fáze 0:   Sdílený přístupový kód (jednoduchý, pro prototyp a demo)
           Admin kód oddělený — pro přístup do Admin Settings (SHA-256 hash)
           Tokeny uloženy v localStorage / sessionStorage

Fáze 1:   "Přihlásit se účtem Microsoft" (MSAL + Azure AD SSO)
           Žádné nové heslo — stejný účet jako Outlook, Teams, SharePoint
           Aplikace pozná uživatele a jeho roli přes Azure AD token
```

Přechod Fáze 0 → 1: vymění se pouze mechanismus ověření.
Zbytek aplikace (přístupové režimy, role, AppState) zůstane beze změny.

### 2.3 Role model

**ODSOUHLASENO:** Čtyři role.

```
portal-developer    Aplikační vrstva — diagnostika, experimentální funkce,
                    migrace dat, raw data pohled. Max 1–2 osoby.

portal-admin        Obsah a konfigurace — Admin Settings, moduly, data,
                    uživatelé. Global admin nebo area admin.

portal-editor       Omezená editace — přidělené moduly nebo oblast.
                    Vedoucí oddělení, správci obsahu.

portal-user         Standardní přístup — aplikace + User Settings.
```

Klíčový princip:
```
Developer  →  spravuje APLIKACI
Admin      →  spravuje OBSAH a KONFIGURACI
Editor     →  spravuje SVŮJ OBSAH
User       →  používá aplikaci
```

### 2.4 Multi-area deployment

**ODSOUHLASENO:** Varianta C — jeden portal, viditelnost dle role a oblasti.

```
portal.hopiholding.eu

Jeden deployment, jeden URL, jedna aktualizace.
Každá oblast má vlastní Admin Config prostor:

admin.global.*              Sdílené napříč oblastmi (firmy, divize, branding)
admin.areas.finance.*       Finance konfigurace
admin.areas.operations.*    Operations konfigurace
admin.areas.purchasing.*    Purchasing konfigurace (budoucí)
```

Global admin: aktuálně Finance (controlling). Při rozšíření na další oblasti
projde diskusí — architektura podporuje obě varianty bez zásahu do kódu.

Data Governance (kdo vidí jaká data): viz Blok 4 — Data architektura.
Bude vlastní sekce v Admin Settings.

---

## BLOK 2 (pokračování) — 4D Organizační model

### 2.5 Strategický záměr

**ODSOUHLASENO — KLÍČOVÝ PRINCIP:**
Portal není Finance nástroj. Je to **nasaditelný organizační inteligentní model**.

```
Cíl:      Postavit model jednou → nasazovat na jednotlivé oblasti firmy
Pioneer:  Finance (nejdál datově, první deployment)
Roadmap:  Operations → Purchasing → HR → IT → ...
```

Každé architektonické rozhodnutí musí projít testem:
"Funguje to i pro Operations, Purchasing, HR — nebo je to Finance-specific?"

### 2.6 4D Model — kompletní definice

**ODSOUHLASENO:**

```
STATICKÁ VRSTVA — 3D souřadnicový prostor:

  X: Funkční oblasti       Finance | Nákup | IT | Provoz | HR | ...
  Y: Organizační struktura Holding → Divize → Subdivize → Firma
  Z: AI & Automatizace     General Agents | Specialized Agents

  Každý uživatel, každé datové, každý agent = bod v tomto prostoru
  Přístupová pravidla = průnik souřadnic uživatele a dat/agenta

DYNAMICKÁ VRSTVA — T (Process & Flow):

  Process Registry      Katalog definovaných procesů a flows
  Process Engine        Vykonání, stav, větvení, paralelismus
  Approval Service      Průřezová schvalovací služba (viz 2.7)
  Human-in-the-loop     Pauzy čekající na lidské rozhodnutí
  Agent orchestrace     Volání AI agentů s plným 3D kontextem
  Audit & History       Plná sledovatelnost — kdo, co, kdy, kde
```

**3D kontextová dědičnost Admin Config:**
```
admin.global.*
admin.areas.[function].*
admin.areas.[function].depts.[department].*
```

### 2.7 Approval Service

**ODSOUHLASENO:** Schvalování je průřezová sdílená služba použitelná v jakémkoliv procesu.

**Dva typy:**
```
Procesní schvalování:    Krok v business procesu (report, uzávěrka, budget)
Access schvalování:      Self-service žádost o přístup/oprávnění
```

**Klíčový princip — automatické routování dle 3D kontextu:**
Žádost (X=Finance, Y=Divize-1) → automaticky nalezne schvalovatele
(Finance Admin pro Divizi-1). Žádné ruční určování.

**Schvalovací řetězce:** Konfigurovatelné šablony (single / sequential / parallel / any-of)

**Eskalace:** Nepřijaté schválení → připomínka → eskalace → delegace → Global Admin

**Fáze 0:** Portal UI inbox + notifikace
**Fáze 1:** Email + Teams notifikace, automatické přidělení Azure AD skupin
**Fáze 2:** Power Automate, AI asistent doporučující rozhodnutí

---

## BLOK 3 — Modulární systém & Platform Services

### 3.1 Platforma, ne aplikace

**ODSOUHLASENO — KLÍČOVÝ PRINCIP:**
```
NE:  Jedna aplikace s mnoha funkcemi
ANO: Platforma hostující portfolio aplikací
     Každá aplikace je samostatná, AI-augmented jednotka
     Oblasti si skládají vlastní portfolio ze společného katalogu
```

### 3.2 Samo-popisný modul — Open Standard

**ODSOUHLASENO:** Každý modul (aplikace) se sám plně popisuje při registraci.
Kdokoliv může vytvořit aplikaci pro platformu — interní tým, AI, externí developer.

```javascript
{
  id:        'reporting',
  name:      { en: 'Reporting', cz: 'Reporting' },
  icon:      '📊',
  version:   '1.0.0',
  author:    'HOPI Finance Team',

  scope: {
    functions: ['finance', 'operations'],  // X — pro které funkční oblasti
    orgLevels: ['area', 'dept'],           // Y — na jakých org úrovních
  },

  requires: {
    role:    'portal-user',                // minimální role
    data:    ['admin.reports'],            // potřebná data
  },

  listens:  ['admin.reports'],             // sledované AppState klíče
  provides: ['page', 'userSettings', 'adminSettings', 'catalogEntry'],

  ai: {
    agents:   ['reporting-agent'],         // využívané AI agenty
    flows:    ['report-approval']          // process flows
  },

  phases:   [0, 1, 2],                    // od které fáze dostupné
  docs:     'docs/reporting.md',          // odkaz na dokumentaci
}
```

Platforma garantuje každé aplikaci: Auth kontext, AppState přístup,
Process Engine, AI Orchestration, Approval Service, Translation Store.
Vývojář se soustředí jen na logiku své aplikace.

### 3.3 Typy modulů/aplikací

**ODSOUHLASENO — 6 typů (Workflow ≠ Proces):**

```
Typ A: Stránka        Calendar, FX Rates
                      Jednoduchá UI jednotka, informační

Typ B: Aplikace       PBI Designer, Budget Tracker
                      Komplexní logika, vlastní datový model

Typ C: Proces         Monthly Close, Annual Budget, Vendor Onboarding
                      Kompletní business proces — lidé + systém + AI
                      Vícekolový, dlouhý životní cyklus, audit trail

Typ D: Workflow       Auto-Report Generation, Data Sync, Notifikační flow
                      Automatizovaná sekvence kroků uvnitř procesu/aplikace
                      Převážně systémový, krátký, ohraničený

Typ E: AI Interface   Contract Analyzer, Anomaly Detector
                      Primárně AI + human review

Typ F: Connector      SAP, BNS, SharePoint, Power BI
                      Integrace s externím systémem
```

Klíčový rozdíl:
- Proces (C) = celý business proces, dny/týdny, lidé + systém
- Workflow (D) = automatizovaná technická sekvence, minuty/hodiny

Vazby: Proces orchestruje Workflow a volá AI Interface.
Workflow může volat AI Interface. Aplikace využívá Connector.

### 3.4 App Catalog — interní obchod s aplikacemi

**ODSOUHLASENO:**

Publishing workflow:
```
Developer vytvoří app v AI App Developer
  → Otestuje v sandboxu
  → Odešle do katalogu s dokumentací
  → Approval Service (central team schválí)
  → App publikována v katalogu
  → Area Admin nainstaluje → nakonfiguruje pro svůj kontext
  → Uživatelé mohou používat
```

### 3.5 AI & Automate — nová sekce na Home Portal

**ODSOUHLASENO:** Nová sekce s těmito dlaždicemi:
```
AI & Automate
  ├── 🤖 AI App Developer    Tvorba aplikací s AI asistencí
  ├── 🧠 AI Agents           Správa a interakce s AI agenty
  ├── ⚡ Process Builder      Tvorba procesních flows
  └── 📋 App Catalog         Procházení a instalace aplikací
```

### 3.6 AI App Developer

**ODSOUHLASENO:**
```
Fáze 0:  Průvodce s AI (Claude) — structured dialog → Module Definition
Fáze 1:  Integrované vývojové prostředí s AI, live preview, sandbox
Fáze 2:  Low-code/no-code builder, drag & drop, sdílení šablon
```

### 3.7 Documentation Service

**ODSOUHLASENO:**

Typy dokumentace:
```
User Help             Kontextová nápověda v každé aplikaci (? tlačítko)
Procesní dokumentace  SOP pro každý proces a flow
Release Notes         Co je nového s každou verzí
Developer Docs        Standard modulu, API reference
```

AI lifecycle:
```
Vytvoření app → AI auto-generuje dokumentaci z Module Definition
→ Člověk doplní → AI přeloží do všech jazyků
→ Approval workflow → Publikace verzovaná s aplikací
→ Update app → AI navrhne update dokumentace
```

Napojení: Module Registry, AI Developer, Translation Store, Approval Service, App Catalog.

---

#### 3.7.1 Global Help System — architektura

**Principy:**  
Help System je navržen symetricky s Translation Store (viz 5.1) — stejná systematičnost, stejné jazyky, stejné fáze nasazení. Nápověda musí být dostupná ve všech 9 jazycích aplikace (CS, EN, SK, HU, PL, DE, RO, BG, HR).

**Vstupní body:**
```
Help FAB (?)     Plovoucí tlačítko, bottom-right, z-index 9998, viditelné vždy
F1 klávesa       Globální zkratka pro otevření nápovědy kdekoliv v aplikaci
Release Manager  Kontextová nápověda přímo v RM panelu (collapsible sekce)
```

**HELP_CONTENT — datová struktura (JavaScript object, Phase 0):**
```js
HELP_CONTENT = {
  cs: {
    // nav labels
    nav_overview: 'Přehled aplikace',
    nav_navigation: 'Navigace',
    // sekce: {title, intro, steps, tips, warnings}
    overview_title: '...',
    overview_intro: '...',
    overview_f1:    '...',
    // ... (každý modul má vlastní namespace v klíčích)
  },
  en: { /* kompletní překlad */ },
  sk: { /* Phase 0: fallback na EN; Phase 1: vlastní překlad */ },
  hu: { /* Phase 0: fallback na EN */ },
  pl: { /* Phase 0: fallback na EN */ },
  de: { /* Phase 0: fallback na EN */ },
  ro: { /* Phase 0: fallback na EN */ },
  bg: { /* Phase 0: fallback na EN */ },
  hr: { /* Phase 0: fallback na EN */ }
}
```

**Moduly v nápovědě (Phase 0):**
```
overview     Přehled aplikace a hlavní funkce
navigation   Navigace, klávesové zkratky
language     Přepínač jazyka, jak funguje i18n
sap_overview SAP přehled — oblasti a transakce
sap_tiles    SAP dlaždice — klikání, hover, barvy modulů
sap_filters  Filtry a vyhledávání
release      Release Manager — workflow pro vývojáře
about        O aplikaci — verze, kontakt, jazyková podpora
```

**Help Modal — komponenty:**
```
#help-fab         Floating action button (? ikona), pravý dolní roh
#help-overlay     Overlay s blur, klik mimo = zavřít
#help-modal       Dialog: header + lang-bar + body
  #help-header    Nadpis + tlačítko Zavřít
  #help-lang-bar  9 tlačítek (CS/EN/SK/HU/PL/DE/RO/BG/HR)
  #help-nav       Levý panel — seznam modulů s kategoriemi
  #help-content   Pravá část — zobrazení aktivní sekce
    .hc-section   Jedna sekce (display:none / .active → display:block)
    .hc-steps     Číslovaný seznam kroků
    .hc-tip       Informační tip (modrý levý border)
    .hc-warn      Varování (žlutý levý border)
```

**Jazyková logika:**
```
helpOpen()       Synchronizuje jazyk nápovědy s aktuálním jazykem aplikace
helpSetLang(l)   Přepne jazyk nápovědy + překreslí aktivní sekci
helpNav(id)      Přepne modul + překreslí obsah v aktuálním jazyce
_helpApplyLang() Aktualizuje nav labels z HELP_CONTENT[lang]
_helpApplyModule() Aktualizuje obsah sekce z HELP_CONTENT[lang]
```

**Fázový plán:**
```
Phase 0  Inline JavaScript — HELP_CONTENT object přímo v index.html
         CS + EN kompletní, ostatní jazyky fallback na EN
         Aktivace: F1, ? FAB, Alt+Shift+R → collapsible RM nápověda

Phase 1  HELP_CONTENT externalizován do /api/help/{lang}/{module}
         SK/HU/PL/DE/RO/BG/HR doplněny nativními překlady
         Možnost aktualizace nápovědy bez redeploymentu aplikace
         Napojení na Translation Store a Approval workflow

Phase 2  AI generuje návrh nápovědy z Module Definition
         Kontextová nápověda vázaná na aktivní element (tooltip/popover)
         Vyhledávání v celé nápovědě
```

### 3.8 Communication Service

**ODSOUHLASENO:**

Typy: Platform Announcement, Area Announcement, Process Notification,
Personal Notification, Alert/Urgent, Release Note.

Kanály (fázově):
```
Fáze 0:  Portal Notification Center, Popup/Banner
Fáze 1:  Email (Azure Communication Services), Teams (Graph API),
          automatické notifikace z Process Engine + Approval Service
Fáze 2:  SMS, Push notifikace, AI personalizovaný digest
```

Cílení pomocí 3D modelu: příjemci automaticky identifikováni
dle X (funkce) + Y (org jednotka) + role.

AI workflow: Admin napíše v jednom jazyce → AI přeloží + navrhne kanál
+ vhodný čas → schválení → delivery → read tracking.

Napojení: App Catalog, Process Engine, Approval Service, 3D Context, Translation Store.

### 3.9 Platform Services — kompletní seznam

**ODSOUHLASENO:**
```
├── Auth & Identity
├── 3D Context Engine        (X×Y×Z kontextové vyhodnocení)
├── AppState                 (4 vrstvy: core/admin/user/runtime)
├── Process Engine & Flows   (T dimenze — dynamická vrstva)
├── Approval Service         (průřezová schvalovací služba)
├── AI Orchestration         (agent management, context injection)
├── Data Governance          (přístupová pravidla v 3D modelu)
├── Translation Store        (multilinguální obsah + AI překlad)
├── Documentation Service    (řízená dokumentace + AI generace)
├── Communication Service    (multi-channel, cílené, AI-assisted)
├── AI App Developer         (tvorba aplikací s AI)
└── App Catalog & Publishing (katalog, review, instalace portfolia)
```

---

## BLOK 4 — Data architektura
*— probíhá revize —*

---

## BLOK 5 — i18n & Settings

### 5.1 Translation Store — struktura
```json
{
  "ui":      { "klíč": { "en": "...", "cz": "...", ... } },
  "holidays":{ "CZ":  { "název": { "en": "...", "pl": "...", ... } } },
  "content": { "tile.calendar.name": { "en": "...", "cz": "..." } }
}
```

### 5.2 Přidání jazyka (workflow)
1. Admin Settings > Languages > [ + Přidat jazyk ]
2. [ ✨ Přeložit chybějící — AI ] → Claude API (přímé volání v Fázi 0)
3. Náhled → schválení → uložení
4. Jazyk okamžitě dostupný v User Settings

### 5.3 Settings architektura

```
USER SETTINGS                      ADMIN SETTINGS 🔒
├── General                        ├── General (branding, heslo, API klíče)
├── [název modulu — dynamický]     ├── Initial Screen
├── ...                            ├── [název modulu — dynamický]
                                   ├── Languages (Translation Store + AI)
                                   └── System (záloha, export, verze)
```

**Dynamické názvy sekcí:** Settings navigace čte z Module Registry — stejný zdroj jako sidebar navigace.

---

## BLOK 6 — Moduly
*— probíhá revize —*

### Průřezový vzor: Aplikační spouštěče
viz BLOK 0.5

---

## BLOK 7 — Build & Deploy

### 7.1 Release Management — aktuální stav (Phase 0)

**Kontejner: složkový model (bez CI/CD, bez build pipeline)**

Cíl: oddělení aktivního vývoje od stabilní prezentační verze s automatizovanou archivací starých verzí.

**Folder struktura:**
```
CO_PROJECT - Claude Code - link folder/
├── Development/          ← aktivní vývoj; vývojář pracuje zde
│   ├── index.html        ← aktuální verze aplikace
│   └── VERSION.txt       ← verze + changelog (generováno Release Managerem)
│
├── Release/              ← stabilní verze pro prezentace
│   ├── index.html        ← kopie z Development/ po release
│   └── VERSION.txt
│
├── Archive/              ← archiv všech předchozích verzí
│   └── v1.0-Phase0_20260416/
│       ├── index.html
│       └── VERSION.txt
│
├── HOPI_AppIQ_WebPage/   ← promo landing page; odkazuje na Release/
│   └── index.html
│
├── Docs/                 ← architektura, prezentace, brand materiály
└── MAKE_RELEASE.bat      ← release automation script
```

**VERSION.txt formát:**
```
v1.1-Phase1 | 2026-04-20 | Přidán Help System, Release Manager, brand loga
```

**Release workflow (5 kroků):**
```
1. Vývojář otevře Release Manager (Alt + Shift + R)
2. Zadá číslo verze (např. v1.1-Phase1) a changelog
3. Release Manager stáhne: index.html (s aktualizovanou meta verzí) + VERSION.txt
4. Vývojář přesune oba soubory do Development/
5. Spustí MAKE_RELEASE.bat:
   a) Zarchivuje Release/ → Archive/{verze}_{datum}/
   b) Zkopíruje Development/ → Release/
   c) Zapíše VERSION.txt do Release/
   → Release/ obsahuje stabilní, prezentovatelnou verzi
```

**MAKE_RELEASE.bat — klíčové vlastnosti:**
```batch
:: Vstup: číslo verze + changelog text (interaktivní prompt)
:: Datum generuje PowerShell (yyyyMMdd pro složku, yyyy-MM-dd pro VERSION.txt)
:: Archive-before-copy pattern — nikdy nepřepisuje bez zálohy
:: xcopy /E /I /Y — kopíruje celý strom včetně podadresářů
:: Výstup: Release/ = čistá kopie Development/
```

**In-app Release Manager panel:**
```
Aktivace:    Alt + Shift + R (kdekoliv v aplikaci)
HTML:        #rm-overlay > #rm-box
CSS:         Dark theme (#0d1929), zelený akcent (#007d32)
JS:          rmOpen(), rmClose(), rmDoRelease(), rmNapToggle()
Generuje:    Blob download — index.html (meta verze aktualizována) + VERSION.txt
Nápověda:    Collapsible sekce (.rm-nap) se 5 číslovanými kroky (CZ jazyk)
             Kliknutím na "Nápověda — jak provést release" se rozbalí/sbalí
```

**Fázový plán pro Build & Deploy:**
```
Phase 0  Manuální release přes Release Manager + MAKE_RELEASE.bat
         Folder struktura v OneDrive (offline-first)
         Verze řízeny číslem v meta tagu + VERSION.txt

Phase 1  Hosting na Azure Static Web Apps nebo SharePoint
         MAKE_RELEASE.bat nahrazen GitHub Actions workflow nebo Azure DevOps pipeline
         Automatický deploy do Release/ po merge do main větve
         Archivace verzí v GitHub Releases nebo Azure Blob Storage

Phase 2  Multi-environment (dev / staging / production)
         Feature flagy pro postupné nasazení modulů
         Automatické testy před releasem (smoke tests)
```

---

## BLOK 8 — AppIQ Studio

### 8.1 Vize a role

**ODSOUHLASENO — KLÍČOVÝ PRINCIP:**
AppIQ Studio není součástí Runtime Aplikace. Je to **vývojové a správní prostředí pro celou platformu**.

```
AppIQ Studio  =  workshop, kde platforma vzniká, testuje se, nasazuje a dokumentuje
Runtime App   =  produkt, který uživatelé dostanou
```

Analogie: Studio je VS Code / IntelliJ. Runtime je výsledná aplikace. Uživatel vidí pouze Runtime. Developer a David vidí obojí.

Klíčový záměr: AppIQ Studio umožňuje budovat, testovat a nasazovat AppIQ bez externích nástrojů. **Platforma se vyvíjí sama v sobě.**

---

### 8.2 Dva streamy

**ODSOUHLASENO:**

| Stream | Složka | Účel | Audience |
|--------|--------|------|----------|
| APP | `HOPI_AppIQ/` | Runtime aplikace (Finance portal, SPA) | Uživatelé HOPI |
| WEB | `HOPI_AppIQ_WebPage/` | AppIQ Studio (Hub, Dev, Test, Admin, Promo) | David + Claude + IT |

Oba streamy jsou verzovány nezávisle. APP stream má vlastní Release Manager + MAKE_RELEASE.bat. WEB stream totéž.

---

### 8.3 Šest Functional Centers (FC)

**ODSOUHLASENO:**

```
FC-1  Hub            Rozcestník Studia — dashboard, live statusy, navigace na ostatní FC
FC-2  Runtime App    Finance portal SPA — produkční prostředí aplikace (APP stream)
FC-3  Dev Center     Architektura, decision log, Claude kontext panel
FC-4  Test Center    QA checklisty, test plány per verzi, sign-off workflow
FC-5  Admin Center   OIL panel, Release Manager, config engine
FC-6  Promo + Docs   Promo web, prezentace, dokumentace, App Catalog entry
```

**FC-1 Hub** — nový kořenový index.html (`AIQ-00007`):
- Live dashboard: OIL badge (počet OPEN), poslední verze APP + WEB streamu
- Přímé navigační karty na FC-2 až FC-6
- Presentation mode toggle: skryje dev nástroje pro demo a CEO pitch

**FC-2 Runtime App** — `HOPI_AppIQ/Development/index.html`:
- Finance portal Phase 0 — první deployment platformy
- Přistupuje se přes FC-1 Hub nebo přímou URL
- Vlastní Release Manager (Alt+Shift+R) + MAKE_RELEASE.bat

**FC-3 Dev Center** — `dev/index.html` (`AIQ-00008`):
- Viewer PORTAL_ARCHITECTURE.md s Mermaid render
- Decision log — chronologický záznam klíčových architektonických rozhodnutí
- Claude kontext panel: aktuální OIL, open tasks, posledních 5 sessions

**FC-4 Test Center** — `test/index.html` (`AIQ-00009`):
- Test plány per verzi (tabulka scénářů)
- Interaktivní QA checklisty (checkbox + podpis testerů)
- Known issues log + sign-off workflow (David aprobuje REVIEW → CLOSED)

**FC-5 Admin Center** — `admin/index.html` (`AIQ-00010`):
- OIL panel (přesun z promo index.html — `AIQ-00010`)
- Vizuální Release Manager (náhrada za Alt+Shift+R klávesovou zkratku)
- Config engine: přepínání verzí, feature flags, logy operací

**FC-6 Promo + Docs** — `promo/index.html` + `PORTAL_PRESENTATION.html` (`AIQ-00011`, `AIQ-00012`):
- Promo landing page (přesun z kořene Development/)
- Prezentace platformy (PORTAL_PRESENTATION.html)
- Developer Docs + App Catalog entry pro budoucí klientská nasazení

---

### 8.4 Cílová struktura složek — Variant A

**ODSOUHLASENO:**

```
HOPI_AppIQ_WebPage/
├── Development/
│   ├── index.html                   ← FC-1 Hub (nový) — AIQ-00007
│   ├── promo/
│   │   └── index.html               ← FC-6 Promo (přesun) — AIQ-00011
│   ├── dev/
│   │   └── index.html               ← FC-3 Dev Center — AIQ-00008
│   ├── test/
│   │   └── index.html               ← FC-4 Test Center — AIQ-00009
│   ├── admin/
│   │   └── index.html               ← FC-5 Admin Center — AIQ-00010
│   └── PORTAL_PRESENTATION.html     ← FC-6 Prezentace (beze změny)
└── Release/
    └── (zrcadlo Development/ po release)

HOPI_AppIQ/                          ← APP stream — nezávislý
├── Development/
│   └── index.html                   ← FC-2 Runtime App
└── Release/
    └── index.html
```

**Aktuální stav (Phase 0 MVP):**
```
HOPI_AppIQ_WebPage/Development/
├── index.html               ← promo web + OIL panel (dočasně vše v jednom)
└── PORTAL_PRESENTATION.html

HOPI_AppIQ/Development/
└── index.html               ← Runtime App (Finance portal)
```

Přechod na Variant A je postupný — každý FC vzniká jako samostatný OIL úkol. Pořadí: FC-5 Admin (OIL přesun) → FC-6 Promo přesun → FC-1 Hub → FC-3 Dev → FC-4 Test.

---

### 8.5 Fáze buildoutu Studia

```
MVP (nyní)
  index.html = promo + OIL panel v jednom souboru
  Prezentace jako samostatný soubor
  GitHub Pages hosting (_deploy/) pro sdílení
  Runtime App lokálně nebo přes GitHub Pages

Fáze 1 — Studio základ
  FC-5 Admin Center — OIL panel přesun (AIQ-00010)
  FC-6 Promo přesun do promo/ (AIQ-00011)
  FC-1 Hub vznik — rozcestník + live OIL status (AIQ-00007)

Fáze 2 — Dev & Test
  FC-3 Dev Center — architektura + Claude kontext (AIQ-00008)
  FC-4 Test Center — QA workflow + sign-off (AIQ-00009)

Fáze 3 — Studio integrace
  Cross-linking mezi FC
  Live dashboardy (stav build, test coverage, OIL statistiky)
  Studio jako meta-nástroj pro budoucí klientská nasazení AppIQ
```

---

### 8.6 Module Registry — doména Studio

```
Studio/
├── Hub              FC-1 — rozcestník a live dashboard
├── DevCenter        FC-3 — vývojářské nástroje a architektura
├── TestCenter       FC-4 — QA, test plány, sign-off
├── AdminCenter      FC-5 — OIL panel, Release Manager, config
├── Promo            FC-6 — landing page
├── Docs             FC-6 — dokumentace platformy
└── Presentation     FC-6 — PORTAL_PRESENTATION.html
```

---

### 8.7 GitHub Pages — aktuální web hosting (Phase 0)

Repo: `https://github.com/H-GR-FICO/appiq`
Live URL: `https://h-gr-fico.github.io/appiq/`

Deployment struktura (`_deploy/`):
```
_deploy/
├── index.html                                                    ← Promo web
├── PORTAL_PRESENTATION.html                                      ← Prezentace
└── app/
    ├── index.html                                                ← Runtime App
    └── hopi-holding-horizontal-logo-on-dark-background-rgb.png  ← logo
```

Cesty upraveny pro GitHub Pages root:
```javascript
var _portalUrl = 'app/index.html';           // dříve: ../../HOPI_AppIQ/Release/index.html
const prezPath = 'PORTAL_PRESENTATION.html'; // dříve: ../Release/PORTAL_PRESENTATION.html
```

Fázový plán:
```
Phase 0  GitHub Pages — rychlé, zdarma, HTTPS (aktuální stav, AIQ-00026 CLOSED)
Phase 1  Azure Static Web Apps — Microsoft ekosystém, Azure AD integrace (viz BLOK 0.2)
```

---

## IMPLEMENTAČNÍ PLÁN
*— bude vygenerován po dokončení celé architektonické revize —*

---

## OTÁZKY PRO IT
1. Kde má aplikace běžet? (Azure Static Web Apps / App Service / on-premise IIS?)
2. Máme Azure subscription s právy vytvářet nové resources?
3. Síťová politika — intranet only, nebo přístupné z internetu?
4. Existuje firemní standard pro hosting interních webových aplikací?
5. Kdo má právo registrovat nové aplikace v Azure AD?
6. Jaká je politika pro Microsoft Graph API oprávnění?
7. Existuje MFA požadavek pro interní aplikace?
8. Jaká je politika pro volání externích API z prohlížeče (CORS)?
9. Kdo spravuje Azure AD skupiny a jak rychle lze vytvořit nové?
10. Které Azure služby máme aktivní/licencované? (Functions, Static Web Apps, Cosmos DB, Key Vault, Azure OpenAI)
11. Máme Azure DevOps nebo GitHub Enterprise?
12. Existuje budget nebo schvalovací proces pro nové Azure resources?
13. Je SAP exponovaný přes OData nebo jiné API? Existuje API gateway?
14. Jak je BNS dostupný z externích aplikací?
15. Máme Power BI Premium nebo Embedded licenci?
16. Existuje centrální API gateway pro interní systémy?
17. Kdo bude zodpovědný za monitoring a provoz?
18. Jaký je proces pro nasazení (testovací prostředí, schvalování)?
19. Jsou požadavky na backup a disaster recovery?
20. Jaká je politika pro uchovávání dat (GDPR, data retention)?
21. **[NOVÉ]** Lze nasadit Windows Protocol Handlers (sap://, bns://, ...) přes Group Policy na všechny firemní PC?

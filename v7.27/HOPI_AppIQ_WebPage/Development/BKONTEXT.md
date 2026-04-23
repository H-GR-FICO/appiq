# BKONTEXT.md — Business Kontext a Rozhodnutí

> **CITLIVÁ DATA — nesdílet mimo David Gogela + Claude.**
> Vytvořeno: 2026-04-19 | Aktualizovat průběžně.
> Formát: `## BIZ-NNNNN — Název` → kontext, rozhodnutí, klíčové poznámky.

---

## BIZ-00127 — AppIQ Cockpit: Univerzální produkt (2026-04-22)

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** David Gogela | **Linked:** AIQ-00336, BIZ-00124

### Strategické rozhodnutí (David Gogela, 2026-04-22)

Management Cockpit = **samostatný prodejný produkt** pro B2B i B2C trh.
Každý potřebuje Cockpit aby věděl kam jít a co dělat — Individual, rodina, oddělení, divize, holding.

### Princip — nula extra kódu

`SECTIONS[]` array = konfigurační manifest. Různé deployment = různý výběr sekcí. Platforma je jedna, produkt je jeden, obsah je konfigurací.

**Příklady konfigurací:**
- Individual HOME: Finance · Zdraví · Vzdělávání · Plány
- Rodina HOME: Finance · Zdraví · Vzdělávání · Domácnost · Děti
- Oddělení B2B: OIL Board · Kapacity · Tým · KPIs · Budget
- Divize B2B: + BOIL Board · Rozhodnutí · Milníky
- Holding B2B: Plný cockpit · Business Architecture · Motivace

### Schválený ceník (2026-04-22)

**B2B Cockpit tiers:**
| Tier | ID | Cena/měsíc | Uživatelé |
|------|-----|-----------|---------|
| DEPARTMENT | cockpit-department | €49 + €3/user | do 20 uživatelů |
| DIVISION | cockpit-division | €99 + €2.50/user | do 100 uživatelů |
| HOLDING | cockpit-holding | €199 + €2/user | neomezeno |

**HOME Cockpit:**
| Tier | ID | Cena/měsíc |
|------|-----|-----------|
| Individual | cockpit-home-individual | €4.99 |
| Family | cockpit-home-family | €9.99 |

**Transfer pricing (HOPI Group interní):** €1.50/user/měsíc

**Premium add-ons:**
- HOPIQ Cockpit Agent: +€1/user/měsíc
- GitHub API Write (live data editing): +€0.50/user/měsíc
- Custom brand / white-label: +€99 setup + €20/měsíc

### Dopad na business-model.json

Cockpit tier = nový segment v `segments[]`. Ceník v ceníku. Nová billing unit `cockpit_seat`.

### Pořadí v sekci 02 Business Sales Model

Business Sales Model (sekce 02 cockpitu) zobrazuje segmenty ve skupinách:
1. HOME B2C (Individual, Couple, Family)
2. B2B Platform (Startup, Business, Enterprise)
3. Cockpit B2B (Department, Division, Holding)
4. Cockpit HOME (Individual, Family)
5. HOPI Internal (Transfer pricing)

### Strategická poznámka

David potvrdil: cíl je jak firmy, tak domácnosti a jednotlivci. Cockpit je nejsilnější cross-segment produkt protože potřeba orientace + prioritizace = universal human need.

---

## BIZ-00126 — Motivation Chamber: Valuační matice (2026-04-22)

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** David Gogela | **Linked:** AIQ-00331

### Valuační framework — závazná čísla (2026-04-22)

**Revenue scénáře (kotva = Middle, stanovena Davidem):**

| Scénář | Y1 (2027) | Y2 (2028) | Y3 (2029) | Poznámka |
|--------|-----------|-----------|-----------|---------|
| Conservative | €150K ARR | €700K ARR | €1.5M ARR | Realistický floor |
| **Middle** | **€500K ARR** | **€2M ARR** | **€5M ARR** | **Kotva — David potvrdil** |
| Ambitious | €1.2M ARR | €5M ARR | €15M ARR | 3× Middle |
| Dream | TBD | TBD | TBD | Po diskusi s majiteli HOPI |

**Exit cesty a valuace při Y3 ARR:**

| Exit | Múltiple | Conservative | Middle | Ambitious |
|------|---------|-------------|--------|-----------|
| Akvizice (SAP/MS/Anthropic) | 12× ARR | €18M | €60M | €180M |
| PE Buyout | 6× ARR | €9M | €30M | €90M |
| IPO | 25× ARR | €37M | €125M | €375M |
| HOPI Group ∞ | 10× ARR | +€15M | +€50M | +€150M |

**HOPI Group cesta = baseline.** Není exit — AppIQ vždy zvyšuje hodnotu skupiny bez ohledu na ostatní scénáře. HOPI Group valuace = €500M. Middle scénář přidá +€50M (10% uplift).

**Dream scénář:** Čísla po diskusi s majiteli HOPI Group. Pracovní placeholder: Y3 €30M+ ARR.

### UI v Motivation Chamber
Přepínač scénáře nahoře → automatický přepočet všech 4 exit hodnot. Čísla živá z `business-model.json`. HOPI Group cesta = vždy zobrazena jako baseline (ne přepínatelná).

---

## BIZ-00125 — Management Cockpit Full Build (2026-04-22)

**Datum:** 2026-04-22 | **Status:** IN PROGRESS | **Assignee:** Claude | **Linked:** AIQ-00309

### Strategické rozhodnutí

Kompletně oživit Management Cockpit v jedné session (2026-04-22). Cíl: demo-ready platforma pro Anthropic pitch, investor prezentaci, HOPI Group leadership showcase.

### Narativní tok cockpitu (schváleno David Gogela 2026-04-22)

```
01  Motivation Chamber      ← KAM MÍŘÍME (aspirace, valuace)
02  Business Sales Model    ← JAK TAM PŘIJDEME (model, čísla)
03  Business Architecture   ← PROČ TO FUNGUJE (strategie, docs)
04  Executive Overview      ← KDE JSME TEĎ (realita vs. model)
05  Launch Plan · Countdown ← KDY SE TO STANE
── operativní sekce ────────────────────────────────────
06  Executive KPI Strip
07  Financial Cockpit
08  Budget Track
09  Milestone Timeline
10  Task Control Center
11  OIL Task Board
12  BOIL Task Board
13  Capacity & Responsibility
14  Project Team
15  Sources
16  Methodology
17  Decision Log
18  Documentation & Links
```

### 20 sekcí — stav a datový zdroj (aktualizováno 2026-04-22)

| # | Sekce | Narativ | Datový zdroj | Stav |
|---|-------|---------|-------------|------|
| 01 | Motivation Chamber | KAM MÍŘÍME | business-model.json | ✅ Hotovo |
| 02 | Business Sales Model | JAK TAM PŘIJDEME | business-model.json | ✅ Hotovo (AIQ-00336) |
| 03 | Business Architecture | PROČ TO FUNGUJE | statický obsah | ✅ Hotovo (AIQ-00337) |
| 04 | Executive Overview | KDE JSME TEĎ | OIL.json | ✅ Hotovo |
| 05 | Launch Plan · Countdown | KDY SE TO STANE | datum (výpočet) | ✅ Hotovo |
| 06 | Executive KPI Strip | — | OIL.json + GitHub API | ✅ Hotovo |
| 07 | Financial Cockpit | — | financial-data.json | ✅ Hotovo (statická data) |
| 08 | Budget Track | — | budget-data.json | ✅ Hotovo (statická data) |
| 09 | Milestone Timeline | — | milestones.json | ✅ Hotovo (statická data) |
| 10 | Task Control Center | — | OIL.json + BOIL.json | ✅ Hotovo |
| 11 | OIL Task Board | — | OIL.json | ✅ Hotovo |
| 12 | BOIL Task Board | — | BOIL.json | ✅ Hotovo |
| 13 | Capacity & Responsibility | — | OIL.json | ✅ Hotovo |
| 14 | Project Team | — | statický JSON | ✅ Hotovo |
| 15 | Sources | — | sources-data.json | ✅ Hotovo (statická data) |
| 16 | Methodology | — | statický obsah | ✅ Hotovo |
| 17 | Decision Log | — | decisions.json | ✅ Hotovo |
| 18 | Documentation & Links | — | hardcoded | ✅ Hotovo |
| 19 | Organization & Coordination | — | DISCUSSION_LOG.md (GitHub) | 🔨 Build (AIQ-00339) |
| 20 | Meeting Room | — | localStorage (sticky notes) | 🔨 Build (AIQ-00340) |

### Architektonické rozhodnutí — single source of truth

`business-model.json` = základ pro sekce 01, 05, 06, 17. Ostatní sekce čtou z OIL.json / BOIL.json / vlastních JSON. Žádné číslo není hardcoded v HTML.

---

## BIZ-00124 — Business Sales Model: Architektura a obchodní rozhodnutí (2026-04-22)

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** David Gogela | **Linked:** AIQ-00336

### Kontext — proč tato architektura

David Gogela rozhodl (2026-04-22): obchodní model stavět od fyzikálních veličin (počet uživatelů × cena), nikoliv od abstraktních ARR cílů. Toto umožňuje okamžitou simulaci dopadu změny ceny nebo počtu zákazníků na revenue.

### Segmenty a ceník (schváleno 2026-04-22)

**HOME B2C:**
| Segment | ID | Cena/měsíc | Unit |
|---------|-----|-----------|------|
| Individual | b2c-individual | €9.99 | user |
| Couple | b2c-couple | €14.99 | user |
| Family | b2c-family | €19.99 | user |

**Enterprise B2B:**
| Segment | ID | Cena/měsíc | Unit |
|---------|-----|-----------|------|
| Startup | b2b-startup | €49 | company |
| Business | b2b-business | €149 | company |
| Enterprise | b2b-enterprise | €499 | company |

**HOPI Internal (Transfer Pricing):**
| Divize | ID | Transfer price | Výpočet |
|--------|-----|--------------|---------|
| Supply Chain | hopi-supply-chain | €3.00/user | full costs + 5% |
| Foods | hopi-foods | €3.00/user | full costs + 5% |
| Agriculture | hopi-agriculture | €3.00/user | full costs + 5% |
| Services | hopi-services | €3.00/user | full costs + 5% |
| Holding | hopi-holding | €3.00/user | full costs + 5% |

### Transfer Pricing výpočet (OECD cost-plus metoda)

```
Reference cena:    €9.99  (Individual — nejnižší arm's length tržní cena)
Gross margin:      72%    (blended odhad, editovatelný parametr)
Full costs (COGS): €9.99 × (1 − 0.72) = €2.80/user/měsíc
Transfer price:    €2.80 × 1.05        = €2.94 → €3.00/user/měsíc
```

Daňově obhajitelné: cost-plus metoda je jednou z 5 OECD schválených metod pro transfer pricing. Dokumentace: tato sekce BKONTEXT = základ pro transfer pricing dokumentaci pro daňové účely.

### Freemium model

- Base konverzní rate: **10%** freemium → premium
- Per scénář (editovatelné): Conservative 8% / Middle 10% / Ambitious 15% / Dream 22%
- V business-model.json: `"freemium_conversion_rate": 0.10`

### Gross margin parametry (editovatelné)

```json
"cost_assumptions": {
  "gross_margin_pct": 72,
  "api_cost_per_session_eur": 0.10,
  "avg_sessions_per_user_monthly": 30,
  "payment_processing_pct": 2.9,
  "hosting_per_user_eur": 0.20
}
```

### Architektura — modulárnost a DB readiness

**Přidání nového segmentu** = jeden JSON objekt v `segments[]`. Nula změn v kódu.

**Přidání nové zákaznické skupiny** = nová hodnota `group` field. UI automaticky renderuje novou sekci.

**Přidání nového billing modelu** = nová hodnota `pricing_model`. Aktuální hodnoty: `flat | per_unit | tiered | usage_based | freemium`.

**DB swap** (Phase 2) = pouze `_data.js`. Frontend, UI, formule — beze změny.

**DB tabulky (pro IT při Phase 2 přechodu):**
- `SEGMENT` (id, group_id, unit_type, pricing_model, price, currency, active)
- `SEGMENT_GROUP` (id, name, world: B2C/B2B/Internal)
- `SCENARIO` (id, name, description)
- `SCENARIO_PROJECTION` (scenario_id, segment_id, year, quarter, units, freemium_conversion)
- `COST_ASSUMPTION` (margin_pct, api_cost, sessions_avg, payment_pct, hosting)

### Poznámky k implementaci

- Složitý obchodní model (tiered pricing, API usage billing, marketplace fees) = odloženo na po vydefinování celého produktu
- Phase 1 = jednoduchý flat model: počet × cena = ARR
- Všechna čísla editovatelná v Cockpitu přes GitHub API write (AIQ-00319)

---

## BIZ-00123 — Management Cockpit: 3 nové sekce — Executive Overview + Launch Plan + Task Control Center (2026-04-22)

**Datum:** 2026-04-22 | **Status:** REVIEW | **Assignee:** David Gogela | **Linked:** AIQ-00314 + AIQ-00315 + AIQ-00316 + AIQ-00317

### Kontext — proč to děláme

Cockpit má 14 sekcí. Problém: každá sekce je separátní pohled, žádné místo kde vidíš vše najednou. David nemůže efektivně řídit priority a kapacity bez unified view nad OIL + BOIL.

Dvě potřeby:
1. **Morning briefing** — rychlý přehled celého stavu bez přepínání sekcí
2. **Task governance** — business ↔ tech vazby viditelné, priority board, kdo co dělá

### Schválená rozhodnutí (2026-04-22)

| Rozhodnutí | Výběr | Zdůvodnění |
|-----------|-------|-----------|
| Executive Overview — pozice | **02** (hned po Motivation) | Ranní flow: WOW → Přehled → KPIs → Práce |
| Launch Plan Countdown — pozice | **03** (hned po Executive Overview) | Strategická priorita — B2C datum musí být vidět každý den |
| Task Control Center — pozice | **08** (po Timeline, po posunutí Launch Plan) | Drilldown: strategie → unified souhrn → detail boardy |
| Alternativa která padla | Task Control na 04 | Přerušilo by finanční blok (03-06), logicky slabší |
| Celkový počet sekcí | **16** (bylo 14, přibydou 3 — ne 2) | Launch Plan přidán jako 3. sekce nad původní plán |

### Executive Overview Dashboard (sekce 02)

**Soubor:** `cockpit/overview.html`
**Záměr:** Ranní briefing — všechno důležité na jedné obrazovce, každé číslo kliknutelné na plnou sekci.

| Blok | Widgety | Zdroj sekce |
|------|---------|-------------|
| Business Health | Investice celkem / Pipeline / Měsíční cost / Valuace cíl | 03, 04 |
| Project Pulse | Open AIQ / Open BIZ / Closed tento týden / REVIEW bottleneck | 06, 07 |
| Execution | Claude % / David % / Milestones splněno / Dnů do deadline | 05, 08 |
| Strategic | Open rozhodnutí / Target partneři / Aktuální fáze | 09, 12 |
| Launch Countdown | Dnů do B2C (01.01.2027) / Founding Members target | 14 |

### Launch Plan · Countdown (sekce 03)

**Soubor:** `cockpit/launch-plan.html`
**Záměr:** Živý odpočet k milníkům nasazení. 3 tracky s progress barem + živé počítadlo dnů.

| Track | Datum | Profily |
|-------|-------|---------|
| HOPI GROUP | 01.06.2026 | Finance → Legal → Operations → HR/IT → Dceřiné |
| B2C | 01.01.2027 | H1 Jednotlivec, H2 Pár, H3 Rodina, H4 Rozšířená |
| B2B | 01.01.2028 | Enterprise, střední firmy, veřejné instituce |

**Obsah:** Department rollout timeline (5 řádků s aktivním/brzy/plánovaným stavem) + info karty B2C a B2B parametrů.

### Task Control Center (sekce 08)

**Soubor:** `cockpit/task-control.html`
**Záměr:** Unified OIL+BOIL view — řídit priority, kapacity a BIZ↔TECH vazby.

**Tab 1 — Priority Board:**
- Kanban sloupce: S1-KRITICKÝ / S2-ZÁVAŽNÝ / S3-STŘEDNÍ / S4-NÍZKÝ
- Karta = ID + název + assignee (🤖 Claude / 👤 David) + status badge
- Filtr nahoře: ALL / AIQ-only / BIZ-only / REVIEW (čeká na Davida)

**Tab 2 — Linked View (BIZ → TECH):**
- BIZ task jako hlavní řádek (BOIL.json)
- Pod ním rozbalitelné linked AIQ tasky (OIL.json `linkedTask` pole)
- Klik na BIZ task → inline context snippet
- Vizuálně jasná šipka: BIZ-00120 → AIQ-00311

**Tab 3 — Capacity Split:**
- Claude vs. David: počet open tasků + suma `estimatedTime` (hodiny)
- REVIEW bottleneck: tasky čekající na Davidovo schválení
- Domain breakdown: kolik tasků per oblast (Platform / Finance / Strategy / ...)

### Klíčová rozhodnutí

1. Pozice 08 pro Task Control = přirozený drilldown (Timeline → souhrn → detail boardy)
2. Data čtena dynamicky z OIL.json + BOIL.json — žádné hardcoded hodnoty
3. REVIEW filter v Priority Board = kritická feature pro Davida jako schvalovatele
4. Všechny 3 nové stránky sdílejí _shell.js (topbar injection) a _cockpit.css (design system)
5. Sans-serif písmo a světlejší kontrast aplikovány na celý MANAGEMENT COCKPIT po Davidově feedbacku

### Provedené opravy v pokračování session (AIQ-00317)

- Všechny 3 sub-stránky chyběl `<script src="_shell.js"></script>` — topbar nefungoval → opraveno
- MANAGEMENT COCKPIT název změněn ze "MNG COCKPIT" na "MANAGEMENT COCKPIT" (3 vizuální výskyty)
- Kontrast a font opraven v MANAGEMENT_COCKPIT.html i ve všech 3 nových sub-stránkách
- David požadavek: "bezpatkové písmo" → `--c-font-mono` přepsán na sans-serif ve všech nových stránkách

### Status k 2026-04-22 23:59

Všechny 3 nové sekce vytvořeny a opraveny. BIZ-00123 přechází do REVIEW — čeká na Davidův UAT test.

---

## BIZ-00122 — Platform Accuracy Audit — PoC realita vs. tvrzení (2026-04-22)

**Datum:** 2026-04-22 | **Status:** CLOSED | **Assignee:** Claude | **Linked:** BIZ-00121 + AIQ-00313

### Kontext — proč audit proběhl

David Gogela upozornil: "Platforma není používána na reálných datech, ani napojena na interní DB firmy, chybí reálná integrace — zatím ji používám jen já jako builder. Jediná fce reálně využitelná je HOPIQ Chatbot. Ověřte, co se mění v tvrzeních."

Provedeny dva kroky:
**Krok 1:** Audit Anthropic ToS — 4 opravy (Skupina A)
**Krok 2:** Audit PoC vs. Production tvrzení — 5 oprav (Skupina B)

Technická dokumentace všech 9 editů (soubory, řádky, before/after): viz **AIQ-00313** v OIL_CONTEXT.md.

---

### Skutečný stav platformy (k 2026-04-22)

| Aspekt | Realita |
|--------|---------|
| Nasazení | GitHub Pages — technicky "live" na URL, veřejně přístupné |
| Uživatelé | David Gogela — jediný (builder + první tester) |
| CEO/CFO | Platformu VIDĚLI a zhodnotili — NEPOUŽÍVAJÍ ji |
| Data | Žádná reálná HOPI Group data — demo/placeholder |
| Integrace | NULOVÁ — SAP, SharePoint, BNS nejsou napojeny |
| HOPIQ Chatbot | JEDINÁ reálně funkční feature (Claude API live) |
| Stav | Funkční PoC / Feasibility Study — NE produkce |

---

### Proč PoC framing NENÍ slabší příběh

"Jeden člověk, 8 týdnů, funkční platforma s live chatbotem, HOPI Group = první deployment target" je silný příběh, který:
- **Buduje důvěru** — investor/Anthropic vidí, že nepřeháníme
- **Demonstruje schopnost** — PoC tohoto rozsahu solo = výjimečný
- **Nastavuje správná očekávání** — žádné zklamání při due diligence
- **Je autentický** — "stavíme pro sebe → víme že to funguje → prodáváme světu"

Opak (přehnaná tvrzení) = credibility risk. PoC framing = credibility asset.

David potvrdil záměr: "přesvědčit majitele o business záměru, který má smysl realizovat = PoC + Feasibility Study."

---

### Skupina A — Anthropic ToS opravy (4 edity)

| # | Soubor | Problém | Oprava |
|---|--------|---------|--------|
| A1 | PERSONAL_PITCH.html ~ř.693 (CZ) | "Anthropic — aktivní piloty jsou již v chodu" | → "Anthropic — zahájit strategic partnership outreach (deck připraven)" |
| A2 | PERSONAL_PITCH.html ~ř.694 (EN) | stejný problém v EN verzi | → konzistentní EN oprava |
| A3 | INVESTOR_BRIEF.html ř.8 og:description | "Anthropic partnership." v meta tagu (LinkedIn preview!) | → "Powered by Claude API." |
| A4 | INVESTOR_BRIEF.html ~ř.530-532 area sekce | badge "Aktivní", title "HOPI AI Lab", desc "AI Lab ve spolupráci s Anthropic" | → badge "V přípravě", title "Strategický AI Partner (outreach)", desc "Cíl: referenční zákazník Claude API pro CEE" |

**Zvlášť kritická: A3** — og:description je viditelná jako LinkedIn/Slack link preview BEZ kliknutí na dokument. Tvrdila partnership jako fakt.

---

### Skupina B — PoC Accuracy opravy (5 editů)

| # | Soubor | Problém | Oprava |
|---|--------|---------|--------|
| B1 | PERSONAL_PITCH.html ~ř.472-473 CZ+EN | "Finance Phase 0 — v provozu, reální uživatelé, reálná data skupiny" | → "Finance Phase 0 — funkční PoC, nasazen live, interní pilot: David Gogela" |
| B2 | INVESTOR_BRIEF.html ~ř.636-637 CZ+EN | "Reální uživatelé: David, CEO, CFO HOPI Group" — CEO a CFO platformu nepoužívají | → "Interní pilot: David Gogela (builder, první uživatel). CEO a CFO platformu zhodnotili." |
| B3 | CEO_BRIEF.html ~ř.1000-1005 CZ+EN | "HOPI AI Lab = CEE implementační laboratoř Anthropicu" | → "Cíl: stát se referenčním zákazníkem Claude API pro CEE. HOPI AppIQ = živý důkaz enterprise + HOME B2C nasazení." |
| B4 | CEO_BRIEF.html ~ř.533 + 568-572 CZ+EN | "Živé nasazení v HOPI Group dnes" + badge "PRODUKCE" + "Reálný uživatel. Reálná data. Reálné procesy." | → "Funkční PoC, nasazen live — HOPI Group = první deployment target." + badge "PoC · PILOT" + "Reálný builder. Reálná platforma. Reálné use cases." |
| B5 | ANTHROPIC_2PAGER.html ~ř.459 + 730 | "live in production, running inside a real company. Not a demo. Not a prototype. A product." | → "fully functional and deployed... Not a static deck. Not a mockup. A working platform." |

---

### CZ/EN konzistence — ověření

Všechny opravy provedeny na obou jazycích. Každý `span.lang-cz` má ekvivalentní `span.lang-en` upraven ve stejném editu. David explicitně ověřil: "CZ a EN verze budou konzistentní?"  → Potvrzeno.

---

### Co NEBYLO opraveno (a proč)

| Položka | Důvod |
|---------|-------|
| PORTAL_PRESENTATION.html ~ř.1799, 2752-2753 | Flagováno S3-STŘEDNÍ; deferred do příští session (registrovat jako AIQ) |
| Cockpit sekce HTML soubory | Žádné přehnané tvrzení o produkci nenalezeno — PoC framing přirozeně zachován |
| HOPI Group firemní fakta (€0.5B, 5 divisions) | Správná a ověřitelná veřejná data — NEMĚNÍME |
| "HOPIQ Chatbot live" zmínky | Pravda — jedná se o skutečně funkční live feature |
| BKONTEXT.md ř.162 "Jsme real production user, ne demo" | Interní positioning dokument (ne veřejný) — popis záměru, ne tvrzení třetím stranám |

---

### LinkedIn "Build in Public" plán — posouzení souladu

David zamýšlí sdílet pokrok na LinkedIn. Hodnocení:

**Bezpečné ✅:**
- "Budujeme AppIQ — AI platform powered by Claude (Anthropic)"
- "Funkční PoC za 8 týdnů — solo developer + AI"
- "Vedeme outreach na Anthropic strategic partnership"
- Ukázat HOPIQ chatbot v akci (Claude API v použití)

**Nutná opatrnost ⚠️:**
- Neuvádět "Anthropic Partner" dokud není smlouva podepsána
- Neuvádět počty uživatelů/zákazníků (máme 0 platících)
- Screenshoty z live URL jsou OK — jen nepřidávat tvrzení o integraci co neexistuje

---

### Klíčová rozhodnutí (2026-04-22)

1. PoC = pravdivý a silný příběh — David potvrdil záměr je PoC + Feasibility Study
2. Všechny opravy schváleny Davidem: "ANO, souhlas se vším, prosím pečlivě oprav všechny protizákonné a nepřesné formulace"
3. PORTAL_PRESENTATION.html — flagováno pro příští session S3-STŘEDNÍ
4. Platforma je připravena pro Anthropic kontakt z hlediska accuracy — žádné nepravdivé tvrzení nezůstalo

---

## BIZ-00121 — Anthropic obchodní politika a právní rizika (2026-04-22)

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** Claude + David Gogela | **Linked:** BIZ-00119

### Davidova otázka

> "Není teď ten kontakt na Anthropic proti Zásadám — viz spojení Anthropic s HOPI a takto ho veřejně propagovat?"

### Krátká odpověď: NE. Outreach NENÍ proti ToS. ALE — máme konkrétní texty k opravě.

---

### Anthropic Usage Policy — co smíme a nesmíme

**Povoleno ✅:**
- Komerční SaaS produkt postavený na Claude API
- Branding: "Powered by Claude" / "Built with Claude API"
- Veřejně říct: "AppIQ používá Claude (Anthropic) jako AI engine"
- Outreach / kontaktování Anthropic pro partnerství — je to standard B2B
- Používat Claude output v produktu (s disclosure)
- Platit za API a přidávat hodnotu → SaaS = OK

**Zakázáno / rizikové ❌:**
- Tvrdit "Anthropic Partner" BEZ podepsané partnerské smlouvy
- Impersonovat Anthropic nebo tvrdit Anthropic endorsement produktu
- Direktní resell Claude API přístupu třetím stranám (AppIQ SaaS = OK, API klíče přeprodat = NOT OK)
- Tvrdit AI output je generován člověkem
- Sdílet API klíče

**Je ANTHROPIC_2PAGER.html problém?**
Absolutně ne. Je to pitch dokument zaslaný přímo Anthropic — obchodní nabídka partnerství. Přesně tak funguje B2B svět. Problém by nastal pokud bychom tvrdili partnerství bez smlouvy VEŘEJNĚ (na webu, investorům).

---

### ⚠️ KRITICKÉ: PERSONAL_PITCH.html řádek 693

**Aktuální (problematický) text:**
> "Oslovit a formalizovat ARTIN · INTECS · **Anthropic** — aktivní piloty jsou již v chodu. Uzavřít partnerské smlouvy."

**Proč je to problém:**
1. "aktivní piloty jsou již v chodu" o Anthropic = **nepravda** — máme API přístup jako zákazník, ne pilot/partnership
2. Pokud toto vidí investor nebo Anthropic sám = nepravdivé tvrzení o existujícím vztahu
3. V kontextu "uzavřít smlouvy" zní jako formalizace existujícího stavu, ne nový záměr

**Doporučená oprava (David schvaluje wording):**
> "Oslovit a formalizovat ARTIN · INTECS — aktivní piloty jsou v chodu. **Anthropic: zahájit strategický outreach** — partnership deck připraven (ANTHROPIC_2PAGER)."

Nebo jednodušeji oddělit Anthropic:
> "Oslovit a formalizovat ARTIN · INTECS — aktivní piloty jsou v chodu. Uzavřít první partnerské smlouvy. Anthropic: připravit a odeslat partnership outreach."

**Urgence opravy:** VYSOKÁ — před jakýmkoliv sdílením PERSONAL_PITCH.html s investory nebo třetími stranami.

---

### GDPR a data privacy

- User data v HOPIQ chatbotu → Claude API → Anthropic může logovat pro safety monitoring
- **Povinné v Privacy Policy:** "Pro zpracování dotazů využíváme Claude API (Anthropic, Inc., USA). Data jsou přenášena mimo EEA." + GDPR Article 13 disclosure
- Citlivá firemní data (HOPI Finance) → zvážit **Anthropic Claude API Enterprise tier** (zero data retention)
- Pro HOME B2C: osobní data přes AI = GDPR Article 13 povinná disclosure

### Komunikační guideline — referenční tabulka

| Situace | Správně říkat | Nesmíme říkat |
|---------|--------------|----------------|
| Veřejný web | "Powered by Claude API (Anthropic)" | "Anthropic Partner" |
| Investor pitch | "Vedeme outreach na Anthropic strategic partnership" | "Jsme Anthropic partneři" |
| PERSONAL_PITCH | "Připravujeme Anthropic outreach — deck připraven" | "Piloty s Anthropic jsou v chodu" |
| Konference / média | "AppIQ je postaveno na Claude (Anthropic)" | "Anthropic nás podporuje / endorsuje" |
| Interní HOPI | "Claude je náš AI engine, Anthropic je náš API provider" | "Anthropic je náš partner" (do podpisu smlouvy) |

### Výstup tasků

1. ~~Oprava PERSONAL_PITCH.html řádek 693~~ → **DONE** (AIQ-00313, Skupina A)
2. Privacy Policy snippet pro Claude API (připravit text) → OPEN
3. Komunikační guideline uložit jako reference (tento záznam slouží jako základ) → DONE

### Provedené opravy — Skupina A (2026-04-22)

Opravy Skupiny A (Anthropic ToS) **dokončeny** po schválení Davidem: "ANO, proveď všechny 3 opravy."
Technická dokumentace: viz **AIQ-00313** | Komplexní business audit: viz **BIZ-00122**.

| Oprava | Soubor | Status |
|--------|--------|--------|
| PERSONAL_PITCH ~ř.693-694 CZ+EN: Anthropic wording oddělena | PERSONAL_PITCH.html | ✅ DONE |
| INVESTOR_BRIEF og:description: "Anthropic partnership." → "Powered by Claude API." | INVESTOR_BRIEF.html | ✅ DONE |
| INVESTOR_BRIEF Anthropic area: badge "V přípravě", title, desc přepsány | INVESTOR_BRIEF.html | ✅ DONE |

---

## BIZ-00120 — Multi-Agent Organization — AI vendor diversification strategie (2026-04-22)

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** Claude + David Gogela | **Linked:** BIZ-00119 + AIQ-00311

### Kontext — proč to řešíme

AppIQ stojí na Anthropic/Claude jako jediném AI poskytovateli. David správně identifikoval: "nechci to myslet zle, ale riziko existuje a je nutné ho řídit." Cíl není odejít od Anthropic — je to nejlepší volba. Cíl je mít **plán B** a **business architekturu**, která není závislá na jediném vendorovi.

### 5 rizikových scénářů (triggers pro Plan B)

| # | Riziko | Scénář | Dopad |
|---|--------|--------|-------|
| 1 | **Cenové** | Anthropic zdraží API 3× | Marže AppIQ klesnou, B2C economics nefunguje |
| 2 | **Smluvní** | Anthropic změní ToS (zakáže embedding v SaaS) | Musíme přemigrovat celou AI vrstvu |
| 3 | **Dostupnostní** | Anthropic má výpadek (outage) | Single point of failure — AppIQ nefunguje |
| 4 | **Akviziční** | Anthropic koupí Google / Microsoft / Meta | Strategic conflict — preferují vlastní produkty |
| 5 | **Regulační** | EU regulace US AI providerů (AI Act, GDPR+) | Možný zákaz nebo omezení Claude v EU |

### Business model — provider-agnostic design

**Principy:**
- **Marketing:** "AI-powered platform" (ne "Claude-powered") — zachováváme vendor flexibilitu
- **Architektura:** `_agent.js` abstrakce = provider swap = 1 config change (viz AIQ-00311)
- **Licensing:** AppIQ licence nezmiňuje konkrétního AI vendora
- **Pricing:** AI náklady = interní (uživatel platí za platform, ne za AI calls)

**Provider strategie — role každého hráče:**

| Provider | Primární role | Kdy zapojit |
|----------|--------------|-------------|
| **Anthropic Claude** | Primary — premium quality, complex reasoning | Teď, default pro vše |
| **Azure OpenAI (GPT-4o)** | Enterprise fallback — MS ecosystem | Enterprise klienti s MS smlouvou / Azure |
| **Google Gemini** | Cost-opt + multimodal (dokumenty, obrázky) | Phase 2 B2C masové operace |
| **OpenAI direct** | Alternative reasoning / specifické capability | Teprve po benchmarku |
| **MS Copilot** | Teams integrace, Office 365 | Phase 2 Enterprise (MS-heavy firmy) |

### Plan B — konkrétní akce

| Časový rámec | Akce |
|---|---|
| **Ihned (v8.x)** | Postavit `_agent.js` abstrakci (AIQ-00311) — Claude default, ale swap připraven |
| **Do 3 měsíců** | Aktivovat Azure OpenAI account, otestovat API kompatibilitu |
| **Do 6 měsíců** | Mít aktivní API klíče u min. 2 providerů, připravené pro přepnutí |
| **Trigger event** | Anthropic zdraží >50% → spustit migraci na Azure OpenAI (GPT-4o drop-in) |
| **Kontinuálně** | Vendor review kvartálně — cena, ToS změny, capability benchmark |

### Organizační přístup

- **David Gogela = Chief AI Officer** — strategická rozhodnutí o provider strategy
- **Claude = primární AI partner pro vývoj** — není zaměnitelný 1:1 (kvalita reasoning)
- **Ostatní modely** = alternativy pro specifické úkoly (cost, latency, integrace)
- **ADR záznam:** každé rozhodnutí o AI vendor → zapsat do cockpit/decisions.html

### Výstup tasků

1. ADR-013: "Provider-agnostic AI architecture" → zapsat do decisions.html
2. Vendor comparison tabulka (Claude vs Azure OpenAI vs Gemini — cena, kvalita, dostupnost, GDPR)
3. `_agent.js` design spec → předat do AIQ-00311 pro technickou implementaci
4. Azure OpenAI trial account → David aktivuje

---

## BIZ-00119 — Anthropic Partnership Outreach (2026-04-22)

**Datum:** 2026-04-22 | **Status:** IN PROGRESS | **Assignee:** David Gogela | **Linked:** BIZ-00105

### Kontext — proč a co chceme

Anthropic je náš primární AI partner — Claude je páteř celé platformy. Cílem outreach není jen kredity, ale **dlouhodobý strategický vztah** s firmou, jejíž technologii stavíme AppIQ na. Příležitost je výjimečná: jsme živý production zákazník, non-developer founder, 8 týdnů, CEE trh.

### Tři cíle outreach (v pořadí priority)

**1. Anthropic Startup Program — $25K–$100K API kredity**
- ROI argument PRO Anthropic: $25K kredity → AppIQ B2C launch 01.01.2027 → 10 000+ uživatelů → každý generuje Claude API calls → Anthropic čistý ARR, payback do 6 měsíců
- Jsme real production user, ne demo — HOPI Group 8 CEE zemí, €0.5B, Claude běží live

**2. Strategické partnerství — intro call (30 minut)**
- CEE market angle: 10 zemí, 100M lidí, zero enterprise AI platform budovaná lokálně
- HOPI = first mover + Anthropic má přes nás přístup do trhu kde nejsou
- Framing: "Váš $25K vrátí jako recurring API revenue. My jsme váš CEE distributor."

**3. Developer spotlight / case study**
- 1 člověk (non-developer, Head of Controlling) + Claude = enterprise AI platforma za 8 týdnů
- Tato story prodá Claude dalším 10 000 potenciálním builderům
- Podmínky: publicky, na stage, kdekoliv Anthropic chce

### Klíčový výstup — ANTHROPIC_2PAGER.html

Kompletní 2-pager postavený 2026-04-22. Struktura (v pořadí):
1. **Header** — HOPI TechIQ branding, AppIQ lockup, "AI by Claude · Anthropic"
2. **Hook** — "1 person. 1 AI. 8 weeks. Live."
3. **Pull Quote** — *"I'm not a developer. Claude is my engineering team. HOPI is my proof of concept. CEE is my market."* — David Gogela
4. **Product** — co je AppIQ, chips: Enterprise/Home/AI categories
5. **Shock Table** — Traditional (18m/10 lidí/€500K/prototype/1 země) vs AppIQ+Claude (8w/1+AI/~$1K/live production/8 CEE zemí)
6. **Studio** — 4 karty: HOPIQ AI Assistant (Claude API live) · Design Lab (AI generuje komponenty) · Workflow Designer (text-to-flow) · Smart Document Hub (Claude RAG)
7. **Contrast** — Anthropic ($61.5B/1500+ lidí) vs HOPI AppIQ (~$1K/1+AI) · partnership visual
8. **Traction** — v7.24 live · 109 git commits · 8 CEE countries · **CEE #1** (first mover, 100M market, zero competition)
9. **AI Maturity S0→S4** — track kde jsme (S2 "we are here") → kde jdeme (S4 autonomous). AppIQ = platforma která zákazníka provede cestou.
10. **The Opportunity** — přepsáno jako business case pro Anthropic (ne prosba): kredity = API revenue multiplier · CEE market entry · case study story
11. **Screens** — 2×2 grid: Finance Portal (LIVE) · Management Cockpit (NEW) · Investor Brief (LIVE) · HOPIQ Studio (Claude API badge)
12. **Footer** — David Gogela · link na INVESTOR_BRIEF.html?lang=en · pw: HOPI2026

### Screenshoty — co pořídit (pending)

| Frame | URL | Co ukázat |
|-------|-----|-----------|
| Finance Portal | `.../HOPI_AppIQ/Development/index.html` | Dashboard po přihlášení — dlaždice modulů |
| Management Cockpit | `MANAGEMENT_COCKPIT.html` | Hub + B2C countdown banner + karty sekcí |
| Investor Brief EN | `.../INVESTOR_BRIEF.html?lang=en` | Hero nebo Anthropic Journey sekce |
| HOPIQ Studio | `.../hopiq/index.html` (v7.21) | Chatbot záložka s ukázkovou konverzací |

Screenshoty = `background-image` do `.sc-body` per frame — hotfix kdykoliv po deployi.

### Integrita odkazů (ověřeno 2026-04-22)

| Soubor | Odkaz | Status |
|--------|-------|--------|
| `INVESTOR_BRIEF.html` | `ANTHROPIC_2PAGER.html` | ✅ aktualizováno |
| `cockpit/documentation.html` | `ANTHROPIC_2PAGER.html` jako "Anthropic 2-Pager" | ✅ aktualizováno |
| `PERSONAL_PITCH.html` | `MANAGEMENT_COCKPIT.html` (nový odkaz) | ✅ přidáno |
| `ANTHROPIC_2PAGER.html` footer URL | `INVESTOR_BRIEF.html?lang=en` (v7.25) | ✅ correct |
| `OIL.json` AIQ-00306 | `ANTHROPIC_2PAGER.html` v deploy listu | ✅ aktualizováno |

### Klíčová rozhodnutí z diskuse 2026-04-22

- **Přejmenování** ONEPAGER → 2PAGER (obsah přerostl one-pager formát)
- **Studio sekce** přidána — Claude embedded jako intelligence každého nástroje, ne feature
- **Pull Quote** — Davidův hlas jako human element, nejpamátnější část
- **Shock Table** — jawdropper pro majitele i Anthropic: 1/500th cost, 1/9th time
- **The Opportunity** (ne "The Ask") — framing jako business case, ne prosba
- **CEE #1** badge v Traction — 100M lidí, zero local competition = Anthropicův market entry přes nás
- **2×2 screen grid** (místo 3×1) — lepší vizuální dopad, 4 klíčové obrazovky
- **AI Maturity S0→S4** — AppIQ jako progression engine, retenční mechanismus
- **Screenshoty** — placeholdery záměrného designu, hotfix s reálnými screenshoty kdykoliv

### Další kroky (David)

1. Odeslat žádost Anthropic Startup Program (BIZ-00105, tento týden)
2. Pořídit 4 screenshoty → poslat Claudovi → hotfix do 2-pageru
3. LinkedIn "build in public" post (BIZ-00105 step 2)
4. Přímý kontakt Anthropic (BIZ-00105 step 3) s odkazem na 2-pager + INVESTOR_BRIEF?lang=en

---

## Strategický rámec — 3 produktové streamy

**Datum rozhodnutí:** 2026-04-19 | **Rozhodl:** David Gogela

### Stream 1 — B2B Pilot: HOPI GROUP (živý, teď)
Interní laboratoř skupiny HOPI. Finance portál (Group Controlling) = první deployment. Cíl: rozšíření na všechny 4 divize (Supply Chain, Foods, Agriculture, Services) + Holding IT/Management. HOPI GROUP slouží jako živý testovací a referenční zákazník pro oba komerční streamy.

**Klíčové:**
- Není komerční produkt — je to interní nástroj + vývojová laboratoř
- Každá nová funkce se nejdřív ověří v HOPI GROUP, pak dostane do produktu
- Divize = budoucí referenční case studies pro B2B Enterprise sales

### Stream 2 — B2C SaaS Home (launch 01.07.2027)
Retailový produkt pro domácnosti a soukromé nekomerční klienty. Freemium model. Zaměřeno na: osobní finance, organizaci domácnosti, AI asistent pro každodenní život.

**Klíčové:**
- Launch datum: **01.07.2027** (původně 01.01.2027, posunuto o 6 měsíců pro realistické naplánování)
- Freemium tier je klíčový pro virální šíření a user acquisition
- Primární trh: ČR + SK + Středoevropský trh (CZK + EUR pricing)

### Stream 3 — B2B SaaS Enterprise (launch 01.01.2028)
Enterprise SaaS produkt pro firmy, vybudovaný na základě pilotáže v HOPI GROUP. Per-seat licensing nebo enterprise flat fee. White-label možnost.

**Klíčové:**
- HOPI GROUP = první enterprise zákazník a referenční case study
- Launch o 6 měsíců po B2C (ověřená platforma, stabilní tým)
- Enterprise tier = hlavní revenue driver v dlouhodobém horizontu

---

## Nové entity

### HOPI TechIQ s.r.o.
**Status:** PLANNED | **Target founding:** 2026-Q2

Nová obchodní společnost jako spin-off z HOPI Holding. Účel:
- Právně vlastnit AppIQ platformu a její IP
- Zaměstnávat vývojový tým
- Uzavírat komerční smlouvy se zákazníky
- Vydávat faktury a spravovat revenue

**Klíčová rozhodnutí (otevřená):**
- Společníci: David Gogela + HOPI Holding? Nebo David 100%?
- Základní kapitál: min. 1 CZK (s.r.o.) nebo vyšší pro věrohodnost
- Název domény: hopi-techiq.cz, appiq.cz, appiq.eu — zaregistrovat ASAP

### HOPI AI Lab
**Status:** FOUNDING | **Target:** 2026-Q2

Interní AI tým v rámci HOPI Holding — přechodná entita před HOPI TechIQ. Inkubátor pro vývoj AppIQ. Přechod do HOPI TechIQ po jejím založení.

**Složení (plánované):**
- David Gogela — Head of AI Lab / Product Owner
- Claude (Anthropic API) — AI Development Partner (24/7)
- CTO/Lead Developer — nabrat Q3 2026
- Rozšíření týmu dle kapacitního plánu

---

## Kapacitní rámec

### Aktuální kapacita (Q2 2026)
| Zdroj | Dostupnost | Omezení |
|-------|-----------|---------|
| Claude (AI) | 24h / 7 dní | Závislý na sessions s Davidem |
| David Gogela | 12h / 7 dní | Souběžná role: Head of Group Controlling HOPI |
| Tým | 0 FTE | Nábor od Q3 2026 |

### Kapacitní cíle
| Milník | Potřebná kapacita (odhad) |
|--------|--------------------------|
| B2B Pilot rollout (5 divizí HOPI) | Claude + David + 1-2 devs |
| B2C SaaS Home launch (01.07.2027) | Claude + David + 4-6 FTE tým |
| B2B Enterprise launch (01.01.2028) | Claude + David + 8-12 FTE tým |

**Bottleneck analýza:**
- **Teď:** David je single point of bottleneck — vše závisí na jeho dostupnosti
- **Q3 2026:** CTO nastoupí → unblockuje technický nábor
- **Q4 2026:** 2-3 devs → Claude přestane být sole developer
- **Q1 2027:** Plný tým → David se může zaměřit na product + business

---

## BIZ-00001 — Založení HOPI TechIQ s.r.o.

**Priorita:** CRITICAL | **Target:** 2026-Q2 | **Owner:** David Gogela

### Klíčová rozhodnutí k řešení
1. **Struktura vlastnictví:** David 100% vs. David + HOPI Holding jako minoritní společník. Doporučení: David 100% pro maximální flexibilitu, HOPI Holding = strategický partner bez equity (licenční vztah).
2. **Základní kapitál:** Právní minimum = 1 CZK. Doporučení: 100 000 CZK pro věrohodnost vůči bankám a partnerům.
3. **Předmět podnikání:** Výroba, obchod a služby neuvedené v přílohách 1 až 3 živnostenského zákona + poradenská a konzultační činnost + zpracování dat, poskytování informací, provozování databází.
4. **Sídlo:** HOPI Holding adresa nebo virtuální sídlo (Praha)?
5. **Doménová jména:** Zaregistrovat okamžitě: `appiq.cz`, `appiq.eu`, `hopitech.cz`, `hopi-techiq.cz`.

### Doporučený postup
1. Konzultace s notářem (1 setkání) → sepsání zakladatelské listiny
2. Složení ZK → bankovní účet (ČSOB, FIO nebo Revolut Business)
3. Podání žádosti o zápis do OR → OR obvykle 5-10 pracovních dní
4. Registrace k DPH (pokud obrat přesáhne 2M CZK/rok — předregistrovat dobrovolně pro B2B)
5. Registrace GDPR u ÚOOÚ (pokud zpracovávají data EU subjektů)
6. Trademark: přihlásit "AppIQ" + "HOPI TechIQ" u ÚPV ČR (ochranná známka — 6-12 měsíců)

---

## BIZ-00002 — HOPI AI Lab v HOPI Holding

**Priorita:** CRITICAL | **Target:** 2026-Q2 | **Owner:** David Gogela

### Kontext
AI Lab = interní struktura pro přechodné období (než vznikne TechIQ). Dává Davidovi formální mandát, budget a tým pro práci na AppIQ v rámci HOPI Holding.

### Co je třeba zařídit
- Schválení od CEO/CFO HOPI Group → roční budget pro AI Lab
- Job description pro případné interní přesuny nebo nové nábory do Holdingu
- Pracovní prostor (fyzický + Microsoft Teams workspace)
- Přístup k AI nástrojům: Anthropic API, GitHub, Azure

---

## BIZ-00003 — Legal framework

**Priorita:** CRITICAL | **Target:** 2026-Q2

### GDPR — klíčové kroky
- Privacy policy: Co data sbíráme, proč, jak dlouho, kdo má přístup
- Cookie policy + consent management pro web
- DPA (Data Processing Agreement) template pro B2B zákazníky
- Right to erasure (GDPR čl. 17) implementace v systému
- Data breach protocol: co dělat při úniku dat

### Smlouvy — priority
1. NDA (okamžitě) — pro zaměstnance, partnery, investory
2. SaaS Subscription Agreement (před B2C beta)
3. SLA document (před B2C launch)
4. Enterprise MSA (před B2B launch)
5. Partnerská smlouva template

---

## BIZ-00004 — Finanční projekce

**Priorita:** CRITICAL | **Target:** 2026-Q2

### Revenue model — předpoklady (k diskusi)
| Tier | Cena/měsíc (odhad) | Cíl uživatelů Y1 |
|------|-------------------|-----------------|
| Free | 0 | 1 000 |
| Basic | 149 CZK / 5.99 EUR | 200 |
| Pro | 299 CZK / 11.99 EUR | 50 |
| Family | 399 CZK / 15.99 EUR | 30 |

**Pozn.:** Ceny k validaci — benchmarking vs. Notion (200-400 CZK/měsíc), Spendee (free + 99 CZK).

### Cost structure — hlavní položky
- Tým: největší náklad (80% operativních nákladů)
- Anthropic API: ~$0.01-0.05 per user/session (záleží na usage)
- Azure cloud: ~$200-500/měsíc na počátku, škáluje s uživateli
- Marketing: 15-20% revenue (growth fáze)

---

## BIZ-00008 — Role a kompetence

**Priorita:** HIGH | **Target:** 2026-Q3

### Hiring roadmap

| Role | Kdy | Typ | Seniorita | Est. plat (CZK/měsíc) |
|------|-----|-----|-----------|----------------------|
| CTO / Lead Dev | Q3 2026 | Full-time | Senior | 120-180k |
| Full-stack Dev #1 | Q4 2026 | Full-time | Mid/Senior | 80-120k |
| AI/ML Engineer | Q4 2026 | Full-time | Mid/Senior | 90-130k |
| Full-stack Dev #2 | Q1 2027 | Full-time | Mid | 70-100k |
| Product Manager | Q1 2027 | Full-time | Mid/Senior | 80-120k |
| UX/UI Designer | Q1 2027 | Full-time nebo freelance | Mid | 60-90k |
| QA Engineer | Q2 2027 | Full-time nebo contractor | Mid | 60-80k |
| DevOps / Cloud | Q2 2027 | Full-time nebo contractor | Mid | 80-110k |
| Sales / BD | Q3 2027 | Full-time | Senior | 60-80k + bonus |
| Customer Success | Q3 2027 | Full-time | Junior/Mid | 40-60k |

**Poznámka:** Platy jsou orientační dle CZ trhu Q2 2026. Remote policy = výhoda při náboru.

---

## BIZ-00013 — Technické zdroje

**Priorita:** HIGH | **Target:** 2026-Q3

### Infrastrukturní stack (doporučení)

| Kategorie | Nástroj | Cena/rok (odhad) | Poznámka |
|-----------|---------|-----------------|---------|
| Cloud (produkce) | Azure | $2 400-12 000 | App Service + SQL + Blob |
| AI API | Anthropic Claude | $1 200-6 000 | Dle usage |
| AI API záloha | OpenAI | $600-3 000 | Fallback |
| GitHub | GitHub Team | $480/rok (per user) | CI/CD + repos |
| IDE AI | GitHub Copilot | $228/dev/rok | Per developer |
| Error tracking | Sentry | $312/rok | |
| Analytics | PostHog Cloud | Free-$2 400 | SaaS analytics |
| Payments | Stripe | % z transakcí (1.4-2.9%) | No fixed cost |
| Billing | Stripe Billing | Zahrnuto v Stripe | |
| Helpdesk | Intercom | $1 800-6 000/rok | Zákazí od Series A |
| Monitoring | Azure App Insights | Zahrnuto v Azure | |
| Design | Figma | $576/rok (5 users) | |

**Odhadované roční náklady na infrastrukturu (bez týmu):** CZK 200 000 – 500 000/rok (záleží na uživatelích)

---

## Moderované business diskuse — agenda

*Sekce pro záznamy z diskusí David + Claude na klíčová business rozhodnutí.*

### Plánované diskuse
1. **Struktura vlastnictví HOPI TechIQ** — David 100% vs. HOPI Holding minority
2. **Revenue model deep-dive** — freemium tier limits, pricing CZK vs. EUR
3. **GTM prioritizace** — ČR first nebo rovnou EU?
4. **Fundraising rozhodnutí** — bootstrapped nebo seed round?
5. **B2C persona definice** — kdo je náš primární zákazník?
6. **Build vs. Buy rozhodnutí** — co vyvíjet vlastní vs. integrovat hotové SaaS

*Záznamy z diskusí přidávat průběžně pod každé téma.*

---

## BIZ-00024 — CEO/CFO Summary: platforma + AI Lab + nový business narrative

**Priorita:** HIGH | **Target:** 2026-Q2 | **Owner:** David Gogela + Claude | **Status:** IN PROGRESS | **Aktualizováno:** 2026-04-20

---

### MOTTO PROJEKTU — HLAVNÍ (kombinace A+C)

> **EN — plná verze:**
> *"Built for the universe. Starting with you. No limits — unless we set them."*

> **EN — tagline (zkrácená):**
> *"From you to the universe — no limits unless we set them."*

> **CS — plná verze:**
> *"Stavěno pro vesmír. Začínáme u vás. Bez limitů — pokud si je sami nezvolíme."*

> **CS — tagline (zkrácená):**
> *"Od vás po vesmír — bez limitů, pokud si je sami nezvolíme."*

**Použití:**
- PROMO web — hero sekce, hlavní headline
- Personal Pitch — opening slide
- Studio Hub header — subtitle nebo footer
- CEO brief — opening statement
- Veškerý marketing a komunikace projektu

---

### PRODUKTOVÁ ARCHITEKTURA — HOPI AppIQ (dual-branch platform)

**Entita:** HOPI TechIQ s.r.o. (spin-off, target Q2 2026)
**Klíčový produkt:** HOPI AppIQ Platform

#### 2 větve — 2 fáze každé větve

```
HOPI AppIQ Platform
├── HOME Branch  ← PRIMÁRNÍ KOMERČNÍ PRIORITA
│   ├── Fáze 1: AppIQ Dev Environment (HOME)
│   │   └── AI-powered personalizovaný vývoj aplikací pro domácnosti
│   └── Fáze 2: Pre-built Templates (HOME)
│       ├── Domácí finance
│       ├── Osobní zdravotní péče  ← HIGH POTENTIAL
│       ├── Vzdělávání a škola
│       ├── Fitness a zdravý životní styl
│       └── Stravování a výživa
│   Scale: Jednotlivci → rodiny
│   Launch: 1.1.2027
│
└── ENTERPRISE Branch
    ├── Fáze 1: AppIQ Dev Environment (ENTERPRISE)
    │   └── AI-powered personalizovaný vývoj firemních aplikací
    └── Fáze 2: Pre-built Templates (ENTERPRISE)
        ├── Logistika a doprava
        ├── Potravinářská výroba
        ├── Zemědělství
        ├── Reality a developerství
        ├── Energetika
        ├── Veřejné služby
        ├── ZDRAVOTNICTVÍ ← MEGA POTENTIAL (viz níže)
        ├── Veřejný sektor / státní správa
        └── Finance a pojišťovnictví
    Scale: Živnostníci → SME → střední → velké → korporace
    Launch: 2028-01-01
```

#### ZDRAVOTNICTVÍ — proč je to mega vertikála
- Systémy: fragmentované, nekompatibilní, data v silosech
- Budgety: jedny z největších veřejných i soukromých výdajů
- Motivace uživatelů: ZDRAVÍ je #1 priorita každého člověka bez výjimky
- Trh: státní + soukromý sektor, ambulance, nemocnice, pojišťovny, wellness
- AI potenciál: diagnostika, prevence, personalizovaná péče, správa zdravotních záznamů

---

### ČÁST 1 — PRODUCT DEVELOPMENT: Co bylo postaveno (top 5, k 2026-04-20)

**1. AppIQ Platform v7.21 — enterprise SPA od nuly za 9 měsíců**
144+ splněných AIQ úkolů. Studio Hub, Finance portál (HOPI Group live), HOPIQ Center, bilingvní prezentace CS/EN, multi-version GitHub Pages. Jeden developer + AI partner (Claude). Základ pro obě větve HOME i ENTERPRISE.

**2. AI-native core — AI je základní vrstva, ne feature**
HOPIQ chatbot (vlastní centrum), modulární _hopiq.js, kontextová AI nápověda. Produkt je navržen tak, aby AI byl základ každé aplikace — ne doplněk. Toto je klíčový diferenciátor oproti konkurenci.

**3. Dev Environment základ (AppIQ Studio)**
Hub + DevCenter + TestCenter + AdminCenter = vývojové prostředí pro tvorbu nových aplikací. Přesně to, co tvoří Fázi 1 obou větví. Živý základ — není to plán, je to hotový základ.

**4. HOPI Group deployment — B2B ENTERPRISE lab živě**
Group Controlling: FX, SAP, BNS, Calendar, Tracking. Reálné nasazení = validace architektury. HOPI Group = první referenční zákazník pro ENTERPRISE větev.

**5. Produkční infrastruktura pro škálování**
OIL task metodika (AIQ-NNNNN), automated CI/CD, version selector, archive pipeline. Infrastruktura připravená na růst týmu bez chaosu — nutný předpoklad pro startup fázi.

---

### ČÁST 2 — BUSINESS DEVELOPMENT: Klíčové přeformulování

#### Starý příběh
> *"Budujeme interní nástroj pro HOPI. Jednou z toho možná bude produkt."*

#### Nový příběh
> *"Budujeme masový AI produkt. HOPI Group je naše první laboratoř a první reference. B2C HOME launch 1.1.2027 přinese cash od dne 1."*

---

#### Flip #1 — HOME je primární komerční produkt (ne HOPI Controlling)

| | Starý pohled | Nový pohled |
|--|--------------|-------------|
| **Priorita #1** | HOPI Controlling portál | AppIQ HOME — masový B2C trh |
| **HOPI role** | Cílový zákazník | ENTERPRISE lab + referenční zákazník |
| **Cash zdroj** | HOPI budget | HOME subscriptions od uživatelů od dne 1 |
| **Tržní záběr** | ~500 HOPI zaměstnanců | Miliony domácností v CEE |
| **Vývojový rytmus** | HOPI potřeby | HOME roadmap primárně, HOPI benefituje |

**Proč HOME:**
- Největší možný trh — každý člověk a každá rodina
- Finance, zdraví, vzdělávání, fitness — universální potřeby
- Freemium model = virální šíření, nízké CAC
- HOPI controlling je B2B use case — výborný, ale omezený na firmy

**Proč HOPI Controlling stále dává smysl:**
- Validuje ENTERPRISE větev platformy v reálném provozu
- Prvních 5 diviz HOPI = živý referenční zákazník pro B2B sales
- Každá HOPI funkce (FX, SAP, reporting) = šablona pro ENTERPRISE vertikály

---

#### Flip #2 — B2C HOME launch 1.1.2027: Cash = nezávislost

- 100 HOME uživatelů (€5/měsíc) = €500/měsíc → hradí Claude API
- 500 HOME uživatelů = €2 500/měsíc → hradí infrastrukturu
- 2 000 HOME uživatelů = €10 000/měsíc → hradí prvního junior devs
- 10 000 HOME uživatelů = €50 000/měsíc → plnohodnotný startup s týmem

**Závěr:** Každý platící HOME uživatel = důkaz PMF + financování vývoje + argumentace pro investory. Nečekáme na HOPI budget — generujeme vlastní.

---

#### Flip #3 — Strategičtí partneři

**A) ANTHROPIC — Priorita #1**
HOPI AI Lab = CEE implementační a evangelizační laboratoř Anthropicu.
Pro Anthropic: enterprise deployment v CEE, regionální přítomnost bez vlastního týmu, real-world data.
Pro HOPI: zvýhodněný API přístup, early access k modelům, PR/brand, možná akelerace nebo investice.
Timing: agresivní enterprise expanze Anthropicu mimo US. CEE podpokrytý. Okno otevřené teď.

**B) ARTIN — CZ tech ekosystém**
Česká softwarová společnost. Potenciální co-development partner nebo distribuční kanál pro AppIQ ENTERPRISE v CZ trhu. ARTIN má zákazníky, my máme AI platformu.

**C) INTECS — CZ integrační partner**
Potenciální partner pro SAP/ERP integrace. AppIQ ENTERPRISE potřebuje hluboká systémová napojení — INTECS jako bridge pro enterprise zákazníky.

---

#### Klíčový argument pro CEO/CFO

> *"Investice HOPI do AI Lab není náklad. Je to spolufinancování spin-off firmy, jejímž prvním zákazníkem je HOPI sám — a produktu, který HOPI ušetří desítky milionů na IT akvizici."*

| Srovnání | Cena |
|----------|------|
| Akvizice hotové AI platformy | €2–10M |
| Roční náklady externího vývoje (stejný rozsah) | €500K–2M/rok |
| Investice do AI Lab (David + Claude + infrastruktura) | ~CZK 500K–1M/rok |
| **Výsledek** | Enterprise platforma, IP HOPI, komerční startup |

---

### Závislosti
- BIZ-00002 (AI Lab formalizace) → mandát + budget
- BIZ-00001 (HOPI TechIQ s.r.o.) → právní entita
- BIZ-00025 (Anthropic partnership) → strategický partner
- BIZ-00022 (HOME launch 1.1.2027) → datum potvrzeno
- BIZ-00026/27 (Personal Pitch sekce) → investorský materiál

---

## David & Claude — Business Accelerator (klíčový narativ)

**Registrováno:** 2026-04-20 | Součást CEO_BRIEF (AIQ-00150) | **Platí pro:** všechny investorské materiály

### Klíčové sdělení

> **"Vše, co vidíte — celá tato platforma — vznikla paralelně při každodenní práci controllera. Ne místo ní. Vedle ní."**

David Gogela je **ekonom a controller** — ne developer. S pomocí AI vyvinul ryze technický enterprise produkt za 7 týdnů, při plném pracovním nasazení jako Head of Group Controlling HOPI Holding (5 divizí, měsíční uzávěrky, vedení týmu).

### Tři pilíře argumentu

**1. AI nezná hranic oboru**
Ekonom + AI = technický produkt. Toto není výjimka — je to nový standard pro každého manažera. Bariéra "nejsem technický" přestala existovat.

**2. Business Akcelerátor — AI pomáhá všude**
- **Procesy** — automatizace, optimalizace, analýza
- **Operativa** — reporting, komunikace, rozhodování v reálném čase
- **Strategie** — scénáře, příležitosti, rizika
- **Nápady** — brainstorming, validace, realizace
Všude. Každý den. Bez výjimky.

**3. Výsledek za 7 týdnů při plném nasazení v HOPI**
17 800+ řádků kódu · 144+ úkolů · v7.21 · enterprise platforma živě · ~$900 investice.
Toto je důkaz efektivity — auditovatelný, git-trackovatelný, nezpochybnitelný.

### Citát Davida Gogely (kanonický)

> *"Před dvěma měsíci bych si to nedokázal představit. Teď, co znám Clauda, mne již nikdo nepřesvědčí o opaku."*
> — David Gogela, Head of Group Controlling · HOPI Holding · zakladatel AppIQ

**Použití citátu:** CEO_BRIEF, Personal Pitch, investor decks, konferenční prezentace.

### Použití v materiálech
- CEO_BRIEF.html — sekce hned pod hero (AIQ-00150)
- Personal Pitch — přidat do sekce BUSINESS DEVELOPMENT
- PROMO web — potenciálně jako testimonial sekce
- Investor deck — opening slide nebo "Why now" sekce

---

## BIZ-00025 — Anthropic Partnership: HOPI AI Lab jako CEE partner

**Priorita:** HIGH | **Target:** 2026-Q3 | **Owner:** David Gogela + Claude | **Registrováno:** 2026-04-20

### Strategický záměr
Oslovit Anthropic s nabídkou partnerství: HOPI AI Lab = jejich výzkumná, implementační a evangelizační laboratoř pro region CEE (CZ, SK, PL, HU, RO — ~80M obyvatel, podpokrytý trh).

### Přidaná hodnota — obě strany

| Pro Anthropic | Pro HOPI |
|---------------|----------|
| Živé enterprise deployment (AppIQ v HOPI Group ~3000 uživatelů) | Zvýhodněný přístup k API (rate limits, pricing) |
| Regionální referenční zákazník — CEE market entry | Technická podpora a early access k novým modelům |
| Lokální know-how a kontakty bez vlastního týmu | PR/brand — "Anthropic CEE Partner" |
| Case studies a data ze středoevropského enterprise prostředí | Možná investiční nebo akelerační spolupráce |

### Akční plán
1. **Research** — zmapovat kontaktní kanály: partnerships stránka Anthropic, LinkedIn, tech konference (Google Cloud Next, Web Summit, CEE summit)
2. **Proposal** — připravit 1-page partnership brief (EN): HOPI, AppIQ, proč jsme správný partner, co nabízíme, co žádáme
3. **Oslovení** — cold email / LinkedIn / přes síť (Anthropic má Prague-based relationships?)
4. **Follow-up** — zoom call → pilot partnerství → formální dohoda

### Klíčový insight
Anthropic v roce 2025–2026 agresivně expanduje do enterprise segmentu mimo US. CEE region je dosud neobsazený — žádný dedikovaný partner. HOPI AI Lab může být první.

---

## BIZ-00026 — Personal Pitch: sekce BUSINESS DEVELOPMENT

**Priorita:** HIGH | **Target:** 2026-Q2 | **Owner:** David Gogela | **Registrováno:** 2026-04-20

### Záměr
Přidat do Personal Pitch samostatnou sekci **BUSINESS DEVELOPMENT** zaměřenou na investory a strategické partnery. Ukázat obchodní trakci, plán a exekuci.

### Navrhovaná struktura sekce

#### Business Track Record — Skutečnost vs. Plán
| Milník | Plán (původní) | Skutečnost | Delta |
|--------|---------------|------------|-------|
| Zahájení vývoje | — | 2025-Q3 | — |
| Finance portál live | 2026-Q1 | 2026-Q1 | ✅ on time |
| AppIQ Studio v7 | 2026-Q2 | 2026-Q1 (early) | ✅ ahead |
| HOPIQ chatbot | 2026-Q2 | 2026-Q1 (early) | ✅ ahead |
| *Doplnit s Davidem — skutečná data* | | | |

#### Business Milestones — Výhled
| Milník | Plánováno |
|--------|-----------|
| AI Lab formalizace (HOPI Holding) | 2026-Q2 |
| HOPI TechIQ s.r.o. — founded | 2026-Q2 |
| Finance portal: všechny divize HOPI | 2026-Q3 |
| CTO / Lead Dev nastoupí | 2026-Q3 |
| B2C SaaS Home — public launch | 2027-07-01 |
| B2B Enterprise launch | 2028-01-01 |
| Series A fundraising | 2027-Q4 |

### Poznámky pro přípravu
- Jazyk: EN primárně pro mezinárodní audience
- Vizualizace: timeline nebo tabulka before/after
- Páruje s BIZ-00027 (Product Development) — obě sekce jdou do stejné prezentace

---

## BIZ-00027 — Personal Pitch: sekce PRODUCT DEVELOPMENT

**Priorita:** HIGH | **Target:** 2026-Q2 | **Owner:** David Gogela | **Registrováno:** 2026-04-20

### Záměr
Přidat do Personal Pitch samostatnou sekci **PRODUCT DEVELOPMENT** — demonstrovat produktovou exekuci, tempo vývoje a technologický záměr. Investoři chtějí vidět, že tým umí doručit.

### Navrhovaná struktura sekce

#### Co bylo postaveno — Product Track Record
| Verze / Feature | Popis | Datum |
|-----------------|-------|-------|
| v1–v5 | Základní Finance portál, SPA architektura | 2025-Q3–Q4 |
| v6 | AppIQ branding, Studio Hub, bilingvní prezentace | 2026-Q1 |
| v7.0–v7.15 | OIL task tracker, Admin Center, DevCenter, PromoCenter | 2026-Q1–Q2 |
| v7.16–v7.20 | HOPIQ chatbot center, Promo L4 cinematic, version selector | 2026-Q2 |
| v7.21 | Music systém, z-index opravy, archive automation | 2026-04-19 |
| *144+ AIQ úkolů splněno* | Celkový objem platformy | 2025–2026 |

#### Product Milestones — Výhled (Roadmap)
| Milník | Popis | Plán |
|--------|-------|------|
| Training Centre | AI vzdělávací modul pro uživatele | 2026-Q2 |
| AI Work Center | Chat, KB, Agents, Prompt Trainer, Budget | 2026-Q2 |
| Finance portál — všechny moduly | Calendar, Tracking, OrgChart, SAP, BNS | 2026-Q3 |
| Mobile-first redesign | Responsive optimalizace pro všechna zařízení | 2026-Q3 |
| B2C product tier | SaaS Home features, freemium onboarding | 2027-Q1 |
| Enterprise tier | White-label, SSO, enterprise admin | 2027-Q3 |
| Mobile app (native) | iOS + Android | 2028-Q1 |

### Klíčový message pro investory
> *"Jeden developer (David) + AI partner (Claude) vybudoval enterprise-grade platformu v 9 měsících. S týmem to bude rocket ship."*

### Poznámky pro přípravu
- Jazyk: EN primárně
- Vizualizace: product roadmap timeline
- Páruje s BIZ-00026 (Business Development)

---

## BIZ-00028 — David & Claude: Business Accelerator (narativ + CEO_BRIEF sekce)

**Datum:** 2026-04-20 | **Status:** IN PROGRESS | **Assignee:** Claude + David

### Záměr
Zachytit a komunikovat příběh spolupráce David+Claude jako klíčový investorský argument a součást platformního záměru. Implementováno jako Section 0 v CEO_BRIEF.html.

### Tři pilíře konceptu
1. **Ekonom+AI synergy** — businessová zkušenost + AI schopnosti = produktový tým bez bariér mezi doménami. David není developer — přesto vznikl enterprise-grade produkt.
2. **Business Accelerator** — AI není nástroj, je to akcelerátor. Claude je přítomen v každém rozhodnutí: architektura, kód, strategie, copy, design.
3. **Výsledek za 7 týdnů** — 17 800+ řádků kódu, 144+ úkolů, 91 git commitů, ~$900 investice, 39h+ přímé práce. Vše auditovatelné z OIL.json + git log.

### Kanonický citát (David Gogela)
> *"Před dvěma měsíci bych si to nedokázal představit. Teď, co znám Clauda, mne již nikdo nepřesvědčí o opaku."*
> — David Gogela, Head of Group Controlling · HOPI Holding · zakladatel AppIQ

### Implementace
- Section 0 přidána do CEO_BRIEF.html (AIQ-00150, commit c3edb69)
- 3 karty + DG avatar + citát blok
- Bilingvní CS/EN

---

## BIZ-00029 — BIZ_HUB.html: Secure Strategic Center

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** Claude + David | **Target:** 2026-04-20

### Záměr
Centrální vstupní stránka pro všechny strategické dokumenty HOPI AppIQ. Jedno heslo, jeden odkaz ke sdílení — a celý strategický svět je odemčen.

### Architektonické rozhodnutí (2026-04-20)
Vybrán přístup **BIZ HUB** (Možnost B) místo peer-to-peer propojení:

| Aspekt | Rozhodnutí |
|--------|-----------|
| Auth | Sdílený localStorage klíč `biz_unlocked` — jednou odemčeno = vše odemčeno |
| Heslo | HOPI2026 (shodné s PERSONAL_PITCH + CEO_BRIEF) |
| Entry point | `BIZ_HUB.html` — nový soubor, čistá brána |
| Subpages | PERSONAL_PITCH + CEO_BRIEF zkontrolují `biz_unlocked` a přeskočí vlastní overlay |
| Navigace | Breadcrumb "← Business Strategic Center" na každém sub-dokumentu |
| Škálování | Nový dokument = nová karta v Hubu, žádná změna auth logiky |

### Karty v MVP (2 kusy)
1. **Personal Pitch** — David Gogela's Vision & Story (PERSONAL_PITCH.html)
2. **CEO Brief** — Business Vision & Platform Architecture (CEO_BRIEF.html)

### Budoucí karty (roadmap)
- Investor Deck (BIZ-00026 výstup)
- Market Strategy (BIZ-00035 výstup)
- Team & Start (BIZ-00036 výstup)
- Product Roadmap (BIZ-00027 výstup)

### Design
- Dark glassmorphism (#04061A), HOPI AppIQ branding, CS/EN
- Sdílí story_personal.mp3 + `<script src="../../_hopiq.js">` architekturu
- OG image pro sdílení (BIZ_HUB specifický)

### Poznámky k implementaci
- PERSONAL_PITCH.html: auth refactor XS (přidat `biz_unlocked` check před vlastní overlay)
- CEO_BRIEF.html: stejný XS refactor
- BIZ_HUB.html: nový soubor S effort (nová stránka, 2 karty, same design language)
- Nasadit jako hotfix do v7.21

---

## BIZ-00005 až BIZ-00023 — Kapacitní plán + Nábor + Infrastruktura (batch OPEN)

**Datum registrace:** 2026-04-19 | **Status:** OPEN | **Batch skupina**

Skupina strategických OPEN tasků pro Phase 1–2 roadmap. Práce na těchto úkolech nezačala — jsou placeholdery pro budoucí implementaci po validaci HOME B2C.

| ID | Oblast | Záměr |
|----|--------|-------|
| BIZ-00005 | Kapacita | B2B Pilot HOPI GROUP — rollout na divize po validaci |
| BIZ-00006 | Kapacita | B2C SaaS Home launch target 01.07.2027 |
| BIZ-00007 | Struktura | Přechod HOPI AI Lab → HOPI TechIQ s.r.o. (právní transformace) |
| BIZ-00009 | Nábor | CTO / Head of Engineering — první klíčová hire po Davidovi |
| BIZ-00010 | Nábor | Full-stack developer(s) 2–3 pozice |
| BIZ-00011 | Nábor | AI/ML Engineer |
| BIZ-00012 | Nábor | Product Manager + UX/UI Designer |
| BIZ-00014 | Infra | Cloud infrastruktura — design a setup produkčního prostředí |
| BIZ-00015 | Pricing | Pricing strategie B2C SaaS Home |
| BIZ-00016 | GTM | Go-to-Market strategie B2C SaaS Home |
| BIZ-00017 | Brand | Brand identity HOPI TechIQ (oddělení od HOPI Group corporate brandu) |
| BIZ-00018 | Billing | Billing a payment infrastruktura — SaaS subscriptions |
| BIZ-00019 | Support | Support infrastruktura — helpdesk, knowledge base, onboarding |
| BIZ-00020 | Security | Security audit a compliance před B2C launchem |
| BIZ-00021 | Beta | B2C SaaS Home closed beta program Q1 2027 |
| BIZ-00023 | Enterprise | B2B SaaS Enterprise — pricing, smlouvy, enterprise onboarding |

Pořadí aktivace: nejdříve BIZ-00015+00016 (pricing + GTM), pak nábor (BIZ-00009+), pak infrastruktura.

---

## BIZ-00030 až BIZ-00056 — Product Design + Investor + Anthropic (batch OPEN, 2026-04-20)

**Datum registrace:** 2026-04-20 | **Status:** OPEN | **Batch skupina**

Skupina tasků registrovaných při architektonické session 2026-04-20. Pokrývá product design dokumentaci, investor materiály a Anthropic partnership přípravu.

**Podskupiny:**

**Product Design (BIZ-00030–00036):**
Studio, Publication Layer, Market Strategy, Enterprise/Home Vertical Taxonomy, Manifest systém — výstupy pro investor deck a product positioning.

**Investor materiály (BIZ-00037–00046):**
BIZ HUB Product Design sekce, Investor WEB (INVEST zóna), MARKET website, Pricing Matrix (prerekvizita pro investor deck), Legal layer, Business Model Matrix (BIZ-00042 viz níže), Workflow positioning, Smart Document Hub business case, Design Lab USP, AI-First marketing spec.

**Anthropic Partnership (BIZ-00048–00056):**
Navázání kontaktu (BIZ-00048 TOP priorita — LinkedIn outreach Steve Corfield), pitch příprava, smlouva, API pricing, joint sessions, feedback loop, enterprise integrations roadmap, HOPI+Anthropic PROMO sekce.

---

## BIZ-00042 — Business Model Matrix (2026-04-20)

**Datum:** 2026-04-20 | **Status:** REVIEW | **Assignee:** Claude + David

Multidimenzionální matice obchodního modelu pro investor deck a GTM. Pokrývá 9D model × cenové tiery × zákaznické segmenty × revenue streams. Vytvořena jako `HOPI_TechIQ/DOCS/architecture/BUSINESS_MODEL_MATRIX.md` (267 řádků). Čeká na Davidův final sign-off.

---

## BIZ-00057 až BIZ-00100 — Strategic Recon (batch OPEN, 2026-04-21)

**Datum registrace:** 2026-04-21 | **Status:** OPEN | **Batch skupina**

97 strategických tasků registrovaných po morning brainstorming session 2026-04-21. Kompletní obsah viz `_SESSION_START/BRAINSTORM_LOG.md`.

**6 oblastí BOIL (BIZ-00057–00100):**

| Oblast | IDs | Téma |
|--------|-----|------|
| A. Feasibility | BIZ-00057–00063 | TAM/SAM/SOM, MVP, finanční model, GDPR, právní struktura, KPI, CAC |
| B. Customer Personas | BIZ-00064–00074 | H1–H4 HOME personas, E1–E4 Enterprise personas, journey map, WTP |
| C. Stakeholders | BIZ-00075–00080 | Akcionář, CEO, IT ředitel, CFO, End user, Stakeholder mapa |
| D. Competitive | BIZ-00081–00086 | Enterprise + HOME konkurenti, AI startupy, positioning matrix, Blue Ocean |
| E. Anthropic Partnership | BIZ-00087–00093 | HOPI AI Lab koncept, value prop, pitch, demo, kontaktní strategie, ROI |
| F. Marketing | BIZ-00094–00100 | HOME B2C marketing, HOPI pilot komunikace, founder brand, early adopters |

**2 oblasti OIL (AIQ-00261–00279):**
G. SW Stack (AIQ-00261–00269) + H. Design Lab (AIQ-00270–00279) — viz OIL_CONTEXT.md.

**Zbývající oblasti (zatím neregistrovány):**
I. Legal firma (11 tasků), J. Legal produkt (12 tasků), K. Business Ops (10 tasků) — registrace příští session jako BIZ-00101+.

---

## BIZ-00031 — Product Specification: Studio — kompletní vývojové prostředí

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** Claude + David
Specifikace Studio zóny jako kompletního SW vývojového prostředí (Design Lab, DevCenter, TestCenter, AdminCenter, Workflow Designer). Výstup: produktová spec dokument pro investor deck + implementační zadání. Zdroj: architektonická session 2026-04-20.

---

## BIZ-00032 — Product Specification: Publication Layer — App Catalog + Templates + Builder

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** Claude + David
Specifikace Publication Layer: jak vznikají a publikují se aplikace v Marketplace (App Catalog, Template Store, Builder wizard). Výstup: produktová spec pro investor deck. Zdroj: architektonická session 2026-04-20.

---

## BIZ-00033 — Product Vision: Tržní strategie a škálování (Enterprise / SMB / Home)

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** David + Claude
Definice tržní strategie pro tři segmenty — jak platforma škáluje od HOME B2C přes SMB až po Enterprise. Go-to-market logika per segment. Výstup: vision dokument pro investor deck. Zdroj: architektonická session 2026-04-20.

---

## BIZ-00034 — Product Design: Enterprise Vertical Taxonomy — kompletní katalog business domén

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** Claude
Kompletní katalog Enterprise vertikál (industry × domain × compliance). Výstup: `MARKETPLACE/_registry/enterprise-catalog.json` + dokumentace. Navazuje na 9D model (DIM 3). Zdroj: architektonická session 2026-04-20.

---

## BIZ-00038 — Investor WEB: INVEST zóna — Product Design promo (investor-grade)

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** Claude + David
Investor-grade promo web v INVEST zóně platformy — vizuálně silná prezentace product designu pro external investory a partnery. Navazuje na INVESTOR_BRIEF.html (AIQ-00231). Zdroj: architektonická session 2026-04-20.

---

## BIZ-00039 — MARKET website — veřejný marketing web (akvizice zákazníků)

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** Claude + David
Veřejný MARKET web pro B2C akvizici — landing page, pricing, feature highlights, sign-up. Fáze 2 (po validaci HOME B2C pilotu). Zdroj: architektonická session 2026-04-20.

---

## BIZ-00040 — Pricing Matrix: Tier × Feature × 9D model

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** David + Claude
Business rozhodnutí: cenové tiery (Free / Pro / Team / Enterprise) namapované na 9D model a feature sety. Prerekvizita pro investor deck a GTM. Priorita: David primárně. Zdroj: architektonická session 2026-04-20.

---

## BIZ-00041 — Legal Layer Strategy: ToS, SLA, Privacy Policy, GDPR

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** David (+ právník)
Právní rámec platformy: Terms of Service, SLA, Privacy Policy, GDPR compliance. Musí být hotovo před HOME B2C launchem (day 1 požadavek). Navazuje na Strategic Recon oblast J (BIZ-001xx). Zdroj: architektonická session 2026-04-20.

---

## BIZ-00043 — Workflow + Process product positioning

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** David + Claude
Jak komunikovat Workflow/Process vrstvu (5. architektonická vrstva) investorům a zákazníkům — business language, ne technický popis. Výstup: positioning statement + slide pro investor deck. Zdroj: architektonická session 2026-04-20.

---

## BIZ-00044 — Smart Document Hub: business case + Phase 1 HOME B2C positioning

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** Claude + David
Business case pro Smart Document Hub jako klíčovou Phase 1 HOME B2C feature — willingness to pay, diferenciace, AI value prop. Výstup: business case dokument. Zdroj: architektonická session 2026-04-20.

---

## BIZ-00045 — Design Lab: Studio USP — AI-powered unified design/test/docs prostředí

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** Claude + David
USP positioning Design Labu jako konkurenční výhody Studia — "AI-powered, unified, zero-context-switching." Výstup: USP statement + slide. Zdroj: architektonická session 2026-04-20.

---

## BIZ-00046 — Fully Integrated AI Solution: AI Presence Inventory + marketingová spec

**Datum:** 2026-04-20 | **Status:** OPEN | **Assignee:** Claude
AI presence inventory — mapování všech AI touchpointů v platformě per vrstva. Marketingová spec "AI není feature, AI je páteř." Výstup: AI marketing spec dokument (viz CLAUDE.md sekce AI-FIRST MARKETING SPEC). Zdroj: architektonická session 2026-04-20.

---

## BIZ-00047 — CEO Brief: denní komunikační proces (TOTAL AGILE řízení)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Implementace TOTAL AGILE principu — CEO Brief se odesílá každý den, management vidí progress průběžně. Navazuje na AIQ-00237 (teaser), AIQ-00238 (TOTAL AGILE slide), AIQ-00239 (daily send system). Zdroj: strategické rozhodnutí David Gogela 2026-04-21.

---

## BIZ-00049 — Anthropic: příprava partnerské propozice (pitch)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Příprava pitch dokumentu pro Anthropic — co nabízíme, co potřebujeme, proč jsme zajímavý partner (CEE trh, enterprise use case, feedback loop). Navazuje na BIZ-00048 (první kontakt) a BIZ-00090 (E4 pitch dokument). Zdroj: Strategic Recon oblast E.

---

## BIZ-00050 — Anthropic: partnerská smlouva (commercial, licensing, SLA)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David (+ právník)
Smluvní rámec pro Anthropic partnership — commercial conditions, API licensing, SLA. Navazuje na úspěšný první kontakt (BIZ-00048) a pitch (BIZ-00049). Zdroj: Strategic Recon oblast E.

---

## BIZ-00051 — Anthropic: vyjednání API pricing (vstřícná cenová politika)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David
Vyjednání preferenčního API pricing pro HOPI TechIQ — startup/partner pricing, volume commitments, enterprise tiers. Prerekvizita pro finanční model (BIZ-00059). Zdroj: Strategic Recon oblast E.

---

## BIZ-00052 — Anthropic: plán joint team sessions (osobní setkávání)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David
Navázání pravidelného kontaktu s Anthropic týmem — kvartální joint sessions, produktový feedback, roadmap alignment. Zdroj: Strategic Recon oblast E.

---

## BIZ-00053 — Anthropic: feedback loop z firemní praxe pro modely

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Strukturovaný feedback loop — HOPI TechIQ jako "living lab" pro Anthropic modely v enterprise/home kontextu. Real-world data z HOPI Group pro zlepšení modelů. Zdroj: Strategic Recon oblast E.

---

## BIZ-00054 — Anthropic: enterprise integrations roadmap (SAP, Monday, MS365)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** Claude + David
Roadmapa enterprise integrací relevantních pro Anthropic partnership — SAP, Monday.com, Microsoft 365, SharePoint. Ukazuje Anthropic hloubku enterprise záběru. Zdroj: Strategic Recon oblast E.

---

## BIZ-00055 — Anthropic pitch: sekce Prezentace HOPI + záměr HOPI AppIQ

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** Claude + David
Pitch sekce: kdo je HOPI Group, co je HOPI AppIQ, proč AI Claude je správná volba. "HOPI AppIQ by HOPI Technology powered by AI Claude by Anthropic." Výstup: pitch slide/sekce. Zdroj: Strategic Recon oblast E + INVESTOR_BRIEF.html.

---

## BIZ-00058 — A2 Strategic Recon: MVP definice HOPI AppIQ

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Definice minima pro první uživatele HOME B2C — co musí fungovat v den 1, co může počkat. Výstup: MVP scope dokument. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast A.

---

## BIZ-00059 — A3 Strategic Recon: Finanční model Phase 1

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David
Náklady (API, hosting, dev) vs. revenue Phase 1. Cashflow před prvním €. Výstup: P&L model (Excel/Sheet). Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast A.

---

## BIZ-00060 — A4 Strategic Recon: GDPR/compliance landscape pro HOME B2C

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** Claude
Co musíme mít den 1 pro HOME B2C — GDPR, osobní data rodin, cookie policy. Výstup: compliance checklist. Kritické: HOME B2C = osobní data. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast A.

---

## BIZ-00061 — A5 Strategic Recon: Právní struktura HOPI TechIQ s.r.o.

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David
Timing založení HOPI TechIQ s.r.o. + IP ownership od začátku. Výstup: rozhodnutí + timeline. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast A.

---

## BIZ-00062 — A6 Strategic Recon: KPI framework pro Phase 1

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Jak poznáme, že Phase 1 funguje — DAU, revenue, NPS, retention. Výstup: KPI framework dokument. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast A.

---

## BIZ-00063 — A7 Strategic Recon: Customer acquisition strategie (prvních 100 uživatelů)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Kanály, CAC, jak získat prvních 100 HOME B2C uživatelů. Výstup: CAC playbook. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast A.

---

## BIZ-00065 — B2 Strategic Recon: Persona H2 — Pár (sdílené finance, plánování)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Customer persona pro HOME segment H2 — pár, sdílené finance, společné plánování. Výstup: persona karta. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast B.

---

## BIZ-00066 — B3 Strategic Recon: Persona H3 — Rodina s dětmi

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Customer persona HOME H3 — rodina s dětmi, vzdělání, zdraví, budget management. Výstup: persona karta. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast B.

---

## BIZ-00067 — B4 Strategic Recon: Persona H4 — Rozšířená rodina / majitel firmy

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Customer persona HOME H4 — rozšířená rodina nebo majitel firmy s komplexními potřebami. Výstup: persona karta. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast B.

---

## BIZ-00068 — B5 Strategic Recon: Persona E1 — CEO / Top manažer

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Customer persona Enterprise E1 — CEO, co chce, čeho se bojí, jak rozhoduje o SW. Výstup: persona karta. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast B.

---

## BIZ-00069 — B6 Strategic Recon: Persona E2 — CFO / Finance ředitel

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David
Customer persona Enterprise E2 — CFO perspektiva: cost reduction, ROI, compliance, reporting. Výstup: persona karta. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast B.

---

## BIZ-00070 — B7 Strategic Recon: Persona E3 — IT ředitel / CTO

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Customer persona Enterprise E3 — IT ředitel: security, integrace, maintainability, vendor lock-in obavy. Výstup: persona karta. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast B.

---

## BIZ-00071 — B8 Strategic Recon: Persona E4 — Veřejná správa / státní správa

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** Claude
Customer persona Enterprise E4 — specifika veřejné a státní správy (compliance, procurement, bezpečnost dat). Výstup: persona karta. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast B.

---

## BIZ-00072 — B9 Strategic Recon: Customer journey map (discovery → adoption, per segment)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** Claude
Journey mapa od discovery po adopci pro každý zákaznický segment. Klíčové touchpointy, friction points, AI moments. Výstup: journey mapa dokument. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast B.

---

## BIZ-00073 — B10 Strategic Recon: David jako zákazník (co mi chybí)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David (primárně)
David hraje roli zákazníka — co mu chybí, co nefunguje, co by zaplatil. Primárně David, výstup: findings list. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast B.

---

## BIZ-00074 — B11 Strategic Recon: Willingness to pay analýza (cena vs. hodnota per segment)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Analýza ochoty platit per zákaznický segment — benchmark, conjoint analýza, pricing input. Prerekvizita pro BIZ-00040 (Pricing Matrix). Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast B.

---

## BIZ-00076 — C2 Strategic Recon: Stakeholder CEO — efektivita, competitive edge

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
CEO stakeholder perspektiva: co chce od platformy, jak ji obhájí boardu, competitive edge argument. Výstup: stakeholder brief. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast C.

---

## BIZ-00077 — C3 Strategic Recon: Stakeholder IT ředitel — security, integrace

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
IT ředitel stakeholder perspektiva: security requirements, integrace s existujícím SW stackem, maintainability. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast C.

---

## BIZ-00078 — C4 Strategic Recon: Stakeholder CFO — cost reduction, reporting, compliance

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
CFO stakeholder perspektiva: měřitelné cost reduction, reporting schopnosti, compliance zajištění. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast C.

---

## BIZ-00079 — C5 Strategic Recon: Stakeholder End user HOME — jednoduchost, speed, value

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
End user HOME perspektiva: co ho přesvědčí, co ho udrží, co ho vytlačí. Jednoduchost, rychlost time-to-value, denní engagement. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast C.

---

## BIZ-00080 — C6 Strategic Recon: Stakeholder mapa

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** Claude
Vizualizace všech stakeholderů — zájmy, vliv, priority, konflikty. Výstup: stakeholder mapa (diagram + tabulka). Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast C.

---

## BIZ-00082 — D2 Strategic Recon: HOME konkurenti (YNAB, Notion, Google Workspace, Apple)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Analýza HOME segmentu konkurentů — YNAB (finance), Notion (produktivita), Google Workspace, Apple ecosystem. Features, pricing, slabiny. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast D.

---

## BIZ-00083 — D3 Strategic Recon: AI-first startupy (global + CEE landscape)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** Claude
Mapování AI-first startupů relevantních pro náš positioning — globálně + CEE specificky. Kdo může být hrozba, kdo partner. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast D.

---

## BIZ-00084 — D4 Strategic Recon: Positioning matrix (cena × AI zralost × UX)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** Claude + David
2D/3D positioning matrix — kde jsme my vs. konkurenti na osách cena, AI zralost, UX jednoduchost. Výstup: positioning diagram. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast D.

---

## BIZ-00085 — D5 Strategic Recon: Blue Ocean analýza

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** Claude + David
Blue Ocean analýza — kde nejsme v přímé konkurenci, jaký prostor je volný. Strategy Canvas. Výstup: Blue Ocean dokument. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast D.

---

## BIZ-00086 — D6 Strategic Recon: Naše differentiators (top 5 důvodů proč nás)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Top 5 důvodů proč zákazník vybere HOPI AppIQ místo alternativ. Musí být konkrétní, měřitelné, obhajitelné. Výstup: differentiator statement list. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast D.

---

## BIZ-00088 — E2 Strategic Recon: Value proposition pro Anthropic

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Co nabízíme Anthropic: CEE enterprise trh, real-world feedback loop, reference customer, HOPI Group jako living lab. Výstup: value prop dokument. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast E.

---

## BIZ-00089 — E3 Strategic Recon: Co potřebujeme od Anthropic (needs list)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Náš needs list vůči Anthropic: preferenční API pricing, technical support, joint marketing, early access. Výstup: needs dokument pro vyjednávání. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast E.

---

## BIZ-00090 — E4 Strategic Recon: Pitch dokument pro Anthropic (1 strana)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Executive summary pitch — 1 strana, max 5 minut čtení. Kdo jsme, co stavíme, proč Anthropic, co nabízíme, co chceme. Výstup: pitch PDF/dokument. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast E.

---

## BIZ-00091 — E5 Strategic Recon: Demo příprava pro Anthropic (wow moment)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Příprava wow moment dema pro Anthropic — co ukážeme, v jakém pořadí, jaký příběh vyprávíme. Script + demo flow. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast E.

---

## BIZ-00092 — E6 Strategic Recon: Kontaktní strategie pro Anthropic

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David
Jak kontaktujeme Anthropic — LinkedIn (Steve Corfield BIZ-00048), email, referral, event. Timing, pořadí kroků, fallback. Výstup: kontaktní plán. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast E.

---

## BIZ-00093 — E7 Strategic Recon: ROI case pro Anthropic

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** Claude + David
Proč je HOPI TechIQ zajímavý partner pro Anthropic — ROI argumentace: market size, feedback value, referencovatelnost, CEE expansion. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast E.

---

## BIZ-00095 — F2 Strategic Recon: HOPI pilot interní komunikace (storytelling)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Jak komunikovat HOPI pilot interně — příběh "stavíme to pro sebe → víme že to funguje → prodáváme světu." Výstup: interní komunikační plán. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast F.

---

## BIZ-00096 — F3 Strategic Recon: David jako founder (thought leadership, LinkedIn)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David
David Gogela jako veřejná tvář HOPI TechIQ — LinkedIn thought leadership, founder story, osobní brand. Navazuje na PERSONAL_PITCH.html. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast F.

---

## BIZ-00097 — F4 Strategic Recon: Early adopter program (prvních 100 uživatelů)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Program pro prvních 100 HOME B2C uživatelů — jak je najít, co jim nabídnout, jak z nich udělat advocates. Navazuje na BIZ-00063 (CAC playbook). Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast F.

---

## BIZ-00098 — F5 Strategic Recon: Content strategie

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Content jako marketing — blog, case studies, dokumentace jako SEO + trust building. Editorial calendar, formáty, kanály. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast F.

---

## BIZ-00099 — F6 Strategic Recon: PR strategie (CEE tech story)

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
PR úhel: HOPI TechIQ jako CEE tech story — "česká firma buduje AI platformu s Anthropic." Novinářský hook, target media, timing. Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast F.

---

## BIZ-00100 — F7 Strategic Recon: Influencer a community strategie

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** David + Claude
Influencer marketing pro HOME B2C — micro influenceři, tech community, finance KOL. Navazuje na oblast F (marketing). Zdroj: BRAINSTORM_LOG.md 2026-04-21 oblast F.

---

## BIZ-00101 — Hudba jako výchozí platformové pravidlo TechIQ — schváleno

**Datum:** 2026-04-21 | **Status:** CLOSED | **Assignee:** David Gogela

Strategické rozhodnutí: hudba = default ON na VŠECH stránkách TechIQ platformy. Výjimky jen explicitně domluvené (bomb efekt atd.). Každá oblast má vlastní hudební + grafickou úpravu. Implementace: AIQ-00281 (pravidlo do CLAUDE.md) + AIQ-00282 (implementace na chybějících stránkách).

---

## BIZ-00102 — B2C vstup potvrzen 01.01.2027

**Datum:** 2026-04-21 | **Status:** CLOSED | **Assignee:** David Gogela

B2C launch = 01.01.2027. Dříve nelze z právních důvodů: registrace HOPI TechIQ s.r.o., ochrana obchodní značky, partnerské smlouvy (Anthropic apod.). Investor materiály musí být aktualizovány — INVESTOR_BRIEF "90 Days → Q3 2026" je zastaralé, přepracovat (AIQ-00288).

---

## BIZ-00103 — Refaktoring strategické dokumentace — 3 oblasti

**Datum:** 2026-04-21 | **Status:** OPEN | **Assignee:** Claude | **Plán na:** 2026-04-22

### Záměr
Strategické rozhodnutí Davida Gogely (2026-04-21): současné pojmenování dokumentů je matoucí. CEO Brief byl původně zamýšlen jako denní/týdenní newsletter pro vedení, ale obsah se prolíná s investor materiálem. Investor Brief je příliš monolitický — Vision a Case jsou dvě různé věci pro dvě různá publika.

### Cílová struktura (3 dokumenty)

**1. Business Brief** (přejmenování CEO_BRIEF.html → BUSINESS_BRIEF.html)
- Publikum: CEO, management HOPI, interní stakeholders
- Obsah: Daily/weekly newsletter — Daily Teaser, git commits, nové funkce, metriky pokroku, klíčová rozhodnutí
- Tón: operativní, aktuální, přehledný
- Odstranit: investor pitch obsah, Anthropic partnership teaser, CEE→WorldWide
- Přidat: timeline aktivit, co je hotovo vs. co se chystá

**2. Business Vision** (nový soubor BUSINESS_VISION.html, obsah z části INVESTOR_BRIEF)
- Publikum: majitelé HOPI, potenciální investoři — "proč a kam"
- Obsah: 9D model, Phase 1-3 roadmap, market opportunity, AI strategie, Anthropic partnership ambice, spin-off záměr
- Tón: inspirativní, strategický, méně čísel více příběhu
- OG image: nový "Business Vision" oranžový (aktuální CEO OG image vyhovuje)

**3. Business Case** (přejmenování INVESTOR_BRIEF.html → BUSINESS_CASE.html)
- Publikum: investoři, majitelé — "kolik, kdy, proč se to vyplatí"
- Obsah: 8 týdnů, ~$1k, 109 commitů, valuace €200k–500k, investment ask, ROI model, timeline
- Tón: konkrétní, číselný, důvěryhodný
- OG image: fialový "Business Case" (aktuální investor OG image vyhovuje)

### Technický plán implementace

**Krok 1 — Nové soubory**
- Duplikovat CEO_BRIEF.html → BUSINESS_BRIEF.html, pročistit obsah
- Duplikovat INVESTOR_BRIEF.html → BUSINESS_CASE.html, ponechat čísla
- Extrahovat Vision sekce z INVESTOR_BRIEF → BUSINESS_VISION.html

**Krok 2 — INVESTOR_ENTRY.html → gateway pro všechny 3**
- Přidat karty pro Business Brief, Business Vision, Business Case
- Zachovat funkci "vstupní brány" s heslem nebo bez

**Krok 3 — Aktualizace navigace**
- PERSONAL_PITCH: quick links → Business Brief + Business Vision + Business Case
- PORTAL_PRESENTATION: odkaz na nové soubory
- CEO_BRIEF + INVESTOR_BRIEF: redirect nebo zachovat s odkazem na nové

**Krok 4 — OG images**
- CEO OG (oranžový, Business Vision) → přesunout na BUSINESS_VISION
- Investor OG (fialový, Business Case) → přesunout na BUSINESS_CASE
- Nový OG pro Business Brief (zelený? jiná barva?)

**Krok 5 — Archivace starých souborů**
- CEO_BRIEF.html + INVESTOR_BRIEF.html zachovat jako redirecty nebo archivovat

---

## BIZ-00105 — Anthropic Fáze 0 — 3 akční kroky: připravené drafty

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** David Gogela | **Plán na:** 2026-04-23 | **Čas:** 55 minut

---

### DRAFT 1 — Anthropic Startup Program (formulářová pole)

**Product name:** HOPI AppIQ

**Website / live demo:**
`h-gr-fico.github.io/appiq/v7.24/HOPI_AppIQ_WebPage/Development/INVESTOR_BRIEF.html`
*(password: HOPI2026)*

**What are you building?**
> HOPI AppIQ is a modular AI-powered application platform for enterprise and home users, built on Claude API. Phase 1: internal pilot at HOPI Group — a Central European holding (logistics, food, agriculture, €0.5B valuation, 8 countries) — plus a B2C SaaS launch planned for January 2027. The platform allows any business to deploy AI-powered apps without an engineering team, from Group Controlling dashboards to family finance management.

**How are you using Claude?**
> Claude powers HOPIQ — our embedded AI assistant present on every platform page. Beyond the product, Claude was the co-developer: 109 git commits, ~$1,000 in total API costs, 8 weeks from zero to live production. 1 person + Claude = new model of software development.

**Team size:** 1 (David Gogela, Head of Group Controlling, HOPI Holding) + Claude AI

**Stage:** Live prototype, internal pilot running, B2C launch 01.01.2027

**Geography / market:** CEE — Czech Republic, Slovakia, Poland, Hungary, Romania, Germany, Bulgaria, Croatia

**Why do you need credits?**
> To reduce cost barriers during our internal pilot phase and accelerate the path to B2C launch. We're building a reference case for what Claude can enable in Central Europe — a region where Anthropic currently has minimal presence. HOPI Group = a credible, established company proving AI works in a real enterprise environment.

---

### DRAFT 2 — LinkedIn post (od Davida osobně, anglicky)

> **1 person. 1 AI. 8 weeks. Enterprise platform — live.**
>
> I'm Head of Group Controlling at HOPI Holding — a Central European logistics & food group operating in 8 countries.
>
> In February 2026, I started building an AI-powered application platform. Not a proof of concept. A real product, live in production.
>
> The numbers:
> 🔹 109 git commits
> 🔹 ~$1,000 in total cost
> 🔹 8 weeks, 1 person
> 🔹 Powered by Claude · @Anthropic
>
> HOPI AppIQ is now running as our internal Group Controlling portal. Next: B2C SaaS launch January 2027.
>
> We're a €0.5B holding company that decided to build our own AI platform instead of buying one. And we're doing it from Central Europe.
>
> This is what's possible when you combine domain expertise, the right AI infrastructure, and the courage to just build.
>
> 👉 Live demo: [odkaz — dosadit URL INVESTOR_BRIEF v7.24]

---

### DRAFT 3 — DM přímý kontakt (LinkedIn, anglicky)

> Hi [jméno],
>
> I'm building HOPI AppIQ — an AI-powered enterprise platform for Central Europe, running on Claude. 1 person, 8 weeks, live in production at HOPI Group (€0.5B holding, 8 countries).
>
> Happy to share the story — think it might be an interesting use case from a market where Anthropic has limited presence so far.
>
> Live demo here if you're curious: [odkaz] (password: HOPI2026)

---

### Postup pro Davida zítra

1. **Krok 1 · 10 min** — Najít Anthropic Startup Program na anthropic.com → For Businesses. Zkopírovat výše uvedené drafty do formuláře. Přiložit URL.
2. **Krok 2 · 30 min** — Zkopírovat LinkedIn post draft, doplnit URL, upravit dle uvážení, publikovat z osobního profilu.
3. **Krok 3 · 15 min** — LinkedIn search: "Anthropic Developer Relations" nebo "Anthropic Partnerships". Vybrat 1 osobu aktivně postující o Claude. Poslat DM draft.

---

## BIZ-00104 — Anthropic — Cesta ke strategickému partnerství

**Datum:** 2026-04-22 | **Status:** IN PROGRESS | **Assignee:** Claude

### Záměr
Strategické rozhodnutí Davida Gogely (2026-04-22): ambice "strategické partnerství s Anthropicem" je při pohledu zvenku potenciálně naivní claim (HOPI vs. $61,5 mld valuace). Řešení: přepracovat na 4-fázovou journey — kontrast přestává být slabostí a stává se příběhem. David vs Goliáš = sebeuvědomělý, důvěryhodný přístup.

### Klíčová rozhodnutí
- "David vs Goliáš" slide = záměrný kontrast, ne omluva. HOPI Group €0,5 mld + 30 let zakotví AppIQ jako serious player.
- Fáze 0 = akce na 2026-04-23 (zítra): 3 kroky, 55 minut, výstup: $25k–$100k kreditů + kontakt v Anthropic CRM
- Anthropic Startup Program = primární vstupní bod (API kredity + přidělený kontakt)
- "Partnerství si zasloužíme" = závěrečný tone — pokora + ambice zároveň
- Standalone stránka ANTHROPIC_JOURNEY.html vznikne při BIZ-00103 refaktoru; teď obsah v INVESTOR_BRIEF.html

### Implementace
- AIQ-00301: David vs Goliáš + Journey sekce vloženy do INVESTOR_BRIEF.html, nasazeno v7.24

---

## BIZ-00106 — Budget optimalizace + cash injection: strategie šetření a přítoku zdrojů

**Datum:** 2026-04-22 | **Status:** OPEN | **Assignee:** David Gogela + Claude

### Záměr
David explicitně požaduje šetření Claude Code budgetu a přemýšlení o přítoků zdrojů (kredity, granty, revenue). Dvě osy: (A) šetřit — efektivní práce se sessions, (B) přitéct — startup programy, granty, interní budget, early revenue.

---

### OSA A — Šetření: Claude Code session pravidla

**Pravidlo 1 — 1 session = 1 téma**
Nikdy nespojovat deploy + architektura + Anthropic outreach. Každé téma = vlastní session. Startup overhead je fixní cena — plaťme ho jednou za téma, ne vícekrát za víc témat najednou.

**Pravidlo 2 — Velké soubory jen když nutné**
OIL.json, index.html, INVESTOR_BRIEF.html — každý je drahý na čtení. Nečíst pokud BRIEFING.md postačuje. David by neměl říkat "přečti OIL" pokud nepotřebuje konkrétní data z něj.

**Pravidlo 3 — Claude upozorní na restart**
Signály pro restart session: 60+ minut v chatu, 3+ velké soubory přečteny, přechod mezi streamy (Legacy ↔ TechIQ), degradace kvality odpovědí (ptám se na věci co jsem četl).

**Pravidlo 4 — Obrázky/screenshoty jen když nutné**
Screenshoty jsou drahé tokeny. Posílat pouze pokud Claude explicitně potřebuje vidět UI.

**Pravidlo 5 — Krátké a přesné prompty**
Dlouhý kontext = vyšší cena. David píše co chce, ne proč chce. Claude zná projekt — nepotřebuje opakovat historii v každém promptu.

**Pravidlo 6 — Batch práce v jedné session**
Mít připravené soubory, data a rozhodnutí PŘED spuštěním session. Minimalizovat "moment čekání" kdy Claude nic nedělá.

---

### OSA B — Cash injection: přehled příležitostí

#### B1 — Anthropic Startup Program ⭐ PRIORITA 1
- **Co:** API kredity $25k–$100k na 1 rok
- **Podmínky:** early-stage startup, aktivně staví s Claude API
- **Akce:** BIZ-00105 / Fáze 0 — 2026-04-23, 10 minut vyplnění formuláře
- **Výsledek:** Snížení API nákladů na 0 po dobu pilotu + přidělený kontakt v Anthropic
- **URL:** anthropic.com → For Businesses → Startup Program
- **Odhad úspory:** $3k–$10k ročně při aktuálním usage

#### B2 — AWS Activate ⭐ PRIORITA 2
- **Co:** AWS cloudu kredity až $100k, Trusted Advisor, podpora
- **Podmínky:** startup v pre-revenue nebo early revenue fázi
- **Relevance pro AppIQ:** hosting backendu v9.x+, S3 pro document storage, Lambda pro API gateway
- **Akce:** Registrace na aws.amazon.com/activate — vyžaduje seed funding nebo inkubátor doporučení (alternativně: přímá aplikace jako "Indie" tier — $1k kreditů bez podmínek)
- **Doporučení:** Aplikovat Indie tier teď ($1k bez podmínek), Founders tier ($25k) až po HOPI TechIQ s.r.o. registraci

#### B3 — Microsoft for Startups Founders Hub
- **Co:** Azure kredity $150k, GitHub Copilot, M365, LinkedIn Premium, OpenAI credits
- **Podmínky:** registered company, early stage
- **Relevance:** Azure hosting, Teams integrace (connector Layer v10.x), Power BI
- **Akce:** foundershub.startups.microsoft.com — aplikovat po registraci HOPI TechIQ s.r.o.
- **Bonus:** LinkedIn Sales Navigator (David Build in Public) a GitHub Copilot zdarma

#### B4 — Google for Startups
- **Co:** GCP kredity $200k, Google Workspace, Gemini API
- **Podmínky:** early stage, bez požadavku na investora
- **Relevance:** GCP jako alternativní hosting, Workspace pro tým
- **Poznámka:** Nižší priorita — Anthropic/AWS fit je silnější pro AppIQ stack

#### B5 — CzechInvest — OP TAK granty (EU fondy)
- **Co:** EU strukturální fondy pro digitalizaci a AI inovace
- **Relevance:** AppIQ = AI platforma pro CZ firmy = přesně target OP TAK (Operační Program Technologie a Aplikace pro Konkurenceschopnost)
- **Výzvy:** Inovační vouchery (malé granty 0,1–1M Kč), větší výzvy pro AI
- **Podmínky:** CZ firma, projekt musí mít jasný dopad na CZ ekonomiku
- **Akce:** czechinvest.org → Dotace → OP TAK. Kontaktovat regionální kancelář CzechInvestu.
- **Odhad:** 0,5–3M Kč (v závislosti na výzvě a přípravě žádosti)
- **Riziko:** Administrativně náročné, nutný external konzultant (běžně 10–15% z grantu jako success fee)

#### B6 — HOPI IT Budget — interní financování ⭐ STRATEGICKY KLÍČOVÉ
- **Co:** Formální schválení IT projektu v HOPI Group s přiděleným budgetem
- **Argument pro CEO/CFO:** "Platíme $X/měsíc za software který budujeme interně. Alternativa = $500K–2M EUR za komerční řešení."
- **Forma:** Interní projekt schválený boardem — definovaný budget na rok (cloud, API, případně externí konzultant)
- **Výhody:** Nezávislost na externích investorech v Phase 1, IP zůstává v HOPI
- **Akce:** Připravit Business Case pro HOPI leadership (právě na tom pracujeme — BIZ-00103)
- **Riziko:** Byrokracie, schvalovací cykly — ale výsledek = stabilní funding bez equity diluce

#### B7 — Early B2C Revenue — pre-sales a waitlist
- **Co:** Platící early adopteři PŘED officiálním launchem (1.1.2027)
- **Model:** Lifetime deal nebo "Founding Member" cena (výrazná sleva výměnou za early commitment)
- **Kanál:** LinkedIn Build in Public → waitlist → email sekvence → Founding Member offer
- **Cena:** např. CZK 2,990 Founding Member (vs. plánovaný monthly CZK 499) = 6 měsíců upfront
- **Cíl:** 50 Founding Members = CZK 150K = 6 měsíců API costs pokryto
- **Akce:** Waitlist landing page + LinkedIn → aktivovat po BIZ-00105 (Fáze 0)

#### B8 — Startup akcelerátory (CZ ekosystém)
- **StartupYard** (Praha) — seed + mentorship, předchozí absolventi: Neuron, Deepnote
- **Presto Ventures** — CZ/SK seed fond, AI fokus
- **Rockaway** — CZ tech holding, portfólio SW firem
- **Přidaná hodnota:** Nejen peníze — síť kontaktů, mentorship, rychlejší enterprise sales
- **Timing:** Aplikovat po B2C launch nebo po HOPI TechIQ s.r.o. registraci

---

### Doporučené pořadí akcí

| Priorita | Akce | Kdy | Odhad hodnoty |
|----------|------|-----|---------------|
| 1 | Anthropic Startup Program formulář | 2026-04-23 (10 min) | $25k–$100k kreditů |
| 2 | AWS Activate Indie tier | Tento týden (30 min) | $1k kreditů bez podmínek |
| 3 | HOPI IT Budget — Business Case | Při BIZ-00103 | Stabilní CZK funding |
| 4 | MS for Startups | Po HOPI TechIQ s.r.o. | $150k Azure + nástroje |
| 5 | Early B2C Waitlist + Founding Member | Po Fáze 0 | CZK 100–200K |
| 6 | CzechInvest OP TAK | Q3 2026 | 0,5–3M Kč |
| 7 | CZ akcelerátory | Po B2C launch | Seed + síť |

---

### Propojené úkoly
- BIZ-00105 — Anthropic Fáze 0 (přihláška, LinkedIn, přímý kontakt)
- BIZ-00059 — Finanční model Phase 1 (náklady vs. revenue)
- BIZ-00103 — Refaktoring dokumentace (Business Case pro HOPI leadership)
- BIZ-00107–BIZ-00115 — Individuální akční úkoly (viz níže)

**Status:** CLOSED — strategie definována, rozepsána do 9 tasků.

---

## BIZ-00107 — AWS Activate Indie tier: $1k kreditů bez podmínek

**Datum:** 2026-04-22 | **Status:** OPEN | **Priorita:** HIGH | **Assignee:** David Gogela | **Effort:** XS / 30 min | **Kdy:** Tento týden

### Co to je
AWS Activate Indie tier = $1,000 AWS kreditů pro každého kdo staví startup. Žádná registrovaná firma, žádný investor, žádný inkubátor — stačí email + popis projektu. Kredity platí 1 rok.

### Proč teď
Low-hanging fruit. 30 minut, nulové podmínky, okamžitý výsledek. Kredity pokryjí budoucí hosting (GitHub Pages je zdarma ale S3, Lambda a další služby v9.x+ budou placené).

### Postup krok za krokem
1. Přejít na `aws.amazon.com/activate` → kliknout **Apply Now** → vybrat **Indie**
2. Vyplnit formulář:
   - **Company name:** HOPI AppIQ (nebo David Gogela, pokud vyžadují osobu)
   - **Website:** `h-gr-fico.github.io/appiq/v7.24/...` (investor brief URL)
   - **Description:** "AI-powered modular application platform for enterprise and home users. Built on Claude API. Internal pilot running at HOPI Group (CE holding, €0.5B, 8 countries). B2C SaaS launch January 2027."
   - **Use case:** Cloud hosting, document storage (S3), serverless API gateway (Lambda)
3. Odeslat → kredity přijdou do 1–5 dnů na AWS účet

### Co s kredity
- Teď: rezervovat, nepoužívat (GitHub Pages postačuje pro v7.x–v8.x)
- v9.x+ (Q4 2026): S3 pro document storage, Lambda pro API gateway, CloudFront pro CDN
- Budget odhad v9.x: $50–100/měsíc → kredity pokryjí 10–20 měsíců

### Závislosti
Žádné. Standalone akce.

---

## BIZ-00108 — AWS Activate Founders tier: upgrade na $25k po registraci s.r.o.

**Datum:** 2026-04-22 | **Status:** OPEN | **Priorita:** MEDIUM | **Assignee:** David Gogela | **Effort:** S / 60 min | **Kdy:** Po BIZ-00061 (HOPI TechIQ s.r.o. registrace)

### Co to je
AWS Activate Founders tier = $25,000 AWS kreditů + Trusted Advisor + AWS Business Support. Vyžaduje registered company a buď:
- Doporučení od inkubátoru/akcelerátoru (StartupYard, Presto, Y Combinator, ...) **nebo**
- Seed funding od recognized investor **nebo**
- Přímá aplikace přes AWS Partner Network

### Proč
$25k AWS kreditů = 2+ roky cloudových nákladů při předpokládaném usage v9.x. Zásadní pro bootstrap fázi.

### Postup
1. Počkat na BIZ-00061 — HOPI TechIQ s.r.o. musí být registrovaná
2. Jít na `aws.amazon.com/activate` → **Founders** tier
3. **Možnost A (nejsnazší):** Kontaktovat StartupYard nebo Presto Ventures — i bez přijetí do programu mohou poskytnout "portfolio referral" pro AWS Activate. Stačí email + popis projektu.
4. **Možnost B:** Přes AWS Partner Network — najít lokálního AWS partnera v CZ (např. Cleverlance, Ness) který poskytne referral
5. Vyplnit aplikaci: stejná data jako Indie + IČO firmy + referral kód

### Závislosti
- BIZ-00061 (právní struktura — registrace HOPI TechIQ s.r.o.)
- BIZ-00114 (CZ akcelerátory — kontakt může pomoci s referralem)

---

## BIZ-00109 — Microsoft for Startups Founders Hub

**Datum:** 2026-04-22 | **Status:** OPEN | **Priorita:** MEDIUM | **Assignee:** David Gogela | **Effort:** S / 60 min | **Kdy:** Po BIZ-00061

### Co to je
Microsoft for Startups Founders Hub = balíček pro early-stage startupy:
- **$150,000 Azure kreditů** (na 2 roky)
- **GitHub Copilot** zdarma (relevantní pro Claude Code alternativu/doplněk)
- **Microsoft 365** Business Premium
- **LinkedIn Sales Navigator** (klíčové pro Build in Public + B2B outreach)
- **OpenAI API kredity** (bonus — i když AppIQ stojí na Anthropic)

### Proč
LinkedIn Sales Navigator = přímý nástroj pro Davidův Build in Public + Anthropic outreach. Azure = budoucí enterprise hosting (mnoho CZ enterprise firem preferuje Azure před AWS). $150k = 3+ roky pokrytí.

### Podmínky
- Registered company (libovolná jurisdikce)
- Early stage (pre-Series A)
- Ne nutný investor, ne nutný inkubátor

### Postup
1. Počkat na BIZ-00061 (registrace s.r.o.)
2. `foundershub.startups.microsoft.com` → Apply
3. Vyplnit: firma, website, popis produktu, stage
4. Schválení typicky do 1–2 týdnů
5. Po schválení aktivovat LinkedIn Sales Navigator jako první — okamžitá hodnota pro BIZ-00105

### Závislosti
- BIZ-00061 (registrace firmy)

---

## BIZ-00110 — Google for Startups: research a rozhodnutí

**Datum:** 2026-04-22 | **Status:** OPEN | **Priorita:** LOW | **Assignee:** Claude | **Effort:** XS / 30 min | **Kdy:** Q3 2026

### Co to je
Google for Startups Cloud Program = $200k GCP kreditů + Google Workspace + Gemini API.

### Proč nízká priorita
AppIQ stack primárně cílí na AWS (S3, Lambda) nebo Azure (enterprise CZ preference). GCP fit je slabší. Gemini API = přímo konkurent Anthropicu — Davidova strategie je "all-in Claude/Anthropic."

### Akce pro Claudea
Research: zmapovat aktuální podmínky programu, zjistit zda lze kombinovat s AWS Activate (ano, obvykle lze), a zda GCP má specifické výhody pro AppIQ (Firebase? BigQuery?). Výstup: 1 strana doporučení ano/ne.

### Závislosti
Žádné — research task, Claude může provést samostatně.

---

## BIZ-00111 — HOPI IT Budget: formální schválení projektu a alokace ročního budgetu

**Datum:** 2026-04-22 | **Status:** OPEN | **Priorita:** HIGH | **Assignee:** David Gogela | **Effort:** M / 180 min příprava | **Kdy:** Q2 2026 (po BIZ-00103)

### Záměr
Projekt AppIQ/HOPI TechIQ musí mít formální interní schválení v HOPI Holding — jako IT projekt s přiděleným ročním budgetem. Bez toho závisí finance výhradně na Davidově osobním rozhodnutí, bez organizační podpory.

### Proč strategicky klíčové
- Formální schválení = HOPI organizačně za projektem, ne jen David osobně
- Budget = pokryje API náklady, hosting, případně junior dev/intern
- Precedens: pokud HOPI investuje → "living proof" argument je silnější pro investory
- Argument pro CEO/CFO viz níže

### Argument pro CEO/CFO (kanonický)
> *"Tato investice není náklad. Je to spolufinancování technologické firmy, jejímž prvním zákazníkem je HOPI sám. Alternativa: koupit hotové řešení za €500K–2M/rok. My to stavíme za CZK 1M/rok — s IP v našich rukou."*

| Srovnání | Cena |
|----------|------|
| Komerční enterprise AI platforma (Microsoft, SAP) | €500K–2M/rok |
| Externí IT firma — stejný rozsah | €300K–1M/rok |
| AppIQ interní vývoj David + Claude + hosting | CZK 500K–1M/rok |
| Výsledek | Enterprise platforma + IP HOPI + spin-off potenciál |

### Co požadovat od HOPI boardu
- **Rok 1 (2026):** CZK 500K–1M (Claude API, Claude Code plán, hosting, legal pro s.r.o.)
- **Rok 2 (2027):** CZK 1–2M (B2C launch náklady, první zaměstnanci HOPI TechIQ)
- **Forma:** Interní IT projekt nebo samostatná rozpočtová linie "HOPI TechIQ"

### Postup přípravy
1. BIZ-00103 musí být hotov — Business Case dokument je podkladem
2. David připraví 1stránkové executive summary pro board (Claude pomůže)
3. Naplánovat meeting s CEO + CFO (standalone, ne jako součást jiné agendy)
4. Cíl meetingu: formální souhlas + jmenování projektu jako IT projekt 2026/2027

### Závislosti
- BIZ-00103 (Business Case dokument)

---

## BIZ-00112 — Early B2C Founding Members: waitlist + pre-sales kampaň

**Datum:** 2026-04-22 | **Status:** OPEN | **Priorita:** HIGH | **Assignee:** David Gogela + Claude | **Effort:** M / 240 min | **Kdy:** Po BIZ-00105 (Fáze 0 Anthropic)

### Záměr
Generovat první příjmy PŘED officiálním B2C launchem (01.01.2027). Model: Founding Member = lifetime deal nebo roční předplatné za výrazně sníženou cenu výměnou za early commitment + zpětnou vazbu.

### Revenue model
| Tier | Cena | Počet | Revenue |
|------|------|-------|---------|
| Founding Member — Individual | CZK 1,990 jednorázově (lifetime) | 30 | CZK 59,700 |
| Founding Member — Family | CZK 2,990 jednorázově (lifetime) | 20 | CZK 59,800 |
| **Celkem** | | **50** | **CZK ~120K** |

CZK 120K = přibližně 6 měsíců API nákladů při aktuálním usage.

### Kanálová strategie
1. **LinkedIn Build in Public** (navazuje na BIZ-00105 post) — David sdílí průběh, buduje publikum
2. **Waitlist landing page** — jednoduchá stránka (Claude vytvoří), email capture
3. **Email sekvence** — 3 emaily: (1) Potvrzení registrace, (2) Behind the scenes update, (3) Founding Member offer
4. **Komunita** — Discord nebo WhatsApp group pro první zájemce (network effect)

### Milníky
- Po BIZ-00105: první LinkedIn post → waitlist odkaz v bio
- Do 2026-06-01: 200+ emailů na waitlistu
- Do 2026-09-01: Founding Member offer rozeslána → cíl 50 platících
- Do 2026-12-31: Founding Members dostávají early access (beta testing)

### Co Claude připraví
- Waitlist landing page (statická HTML stránka, jednoduchá, brandová)
- Email sekvence texty (CZ/EN)
- Founding Member offer text
- LinkedIn "Build in Public" content calendar (4 posty/měsíc)

### Závislosti
- BIZ-00105 (LinkedIn Fáze 0 — první post = základ komunity)
- BIZ-00061 (firma musí být registrovaná pro příjem plateb)
- BIZ-00018 (Stripe billing infrastruktura)

---

## BIZ-00113 — CzechInvest OP TAK: research výzev + feasibility analýza

**Datum:** 2026-04-22 | **Status:** OPEN | **Priorita:** MEDIUM | **Assignee:** Claude + David Gogela | **Effort:** S / 120 min | **Kdy:** Q3 2026

### Co to je
Operační Program Technologie a Aplikace pro Konkurenceschopnost (OP TAK) = EU strukturální fondy pro CZ firmy. Výzvy pro AI, digitalizaci, inovace. Odhad grantu: CZK 500K–3M pro projekt velikosti AppIQ.

### Proč nás to zajímá
- AppIQ = AI platforma pro CZ/CEE trh → perfektní fit pro OP TAK priority
- EU fondy = nevratné (grant, ne půjčka)
- CzechInvest má regionální kanceláře = osobní konzultace možná

### Rizika a realita
- **Admin náročnost:** Grantové žádosti jsou komplexní — typicky nutný external konzultant (success fee 8–15% z grantu)
- **Timing:** Výzvy mají pevná okna, podání → schválení = 6–12 měsíců
- **Podmínky způsobilosti:** Firma musí být CZ registrovaná, projekt musí mít jasný inovační prvek
- **Kofinancování:** Typicky 30–50% musí pokrýt žadatel — HOPI IT budget je předpoklad

### Postup pro Claudea (research task)
1. Web `czechinvest.org` → aktuálně otevřené výzvy OP TAK
2. Zmapovat: výzvy relevantní pro AI/software, výše podpory, podmínky, termíny
3. Doporučit: 1–2 nejvhodnější výzvy + odhad procesu
4. Výstup: 1stránkový brief pro Davida → rozhodnutí ano/ne

### Závislosti
- BIZ-00061 (firma musí být registrovaná pro podání žádosti)
- BIZ-00111 (HOPI IT budget = kofinancování)

---

## BIZ-00114 — CZ startup akcelerátory: shortlist + příprava aplikací

**Datum:** 2026-04-22 | **Status:** OPEN | **Priorita:** LOW | **Assignee:** David Gogela + Claude | **Effort:** M / 180 min | **Kdy:** Po B2C launch (2027) nebo po validaci HOME B2C

### Cíl
Identifikovat 2–3 CZ/SK akcelerátory, připravit draft aplikací. Přidaná hodnota: nejen peníze — síť kontaktů, mentorship, rychlejší enterprise sales, credibility pro B2B outreach.

### Shortlist k prozkoumání

| Akcelerátor | Fokus | Seed | Podmínky |
|-------------|-------|------|---------|
| StartupYard (Praha) | Deep tech, AI, B2B | €25K–50K za equity | MVP ready, mezinárodní ambice |
| Presto Ventures | CZ/SK seed fond, AI | €100K–500K | Early stage, tech produkt |
| Rockaway Capital | CZ tech holding | Strategická investice | Prokázaná trakce |
| Credo Ventures | CEE seed | €500K–2M | Post-seed, B2B SaaS |
| Y Combinator (US) | Global | $500K | Remote OK, high bar |

### Timing
- 2026: Anthropic + AWS Activate + HOPI budget = dostatečné pro Phase 1 bez externího investora
- 2027: Po B2C trakci (200+ platících users) = silná pozice pro seed round
- Akcelerátor = smysluplný až po prokázané trakci

### Postup pro Claudea
1. Research: aktuální podmínky, portfolio, termíny přijímání aplikací
2. Shortlist 2–3 nejlepších fit pro AppIQ
3. Draft aplikačního textu (navazuje na BIZ-00090 Anthropic pitch — stejná data)

### Závislosti
- BIZ-00112 (Founding Members — early trakce = silnější aplikace)
- BIZ-00061 (firma registrovaná)

---

## BIZ-00115 — Měsíční cost monitoring: Claude API + Claude Code + hosting náklady

**Datum:** 2026-04-22 | **Status:** OPEN | **Priorita:** MEDIUM | **Assignee:** David Gogela | **Effort:** XS / 20 min měsíčně | **Kdy:** Ongoing od 2026-05-01

### Záměr
Každý měsíc vědět přesně kolik projekt stojí. Bez měření nelze optimalizovat. Data jsou také součástí Business Case pro HOPI leadership a pro investory ("stavíme enterprise platformu za CZK X/měsíc").

### Co sledovat

| Nákladová položka | Kde zkontrolovat | Threshold |
|------------------|-----------------|-----------|
| Claude Code plán (subscription) | anthropic.com/account | fixní |
| Claude API usage (HOPIQ chatbot) | console.anthropic.com | >$50/měsíc = review |
| GitHub Pages / hosting | github.com (zdarma do limitu) | N/A |
| AWS kredity (po BIZ-00107) | aws.amazon.com/activate | sledovat burn rate |
| Domény, certifikáty | registrátor | roční |

### Výstup měsíčního reviewu
- 1 řádek v tabulce: `Datum | Claude Code | Claude API | AWS | Celkem | Poznámka`
- Uložit do nového souboru `COST_TRACKING.md` (David vede, Claude pomáhá)
- Při překročení $100/měsíc celkových nákladů → automatický trigger: review session efektivity

### Propojení s investorskými materiály
Data z `COST_TRACKING.md` = přímý vstup do Business Case:
> "8 týdnů vývoje, ~$1,000 celkových nákladů, 109 git commitů" — toto číslo teď budeme průběžně aktualizovat.

### Závislosti
Žádné — může začít okamžitě.

---

## BIZ-00117 — Recruitment Plan: detailní plán náboru + specifikace pozic

**Datum:** 2026-04-22 | **Status:** OPEN | **Priorita:** HIGH | **Assignee:** Claude + David | **Linked:** BIZ-00116 (Sources sekce Cockpitu)

### Filosofie náboru

> *"Najmi pomalu, propusť rychle. Každá nová pozice musí mít jasný business trigger."*

HOPI TechIQ roste organicky — ne VC-style rychlý burn, ale bootstrap s validací v každé fázi. Nová pozice vznikne jen tehdy, když:
1. David je kapacitně přetížen v konkrétní oblasti
2. Příjem pokrývá náklady na pozici do 6 měsíců
3. Pozice má jasné KPIs od prvního dne

---

### PHASE 1 (2026) — Solo + AI + Externisté

**Cíl fáze:** Dostat B2C produkt na trh. HOPI pilot běží. Anthropic partnership.

| Pozice | Typ | Timing | Náklady |
|--------|-----|--------|---------|
| David Gogela (Founder) | Full-time owner | Teď | interní (HOPI salary) |
| Claude (Anthropic) | AI Co-developer | Teď | ~$50–200/měsíc API |
| Legal advisor | Externě, on-demand | Q2 2026 | CZK 5–15K/měsíc |
| Accountant/Tax | Externě, on-demand | Q2 2026 | CZK 3–8K/měsíc |
| Junior Dev / AI Intern | DPP/DPČ nebo stáž | Q3 2026 (optional) | CZK 15–25K/měsíc |

**Phase 1 headcount budget:** CZK 25–50K/měsíc externistů + optional intern

---

#### POZICE 1 — Junior Developer / AI Intern (Phase 1, optional)

**Trigger k náboru:** David přetížen vývojovými úkoly; backend/testing práce přesahuje Claude kapacitu.

| Parametr | Hodnota |
|----------|---------|
| Typ úvazku | DPP (do 10K/měsíc) nebo DPČ (do 20 h/týden) nebo stáž |
| Mzda | CZK 15,000–25,000/měsíc |
| Délka | 3–6 měsíců, s opcí prodloužení |
| Lokace | Remote (OneDrive + GitHub) |

**Požadované dovednosti:**
- HTML/CSS/JS (střední úroveň)
- Git + GitHub základy
- Ochota učit se AI-first přístup (Claude Code, prompting)
- Analytické myšlení — controller background výhodou

**Co bude dělat:**
- Testování nových features (UAT protokol)
- Jednoduché content úpravy a překlady
- Dokumentace (README, tech specs)
- Pomoc s OIL/BOIL správou

**Kde hledat:**
- VŠE Praha, VUT Brno, FI MUNI — ekonomika + informatika kombinace
- Engeto Academy absolventi
- LinkedIn: "junior developer Praha" + filtr stáž
- HOPI interní sítě — doporučení od IT oddělení

**KPIs pozice:** 5+ UAT reportů/měsíc · 0 regresí způsobených neotestovanou změnou

---

### PHASE 2 (2027) — První tým: Launch & Growth

**Cíl fáze:** B2C launch 01.01.2027. Platící uživatelé. MRR €5K–€20K. HOPI pilot rozšíření.

**Trigger k náboru:** Po Founding Members validaci (min. 30 platících) + HOPI IT budget schválen.

| Pozice | Timing | Typ | Mzda/měsíc |
|--------|--------|-----|-----------|
| CTO / Lead Developer | Q1 2027 | Full-time nebo Co-founder | CZK 80–120K nebo equity |
| Growth Marketing Manager | Q1 2027 | Full-time | CZK 60–80K |
| Customer Success Manager | Q2 2027 | Part-time → full-time | CZK 40–60K |
| UX/Product Designer | Q1 2027 | Freelance nebo part-time | CZK 600–1,200/hod |

**Phase 2 headcount budget:** CZK 180–260K/měsíc (2–4 lidé)

---

#### POZICE 2 — CTO / Lead Developer (Phase 2, klíčová)

**Trigger:** B2C launch vyžaduje vývojový leadership, který Claude nemůže plně nahradit v produkčním prostředí.

| Parametr | Hodnota |
|----------|---------|
| Typ úvazku | Full-time nebo Co-founder (equity 5–10% + nižší mzda) |
| Mzda | CZK 80,000–120,000/měsíc (nebo equity model) |
| Lokace | Remote-first, Praha preferred |
| Report | David Gogela |

**Požadované dovednosti:**
- Full-stack: TypeScript/JS, Node.js nebo Python backend
- Cloud: AWS nebo Azure (production deployment)
- AI integration: API design, Claude API, MCP servery
- Architektura: microservices, event-driven, database design
- Startup mindset: "done > perfect", iterativní přístup

**Co bude dělat:**
- Přebírat od Clauda vývojové ownership
- Budovat v9.x backend (REST API, databáze, cloud)
- Vést technický tým (Phase 3+)
- Code review, CI/CD, security
- Integrace: SAP, SharePoint, Teams (Phase 3)

**Proč co-founder model může dávat smysl:**
- Platforma má valuaci €200K–500K → 5% = €10K–25K hodnota
- Snižuje cash burn v Phase 2
- Vyšší motivace — "svoji firmu"
- Trigger: pokud nenajdeme senior za rozumnou mzdu v 60 dnech

**Kde hledat:**
- LinkedIn: "CTO startup Praha", "full-stack AI developer"
- StartupYard, Presto portfolio sítě
- Glassdoor, Teamio, Jobs.cz
- Osobní síť Davida (HOPI IT kontakty, VŠE alumni)
- Techloop, Startupjobs.cz

**KPIs pozice:** v9.x backend live do Q3 2027 · 99.5% uptime · <200ms API response

---

#### POZICE 3 — Growth Marketing Manager (Phase 2)

**Trigger:** B2C launch — organický growth nestačí, potřebujeme systematický user acquisition.

| Parametr | Hodnota |
|----------|---------|
| Typ úvazku | Full-time |
| Mzda | CZK 60,000–80,000/měsíc |
| Lokace | Remote |

**Požadované dovednosti:**
- PLG (Product-Led Growth) — SaaS experience
- Content marketing: LinkedIn, blog, SEO
- Paid acquisition: Meta Ads, Google Ads (základy)
- Email marketing: onboarding sekvence, retention
- Analytics: GA4, Plausible, mixpanel
- CZ/EN bilingvní — CEE trh

**Co bude dělat:**
- Build in Public strategie (navazuje na Davidův LinkedIn)
- Content calendar: 4+ posty/týden (LinkedIn, blog)
- Onboarding email sekvence
- Founding Members kampaň (BIZ-00112)
- Analytika: konverzní funnely, A/B testy, CAC tracking

**Kde hledat:**
- Growjobs.cz, Otta.com
- LinkedIn: "growth marketer SaaS Praha"
- Marketing Festival komunita (CZ)
- Referral z AppIQ uživatelské komunity

**KPIs pozice:** CAC <CZK 500 · Organický traffic +20%/měsíc · Email open rate >35%

---

#### POZICE 4 — Customer Success Manager (Phase 2)

**Trigger:** Platící uživatelé vyžadují support — churn management je kritický pro MRR.

| Parametr | Hodnota |
|----------|---------|
| Typ úvazku | Part-time (20h/týden) → full-time po 200 platících |
| Mzda | CZK 40,000–60,000/měsíc (full-time ekvivalent) |
| Lokace | Remote |

**Požadované dovednosti:**
- SaaS support experience (Intercom, Zendesk)
- Empatie + analytické myšlení
- CZ + SK trh znalost
- Základy finance/domácnost (AppIQ doménová znalost)
- Technická zdatnost (vysvětlit produkt netechnickému uživateli)

**Co bude dělat:**
- Onboarding nových uživatelů (první 30 dní = klíčové)
- Support: chat, email, FAQ
- Churn prevence: proaktivní outreach při poklesu aktivity
- Feedback loop → Product (co uživatelé chtějí)
- NPS měření a improvement

**KPIs pozice:** Churn <5%/měsíc · NPS >50 · First response <4h

---

#### POZICE 5 — UX/Product Designer (Phase 2)

**Trigger:** Škálování UI/UX přesahuje Claudeovu designovou kapacitu; B2C vyžaduje user research.

| Parametr | Hodnota |
|----------|---------|
| Typ úvazku | Freelance nebo part-time (20h/týden) |
| Mzda | CZK 600–1,200/hod freelance nebo CZK 50–70K/měsíc part-time |
| Lokace | Remote |

**Požadované dovednosti:**
- Figma (design system, prototypy, handoff)
- User research: rozhovory, usability testing
- Design systémy: konzistentní component library
- Mobile-first: 15-device matrix (naše standardy)
- SaaS UX patterns: onboarding, dashboardy, empty states

**Co bude dělat:**
- AppIQ design systém (navazuje na _platform.css)
- User research s Founding Members
- Nové stránky a features: wireframes → prototyp → handoff Claudeovi
- Design Lab (AIQ-00224) vizuální výstupy

**KPIs pozice:** Design system coverage 80%+ · Usability score >80 · <2 design iterace na feature

---

### PHASE 3 (2028) — Scale: Enterprise & Marketplace

**Cíl fáze:** Enterprise B2B launch. ARR €200K+. Marketplace live. HOPI TechIQ s.r.o. jako fungující firma.

**Trigger:** ARR €50K+ (proof of revenue) + seed funding nebo HOPI Group formal investment.

| Pozice | Timing | Mzda/měsíc |
|--------|--------|-----------|
| Enterprise Sales Manager | Q1 2028 | CZK 80–120K + 5–10% commission |
| Solution Architect | Q1 2028 | CZK 100–150K |
| Product Manager | Q2 2028 | CZK 80–100K |
| Data Engineer | Q2 2028 | CZK 90–120K |
| QA / Test Engineer | Q3 2028 | CZK 60–80K |
| People / HR Manager | Q3 2028 | CZK 60–80K |

**Phase 3 headcount budget:** CZK 500–700K/měsíc (6–8 lidí celkem)

---

#### POZICE 6 — Enterprise Sales Manager (Phase 3)

| Parametr | Hodnota |
|----------|---------|
| Typ | Full-time + commission (5–10% z deal value) |
| Mzda | CZK 80,000–120,000 base + commission |
| Lokace | Praha, cestování CZ/SK/PL |

**Skills:** B2B enterprise SaaS sales · C-level communication · CRM (HubSpot/Salesforce) · CZ+SK+PL trh · ideálně zkušenost s AI/digitalizačními projekty

**KPIs:** 3+ enterprise deals/rok v Year 1 · ACV €20K–€100K · Sales cycle <90 dní

---

#### POZICE 7 — Solution Architect (Phase 3)

| Parametr | Hodnota |
|----------|---------|
| Typ | Full-time |
| Mzda | CZK 100,000–150,000/měsíc |

**Skills:** SAP integration · Azure/AWS enterprise · Security (ISO 27001, GDPR) · MCP servery · Pre-sales technical demos

**KPIs:** Integrace SAP live Q2 2028 · <2 týdny onboarding pro nového enterprise zákazníka

---

### Budget summary — headcount per fáze

| Fáze | Tým | Headcount cost/měsíc | Headcount cost/rok |
|------|-----|---------------------|-------------------|
| Phase 1 (2026) | David + Claude + externisté | CZK 25–50K | CZK 300–600K |
| Phase 2 (2027) | +4 lidé | CZK 200–280K | CZK 2.4–3.4M |
| Phase 3 (2028) | +6 lidí (10 celkem) | CZK 650–900K | CZK 7.8–10.8M |

---

### Celkový Sources budget — všechny kategorie

#### A — Lidská práce (viz výše)

#### B — AI Resources

| Nástroj | Fáze | Cena/měsíc | Poznámka |
|---------|------|-----------|---------|
| Claude Code (Sonnet) | Teď | ~$20–100 | Development tool |
| Claude API / Opus | Klíčové sessions | +$10–50/session | Jen pro strategické úkoly |
| Claude API / Haiku | Production (HOPIQ) | $0.01/1k msg | Škáluje s uživateli |
| GitHub Copilot | Phase 2+ | $0 (MS for Startups) | CTO tool |
| Midjourney / DALL-E | Phase 2 | $20–30/měsíc | Marketing visuals |
| ElevenLabs | Phase 3 | $22–99/měsíc | Voice features |
| **AI celkem Phase 1** | | **$50–200/měsíc** | |
| **AI celkem Phase 2** | | **$200–800/měsíc** | (škáluje s uživateli) |

#### C — SW & Tech Tools

| Nástroj | Fáze | Cena/měsíc | Typ |
|---------|------|-----------|-----|
| GitHub | Teď | $0 | Hosting, CI/CD |
| GitHub Pages | Teď | $0 | Static hosting |
| AWS (S3, Lambda) | Phase 2 | $50–300 | Backend hosting (z kreditů) |
| Cloudflare Workers | Phase 2 | $5–25 | API gateway |
| Stripe | Phase 2 | 2.9% + $0.30/tx | Payments |
| Intercom / Crisp | Phase 2 | $39–99 | Customer support |
| Plausible Analytics | Phase 2 | $9–19 | Privacy-first analytics |
| Mailchimp / SendGrid | Phase 2 | $13–25 | Email marketing |
| HubSpot CRM | Phase 3 | $45–800 | Sales CRM |
| Jira / Linear | Phase 3 | $0–8/user | Project management |
| **SW celkem Phase 1** | | **$0–20/měsíc** | |
| **SW celkem Phase 2** | | **$200–600/měsíc** | |
| **SW celkem Phase 3** | | **$800–2,000/měsíc** | |

#### D — Hardware

| Položka | Fáze | Cena | Poznámka |
|---------|------|------|---------|
| David PC/laptop | Teď | $0 | Existující HOPI zařízení |
| Dedikovaný dev laptop | Phase 2 | CZK 40–80K jednorázově | CTO hardware |
| Test devices (TB, PH) | Phase 1 | CZK 5–10K | Responsive testing |
| Cloud (náhrada HW) | Phase 2+ | viz AWS/Azure | Serverless > own HW |

#### E — Marketing

| Nástroj/Aktivita | Fáze | Cena/měsíc |
|-----------------|------|-----------|
| LinkedIn Premium/Sales Nav | Phase 2 | $0 (MS for Startups) |
| LinkedIn Ads | Phase 2 | CZK 5–15K |
| SEO nástroje (Ahrefs/Semrush) | Phase 2 | $99–199 |
| Design tools (Canva Pro) | Teď | $13 |
| Video editing (Loom) | Phase 2 | $8–15 |
| PR / Influencer | Phase 2 | CZK 10–30K |
| **Marketing celkem Phase 1** | | **CZK 1–5K/měsíc** |
| **Marketing celkem Phase 2** | | **CZK 30–60K/měsíc** |

---

### CELKOVÝ BURN RATE (všechny kategorie)

| Fáze | Lidé | AI | SW | Marketing | HW | **CELKEM/měsíc** | **CELKEM/rok** |
|------|------|----|----|-----------|----|----|-----|
| **Phase 1** | CZK 25–50K | $50–200 | $0–20 | CZK 1–5K | CZK 0 | **CZK 30–75K** | **CZK 360–900K** |
| **Phase 2** | CZK 200–280K | $200–800 | $200–600 | CZK 30–60K | CZK 3K | **CZK 260–380K** | **CZK 3.1–4.6M** |
| **Phase 3** | CZK 650–900K | $500–2K | $800–2K | CZK 80–150K | CZK 5K | **CZK 800K–1.2M** | **CZK 9.6–14.4M** |

### Revenue vs. Costs (break-even analýza)

| Fáze | Náklady/rok | Revenue target | Break-even |
|------|------------|----------------|-----------|
| Phase 1 (2026) | CZK 360–900K | CZK 120K (Founding) | Burn — krytí z HOPI IT budget + kreditů |
| Phase 2 (2027) | CZK 3.1–4.6M | €60K–€240K ARR | Q3 2027 (optimistický) |
| Phase 3 (2028) | CZK 9.6–14.4M | €500K–€2M ARR | Q1 2029 (profitable) |

> **Klíčový argument pro majitele:** Phase 1 burn je pokryt kredity ($200k pipeline) + HOPI IT budget. Vlastní kapitál se nenasazuje — projekt se financuje z zdrojů, které bychom jinak nevyužili.

---

### Závislosti
- BIZ-00061 (s.r.o. registrace) → formální pracovní smlouvy
- BIZ-00111 (HOPI IT Budget) → financování Phase 1 headcount
- BIZ-00112 (Founding Members revenue) → trigger pro Phase 2 nábor
- BIZ-00116 (Management Cockpit) → Sources sekce zobrazuje tento plán live

---

## BIZ-00118 — B2C Launch detailní plán — AppIQ HOME, cíl 01.01.2027

**Datum:** 2026-04-22 | **Status:** IN PROGRESS | **Priorita:** HIGH | **Assignee:** Claude + David | **Linked:** BIZ-00116

### Proč teď

Investor Brief uvádí "253 dní do B2C launch" — to je náš veřejný závazek. Cockpit tuto cifru zobrazuje v reálném čase. Ale za číslem musí stát konkrétní plán: co kde kdo udělá do 01.01.2027, co to bude stát a jak to budeme vědět, že jsme ready.

### Cíl

**AppIQ HOME** — první platící uživatelé online k **1. lednu 2027**.

KPIs při launchi:
- 50+ Founding Members (platící, lifetime deal)
- 3 vertikály živé: Finance, Zdraví, Vzdělávání
- Freemium tier funkční (self-service onboarding bez manuální intervence)
- CZK 150K ARR k datu launche

### Fázový plán (6 etap)

#### ETAPA 1 — Foundation (Duben–Červen 2026)
*Co: platforma připravena na B2C, první obsah*
- HOPI TechIQ s.r.o. registrována (BIZ-00061)
- Platform Core v8.0 stabilní (AIQ-00309 + navazující)
- HOME větev manifest.json pro 3 vertikály
- Waitlist landing page live (BIZ-00112)
- Founding Members lifetime deal aktivní
- **KPI:** 10+ registrací na waitlistu

#### ETAPA 2 — Content Build (Červenec–Srpen 2026)
*Co: obsah pro 3 vertikály, AI features core*
- Finance vertikála: budget tracker, expense log, FX alert
- Zdraví vertikála: zdravotní deník, pojistka manager, preventivní péče calendar
- Vzdělávání vertikála: studijní plán, pokrok tracker, rodičovský přehled
- HOPIQ chatbot v HOME kontextu (doporučení, shrnutí, upomínky)
- **KPI:** 25+ waitlist, první feedback od beta testerů

#### ETAPA 3 — Alpha Test (Září 2026)
*Co: uzavřená alfa s 5–10 uživateli*
- Onboarding flow A/B test (do 3 minut do hodnoty)
- Payment gateway integrace (Stripe nebo GoPay)
- Freemium tier definice (co je free vs. premium)
- Bug bash + UX polish
- **KPI:** NPS ≥ 7, onboarding completion ≥ 60%

#### ETAPA 4 — Beta (Říjen–Listopad 2026)
*Co: veřejná beta, marketing momentum*
- Public beta launch (LinkedIn Build in Public kampaň)
- Founding Members deal aktivně prodáván
- SEO základ (blog, landing pages)
- Referral program (beta user přivede přítele = bonus)
- **KPI:** 30+ beta users, 20+ Founding Members platících

#### ETAPA 5 — Pre-Launch (Prosinec 2026)
*Co: launch ready checklist, press, onboarding polish*
- GDPR compliance audit
- App Store / Google Play (pokud mobile wrapper)
- Press kit (1 press release, 3 case studies)
- Onboarding flow finální (< 90 sekund do hodnoty)
- Email marketing sekvence (7-email welcome flow)
- **KPI:** 50+ Founding Members, platforma 99% uptime za posledních 30 dní

#### ETAPA 6 — LAUNCH 01.01.2027 🚀
*Co: veřejný launch, PR push*
- Public announcement (LinkedIn, Product Hunt, česká média)
- "Day 1 Report" — kolik users, kolik platících, jaký ARR
- Investor Brief aktualizován o launch data
- Retrospektiva: co fungovalo, co ne, co dál

### Budget odhadovaný pro B2C launch

| Položka | Měsíčně | Phase 1 celkem |
|---------|---------|---------------|
| Claude API (HOPIQ chatbot) | $50–150 | $500–1,500 |
| Hosting + CDN | $20–50 | $200–500 |
| Stripe / GoPay poplatky | % z revenue | — |
| Marketing (LinkedIn ads) | $100–300 | $500–2,000 |
| Domain + SSL + nástroje | $20 | $200 |
| **Celkem** | **$190–520/měs** | **$1,400–4,200** |

Krytí: AWS Activate ($1K) + MS Founders Hub (Azure) + Founding Members revenue (CZK 150K ≈ $6,600).

### Klíčové závislosti

| Úkol | Blokuje |
|------|---------|
| BIZ-00061 (s.r.o.) | Stripe/GoPay platby, smlouvy |
| BIZ-00107 (AWS Activate) | Hostingové kredity |
| BIZ-00109 (MS Founders Hub) | Azure kredity pro backend |
| BIZ-00112 (Founding Members) | Pre-launch revenue |
| AIQ-00309 (Cockpit build) | Visibility a management |

### Provázání s Cockpitem

- **Hero KPI** — "DNŮ DO B2C" zobrazuje živý odpočet
- **Milestone Timeline** (sekce 05) — B2C Launch jako finální milestone
- **Budget Track** (sekce 03) — Phase 1 budget vs. B2C launch target
- **Financial Cockpit** (sekce 04) — Founding Members revenue pipeline
- **Motivation Chamber** (sekce 01/13) — countdown + motivační vizuál
- **B2C Launch Banner** — výrazný pruh nad sekcemi v hub page

### Investor Brief provázání

`INVESTOR_BRIEF.html` uvádí "253 dní do B2C launch" — tento plán je operační naplnění toho závazku. Při každém investor meetingu ukázat cockpit → fáze → countdown = živý důkaz, že víme co děláme.

---

## BIZ-00116 — Management Cockpit: řídící středisko projektu HOPI AppIQ

**Datum:** 2026-04-22 | **Status:** OPEN (čeká na schválení návrhu) | **Priorita:** HIGH | **Assignee:** Claude + David Gogela

### Záměr a filosofie

> **"Jeden pohled. Celý projekt. Bez Clauda. Bez meetingů."**

Management Cockpit = standalone HTML stránka pro majitele a management HOPI Holding. Načítá OIL.json + BOIL.json v reálném čase a zobrazuje stav projektu jako executive dashboard. Majitelé vidí priority, cash, termíny a odpovědnosti sami — bez nutnosti ptát se Davida nebo Clauda.

Zároveň: snižuje závislost na Claude sessions = přímá úspora budgetu (dotazy "co je otevřené?" jdou na Cockpit, ne do chatu).

### Mottos — vizuální DNA stránky (závazné)

| Motto | Kontext použití |
|-------|----------------|
| **"Budget je svatý"** | Finanční sekce — každý výdaj musí mít justifikaci |
| **"Cash is King"** | Revenue a cash injection dashboard |
| **"All Actions Must Be Business Driven"** | Task board — každý task má business důvod |
| **"Living Proof First"** | Timeline — ship working code, not promises |
| **"1 Person + AI = Team"** | Capacity — nový model práce |

---

### Confirmed parametry (2026-04-22)

| Parametr | Hodnota |
|----------|---------|
| Heslo | HOPI2026 |
| Přístup | Veřejný link |
| DECISIONS.json | David schvaluje každý záznam |
| Jazyk | CZ/EN toggle |
| Hudba | Speciální motivační (David vybere — doporučeno: Hybrid Orchestral + Electronic) |
| Grafy | Chart.js |

---

### Navrhovaná struktura stránky (12 sekcí — finální)

**Logické pořadí:** Vision → Numbers → Finance → Operations → Team → Methodology
*(Majitel vidí nejdříve KAM jdeme, pak KOLIK to stojí/přinese, pak JAK pracujeme — a teprve pak detail tasků)*

---

#### SEKCE 1 — Hero: Project Identity
- Název: **HOPI AppIQ — Project Management Cockpit**
- Tagline: *"One view. Full control. No meetings."*
- Aktuální fáze: **Phase 1 — HOME B2C + HOPI Pilot** (dynamicky z konfigurace)
- Last updated: auto z JSON (timestamp posledního souboru)
- Sticky ribbon s 3 mottos (barevný gradient — fialová/zelená/oranžová)

---

#### SEKCE 2 — Executive KPI Strip (karty nahoře)

| KPI karta | Zdroj | Co zobrazuje |
|-----------|-------|-------------|
| AIQ Open Tasks | OIL.json | Počet OPEN + IN PROGRESS |
| AIQ Closed Total | OIL.json | Celkový počet CLOSED |
| BIZ Open Tasks | BOIL.json | Počet OPEN + IN PROGRESS |
| Days to B2C Launch | konfigurace | Odpočet do 01.01.2027 |
| Git Commits | konfigurace (manuální update) | Celkový počet commitů |
| Monthly API Cost | COST_TRACKING.json | Aktuální měsíc |
| Credits Pipeline | BOIL.json (BIZ-00107–109) | Potenciální kredity $k |
| Sessions This Week | konfigurace | Počet Claude sessions |

---

#### SEKCE 3 — Financial Cockpit

**Motto: "Budget je svatý" | "Cash is King"**

##### 3a — Monthly Cost Tracker
Tabulka s řádky: Měsíc | Claude Code | Claude API | AWS | Ostatní | Celkem | Poznámka
Zdroj: `COST_TRACKING.json` (nový soubor, David aktualizuje měsíčně)

##### 3b — Cash Injection Pipeline
Karta za každý program (zdroj: BOIL.json, tasky BIZ-00105, BIZ-00107–115):

| Program | Potenciál | Status | Akce |
|---------|-----------|--------|------|
| Anthropic Startup Program | $25k–$100k | 🟠 IN PROGRESS | Zítra — formulář |
| AWS Activate Indie | $1k | 🔵 OPEN | Tento týden |
| AWS Activate Founders | $25k | 🔵 OPEN | Po s.r.o. |
| MS for Startups | $150k | 🔵 OPEN | Po s.r.o. |
| HOPI IT Budget | CZK 500K–1M | 🔵 OPEN | Q2 2026 |
| Founding Members | CZK 120K | 🔵 OPEN | Po Fázi 0 |
| CzechInvest OP TAK | CZK 500K–3M | 🔵 OPEN | Q3 2026 |

**Total Pipeline:** ~$200k+ kreditů + CZK 2–4M potenciál

##### 3c — ROI Argument (pro majitele)
Fixní vizuální blok:
> *Alternativa: koupit hotové AI řešení = €500K–2M/rok*
> *AppIQ vývoj David + Claude = ~$1,000 za 8 týdnů*
> *IP zůstává v HOPI. Spin-off potenciál: HOPI TechIQ s.r.o.*

---

#### SEKCE 4 — OIL Task Board (AIQ technické úkoly)

**Motto: "All Actions Must Be Business Driven"**

##### Filtry (nahoře)
- Status: `ALL` | `OPEN` | `IN PROGRESS` | `REVIEW` | `CLOSED`
- Priorita: `ALL` | `CRITICAL` | `HIGH` | `MED` | `LOW`
- Assignee: `ALL` | `Claude` | `David` | `Both`
- Doména: `Platform` | `Finance` | `Studio` | `Operations`
- Fulltext search (name + ID)

##### Řádek tasku
`[STATUS ikona] AIQ-NNNNN | Název | Priorita badge | Assignee | Effort | Datum | [▼ detail]`

##### Expand → detail panel
- Popis tasku (z OIL.json `description`)
- Context z OIL_CONTEXT.md (pro CLOSED/REVIEW tasky — implementační poznámky)
- Linked tasks (companion test tasks, závislosti)

##### Agregace
- Burndown mini-chart: CLOSED per týden (posledních 8 týdnů)
- Effort breakdown: kolik hodin odhadováno vs. actuals

---

#### SEKCE 5 — BOIL Task Board (BIZ strategické úkoly)

Stejná logika jako SEKCE 4, ale pro BOIL.json.

##### Filtry navíc
- Stream: `ALL` | `STRATEGIC_RECON` | `B2C_SAAS` | `ENTERPRISE` | `HOPI_PILOT`
- Oblast: `A. Feasibility` | `B. Personas` | `C. Stakeholders` | `D. Competitive` | `E. Anthropic` | `F. Marketing`
- bizType: `strategy` | `action` | `research` | `decision` | `content` | `operations`

##### Expand → detail panel
- Popis (z BOIL.json `description`)
- Kontext z BKONTEXT.md (postup krok za krokem, závislosti, výstupy)
- Linked AIQ tasks (technická implementace)

---

#### SEKCE 6 — Milestone Timeline

**Motto: "Living Proof First"**

Vizuální horizontální timeline (CSS-based, žádná knihovna):

```
[Teď]──[Fáze 0 Anthropic 23.4.]──[s.r.o. Q2]──[B2C Beta Q4]──[B2C Launch 1.1.2027]──[Enterprise 1.1.2028]
```

Každý milestone:
- Datum
- Název
- Status (done / in progress / upcoming)
- Klíčové deliverables (3 bullet points)
- Linked BIZ/AIQ tasks

Barevné kódování: ✅ zelená | 🟠 oranžová (in progress) | ⚪ šedá (upcoming)

---

#### SEKCE 7 — Capacity & Responsibility Matrix

**Motto: "1 Person + AI = Team"**

##### 7a — Rozdělení práce (doughnut chart CSS)
- Claude: X% (development, content, research)
- David Gogela: Y% (strategy, approvals, business)
- Celkový effort: X hodin odhadováno | Y hodin actuals

##### 7b — Odpovědnostní matice
| Oblast | Claude | David | Externí |
|--------|--------|-------|---------|
| Vývoj (AIQ dev tasks) | 🔴 Owner | Approve | — |
| Strategie (BIZ tasks) | Support | 🔴 Owner | — |
| Finance/Cash | Research | 🔴 Owner | Accountant |
| Legal | — | 🔴 Owner | Lawyer |
| Design | 🔴 Owner | Approve | — |
| Stakeholders | — | 🔴 Owner | — |

##### 7c — Týdenní kapacita
- Claude: neomezená (API limity)
- David: ~2–3 hodiny/den vedle HOPI controllingu
- Kritická cesta: David approvals = bottleneck → viditelné v REVIEW filter

---

#### SEKCE 8 — Decision Log

Tabulka klíčových rozhodnutí (zdroj: manuální `DECISIONS.json` nebo z BKONTEXT):

| Datum | Rozhodnutí | Kdo | Dopad | Linked task |
|-------|-----------|-----|-------|------------|
| 2026-04-20 | 9D produktový model — závazný rámec | David | Architektura v8.x+ | BIZ-00196 |
| 2026-04-20 | HOME B2C = priorita Phase 1 | David | Roadmap, features | CLAUDE.md |
| 2026-04-21 | Hudba = default ON | David | Všechny stránky | BIZ-00101 |
| 2026-04-21 | B2C launch = 01.01.2027 | David | Timeline freeze | BIZ-00102 |
| 2026-04-22 | Budget je svatý — session pravidla | David | Claude Code usage | BIZ-00106 |
| ... | ... | ... | ... | ... |

---

#### SEKCE 9 — Budget Track

**Motto: "Every Crown Invested Returns Tenfold"**

*Co za peníze dostane majitel? Tato sekce odpovídá na otázku ROI — ne abstraktně, ale milestone po milestonu.*

##### 9a — Budget Overview (Chart.js gauge + bar)
- Celkový schválený budget (manuální vstup v DECISIONS.json)
- Čerpání k dnešnímu dni (z COST_TRACKING.json)
- Zbývající buffer
- Burn rate: průměr posledních 3 měsíců → projekce do B2C launch

##### 9b — Milestone Price Tags

| Milestone | Investice | Co majitel dostane |
|-----------|-----------|-------------------|
| MVP Phase 0 (8 týdnů) | ~$1,000 | Live platform · 109 commitů · v7.24 live · 1 pilot user (HOPI) |
| Fáze 0 Anthropic | ~$0 | $25k–$100k kreditů · kontakt v Anthropic CRM |
| HOPI Pilot deploy | ~$2,000 | Living proof · referenční zákazník · enterprise credibility |
| B2C Beta (Q4 2026) | ~$5,000 | 200+ beta uživatelů · validated product · Founding Members revenue |
| B2C Launch (01.01.2027) | ~$10,000 | Platící zákazníci · MRR start · brand v CEE |
| Phase 2 Enterprise (2028) | ~$50,000 | ARR €200K+ · B2B pipeline · HOPI jako referenční deal |
| HOPI TechIQ s.r.o. exit | TBD | IP valuace €5–20M · spin-off · HOPI = 6. divize |

##### 9c — Value Delivery Chart (Chart.js scatter/line)
X osa: kumulativní investice ($) | Y osa: hodnota (€ valuace + trakce)
Vizuální důkaz: exponenciální křivka — malá investice, velká hodnota.

##### 9d — Cash Back / Návratnost (fixní blok)
```
Investice fáze 1:     ~$10,000 (CZK 230K)
Founding Members:      CZK 120K zpět
HOPI IT Budget:       CZK 500K–1M ročně pokrývá náklady
B2C MRR rok 1:        €5,000–€20,000/měsíc (při 100–500 platících)
Break-even:           Q2 2027 (optimistický scénář)
```

---

#### SEKCE 10 — Motivation Chamber

*Vizuálně nejsilnější sekce. Dark fialový gradient. Animovaná čísla. Pro majitele = WOW moment.*

##### 10a — Loga (kam patříme a kam jdeme)
- HOPI Group (kde jsme teď)
- HOPI AppIQ (co stavíme)
- HOPI TechIQ s.r.o. (cíl — 6. divize)
- Anthropic (target partner)
- [prázdné místo] — první enterprise zákazník (teaser)

##### 10b — Velká čísla (animovaný counter při scroll)

| Číslo | Kontext |
|-------|---------|
| `€200K–500K` | Aktuální odhadovaná valuace platformy |
| `109+` | Git commits — auditovatelný důkaz práce |
| `$1,000` | Celková investice za 8 týdnů MVP |
| `01.01.2027` | B2C launch — countdown timer |
| `30M+` | Potenciální uživatelé (CEE + Střední Evropa) |
| `€5–20M` | Exit / spin-off valuace cíl |
| `8 týdnů` | Čas od nuly do živé enterprise platformy |

##### 10c — Kam jdeme (Phase mapa)
```
TEĎKA            2027              2028              2030+
Phase 1          Phase 2           Phase 3           EXIT
HOPI + HOME ──► Enterprise ──► Marketplace ──► HOPI TechIQ s.r.o.
$10K invest      €200K ARR         €2M ARR           €5–20M valuace
```

##### 10d — Davidův kanonický citát (velký, bold, centrovaný)
> *"Před dvěma měsíci bych si to nedokázal představit.*
> *Teď, co znám Clauda, mne již nikdo nepřesvědčí o opaku."*
> — David Gogela, Head of Group Controlling · HOPI Holding · Zakladatel AppIQ

##### 10e — Mottos (velké, barevné, rozložené přes šířku)
```
💰 BUDGET JE SVATÝ    👑 CASH IS KING    🎯 ALL ACTIONS MUST BE BUSINESS DRIVEN
🚀 LIVING PROOF FIRST                    🤖 1 PERSON + AI = TEAM
```

---

#### SEKCE 11 — Project Team

*(Viz obsah definovaný výše — David, Claude, stakeholders, target partneři)*

---

#### SEKCE 12 — Methodology

*(Viz obsah definovaný výše — AI pravidla, model selection, budget strategy, David+Claude workflow)*

---

### Finální logické pořadí 12 sekcí

| # | Sekce | Proč tady |
|---|-------|-----------|
| 1 | Hero + Mottos Ribbon | Identita — kdo jsme, co stavíme |
| 2 | Motivation Chamber | WOW — kam jdeme, proč to stojí za to |
| 3 | Executive KPI Strip | Čísla na první pohled — stav projektu |
| 4 | Budget Track | Co za peníze dostane majitel |
| 5 | Financial Cockpit | Detailní cash — náklady, pipeline, ROI |
| 6 | Milestone Timeline | Kde jsme na cestě |
| 7 | OIL Task Board | Technické úkoly (AIQ) |
| 8 | BOIL Task Board | Business úkoly (BIZ) |
| 9 | Capacity & Responsibility | Kdo co dělá |
| 10 | Project Team | Tým a stakeholders |
| 11 | Methodology | Jak pracujeme — pravidla, modely, budgetová strategie |
| 12 | Decision Log | Klíčová rozhodnutí s datem |

---

### Technická architektura stránky

```
MANAGEMENT_COCKPIT.html
├── <head> — _platform.css + cockpit.css + Chart.js CDN
├── Sticky header — mottos ribbon (5 mottos)
├── Sekce 1–12 (HTML skeleton)
└── <script>
    ├── fetch('OIL.json')          → renderTaskBoard('#oil-board')
    ├── fetch('BOIL.json')         → renderTaskBoard('#boil-board')
    ├── fetch('COST_TRACKING.json') → renderFinancial() + renderBudgetTrack()
    ├── fetch('DECISIONS.json')    → renderDecisionLog()
    ├── fetch('OIL_CONTEXT.md')    → parseContext() pro expand panely
    ├── fetch('BKONTEXT.md')       → parseContext() pro expand panely
    └── renderTimeline(), renderCapacity(), renderMotivation()
```

**Klíčové technické rozhodnutí:**
- Chart.js pro všechny grafy (bar, line, doughnut, scatter)
- Čistý JavaScript, žádný framework
- OIL_CONTEXT.md + BKONTEXT.md = fetch() → parse podle `## AIQ-NNNNN` / `## BIZ-NNNNN` headingů
- COST_TRACKING.json = David aktualizuje 5 minut měsíčně
- DECISIONS.json = David schvaluje každý záznam
- Responzivní: NB-M primární, TB-L funkční, PH neřešit (cockpit = desktop)
- Heslo: HOPI2026
- Přístup: veřejný link
- CZ/EN toggle (stejný pattern jako ostatní stránky)
- Hudba: motivační (Hybrid Orchestral + Electronic, David dodá soubor)

---

### "Prodej" pro majitele HOPI — klíčové argumenty

1. **Transparentnost bez meetingů** — kdykoli chce CEO/CFO vidět stav projektu, otevře URL
2. **Finanční kontrola** — vidí každý výdaj, každý kreditový program, ROI argument
3. **Business justifikace** — každý task má business důvod (motty viditelné na každé stránce)
4. **Kapacita** — vidí že David pracuje efektivně, Claude má jasnou roli
5. **Důvěryhodnost** — živá data z OIL.json, ne statická prezentace

### Součást Business navigation (mezi Brief, Vision, Case)

Umístění v menu: **Brief | Vision | Case | Cockpit | Journey**
Cockpit = operativní view (živá data) vs. ostatní = strategické/investor dokumenty.

---

#### SEKCE 13 — Sources (Resources Overview)

*Komplexní přehled zdrojů projektu — lidé, AI, technologie, nástroje, budget per kategorie.*

**Subsekce: Lidská práce | AI Resources | SW & Tech | HW | Marketing | Budget breakdown**

*(Plné specifikace viz BIZ-00117 BKONTEXT)*

---

### Finální sekce — pořadí po přidání Sources

| # | Sekce |
|---|-------|
| 1 | Hero + Mottos Ribbon |
| 2 | Motivation Chamber |
| 3 | Executive KPI Strip |
| 4 | Budget Track |
| 5 | Financial Cockpit |
| 6 | Milestone Timeline |
| 7 | OIL Task Board |
| 8 | BOIL Task Board |
| 9 | Capacity & Responsibility |
| 10 | Project Team |
| 11 | **Sources** ← nová |
| 12 | Methodology |
| 13 | Decision Log |

---

### Závislosti a pořadí implementace

| Krok | Co | Kdy |
|------|----|-----|
| 1 | David schválí finální návrh (tato session) | 2026-04-22 |
| 2 | Claude vytvoří AIQ dev task | Po schválení |
| 3 | Claude vytvoří COST_TRACKING.json + DECISIONS.json šablony | Při vývoji |
| 4 | David dodá motivační hudbu (soubor) | Před finalizací |
| 5 | Claude postaví MANAGEMENT_COCKPIT.html | 1 session, L effort |
| 6 | David otestuje + schválí UAT | Po vývoji |
| 7 | Deploy v7.25 nebo v7.26 | Po UAT |


# BKONTEXT.md — Business Kontext a Rozhodnutí

> **CITLIVÁ DATA — nesdílet mimo David Gogela + Claude.**
> Vytvořeno: 2026-04-19 | Aktualizovat průběžně.
> Formát: `## BIZ-NNNNN — Název` → kontext, rozhodnutí, klíčové poznámky.

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

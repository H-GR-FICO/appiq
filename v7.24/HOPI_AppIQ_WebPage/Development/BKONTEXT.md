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


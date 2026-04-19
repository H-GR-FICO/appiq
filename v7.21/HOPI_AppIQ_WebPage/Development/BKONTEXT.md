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

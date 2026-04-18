# OIL_CONTEXT.md — Kontext a výtah z diskusí per úkol

> Vytvořeno: 2026-04-17 | Aktualizovat průběžně po každé session.
> Formát: `## AIQ-NNNNN — Název` → kontext, rozhodnutí, klíčové poznámky.
> Audit záznamy: `## AUD-NNNNN — Název` → rozsah, nálezy, plán oprav.

---

## AIQ-00046 — GitHub: multi-version publishing — výběr zobrazené verze

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED
**Kontext:** GitHub Pages aktuálně hostuje vždy jen nejnovější verzi (root /). Cíl: každá archivovaná verze dostane vlastní trvalou URL (/v7.12/, /v7.13/, …), root vždy = latest.

### Odsouhlasená architektura
- DO_DEPLOY.ps1 rozšířen o krok: po nasazení do rootu zkopíruje release také do `/vX.XX/` podsložky
- `versions.json` v root repo: index všech verzí s datem a popisem změn
- Studio panel (Release & Deploy) zobrazí dropdown dostupných verzí + odkaz na každou
- Root `/` = redirect nebo symlink na nejnovější verzi

### Technické otázky k rozhodnutí
- Root = přímá kopie latest (aktuální přístup, jednoduché) nebo redirect stránka s výběrem?
- Podsložky verzovat od v7.12 (aktuální) nebo začít od příštího deploye?

### Závislosti
- Navazuje na AIQ-00045 (versions.json je sdílený datový zdroj)
- Řešit jako druhé po AIQ-00045

---

## AIQ-00045 — Studio: záložka Verze — přehled verzí s changelogem

**Datum:** 2026-04-18 | **Status:** OPEN | **Priorita:** MED
**Kontext:** Studio panel má 3 záložky (Backlog / System Map / Release & Deploy). Přidat 4. záložku Verze — přehled archivovaných verzí s datem a changelogem, rozbalitelné per verze.

### Odsouhlasený design
- 4. tab v Studio panelu: ikona 🕐, label "Verze"
- Seznam verzí v chronologickém pořadí (newest first)
- Každá verze: číslo verze + datum + počet změn (badge)
- Rozbalení verze: klíčové změny dané session (bullet list)

### Datový zdroj — 2 možnosti
**A) `_versions.json`** — DO_ARCHIVE.ps1 při každé archivaci přidá záznam (verze, datum, změny). Strukturované, snadno čitelné v JS. **Preferováno.**
**B) Parse CHANGELOG.md** — složitější parsing, ale data už existují.

### Rozhodnutí
→ Zavést `_versions.json`. DO_ARCHIVE.ps1 na konci přidá nový záznam. David doplní popis změn buď ručně nebo skrze Studio UI.

### Závislosti
- `_versions.json` je sdílený datový zdroj pro AIQ-00046

---

## AUD-00001 — Komplexní audit: Branding · Záměr · Překlady CS/EN

**Datum:** 2026-04-18 | **Status:** OPEN | **Verze:** v7.10
**Rozsah:** PORTAL_PRESENTATION.html, PERSONAL_PITCH.html, OIL_CONTEXT.md, ARCH_MAP.md
**Nástroj:** Dedikovaný audit agent (Claude Sonnet 4.6) — ~7 000 řádků kódu, 751 bilingvních párů

### Statistika nálezů

| Závažnost | Počet | Oblasti |
|-----------|-------|---------|
| 🔴 HIGH   | 1     | Branding |
| 🟡 MED    | 3     | Branding (1), Překlady (1), Záměr (1) |
| 🟢 LOW    | 5     | Překlady (4), Záměr (1) |
| **Celkem** | **9** | |

### Oblast 1 — Branding (2 nálezy)

**AUD-00001-01 HIGH:** `PERSONAL_PITCH.html` ř. 543, 544, 565
`HOPI Technology` (mixed case) → musí být `HOPI TECHNOLOGY`
Lokace: timeline uzel "2027 · 20 let" a badge oblasti

**AUD-00001-02 MED:** `PERSONAL_PITCH.html` ř. 86
CSS `::after` footer obsahuje `Záměr Davida Gogely` — hardcoded česky v CSS, nepřeloží se při přepnutí do EN.
Opce: zkrátit na neutrální `HOPI TECHNOLOGY · © 2026` nebo `lang-cz/lang-en` CSS třídy.

### Oblast 2 — Konzistence záměru (2 nálezy)

**Pozitivní nález:** PORTAL_PRESENTATION.html má všechny plánované slidy. PERSONAL_PITCH.html má všech 7 oblastí. Filosofická konzistence: příběh David + HOPI + AppIQ = nová divize → SaaS je provázán v obou dokumentech.

**AUD-00001-05 MED:** BSL CSS knihovna (AIQ-00043) implementována v PERSONAL_PITCH.html ale chybí v PORTAL_PRESENTATION.html. Starší slidy stále inline styly.
Vazba na AIQ-00043 (OPEN).

**AUD-00001-06 LOW:** ARCH_MAP.md — chybí DOC kódy pro sekce `#s01`–`#s09`.
Vazba na AIQ-00034 (IN PROGRESS).

### Oblast 3 — Překlady CS/EN (5 nálezů)

**AUD-00001-03 MED:** `PERSONAL_PITCH.html` — password overlay (6 prvků) celý česky.
Prvky: pw-title, pw-subtitle, pw-label, placeholder, pw-btn, pw-footer.
Dopad: EN příjemce vidí českou vstupní obrazovku. Opravit: obalit každý prvek do lang-cz/lang-en.

**AUD-00001-04 LOW:** `PERSONAL_PITCH.html` ř. 1176 — JS error `'Nesprávné heslo. Zkuste znovu.'`
Oprava: podmíněný text dle aktivního jazyka.

**AUD-00001-07 LOW:** `PREZ_TR` ř. 5726 — překlep `portal` místo `portál` v CS originálu.

**AUD-00001-08 LOW:** `PREZ_TR` ř. 5737 — EN `sign-in for everything` → doporučeno `one login for all`.

**AUD-00001-09 LOW:** `PREZ_TR` ř. 5763 — EN `Deployable Organisational Model` → pro management pitch lépe `Scalable Organisational Model`.

### Plán oprav (Sprint A / B / C)

**Sprint A — rychlé (dělat ihned):**
- AUD-00001-01: 3× `HOPI Technology` → `HOPI TECHNOLOGY` v PERSONAL_PITCH.html
- AUD-00001-03: password overlay — obalit 6 prvků do lang-cz/lang-en
- AUD-00001-04: JS error text — přidat EN variantu

**Sprint B — obsahové:**
- AUD-00001-02: CSS `::after` footer — zkrátit nebo CSS lang varianty
- AUD-00001-08, 09: 2 slabé EN překlady v PREZ_TR

**Sprint C — technický dluh:**
- AUD-00001-05: BSL CSS blok do PORTAL_PRESENTATION.html (AIQ-00043)
- AUD-00001-06: ARCH_MAP DOC kódy (AIQ-00034)
- AUD-00001-07: překlep `portal` → `portál`

### Systémové rozhodnutí (2026-04-18)

> **AUD číslování:** `AUD-NNNNN` — 5 číslic, sekvenční, nezávislé na AIQ sérii.
> **Periodicita:** Velký audit min. 1× za major verzi nebo před každou klíčovou prezentací.
> **Nálezy trackované** v OIL.json `"audits"` pole + vizualizovány v UI záložce 🔍 Audity.
> **Vazba AIQ ↔ AUD:** Pokud nález vede k novému AIQ úkolu, propojit přes `linkedAIQ` pole.

---

## AIQ-00044 — Osobní pitch: Leadership · Road mapa · Hodnota · Spolupráce

**Status:** OPEN (2026-04-17) · Priorita: HIGH · Assignee: Claude
**Adresát:** GŘ skupiny HOPI + minoritní vlastník (3. nejvýše postavená osoba)
**Výstup:** Nová sada slidů — jeden dokument, tři části

### Záměr

David Gogela prezentuje sám sebe jako správnou osobu s vizí, businessovým cítěním a podnikatelským plánem. Cíl: otevřít cestu k formálnímu partnerství s majiteli a zhmotňení životního záměru.

---

### ✅ Odsouhlasená struktura (2026-04-17)

**Jeden dokument, tři části — sekvenční přesvědčování:**

```
ČÁST I   — Produkt a příležitost
           → čtenář musí být nejdřív nadšený z produktu

ČÁST II  — Leadership
           → teprve pak se prodá osoba

ČÁST III — Spolupráce a podmínky
           → nabídka přichází až jako třetí krok, když je čtenář připraven
```

Důvod sekvence: pokud vidí equity a čísla dřív než je nadšený z produktu, první reakce je "kolik to stojí" místo "to chci". Každá část stojí sama o sobě.

Adresát (GŘ + minoritní vlastník) má kontext a autoritu — citlivý obsah v jednom dokumentu je v pořádku.

---

### Obsah — 7 tematických oblastí

#### ČÁST I — Produkt a příležitost

*(Navazuje na stávající slidy PORTAL_PRESENTATION.html — může být shrnutí nebo nové slidy)*

**Oblast 1 — Hodnota diverzifikace rizika pro HOPI**
Strategická rovina: co AppIQ přináší ostatním divizím skupiny.

- **Supply Chain** — optimalizace logistických procesů, prediktivní AI plánování
- **Foods** — výrobní efektivita, sledování nákladů, AI quality control
- **Agriculture** — výnosové modely, počasí + trh predikce, cost tracking
- **Services** — standardizace procesů, reporting, zákaznické portály
- **Holding** — finanční konsolidace, Group Controlling (AppIQ Phase 0 = živý důkaz)

Klíčové sdělení: AppIQ není IT nástroj pro jednu divizi — je to **platformová infrastruktura pro celou skupinu**. Každá divize, která ho nasadí, snižuje náklady, zvyšuje efektivitu a přispívá k silnější investiční pozici HOPI jako celku.

Hodnoty k vizualizaci:
- Snížení nákladů na reporting (odhad hodin/rok per divize)
- Standardizace procesů → méně chyb, rychlejší rozhodování
- AI zapojení → automatizace opakovaných úloh
- Rozložení technologického rizika → HOPI není závislý na jednom dodavateli

**Oblast 2 — Hodnota firmy nyní a v budoucnosti**
Finanční rovina — dvě perspektivy:

*Perspektiva A — EBITDA a návratnost kapitálu:*
- **ROI** (Return on Investment): investice do AppIQ (tým, licence, infrastruktura) vs. úspory generované nasazením v jednotlivých divizích
  - Příklad: 5 divizí × průměrná úspora 500h/rok × průměrná hodinová sazba = roční ROI
- **ROCE** (Return on Capital Employed): jak efektivně vložený kapitál generuje provozní zisk
  - Vložený kapitál: M0–M36 investice do AppIQ
  - Výnos: interní úspory + budoucí SaaS revenue
- **EBITDA dopad**: AppIQ jako tech divize generuje vlastní EBITDA → zvyšuje celkovou EBITDA skupiny a tím i valuaci HOPI

*Perspektiva B — Tržní hodnota produktu:*
- **Dnešní hodnota**: PoC existuje, architektura je navržena, Finance Phase 0 funguje → sweat equity Davida + IP hodnota kódu + business know-how
  - Odhad: comparable early-stage SaaS — €200K–500K pre-seed valuace (konzervativní)
- **Budoucí hodnota po realizaci** (M36+): SaaS produkt s platícími zákazníky
  - Valuace SaaS = ARR × multiple (typicky 8–15×)
  - Příklad: 50 zákazníků × €2K/měsíc ARR = €1.2M ARR × 10× = **€12M valuace**
  - Příklad agresivní: 200 zákazníků × €3K/měsíc = €7.2M ARR × 12× = **€86M valuace**
- Klíčové sdělení: **vstoupit teď = vstoupit za pre-seed cenu, realizovat za growth valuaci**

---

#### ČÁST II — Leadership

**Oblast 3 — Proč zrovna David? Proč právě teď?**

Argumenty (vizualizovat jako karty nebo timeline):
- **Insider výhoda** — zná HOPI zevnitř: procesy, lidi, IT, finance, kultura
- **Proof of concept** — AppIQ Phase 0 existuje a funguje. Postavil ho sám, s AI, za zlomek ceny externího dodavatele
- **Dual kompetence** — rozumí businessu (controlling, finance, group management) I technologii (AI-native development) — kombinace vzácná na trhu
- **Skin in the game** — není konzultant zvenku. Je to zaměstnanec HOPI s osobním závazkem k výsledku
- **Timing** — AI transformace probíhá právě teď. Kdo nezačne v 2026, bude dohánět 5+ let a platit externím dodavatelům mnohem víc
- Vazba na AIQ-00033 (Marketing narrative — 6 ARCs osobního příběhu)

**Oblast 4 — Road mapa**

Vizuální timeline zaměřená na "David jako kapitán":
- **M0–M1**: Schválení záměru, sestavení týmu (2–3 lidé), kick-off
- **M1–M6**: SEED — Finance rollout, první výsledky, interní validace
- **M6–M12**: PILOT — rozšíření na 2–3 divize, první měřitelné úspory
- **M12–M24**: SCALE-IN — Group rollout, všechny divize, HOPI TechIQ s.r.o. formalizována
- **M24–M36**: SCALE-OUT — první externí zákazníci, komerční produkt
- **M36+**: SaaS — plně komerční platforma, vlastní revenue

**Oblast 5 — Další kroky**

Odpověď na otázku "a co se stane po tomto setkání?":
- **Týden 1**: Formální souhlas / feedback od GŘ
- **Týden 2–4**: Definice podmínek spolupráce (právní, finanční)
- **Měsíc 1**: Schválení rozpočtu M0–M6 (10–20 MD ext. + interní tým)
- **Měsíc 2**: Kick-off SEED fáze

---

#### ČÁST III — Spolupráce a podmínky

**Oblast 6 — Struktura vstupu do podnikání**

Co David nabízí / co žádá:

| Strana | Vklad | Forma |
|--------|-------|-------|
| **David** | Čas, expertise, hotový PoC, architektura, vize, budoucí příjmy (odložená odměna) | Zakladatelský podíl HOPI TechIQ s.r.o. |
| **HOPI Holding** | Brand, distribuce, interní zákazníci, rozpočet M0–M6, infrastruktura | Investorský podíl, strategický partner |

Možné formy vstupu (k diskuzi s právníkem):
- Kapitálová účast v HOPI TechIQ s.r.o. (David 51%, HOPI 49% nebo jiný poměr)
- Smlouva o spolupráci + profit share
- Interní startup s opcemi (ESOP)

**Oblast 7 — Hodnota vlastního vkladu Davida**

Jak správně ocenit a nabídnout vlastní zdroje jako spoluúčast:
- **Sweat equity**: čas strávený na vývoji PoC (odhad: 200–400h × tržní sazba senior architekta €150/h = €30K–60K)
- **IP hodnota**: kód, architektura, know-how — co by stálo externě? (odhad: €100K–200K)
- **Budoucí závazek**: David se zavazuje k X letům vedení projektu → odložená odměna místo tržní mzdy = dodatečný vklad
- Klíčové sdělení: David nevstupuje s prázdnýma rukama — vstupuje s hotovým produktem, know-how a osobním závazkem

---

### Závislosti

| AIQ | Popis | Vztah |
|-----|-------|-------|
| AIQ-00033 | Marketing narrative — 6 ARCs | Základ pro Oblast 3 (Leadership) |
| AIQ-00036 | Tým & Start — ESOP struktura | Vstup do Části III |
| AIQ-00043 | CSS komponentová knihovna | Technický základ pro stavbu slidů |
| AIQ-00020 | Draft mail CEO/CFO | Načasování odeslání |
| AIQ-00038 | Projektor ladění | Před fyzickým pitchem |

### Klíčová rozhodnutí (2026-04-17)

> **Struktura**: Jeden dokument, tři části — odsouhlaseno ✅
> **Adresát**: GŘ skupiny HOPI + minoritní vlastník — citlivý obsah v jednom dokumentu je OK ✅
> **Sekvence**: Produkt → Leadership → Podmínky — odsouhlaseno ✅
> **Finanční dimenze**: EBITDA/ROI/ROCE + tržní valuace SaaS — přidat do Části III ✅
> **Diverzifikace rizika**: hodnota pro všechny divize HOPI — přidat do Části I ✅

---

## AIQ-00043 — CSS komponentová knihovna pro nové slidy

**Status:** OPEN (2026-04-17) · Priorita: MED · Assignee: Claude
**Výstup:** CSS třídy v PORTAL_PRESENTATION.html pro responsive-first stavbu nových slidů

### Kontext

Stávající biz-scale slidy mají ~90% inline stylů → nelze škálovat CSS breakpointy (viz AIQ-00037). Nové slidy mohou být od začátku postaveny jinak — na CSS třídách s breakpointy.

### Třídy k definování

| Třída | Nahrazuje inline | Breakpointy |
|-------|-----------------|-------------|
| `.bsl-label` | `font-size:10px;letter-spacing:2px;color:rgba(...)` | height 768, width 900, 1920+ |
| `.bsl-eyebrow` | alias `.bsp-eyebrow` — rozšířit | existující |
| `.bsl-title` | alias `.bsp-title` — rozšířit | existující |
| `.bsl-grid-2col` | `display:grid;grid-template-columns:1fr 1fr` | → 1fr na ≤768px |
| `.bsl-grid-3col` | `display:grid;grid-template-columns:1fr 1fr 1fr` | → 1fr na ≤900px |
| `.bsl-card` | `padding:20px;border-radius:12px;border:1px solid` | padding škáluje |
| `.bsl-insight` | alias `.scale-insight` — rozšířit | existující |
| `.bsl-phase-row` | grid fázových karet | → stack na ≤768px |
| `.bsl-value-big` | `font-size:48px;font-weight:900` | clamp() |
| `.bsl-tag` | badge/tag prvky | font-size škáluje |

### Klíčové rozhodnutí (2026-04-17)

> Implementovat před prvním novým slidem. Uložit jako CSS blok `/* ══ BSL KOMPONENTY ══ */` v PORTAL_PRESENTATION.html.

---

## AIQ-00042 — Formalizovat archivační proceduru

**Status:** OPEN (2026-04-17) · Priorita: HIGH · Assignee: Claude
**Výstup:** AUTO_ARCHIVE.bat v2 + kompletní checklist + ověřená procedura

### Proč vznikl

Při archivaci session v7.9 se ukázalo, že stávající AUTO_ARCHIVE.bat a manuální kroky nejsou dostatečně systematické — archiv neobsahoval vždy vše potřebné (chyběla aplikace, .md soubory, nekonzistentní pojmenování složek).

### Co aktuálně chybí / je problematické

| Problém | Popis |
|---------|-------|
| Pojmenování archivů | Míchají se `session_TIMESTAMP` a `v7.x-WebPage_TIMESTAMP` — není konzistentní |
| Chybějící META soubory | `PORTAL_ARCHITECTURE.md` a `CLAUDE.md` nejsou archivovány nikde |
| Chybějící BRIEFING.md | Není v AUTO_ARCHIVE.bat — kopíruje se jen ručně |
| Žádná verifikace | Bat neověřuje, zda klíčové soubory skutečně existují před kopírováním |
| Nové soubory bez aktualizace batu | `RESPONSIVE_DATA.js` přidán v7.9, bat o něm neví (xcopy to řeší, ale explicitní checklist chybí) |
| `pause` na konci | Blokuje automatizované spouštění |

### Navrhovaný kompletní checklist (Claude navrhne implementaci)

**WEB stream — musí být v každém archivu:**
- `index.html`
- `PORTAL_PRESENTATION.html`
- `BRAND_CONCEPTS.html`
- `_ver.js`
- `ARCH_MAP_DATA.js`
- `RESPONSIVE_DATA.js`
- `PLATFORM_VISION.md`
- `_audio/` (složka)
- `assets/` (složka)

**APP stream — musí být v každém archivu:**
- `index.html`

**META snapshot (`_SESSION_START/`) — musí obsahovat:**
- `BRIEFING.md` ← nyní chybí v batu
- `OIL.json`
- `OIL_CONTEXT.md`
- `ARCH_MAP.md`
- `CHANGELOG.md`
- `PORTAL_ARCHITECTURE.md` ← nyní chybí v batu
- `CLAUDE.md` ← nyní chybí v batu

**Pojmenování archivů:**
- Aktuálně: `session_20260417_2300` — neobsahuje verzi
- Návrh: `v7.9_20260417_2300` — okamžitě jasné jaká verze

**Verifikační krok:**
- Po dokončení zkontrolovat přítomnost klíčových souborů
- Vypsat počet souborů v každém archivu
- Upozornit pokud něco chybí

### Klíčové rozhodnutí (2026-04-17)

> David: "urgent jako další krok" — řešit jako první bod příští session, před přidáváním nového obsahu.
> Claude navrhne novou verzi AUTO_ARCHIVE.bat v2 a checklist k odsouhlasení.

---

## AIQ-00041 — Promo web: mobilní zobrazení optimalizace

**Status:** OPEN (2026-04-17) · Priorita: LOW · Stream: WEB
**Výstup:** Optimalizovaný promo web pro telefony (360–768px)

### Kontext

Promo web je primárně navržen pro desktop/laptop. Na mobilním telefonu technicky funguje, ale je informačně bohatý — uživatel musí hodně scrollovat. Identifikováno při responsivním review v7.8.

### Konkrétní žluté oblasti

| Oblast | Šířka | Symptom |
|--------|-------|---------|
| Tablet/velký telefon | 481–768px | Gridy → 1 sloupec, CTA přes šířku — funkční, ale hodně obsahu na malé obrazovce |
| Malý telefon | ≤480px | Arch/OIL tlačítka v navu schována, HOPI stamp animace pryč, hero min 26px |
| Micro telefon | ≤360px | Neotestováno — potenciál overflow nebo překryv prvků |

### Návrhy optimalizace (k diskuzi)

1. **Sticky bottom nav** — pro mobil přidat spodní navigační lištu (Home / Prezentace / Portál) místo top nav tlačítek
2. **Hero text zkrátit** — na mobilu hero title a slogan mají zkrácené varianty (data-mobile atribut?)
3. **Pillars section** — na mobilu možná zobrazit pouze ikonu + název, ne celý popis
4. **Otestovat na reálných rozlišeních** — 360px (Galaxy S), 390px (iPhone 14), 430px (iPhone 15 Plus)

### Klíčové rozhodnutí (2026-04-17)

> Promo web posílá David managementu — pravděpodobně notebook. Mobilní verze LOW priorita, řešit až po hlavních contentu a prezentaci.

---

## AIQ-00040 — Finance portál: tablet 768–1024px optimalizace

**Status:** OPEN (2026-04-17) · Priorita: LOW · Stream: APP
**Výstup:** Použitelný portál na tabletu v landscape mode

### Kontext

Finance portál je interní pracovní nástroj — primárně desktop. Červená oblast na 768–1024px identifikována při responsivním review v7.8. Na tabletu (iPad landscape, Windows tablet) je portál viditelně nepohodlný.

### Konkrétní červené problémy

| Oblast | Symptom | Technická příčina |
|--------|---------|-------------------|
| Topbar wrappuje | Druhý řádek přeteče do 2 řádků | `flex-wrap:wrap` při ≤1024px + mnoho prvků |
| `height:calc(100vh - 160px)` | Výška `.tbl-wrap` a `.sb` je spočítána staticky — při taller topbaru obsah přeteče | Hardcoded konstanta |
| Sidebar 150px | Příliš úzký pro `.sb-title`, statistiky, task rows | `width:150px` na ≤900px |
| Datetime schován | `#tb-datetime` hidden na ≤1024px — uživatel nevidí čas | Záměrné ale viditelné |

### Návrhy implementace (k diskuzi)

1. **Dynamický topbar height** — změřit topbar výšku JS a nastavit CSS proměnnou `--topbar-h`, použít v `calc(100vh - var(--topbar-h))`
2. **Collapsible sidebar** — na ≤1024px sidebar schovat za ikonovou lištu (hamburger / chevron)
3. **Breakpoint 900px → 1024px** — posunout "full collapse" sidebar breakpoint výše
4. **Prioritní test**: otevřít portál v DevTools na 900×800 a 1024×768 a zmapovat reálné přetečení

### Klíčové rozhodnutí (2026-04-17)

> Portál = interní desktop tool. Tablet je okrajový případ. Implementovat po stabilizaci funkcí Phase 0. Koordinovat s případnou mobilní verzí (mob-kpi je výchozí mobilní UI).

---

## AIQ-00039 — Prezentace: responsivita HD 1366×768 + tablet + mobil

**Status:** OPEN (2026-04-17) · Priorita: MED · Stream: WEB
**Výstup:** Prezentace bez vizuálních problémů na HD notebooku a tabletu

### Kontext

Nejkritičtější responsivní problém v celém projektu. HD notebook (1366×768) je stále velmi rozšířený v korporátním prostředí — HOPI má pravděpodobně desítky takových zařízení. Prezentace se odesílá managementu na neznámá zařízení.

### Konkrétní červené a žluté problémy

| Oblast | Rozlišení | Status | Symptom |
|--------|-----------|--------|---------|
| HD notebook | 1366×768 | 🔴 | Dvojitý zásah: šířka ≤1366px (padding 36px, bsp-title 26px) + výška ≤768px (padding-top 60px, bsp-title 24px). Výsledek: velmi komprimované slidy |
| Tablet (iPad) | ≤900px | 🟡 | Gridy → 1 sloupec, Back/PDF skryty, `.sp-value` hidden — čitelné ale ochuzenné |
| Mobil | ≤600px | 🔴 | `min-height:auto` = slidy nejsou fullscreen, scrollují, cover je kompaktní — obsah není navržen pro takto malou obrazovku |

### Testovací postup pro HD 1366×768

1. Otevřít prezentaci v Chrome DevTools
2. Nastavit viewport: 1366×768 (nebo 1366×697 po odečtu Windows taskbaru)
3. Projít každý slide — zkontrolovat:
   - Přetékají elementy přes `min-height:100vh`?
   - Je `bsp-title` 24px čitelný?
   - Jsou scale-phases viditelné bez scrollování?
4. Prioritně zkontrolovat: SLD-0F (finanční tabulka), SLD-0T (market hub diagram), SLD-0S (team cards)

### Návrhy oprav

1. **Height 768px breakpoint pro bsp-title** — přidat `@media(max-height:768px){ .bsp-title{font-size:22px} }` (aktuálně je tam, zkontrolovat zda nestačí)
2. **SLD-0F finanční tabulka** — komplexní inline grid, možné přetečení na 1366px — ověřit
3. **SLD-0T market diagram** — hub diagram, ověřit zda se vejde
4. **Přidat `overflow:hidden` na `.biz-scale-page`** — zabránit nechtěnému přetečení

### Závislosti

- AIQ-00038 — projektor ladění (koordinovat: HD notebook a projektor mají podobné problémy)
- AIQ-00037 — inline refactoring (kompletní fix vyžaduje refactoring, ale rychlý fix je možný i bez něj)

### Klíčové rozhodnutí (2026-04-17)

> Identifikováno při responsivním přehledu v7.8. MED priorita — řešit před pitchem nebo sdílením prezentace s managementem na neznámých zařízeních.

---

## AIQ-00038 — Prezentace: ladění pro plátno/projektor

**Status:** OPEN (2026-04-17) · Priorita: MED
**Výstup:** Doladěná PORTAL_PRESENTATION.html pro projekci před majiteli skupiny HOPI

### Kontext

Jakmile se přiblíží termín pitche majiteli skupiny HOPI, bude potřeba projít prezentaci speciálně pro projektor/plátno. Prohlížeč na notebooku ≠ obraz na projektoru — jiný kontrast, jiná vzdálenost, jiný světelný podmínky.

### Co konkrétně řešit

1. **Kontrast a čitelnost** — tmavé pozadí + bílé texty jsou obecně dobré pro projektory; ověřit zda světlejší části (dokumentační sekce s bílým pozadím) nejsou na projektoru příliš oslnivé
2. **Velikosti fontů pro vzdálenou projekci** — titulky min 60px, tělo min 16px viditelné z 5–8 metrů
3. **Animace** — otestovat zda scroll-reveal animace a canvas efekty vypadají dobře na projektoru nebo zda je lepší je vypnout (přidat `?mode=static` toggle?)
4. **Poměr stran** — standardní projektor 16:9 (1920×1080); nastavit DevTools na 1920×1080 a ověřit každý slide
5. **PDF export** — záložní varianta pokud projektor nefunguje s webem; otestovat tlačítko PDF

### Klíčové rozhodnutí (2026-04-17)

> David: "jakmile se přiblíží termín prezentace majiteli, tak musíme doladit plátno"
> Pitch termín zatím neznámý — otevřít úkol jako aktivní jakmile David obdrží potvrzení data.

### Závislosti

- AIQ-00020 — CEO/CFO mail → pitch termín
- AIQ-00033 — Marketing narrative → obsah musí být uzavřen před laděním pro plátno

---

## AIQ-00037 — Refactoring: inline styly → CSS třídy

**Status:** OPEN (2026-04-17) · Priorita: LOW
**Výstup:** Plně responzivní biz-scale slidy škálovatelné od 320px po 3440px+

### Technický kontext

**Problém:** Biz-scale slidy v PORTAL_PRESENTATION.html používají z ~90 % inline styly (`style="font-size:10px"`, `style="display:grid;grid-template-columns:1fr 140px 1fr"`). CSS třídy (media queries) nemohou tyto hodnoty přepsat bez `!important` a attribute selectoru `[style*="..."]`, což je křehké.

**Aktuální stav:** CSS-class prvky se škálují správně:
- `bsp-title`, `bsp-sub`, `bsp-eyebrow` — mají clamp() hodnoty pro 1920px+ a 3200px+
- Padding slidů — škáluje se
- Cover, TOC, `.page` dokumentační sekce — škálují se

**Co neškaluje:** Inline obsah uvnitř biz-scale slidů:
- Labely 8–10px (dekorativní popisky jako "Platforma", "Stream 1", timestamps)
- Inline grid-template-columns (fixní proporce)
- Inline padding/gap uvnitř karet

**Proč LOW priorita:** Management, který dostane odkaz na prezentaci, pravděpodobně nemá ultrawide monitor. Refactoring je kosmetický pro edge case.

### Rozsah refactoringu (pro příští implementaci)

| Slide | Odhadovaný počet inline definic |
|-------|---------------------------------|
| #s-moment | ~10 |
| #s-proposal | ~8 |
| #s-financial | ~20 (komplexní tabulka) |
| #s-hopi6 | ~12 |
| #s-strategy | ~10 |
| #s-market | ~15 (hub diagram) |
| #s-team | ~14 (fázové karty) |
| #s-brand, #s-partners | ~8 každý |
| vision-page, schema-page, devdeploy-page | ~10 každá |

**Přístup:** Pro každou inline hodnotu vytvořit CSS třídu + přidat ji do media queries. Nebo použít CSS custom properties (variables) s hodnotami per breakpoint.

### Klíčové rozhodnutí (2026-04-17)

> David: "tuto změnu budu chtít, ale naplánuj jako nízkou prioritu"
> Implementovat v klidnější fázi, ne před pitch termínem.

---

## AIQ-00036 — Slide: Tým a konfigurace pro start

**Status:** OPEN (2026-04-17) · Priorita: HIGH
**Výstup:** Nový biz-scale slide `SLD-TEAM` v PORTAL_PRESENTATION.html

### Klíčová rozhodnutí (2026-04-17)

> **Rychlý start, školíme interně.** Senior věci = externí partneři (ARTIN, INTECS). Interní nábor v HOPI — atraktivní projekt, kdo se chce přihlásit. Postupný náběh dle objemu, kapacity, peněz a zdrojů.

### Záměr a kontext

David chce slide, který ukáže co je potřeba pro rozjezd AppIQ — jak pro interní nasazení, tak pro přípravu externího scale-out. Důraz na konkrétnost: lidé, nástroje, licence, prostor.

### Struktura týmu (zadání od Davida)

**David Gogela** = hlava týmu, architekt platformy, business owner produktu

**Tým 3 lidí pro start** (hledat/definovat profily):
- Pravděpodobné role: Full-stack developer, AI/Prompt engineer, UX/Product designer
- Každý musí být schopen AppIQ samostatně rozvíjet pod Davidovým vedením
- Každý dostane nejlepší Claude AI konfiguraci + plnou palbu kreditu

### Claude developer konfigurace — zjistit a navrhnout

K diskuzi a ověření (aktuální stav k 2026-04-17):
- **Claude MAX** — nejlepší předplatné pro vývojáře (5x více výkonu, Claude Code, Projects)
- **Claude Code** — CLI nástroj pro přímou práci s kódem v terminálu
- **Anthropic API** — přímý API přístup pro budování aplikací (klíče, rate limity, tiers)
- **Model:** claude-opus-4-6 pro nejnáročnější úkoly, claude-sonnet-4-6 pro denní práci
- Orientační cena: Claude MAX ~$100/měsíc/osobu + API kredity dle spotřeby
- Pro tým 4 (David + 3): ~$400-500/měsíc pro AI nástroje

### Škálování týmu po fázích — dle objemu, kapacity, zdrojů

| Fáze | Popis | Tým | Zdroj lidí | Financování | Horizont |
|------|-------|-----|-----------|-------------|----------|
| **SEED** | Rozjezd, proof of concept | David + 2–3 | Interní nábor HOPI (dobrovolníci) + 1 junior ext. | HOPI rozpočet | M0–M6 |
| **PILOT** | Finance rollout, první výsledky | David + 4–5 | +1–2 interní, senior věci = ARTIN/INTECS externně | HOPI + první úspory | M6–M12 |
| **SCALE-IN** | HOPI Group, více divizí | David + 6–8 | Cílený nábor, první dedikovaní AppIQ lidé | Interní ROI krytí nákladů | M12–M24 |
| **SCALE-OUT** | Externalizace, první platící zákazníci | David + 10–15 | Mix interní/externí, první komerční tým | Revenue ze zákazníků | M24–M36 |
| **SaaS** | Plný komerční produkt | 20+ | Plná firma HOPI TechIQ s.r.o. | SaaS revenue | M36+ |

**Klíčový princip:** V každé fázi tým nepřekročí to, co je financováno výsledky té fáze. Žádný burn bez pokrytí.

### Upřesnění od Davida (2026-04-17)

**M0–M6 rozpočet:**
- Interní mzdový rozpočet: zatím nedefinován
- Subdodávky / externí konzultace: **10–20 MD** — budget zatím neschválen, ale realistický
- Partneři (ARTIN, INTECS): zapojit na konzultace M0–M6, pokud se osvědčí → dalších 10–20 MD v dalších fázích

**Equity / profit sharing:**
- **ANO** — David otevřen sdílení pro sebe i pro tým
- Moderní přístup, zvyšuje atraktivitu projektu
- Forma: ESOP nebo profit share (upřesnit v právní fázi, HOPI TechIQ s.r.o.)
- Pro slide: zmínit jako součást nabídky interním kandidátům

**Role a profily:**
- Zatím bez konkrétního inzerátu
- Role abstraktní — definovat v dalším kole (slide ukáže typy rolí, ne konkrétní JD)

**Interní nábor HOPI:**
- Cílit na lidi v HOPI kteří chtějí být součástí tech projektu
- Atraktivní: nová technologie, AI, možnost růstu, potenciální podíl

### Vazby v prezentaci
- Provázat s `SLD-0F` (Finanční rozvaha — náklady na tým)
- Provázat s `DOC-08` (Fázový plán & Milníky)
- Zvážit umístění: za `SLD-0F` nebo jako součást `SLD-0C` (6. divize)

---

## AIQ-00035 — Slide: Tržní strategie — modulární škálování, Business vs. Retail

**Status:** OPEN (2026-04-17) · Priorita: HIGH
**Výstup:** Nový biz-scale slide `SLD-MARKET` v PORTAL_PRESENTATION.html

### Záměr a kontext

David chce slide o tržní strategii při externím scale-out: jak modulárně budovat AppIQ tak, aby:
1. Existovalo **aktivní jádro** (core platform) — vždy funkční, vždy prodejné
2. Kolem jádra se přidávají moduly/aplikace — platforma roste, ale nikdy není "rozbitá"
3. Produkt je kdykoliv nabídnutelný zákazníkovi bez ohledu na to, v jaké fázi vývoje jsme

### Klíčová rozhodnutí (2026-04-17)

> **Retail stream = od začátku, paralelně s Business.** David: "Obrovský potenciál na planetě — musíme to začít rozmýšlet od začátku." Nejde o výhled — jde o součást základní strategie.

### Dva paralelní streamy (zadání od Davida)

**Stream 1 — Business (firemní aplikace)**
Příklady k rozpracování:
- Finance & Controlling (HOPI AppIQ Phase 0 — již existuje)
- HR & People Management (docházka, hodnocení, onboarding)
- Operations & Logistics (přepravy, sklady, KPI dashboard)
- Procurement (schvalovací workflow, dodavatelé)
- Legal & Compliance (smlouvy, GDPR, reporty)
- Executive Dashboard (C-level přehled skupiny)

**Stream 2 — Retail / Personal (domácí & osobní aplikace)**
Příklady k rozpracování:
- Rodinné finance (budget, výdaje, spoření, cíle)
- Osobní plánování (úkoly, projekty, habity, cíle)
- Smart Home asistent (zařízení, energie, spotřeba)
- Health & Wellness tracker (pohyb, spánek, strava)
- Vzdělávání & rozvoj (kurzy, knihy, progres)
- Rodinný organizér (kalendář, nákupy, události)

### Vizuální koncept (návrh)

Možnosti k diskuzi:
- **Hexagonal grid** — jádro uprostřed, moduly jako přiléhající hexagony (rozrůstá se)
- **Orbit model** — jádro = planeta, moduly = oběžné dráhy (Business orbit + Retail orbit)
- **Dělená osa** — levá polovina Business, pravá Retail, jádro uprostřed (most)

### Klíčová zpráva pro slide

> *"Stavíme jednou, nasazujeme všude — stejné jádro, nekonečné možnosti."*
> Každá fáze vývoje = prodejitelný produkt. Žádný "work in progress" z pohledu zákazníka.

### Vazby v prezentaci
- Provázat s `SLD-0E` (Strategický pohled — diverzifikace rizika)
- Provázat s `DOC-12` (Architektonická roadmap — Bloky 4–7)
- Provázat s `DOC-13` (Výhled — Skalování mimo HOPI)
- Zvážit umístění: za `SLD-0E` nebo jako samostatný slide před/za `SLD-0C`

---

## AIQ-00034 — Architekturní mapa: kódy a vazby všech objektů

**Status:** IN PROGRESS (2026-04-17)
**Výstup:** `ARCH_MAP.md` v root projektu

### Záměr a kontext

David požadoval zmapování architektury celého projektu — WEB stream (promo web), PREZ stream (prezentace), APP stream (aplikace). Cíl: každý objekt (screen, slide, sekce, modul) dostane krátký kód, aby se dalo odkazovat jednoduše místo opisování dlouhých názvů souborů.

### Navržený systém kódování

| Prefix | Co označuje | Příklad |
|--------|-------------|---------|
| `SCR-xx` | Overlay screeny v prezentaci | `SCR-01` = Intro screen |
| `IDX-xx` | Sekce promo webu (index.html) | `IDX-01` = Hero |
| `SLD-xx` | Biz-scale slidy prezentace | `SLD-0W` = s-moment |
| `DOC-xx` | Doc sekce prezentace (s00–s25) | `DOC-00` = s00 Executive summary |
| `MOD-xx` | Overlay modály v prezentaci | `MOD-01` = Brand modal |
| `APP-xx` | Moduly Finance portálu | `APP-01` = Kalendář |

### Vazby mezi objekty — klíčové

- `IDX` → `SLD/DOC` (via href PORTAL_PRESENTATION.html)
- `IDX` → `APP` (via href HOPI_AppIQ/Release/index.html)
- `IDX` → `BRAND_CONCEPTS.html` (link Brand Concepts)
- `SCR-01` → `SCR-02` (closeIntroScreen → story)
- `SCR-02` → `SCR-03` (closeStoryScreen → teaser)
- `SCR-03` → prezentace (closeTeaserOverlay)
- `MOD-01` → `BRAND_CONCEPTS.html` (iframe)
- Navigace v prezentaci: TOC linky, prev/next tlačítka

### Poznámky k implementaci
- Kódy jsou VIRTUÁLNÍ — nepřidávají se do HTML jako ID, jsou jen pro referenci v komunikaci David↔Claude a v dokumentaci
- `ARCH_MAP.md` je živý dokument — aktualizovat při přidání nových objektů
- V OIL_CONTEXT.md a BRIEFING.md používat kódy ve vazbách na slidy/screeny

---

## AIQ-00030 — Pre-slide: Globální kontext AI (slide 0W)

**Status:** CLOSED (2026-04-17)
**Slide:** `#s-moment` (TOC 0W) — absolutně první slide za cover stránkou

### Záměr a kontext
David požadoval úvodní slide, který před celým záměrem nastaví globální kontext:
- AI je game changer stejné magnitude jako internet v 90. letech — ale 5× rychlejší adopce
- Urgence: "Kdo chvíli stál, stojí opodál" — okno 2024–2027 se otevírá nyní
- Technologie nezná hranice — stejný produkt funguje v Praze i Singapuru
- Příležitost pro HOPI: transformace celé skupiny + vstup na globální trh
- David se nabízí jako leader — nápad → záměr → funkční prototyp → plán

### Klíčové designové rozhodnutí
- Tón: dramatický, ale faktický — ne panika, ale urgence
- Vizuální struktura: Internet 90s vs. AI 2020s srovnávací grid (levá/pravá strana)
- Citát: české přísloví "Kdo chvíli stál, stojí opodál" jako urgency hook
- Closing: osobní nabídka Davida jako leadra — přechod na #s-proposal
- Background: tmavší gradient (odlišení od ostatních biz-scale-page)

### Slide pořadí (celá úvodní sekvence)
```
Cover → #s-moment (0W) → #s-proposal (★) → #s-financial (0F) → TOC → zbytek
```

---

## AIQ-00032 — Slide #s-partners: Strategická partnerství ARTIN · INTECS · Anthropic

**Status:** CLOSED (2026-04-17)
**Slide:** `#s-partners` (TOC 0P) — vložen za #s-strategy, před #s-build

### Záměr a kontext

David označil strategická partnerství jako klíčový bod dlouhodobého záměru a podmínku business úspěchu AppIQ. Tři partneři tvoří ekosystém pro cestu od HOPI Group k celosvětovému trhu.

### ARTIN — Artificial Intelligence

**Status:** AKTIVNÍ PILOT — PROBÍHÁ NYNÍ 🟢
**Role:** Přináší umělou inteligenci do různých business oblastí a reálných aplikací — AI intelligence/logic layer
**Příspěvek na pilotních projektech:**
- **AI FINCO PBI Designer** — AI logika pro generování Power BI reportů; NLP → report struktura
- **AI FINCO PBI Analyser** — AI vrstva pro interpretaci dat, business kontext, anomálie
**Proč ARTIN:** AI v podnikových procesech v praxi — nejen teorie, ale reálně nasazená inteligence
**Zájem:** Eminentní zájem o dlouhodobou spolupráci s HOPI

### INTECS — Intelligent Technologies

**Status:** AKTIVNÍ PILOT — PROBÍHÁ NYNÍ 🟢 *(opraveno 2026-04-17: původně zapsáno jako "Jednání", ale INTECS se aktivně podílí na obou projektech)*
**Role:** Partner pro Microsoft řešení a platformu MS Power BI — MS/Power BI platform layer
**Zaměření:** Hluboká znalost Power BI Embedded, licencování, RLS architektury, MS ekosystém
**Příspěvek na pilotních projektech:**
- **AI FINCO PBI Designer** — Power BI Embedded, workspace API, RLS, dataset management
- **AI FINCO PBI Analyser** — Power BI datový model, DAX optimalizace, report distribuce
**Proč INTECS:** Power BI v produkci — licencování, škálování, enterprise nasazení
**Zájem:** Dlouhodobé partnerství s HOPI je pro INTECS strategická priorita

### Komplementarita ARTIN + INTECS

ARTIN a INTECS nejsou konkurenti — jsou komplementární partneři:
- **ARTIN** = AI intelligence layer (umělá inteligence, NLP, business logika)
- **INTECS** = MS Power BI platform layer (infrastruktura, embed, licencování)
- Dohromady dodávají AI-powered BI řešení na Microsoft infrastruktuře

### Anthropic / Claude AI

**Status:** STRATEGICKÝ CÍL · LONG-SHOT AMBICE 🔵
**Dnes:** Claude Agent = core AI vrstva AppIQ — tvorba aplikací, analýzy, dokumentace, architekt platformy. David + Claude budují AppIQ společně od základu.
**Strategická ambice:** Oslovit Anthropic s nabídkou formálního partnerství.
- AppIQ = **flagship showcase AI-native enterprise platformy s globálním dosahem**
- Anthropic hledá enterprise reference cases pro Claude — AppIQ (validovaný na 500+ uživatelích skupiny) je přesně to, co by je mohlo zaujmout
- "Kdo se bojí, nesmí do lesa" — odvážná ambice, ale logická

**Klíčové zdůvodnění (David, 2026-04-17):**
Tři partnerství tvoří ideální ekosystém:
- **ARTIN** = AI intelligence layer (aktivní pilot, reálné nasazení AI do business procesů)
- **INTECS** = MS Power BI platform layer (aktivní pilot, Power BI expertise v produkci)
- **Anthropic** = globální AI lídr (nejlepší AI backbone, mezinárodní dosah a reference)

Kombinace těchto tří spojenectví je klíčovým faktorem business úspěchu na CEE i globálním trhu.

---

## AIQ-00031 — Prezentace v7.1: Cash-flow, EUR/CZK toggle, trh B2B/B2C, loga, Anthropic

**Status:** CLOSED (2026-04-17)
**Slidy:** `#s-financial` (přepracován), `#s-strategy` (rozšířen), `#s-proposal` (logo), `#s-hopi6` (logo)

### #s-financial — nová struktura (Cash-flow po fázích)

Přechod od statické investiční tabulky na cash-flow pohled s EUR/CZK toggle:

| Fáze | Období | Popis | Investice | EBITDA |
|------|--------|-------|-----------|--------|
| Fáze 1 | M0–M24 | Interní pilot + skupinový rollout | ~€400K / ~10M Kč | záporné (pre-revenue) |
| Fáze 2A | M24–M36 | Příprava vstupu na trh | ~€400K / ~10M Kč | záporné (investiční) |
| Fáze 2B | M36+ | Komerční launch + škálování | — | Y1: −€0.15M, Y2: BEP, Y3–Y5: zisk |

**EUR/CZK toggle:** primárně EUR (1 EUR = 25 Kč). Implementace: `.curr-eur-val` / `.curr-czk-val` třídy, JS funkce `toggleFinCurr()`, tlačítko v pravém horním rohu slidu. Defaultní stav: EUR zobrazeno, CZK skryto.

**Klíčová čísla (EUR):**
- Celková investice M0–M36: ~€800K
- BEP: Rok 2 (M48–M60)
- Kumulativní zisk 5 let: ~€4.8M
- Valuace rok 5 (5× ARR): ~€19M

### #s-strategy — rozšíření: Cílový trh a filozofie produktu

David zadal (2026-04-17) klíčové filozofické aspekty:

**B2B trh (4 tiery):**
- SMB: rodinné firmy, menší holdingy · 10–200 uživ. · CEE
- Mid-market: skupiny 200–1000 uživ. · více zemí · multi-entity finance
- Enterprise: korporace 1000+ uživ. · white-label SaaS · globální ops
- Globální hráči: Fortune 500 · PE portfolia · největší světové skupiny

**B2C trh:**
- Retailová klientela · aplikace pro domácí použití · osobní produktivita
- Rodinné finance · domácí AI asistent

**Mobile-first strategie:**
- Telefon jako primární platforma (office agenda se přesouvá na mobil — doma i v businessu)
- AppIQ cílí na všechna zařízení, primárně smartphone

**Platforma-first filozofie (KLÍČOVÝ ASPEKT):**
> Vlastní AppIQ aplikace (Finance, Operations, HR…) jsou *sekundárním benefitem*. Primárním cílem je vybudovat **kompaktní platformu pro rychlou tvorbu aplikací všeho druhu za pomoci AI** — aby to vůbec mohlo vznikat.

Toto je zásadní přeformulování — AppIQ není "jen" enterprise portal, ale **platforma pro AI-nativní tvorbu aplikací** s vlastními aplikacemi jako proof-of-concept.

**Strategické partnerství — Anthropic / Claude AI:**
- Claude Agent = klíčový development partner (již dnes)
- Ambice: formálně oslovit Anthropic s nabídkou partnerství
- Zdůvodnění: "Kdo se bojí, nesmí do lesa" — AppIQ může být ukázkovým use-casem AI-native enterprise platformy celosvětového dosahu
- Toto je long-shot strategický cíl, ale fundamentálně správný směr

### Loga — inline SVG (bez externích závislostí)

**HOPI TECH (HT monogram):**
- Zelený gradient (#1A6040 → #0A3820)
- HT text, font-weight 900, bílý
- Umístění: divize 6 box v #s-hopi6
- Rozměr: 36×36px, border-radius 8

**HOPI AppIQ (Diamond IQ mark):**
- Orange → green gradient (#E8750A → #1A6040)
- Diamond (polygon) shape s "IQ" textem uvnitř
- Umístění: #s-proposal (52×52px), #s-strategy closing box (32×32px)
- Různé `id` pro linearGradient: `iq-bg` a `iq-bg2` (aby se nepřekrývaly)

---

## AIQ-00028 — Slide #s-proposal: Podnikatelský záměr Davida Gogely

**Status:** CLOSED (2026-04-17)
**Slide:** `#s-proposal` (TOC ★) — hned za #s-moment, před TOC

### Záměr a kontext
David chce jasně rámovat celou prezentaci jako svůj osobní podnikatelský záměr:
- Tón: sebevědomě, ale pokorně — "přináším záměr, o rozhodnutí žádám vás"
- Investor angle: vstupuje osobně jako investor (kůže na talíři), protože tomu věří
- 5 pilířů: Silná myšlenka + Vize + Funkční prototyp + Plán + Strategické partnerství (Claude AI)
- Claude AI / Anthropic explicitně jmenováno jako strategické partnerství
- 3 konkrétní žádosti od majitelů (souhlas, vznik divize, mandát vést)

### Klíčová citace (opening callout)
> "Přináším záměr podložený funkčním produktem, reálnými výsledky a přesvědčením, za které jsem ochoten ručit i osobně — jako investor. O rozhodnutí žádám vás jako majitele. O mandát vést ji — žádám jako člověk, který ji postavil."

---

## AIQ-00029 — Slide #s-financial: Finanční rozvaha záměru (slide 0F)

**Status:** CLOSED (2026-04-17)
**Slide:** `#s-financial` (TOC 0F) — za #s-proposal, před TOC

### Finanční model — předpoklady
- **Cena:** 90 tis. CZK / zákazník / měsíc (avg, Enterprise SaaS pro holding skupiny)
- **Investice M0–M36:** ~20M CZK celkem (3M + 7M + 10M po fázích)
- **David osobně:** 2M CZK seed investice

### 5letá projekce (od M36 komerčního launche)
| Rok | Zákazníci | Tržby | EBITDA | Zisk po dani |
|-----|-----------|-------|--------|-------------|
| 1 (M36–M48) | 3 | 3.2M CZK | −3.8M | −3.8M |
| 2 (M48–M60) | 10 | 10.8M CZK | ~BEP | −0.2M |
| 3 (M60–M72) | 25 | 27M CZK | +13M | +10M |
| 4 (M72–M84) | 50 | 54M CZK | +36M | +29M |
| 5 (M84–M96) | 90 | 97M CZK | +74M | +60M |

**Summary:** ~20M CZK investice · BEP Rok 2 · ~120M CZK kumulativní zisk 5 let · ~485M CZK valuace rok 5 (5× ARR)
Čísla jsou konzervativní projekce k diskusi — záměrně.

---

## AIQ-00019 — Slide s-hopi6: AppIQ jako 6. divize HOPI

**Status:** CLOSED (2026-04-17)
**Slide:** `#s-hopi6` v PORTAL_PRESENTATION.html

### Vývoj struktury
- Původně navrženy 3 etapy → David rozšířil na 6 → pak na 7 etap (split etapy 2 na dvě).
- Finální počet etap: **7**.

### 7 etap — finální struktura

| # | Název | Uživatelé | Trvání (+M) | Σ od startu | Poznámka |
|---|-------|-----------|-------------|-------------|----------|
| 1 | Pilot FI-CO | ~35 | +2M | M2 | Group Controlling, probíhá |
| 2 | FINANCE — Accounting & Taxes / Controlling / Treasury | ~50 | +3M | M5 | Interní Finance HOPI Holding |
| 3 | FINANCE / LEGAL / PURCHASING | ~75 | +2M | M7 | Rozšíření mimo core Finance |
| 4 | Go-live — HOPI Holding | ~200 | +5M | M12 | Celá mateřská společnost |
| 5 | Roll-out — HOPI Group (dceřiné společnosti) | 500+ | +12M | **M24** | **MILESTONE 1** — interní rollout skupiny (~2 roky) |
| 6 | Spin-off — HOPI TechIQ s.r.o. | — | +12M | **M24** | **SOUBĚŽNĚ s fází 5** — startuje M12, končí M24 |
| 7 | Komerční SaaS — globální trh | ∞ | +12M | **M36** | Prep od M18; launch po M24; **MILESTONE 2** (~3 roky) |

**Klíčové rozhodnutí o souběžnosti (David, 2026-04-17):**
- Fáze 5+6 probíhají **paralelně** (M12–M24) — fáze 6 je právní/korporitní, nezávisí na dokončení fáze 5
- Fáze 7 technická příprava startuje od M18 souběžně s fázemi 5+6
- Výsledek: MILESTONE 2 = M36 (~3 roky) místo M54 — úspora ~18 měsíců
- **Celková délka (sekvenční): M12 → M36 pro comerciální launch = ~3 roky od startu projektu**

**Globální trh** (ne pouze CEE) — David upřesnil 2026-04-17. Fáze 7 = global, CEE jako první trh.

### OIL badge systém (implementováno 2026-04-17)
Slidy prezentace obsahují malý oranžový badge `AIQ-NNNNN` v sekci-labelu nebo eyebrow oblasti.
Badge je klikatelný pro výběr textu (user-select:all). Slouží k navigaci: slide → OIL task → OIL_CONTEXT.md.

| Slide | Badge | OIL task |
|-------|-------|----------|
| #s00c | AIQ-00014 | Platform Architecture — dva streamy |
| #s-hopi6 | AIQ-00019 | AppIQ jako 6. divize HOPI (tento kontext) |
| #s25 | AIQ-00015 | AppIQ Studio — TOC + stub |
| #s-strategy (0E) | AIQ-00027 | Strategický slide — diverzifikace rizika, globální trh |

### Klíčové strategické poznámky (od Davida, 2026-04-17)

**Fáze 1–4 — HOLDING-DRIVEN:**
- Funkce jsou nasazovány průřezově tam, kde má mateřská společnost interakci s dceřinými společnostmi.
- Tlačeno z pozice holdingu — ne z pozice jednotlivých divisí.
- **Klíčová poznámka:** Má obrovský vliv na efektivitu celého holdingu jako mateřské společnosti z pohledu řízení divize skupiny.

**Fáze 5 — DCERY:**
- Roll-out do interních organizací dceřiných společností skupiny HOPI.
- Nejdelší fáze — 500+ uživatelů, ~30 společností, 8 zemí, 9 jazyků.

### Název firmy — spin-off (etapa 6)
- Finální volba: **HOPI TechIQ s.r.o.**
- Zamítnuté alternativy: AppIQ s.r.o., HOPI Digital s.r.o., Orbiq s.r.o., Nexora s.r.o., IntelliCore s.r.o.

### Klíčový argument (slide)
> Jednou z cest, jak budovat technologicky profilovanou skupinu HOPI — vedle technologií nasazovaných v odvětvích jako Foods nebo Supply Chain — bylo koupit start-up nebo firmu s produktem, který by se dal dále rozvíjet. AppIQ je lepší alternativa: produkt vzniká přímo na provozu skupiny, okamžitě se validuje, technologické IP zůstává 100 % v HOPI a výsledkem je vlastní tech divize s komerčním potenciálem — bez akvizičního rizika a za zlomek ceny.

---

## AIQ-00014 — Slide s00c: Platform Architecture (dva streamy)

**Status:** CLOSED (2026-04-17)
**Slide:** `#s00c` v PORTAL_PRESENTATION.html

### Kontext
- Vizualizuje dva streamy: WEB STREAM (AppIQ Studio) a APP STREAM (Runtime aplikace).
- Zobrazuje expanzní cestu: Finance → Operations → Purchasing → HR → SaaS.
- Obsahuje odkaz na GitHub Pages live URL.

---

## AIQ-00026 — GitHub Pages deployment

**Status:** CLOSED (2026-04-17)
**URL:** `https://h-gr-fico.github.io/appiq/`

### Kontext
- `_deploy/` složka — self-contained copy prezentace pro sdílení jako single URL.
- Logo PNG muselo být zkopírováno do `_deploy/app/` (externí závislost mimo HTML).
- GitHub web UI neumí spolehlivě nahrát podsložky drag&drop — nutné vytvořit `app/index.html` přes "Create new file" s typem cestu `app/index.html`.
- SharePoint hosting byl zamítnut jako nevyhovující pro single-URL sdílení.

---

## AIQ-00018 — Ambient music (Web Audio API)

**Status:** CLOSED (2026-04-17)

### Kontext
- Procedurální A-minor chord pad přes Web Audio API (7 hlasů: 55, 110, 130.8, 165, 196, 220, 261.6 Hz).
- LFO modulace, delay/reverb chain, fade in/out.
- **Auto-start na první interakci** (click/scroll/keydown) — browser policy neumožňuje autoplay bez interakce.
- Opt-out: localStorage key `appiq_music_pref = '0'` zabrání auto-startu.
- Tlačítko v navigaci s animovanými vlnkami.

---

## AIQ-00027 — Strategický slide: AppIQ v rozvoji skupiny HOPI

**Status:** CLOSED (2026-04-17)
**Slide:** `#s-strategy` (TOC 0D, navazuje na `#s-hopi6`)

### Čtyři pilíře strategického slidu (zadal David, 2026-04-17)

**1. Jak AppIQ zapadá do rozvoje skupiny HOPI**
- Průřezová platforma — propojuje všechny divize na jednotný technologický základ.
- Není product jedné divize — je to infrastruktura celé skupiny.
- Analogie: HOPI má logistiku jako průřezovou kompetenci → AppIQ je technologická průřezová kompetence.

**2. Diverzifikace rizika skupiny**
- HOPI funguje v odvětvích s cyklickými riziky (zemědělství, potraviny, logistika).
- AppIQ přidává technologický byznys s jiným rizikovým profilem — SaaS, škálovatelný, nízké marginální náklady.
- Technologická platforma jako nový zdroj hodnoty — vedle odvětvových byznysů.

**3. Propojení všech divizí na moderní AI technologie**
- Jednotná platforma místo sila — Finance, Operations, Purchasing, HR, Management.
- AI asistence cross-company — jeden model nasazovaný napříč divizemi.
- Sdílená data, sdílené reporty, sdílená inteligence.

**4. Globální tržní potenciál**
- Produkt validovaný na skutečném provozu velké skupiny (HOPI Group — 8 zemí, 30+ spol.).
- CEE jako první trh, ale produkt je globálně škálovatelný.
- White-label SaaS: každá holding skupina může dostat vlastní nasazení.
- Nejde o lokální niche — jde o globální adresovatelný trh (Enterprise SaaS pro holdingové skupiny).

### Jak přesvědčit majitele — klíčové argumenty (David, 2026-04-17)

**Kontext:** Majitel (vlastník skupiny HOPI) musí rozhodnout o HOPI TECHNOLOGY divizi. Toto je kritické rozhodnutí — bez souhlasu majitele se nelze pohnout do fáze 5+.

**Argument 1 — Diversifikace rizika skupiny:**
> "HOPI působí v odvětvích s cyklickými riziky (zemědělství, potraviny, logistika). HOPI TECHNOLOGY přidává byznys s odlišným rizikovým profilem — SaaS ekonomika, nízké marginální náklady, škálovatelný výnos. Nesnižuje to stávající byznys, přidává nový pilíř."

**Argument 2 — In-house místo akvizice:**
> "Alternativou bylo koupit tech firmu nebo startup s produktem. Cena: 50M–500M+ Kč + akvizční prémie + integrační náklady. AppIQ vznikl zevnitř na provozu skupiny. IP je 100 % HOPI. Náklady: zlomek akvizice. Riziko: nulové oproti akvizici."

**Argument 3 — Důkaz funguje, ne teorie:**
> "Fáze 1–4 nejsou pitch deck. Jsou to reálné výsledky: Holding live, X uživatelů, X procesů zautomatizováno. To je nejsilnější argument — ne co plánujeme, ale co jsme postavili."

**Argument 4 — Timing — momentum:**
> "Technologie se mění rychle. Okno pro budování AI-native enterprise platformy je otevřené teď. Za 3 roky bude plné konkurentů s desítkami milionů dolarů financování. Dnes máme náskok: validace na reálném provozu velké skupiny — to nikdo z CEE nemá."

**Argument 5 — 6. pilíř skupiny, ne exit:**
> "HOPI TECHNOLOGY zůstává součástí skupiny. Není to exit ani prodej. Je to nový byznys stream — stejně jako FOODS nebo SERVICES — s tím rozdílem, že jeho produkt (AppIQ) propojuje a zesiluje všechny ostatní pilíře skupiny."

### Struktury slidu AIQ-00027
1. Titulek: "HOPI TECHNOLOGY — proč teď a proč zevnitř"
2. Grid 5+1 (stávající divize + TECHNOLOGY) — přebrat z #s-hopi6
3. 4 argumenty pro majitele (boxy/callouts)
4. Timeline: fáze 1-4 = proof, fáze 5-7 = scale
5. Závěrečný callout: "AppIQ je nosný produkt HOPI TechIQ s.r.o. — první produkt nové divize TECHNOLOGY"

### Vazby na ostatní slidy
- Navazuje na: `#s-hopi6` (AIQ-00019) — 7-etapový záměr + timeline
- Navazuje na: `#s00c` (AIQ-00014) — architektura platformy
- Slide badge: `AIQ-00027`
- Viz také: OIL_MAP.md sekce 4 (vazby úkolů)

---

## AIQ-00013 — PORTAL_ARCHITECTURE.md BLOK 8

**Status:** CLOSED (2026-04-17)

### Kontext
- BLOK 8 = AppIQ Studio architektura (6 Functional Centers: FC-1 Hub, FC-2 Runtime, FC-3 Dev, FC-4 Test, FC-5 Admin, FC-6 Promo+Docs).
- Dva streamy APP/WEB dokumentovány.
- GitHub Pages hosting v BLOK 8.7.
- Verze PORTAL_ARCHITECTURE.md povýšena 0.1 → 0.2.

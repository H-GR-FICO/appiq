# CLAUDE.md — AppIQ Studio · Session Startup Instructions

> Tento soubor je automaticky načten Claudem na začátku každé session.
> Aktualizuj ho při změnách struktury projektu nebo konvencí.

---

## Session Startup — povinné pořadí čtení

Na začátku každé session načti VŽDY v tomto pořadí:

1. `_SESSION_START/BRIEFING.md` — kde jsme skončili, co je otevřené, klíčová rozhodnutí
2. `OIL.json` — aktuální stav všech úkolů (AIQ-NNNNN)
3. `OIL_CONTEXT.md` — kontext a výtah z diskusí ke každému úkolu (až bude existovat)
4. `PORTAL_ARCHITECTURE.md` — architektonický rámec platformy (BLOK 0–8)
5. `ARCH_MAP.md` — kódy a vazby všech objektů (screeny, slidy, sekce, moduly)
6. `HOPI_AppIQ_WebPage/Development/PORTAL_PRESENTATION.html` — aktuální stav prezentace
7. `HOPI_AppIQ/Development/index.html` — aktuální stav runtime aplikace

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

Platí pro vše — i pro 5minutový fix. Bez výjimky.

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
3. Pro každý `development` nebo `fix` task: vytvořit companion test task(y) se `taskType: "test"`, polem `testType` a `linkedTask` (odkaz na původní AIQ)

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

## Konec session — co udělat

1. Aktualizovat `_SESSION_START/BRIEFING.md` — kde jsme skončili, co je otevřené
2. Zkopírovat aktuální `OIL.json` do `_SESSION_START/OIL.json`
3. Zkopírovat `OIL_CONTEXT.md` do `_SESSION_START/OIL_CONTEXT.md` (až bude existovat)
4. Zkopírovat `ARCH_MAP.md` do `_SESSION_START/ARCH_MAP.md` — snapshot pro příští session
5. Aktualizovat relevantní CHANGELOG.md

> Kroky 2–4 jsou automatizovány v `AUTO_ARCHIVE.bat` (sekce [META]).

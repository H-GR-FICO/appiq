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

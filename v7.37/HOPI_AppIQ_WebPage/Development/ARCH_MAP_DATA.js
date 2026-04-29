// ARCH_MAP_DATA.js — embedded fallback copy of ARCH_MAP.md
// Slouží jako fallback pro Tech Arch panel (file:// protokol nebo chybějící cesta)
// Aktualizovat VŽDY spolu s ARCH_MAP.md (workflow pravidlo — viz CLAUDE.md)
// Poslední aktualizace: 2026-04-17 · AIQ-00034 DRAFT 0.1
/* jshint ignore:start */
var ARCH_MAP_DATA = `# HOPI AppIQ — Architecture Map
> AIQ-00034 · Verze: DRAFT 0.1 · 2026-04-17
> Živý dokument — aktualizovat při přidání nových objektů.
> Kódy jsou referenční (pro komunikaci David↔Claude) — nepřidávají se jako HTML atributy.

---

## SYSTÉM KÓDOVÁNÍ

| Prefix | Stream | Co označuje |
|--------|--------|-------------|
| \`SCR-xx\` | PREZ | Overlay screeny v prezentaci (před vlastními slidy) |
| \`SLD-xx\` | PREZ | Biz-scale slidy (fullscreen, tmavé pozadí) |
| \`DOC-xx\` | PREZ | Dokumentační sekce s00–s25 (bílé, scrollovací) |
| \`MOD-xx\` | PREZ | Overlay modály uvnitř prezentace |
| \`IDX-xx\` | WEB  | Sekce promo webu (index.html) |
| \`APP-xx\` | APP  | Moduly Finance portálu |

---

## ══ PREZ STREAM — PORTAL_PRESENTATION.html ══

### ▸ Overlay screeny (chronologická sekvence při načtení)

| Kód | HTML id | Název | Popis | Navigace |
|-----|---------|-------|-------|----------|
| \`SCR-01\` | \`#intro-screen\` | Intro screen | LF1→presents→LF2 animace, "Start presentation preview" | Enter/Space/ArrowRight → SCR-02 · Klik → SCR-02 |
| \`SCR-02\` | \`#story-screen\` | Story Behind | 63s narativní cinematic (6 ARCs + LF2 + HOPI TECH stamp) | Enter/Space/ArrowRight → SCR-03 · Klik → SCR-03 |
| \`SCR-03\` | \`#teaser-overlay\` | Teaser / Preview | 5 klíčových myšlenek, "Vstoupit do prezentace" | Enter/ArrowRight → prezentace · ArrowLeft → SCR-02 |

**Sekvence:** \`SCR-01\` → (klik/klávesa) → \`SCR-02\` → (auto 63s nebo klik) → \`SCR-03\` → (klik) → prezentace

---

### ▸ Biz-scale slidy (SLD — fullscreen, tmavé, \`.biz-scale-page\`)

Tyto slidy stojí mimo standardní dokumentační strukturu — mají vlastní vizuální identitu.

| Kód | HTML id | TOC | Název | Skupina v TOC |
|-----|---------|-----|-------|---------------|
| \`SLD-CV\` | \`.cover\` | — | Cover strana | — (mimo TOC) |
| \`SLD-TOC\` | \`.toc-page\` | — | Obsah (TOC) | — (mimo TOC) |
| \`SLD-0W\` | \`#s-moment\` | 0W | Globální kontext AI — Proč právě teď | Pro Management |
| \`SLD-★\` | \`#s-proposal\` | ★ | Podnikatelský záměr autora | Pro Management |
| \`SLD-0F\` | \`#s-financial\` | 0F | Finanční rozvaha záměru | Pro Management |
| \`SLD-0C\` | \`#s-hopi6\` | 0C | AppIQ jako 6. divize HOPI | Pro Management |
| \`SLD-0E\` | \`#s-strategy\` | 0E | Strategický pohled — diverzifikace rizika | Pro Management |
| \`SLD-0T\` | \`#s-market\` | 0T | Tržní strategie — Business & Retail · One Platform. Two Worlds. | Pro Management |
| \`SLD-0S\` | \`#s-team\` | 0S | Tým & Start — konfigurace, škálování, ESOP | Pro Management |
| \`SLD-0M\` | \`#s-brand\` | 0M | Brand — první dojem produktu | Pro Management |
| \`SLD-0P\` | \`#s-partners\` | 0P | Strategická partnerství ARTIN·INTECS·Anthropic | Pro Management |
| \`SLD-BUILD\` | \`#s-build\` | — | Build & Deploy pipeline | (technická příloha) |

---

### ▸ Dokumentační sekce (DOC — bílé, scrollovací, \`.section\`)

| Kód | HTML id | Název sekce (CS) | Skupina v TOC |
|-----|---------|-----------------|---------------|
| \`DOC-00\` | \`#s00\` | Co budujeme a proč — pohled pro vedení | Vize & Kontext |
| \`DOC-00b\` | \`#s00b\` | Schéma business logiky platformy | Vize & Kontext |
| \`DOC-00c\` | \`#s00c\` | AppIQ Platform Architecture — dva streamy | Architektura platformy |
| \`DOC-01\` | \`#s10\` ¹ | Process Engine & Approval Service | Procesy & AI |
| \`DOC-02\` | \`#s11\` | AI & Automate | Procesy & AI |
| \`DOC-03\` | \`#s12\` | Integrace — IT prostředí HOPI | Integrace & Ekosystém |
| \`DOC-04\` | \`#s13\` | Windows Protocol Handlers | Integrace & Ekosystém |
| \`DOC-05\` | \`#s14\` | App Catalog, Documentation & Communication | Integrace & Ekosystém |
| \`DOC-06\` | \`#s15\` | Nefunkční požadavky | Požadavky & Přístup |
| \`DOC-07\` | \`#s16\` | Implementační přístup | Dodávka & Tým |
| \`DOC-08\` | \`#s17\` | Fázový plán & Milníky | Dodávka & Tým |
| \`DOC-09\` | \`#s18\` | Řešitelský tým | Dodávka & Tým |
| \`DOC-10\` | \`#s19\` | Akceptační kritéria — Fáze 1 | Dodávka & Tým |
| \`DOC-11\` | \`#s20\` | Závislosti & IT otázky | Dodávka & Tým |
| \`DOC-12\` | \`#s21\` | Architektonická roadmap — Bloky 4–7 | Roadmap & Výhled |
| \`DOC-13\` | \`#s22\` | Výhled — Skalování mimo HOPI | Roadmap & Výhled |
| \`DOC-14\` | \`#s23\` | Výkladový slovník pojmů | Přílohy |
| \`DOC-15\` | \`#s24\` | Příloha — Obrazovky aplikace | Přílohy |
| \`DOC-16\` | \`#s25\` | AppIQ Studio — vývojové prostředí | ★ AppIQ Studio (novinka v7) |

> ¹ Poznámka: sekce s01–s09 pravděpodobně existují v HTML ale neobjevily se v grepu — nutno doplnit. Sekce s10+ potvrzeny.

---

### ▸ Overlay modály

| Kód | HTML id | Název | Trigger |
|-----|---------|-------|---------|
| \`MOD-01\` | \`#brandOverlay\` | Brand Concepts modal | Tlačítko 🎨 v headeru prezentace |
| \`MOD-02\` | \`#prezChangelogOverlay\` | Changelog prezentace | Tlačítko 📋 v headeru prezentace |

---

### ▸ Header prvky (horní lišta prezentace)

| ID | Popis |
|----|-------|
| \`#gh-brand-wrap\` | Wrapper levé části headeru (LF2 + LF1 + flash) |
| \`#gh-hopi-tech\` | LF1 HOPI TECHNOLOGY SVG (stamp animace při loadu) |
| \`#gh-stamp-flash\` | Golden flash overlay pro stamp efekt |
| \`#prez-music-btn\` | Tlačítko hudby 🎵 |

---

## ══ WEB STREAM — index.html (Promo web) ══

### ▸ Sekce stránky

| Kód | HTML id / anchor | Název sekce | Obsah |
|-----|-----------------|-------------|-------|
| \`IDX-00\` | \`#\` (top) | Hero | Headline, tagline, CTA tlačítka, canvas animace |
| \`IDX-01\` | \`#s-vision\` | Filozofie / Platform Vision | Quote, 3 pilíře (One Model, Multi-Domain, AI-Native) |
| \`IDX-02\` | \`#s-hopiq\` | HOPIQ AI asistent | 4 schopnosti: Chat, PBI Designer, Story Teller, Doc Reader |
| \`IDX-03\` | \`#s-preview\` | Dokumentace platformy | Preview box s linkem na PORTAL_PRESENTATION.html |
| \`IDX-04\` | \`#s-brand\` | Brand Identity | Brainstorming thumbnails (L1–L4, B1–B6) + evoluce LF1→LF2→LF3 |
| \`IDX-05\` | \`#launch\` | Spustit portál | Tlačítka: Desktop, Mobile preview, Architektonická dokumentace |
| \`IDX-06\` | \`footer\` | Footer | Loga, navigace, copyright |

### ▸ Overlay panely (index.html)

| Kód | HTML id | Název | Trigger |
|-----|---------|-------|---------|
| \`IDX-OIL\` | \`#oilOverlay\` | OIL panel (task tracker) | Tlačítko 📋 OIL v headeru |
| \`IDX-ARCH\` | \`#archOverlay\` | Tech Arch panel (architekturní mapa) | Tlačítko 🗺 Tech Arch v headeru |

### ▸ Header prvky (index.html)

| ID | Popis |
|----|-------|
| \`#nav-brand-wrap\` | Wrapper levé části nav (LF2 + LF1 + flash) |
| \`#nav-hopi-tech\` | LF1 HOPI TECHNOLOGY SVG (stamp animace při loadu) |
| \`#nav-stamp-flash\` | Golden flash overlay pro stamp efekt |

---

## ══ WEB STREAM — BRAND_CONCEPTS.html ══

### ▸ Sekce dokumentu

| Kód | Název sekce | Obsah |
|-----|-------------|-------|
| \`BC-FINAL\` | Finální výběr | LF1 (HOPI TECHNOLOGY), LF2 (HOPI AppIQ), LF3 (kombinace) |
| \`BC-LOGO\` | Část A — Logotypy | L1 Výchozí, L2 Bold, L3 Stacked Badge, L4 IQ Mark |
| \`BC-PIK\` | Část B — Piktogramy | B1 Hexagon, B2 App Grid, B3 Neural Orbit, B4 Circuit H, B5 Shield, B6 Diamond |
| \`BC-COMB\` | Doporučená kombinace | L1 + B1 (původní), nyní LF3 jako hlavní |

### ▸ Finální loga (odsouhlasená)

| Kód | ID v HTML | Typ | Popis |
|-----|-----------|-----|-------|
| \`LF1\` | \`LF1\` | \`.card.final\` | HOPI TECHNOLOGY — stacked, TECHNOLOGY oranžové pod HOPI, zelená čára vlevo |
| \`LF2\` | \`LF2\` | \`.card.final\` | HOPI AppIQ — App oranžová + IQ zelená, zelená čára vlevo |
| \`LF3\` | \`LF3\` | \`.card.winner\` | HOPI AppIQ · by · HOPI TECHNOLOGY — kombinace LF2+LF1, zelená čára vlevo+vpravo |

---

## ══ APP STREAM — HOPI_AppIQ/Development/index.html ══

### ▸ Moduly Finance portálu (fáze 0)

| Kód | Modul | Popis |
|-----|-------|-------|
| \`APP-01\` | Calendar / Uzávěrky | Kalendář finančních uzávěrek, deadline tracking |
| \`APP-02\` | Tracking | Sledování stavu plnění uzávěrek (Otevřeno/V řešení/Hotovo) |
| \`APP-03\` | OrgChart | Organizační struktura Group Controlling |
| \`APP-04\` | Reporting | Přehled reportů, Power BI launchers |
| \`APP-05\` | FX / Kurzy | Aktuální devizové kurzy (ECB feed) |
| \`APP-06\` | SAP launcher | Přímý odkaz na SAP GUI / Fiori (Windows Protocol Handler) |
| \`APP-07\` | BNS launcher | Přímý odkaz na BNS (BizNys Suite) |
| \`APP-08\` | SharePoint | Odkaz na SharePoint dokumenty a weby |
| \`APP-09\` | Power BI | Power BI report launcher |
| \`APP-10\` | Help System | Kontextová nápověda (8 modulů, EN + 8 jazyků) |

---

## ══ MAPA VAZEB ══

\`\`\`
index.html (IDX)
  ├── → PORTAL_PRESENTATION.html        # IDX-03 "Otevřít", IDX-05 "Architektonická dokumentace"
  ├── → HOPI_AppIQ/Release/index.html   # IDX-05 "Desktop" + "Mobile"
  └── → BRAND_CONCEPTS.html             # IDX-04 "Brand Concepts ↗"

PORTAL_PRESENTATION.html (SCR/SLD/DOC)
  ├── SCR-01 → SCR-02                   # closeIntroScreen()
  ├── SCR-02 → SCR-03                   # closeStoryScreen()
  ├── SCR-03 → prezentace               # closeTeaserOverlay()
  ├── SCR-03 ← SCR-02                   # teaserGoBack() (ArrowLeft)
  ├── MOD-01 → BRAND_CONCEPTS.html      # iframe v #brandFrame
  ├── Header nav → index.html           # "← HOPI AppIQ" back link
  └── TOC → SLD/DOC (anchor links)      # href="#s-xxx"

BRAND_CONCEPTS.html
  └── ← MOD-01 (iframe)                 # otevřeno z prezentace
  └── ← IDX-04 (přímý link)             # "Brand Concepts ↗" na promo webu

_ver.js
  ├── → index.html (PREZ_VERSION)       # <script src="_ver.js">
  └── → PORTAL_PRESENTATION.html        # <script src="_ver.js">

HOPI_AppIQ/Release/index.html
  └── ← IDX-05 (přímý link)             # "Desktop/Mobile" tlačítka
\`\`\`

---

## ══ SOUBORY PROJEKTU — PŘEHLED ══

\`\`\`
CO_PROJECT - Claude Code - link folder/
├── ARCH_MAP.md                  ← TENTO SOUBOR (AIQ-00034)
├── CLAUDE.md                    ← session startup instrukce
├── OIL.json                     ← task tracker
├── OIL_CONTEXT.md               ← kontext diskusí per task
├── OIL_MAP.md                   ← navigační mapa OIL
├── PORTAL_ARCHITECTURE.md       ← architektonická dokumentace (BLOK 0–8)
├── CHANGELOG.md                 ← souhrnný changelog
├── AUTO_ARCHIVE.bat             ← archivace obou streamů (spustit na konci session)
├── _SESSION_START/
│   ├── BRIEFING.md              ← stav na konci poslední session
│   └── OIL.json                 ← kopie OIL pro session startup
│
├── HOPI_AppIQ_WebPage/          ← WEB stream
│   └── Development/
│       ├── index.html           ← IDX-00 až IDX-06 (promo web)
│       ├── PORTAL_PRESENTATION.html  ← SCR/SLD/DOC/MOD (prezentace)
│       ├── BRAND_CONCEPTS.html  ← BC-FINAL, BC-LOGO, BC-PIK
│       ├── ARCH_MAP_DATA.js     ← embedded fallback pro Tech Arch panel
│       └── _ver.js              ← sdílená verze (PREZ_VERSION)
│
└── HOPI_AppIQ/                  ← APP stream
    └── Development/
        └── index.html           ← APP-01 až APP-10 (Finance portál)
\`\`\`

---

## ══ CO JEŠTĚ ZMAPOVAT (TODO) ══

- [ ] Sekce s01–s09 v prezentaci — nutno doplnit DOC-xx kódy
- [ ] Všechny TOC záznamy s konkrétními anchor linky
- [ ] Header navigace prezentace — tlačítka a jejich akce
- [ ] APP stream: sidebar/nav struktura Finance portálu
- [ ] Modální okna v APP (Help panel, nastavení)
- [ ] GitHub Pages \`_deploy/\` adresář — co obsahuje a jak se liší od Development/
- [ ] Přidat fyzické HTML \`id\` nebo \`data-arc\` atributy tam, kde kódy chybí

---

*Aktualizoval: Claude · 2026-04-17 · AIQ-00034 DRAFT 0.1*`;
/* jshint ignore:end */

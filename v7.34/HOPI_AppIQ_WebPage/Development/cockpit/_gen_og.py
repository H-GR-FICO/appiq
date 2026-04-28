"""
Generate cockpit-og.png from scratch using Pillow.
Matches cockpit-og.svg design. Run once, then discard.
"""
import math, os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG   = (6, 12, 24)      # #060c18
DARK = (7, 16, 31)      # #07101f  gauge bg
GRID = (26, 42, 74)     # #1a2a4a
VIO  = (168, 85, 247)   # #A855F7
GRN  = (34, 197, 94)    # #22C55E
BLU  = (96, 165, 250)   # #60A5FA
AMB  = (245, 158, 11)   # #F59E0B
PNK  = (236, 72, 153)   # #EC4899
DGRY = (26, 38, 64)     # #1a2640
WHT  = (255, 255, 255)
GRY  = (136, 136, 136)

img  = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# ── Fonts ──────────────────────────────────────────────────────────────────
def font(size, bold=False):
    paths = [
        r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\calibri.ttf",
    ]
    for p in paths:
        if os.path.exists(p):
            try: return ImageFont.truetype(p, size)
            except: pass
    return ImageFont.load_default()

def mono(size):
    paths = [
        r"C:\Windows\Fonts\consola.ttf",
        r"C:\Windows\Fonts\cour.ttf",
        r"C:\Windows\Fonts\lucon.ttf",
    ]
    for p in paths:
        if os.path.exists(p):
            try: return ImageFont.truetype(p, size)
            except: pass
    return font(size)

# ── Grid ──────────────────────────────────────────────────────────────────
for x in range(0, W, 40):
    draw.line([(x, 0), (x, H)], fill=GRID + (80,) if False else GRID, width=1)
for y in range(0, H, 40):
    draw.line([(0, y), (W, y)], fill=GRID, width=1)

# ── Top separator ─────────────────────────────────────────────────────────
draw.line([(0, 110), (W, 110)], fill=VIO, width=1)

# ── Title ─────────────────────────────────────────────────────────────────
title_f = font(64, bold=True)
title = "MNG COCKPIT"
bbox = draw.textbbox((0, 0), title, font=title_f)
tw = bbox[2] - bbox[0]
draw.text(((W - tw) // 2, 10), title, fill=WHT, font=title_f)

# Title accent lines + dots
draw.line([(180, 82), (370, 82)], fill=VIO, width=2)
draw.line([(830, 82), (1020, 82)], fill=VIO, width=2)
draw.ellipse([(177, 79), (183, 85)], fill=VIO)
draw.ellipse([(1017, 79), (1023, 85)], fill=VIO)

# Subtitle
sub_f = mono(12)
sub = "HOPI AppIQ  ·  PROJECT CONTROL CENTER  ·  v8.0"
bbox = draw.textbbox((0, 0), sub, font=sub_f)
sw = bbox[2] - bbox[0]
draw.text(((W - sw) // 2, 93), sub, fill=VIO, font=sub_f)

# ── Helper: filled circle arc (donut ring) ───────────────────────────────
def draw_gauge_ring(cx, cy, r, color, pct, width=12):
    """Draw a progress arc around (cx,cy) of radius r, pct = 0..1."""
    # Draw track
    bb = [cx - r, cy - r, cx + r, cy + r]
    draw.arc(bb, start=-90, end=270, fill=DGRY, width=width)
    # Draw progress
    end_deg = -90 + pct * 360
    if pct > 0.01:
        draw.arc(bb, start=-90, end=end_deg, fill=color, width=width)

def draw_gauge(cx, cy, r, color, pct, val, label, sublabel):
    # Gauge background circle
    rr = r + 2
    draw.ellipse([cx-rr, cy-rr, cx+rr, cy+rr], outline=color, width=2)
    # Dark fill
    draw.ellipse([cx-r+8, cy-r+8, cx+r-8, cy+r-8], fill=DARK)
    # Ring track + progress
    draw_gauge_ring(cx, cy, r-6, color, pct)
    # Inner accent
    draw.ellipse([cx-r+18, cy-r+18, cx+r-18, cy+r-18], outline=color, width=1)

    # Text
    vf = mono(20)
    bbox = draw.textbbox((0, 0), val, font=vf)
    vw = bbox[2] - bbox[0]
    draw.text((cx - vw//2, cy - 20), val, fill=color, font=vf)

    sf = mono(9)
    bbox = draw.textbbox((0, 0), sublabel, font=sf)
    sw = bbox[2] - bbox[0]
    draw.text((cx - sw//2, cy + 4), sublabel, fill=GRY, font=sf)

    lf = mono(9)
    bbox = draw.textbbox((0, 0), label, font=lf)
    lw = bbox[2] - bbox[0]
    draw.text((cx - lw//2, cy + 22), label, fill=color, font=lf)

# ── Left gauges ───────────────────────────────────────────────────────────
draw_gauge(230, 265, 72, VIO, 0.68, "308", "tasks total", "TASKS")
draw_gauge(230, 435, 72, GRN, 0.45, "$200K", "pipeline", "CASH")

# ── Right gauges ──────────────────────────────────────────────────────────
draw_gauge(970, 265, 72, BLU, 0.30, "01.01\n2027", "B2C launch", "TARGET")
draw_gauge(970, 435, 72, AMB, 0.55, "€500K", "valuation", "VALUE")

# ── Main attitude indicator ────────────────────────────────────────────────
cx, cy, R = 600, 340, 168
# Sky / ground halves
draw.chord([cx-R, cy-R, cx+R, cy+R], start=180, end=360, fill=(13, 32, 64))  # sky
draw.chord([cx-R, cy-R, cx+R, cy+R], start=0, end=180, fill=(26, 14, 0))     # ground
# Outer rings
draw.ellipse([cx-175, cy-175, cx+175, cy+175], outline=VIO, width=1)
draw.ellipse([cx-R-2, cy-R-2, cx+R+2, cy+R+2], outline=VIO, width=3)
# Horizon
draw.line([(cx-R, cy), (cx+R, cy)], fill=GRN, width=2)
# Pitch lines
for dy, op in [(29, 0.4), (57, 0.3)]:
    w2 = 70
    draw.line([(cx-w2, cy-dy), (cx+w2, cy-dy)], fill=GRN, width=1)
    draw.line([(cx-w2, cy+dy), (cx+w2, cy+dy)], fill=GRN, width=1)
# Aircraft symbol
draw.line([(cx-120, cy), (cx-30, cy)], fill=WHT, width=3)
draw.line([(cx+30, cy), (cx+120, cy)], fill=WHT, width=3)
draw.line([(cx-30, cy), (cx-30, cy-7)], fill=WHT, width=3)
draw.line([(cx+30, cy), (cx+30, cy-7)], fill=WHT, width=3)
draw.line([(cx, cy-30), (cx, cy+20)], fill=WHT, width=2)
# Reticles
draw.ellipse([cx-60, cy-60, cx+60, cy+60], outline=GRN, width=1)
draw.ellipse([cx-30, cy-30, cx+30, cy+30], outline=GRN, width=1)
draw.ellipse([cx-5, cy-5, cx+5, cy+5], fill=GRN)
draw.ellipse([cx-2, cy-2, cx+2, cy+2], fill=WHT)
# Compass labels
cf = mono(11)
for label, lx, ly in [("N", cx, cy-R-14), ("E", cx+R+12, cy), ("S", cx, cy+R+5), ("W", cx-R-18, cy)]:
    draw.text((lx, ly), label, fill=VIO, font=cf)
# Tick marks
for deg in range(0, 360, 30):
    rads = math.radians(deg - 90)
    length = 21 if deg % 90 == 0 else 13
    x1 = cx + (R) * math.cos(rads)
    y1 = cy + (R) * math.sin(rads)
    x2 = cx + (R - length) * math.cos(rads)
    y2 = cy + (R - length) * math.sin(rads)
    draw.line([(x1, y1), (x2, y2)], fill=VIO, width=2)

# ── HUD data readouts ─────────────────────────────────────────────────────
hf = mono(9)
for i, (txt, col) in enumerate([
    ("◈ GIT: 109 COMMITS", GRN),
    ("◈ VER: v7.28 LIVE",  GRN),
    ("◈ ENV: GITHUB PAGES", GRN),
    ("◈ PHASE: 1 / B2C",   GRN),
]):
    draw.text((45, 162 + i * 18), txt, fill=col, font=hf)

for i, (txt, col) in enumerate([
    ("AI: CLAUDE SONNET 4.6 ◈", BLU),
    ("MODE: ACTIVE SESSION ◈",  BLU),
    ("TEAM: 1 PERSON + AI ◈",   BLU),
    ("STATUS: BUILDING ◈",       BLU),
]):
    bbox = draw.textbbox((0, 0), txt, font=hf)
    tw = bbox[2] - bbox[0]
    draw.text((955 - tw, 162 + i * 18), txt, fill=col, font=hf)

# Corner brackets
brac = [((25,25),(25,75)), ((25,25),(75,25)),
        ((1175,25),(1175,75)), ((1175,25),(1125,25)),
        ((25,605),(25,555)), ((25,605),(75,605)),
        ((1175,605),(1175,555)), ((1175,605),(1125,605))]
for (p1, p2) in brac:
    draw.line([p1, p2], fill=VIO, width=2)

# ── Bottom status bar ─────────────────────────────────────────────────────
draw.rectangle([(0, 580), (W, H)], fill=(5, 11, 21))
draw.line([(0, 580), (W, 580)], fill=VIO, width=1)

mf = mono(10)
mottos = [
    (30,  "💰 BUDGET JE SVATÝ",               VIO),
    (250, "·",                                  GRY),
    (270, "👑 CASH IS KING",                    GRN),
    (460, "·",                                  GRY),
    (480, "🎯 ALL ACTIONS MUST BE BIZ DRIVEN", BLU),
    (870, "·",                                  GRY),
    (890, "🚀 LIVING PROOF FIRST",              AMB),
    (1100,"·",                                  GRY),
    (1115,"🤖 1+AI",                            PNK),
]
for x, txt, col in mottos:
    draw.text((x, 602), txt, fill=col, font=mf)

# ── Save ──────────────────────────────────────────────────────────────────
out = r"C:\Users\dgogela\OneDrive - HOPI HOLDING\CO_PROJECT - Claude Code - link folder\HOPI_AppIQ_WebPage\Development\cockpit-og.png"
img.save(out, "PNG", optimize=True)
print(f"Saved: {out}")
print(f"Size: {W}x{H}, file: {os.path.getsize(out):,} bytes")

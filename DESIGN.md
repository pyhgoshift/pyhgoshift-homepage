---
version: 1.0.0
name: PyhgoShift-AgentOps-DESIGN-md
description: PyhgoShift's authoritative design system based on VoltAgent / Awesome-DESIGN.md standards — a developer-focused, humanless AI agent engineering platform. Unrelenting near-black canvas (#101010) accented with electric-green (#00d992), hairline borders (#27272a), dashed boundary dividers, and terminal-first typography.

colors:
  primary: "#00d992"          # Electric Green (Brand Accent, CTAs, Live Indicators)
  primary-soft: "#2fd6a1"     # Hover Green
  primary-deep: "#10b981"     # Emerald Base
  on-primary: "#0a0a0c"       # Text on Primary Button
  ink: "#f4f4f5"              # Main Headings
  ink-strong: "#ffffff"       # Pure White
  body: "#a1a1aa"             # Body Paragraphs
  mute: "#71717a"             # Subtext / Muted
  hairline: "#27272a"         # Hairline Card Borders (1px solid)
  hairline-soft: "#3f3f46"    # Active Card Borders
  canvas: "#0e0e11"           # Primary Page Background
  canvas-soft: "#141418"      # Card & Panel Surface
  canvas-dark: "#08080a"      # Code Blocks & Terminals
  accent-cyan: "#38bdf8"      # Secondary Accent (Telemetry)
  accent-amber: "#f59e0b"     # Warning Accent
  accent-violet: "#a881fe"    # Auxiliary Logic Accent

typography:
  display-xl:
    fontFamily: Inter, system-ui, -apple-system, sans-serif
    fontSize: 54px
    fontWeight: 700
    letterSpacing: -1.2px
  display-lg:
    fontFamily: Inter, system-ui, -apple-system, sans-serif
    fontSize: 36px
    fontWeight: 600
    letterSpacing: -0.8px
  eyebrow-mono:
    fontFamily: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
    fontSize: 12px
    fontWeight: 600
    letterSpacing: 2.2px
    textTransform: uppercase
  body-md:
    fontFamily: Inter, system-ui, -apple-system, sans-serif
    fontSize: 15px
    lineHeight: 26px
  code:
    fontFamily: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
    fontSize: 13px

components:
  nav-bar:
    background: "rgba(14, 14, 17, 0.85)"
    backdropBlur: "20px"
    borderColor: "rgba(39, 39, 42, 0.8)"
    singleLine: true
  button-primary:
    background: "#00d992"
    textColor: "#0a0a0c"
    fontWeight: 700
    rounded: "8px"
    shadow: "0 0 20px rgba(0, 217, 146, 0.35)"
  card-feature:
    background: "#141418"
    border: "1px solid #27272a"
    rounded: "14px"
    hoverBorder: "rgba(0, 217, 146, 0.4)"
  divider-dashed:
    border: "1px dashed rgba(79, 93, 117, 0.35)"
---

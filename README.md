# 🕵️ Alibi Architect — AI-Powered Excuse Generator

> *"The most sophisticated excuse engineering system ever devised."*

<div align="center">

![Version](https://img.shields.io/badge/version-3.0-6366f1?style=for-the-badge)
![Status](https://img.shields.io/badge/status-ACTIVE-10b981?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-a855f7?style=for-the-badge)
![Hackathon](https://img.shields.io/badge/hackathon-project-ec4899?style=for-the-badge)

</div>

---

## 🧬 Overview

**Alibi Architect** is a cyberpunk-themed, intelligent excuse (alibi) generator built for hackathons. It simulates a "forbidden AI system" that crafts context-aware narratives with personality, risk analysis, and an immersive UI experience.

The app doesn't just generate random excuses — it uses a **scenario classification engine**, **smart metrics pipeline**, and **narrative intelligence system** to produce believable, tone-matched alibis tailored to your situation.

---

## 🎯 Features

### 🧠 Intelligent Generation Engine
- **Scenario Classification** — Automatically detects whether you're late, missed a deadline, or were absent
- **Tone Calibration** — Generates excuses in Formal, Emotional, Casual, or Absurd tones
- **Authority Adaptation** — Adjusts narrative based on whether target is Strict, Neutral, or Friendly
- **Chaos Entropy** — Slider control from Realistic (0) to Absurd (100)
- **100+ Unique Templates** — Extensive template database across all categories and tones

### 📊 Smart Metrics System
Formula-based metrics, not random:
| Parameter | Effect |
|-----------|--------|
| Chaos ↑ | Believability ↓ |
| Formal tone | Believability ↑ |
| Urgency ↑ | Risk ↑ |
| Absurd tone | Detection ↑ |
| Strict authority | Risk ↑, Detection ↑ |
| Friendly authority | Risk ↓, Detection ↓ |

### 🖥️ Immersive UI/UX
- **BIOS Panic Overlay** — Full-screen cyberpunk terminal simulation on generation
- **Scramble Text Effect** — Glitch-to-text decrypt reveal for generated alibis
- **AI Thinking Phase** — 5-step animated processing with context-aware messages
- **Particle Background** — Floating particles with network connection lines
- **Animated Gradient Borders** — Rotating conic gradient on panel hover
- **Logo Glitch** — Periodic random glitch animation on the title
- **Screen Flash** — Radial flash transition when result appears
- **CRT Scanline** — Animated scanline across the screen

### ⚙️ Smart Features
- **"Why This Works"** — AI explains the reasoning behind each generated excuse
- **Smart Warning System** — Real-time warnings for risky parameter combinations
- **Chaos Threat Indicator** — Visual threat level (MINIMAL / MODERATE / CRITICAL)
- **Session Counter** — Tracks alibis generated per session
- **Toast Notifications** — Clipboard copy feedback
- **Keyboard Shortcuts** — `Ctrl+Enter` to generate

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic structure |
| **CSS3** | Design system, animations, cyberpunk theme |
| **Vanilla JavaScript** | Application logic, engine, effects |
| **Google Fonts** | Inter + JetBrains Mono typography |
| **Canvas API** | Particle background system |

> **Zero dependencies. Zero frameworks. Pure web.**

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- [Node.js](https://nodejs.org/) (optional, for local server)

### Option 1: Direct Open
Simply open `index.html` in your browser:
```
open index.html
```

### Option 2: Local Server (Recommended)
```bash
# Using npx (no install needed)
npx http-server . -p 3000 -c-1

# Or using Python
python -m http.server 3000
```
Then open **http://localhost:3000** in your browser.

---

## 📁 Project Structure

```
alibi-architect/
├── index.html      # Main HTML — app structure & layout
├── index.css       # Design system — all styles & animations
├── engine.js       # Generation engine — templates, metrics, reasoning
├── app.js          # App controller — UI logic, effects, interactions
└── README.md       # You are here
```

### Architecture

```
┌─────────────────────────────────────────────────┐
│                    index.html                    │
│  ┌──────────────┐      ┌──────────────────────┐ │
│  │ Config Panel  │      │    Output Panel       │ │
│  │ • Scenario    │      │ • Empty State         │ │
│  │ • Authority   │      │ • Loading (Thinking)  │ │
│  │ • Urgency     │─────▶│ • BIOS Overlay        │ │
│  │ • Tone        │      │ • Result + Metrics    │ │
│  │ • Chaos       │      │ • Why This Works      │ │
│  │ • Generate    │      │ • Warnings            │ │
│  └──────────────┘      └──────────────────────┘ │
└───────────────┬─────────────────┬───────────────┘
                │                 │
         ┌──────▼──────┐  ┌──────▼──────┐
         │   app.js     │  │  engine.js   │
         │ UI Controller│  │ AI Engine    │
         │ • BIOS       │  │ • Templates  │
         │ • Particles  │  │ • Classify   │
         │ • Scramble   │  │ • Metrics    │
         │ • Animations │  │ • Reasoning  │
         └─────────────┘  └─────────────┘
```

---

## 🎮 How to Use

1. **Describe your scenario** — Type what you need an excuse for
2. **Set target authority** — Who are you explaining to? (Strict / Neutral / Friendly)
3. **Choose urgency** — How urgent is the situation? (Low → Critical)
4. **Select tone** — How should the excuse sound? (Formal / Emotional / Casual / Absurd)
5. **Adjust chaos** — Slide from Realistic to Absurd for wilder excuses
6. **Generate** — Click the button and watch the BIOS boot sequence
7. **Review** — Read the alibi, check metrics, understand why it works
8. **Copy** — One-click copy to clipboard

---

## 🎨 Design System

### Color Palette
| Name | Hex | Usage |
|------|-----|-------|
| Indigo | `#6366f1` | Primary accent |
| Purple | `#a855f7` | Secondary accent |
| Pink | `#ec4899` | Warm accent |
| Cyan | `#06b6d4` | Cool accent / info |
| Emerald | `#10b981` | Success / low risk |
| Amber | `#f59e0b` | Warning / medium risk |
| Red | `#ef4444` | Danger / high risk |
| Dark | `#080a12` | Background |

### Typography
- **Inter** — UI text, headings, body
- **JetBrains Mono** — Code, metrics, terminal, badges

### Animations
- Panel entrance slides
- Floating background glows
- CRT scanline sweep
- Particle network
- Spinner rings
- Thinking step progression
- BIOS terminal log sequence
- Text scramble/decrypt
- Metric counter easing
- Badge pop-in springs
- Tag cascade entrance
- Warning pulse
- Screen flash
- Logo glitch

---

## 🔒 Disclaimer

> **This project is for entertainment and educational purposes only.**
> It was built as a hackathon project to demonstrate creative UI/UX engineering,
> animation techniques, and narrative generation systems.
> Please use responsibly. Don't actually use these excuses. 😄

---

## 📄 License

MIT License — feel free to fork, modify, and use for your own projects.

---

<div align="center">

**Built with ⚡ for the hackathon**

*Alibi Architect v3.0 — Advanced Narrative Intelligence*

</div>

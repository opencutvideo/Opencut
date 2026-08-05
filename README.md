<p align="center">
  <img src="brand/marks/logo-dark.svg" alt="OpenCut" height="48" />
</p>

<p align="center">
  <strong>Open-source video editor. No watermarks. No paywalls. No server uploads.</strong>
</p>

<p align="center">
  <a href="https://opencut.fun">opencut.fun</a> ·
  <a href="https://opencut.fun/editor">Try the Editor</a> ·
  <a href="https://opencut.fun/about">About</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" />
  <img src="https://img.shields.io/badge/status-alpha-orange.svg" alt="Alpha" />
  <img src="https://img.shields.io/badge/built%20with-Rust%20%2B%20WASM-orange.svg" alt="Rust + WASM" />
  <img src="https://img.shields.io/badge/React-19-61dafb.svg" alt="React 19" />
</p>

---

## What is OpenCut?

OpenCut is a free, open-source video editor that runs entirely in your browser — no installation, no account, no server uploads. Your videos never leave your machine. All processing happens locally using a Rust engine compiled to WebAssembly.

- **Privacy by default** — your files never touch any server
- **No watermarks, no export limits, no "Pro" tier** — every feature is free, forever
- **MIT licensed** — fork it, self-host it, build on it
- **Works everywhere** — browser today, desktop (Tauri) and mobile coming soon

---

## Features

- 🎬 **Browser-based timeline editor** — import, trim, and export video without leaving the tab
- ⚡ **Rust + WebAssembly core** — near-native performance, scrubbing 4K feels instant
- 🌐 **Cross-platform** — same codebase runs on Web, macOS, Windows, and (soon) iOS/Android
- 🔒 **Fully local** — zero server-side processing, zero telemetry
- 🎚️ **Playback controls** — volume, mute, playback rate, frame-accurate trim in/out points
- 📤 **Export** — trim and export clips directly from the browser

---

## Roadmap

| Period | Milestone |
|--------|-----------|
| **Aug 2026** ✅ | Web editor alpha — live at [opencut.fun](https://opencut.fun) |
| Q4 2026 | Desktop alpha — Tauri shell for macOS & Windows |
| Q1 2027 | Plugin system beta — public plugin API for effects & exporters |
| Q2 2027 | Mobile apps — iOS & Android |
| 2027+ | MCP & AI scripting — automate cuts, captions, and exports with any AI agent |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Core engine | Rust → WebAssembly |
| UI | React 19 + TanStack Router |
| Styling | Tailwind CSS v4 |
| Desktop shell | Tauri (macOS, Windows) |
| Monorepo | pnpm workspaces |
| CI / Deploy | GitHub Actions → GitHub Pages |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 10+

### Run locally

```bash
# Clone the repo
git clone https://github.com/opencutvideo/Opencut.git
cd Opencut

# Install dependencies
pnpm install

# Start the web app
cd apps/web
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
pnpm --filter @workspace/opencut-web run build
```

---

## Project Structure

```
Opencut/
├── apps/
│   └── web/              # Landing page & marketing site
├── artifacts/
│   └── opencut-web/      # Main editor web app (React + Vite)
├── brand/
│   └── marks/            # Logos, icons, SVG assets
├── lib/
│   ├── api-client-react/ # Generated React Query hooks
│   ├── api-spec/         # OpenAPI spec + codegen config
│   ├── api-zod/          # Generated Zod schemas
│   └── db/               # Database schema (Drizzle ORM)
└── .github/
    └── workflows/        # CI/CD — build & deploy to GitHub Pages
```

---

## Contributing

OpenCut is MIT licensed and community-driven. Contributions of any kind are welcome.

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes
4. Open a pull request

Please open an issue first for large changes so we can discuss direction.

---

## License

[MIT](LICENSE) — free to use, fork, and distribute.

---

<p align="center">
  Built by the community · <a href="https://opencut.fun">opencut.fun</a>
</p>

# Savario Jenkins — Portfolio

A cinematic, scroll-driven personal portfolio. One continuous page presents a procedural
3D "living network" (React Three Fiber + Three.js) choreographed with GSAP ScrollTrigger
as the visitor scrolls through Hero → About → Skills → Projects → Education → Contact.
The site also ships a no-WebGL static fallback, a Recruiter Quick View modal, and an
optional terminal easter egg.

## Tech stack

- React 19 + Vite
- Three.js via `@react-three/fiber` and `@react-three/drei` — all geometry is procedural
  (no external 3D model files)
- GSAP + ScrollTrigger for scroll choreography
- Plain CSS with custom properties (no CSS framework)

## Getting started

```bash
npm install
npm run dev       # local dev server with HMR
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

`npm run build` outputs a fully static site to `dist/`, ready to upload to any static host.

## Editing content

All real content lives in three files — edit these, not the components:

| File | Controls |
| --- | --- |
| `src/config/site.js` | Name, role, tagline, email, GitHub/LinkedIn URLs, asset paths |
| `src/config/content.js` | About text, "Beyond the Code" note, skills list, education/certification entries |
| `src/config/projects.js` | The three project destinations and their full case-study content |

**Links:** `siteConfig.links.github` and `siteConfig.links.linkedin` are `null` until you
add real URLs. While `null`, those buttons render a disabled "Coming Soon" state instead
of linking to `#`. Fill them in as soon as the profiles are live.

**Projects:** `src/config/projects.js` is the single source of truth for the project
case-study panels (overview, problem, architecture, technologies, process, challenges,
results, what-was-learned, screenshots, GitHub, demo). Every field currently reads
"Details coming soon" / `null` intentionally — nothing was invented. Fill in each field
as that project actually develops. `github` / `demo` follow the same "Coming Soon until
real" pattern as the social links above.

## Replacing placeholder assets

Two files are expected in `/public` and are **not** included with real content:

1. **`/public/resume-savario-jenkins.pdf`**
   A minimal placeholder PDF ships here so the "Download Résumé" button never 404s.
   Replace it with your real résumé, keeping the exact same filename (or update
   `siteConfig.assets.resume` in `src/config/site.js` if you rename it).

2. **`/public/contact-portrait.jpg`**
   This file does **not** exist yet. The Contact section will automatically show a
   tasteful placeholder frame (with instructions) until you add it. Drop your
   navy-suit photograph in at exactly this path and filename, and it will appear in the
   glass portrait frame in the Contact section automatically — no code changes needed.
   Use a reasonably high-resolution, portrait-oriented (roughly 4:5) JPEG for the best
   crop.

Other editable brand assets:

- `/public/favicon.svg` — browser tab icon (procedural SVG mark, easy to restyle)
- `/public/og-image.svg` — social share preview image (1200×630). Consider exporting a
  PNG/JPEG version for maximum compatibility with link-preview crawlers that don't
  render SVG, then point the `og:image` / `twitter:image` tags in `index.html` at it.
- `/public/robots.txt` and `/public/sitemap.xml` — replace `YOUR-DOMAIN-HERE.com` with
  your real deployed domain once one exists.
- `src/config/site.js` → `siteUrl` — set this once a production domain exists; it's left
  blank on purpose rather than publishing a placeholder URL.

## Features

- **No "Enter" gate.** The experience begins immediately: a dormant 3D core activates
  and reveals the hero content as the page loads.
- **Scroll-driven camera.** Native scrolling drives a GSAP ScrollTrigger progress value
  that smoothly moves the 3D camera between waypoints — the page never hijacks or traps
  scroll input.
- **Recruiter Quick View** (top-right button) — a fast, plain-HTML overview of name,
  role, about, skills, education, project status, and contact links. Works with or
  without WebGL and is readable in well under a minute.
- **Static fallback.** If WebGL is unavailable, an animated CSS gradient background
  replaces the 3D canvas and all HTML content remains fully readable and functional.
- **Reduced motion.** `prefers-reduced-motion` disables idle 3D animation, cursor
  parallax, and CSS transitions/animations sitewide, while scroll-driven camera movement
  (which is a direct result of the user's own scrolling) is retained.
- **Terminal easter egg** (bottom-left button) — optional, never required for
  navigation. Try `about`, `skills`, `projects`, `education`, `contact`, `help`, `clear`.
- **Ambient sound** (top-right speaker icon) — a small procedurally generated ambient
  pad (Web Audio API oscillators, no audio files). Muted by default; only starts after
  the visitor clicks the toggle.
- **Performance-conscious 3D:** lazy-loaded 3D bundle with a real loading indicator,
  capped device pixel ratio, reduced particle counts on mobile, and rendering paused via
  `frameloop="never"` when the browser tab is hidden.

## Project structure

```
src/
  config/          site.js, content.js, projects.js — all editable content/config
  hooks/           scroll choreography, reduced motion, WebGL detection, ambient audio
  three/           procedural R3F scene: core, particles, data paths, project nodes, camera rig
  components/
    layout/        TopBar, section nav dots, loading screen, static fallback, skip link
    sections/      Hero, About, Skills, Projects, Education, Contact
    ui/            Buttons, Quick View modal, project case-study panel, terminal, sound toggle
  App.jsx          Assembles the full page and wires state together
  main.jsx         React entry point
public/
  favicon.svg, og-image.svg, site.webmanifest, robots.txt, sitemap.xml, 404.html
  resume-savario-jenkins.pdf   (placeholder — replace with the real file)
```

## Accessibility & performance notes

- Semantic landmarks (`<main>`, `<header>`, `<footer>`, `<nav>`), a skip link, and
  visible focus states throughout.
- The 3D canvas is `aria-hidden` and `pointer-events: none` — it never intercepts
  keyboard or screen-reader navigation; all real content is ordinary HTML.
- Modals and panels (Quick View, project case studies, terminal) trap Escape-to-close,
  return focus to a close button on open, and lock body scroll while open.
- Color palette targets comfortable contrast against the dark background; verify with
  your browser's accessibility inspector after any palette changes.

## Deploying to Hostinger

1. Run `npm run build`. This produces a static site in `dist/`.
2. In hPanel, open **File Manager** (or connect via FTP) for your Hostinger hosting
   plan and navigate to `public_html` (or the document root for your domain).
3. Upload the **contents** of `dist/` (not the folder itself) into that directory, so
   `index.html` sits directly at the document root.
4. If Hostinger's Node.js application feature is used instead of static hosting, set it
   up to serve the `dist/` folder as static files (e.g. via a minimal `serve`/`express`
   static server), since this project has no server-side runtime code — it's a fully
   static build.
5. Once your domain is live, update `siteUrl` in `src/config/site.js`, and the
   placeholder domains in `public/robots.txt` and `public/sitemap.xml`, then rebuild and
   re-upload.

## Browser support

Built and tested against current evergreen browsers (Chrome, Firefox, Safari, Edge).
WebGL2/WebGL1 is used when available; the static fallback covers everything else.

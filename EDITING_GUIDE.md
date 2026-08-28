# Editing Guide

Everything you'd normally want to change lives in a small set of files. You never need
to touch the 3D code or CSS to update content. After any change, run:

```bash
npm run dev      # preview while editing
npm run build    # production build before deploying
```

## Where everything lives

| What | File |
| --- | --- |
| Name, headline, summary, email, social links, asset paths, domain | `src/config/site.js` |
| About text, skills, education, Completed Foundations | `src/config/content.js` |
| The three flagship projects | `src/config/projects.js` |
| Résumé PDF | `public/resume-savario-jenkins.pdf` |
| Contact headshot | `public/contact-portrait.webp` |
| Social-share preview image | `public/og-image.png` |
| Page title / description / social meta tags | `index.html` |

## Changing text

- **Hero headline, role line, and summary** → `src/config/site.js` (`person.name`,
  `person.role`, `person.tagline`).
- **About paragraphs** → `src/config/content.js` (`about.paragraphs` — each string in the
  list is one paragraph).
- **"Beyond the Code"** → `src/config/content.js` (`about.beyondTheCode.text`).
- **Contact email** → `src/config/site.js` (`person.email`).

## Updating a project's status

Open `src/config/projects.js` and find the project. Change its `status` field, e.g.:

```js
status: "In Development",
```

**Only change a project to `"Completed"` after the implementation actually exists** —
a real repository with working code. Until then it must stay `"In Development"`.

While a project is in development, its panel shows the fields under `development`:
`goal`, `plannedCapabilities`, `confirmedTechnologies`, `currentLearningFocus`, and
`nextMilestone`. Update these freely as the plan evolves.

## Adding project technologies

Add to the project's `development.confirmedTechnologies` array **only once the
technology has genuinely been chosen and used**:

```js
confirmedTechnologies: ["Python", "FastAPI"],
```

Don't list technologies you're merely considering — that's what
`currentLearningFocus` is for.

## Adding a GitHub repository to a project

In `src/config/projects.js`, replace `github: null` with the real URL:

```js
github: "https://github.com/Savario1/your-repo-name",
```

The "GitHub Repository" button activates automatically. The same applies to
`demo:` for a live demonstration link. Leave them `null` to show "Coming Soon".

## Adding project screenshots / case-study content

Once real progress exists, fill in the project's `caseStudy` fields:

```js
caseStudy: {
  architecture: "One or two sentences describing the real architecture.",
  results: "",
  challenges: "",
  learned: "",
  screenshots: ["/screenshots/project-1.png"],
},
```

- Put screenshot image files in `public/` (e.g. `public/screenshots/`).
- Any field left as an empty string (or empty list) stays hidden in the panel —
  no placeholder text is shown. Sections appear automatically once filled.

## Replacing the headshot

1. Prepare a portrait-orientation photo (roughly 4:5, face centered, shoulders visible).
2. Export it as WebP at roughly 250–350 KB (most image tools can "Export as
   WebP" — quality ~85 is usually right).
3. Save it as `public/contact-portrait.webp` (exact filename).
4. Done — the Contact section picks it up automatically. If the file is missing, a
   graceful placeholder frame is shown instead.

To use a different filename or format, also update `assets.contactPortrait` in
`src/config/site.js`.

## Replacing the résumé

Replace `public/resume-savario-jenkins.pdf` with the new PDF, **keeping the same
filename**. Every "Download Résumé" button (Hero, Quick View, Contact) uses this one
file. If you rename it, update `assets.resume` in `src/config/site.js`.

## Updating education

Open `src/config/content.js` → `education.items`. Each entry supports:

```js
{
  credential: "Associate in Arts, Computer Science Transfer Track",
  institution: "Santa Fe College",     // optional
  status: "In Progress",
  expected: "Expected Summer 2027",    // optional
  note: "One-sentence description.",
  supportingNote: "Optional smaller italic note.",  // optional
},
```

Only add a completion date or change a status to "Completed" once it has really
happened. Don't name a transfer university until admission is confirmed.

## Updating social links

Open `src/config/site.js` → `links`:

```js
links: {
  github: "https://github.com/Savario1",
  linkedin: "https://www.linkedin.com/in/savariojenkins/",
},
```

Setting a link to `null` turns its buttons back into a disabled "Coming Soon" state
everywhere (Hero, Contact, Quick View) — no dead links.

## Changing the domain

If the site ever moves, update in one pass:

1. `src/config/site.js` → `siteUrl`
2. `index.html` → canonical link, `og:url`, `og:image`, `twitter:image`
3. `public/robots.txt` → Sitemap line
4. `public/sitemap.xml` → `<loc>`

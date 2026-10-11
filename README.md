# portfoliochetan.dev

Personal portfolio of **Bhima Chetan**, software developer. React 19 + Vite + Framer Motion, no UI framework.

## Interactions

- **Command menu**: `Ctrl/⌘ + K` or `/` to jump to any section, copy the email, grab the résumé, or switch theme.
- **Live dot field** in the hero that parts around the cursor; click for a ripple.
- **Skills explorer**: pick a skill to see exactly which roles and projects used it.
- Kinetic name type, 3D-tilt portrait, magnetic buttons, cursor-spotlight cards, scroll-linked timeline and text reveal.
- Light/dark theme with a circular View Transition reveal. Everything respects `prefers-reduced-motion`.

## Develop

```bash
npm install
npm run dev     # http://localhost:5173
npm run lint
npm test        # node:test, checks the content data and command matching
npm run build
```

## Editing content

All copy (experience, projects, skills, links) lives in [`src/data.js`](src/data.js). The résumé is `public/Bhima_Chetan_Resume.pdf`.

## Deploy

Pushing to `main` runs lint → test → build and publishes to GitHub Pages (custom domain `portfoliochetan.dev`).

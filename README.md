# portfolio-glass

Glassmorphism personal portfolio — React + Vite + Framer Motion + Tailwind CSS.

## Effects
- Custom cursor: tracking dot + spring-lagged ring + soft glow, grows on hover
- Mouse-following gradient-mesh spotlight + parallax blobs
- 3D tilt cards with moving glare
- Magnetic buttons & icons
- Scroll progress bar, scroll-reveal sections, parallax hero
- Animated skill bars, timeline, staggered entrances
- Respects `prefers-reduced-motion`

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
```

## Make it yours
1. Edit `src/data/portfolio.js` — name, role, bio, skills, experience, projects, socials.
2. Drop your `resume.pdf` into `public/` (Résumé button links to `/resume.pdf`).
3. Tweak theme colors in `tailwind.config.js` + `src/index.css`.

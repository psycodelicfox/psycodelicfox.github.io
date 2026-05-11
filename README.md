# psycodelicfox.github.io

Personal portfolio site for Fox Fulbright. Live at [psycodelicfox.github.io](https://psycodelicfox.github.io).

## Stack

Hand-written HTML, CSS, and a small amount of vanilla JavaScript. No frameworks, no build step, no dependencies. Loads in well under a second.

- **Typography:** Fraunces (display, with variable SOFT and WONK axes), Manrope (body), JetBrains Mono (UI accents)
- **Aesthetic:** Editorial × dusk - warm dark palette, serif display typography, subtle starfield drawn on canvas
- **Accessibility:** Respects `prefers-reduced-motion`, semantic HTML, keyboard navigable, no JS required for content

## Files

```
.
├── index.html              # main page
├── style.css               # all styles
├── script.js               # starfield, email reveal, year stamp
├── 404.html                # custom 404 in matching aesthetic
├── .nojekyll               # disables GitHub Pages Jekyll processing
└── Fox_Fulbright_Resume.pdf  # (drop in when ready)
```

## Local preview

No build step. Just open `index.html` in a browser, or for live-reload:

```bash
npx serve .
```

## Deployment

This repo is a GitHub Pages user site. Any push to `main` publishes within ~60 seconds at `https://psycodelicfox.github.io`. No base href, no build action, no gh-pages branch needed.

## License

Content (text, projects, identity) © Fox Fulbright. Code structure is available for inspiration — copy if useful, just don't pass it off as your own portfolio.

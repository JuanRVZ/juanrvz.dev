# juanrvz.dev

Professional portfolio of Juan Ramón Vaz León. React 19, Vite 7 and Tailwind CSS 4. English and Spanish content, light and dark themes, scroll-driven presentation, static HTML prerendering and no runtime services.

## Development

Use Node.js 22.12 or newer (Cloudflare uses Node 22).

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

The build uses Vite for client assets and a temporary server bundle to render React into `dist/index.html`. The temporary bundle is removed. React hydrates the static page; Cloudflare only serves static files and needs no server runtime. Content is available without JavaScript; the mobile menu requires JavaScript, while hero links and the page remain usable.

## Structure

- `src/content.js`: confirmed personal content and optional links.
- `App.jsx`: semantic sections, navigation and menu behavior, and the copy for the SAP stack scene.
- `src/scroll.js`: the scroll engine. It writes a 0–1 progress value (`--p`) on each `[data-scroll]` element and reveals `[data-reveal]` elements; all visuals are CSS.
- `src/Portrait.jsx`: the hero portrait. The 306 px photo is sampled in the browser and redrawn on a canvas as a dot matrix, so it stays sharp at any size and takes its colours from the active theme. Replacing `public/juan-ramon-vaz-leon.jpg` is enough to change it; a square photo on a plain white backdrop works best.
- `styles.css`: Tailwind import, design tokens, responsive layouts, and a final block of `html.motion` rules holding every scroll-driven effect.
- `scripts/build.mjs`: static prerender and automatic bilingual CV generation.
- `scripts/generate-cv.mjs`: text-based PDF CVs generated from the same personal content.
- `index.html`: canonical, English metadata, Open Graph, Twitter card and structured data.
- `public/`: favicon, 1200 × 630 social card, robots.txt and sitemap.
- `CONTENT.md`: content schemas and information still needed.

Geist and Geist Mono are self-hosted through `@fontsource-variable` (bundled by Vite, no third-party requests). CSS artwork and inline SVG icons avoid image downloads. No analytics, animation libraries, icon packages or client router.

## Scroll-driven sections

An inline script in `index.html` adds `html.js` (the canvas portrait replaces the photo) and, unless the visitor prefers reduced motion, `html.motion`; both are removed again if the app bundle has not started after five seconds. Without `motion` the page is a plain, fully visible document, which is also what crawlers and no-JavaScript visitors get.

With it, four scenes react to scrolling: the hero recedes while the portrait dissolves row by row, the About statement lights up word by word while pinned, the SAP stack separates into layers that take focus one at a time, and Selected work moves sideways while pinned (viewports at least 900 × 700; smaller ones get a swipeable row). Scene lengths are the `height` values under `html.motion` in `styles.css`.

## Cloudflare Pages — existing settings preserved

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 22 (`.node-version`)
- Git integration: automatic deploys when commits are pushed to `main`
- Preview: https://juanrvz-dev.pages.dev
- Primary domain: https://juanrvz.dev

Domain and `www` redirect settings remain managed in Cloudflare. No deployment settings or secrets are required by this change. Publishing requires pushing the reviewed changes through the existing Git integration.

## Review

Check the production preview at mobile, tablet and desktop widths. Verify the menu opens/closes, Escape returns focus, section links work, the keyboard skip link appears, and the page has no horizontal overflow. Scroll through the pinned scenes in both themes and both languages, and once more with reduced motion enabled. Verify email/GitHub links and real CV/credential links when supplied. Rebuild after content changes to refresh prerendered HTML.

The “Download CV” link serves the generated English or Spanish PDF. `pdf-lib` is a development dependency used only during the build, so PDF generation adds no browser runtime cost.

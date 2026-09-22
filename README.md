# juanrvz.dev

Professional portfolio of Juan Ramón Vaz León. React 19, Vite 7 and Tailwind CSS 4. English content, responsive dark design, static HTML prerendering and no runtime services.

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
- `App.jsx`: semantic sections, reusable cards, navigation and menu behavior.
- `styles.css`: Tailwind import, design tokens, responsive layouts and reduced-motion support.
- `scripts/build.mjs`: static prerender step using existing dependencies.
- `index.html`: canonical, English metadata, Open Graph, Twitter card and structured data.
- `public/`: favicon, 1200 × 630 social card, robots.txt and sitemap.
- `CONTENT.md`: content schemas and information still needed.

System fonts, CSS artwork and inline SVG icons avoid font and image downloads on the main page. No analytics, animation libraries, icon packages or client router.

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

Check the production preview at mobile, tablet and desktop widths. Verify the menu opens/closes, Escape returns focus, section links work, the keyboard skip link appears, and the page has no horizontal overflow. Verify email/GitHub links and real CV/credential links when supplied. Rebuild after content changes to refresh prerendered HTML.

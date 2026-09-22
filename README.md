# juanrvz.dev

Personal portfolio of Juan Ramón Vaz León. A minimal React, Vite and Tailwind CSS application, ready for the full portfolio.

## Development

Use Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

Vite writes the production site to `dist/`. `App.jsx` holds the page content, `styles.css` contains global styles, and `main.jsx` is the React entry point.

## Cloudflare Pages

Deployment configuration:

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 22
- Git integration: deploy automatically when commits are pushed to `main`.

The intended primary domain is `https://juanrvz.dev`, with `www` redirecting to the primary domain. Domain configuration is managed in Cloudflare.

Never commit credentials or environment secrets. The site needs no runtime secrets or paid services.

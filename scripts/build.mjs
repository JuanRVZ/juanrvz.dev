import { build } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { readFile, writeFile, rm } from "node:fs/promises";

// Static HTML for crawlers and visitors before JavaScript loads; no server required.
await build();
try {
  await build({ build: { ssr: "App.jsx", outDir: ".prerender" } });
  const { default: App } = await import("../.prerender/App.js");
  const template = await readFile("dist/index.html", "utf8");
  await writeFile(
    "dist/index.html",
    template.replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(createElement(App))}</div>`,
    ),
  );
  console.log("Prerendered portfolio to dist/index.html");
} finally {
  await rm(".prerender", { recursive: true, force: true });
}

import { useEffect, useRef } from "react";

// The source photo is only 306 px wide, so it is never shown enlarged. Instead it is
// sampled into a grid and redrawn as a dot matrix on a canvas: sharp at any size,
// coloured from the active theme, and cheap enough to redraw while scrolling.

const CELL = 3; // source pixels per dot
const BACKGROUND = 0.975; // luminance above this, connected to the frame, is backdrop
const clamp = (value) => Math.min(1, Math.max(0, value));

function sample(image) {
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(image, 0, 0);
  const { data } = context.getImageData(0, 0, width, height);

  const luminance = new Float32Array(width * height);
  for (let i = 0; i < luminance.length; i++)
    luminance[i] =
      (0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]) /
      255;

  // Flood-fill the white studio backdrop from the top and the upper sides. The bottom
  // edge is skipped because the (white) shirt touches it.
  let backdrop = new Uint8Array(width * height);
  const stack = [];
  for (let x = 0; x < width; x++) stack.push(x);
  for (let y = 0; y < height * 0.7; y++)
    stack.push(y * width, y * width + width - 1);
  while (stack.length) {
    const p = stack.pop();
    if (backdrop[p] || luminance[p] < BACKGROUND) continue;
    backdrop[p] = 1;
    const x = p % width;
    if (x > 0) stack.push(p - 1);
    if (x < width - 1) stack.push(p + 1);
    if (p >= width) stack.push(p - width);
    if (p < width * (height - 1)) stack.push(p + width);
  }
  // Grow the backdrop by two pixels to swallow the JPEG halo around the silhouette.
  for (let pass = 0; pass < 2; pass++) {
    const grown = backdrop.slice();
    for (let p = 0; p < backdrop.length; p++) {
      if (backdrop[p]) continue;
      const x = p % width;
      if (
        (x > 0 && backdrop[p - 1]) ||
        (x < width - 1 && backdrop[p + 1]) ||
        backdrop[p - width] ||
        backdrop[p + width]
      )
        grown[p] = 1;
    }
    backdrop = grown;
  }

  // Keep only the figure itself: whatever is connected to the bottom centre. Stray
  // specks left floating in the backdrop are dropped.
  const figure = new Uint8Array(width * height);
  stack.push(width * (height - 1) + (width >> 1));
  while (stack.length) {
    const p = stack.pop();
    if (figure[p] || backdrop[p]) continue;
    figure[p] = 1;
    const x = p % width;
    if (x > 0) stack.push(p - 1);
    if (x < width - 1) stack.push(p + 1);
    if (p >= width) stack.push(p - width);
    if (p < width * (height - 1)) stack.push(p + width);
  }

  const cols = Math.floor(width / CELL);
  const rows = Math.floor(height / CELL);
  const cells = new Float32Array(cols * rows); // mean luminance, or -1 for backdrop
  for (let gy = 0; gy < rows; gy++)
    for (let gx = 0; gx < cols; gx++) {
      let sum = 0;
      let empty = 0;
      for (let y = gy * CELL; y < (gy + 1) * CELL; y++)
        for (let x = gx * CELL; x < (gx + 1) * CELL; x++) {
          sum += luminance[y * width + x];
          empty += 1 - figure[y * width + x];
        }
      const count = CELL * CELL;
      cells[gy * cols + gx] = empty > count / 2 ? -1 : sum / count;
    }
  return { cols, rows, cells };
}

export default function Portrait({ src, alt }) {
  const figure = useRef(null);
  const canvas = useRef(null);
  const photo = useRef(null);

  useEffect(() => {
    const host = figure.current;
    const surface = canvas.current;
    const image = photo.current;
    const context = surface.getContext("2d");
    const animate = document.documentElement.classList.contains("motion");
    const hero = host.closest("section");
    let grid = null;
    let size = 0;
    let frame = 0;
    let disposed = false;
    let started = 0;
    let pointer = null;
    let palette = null;

    function readPalette() {
      const style = getComputedStyle(host);
      const [r, g, b] = style.color.match(/[\d.]+/g).map(Number);
      palette = {
        ink: style.color,
        accent: style.getPropertyValue("--accent").trim(),
        // Light ink means a dark page: dots then follow brightness instead of shadow.
        dark: 0.299 * r + 0.587 * g + 0.114 * b > 128,
      };
    }

    function draw(now) {
      frame = 0;
      if (!grid || !size) return;
      const { cols, rows, cells } = grid;
      const pitch = size / cols;
      const intro = animate ? clamp((now - started) / 1600) : 1;
      const exit = animate ? clamp(window.scrollY / hero.offsetHeight) : 0;
      const reach = pitch * 9;
      const lit = [];

      context.clearRect(0, 0, size, size);
      context.fillStyle = palette.ink;
      context.beginPath();
      for (let gy = 0; gy < rows; gy++) {
        const row = gy / (rows - 1);
        // Rows build top-down on load, dissolve top-down on scroll, and thin out
        // towards the bottom so the figure fades into the page.
        const scale =
          clamp(intro * 2.2 - row * 1.2) *
          clamp(1.3 - exit * 2.6 - (1 - row) * 0.3) *
          clamp((1 - row) / 0.34);
        if (scale <= 0) continue;
        for (let gx = 0; gx < cols; gx++) {
          const value = cells[gy * cols + gx];
          if (value < 0) continue;
          // On a dark page dots follow brightness, with a floor so dark hair still
          // reads as a silhouette and a cap so the white shirt keeps its texture.
          const tone = palette.dark
            ? Math.min(0.1 + value ** 1.5 * 0.6, 0.43)
            : Math.min((1 - value) ** 0.9 * 0.62, 0.52);
          let radius = tone * pitch * scale;
          if (radius < 0.3) continue;
          const x = (gx + 0.5) * pitch;
          const y = (gy + 0.5) * pitch;
          if (pointer) {
            const distance = Math.hypot(x - pointer.x, y - pointer.y);
            if (distance < reach) {
              radius *= 1 + 0.45 * (1 - distance / reach);
              lit.push(x, y, radius);
              continue;
            }
          }
          context.moveTo(x + radius, y);
          context.arc(x, y, radius, 0, Math.PI * 2);
        }
      }
      context.fill();

      if (lit.length) {
        context.fillStyle = palette.accent;
        context.beginPath();
        for (let i = 0; i < lit.length; i += 3) {
          context.moveTo(lit[i] + lit[i + 2], lit[i + 1]);
          context.arc(lit[i], lit[i + 1], lit[i + 2], 0, Math.PI * 2);
        }
        context.fill();
      }
      if (intro < 1) request();
    }
    function request() {
      if (!frame && !disposed) frame = requestAnimationFrame(draw);
    }

    function resize() {
      const next = host.clientWidth;
      if (!next) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      size = next;
      surface.width = surface.height = Math.round(next * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      request();
    }
    function restyle() {
      readPalette();
      request();
    }
    function onScroll() {
      if (window.scrollY <= hero.offsetHeight) request();
    }
    function onPointerMove(event) {
      const rect = host.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      request();
    }
    function onPointerLeave() {
      pointer = null;
      request();
    }

    const resizeObserver = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(restyle);
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");

    image
      .decode()
      .then(() => {
        if (disposed) return;
        grid = sample(image);
        readPalette();
        started = performance.now();
        host.dataset.ready = "";
        resizeObserver.observe(host);
        themeObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"],
        });
        scheme.addEventListener("change", restyle);
        if (animate)
          window.addEventListener("scroll", onScroll, { passive: true });
        host.addEventListener("pointermove", onPointerMove);
        host.addEventListener("pointerleave", onPointerLeave);
      })
      .catch(() => {
        host.dataset.failed = ""; // the plain photo stays visible
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      scheme.removeEventListener("change", restyle);
      window.removeEventListener("scroll", onScroll);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <figure className="portrait" ref={figure}>
      <img
        ref={photo}
        src={src}
        alt={alt}
        width="306"
        height="306"
        fetchPriority="high"
        decoding="async"
      />
      <canvas ref={canvas} aria-hidden="true" />
    </figure>
  );
}

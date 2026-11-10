// Scroll engine: writes a 0–1 progress value (--p) on every [data-scroll] element
// and lets CSS do the rest. No animation library; one rAF-throttled listener.
//
//   data-scroll="pin"    tall wrapper around a sticky child: 0 when pinning starts, 1 when it ends
//   data-scroll="exit"   0 while the element's top is at the viewport top, 1 once it has scrolled away
//   data-scroll="fill"   how far the viewport's reading line has travelled through the element
//   data-scroll="enter"  0 when the element appears at the bottom edge, 1 once it has fully entered
//   data-steps="4"       also exposes the progress as a discrete data-step="0…3"
//   data-track           horizontal track inside a pin; its overflow is published as --distance
//   data-reveal          gets the class "in" the first time it enters the viewport
//
// Everything is gated on html.motion, which index.html sets before first paint
// unless the visitor prefers reduced motion.

const clamp = (value) => Math.min(1, Math.max(0, value));

const progress = {
  pin: (rect, viewport) => -rect.top / (rect.height - viewport),
  exit: (rect) => -rect.top / rect.height,
  fill: (rect, viewport) => (viewport * 0.62 - rect.top) / rect.height,
  enter: (rect, viewport) =>
    (viewport - rect.top) / Math.min(rect.height, viewport),
};

export function initScroll() {
  const html = document.documentElement;
  window.__scrollReady = true;
  if (!html.classList.contains("motion")) return () => {};

  const scenes = [...document.querySelectorAll("[data-scroll]")];
  const tracks = [...document.querySelectorAll("[data-track]")];
  let frame = 0;

  function update() {
    frame = 0;
    const viewport = window.innerHeight;
    const scrollable = html.scrollHeight - viewport;
    html.style.setProperty(
      "--scroll",
      scrollable > 0 ? clamp(window.scrollY / scrollable).toFixed(4) : "0",
    );
    html.toggleAttribute("data-scrolled", window.scrollY > 16);

    for (const scene of scenes) {
      const rect = scene.getBoundingClientRect();
      const raw = progress[scene.dataset.scroll]?.(rect, viewport);
      const value = Number.isFinite(raw) ? clamp(raw) : 0;
      scene.style.setProperty("--p", value.toFixed(4));
      const steps = Number(scene.dataset.steps);
      if (steps) {
        const step = String(Math.min(steps - 1, Math.floor(value * steps)));
        if (scene.dataset.step !== step) scene.dataset.step = step;
      }
    }
  }
  const request = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  function measure() {
    for (const track of tracks) {
      const scene = track.closest("[data-scroll]");
      const distance = Math.max(
        0,
        track.offsetWidth - track.parentElement.clientWidth,
      );
      scene?.style.setProperty("--distance", `${distance}px`);
    }
    request();
  }

  const resizeObserver = new ResizeObserver(measure);
  for (const track of tracks) resizeObserver.observe(track);

  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  for (const element of document.querySelectorAll("[data-reveal]:not(.in)"))
    revealObserver.observe(element);

  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", measure);
  measure();
  update();

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    revealObserver.disconnect();
    window.removeEventListener("scroll", request);
    window.removeEventListener("resize", measure);
  };
}

// Pointer-follow highlight for cards: CSS reads --mx / --my.
export function spotlight(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

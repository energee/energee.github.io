// An original, procedural ASCII signal field. No tracking or external assets.
export function startAsciiField(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const hero = canvas.parentElement;
  if (!hero) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, frame = 0, last = 0, time = 0;
  let inView = true;
  const stopAt = performance.now() + 5000;
  const glyphs = ' .·:+*=#';

  const paint = (): void => {
    ctx.clearRect(0, 0, width, height);
    const gap = 12, cols = Math.ceil(width / gap), rows = Math.ceil(height / 15);
    ctx.font = '10px monospace';
    ctx.textBaseline = 'middle';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const nx = x / cols, ny = y / rows;
        const wave = .12 * Math.sin(nx * 10 + time * .3) + .07 * Math.sin(nx * 23 - time * .19);
        const ridge = Math.exp(-Math.pow((ny - .50 - wave) * 5, 2));
        const band = (Math.sin(nx * 29 + ny * 17 + time * .23) + Math.cos(nx * 11 - ny * 23 - time * .31) + 2) / 4;
        const strength = ridge * band;
        const grain = (Math.sin(x * 127.1 + y * 311.7) * 43758.5453) % 1;
        if (strength < .14 || grain < -.50) continue;
        const index = Math.min(glyphs.length - 1, Math.floor(strength * (glyphs.length - 1)));
        const alpha = .1 + strength * .4;
        ctx.fillStyle = `rgba(183,218,131,${alpha})`;
        ctx.fillText(glyphs.charAt(index), x * gap, y * 15);
      }
    }
  };

  const resize = (): void => {
    const box = hero.getBoundingClientRect();
    width = box.width;
    height = box.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paint();
  };

  function tick(stamp: number): void {
    frame = 0;
    if (reduce.matches || document.hidden || !inView || stamp >= stopAt) return;
    if (stamp - last >= 80) {
      time += .08;
      paint();
      last = stamp;
    }
    frame = requestAnimationFrame(tick);
  }

  function sync(): void {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    if (!reduce.matches && !document.hidden && inView && performance.now() < stopAt) {
      frame = requestAnimationFrame(tick);
    }
  }

  const onMotionChange = () => {
    sync();
    paint();
  };
  reduce.addEventListener('change', onMotionChange);
  document.addEventListener('visibilitychange', sync);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(hero);
  const intersectionObserver = new IntersectionObserver(entries => {
    const entry = entries[0];
    if (!entry) return;
    inView = entry.isIntersecting;
    sync();
  }, { threshold: 0 });
  intersectionObserver.observe(hero);
  resize();
  sync();
  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    reduce.removeEventListener('change', onMotionChange);
    document.removeEventListener('visibilitychange', sync);
  };
}

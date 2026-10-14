import { expect, test } from "bun:test";
import { startAsciiField } from "../src/ascii";

test("animation continues beyond five seconds, pauses, resumes, and respects reduced motion", () => {
  let callback: FrameRequestCallback | undefined;
  let paints = 0;
  const attributes = new Map<string, string>();
  const button = Object.assign(new EventTarget(), {
    disabled: false,
    setAttribute: (name: string, value: string) => attributes.set(name, value),
  });
  const media = Object.assign(new EventTarget(), { matches: false });
  const context = { clearRect: () => paints++, setTransform() {}, fillText() {}, fillStyle: '' };
  const canvas = {
    getContext: () => context,
    parentElement: { getBoundingClientRect: () => ({ width: 24, height: 30 }) },
  };
  class Observer { observe() {} disconnect() {} }
  const globals = {
    getComputedStyle: () => ({ color: 'rgb(183, 218, 131)' }),
    document: Object.assign(new EventTarget(), { hidden: false }),
    matchMedia: () => media,
    devicePixelRatio: 1,
    requestAnimationFrame: (next: FrameRequestCallback) => { callback = next; return 1; },
    cancelAnimationFrame: () => { callback = undefined; },
    ResizeObserver: Observer,
    IntersectionObserver: Observer,
  };
  const originals = Object.keys(globals).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)] as const);
  Object.assign(globalThis, globals);
  let cleanup: (() => void) | undefined;
  try {
    cleanup = startAsciiField(canvas as unknown as HTMLCanvasElement, button as unknown as HTMLButtonElement);
    const afterFiveSeconds = performance.now() + 6000;
    callback?.(afterFiveSeconds);
    expect(paints).toBe(2);
    expect(callback).toBeDefined();
    button.dispatchEvent(new Event("click"));
    expect(callback).toBeUndefined();
    expect(attributes.get("aria-label")).toBe("Play animation");
    button.dispatchEvent(new Event("click"));
    callback?.(afterFiveSeconds + 100);
    expect(paints).toBe(3);
    expect(attributes.get("aria-label")).toBe("Pause animation");
    media.matches = true;
    media.dispatchEvent(new Event("change"));
    expect(callback).toBeUndefined();
    expect(button.disabled).toBe(true);
    media.matches = false;
    media.dispatchEvent(new Event("change"));
    expect(callback).toBeDefined();
    expect(button.disabled).toBe(false);
  } finally {
    cleanup?.();
    for (const [key, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  }
});

// Logger adapter for the vendored Cubism renderer; no widget auto-loader.
export const l = {
  error: (...args) => console.error("[Live2D]", ...args),
  warn: (...args) => console.warn("[Live2D]", ...args),
  info: (...args) => console.info("[Live2D]", ...args),
  trace: () => {},
};

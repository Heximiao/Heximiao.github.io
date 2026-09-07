// This iframe lives outside Swup's <main> replacement boundary.
import { AppDelegate } from "./chunk/index2.js";

// A document identifier makes accidental remounts visible during navigation QA.
document.documentElement.dataset.live2dInstance = crypto.randomUUID();

class Companion extends AppDelegate {
  // Idle animation only. The vendor's document-wide mouse handlers access
  // models before asynchronous loading completes and must not be installed.
  initializeEventListener() {}
  releaseEventListener() {}
}

let app;
let running = false;
let failed = false;

function stop() {
  app?.stop();
  running = false;
}

function fail(error) {
  failed = true;
  stop();
  document.getElementById("live2d").style.display = "none";
  const message = document.getElementById("error");
  message.textContent = "看板娘暂时无法加载，可关闭后重新打开。";
  message.hidden = false;
  console.error("[Live2D companion]", error);
}

function resume() {
  if (!app || running || failed || document.hidden) return;
  running = true;
  try { app.run(); } catch (error) { fail(error); }
}

window.addEventListener("error", event => fail(event.error || event.message));
window.addEventListener("unhandledrejection", event => fail(event.reason));
document.addEventListener("visibilitychange", () => document.hidden ? stop() : resume());
window.addEventListener("pagehide", stop);
window.addEventListener("pageshow", resume);
document.getElementById("live2d").addEventListener("webglcontextlost", () => fail("WebGL context lost"));

try {
  const model = new URL(new URLSearchParams(location.search).get("model"), location.href);
  if (model.origin !== location.origin || !model.pathname.startsWith("/pio/models/")) {
    throw new Error("Expected a local Live2D model");
  }
  const response = await fetch(model);
  if (!response.ok) throw new Error(`Model HTTP ${response.status}`);
  const config = await response.json();
  if (config.Version !== 3 || !config.FileReferences?.Moc) {
    throw new Error("This companion requires a Cubism 3+ model manifest");
  }
  app = new Companion();
  app.initialize();
  app.changeModel(model.href);
  resume();
} catch (error) {
  fail(error);
}

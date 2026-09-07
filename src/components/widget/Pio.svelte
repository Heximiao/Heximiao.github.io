<script lang="ts">
  import { onMount, tick } from "svelte";
  import { pioConfig } from "@/config";

  const storageKey = "mizuki-companion-settings-v2";
  const source = `/live2d-widget/frame.html?model=${encodeURIComponent(pioConfig.models[0])}`;
  let visible = false;
  let closed = false;
  let settingsOpen = false;
  let tracking = true;
  let scale = 1.3;
  let offsetX = 0;
  let offsetY = 0;
  let viewportWidth = 1920;
  let viewportHeight = 1080;
  let frame: HTMLIFrameElement;
  let companion: HTMLElement;
  let drag: { x: number; y: number; offsetX: number; offsetY: number } | null = null;
  $: fit = Math.min(scale, (viewportWidth - 320) / ((pioConfig.width || 392) * 0.6), Math.max(100, viewportHeight - 24) / (pioConfig.height || 350));
  $: width = Math.round((pioConfig.width || 392) * fit);
  $: height = Math.round((pioConfig.height || 350) * fit);

  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify({ scale, tracking, offsetX, offsetY, closed })); } catch { /* Storage may be unavailable. */ }
  }

  async function clampPosition() {
    await tick();
    if (!companion) return;
    const rect = companion.getBoundingClientRect();
    offsetX += Math.max(0, -rect.left) - Math.max(0, rect.right - viewportWidth);
    offsetY += Math.max(0, 12 - rect.top) - Math.max(0, rect.bottom - viewportHeight);
  }

  function sendGaze(x: number, y: number) {
    frame?.contentWindow?.postMessage({ type: "mizuki-companion:gaze", x, y }, location.origin);
  }

  onMount(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved) {
        if (Number.isFinite(saved.scale)) scale = Math.min(1.6, Math.max(0.6, saved.scale));
        if (typeof saved.tracking === "boolean") tracking = saved.tracking;
        if (typeof saved.closed === "boolean") closed = saved.closed;
        if (Number.isFinite(saved.offsetX)) offsetX = saved.offsetX;
        if (Number.isFinite(saved.offsetY)) offsetY = saved.offsetY;
      }
    } catch { /* Ignore invalid or unavailable saved settings. */ }
    // Match the site's customized md/lg desktop breakpoint in tailwind.config.cjs.
    const media = window.matchMedia("(width < 1280px)");
    const update = () => {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      visible = pioConfig.enable && !(pioConfig.hiddenOnMobile && media.matches);
      void clampPosition();
    };
    let pending = 0;
    const move = (event: PointerEvent) => {
      if (!tracking || closed || !visible || drag || event.pointerType === "touch") return;
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(() => {
        if (!frame) return;
        const rect = frame.getBoundingClientRect();
        sendGaze(Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / (rect.width / 2))),
          Math.max(-1, Math.min(1, (rect.top + rect.height * 0.35 - event.clientY) / (rect.height / 2))));
      });
    };
    const resetGaze = () => { cancelAnimationFrame(pending); sendGaze(0, 0); };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", resetGaze);
    document.documentElement.addEventListener("pointerleave", resetGaze);
    return () => {
      cancelAnimationFrame(pending);
      window.removeEventListener("resize", update);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", resetGaze);
      document.documentElement.removeEventListener("pointerleave", resetGaze);
    };
  });

  function startDrag(event: PointerEvent) {
    if (pioConfig.mode !== "draggable" || event.button !== 0) return;
    drag = { x: event.clientX, y: event.clientY, offsetX, offsetY };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }
  function moveDrag(event: PointerEvent) {
    if (!drag) return;
    offsetX = drag.offsetX + event.clientX - drag.x;
    offsetY = drag.offsetY + event.clientY - drag.y;
    void clampPosition();
  }
  async function finishDrag() { drag = null; await clampPosition(); save(); }
  async function resize(value: number) { scale = Math.min(1.6, Math.max(0.6, value)); await clampPosition(); save(); }
  async function reset() {
    scale = 1.3; tracking = true; offsetX = 0; offsetY = 0;
    await clampPosition(); save();
  }
  async function toggleClosed() {
    closed = !closed; settingsOpen = false;
    await clampPosition(); save();
  }
</script>


<svelte:window onkeydown={(event) => { if (event.key === "Escape") settingsOpen = false; }} />
{#if visible}
  {#if !closed}
    <aside bind:this={companion} class="live2d-companion" class:right={pioConfig.position === "right"}
      style:width={width * 0.6 + 'px'} style:transform={'translate(' + offsetX + 'px, ' + offsetY + 'px)'} aria-label="看板娘">
      <iframe bind:this={frame} title="Live2D 看板娘" src={source} {width} {height} style:margin-left={-width * 0.2 + 'px'}></iframe>
    </aside>
  {/if}
  <div class="companion-tools">
    {#if settingsOpen && !closed}
      <section class="settings" aria-label="看板娘设置面板">
        <div class="panel-heading"><strong>看板娘</strong><button aria-label="关闭看板娘设置" onclick={() => settingsOpen = false}>×</button></div>
        <label for="companion-scale">显示大小 <output>{Math.round(scale * 100)}%</output></label>
        <div class="scale-row">
          <button aria-label="缩小看板娘" disabled={scale <= 0.6} onclick={() => resize(scale - 0.1)}>−</button>
          <input id="companion-scale" type="range" min="60" max="160" step="5" value={Math.round(scale * 100)} oninput={(event) => resize(Number(event.currentTarget.value) / 100)} />
          <button aria-label="放大看板娘" disabled={scale >= 1.6} onclick={() => resize(scale + 0.1)}>+</button>
        </div>
        <label class="tracking"><span>目光跟随鼠标</span><input type="checkbox" checked={tracking} onchange={(event) => { tracking = event.currentTarget.checked; sendGaze(0, 0); save(); }} /></label>
        <div class="actions">
          {#if pioConfig.mode === "draggable"}
            <button class="drag-handle" title="按住并拖动，调整人物位置" onpointerdown={startDrag} onpointermove={moveDrag} onpointerup={finishDrag} onpointercancel={finishDrag}>✥ 移动人物</button>
          {/if}
          <button onclick={reset}>恢复默认</button>
        </div>
        <button class="hide" onclick={toggleClosed}>隐藏看板娘</button>
      </section>
    {/if}
    <button class="settings-trigger" aria-label={closed ? "显示看板娘" : "看板娘设置"} aria-expanded={settingsOpen} onclick={() => closed ? toggleClosed() : settingsOpen = !settingsOpen}>⚙ <span>{closed ? "显示看板娘" : "看板娘"}</span></button>
  </div>
{/if}
<style>
  .live2d-companion { position: fixed; left: 0; bottom: 0; z-index: 40; pointer-events: none; }
  .live2d-companion.right { left: auto; right: 0; }
  iframe { display: block; border: 0; background: transparent; pointer-events: none; max-width: none; }
  .companion-tools { position: fixed; right: 16px; bottom: 16px; z-index: 41; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
  button { border-radius: 10px; min-width: 32px; min-height: 32px; padding: 6px 10px; background: var(--card-bg, #fff); color: var(--primary, #555); cursor: pointer; }
  button:hover { background: var(--btn-regular-bg, #eaf6fb); }
  button:focus-visible, input:focus-visible { outline: 2px solid var(--primary, #777); outline-offset: 3px; }
  button:disabled { opacity: 0.4; cursor: default; }
  .settings-trigger { display: flex; align-items: center; gap: 8px; border-radius: 24px; padding: 10px 16px; box-shadow: 0 2px 12px #0002; font-size: 13px; }
  .settings { box-sizing: border-box; width: 264px; max-width: calc(100vw - 32px); max-height: calc(100dvh - 88px); overflow-y: auto; padding: 18px; border-radius: 20px; background: var(--card-bg, #fff); color: var(--primary, #555); box-shadow: 0 6px 28px #0002; font-size: 14px; }
  .panel-heading { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
  .settings label { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
  output { font-variant-numeric: tabular-nums; }
  .scale-row { display: flex; align-items: center; gap: 10px; margin: 12px 0 18px; }
  .scale-row input { width: 100%; min-width: 0; accent-color: var(--primary, #777); }
  .tracking input { accent-color: var(--primary, #777); width: 17px; height: 17px; }
  .actions { display: flex; gap: 8px; margin-top: 18px; }
  .actions button { flex: 1; font-size: 12px; background: var(--btn-regular-bg, #eaf6fb); }
  .drag-handle { touch-action: none; cursor: grab; }
  .drag-handle:active { cursor: grabbing; }
  .hide { width: 100%; margin-top: 10px; font-size: 12px; }
</style>

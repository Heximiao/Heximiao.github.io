<script lang="ts">
  import { onMount } from "svelte";
  import { pioConfig } from "@/config";

  let visible = false;
  let closed = false;
  let offsetX = 0;
  let offsetY = 0;
  let drag: { x: number; y: number; offsetX: number; offsetY: number } | null = null;
  const source = `/live2d-widget/frame.html?model=${encodeURIComponent(pioConfig.models[0])}`;

  onMount(() => {
    const media = window.matchMedia("(max-width: 1280px)");
    const update = () => {
      visible = pioConfig.enable && !(pioConfig.hiddenOnMobile && media.matches);
      offsetX = 0;
      offsetY = 0;
    };
    update();
    media.addEventListener("change", update);
    // Unmounting the iframe releases its animation, timers and WebGL context.
    return () => media.removeEventListener("change", update);
  });

  function startDrag(event: PointerEvent) {
    if (pioConfig.mode !== "draggable") return;
    drag = { x: event.clientX, y: event.clientY, offsetX, offsetY };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  function moveDrag(event: PointerEvent) {
    if (!drag) return;
    offsetX = drag.offsetX + event.clientX - drag.x;
    offsetY = drag.offsetY + event.clientY - drag.y;
  }
</script>

{#if visible}
  <aside class="live2d-companion" class:right={pioConfig.position === "right"}
    style:transform={`translate(${offsetX}px, ${offsetY}px)`} aria-label="看板娘">
    {#if closed}
      <button onclick={() => closed = false}>显示看板娘</button>
    {:else}
      <div class="controls">
        {#if pioConfig.mode === "draggable"}
          <button class="drag-handle" aria-label="拖动看板娘" title="拖动调整位置"
            onpointerdown={startDrag} onpointermove={moveDrag}
            onpointerup={() => drag = null} onpointercancel={() => drag = null}>✥</button>
        {/if}
        <button aria-label="隐藏看板娘" title="隐藏看板娘" onclick={() => closed = true}>×</button>
      </div>
      <iframe title="Live2D 看板娘" src={source}
        width={pioConfig.width || 280} height={pioConfig.height || 250}></iframe>
    {/if}
  </aside>
{/if}

<style>
  .live2d-companion { position: fixed; left: 12px; bottom: 12px; z-index: 40; }
  .live2d-companion.right { left: auto; right: 12px; }
  iframe { display: block; border: 0; background: transparent; max-width: calc(100vw - 24px); }
  .controls { display: flex; justify-content: flex-end; gap: 6px; }
  button { border-radius: 12px; padding: 4px 10px; background: var(--card-bg, #fff); color: var(--primary, #555); box-shadow: 0 1px 6px #0002; }
  .drag-handle { touch-action: none; cursor: grab; }
  .drag-handle:active { cursor: grabbing; }
</style>

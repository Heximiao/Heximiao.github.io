# Local Live2D companion

`frame.html` loads the local Cubism Core and the Cubism 3+ renderer from
stevenjoezhang/live2d-widget (`chunk/index2.js`). The renderer's integration
changes replace its widget logger import with `logger.js` and remove the four
drag-driven head/body angle additions from model update, retaining the smoothed
eye-ball X/Y updates. Idle animation and breathing remain unchanged. Retain the vendor
license headers. Core is from:
https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js

`src/components/widget/Pio.svelte` hosts this iframe outside Swup's `main`
container. Internal navigation retains the same iframe, canvas and render loop.
Hiding the companion or switching to the mobile breakpoint removes the iframe;
the browser then discards its runtime and WebGL context. Hidden tabs pause the
render loop. There are no global Image or pointer-event patches in the blog.

Configuration remains in `pioConfig` in `src/config.ts`. The first `models` entry
must point to a local Cubism 3+ manifest (`Version: 3`, `FileReferences.Moc`).
The default is `/pio/models/model/anzu/index.json`. Existing model assets are
preserved; the old Cubism 2/Pio auto-loaders have been removed.

The companion defaults to 130% of the 392 × 350 base canvas at the bottom-left.
Its transparent horizontal margins are offset to bring the character closer to
the left edge. A separate bottom-right settings launcher opens a fixed panel
with dragging, 60–160% scaling, hiding, gaze tracking and reset controls. Canvas
size adapts to short/narrow windows while keeping room for the settings panel.
Preferences use the v2 localStorage key to apply the revised defaults once.
Pointer coordinates are normalized and sent from the parent once per animation
frame; the iframe validates the origin/source and uses only the guarded onDrag
API, avoiding the vendor's load-sensitive hover/tap handlers. The canvas passes
clicks through to the page. Screens below 1280px hide the companion and its
settings by default, matching the site's customized desktop breakpoint.
Legacy Pio dialogue/model-switch settings are not used by this renderer.

Regression checks: desktop navigation between home, projects, skills, timeline
and posts; browser back/forward; hide/restore; mobile breakpoint; invalid model
path. Model errors must stay inside the iframe and never interrupt navigation.

# Local Live2D companion

`frame.html` loads the local Cubism Core and the Cubism 3+ renderer from
stevenjoezhang/live2d-widget (`chunk/index2.js`). The renderer's only integration
change is replacing its widget logger import with `logger.js`; retain the vendor
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

The companion supports idle animation, dragging with its handle, hiding and
restoring. Legacy Pio dialogue/model-switch settings are not used by this renderer.

Regression checks: desktop navigation between home, projects, skills, timeline
and posts; browser back/forward; hide/restore; mobile breakpoint; invalid model
path. Model errors must stay inside the iframe and never interrupt navigation.

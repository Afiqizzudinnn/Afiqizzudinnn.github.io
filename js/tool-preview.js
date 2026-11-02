/**
 * A screenshot that floats after the mouse over the tool list, swapping to the hovered tool.
 * Mouse only; touch screens show the screenshots inside the list instead (see style.css).
 */

const FOLLOW_EASE = 0.15;     // share of the remaining distance covered each frame
const SETTLE_PX = 0.5;

export function initToolPreview(list, preview) {
  if (!list || !preview || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const image = preview.querySelector('.tool-preview__img');
  const rows = [...list.querySelectorAll('.tool-row')];
  const target = { x: 0, y: 0 };
  const position = { x: 0, y: 0 };
  let hovering = false;
  let animating = false;

  // Load the screenshots shortly before the list scrolls into view.
  const preloadObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    rows.forEach((row) => { new Image().src = row.dataset.preview; });
    preloadObserver.disconnect();
  }, { rootMargin: '400px 0px' });
  preloadObserver.observe(list);

  const frame = () => {
    position.x += (target.x - position.x) * FOLLOW_EASE;
    position.y += (target.y - position.y) * FOLLOW_EASE;
    preview.style.setProperty('--x', `${position.x}px`);
    preview.style.setProperty('--y', `${position.y}px`);
    const moving = Math.abs(target.x - position.x) > SETTLE_PX || Math.abs(target.y - position.y) > SETTLE_PX;
    if (hovering || moving) requestAnimationFrame(frame);
    else animating = false;
  };

  const animate = () => {
    if (animating) return;
    animating = true;
    requestAnimationFrame(frame);
  };

  list.addEventListener('mouseenter', (event) => {
    hovering = true;
    // Start at the cursor instead of flying in from the corner.
    position.x = target.x = event.clientX;
    position.y = target.y = event.clientY;
    preview.classList.add('is-active');
    animate();
  });

  list.addEventListener('mousemove', (event) => {
    target.x = event.clientX;
    target.y = event.clientY;
    animate();
  });

  list.addEventListener('mouseleave', () => {
    hovering = false;
    preview.classList.remove('is-active');
  });

  rows.forEach((row) => row.addEventListener('mouseenter', () => {
    if (image.getAttribute('src') !== row.dataset.preview) image.src = row.dataset.preview;
  }));
}

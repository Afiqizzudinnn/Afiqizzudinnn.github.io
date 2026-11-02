/**
 * The giant name in the hero. It drifts on its own, follows the direction you scroll,
 * and speeds up while the page is moving. Pauses when the hero is off screen.
 */

const BASE_SPEED = 0.6;       // pixels per frame
const SCROLL_BOOST = 0.25;    // extra speed per pixel of scroll velocity
const MAX_BOOST = 14;
const BOOST_DECAY = 0.92;

/**
 * @param {HTMLElement} track  holds identical copies of the name, side by side
 * @param {{ onScroll: Function }} scroller
 */
export function initMarquee(track, scroller, { reduceMotion }) {
  if (!track || reduceMotion) return;

  const original = track.firstElementChild;
  let copyWidth = 0;

  // Measure one copy and add enough copies to cover the screen while one scrolls out of view.
  // Runs again once the web font has loaded and on resize, because both change the width.
  const measure = () => {
    copyWidth = original.offsetWidth;
    while (track.children.length * copyWidth < window.innerWidth + copyWidth * 2) {
      track.append(original.cloneNode(true));
    }
  };
  measure();
  document.fonts?.ready.then(measure);
  window.addEventListener('resize', measure);

  let x = 0;
  let direction = -1;
  let boost = 0;
  let visible = true;

  scroller.onScroll(({ velocity }) => {
    if (velocity !== 0) direction = velocity > 0 ? -1 : 1;
    boost = Math.min(Math.abs(velocity) * SCROLL_BOOST, MAX_BOOST);
  });

  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(track);

  const frame = () => {
    if (visible) {
      x += (BASE_SPEED + boost) * direction;
      // Wrap by exactly one copy so the loop is seamless.
      if (x <= -copyWidth) x += copyWidth;
      if (x > 0) x -= copyWidth;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      boost *= BOOST_DECAY;
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

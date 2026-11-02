/** Kuala Lumpur local time for the footer, refreshed every 30 seconds. */

const REFRESH_MS = 30_000;

const formatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZone: 'Asia/Kuala_Lumpur',
});

export function initClock(element) {
  if (!element) return;
  const tick = () => { element.textContent = `${formatter.format(new Date())} MYT`; };
  tick();
  setInterval(tick, REFRESH_MS);
}

/**
 * The intro: greetings in the main languages of Malaysia, then the curtain lifts.
 * intro-check.js decides before the first paint whether it plays at all.
 */

const GREETINGS = ['Hello', 'Hai', '你好', 'வணக்கம்', 'Selamat datang'];
const FIRST_WORD_MS = 650;
const WORD_MS = 190;
const LAST_WORD_MS = 650;
const LIFT_MS = 900;

/**
 * @param {HTMLElement} preloader
 * @param {{ stop: () => void, start: () => void }} scroller
 */
export function playIntro(preloader, scroller) {
  const root = document.documentElement;
  if (!preloader || !root.classList.contains('is-intro')) return;

  scroller.stop();
  const word = preloader.querySelector('#preloader-word');
  let index = 0;

  const finish = () => {
    preloader.classList.add('is-leaving');
    try {
      window.sessionStorage.setItem('intro-seen', '1');
    } catch {
      // Storage blocked: the intro will simply play again next time.
    }
    setTimeout(() => {
      root.classList.remove('is-intro');
      scroller.start();
    }, LIFT_MS);
  };

  const showNext = () => {
    index++;
    if (index >= GREETINGS.length) {
      finish();
      return;
    }
    word.textContent = GREETINGS[index];
    setTimeout(showNext, index === GREETINGS.length - 1 ? LAST_WORD_MS : WORD_MS);
  };

  setTimeout(showNext, FIRST_WORD_MS);
}

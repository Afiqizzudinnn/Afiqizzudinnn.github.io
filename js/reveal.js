/**
 * Scroll reveals.
 *   [data-reveal="words"]  the text rises into view word by word
 *   [data-reveal="up"]     the block fades up
 * Content is only hidden after this module runs, so the page stays readable if scripts fail.
 */

const WORD_CLASS = 'word';
const WORD_INNER_CLASS = 'word__inner';

/** Wraps every word in two spans (a mask and the moving word), keeping inline tags like <em>. */
function splitIntoWords(element) {
  let index = 0;

  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
        return;
      }
      if (child.nodeType !== Node.TEXT_NODE) return;

      const fragment = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.append(document.createTextNode(part));
          return;
        }
        const mask = document.createElement('span');
        mask.className = WORD_CLASS;
        const word = document.createElement('span');
        word.className = WORD_INNER_CLASS;
        word.style.setProperty('--i', String(index++));
        word.textContent = part;
        mask.append(word);
        fragment.append(mask);
      });
      child.replaceWith(fragment);
    });
  };

  walk(element);
}

export function initReveal({ reduceMotion }) {
  const targets = [...document.querySelectorAll('[data-reveal]')];
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  targets.filter((el) => el.dataset.reveal === 'words').forEach(splitIntoWords);
  document.documentElement.classList.add('reveal-ready');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  targets.forEach((el) => observer.observe(el));
}

/**
 * Starts every part of the page. Each module does one thing and can be read on its own.
 */
import { initClock } from './clock.js';
import { initFooterCurve } from './footer-curve.js';
import { playIntro } from './preloader.js';
import { initReveal } from './reveal.js';
import { initSmoothScroll } from './smooth-scroll.js';
import { initToolPreview } from './tool-preview.js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scroller = initSmoothScroll({ enabled: !reduceMotion });
playIntro(document.querySelector('.preloader'), scroller);
initReveal({ reduceMotion });
initToolPreview(document.querySelector('.tool-list'), document.querySelector('.tool-preview'));
initFooterCurve(document.querySelector('.footer__curve'));
initClock(document.getElementById('local-time'));

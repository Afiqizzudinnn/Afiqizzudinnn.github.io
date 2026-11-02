# afiqizzudinnn.github.io

Portfolio of **Ahmad Afiq Izzudin**, Business Process & Automation Analyst in Kuala Lumpur.

**[Visit the site](https://afiqizzudinnn.github.io/)**

![The portfolio hero](assets/og.jpg)

## What is on the page

1. **Hero** with a moving name and a short intro.
2. **What I do**, in one sentence.
3. **Real impact** from automation projects at Worldline, each with the problem, what I did and the result.
4. **Tools I built**: [Data Cleaner](https://afiqizzudinnn.github.io/excel-data-cleaner/), [Report Merger](https://afiqizzudinnn.github.io/excel-report-merger/) and [ROI Calculator](https://afiqizzudinnn.github.io/automation-roi-calculator/), all free and open source.
5. **Experience**, awards, education and skills.
6. **Contact**.

## How it is built

No framework, no build step and no server. Plain HTML, CSS and JavaScript modules, with [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling and [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) for type. Each script does one job:

```
index.html              page markup and content
css/style.css           all styles, with design tokens at the top
js/intro-check.js       decides before the first paint whether the intro plays
js/main.js              starts everything below
js/preloader.js         the "Hello, Hai, Selamat datang" intro
js/smooth-scroll.js     smooth scrolling and in-page links
js/marquee.js           the moving name in the hero
js/reveal.js            words and blocks that rise into view
js/tool-preview.js      the screenshot that follows the mouse over the tools
js/footer-curve.js      the curved edge above the footer
js/clock.js             Kuala Lumpur time in the footer
assets/                 photo, tool screenshots, social preview image, favicon
```

Motion respects the reduced motion setting, the intro plays once per visit, and every section reads fine without JavaScript.

## Run it locally

The scripts are JavaScript modules, so serve the folder with any local web server instead of double-clicking `index.html`:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Credits

The editorial layout is inspired by [Dennis Snellenberg](https://dennissnellenberg.com/). The code, copy and photography are original.

## License

The code is under the MIT License. The photos and written content are © Ahmad Afiq Izzudin, all rights reserved.

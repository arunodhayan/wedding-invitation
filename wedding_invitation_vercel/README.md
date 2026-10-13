# Wedding Invitation v54 — mobile navigation rebuilt

The first five invitation pages were collapsing on mobile because legacy CSS rules
with ID selectors overrode the 9:16 card aspect ratio. The previous standalone
scroll fixes did not remove those conflicting rules.

This version replaces the entire CSS and JavaScript, instead of appending another
patch. It uses six equal-size 9:16 cards in a single mobile scroll view.

1. Tap Open Invitation on the door.
2. The main invitation page appears first.
3. Swipe through Haldi, Sangeeth, Reception, Wedding, and Beegaru Oota.
4. Tap the printed venue text to open its Google link.

Kept: original artwork, the rose-petal door animation, Haldi petals, Sangeeth
music notes, Reception bulbs, Wedding flowers, and clickable venue links.
The wedding diya flicker and bell audio remain disabled.

To deploy to Vercel: upload the CONTENTS of the ZIP to your site's root, not the
ZIP or an extra containing folder. Replace index.html, style.css and script.js
as well as the assets folder. Clear any cached browser files when testing.

Test results (Chromium phone emulation, 390 × 844 and 412 × 915):
- Six sections present and equally tall (672px and 711px respectively).
- After opening the door, the main invitation is first; scrollTop stays 0.
- Inner page scrolls through Haldi and onward.
- Door and main invitation previews were visually inspected.

If an older deployed version persists, ensure Vercel serves the new style.css
and script.js. This package uses fresh ?v=54-verified asset URLs.

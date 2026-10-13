# Mobile-first wedding invitation — v53

Main fix: previous builds could reopen on the wrong page in mobile browsers.
This version keeps the document fixed and scrolls *inside* #story, which always
starts from its first (main invitation) card when the door opens.

Sequence:
1. Door opening (tap Open Invitation)
2. Main invitation
3. Haldi
4. Sangeeth
5. Reception
6. Wedding Ceremony (updated image without couple names)
7. Beegaru Oota

Other features retained: rose petals on door opening, event animations, venue
hotspots linked to Maps, same-size invitation cards, and no temple bell sound.

Upload the *contents* of this ZIP to your Vercel project root: index.html,
style.css, script.js, vercel.json, and assets/.

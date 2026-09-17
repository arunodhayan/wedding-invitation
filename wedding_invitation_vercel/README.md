# Digital Wedding Invitation

A lightweight interactive wedding invitation that can be deployed directly on Vercel.

## Features

- Animated envelope opening
- Scratch-to-reveal wedding date
- Reception and wedding date cards
- Google Maps venue button
- Live countdown
- Mobile-friendly layout
- Falling petal animation

## Dates

- Reception: 24 October 2026
- Wedding: 25 October 2026
- Venue: Nature Knots

## Deploy on Vercel

### Option 1 — Vercel website

1. Unzip this project.
2. Create a new GitHub repository and upload these files.
3. Go to Vercel.
4. Click **Add New → Project**.
5. Import your repository.
6. Framework preset: **Other**.
7. Build command: leave empty.
8. Output directory: leave empty.
9. Deploy.

### Option 2 — Vercel CLI

Install the CLI:

```bash
npm install -g vercel
```

Then run from this project folder:

```bash
vercel
```

For production:

```bash
vercel --prod
```

## Customize the couple names

Open `index.html` and replace:

```html
<div class="monogram">A ♥ S</div>
```

with your initials.

You can also add the names beneath:

```html
<h2 class="script-title">Arun & Sushmitha</h2>
```

instead of:

```html
<h2 class="script-title">We are getting married</h2>
```

## Customize time

If you know the wedding/reception times, add them to the event cards in `index.html`.

The countdown currently counts to midnight at the beginning of 25 October 2026 in India Standard Time.

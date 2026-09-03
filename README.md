# Marco & Nadeen Wedding Invitation

**Couple:** Marco & Nadeen
**Full Names:** Marco Atef & Nadeen Assem
**Wedding Date:** October 11, 2026
**Church Ceremony:** 7:00 PM
**Reception:** El Qasr Hall — 8:00 PM

A premium, cinematic, single-page wedding invitation website. The site opens as a closed
invitation card with a satin ribbon and bow; tapping it plays a physical "opening" sequence
before revealing the full site.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript

No frameworks, no build step, no backend, no database. The site runs directly from `index.html`.

## Project Structure

```
WeddingInvitation/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   ├── bride.jpg
│   ├── groom.jpg
│   ├── gallery1.jpg
│   ├── gallery2.jpg
│   ├── gallery3.jpg
│   ├── gallery4.jpg
│   ├── noise.png        (subtle paper-grain texture used site-wide)
│   ├── music.mp3         (add your own — see "Add music" below)
│   └── icons/            (reserved for custom icon assets; current icons are inline SVG)
│
└── README.md
```

## Run locally

No build tools required.

- **Easiest:** double-click `index.html` to open it in your browser.
- **Recommended** (so relative paths and `fetch`-based features behave exactly like production):
  ```bash
  cd WeddingInvitation
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```
  Any static server works (VS Code "Live Server", `npx serve`, etc.).

## Replace the photos

Drop new files into `assets/` using the **same filenames** so nothing else needs to change:

| File | Used for |
|---|---|
| `assets/groom.jpg` | Groom's portrait in "The Couple" |
| `assets/bride.jpg` | Bride's portrait in "The Couple" |
| `assets/gallery1.jpg` – `gallery4.jpg` | "Our Moments" gallery |

The gallery currently ships with 4 photos in an asymmetric layout. To add photos 5 and 6, add
new `<figure class="gallery-item">` blocks in `index.html` (inside `#gallery .gallery-grid`) and
extend the `.gallery-grid` rules in `style.css` if you want a different composition.

Portraits use `object-fit: cover`, so any reasonably centered photo will crop nicely into the
circular frame — no need to pre-crop to a perfect square.

## Add music

Add your own royalty-cleared track as `assets/music.mp3`. The floating music button in the
bottom-left corner will start working automatically — no autoplay, the visitor must tap it. If
`music.mp3` is missing, the button hides itself automatically so nothing looks broken.

## Update wedding details

- **Names / date / times / venue:** search `index.html` for the relevant text — all copy is
  plain HTML, no templating.
- **Countdown target:** edit the `WEDDING_DATE` constant near the top of `script.js`
  (`'2026-10-11T19:00:00'`).
- **RSVP number / message:** edit `WHATSAPP_NUMBER` and `WHATSAPP_MESSAGE` in `script.js`.

## Deploy to GitHub

```bash
cd WeddingInvitation
git init
git add .
git commit -m "Marco & Nadeen wedding invitation"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Deploy to Vercel

1. Push the repo to GitHub (above).
2. In Vercel, click **New Project** and import the repository.
3. Framework preset: **Other** (static site) — leave build command and output directory blank.
4. Deploy. No environment variables are needed.

You can also deploy without git using the Vercel CLI from inside the project folder:

```bash
npx vercel
```

## Notes

- Fully responsive, mobile-first; tested down to a 375px-wide viewport with no horizontal scroll.
- Respects `prefers-reduced-motion` — the opening and scroll animations simplify to a quick
  fade for visitors who have that setting on.
- Countdown, scroll reveals, music toggle, and the RSVP button are all vanilla JavaScript —
  see `script.js` for the full list of functions (`initInvitation`, `openInvitation`,
  `startCountdown`, `initScrollReveal`, `initMusicPlayer`, `acceptInvitation`, `initNavigation`).

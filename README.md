# Harrison Blizzard — lab portfolio

A single-page site: your name, a one-line intro, and a grid of every lab.
Each tile shows a live thumbnail of the lab's first PDF page (rendered in the
browser with pdf.js — no separate image files to generate). Clicking a tile
opens the PDF in an in-page viewer with a close button, so you can exit and
open another without leaving the page. There's also an "Open in new tab" link
inside the viewer for anyone whose browser won't display embedded PDFs (this
mostly affects some mobile browsers).

This is currently set up with **placeholder sample PDFs for your seven real
labs** (Fortinet VPN, Fortinet Firewall AP, Fortinet SOHO Configuration, Palo
Alto VPN, URL Filtering, Palo Alto SOHO Configuration, and Palo Alto PA-220
Initial Wipe / Password Reset). Each placeholder just has the lab title on a
blank page — swap in your real write-up PDF (same filename) whenever it's
ready, and the thumbnail and viewer update automatically.

## File structure

```
lab-portfolio/
  index.html              ← page structure (header + grid + viewer modal)
  assets/
    styles.css              ← all styling
    script.js                ← lab list, thumbnail rendering, viewer logic
    pdfs/
      fortinet-vpn-lab.pdf
      fortinet-firewall-ap-lab.pdf
      fortinet-soho-configuration-lab.pdf
      paloalto-vpn-lab.pdf
      url-filtering-lab.pdf
      paloalto-soho-configuration-lab.pdf
      paloalto-pa220-initial-wipe-password-reset-lab.pdf
```

## Adding your real labs

1. Drop your PDF into `assets/pdfs/`.
2. Open `assets/script.js` and find the `labs` array near the top.
3. Either edit an existing entry or add a new one:

```js
{ title: "Cisco ASA Site-to-Site VPN Lab", date: "2026-05-01", file: "assets/pdfs/cisco-asa-vpn-lab.pdf" }
```

That's the only file you need to touch to add, rename, reorder, or remove a
lab — the thumbnail and the viewer are generated automatically from this
list.

## Hosting on GitHub Pages

1. Create a GitHub repository (e.g. `lab-portfolio`) and push these files to
   the root.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch**,
   pick `main` and `/ (root)`, then save.
4. GitHub gives you a URL like `https://yourusername.github.io/lab-portfolio/`
   within a minute or two.

No build step — it's plain HTML/CSS/JS plus the pdf.js library loaded from a
CDN, so this works as-is once pushed.

## A note on PDF size

Thumbnails are rendered from the actual PDF in-browser, so very large PDFs
(lots of high-resolution screenshots) will take a moment longer to generate a
thumbnail and to open in the viewer. If a write-up has a lot of screenshots,
exporting it from Word at a standard (not maximum) image quality keeps things
snappy.

## Once you send your real write-ups

Save each one as a PDF (Word's "Save As → PDF" or "Export" works fine),
send them over, and I'll drop them into `assets/pdfs/` and update the `labs`
list in `assets/script.js` with the real titles and dates.

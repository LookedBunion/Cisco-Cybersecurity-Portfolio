# Lab portfolio

A clean, generic static site for showcasing CCNP and cybersecurity lab
write-ups: a hero with completion stats, two sections of lab cards (CCNP and
cybersecurity), each linking to a detail page with the full report.

This is a **design draft** — `index.html` has sample/placeholder lab cards,
and only one example detail page (`labs/L-101.html`) exists so far. Once the
look is approved, send over your Word write-ups and we'll convert each one
into its own page and wire up the real cards.

## File structure

```
lab-portfolio/
  index.html          ← homepage: hero + CCNP cards + security cards
  assets/
    styles.css         ← all styling, one file
  labs/
    L-101.html          ← example lab detail page (CCNP)
```

## Hosting on GitHub Pages

1. Create a new GitHub repository (e.g. `lab-portfolio`).
2. Push these files to the repository root (or to a `docs/` folder — your choice).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set Source to **Deploy from a branch**, pick
   `main` and `/ (root)` (or `/docs` if you used that folder), then save.
5. GitHub gives you a URL like `https://yourusername.github.io/lab-portfolio/`
   within a minute or two.

No build step, no dependencies — it's plain HTML/CSS, so this just works.

## Adding a new lab

1. Copy `labs/L-101.html` to a new file, e.g. `labs/L-105.html`.
2. Update the `<title>`, the `<h1>`, and the meta table (topic, date, tools,
   status).
3. Replace each section's placeholder text with your write-up content:
   - **Objective** — what the lab demonstrates
   - **Topology** — swap the placeholder image for your real diagram
   - **Configuration** — paste CLI config into the `<pre><code>` block
   - **Verification** — paste `show` command output into another `<pre><code>` block
   - **Reflection** — what you learned, what tripped you up
4. Add a new card to the matching grid in `index.html`, linking to your new
   file, with a title, topic, date, and status badge (`done`, `progress`, or
   `planned`).

## A note on images

Drop topology diagrams and screenshots into an `assets/images/` folder and
reference them with a relative path, e.g. `<img src="../assets/images/L-105-topo.png">`.
Keep them reasonably compressed (a screenshot doesn't need to be a 6 MB PNG) so
the site stays fast.

## Once you send your Word documents

For each lab write-up, I'll need to know roughly:
- which track it belongs to (CCNP or cybersecurity)
- a short topic label and the date completed
- whether it's fully complete or still in progress

I'll pull the structure, configs, and any images straight out of the Word
docs and lay them into pages matching this same format, then add the rows to
the homepage tables.

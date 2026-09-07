# WI2026 Coding Agent Evaluation

Conference landing page for the WI2026 Student Challenge project **“Multidimensionale Evaluation LLM-basierter Coding-Agenten”** by Chris David Kaufmann, Luca di Siro, Daniel Ertel and Richard Beser (DHBW Mosbach).

## Purpose

The site acts as the QR-code destination at the conference stand. It presents the central research takeaway in a mobile-first format and provides direct access to the paper and poster.

## Run locally

No build step is required.

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## Deploy with GitHub Pages

This repository is GitHub Pages ready. All website paths are relative and `.nojekyll` is included.

1. Open **Settings → Pages** in the GitHub repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/(root)**.
4. Save.

The project URL will be:

`https://danibanispanani.github.io/wi2026-coding-agent-evaluation/`

GitHub Pages is a good fit because this is a fully static site with no server or build process.

## Deploy to Vercel

The same repository can also be deployed on Vercel:

1. Import this GitHub repository in Vercel.
2. Choose **Other** as framework preset if Vercel does not detect a framework.
3. Leave build command empty.
4. Leave output directory empty / use the repository root.
5. Deploy.

The included `vercel.json` adds clean URLs and conservative security headers.

## Files

- `index.html` — landing page
- `styles.css` — responsive visual design
- `script.js` — scorecard interaction + DE/EN toggle
- `public/paper.pdf` — research paper / extended abstract
- `public/poster.pdf` — WI2026 poster
- `public/*-preview.png` — page previews for the resource cards
- `.nojekyll` — ensures GitHub Pages serves the repository as a plain static site

## Conference deployment recommendation

Use one canonical URL in print. GitHub Pages can be the primary host or a stable backup while Vercel is used as the primary public URL. Test the final URL on mobile data before printing the QR code.

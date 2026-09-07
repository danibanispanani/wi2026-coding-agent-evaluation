# Deployment checklist

The site is fully static and can be hosted on **GitHub Pages** or **Vercel** from the same `main` branch.

## GitHub Pages

- Repository: `danibanispanani/wi2026-coding-agent-evaluation`
- Source: `main` branch
- Folder: `/(root)`
- Expected URL: `https://danibanispanani.github.io/wi2026-coding-agent-evaluation/`
- Build step: none

Enable it under **Repository → Settings → Pages → Build and deployment → Deploy from a branch → main / (root)**.

## Vercel

- Production branch: `main`
- Framework preset: `Other`
- Build command: none
- Output directory: repository root
- Node version: irrelevant (static site)

## Final conference checks

- Test the production URL on iPhone and Android over mobile data.
- Open both PDFs from the deployed site.
- Confirm the DE/EN toggle and all scorecard tabs work.
- Create the QR from one canonical production URL, not a preview deployment URL.
- Print one QR at least 35–40 mm wide for reliable scanning from the table/stand.
- Do not rename the repository after printing a GitHub Pages QR, because that changes the default project URL.

## Recommendation

For maximum resilience, keep GitHub Pages enabled as a zero-build backup even if Vercel is used as the primary QR destination.

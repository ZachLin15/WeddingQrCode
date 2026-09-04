# Wedding Guest Photo App — Agent Notes

Guest-facing Next.js app for a wedding (26.9.2026). Each table has a QR
code; scanning it opens `/t/{table}`, where guests take a photo in-browser
that gets uploaded to that table's own Google Drive folder via a separate
Google Apps Script backend (see `apps-script/`). `/print/cards` renders all
55 QR cards for printing.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4 (CSS-first config —
  palette and fonts are defined in `src/app/globals.css` under `@theme`,
  not `tailwind.config.ts`)
- No database. Photos go straight to Google Drive via the Apps Script Web
  App at `APPS_SCRIPT_URL` (server-only env var, proxied through
  `src/app/api/upload/route.ts`)

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build (also type-checks)
- `npm run lint` — ESLint

Run `npm run lint` and `npm run build` after changes before considering a
task done.

## Key files

- `src/lib/config.ts` — couple names, date, `TABLE_COUNT` (keep in sync
  with `apps-script/Code.gs` `MAX_TABLE` and `apps-script/Setup.gs`
  `SETUP_TABLE_COUNT` if this changes)
- `src/components/CameraCapture.tsx` — the in-app live camera flow
  (idle → live → preview → uploading → done/error)
- `src/components/motifs/` — decorative SVG motifs (Mickey ears/silhouette,
  florals, heart divider) matching the decor board's visual identity;
  keep to generic geometric shapes, not licensed Disney artwork
- `public/images/flowers/` — real flower photos cropped from the couple's
  decor PDF (background removed), used alongside the vector motifs
- `apps-script/` — source for the Google Apps Script backend, deployed
  manually via script.google.com (not part of the Next.js build/deploy)

## Conventions

- Mobile-first: this is used almost entirely on guests' phones. Check for
  horizontal overflow at 320px width after layout changes.
- Don't commit `.env.local` or any real `APPS_SCRIPT_URL` value.
- `public/qr/*.png` are committed (small, needed at runtime) — regenerate
  with `scripts/generate-qr-codes.mjs` if the production domain changes,
  and commit the result.

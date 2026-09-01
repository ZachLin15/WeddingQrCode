# Kah Yeong & Jia Xin — Wedding Photo Wall

A guest-facing web app for the 26.9.2026 wedding. Each table has a QR code
card; scanning it opens a themed page where guests can take a photo right in
the browser, which is saved straight into that table's own Google Drive
folder.

## How it fits together

- **This Next.js app** (deployed on Vercel) is the guest-facing website and
  the printable QR card generator.
- **Google Apps Script** (`apps-script/`, deployed separately, in your own
  Google account) is the backend that actually writes photos into Drive. See
  [`apps-script/README.md`](apps-script/README.md) for that setup.
- Nothing is stored in a database — every photo just becomes a file in your
  Drive, organized by table.

## Do these in order

### 1. Set up the Apps Script backend

Follow [`apps-script/README.md`](apps-script/README.md) end to end. At the end
you'll have a Web App URL ending in `/exec` — keep it handy.

### 2. Run this app locally (optional, to test first)

```bash
npm install
cp .env.example .env.local
```

Paste your Apps Script URL into `.env.local`:

```
APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```

```bash
npm run dev
```

Visit `http://localhost:3000/t/5` on your phone (same Wi-Fi, use your
computer's local IP instead of `localhost`) and try taking a photo — check
that it lands in the "Table 5" folder in Drive.

### 3. Deploy to Vercel

1. Push this project to a GitHub repo.
2. In Vercel, **Add New Project** → import the repo.
3. Add an environment variable: `APPS_SCRIPT_URL` = your `/exec` URL from step
   1 (leave it as a regular, non-public env var — it should **not** be
   prefixed `NEXT_PUBLIC_`, since it's only used server-side).
4. Deploy. Note your production URL, e.g. `https://jiaxin-wedding.vercel.app`
   (or attach a custom domain in Vercel's project settings).

### 4. Generate the real QR codes

Once you know your production URL:

```bash
SITE_URL=https://jiaxin-wedding.vercel.app node scripts/generate-qr-codes.mjs
```

This writes 55 PNGs into `public/qr/`. If you're generating them for a
**deployed** site (not testing locally), redeploy afterwards so the new QR
images ship (or just regenerate directly on your machine before your next
`git push`/Vercel deploy).

### 5. Print the table cards

1. Visit `/print/cards` on your deployed site (or `npm run dev` locally).
2. Press `Ctrl/Cmd + P` → Destination **Save as PDF** → Paper size **A4** →
   Scale **100%** → Margins **None**.
3. Check the print preview: 4 cards per sheet, dashed cut lines, QR codes
   clear of any decoration.
4. Save the PDF and send it to a print shop (or print at home) on cardstock,
   then cut along the dashed lines.

**Before printing all 55**, print one test page and scan the QR code with a
couple of different phones from a slight angle, not just straight-on, to
confirm real-world scannability.

### 6. Go-live check

Scan one physical printed card → confirm it opens the right table's page on
your phone → take a test photo → confirm it appears in the matching "Table N"
folder in your Google Drive within a few seconds.

## Changing the number of tables

The table count is currently **55**, set in three places (keep them in sync
if you change it):

- `src/lib/config.ts` → `TABLE_COUNT`
- `apps-script/Code.gs` → `MAX_TABLE`
- `apps-script/Setup.gs` → `SETUP_TABLE_COUNT` (re-run `createAllTableFolders`
  afterwards to create any new folders)

## Project structure

```
src/app/t/[table]/page.tsx     guest-facing page for a given table
src/app/print/cards/page.tsx   printable sheet of all 55 QR cards
src/app/api/upload/route.ts    proxies photo uploads to the Apps Script backend
src/components/CameraCapture.tsx   the in-app live camera capture flow
scripts/generate-qr-codes.mjs  generates the 55 QR code PNGs
apps-script/                   the Google Apps Script backend source (deployed separately)
```

# Google Apps Script backend — setup steps

This is the piece that actually saves guest photos into one shared folder in your
Google Drive. It runs entirely inside your own Google account — no separate server,
no cost.

## 1. Create the Apps Script project

1. Go to **script.google.com** and sign in with the Google account whose Drive
   should receive the wedding photos.
2. Click **New project**.
3. Rename it (top left, click "Untitled project") to something like
   `Wedding Photo Upload`.
4. In the left sidebar, you'll see a file called `Code.gs`. Delete everything in
   it and paste in the full contents of this repo's `apps-script/Code.gs`.
5. Click the **+** next to "Files" → **Script** → name it `Setup`. Paste in the
   full contents of this repo's `apps-script/Setup.gs`.
6. Save (Ctrl/Cmd + S).

## 2. Create the shared photo folder (run once)

1. At the top of the editor, next to the "Run" button, use the function dropdown
   and select `createAllPhotosFolder`.
2. Click **Run**.
3. Google will ask you to authorize the script (it needs permission to manage
   your Drive). Click **Review permissions** → choose your account → you'll see
   a warning that says "Google hasn't verified this app" — this is expected for
   a script you wrote yourself. Click **Advanced** → **Go to Wedding Photo
   Upload (unsafe)** → **Allow**.
4. Once it finishes, open **View → Logs** (or Executions) to confirm you see
   the URL of the **All Photos** folder in your Drive, ready to receive photos.
5. If you already have photos in older per-table folders (`Table 1` ...), run
   `moveTablePhotosIntoAllPhotos` once to move them into the shared folder.

## 3. Deploy as a Web App

1. Click **Deploy** (top right) → **New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Fill in:
   - Description: `Wedding photo upload`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**. Authorize again if prompted.
5. Copy the **Web app URL** shown (it ends in `/exec`). You'll need this for the
   Next.js app's `APPS_SCRIPT_URL` environment variable — see the root
   `README.md`.

## Updating the script later

If you ever edit `Code.gs` or `Setup.gs` in this repo, copy the updated code
back into the Apps Script editor, then **Deploy → Manage deployments → edit
(pencil icon) → New version → Deploy** so the live URL picks up the change.
The Web app URL stays the same across versions.

## Notes

- Photos are saved in **Wedding Photos > All Photos** in your Drive. The table
  number is kept in each filename (`table12-....jpg`) so you can still tell
  which table took it.
- Guests can view every photo in the site's album but cannot delete: photos are
  shared "view only" and the site has no delete option. Only you (the Drive
  owner) can remove photos.
- Nothing here costs money — Apps Script Web Apps and Drive storage under your
  own personal Google account are free (subject to your account's normal Drive
  storage quota).
- **Guest album**: each uploaded photo is set to "Anyone with the link can
  view" so the app's `/t/{table}/album` page (shows the whole album) can display it back to guests —
  photos aren't publicly listed/searchable, but anyone who gets a direct link
  could open one. If you already deployed this script before the album
  feature was added, follow "Updating the script later" above to pick up this
  change — photos uploaded before the update won't retroactively become
  viewable, only new ones after you redeploy.

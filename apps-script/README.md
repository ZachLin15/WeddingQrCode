# Google Apps Script backend — setup steps

This is the piece that actually saves guest photos into your Google Drive, sorted
by table. It runs entirely inside your own Google account — no separate server,
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

## 2. Create all 55 table folders (run once)

1. At the top of the editor, next to the "Run" button, use the function dropdown
   and select `createAllTableFolders`.
2. Click **Run**.
3. Google will ask you to authorize the script (it needs permission to manage
   your Drive). Click **Review permissions** → choose your account → you'll see
   a warning that says "Google hasn't verified this app" — this is expected for
   a script you wrote yourself. Click **Advanced** → **Go to Wedding Photo
   Upload (unsafe)** → **Allow**.
4. Once it finishes, open **View → Logs** (or Executions) to confirm you see
   `Created Table 1` through `Created Table 55`, and a line with the root
   folder's URL. Open that URL to see all the folders in your Drive, ready to
   receive photos.

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

- Photos are saved under a single **"Wedding Photos"** folder in your Drive,
  with one subfolder per table (`Table 1`, `Table 2`, ...).
- If a table's folder is somehow missing (e.g. you increase the table count
  later), the script will create it automatically on the first upload.
- Nothing here costs money — Apps Script Web Apps and Drive storage under your
  own personal Google account are free (subject to your account's normal Drive
  storage quota).

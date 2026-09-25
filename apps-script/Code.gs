/**
 * Wedding photo upload + album backend.
 * Deploy this as a Web App (Execute as: Me, Who has access: Anyone).
 * The Next.js app's /api/upload and /api/album routes call this.
 */

var ROOT_FOLDER_NAME = 'Wedding Photos';
var ALL_PHOTOS_FOLDER_NAME = 'All Photos';
var MAX_ALBUM_PHOTOS = 600; // newest first
var MIN_TABLE = 1;
var MAX_TABLE = 60;

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'No data received' });
    }

    var data = JSON.parse(e.postData.contents);
    var table = parseInt(data.table, 10);

    if (!table || table < MIN_TABLE || table > MAX_TABLE) {
      return jsonResponse({ ok: false, error: 'Invalid table number' });
    }
    if (!data.base64 || !data.filename) {
      return jsonResponse({ ok: false, error: 'Missing photo data' });
    }

    // Every photo goes into one shared folder; the table number lives in the filename.
    var folder = getOrCreateAllPhotosFolder();
    var bytes = Utilities.base64Decode(data.base64);
    var blob = Utilities.newBlob(bytes, data.mimeType || 'image/jpeg', data.filename);
    var file = folder.createFile(blob);
    var fileId = file.getId();

    // The photo is saved at this point. Anything below is best-effort, so a
    // hiccup here must never turn a successful upload into an error for the
    // guest (which would also make them retry and create duplicates).
    var warning = null;
    try {
      // Let the guest album display this photo without needing to sign in.
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (shareErr) {
      warning = 'sharing: ' + (shareErr && shareErr.message ? shareErr.message : 'failed');
    }

    var result = {
      ok: true,
      fileId: fileId,
      fileUrl: 'https://drive.google.com/file/d/' + fileId + '/view',
    };
    if (warning) result.warning = warning;
    return jsonResponse(result);
  } catch (err) {
    return jsonResponse({ ok: false, error: err && err.message ? err.message : 'Unknown error' });
  }
}

function doGet(e) {
  try {
    var folder = getOrCreateAllPhotosFolder();
    var files = folder.getFiles();
    var photos = [];
    while (files.hasNext()) {
      var file = files.next();
      var match = /^table(\d+)-/.exec(file.getName());
      photos.push({
        id: file.getId(),
        table: match ? parseInt(match[1], 10) : null,
        createdAt: file.getDateCreated().getTime(),
        thumbnailUrl: 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w500',
        // The thumbnail endpoint loads much faster/more reliably than
        // uc?export=view (which can hang or show an interstitial page),
        // so reuse it at a larger size for the full lightbox view too.
        viewUrl: 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w1600',
      });
    }
    photos.sort(function (a, b) {
      return b.createdAt - a.createdAt;
    });

    return jsonResponse({ ok: true, photos: photos.slice(0, MAX_ALBUM_PHOTOS) });
  } catch (err) {
    return jsonResponse({ ok: false, error: err && err.message ? err.message : 'Unknown error' });
  }
}

function getOrCreateAllPhotosFolder() {
  var root = getOrCreateRootFolder();
  var existing = root.getFoldersByName(ALL_PHOTOS_FOLDER_NAME);
  if (existing.hasNext()) return existing.next();
  return root.createFolder(ALL_PHOTOS_FOLDER_NAME);
}

function getOrCreateRootFolder() {
  var folders = DriveApp.getFoldersByName(ROOT_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(ROOT_FOLDER_NAME);
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

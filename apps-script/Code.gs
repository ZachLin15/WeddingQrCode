/**
 * Wedding photo upload + album backend.
 * Deploy this as a Web App (Execute as: Me, Who has access: Anyone).
 * The Next.js app's /api/upload and /api/album routes call this.
 */

var ROOT_FOLDER_NAME = 'Wedding Photos';
var MIN_TABLE = 1;
var MAX_TABLE = 55;

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

    var folder = getOrCreateTableFolder(table);
    var bytes = Utilities.base64Decode(data.base64);
    var blob = Utilities.newBlob(bytes, data.mimeType || 'image/jpeg', data.filename);
    var file = folder.createFile(blob);
    // Let the guest album display this photo without needing to sign in.
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return jsonResponse({ ok: true, fileId: file.getId(), fileUrl: file.getUrl() });
  } catch (err) {
    return jsonResponse({ ok: false, error: err && err.message ? err.message : 'Unknown error' });
  }
}

function doGet(e) {
  try {
    var table = parseInt(e.parameter.table, 10);
    if (!table || table < MIN_TABLE || table > MAX_TABLE) {
      return jsonResponse({ ok: false, error: 'Invalid table number' });
    }

    var folder = getOrCreateTableFolder(table);
    var files = folder.getFiles();
    var photos = [];
    while (files.hasNext()) {
      var file = files.next();
      photos.push({
        id: file.getId(),
        createdAt: file.getDateCreated().getTime(),
        thumbnailUrl: 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w500',
        viewUrl: 'https://drive.google.com/uc?export=view&id=' + file.getId(),
      });
    }
    photos.sort(function (a, b) {
      return b.createdAt - a.createdAt;
    });

    return jsonResponse({ ok: true, photos: photos });
  } catch (err) {
    return jsonResponse({ ok: false, error: err && err.message ? err.message : 'Unknown error' });
  }
}

function getOrCreateTableFolder(tableNumber) {
  var root = getOrCreateRootFolder();
  var name = 'Table ' + tableNumber;
  var existing = root.getFoldersByName(name);
  if (existing.hasNext()) return existing.next();
  return root.createFolder(name);
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

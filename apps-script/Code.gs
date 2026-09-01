/**
 * Wedding photo upload backend.
 * Deploy this as a Web App (Execute as: Me, Who has access: Anyone).
 * The Next.js app's /api/upload route POSTs here.
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

    return jsonResponse({ ok: true, fileId: file.getId(), fileUrl: file.getUrl() });
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

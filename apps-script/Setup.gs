/**
 * One-time setup helpers. Run from the Apps Script editor (pick the function
 * in the dropdown at the top, then click "Run").
 *
 * All guest photos now live in ONE folder ("Wedding Photos" > "All Photos").
 * The table number is kept in each filename (e.g. table12-2026-....jpg).
 *
 * createAllPhotosFolder(): creates the shared folder up front.
 * moveTablePhotosIntoAllPhotos(): if you already have photos in the older
 *   per-table folders ("Table 1" ... "Table N"), moves them into the shared
 *   folder so they show up in the album. Safe to re-run.
 */

var SETUP_TABLE_COUNT = 60;

function createAllPhotosFolder() {
  var folder = getOrCreateAllPhotosFolder();
  Logger.log('All Photos folder: ' + folder.getUrl());
}

function moveTablePhotosIntoAllPhotos() {
  var root = getOrCreateRootFolder();
  var target = getOrCreateAllPhotosFolder();
  var moved = 0;
  for (var i = 1; i <= SETUP_TABLE_COUNT; i++) {
    var folders = root.getFoldersByName('Table ' + i);
    while (folders.hasNext()) {
      var files = folders.next().getFiles();
      while (files.hasNext()) {
        var file = files.next();
        file.moveTo(target);
        moved++;
      }
    }
  }
  Logger.log('Moved ' + moved + ' photo(s) into ' + target.getUrl());
}

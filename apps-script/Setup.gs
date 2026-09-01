/**
 * One-time setup: run createAllTableFolders() once from the Apps Script editor
 * (select it in the function dropdown at the top, then click "Run") to pre-create
 * all table folders in Drive before the wedding, so there's no risk of duplicate
 * folders being created if many guests upload at the same table simultaneously.
 */

var SETUP_TABLE_COUNT = 55;

function createAllTableFolders() {
  var root = getOrCreateRootFolder();
  for (var i = 1; i <= SETUP_TABLE_COUNT; i++) {
    var name = 'Table ' + i;
    var existing = root.getFoldersByName(name);
    if (!existing.hasNext()) {
      root.createFolder(name);
      Logger.log('Created ' + name);
    } else {
      Logger.log('Skipped (already exists): ' + name);
    }
  }
  Logger.log('Done. Root folder: ' + root.getUrl());
}

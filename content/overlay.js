var bookmarkAll = {
  bookmarkAllTabs: function() {
    var strFolderName = nsPreferences.copyUnicharPref(bookmarkAllPrefs.key, bookmarkAllPrefs.default) + this.getDateTime();

    var bookmarksService = Components.classes["@mozilla.org/browser/nav-bookmarks-service;1"].getService(Components.interfaces.nsINavBookmarksService);
    var menuFolder = bookmarksService.bookmarksMenuFolder;
    var newFolderId = bookmarksService.createFolder(menuFolder, strFolderName, bookmarksService.DEFAULT_INDEX);

    var browsers = document.getElementById('content').browsers;

    for (var i = 0; i < browsers.length; ++i) {
      var webNav = browsers[i].webNavigation;
      var url = webNav.currentURI.spec;
      var name = "";
      var charset;

      try {
        var doc = webNav.document;
        name = doc.title || url;
      } catch (e) {
        name = url;
      }

      var id = bookmarksService.insertBookmark(newFolderId, webNav.currentURI, -1, name);
    }
  },

  getDateTime: function() {
    var objDate = new Date();
    var yy = objDate.getFullYear().toString();
    var mm = "00" + (objDate.getMonth() + 1).toString();
    mm = mm.substr(mm.length - 2);
    var dd = "00" + objDate.getDate().toString();
    dd = dd.substr(dd.length - 2);
    var hh = "00" + objDate.getHours().toString();
    hh = hh.substr(hh.length - 2);
    var nn = "00" + objDate.getMinutes().toString();
    nn = nn.substr(nn.length - 2);
    var ss = "00" + objDate.getSeconds().toString();
    ss = ss.substr(ss.length - 2);

    return yy + "/" + mm + "/" + dd + " " + hh + ":" + nn + ":" + ss;
  }
};

var bookmarkAll = {
  bookmarkAllTabs: function () {
    // 設定のロード
    var prefs = bookmarkAllPrefs;
    var strPrefPath   = nsPreferences.copyUnicharPref(prefs.PATH_KEY, prefs.PATH_DEFAULT);
    var strPrefPrefix = nsPreferences.copyUnicharPref(prefs.PREFIX_KEY, prefs.PREFIX_DEFAULT);

    // ブックマーク・サービス
    var bookmarksService = Components.classes["@mozilla.org/browser/nav-bookmarks-service;1"].getService(Components.interfaces.nsINavBookmarksService);

    // ブックマークのルートを取得
    var targetFolder = bookmarksService.bookmarksMenuFolder;

    // ブックマークを格納するフォルダを格納するパスがなかったら作成
    if (strPrefPath) {
      strPrefPath.split("/").forEach(function (s) {
        if (!s) return;

        var tempFolder = bookmarksService.getChildFolder(targetFolder, s);

        if (!tempFolder) {
          targetFolder = bookmarksService.createFolder(targetFolder, s, -1);
        } else {
          targetFolder = tempFolder;
        }
      });
    }

    // ブックマークを格納するフォルダを作成
    targetFolder = bookmarksService.createFolder(targetFolder, strPrefPrefix + this.getDateTime(), -1);

    // 全てのタブをブックマーク
    document.getElementById("content").browsers.forEach(function (b) {
      var webNav = b.webNavigation;
      var url    = webNav.currentURI.spec;

      try {
        var title = webNav.document.title || url;
      } catch (e) {
        title = url;
      }

      var id = bookmarksService.insertBookmark(targetFolder, webNav.currentURI, -1, title);
    });
  },

  getDateTime: function () {
    var now = new Date();
    return now.toLocaleFormat("%Y/%m/%d %H:%M:%S");
  }
};

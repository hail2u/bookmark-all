var bookmarkAll = {
  bookmarkAllTabs: function() {
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
        if (!bookmarksService.getChildFolder(targetFolder, s)) {
          targetFolder = bookmarksService.createFolder(targetFolder, s, -1);
        }
      });
    }

    // ブックマークを格納するフォルダを作成
    targetFolder = bookmarksService.createFolder(targetFolder, strPrefPrefix + this.getDateTime(), -1);

    // 全てのタブをブックマーク
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

      var id = bookmarksService.insertBookmark(targetFolder, webNav.currentURI, -1, name);
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

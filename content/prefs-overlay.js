var bookmarkAllPrefs = {
  PATH_KEY:       "extensions.bookmark-all.path",
  PATH_DEFAULT:   "",
  PREFIX_KEY:     "extensions.bookmark-all.prefix",
  PREFIX_DEFAULT: "Bookmarks at: ",

  loadPrefs: function() {
    var strPrefPath   = nsPreferences.copyUnicharPref(this.PATH_KEY, this.PATH_DEFAULT);
    var strPrefPrefix = nsPreferences.copyUnicharPref(this.PREFIX_KEY, this.PREFIX_DEFAULT);
    document.getElementById("prefPath").value   = strPrefPath;
    document.getElementById("prefPrefix").value = strPrefPrefix;
  },

  savePrefs: function() {
    var strPrefPath   = document.getElementById("prefPath").value;
    var strPrefPrefix = document.getElementById("prefPrefix").value;
    nsPreferences.setUnicharPref(this.PATH_KEY, strPrefPath);
    nsPreferences.setUnicharPref(this.PREFIX_KEY, strPrefPrefix);
  }
};

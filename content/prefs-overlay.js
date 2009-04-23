var bookmarkAllPrefs = {
  key:     "extensions.bookmark-all.prefix",
  default: "Bookmarks at: ",

  loadPrefs: function() {
    var strPrefPrefix = nsPreferences.copyUnicharPref(this.key, this.default);
    document.getElementById("prefPrefix").value = strPrefPrefix;
  },

  savePrefs: function() {
    var strPrefPrefix = document.getElementById("prefPrefix").value;
    nsPreferences.setUnicharPref(this.key, strPrefPrefix);
  }
};

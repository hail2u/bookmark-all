var bookmarkAllPrefs = {
  loadPrefs: function() {
    var strPrefPrefix = nsPreferences.copyUnicharPref(_prefPrefix, _prefPrefixDefault);
    document.getElementById("prefPrefix").value = strPrefPrefix;
  },

  savePrefs: function() {
    var strPrefPrefix = document.getElementById("prefPrefix").value;
    nsPreferences.setUnicharPref(_prefPrefix, strPrefPrefix);
  }
};

exports["test ID not set"] = function(assert) {
  var id = require("../id");
  assert.ok(id.unique_id() == 'aaaaaaaaaaaaaaaaaaaaaaaa');
}

exports["test ID set"] = function(assert) {
  var preferences = require("sdk/simple-prefs").prefs;
  preferences.unique_id = "111111111111111111111111";

  var id = require("../id");
  console.log(id.unique_id);
  assert.ok(id.unique_id() == '111111111111111111111111');
}

require("sdk/test").run(exports);

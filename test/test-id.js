var id = require("../id");
var preferences = require("sdk/simple-prefs").prefs;
var randCharMaker = require("../id").randCharMaker; 

exports["test randCharMaker"] = function(assert) {
  var charMaker = randCharMaker(function() { return 0; });
  assert.ok(charMaker.next().value == '0');

  charMaker = randCharMaker(function() { return 0.163; });
  assert.ok(charMaker.next().value == 'A');

  charMaker = randCharMaker(function() { return 0.582; });
  assert.ok(charMaker.next().value == 'a');

  charMaker = randCharMaker(function() { return 0.999; });
  assert.ok(charMaker.next().value == 'z');
}

exports["test ID not set"] = function(assert) {
  preferences.unique_id = "_";
  assert.ok(id.unique_id().length == 24);
}

exports["test ID set"] = function(assert) {
  preferences.unique_id = "111111111111111111111111";
  assert.ok(id.unique_id() == "111111111111111111111111");
}

require("sdk/test").run(exports);

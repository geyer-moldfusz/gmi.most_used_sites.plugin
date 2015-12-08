var Transmitter = require("../api.js").Transmitter;
var preferences = require("sdk/simple-prefs").prefs;
var url = require("../api.js").url;

exports["test api url"] = function(assert) {
  preferences.unique_id = "111111111111111111111111";
  assert.ok(url.get_visits() ==
    "https://api.mostusedsites.guerilla-it.net/visits/111111111111111111111111");
};

exports["test post_visits url"] = function(assert) {
  preferences.unique_id = "111111111111111111111111";
  preferences.api_url = "http://foo";
  assert.ok(url.post_visits() == "http://foo/visits/111111111111111111111111");
};

exports["test get_visits url"] = function(assert) {
  preferences.unique_id = "111111111111111111111111";
  preferences.api_url = "http://foo";
  assert.ok(url.get_visits() == "http://foo/visits/111111111111111111111111");
};

exports["test get_all_visits url"] = function(assert) {
  preferences.api_url = "http://foo";
  assert.ok(url.get_all_visits() == "http://foo/visits/");
};

exports["test Transmitter"] = function(assert, done) {
  var transmitter = new Transmitter(null, null, null, function(data) {
    assert.ok(data == "foo");
    done()
  });
  transmitter.submit("foo");
};

require("sdk/test").run(exports);

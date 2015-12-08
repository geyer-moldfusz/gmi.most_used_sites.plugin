var Transmitter = require("../api").Transmitter;
var preferences = require("sdk/simple-prefs").prefs;
var url = require("../api").url;
var fix = require("./fixtures");

exports["test post_visits url"] = function(assert) {
  assert.ok(url.post_visits() ==
    "http://localhost/visits/111111111111111111111111");
};

exports["test get_visits url"] = function(assert) {
  assert.ok(url.get_visits() ==
    "http://localhost/visits/111111111111111111111111");
};

exports["test get_all_visits url"] = function(assert) {
  assert.ok(url.get_all_visits() ==
    "http://localhost/visits/");
};

exports["test Transmitter"] = function(assert, done) {
  var transmitter = new Transmitter(null, null, null, function(data) {
    assert.ok(data == "foo");
    done()
  });
  transmitter.submit("foo");
};

require("sdk/test").run(exports);

var Transmitter = require("../transmitter.js").Transmitter;

exports["test Transmitter"] = function(assert, done) {
  var transmitter = new Transmitter("http://localhost", function(data) {
    assert.ok(data == "foo");
    done()
  });
  transmitter.submit("foo");
}

require("sdk/test").run(exports);
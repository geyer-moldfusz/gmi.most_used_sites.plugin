var Reporter = require("../reporter.js");

exports["test Reporter"] = function(assert) {
  var reporter = Reporter.getInstance();
//  assert.ok(reporter.target == "localhost:8080");
}

exports["test Reporter is singleton"] = function(assert) {
  var reporter_a = Reporter.getInstance();
  var reporter_b = Reporter.getInstance();
  assert.ok(reporter_a === reporter_b);
}

exports["test Visits"] = function(assert) {
  var reporter = Reporter.getInstance();
  reporter.append("foo");
//  assert.ok(reporter.visits[0] == "foo");
}

require("sdk/test").run(exports);

var Reporter = require("../reporter.js").reporter;

/*exports["test Reporter"] = function(assert) {
  var reporter = new Reporter();
  assert.ok(reporter.target == "localhost:8080");
}

exports["test Visits"] = function(assert) {
  var reporter = new Reporter();
  reporter.append("foo");
  assert.ok(reporter.visits[0] == "foo");
}
*/
//exports["test Reporter handles visit event"] = function(assert) {
//  emit()

require("sdk/test").run(exports);

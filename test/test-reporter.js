var Reporter = require("../reporter.js").reporter;
var reporter = new Reporter();

exports["test Reporter"] = function(assert) {
  assert.ok(reporter.target == "localhost:8080");
}

//exports["test Reporter handles visit event"] = function(assert) {
//  emit()

require("sdk/test").run(exports);

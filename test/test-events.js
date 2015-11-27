var events = require("../events");

exports["test VisitEvent"] = function(assert) {
  var visitEvent = new events.VisitEvent("foo", 1, 1, false);
  assert.ok(visitEvent.url == "foo");
}

require("sdk/test").run(exports);

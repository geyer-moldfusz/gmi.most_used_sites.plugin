var Visit = require("../visit").Visit;

exports["test Visit"] = function(assert) {
  var visit = new Visit("foo", new Date(2105, 11, 30), 1, false);
  assert.ok(visit.url == "foo");
  assert.ok(visit.visited_at.getMonth() == 11);
  assert.ok(visit.duration == 1);
  assert.ok(visit.active == false);
}

exports["test submit"] = function(assert) {
  var visit = new Visit("foo", new Date(2105, 11, 30), 1, false);
  visit.register({append: function (v) {
    assert.ok(v.url == "foo");
  }});
}

require("sdk/test").run(exports);

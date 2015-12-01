var main = require("../");
var tabs = require("sdk/tabs");

/*exports["test main"] = function(assert) {
  assert.pass("Unit test running!");
};

exports["test main async"] = function(assert, done) {
  assert.pass("async Unit test running!");
  done();
};

exports["test dummy"] = function(assert, done) {
  main.dummy("foo", function(text) {
    assert.ok((text === "foo"), "Is the text actually 'foo'");
    done();
  });
};*/
/*
#exports["test onOpen"] = function(assert, done) {
#  tabs.open({
#    url: "http://www.example.com",
#    onReady: function onReady(tab) {
#      assert.ok((tab.accessed instanceof Date), "Tab stored last access time");
#      tab.close(function onClose() {
#        done();
#      });
#    }
#  });
#};
*/

exports["test onOpen"] = function(assert) {
  var tabs = {
    events: [],
    on: function(k, _) {
      this.events.push(k);
    }
  };

  main.onOpen(tabs);
  assert.ok(tabs.events.indexOf("foo") == -1);
  assert.ok(tabs.events.indexOf("pageshow") != -1);
  assert.ok(tabs.events.indexOf("activate") != -1);
  assert.ok(tabs.events.indexOf("deactivate") != -1);
  assert.ok(tabs.events.indexOf("close") != -1);
}

require("sdk/test").run(exports);

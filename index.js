var self = require("sdk/self");
var tabs = require("sdk/tabs");
var Visit = require("./visit").Visit;
var Reporter = require("./reporter").Reporter;


function onOpen(tab) {
  var accessed = new Date();
  var reporter = new Reporter();

  ["pageshow", "activate", "deactivate", "close"].map( function(e) {
    tab.on(e, function(t) {
      var now = new Date();
      var visit = new Visit(t.url, now, now-accessed, true);
      visit.submit(reporter.append);
      accessed = now;
    });
  });
}


tabs.on('open', onOpen);

exports.onOpen = onOpen;

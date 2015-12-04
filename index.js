var self = require("sdk/self");
var tabs = require("sdk/tabs");
var windows = require("sdk/windows").browserWindows;
var Visit = require("./visit").Visit;
var Reporter = require("./reporter");


var onOpen = function(tab) {
  var reporter = Reporter.getInstance();
  tab.accessed = new Date();

  var registerVisit = function(was_active) {
    return function(t) {
      var now = new Date();
      var visit = new Visit(t.url, now, now-t.accessed, was_active);
      visit.register(reporter);
      t.accessed = now;
    };
  };

  tab.on("activate", registerVisit(false));
  tab.on("deactivate", registerVisit(true));

  tab.on("close", function(t) {
    registerVisit(tabs.activeTab == t)(t);
  });

  tab.on("pageshow", function(t) {
    registerVisit(tabs.activeTab == t)(t);

    // we also need to access the unload event for the loaded page
    var worker = t.attach({
      contentScriptFile: self.data.url("unload.js")
    });
    worker.port.on("unload", function(_) {
      // this event may be fired in case the tab is already about to be closed
      try {
        registerVisit(tabs.activeTab == t)(t);
      } catch(e) {
        if (e.message == "tab is undefined") return;  // the close event already handled this situation
        throw(e);
      }
    });
  });

};

tabs.on('open', onOpen);
// the initial tabs are not tracked, so we need to re-call onOpen
for (let tab of tabs) {
  if (!tab.accessed) onOpen(tab);
}

windows.on('close', function(_) {
  Reporter.getInstance().flush();
});

exports.onOpen = onOpen;

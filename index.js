var buttons = require("sdk/ui/button/action");
var tabs = require("sdk/tabs");
var windows = require("sdk/windows").browserWindows;
var ID = require("./id");
var Api = require("./api");
var Visit = require("./visit").Visit;
var Registry = require("./registry");

var button = buttons.ActionButton({
  id: "most-used-sites-frontend",
  label: "Show most used sites",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: function(_) {
    tabs.open({
      url: "./frontend/index.html",
      onPageShow: function(tab) {
        tab.attach({
          contentScriptFile: "./contentscript/urls.js",
          contentScriptOptions: {
            api: {
              all_visits: Api.url.get_all_visits(),
              visits: Api.url.get_visits()
            }
          }
        });
      }
    });
  }
});

var onOpen = function(tab) {
  var registry = Registry.getInstance();
  tab.accessed = new Date();

  var registerVisit = function(was_active) {
    return function(t) {
      var now = new Date();
      var visit = new Visit(t.url, now, now-t.accessed, was_active);
      visit.register(registry);
      t.accessed = now;
    };
  };

  windows.on("activate", function(w) {
    if (w.tabs.activeTab == tab) registerVisit(false)(tab);
  });
  windows.on("deactivate", function(w) {
    if (w.tabs.activeTab == tab) registerVisit(true)(tab);
  });

  tab.on("activate", registerVisit(false));
  tab.on("deactivate", registerVisit(true));

  tab.on("close", function(_) {
    registerVisit(tabs.activeTab == tab)(tab);
  });

  tab.on("pageshow", function(_) {
    registerVisit(tabs.activeTab == tab)(tab);

    // we also need to access the unload event for the loaded page
    var worker = tab.attach({
      contentScriptFile: "./contentscript/unload.js"
    });
    worker.port.on("unload", function(_) {
      // this event may be fired in case the tab is already about to be closed
      try {
        registerVisit(tabs.activeTab == tab)(tab);
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
  Registry.getInstance().flush();
});

exports.onOpen = onOpen;

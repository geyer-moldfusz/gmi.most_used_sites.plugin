var emit = require("sdk/event/core");
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var events = require("./events");
var Reporter = require("./reporter").reporter;

function onOpen(tab) {
  console.log(tab.url + " os open");
  tab.reporter = new Reporter();
  tab.accessed = new Date()
  tab.on("pageshow", logShow);
  tab.on("activate", logActivate);
  tab.on("deactivate", logDeactivate);
  tab.on("close", logClose);
}

function logShow(tab) {
  now = new Date();
  tab.reporter.changed(
    new events.VisitEvent(
      tab.url, tab.accessed, now - tab.accessed, false));
  tab.accessed = new Date();
  console.log(tab.url + " is loaded");
}

function logActivate(tab) {
  now = new Date();
  tab.reporter.changed(
    new events.VisitEvent(
      tab.url, tab.accessed, now - tab.accessed, false));
  tab.accessed = new Date();
  console.log(tab.url + " is activated");
}

function logDeactivate(tab) {
  now = new Date()
  tab.reporter.changed(
    new events.VisitEvent(
      tab.url, tab.accessed, now - tab.accessed, true));
  tab.accessed = new Date()
  console.log(tab.url + " is deactivated");
}

function logClose(tab) {
  now = new Date();
  tab.reporter.changed(
    new events.VisitEvent(
      tab.url, tab.accessed, now - tab.accessed, false));
  tab.accessed = new Date();
  console.log(tab.url + " is closed");
}

tabs.on('open', onOpen);

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.onOpen = onOpen;
exports.dummy = dummy;

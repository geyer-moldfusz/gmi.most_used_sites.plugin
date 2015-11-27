//var EventTarget = require("sdk/event/target");

//var ReportManager = new EventTarget();

function Reporter() {
  this.target = 'localhost:8080';

  this.changed = function(vevent) {
    console.log(vevent.url + "\t" + vevent.duration);
  };
}

exports.reporter = Reporter;

// http://robdodson.me/javascript-design-patterns-singleton/
var setInterval = require("sdk/timers").setInterval;
var Transmitter = require("./api").Transmitter;

var Registry = (function () {
  var instance;

  function init() {
    var visits = [];

    var onSuccess = function(data) {
      console.log("Commit: success");
    };

    var onClientError = function(data) {
      console.log("Commit: client error");
      // we trash the data, since they contain errors
    };

    var onServerError = function(data) {
      console.log("Commit: server error");
      // we have to try again later
      visits.push.apply(visits, data);
    };

    var onNetworkError = function(data) {
      console.log("Commit: network error");
      // we have to try again later
      visits.push.apply(visits, data);
    };

    var transmitter = new Transmitter(
      onSuccess, onClientError, onServerError, onNetworkError);

    var commit = function() {
      var t_visits = [];
      console.log('Commit: create');
      while (true) {
        visit = visits.shift();
        if (!visit) break;
        t_visits.push(visit);
      }

      if (t_visits.length > 0) {
        console.log('Commit: start transmission');
        transmitter.submit(t_visits);
        return;
      }
      console.log('Commit: nothing to commit');
    };

    setInterval(commit, 10000);

    return {
      append: function(visit) {
        console.log('Append visit: '+visit.url);
        visits.push(visit);
      },
      flush: function() {
        commit();
      }
    };
  };

  return {
    getInstance: function() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();

exports.getInstance = Registry.getInstance;

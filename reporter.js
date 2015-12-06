// http://robdodson.me/javascript-design-patterns-singleton/

var setInterval = require("sdk/timers").setInterval;
var ID = require("./id");
var Transmitter = require("./transmitter").Transmitter;

var Reporter = (function () {
  var instance;
  var target = "http://localhost:8080/visits/" + ID.unique_id();

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
      visits.push.apply(visits, data.visits);
    };

    var transmitter = new Transmitter(
      target, onSuccess, onClientError, onServerError);

    var commit = function() {
      var t_visits = [];
      console.log('Commit: create');
      while (true) {
        visit = visits.shift();
        if (!visit) break;
        console.log("\t"+JSON.stringify(visit));
        // XXX this should by done by JSON serializer, not here
        try {
          visit.visited_at = visit.visited_at.getTime();
        }
        catch(err) {
          if (err.name != "TypeError") throw(err);
        }
        t_visits.push(visit);
      }

      if (t_visits.length > 0) {
        console.log('Commit: start transmission');
        transmitter.submit({visits: t_visits});
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

exports.getInstance = Reporter.getInstance;

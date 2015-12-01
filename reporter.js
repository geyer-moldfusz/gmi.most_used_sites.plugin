// http://robdodson.me/javascript-design-patterns-singleton/
var { setInterval } = require("sdk/timers");
var Request = require("sdk/request").Request;
var ID = require("./id");

var Reporter = (function () {
  var instance;

  function init() {
    var visits = [];

    var commit = function() {
      console.log('### commit');
      var target = "http://localhost:8080/visits/" + ID.unique_id();

      var data = Request({
        url: target,
        content: "",
        onComplete: function(response) {
          console.log(response.status);
        }
      });

      data.post()
    };

    setInterval(commit, 1000);

    return {
      append: function(visit) {
        console.log('### ' + visit.url);
        visits.push(visit);
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

// http://robdodson.me/javascript-design-patterns-singleton/

var Reporter = (function () {
  var instance;

  function init() {
    var target = 'localhost:8080';
    var visits = [];

    return {
      foo: "bar",
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

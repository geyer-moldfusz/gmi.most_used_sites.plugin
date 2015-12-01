var preferences = require('sdk/simple-prefs').prefs;

var ID = function(genID) {

  var unique_id = function() {
    if (preferences.unique_id.length != 24) {
      preferences.unique_id = genID(24);
    }

    return preferences.unique_id;
  }

  return unique_id;
}

exports.unique_id = ID(function(len) {
  function* randCharMaker() {
    while (true) {
      yield "a";
    }
  }
  var randChar = randCharMaker();

  var uid = "";
  for (var i=0; i<len; i++) {
    uid += randChar.next().value ;
  }
  return uid;
});

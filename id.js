var preferences = require('sdk/simple-prefs').prefs;


function* randCharMaker(rdng) {
  while (true) {
    yield (function(i) {
      if (i < 10) return String.fromCharCode(i+48);
      if (i > 35) return String.fromCharCode(i+61);
      return String.fromCharCode(i+55);
    })(Math.floor(rdng() * 62));

  }
}

var ID = function(genID) {

  var unique_id = function() {
    if (preferences.unique_id.length != 24) {
      preferences.unique_id = genID(24);
    }
    return preferences.unique_id;
  };

  return unique_id;
}

exports.randCharMaker = randCharMaker;
exports.unique_id = ID(function(len) {
  var randChar = randCharMaker(Math.random);

  var uid = "";
  for (var i=0; i<len; i++) {
    uid += randChar.next().value ;
  }
  return uid;
});

var ID = require("./id");
var Request = require("sdk/request").Request;
var preferences = require('sdk/simple-prefs').prefs;

var Transmitter = function(
  onSuccess, onClientError, onServerError, onNetworkError) {

  this.submit = function(data) {
    var target = preferences.api_url + "/visits/" + ID.unique_id();
    console.log(target);
    var req = Request({
      url: target,
      contentType: 'application/json',
      content: JSON.stringify({visits: data}, function(key, value) {
        if (key == "visited_at") return this.visited_at.getTime();
        return value;
      }),
      onComplete: function(result) {
        if (result.status == 0) {
          onNetworkError(data);
          return;
        }
        if (result.status < 400) {
          onSuccess(data);
          return;
        }
        if (result.status < 500) {
          onClientError(data);
          return;
        }
        onServerError(data);
        return;
      }
    });
    req.post();
  }

}

exports.Transmitter = Transmitter;

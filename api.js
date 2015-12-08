var ID = require("./id");
var Request = require("sdk/request").Request;
var preferences = require('sdk/simple-prefs').prefs;

var url = {
  post_visits: function() {
    return preferences.api_url + "/visits/" + ID.unique_id();
  },
  get_visits: function() {
    return preferences.api_url + "/visits/" + ID.unique_id();
  },
  get_all_visits: function() {
    return preferences.api_url + "/visits/";
  }
};

var Transmitter = function(
  onSuccess, onClientError, onServerError, onNetworkError) {

  this.submit = function(data) {
    var req = Request({
      url: url.post_visits(),
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
  };

};

exports.Transmitter = Transmitter;
exports.url = url;

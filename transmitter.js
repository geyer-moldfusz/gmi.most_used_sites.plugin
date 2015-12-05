var Request = require("sdk/request").Request;

var Transmitter = function(target, onSuccess, onClientError, onServerError) {

  this.submit = function(data) {
    var req = Request({
      url: target,
      contentType: 'application/json',
      content: JSON.stringify(data),
      onComplete: function(result) {
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
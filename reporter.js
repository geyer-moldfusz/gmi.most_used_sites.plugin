function Reporter() {
  var target = 'localhost:8080';
  var visits = [];
}

Reporter.prototype.append = function(visit) {
  console.log('### ' + visit.url);
  visits.push(visit);
}

exports.Reporter = Reporter;

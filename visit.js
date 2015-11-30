function Visit(url, visited_at, duration, active) {
  this.url = url;
  this.visited_at = visited_at;
  this.duration = duration;
  this.active = active;
}

Visit.prototype.submit = function(listener) {
  listener(this);
}

exports.Visit = Visit;

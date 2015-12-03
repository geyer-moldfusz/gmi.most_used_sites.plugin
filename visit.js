var Visit = function(url, visited_at, duration, active) {
  this.url = url;
  this.visited_at = visited_at;
  this.duration = duration;
  this.active = active;
};

Visit.prototype.register = function(registry) {
  registry.append(this);
};

exports.Visit = Visit;

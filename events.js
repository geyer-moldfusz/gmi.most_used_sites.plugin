function VisitEvent(url, visited_at, duration, active) {
  this.url = url;
  this.duration = duration;
  this.visited_at = visited_at;
  this.active = active;
};

exports.VisitEvent = VisitEvent;

var Visit = require("../../visit").Visit;

describe("Visit", function() {
  var visit = new Visit("foo", new Date(2105, 11, 30), 1, false);

  it("should exist", function() {
    expect(visit).toBeDefined();
  });

  it("contains url", function() {
    expect(visit.url).toBe("foo");
  });

  it("contains visited_at", function() {
    expect(visit.visited_at).toEqual(new Date(2105, 11, 30));
  });

  it("contains duration", function() {
    expect(visit.duration).toBe(1);
  });

  it("contains active", function() {
    expect(visit.active).toBe(false);
  });

  it("handle submit", function() {
    visit.register({append: function(v) {
      expect(v).not.toBe(visit);
    }});
  });
});

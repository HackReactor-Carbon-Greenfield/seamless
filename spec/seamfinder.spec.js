describe('seamfinder.js', function() {
  var energy;
  
  beforeEach(function() {
    energy = [
      [1, 1, 0, 1, 1],
      [0, 0, 1, 1, 1],
      [1, 1, 0, 1, 0],
      [1, 1, 1, 0, 1]
    ];
  });

  describe('findVerticalSeam()', function() {
    it ('should find the vertical seam with the minimum energy', function() {
      var seam = findVerticalSeam(energy);
      expect(seam).toEqual(['2', '1', '2', '3']);
    });
  });

  describe('findHorizontalSeam()', function() {
    it ('should find the horizontal seam with the minimum energy', function() {
      var seam = findHorizontalSeam(energy);
      expect(seam).toEqual(['1', '1', '2', '3', '2']);
    });
  });

  describe('findMinimumParent()', function() {
    it ('should find the parent with the minimum energy', function() {
      var parents = [1, 1, 0, 1, 1];
      var minParent = findMinimumParent(parents, 0);
      expect(minParent).toEqual({ index: 0, cost: 1 });
      minParent = findMinimumParent(parents, 1);
      expect(minParent).toEqual({ index: 2, cost: 0 });
      minParent = findMinimumParent(parents, 2);
      expect(minParent).toEqual({ index: 2, cost: 0 });
      minParent = findMinimumParent(parents, 3);
      expect(minParent).toEqual({ index: 2, cost: 0 });
      minParent = findMinimumParent(parents, 4);
      expect(minParent).toEqual({ index: 3, cost: 1 });
    });
  });

});
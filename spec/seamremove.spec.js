describe('seamremove.js', function() {
  var energy, seam;

  beforeEach(function() {
    energy = [
      [1, 1, 0, 1, 1],
      [0, 0, 1, 1, 1],
      [1, 1, 0, 1, 0],
      [1, 1, 1, 0, 1]
    ];
  });

  describe('removeVerticalSeam()', function() {
    it ('should remove a vertical seam from the matrix', function() {
      var seam = findVerticalSeam(energy);
      removeVerticalSeam(energy, seam);
      expect(energy).toEqual([
        [1, 1, 1, 1],
        [0, 1, 1, 1],
        [1, 1, 1, 0],
        [1, 1, 1, 1]
      ]);
    });

    it('should return the pixels which need to recalculate energy', function() {
      var seam = findVerticalSeam(energy);
      var pixelsList = removeVerticalSeam(energy, seam);
      expect(pixelsList).toEqual([
        { row: 0, col: 2 },
        { row: 0, col: 1 },
        { row: 1, col: 1 },
        { row: 1, col: 0 },
        { row: 2, col: 2 },
        { row: 2, col: 1 },
        { row: 3, col: 3 },
        { row: 3, col: 2 }
      ]);
    });
  });

  describe('removeHorizontalSeam()', function() {
    it ('should remove the seam from the matrix', function() {
      var seam = findHorizontalSeam(energy);
      removeHorizontalSeam(energy, seam);
      expect(energy).toEqual([
        [1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
      ]);
    });

    it('should return the pixels which need to recalculate energy', function() {
      energy = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 1, 1]
      ];
      var seam = findHorizontalSeam(energy);
      var pixelsList = removeHorizontalSeam(energy, seam);
      expect(pixelsList).toEqual([
        { row: 1, col: 0 },
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 2 },
        { row: 0, col: 2 }
      ]);
    });
});

});
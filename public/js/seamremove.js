var removeVerticalSeam = function(matrix, seam) {
  var adjPixels = [];

  for (var i = 0; i < matrix.length; i++) {
    var seamIndex = +seam[i];
    matrix[i].splice(seamIndex, 1);
    if (seamIndex + 1 < matrix[i].length - 1)
      adjPixels.push({ row: i, col: seamIndex });
    if (seamIndex - 1 > -1)
      adjPixels.push({ row: i, col: seamIndex - 1 });
  }

  return adjPixels;
};

var removeHorizontalSeam = function(matrix, seam) {
  var adjPixels = [];

  for (var i = 0; i < matrix[0].length; i++) {
    var seamIndex = +seam[i];
    for (var j = seamIndex; j < matrix.length - 1; j++) {
      matrix[j][i] = matrix[j+1][i];
    }
    if (seamIndex + 1 < matrix.length - 1)
      adjPixels.push({ row: seamIndex, col: i });
    if (seamIndex - 1 > -1)
      adjPixels.push({ row: seamIndex - 1, col: i });
  }

  matrix.splice(matrix.length - 1, 1);

  return adjPixels;
};

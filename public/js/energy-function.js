// energy of a single pixel
// del_x^2 + del_y^2 = energy(x,y)
// del_x^2 = R_x(x,y)^2 + G_x(x,y)^2 + B_x(x,y)^2
// del_y^2 = R_y(x,y)^2 + G_y(x,y)^2 + B_y(x,y)^2

// Calculate R,G, and B values for X
var colorDiffX = function(i,j, rgb, array) {
  var left;
  var right;
  var length = array[0].length
  if ( j - 1 < 0 ) {
    left = Math.abs(array[i][length-1][rgb]);
  } else {
    left = Math.abs(array[i][j-1][rgb]);
  }
  if ( j + 1 > length - 1 ) {
    right = Math.abs(array[i][0][rgb])
  } else {
    right = Math.abs(array[i][j+1][rgb])
  }

  return  left - right
}

// Calculate del_x^2 value
var calcDelX = function(i, j, array) {
  var R = colorDiffX(i,j,'r', array);
  var G = colorDiffX(i,j,'g', array);
  var B = colorDiffX(i,j,'b', array);

  var energyValue = Math.pow(R, 2) + Math.pow(G, 2) + Math.pow(B, 2);
  return energyValue
}

// Calculate RGB values for Y
var colorDiffY = function(i,j, rgb, array) {
  var above;
  var below;
  var length = array.length
  if ( i - 1 < 0 ) {
    above = Math.abs(array[length-1][j][rgb]);
  } else {
    above = Math.abs(array[i-1][j][rgb]);
  }

  if ( i + 1 > length - 1 ) {
    below = Math.abs(array[0][j][rgb])
  } else {
    below = Math.abs(array[i+1][j][rgb])
  }

  return  above - below
}
// Calc del_y^2 value
var calcDelY = function(i, j, array) {
  var R = colorDiffY(i,j,'r', array);
  var G = colorDiffY(i,j,'g', array);
  var B = colorDiffY(i,j,'b', array);

  var energyValue = Math.pow(R, 2) + Math.pow(G, 2) + Math.pow(B, 2);
  // testArray[i][j].energy = energyValue; // I think take this out

  return energyValue
}

// This function will give the value of a single pixel
var pixelEnergy = function(i, j, array) {
  var energy = calcDelX(i, j, array) + calcDelY(i, j, array);
  return energy
}
// This function will give create a new matrix with the energy values
var energyMap = function(array) {
  var n = array.length;
  var m = array[0].length;
  var energyMatrix = new Array(n);
  for (var i = 0; i < n; i++) {
    energyMatrix[i] = new Array(m);
  }
  for ( var i = 0; i < array.length; i++ ) {
    for ( var j = 0; j < array[0].length; j++ ) {
      array[i][j].energy = pixelEnergy(i,j, array);
      energyMatrix[i][j] = pixelEnergy(i,j, array);
    }
  }
  return array;
}
// This function will update the energy values on either side of the seam
var energyZipper = function(matrix, pathArray) {
  var length = pathArray.length
  for ( x = 0; x < length; x++ ) {
    var rowVal = pathArray[x].row;
    var colVal = pathArray[x].col;
    matrix[rowVal][colVal].energy = pixelEnergy(rowVal, colVal, matrix)
  }
  return matrix
}

var findVerticalSeam = function(energy) {
  var len = energy[0].length;
  var parent = energy[0].map(function(value) { return value.energy; });
  var current = new Array(len);
  var parentPaths = parent.map(function() { return ''; });
  var paths = new Array(len);
  var minParent;

  for (var i = 1; i < energy.length; i++) {
    for (var j = 0; j < energy[0].length; j++) {
      minParent = findMinimumParent(parent, j);
      current[j] = minParent.cost + energy[i][j].energy;

      paths[j] = parentPaths[minParent.index] + minParent.index + ',';
    }

    parent = current;
    current = [];

    parentPaths = paths;
    paths = [];
  }

  var minPathEnd = parent.indexOf(Math.min.apply(null, parent));

  return (parentPaths[minPathEnd] + minPathEnd).split(',');
};

var findHorizontalSeam = function(energy) {
  var len = energy.length;
  var parent = new Array(len);
  var parentPaths = new Array(len);
  var current = new Array(len);
  var paths = new Array(len);
  var minParent;

  for (var i = 0; i < energy.length; i++) {
    parent[i] = energy[i][0].energy;
    parentPaths[i] = '';
  }

  for (var j = 1; j < energy[0].length; j++) {
    for (var i = 0; i < energy.length; i++) {
      minParent = findMinimumParent(parent, i);
      current[i] = minParent.cost + energy[i][j].energy;

      paths[i] = parentPaths[minParent.index] + minParent.index + ',';
    }
    parent = current;
    current = [];

    parentPaths = paths;
    paths = [];
  }

  var minPathEnd = parent.indexOf(Math.min.apply(null, parent));

  return (parentPaths[minPathEnd] + minPathEnd).split(',');
};

var findMinimumParent = function(parents, index) {
  var left  = parents[index - 1] === undefined ? Infinity : parents[index - 1];
  var right = parents[index + 1] === undefined ? Infinity : parents[index + 1];
  var mid   = parents[index];

  var minParentCost = Math.min(left, mid, right);

  var minParentIndex;

  if (left === minParentCost)
    minParentIndex = index - 1;
  else if (mid === minParentCost)
    minParentIndex = index;
  else
    minParentIndex = index + 1;

  return { cost: minParentCost, index: minParentIndex };
};

var randomEnergy = function(width, height) {
  var energy = new Array(height);
  for (var i = 0; i < height; i++) {
    energy[i] = [];
    for (var j = 0; j < width; j++) {
      energy[i][j] = { energy: ~~(Math.random() * 10000) };
    }
  }
  return energy;
};

// var energy = randomEnergy(2000, 2000);
// for (var i = 0; i < 10; i++) {
//   var seam = findVerticalSeam(energy);
// }
// console.log('---');
// console.log(energy);
// console.log(seam);
var resize = function(image, width, height) {
  var currentWidth = image[0].length;
  var currentHeight = image.length;
  var seam, path;

  image = energyMap(image);

  while (currentWidth > width || currentHeight > height) {
    if (currentWidth > width) {
      seam = findVerticalSeam(image);
      path = removeVerticalSeam(image, seam);
      image = energyZipper(image, path);
      currentWidth = image[0].length;
    }

    if (currentHeight > height) {
      seam = findHorizontalSeam(image);
      path = removeHorizontalSeam(image, seam);
      image = energyZipper(image, path);
      currentHeight = image.length;
    }
  }

  var data = [];
  for (var i = 0; i < image.length; i++) {
    for (var j = 0; j < image[0].length; j++) {
      var pixel = image[i][j];
      data.push(pixel.r, pixel.g, pixel.b, 255);
    }
  }

  return { data: data, width: image[0].length, height: image.length };
};
describe('resize.js', function() {

  describe('resize()', function() {
    it ('should resize horizontally', function() {
      var testImage = [
        [ { r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 } ],
        [ { r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 } ],
        [ { r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 } ]
      ];
      testImage = resize(testImage, 2, 3);
      expect(testImage.length).toEqual(3);
      expect(testImage[0].length).toEqual(2);
    });

    it ('should resize horizontally', function() {
      var testImage = [
        [ { r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 } ],
        [ { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 } ],
        [ { r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 } ]
      ];
      testImage = resize(testImage, 3, 2);
      expect(testImage.length).toEqual(2);
      expect(testImage[0].length).toEqual(3);
    });
  });


});
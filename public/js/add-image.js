/**
 * Created by VicYork on 11/17/15.
 */

(function () {
  /*
   Initialize main variables for image use, canvas for getting data
   from uploaded image and then rerendering, the pixels are the actual
   data from the image, the targetWidth and targetHeight are input
   by the use.
   */
  var image;
  var origImg;
  var canvas = document.querySelector('canvas');
  var context = canvas.getContext('2d');
  var pixels;
  var targetWidth;
  var targetHeight;
  var WIDTH = 0;
  var HEIGHT = 0;
  var origWidth;
  var origHeight;

  context.font = "20px Helvetica";
  context.fillText('Drag an image', 80, 80);

  // Browser specific. Checks if a browser can read files.
  if (window.FileReader) {
    addEventHandler(window, 'load', function () {
      var status = document.getElementById('status');
      var drop = document.getElementById('drop');
      var list = document.getElementById('list');

      function cancel(e) {
        if (e.preventDefault) {
          e.preventDefault();
        }
        return false;
      }

      // Tells the browser that we *can* drop on this target
      addEventHandler(canvas, 'dragover', cancel);
      addEventHandler(canvas, 'dragenter', cancel);
    });
  } else {
    document.getElementById('status').innerHTML = 'Your browser does not support the HTML5 FileReader.';
  }

  // canvas event handler
  addEventHandler(canvas, 'drop', onDrop);
  // addEventHandler(document.querySelector('.url'), 'drop', onDrop);
  // button event handler
  addEventHandler(document.querySelector('#done'), 'click', onButtonClick);

  // url event handler
  // addEventHandler(document.querySelector('.url'), 'change', urlOnLoadEnd);

  // slider event handlers
  addEventHandler(document.querySelector('#slider-horizontal'), 'change', onSlider);
  addEventHandler(document.querySelector('#slider-vertical'), 'change', onSlider);
  // slider handlers
  var horizontalSlider = document.querySelector('#slider-horizontal');
  var verticalSlider = document.querySelector('#slider-vertical');

  addEventHandler(horizontalSlider, 'input', onSlider);
  addEventHandler(verticalSlider, 'input', onSlider);

  var inputWidth = document.querySelector('#input-width');
  var inputHeight = document.querySelector('#input-height');

  // update sliders when value is input into input fields
  // REMOVED WHILE BUTTONS ARE NOT ON THE PAGE
  addEventHandler(inputWidth, 'input', onInputInput);
  addEventHandler(inputHeight, 'input', onInputInput);

  //Save current canvas to firebase
  var save = document.querySelector('#save');
  addEventHandler(save, 'click', onSaveClick);

  // Undo button
  var undo = document.querySelector('#undo');
  addEventHandler(undo, 'click', onUndoClick);

  /* 
    HELPER FUNCTIONS BELOW.
  */

  // Displays the seam to be removed.
  function drawSeam(seam, direction) {
    var imageData;
    if (direction === "vertical") {
      for (var i = 0; i < seam.length; i++) {
        imageData = context.createImageData(1, 1);
        imageData.data[0] = 255;
        imageData.data[1] = 0;
        imageData.data[2] = 0;
        imageData.data[3] = 255;
        context.putImageData(imageData, seam[i], i);
      }
    }
    if (direction === "horizontal") {
      for (var k = 0; k < seam.length; k++) {
        imageData = context.createImageData(1, 1);
        imageData.data[0] = 255;
        imageData.data[1] = 0;
        imageData.data[2] = 0;
        imageData.data[3] = 255;
        context.putImageData(imageData, k, seam[k]);
      }
    }
  }

  // Resize the image.
  function imageResize() {
    var currentWidth = pixels[0].length;
    var currentHeight = pixels.length;
    var path;
    var verticalSeam = [], horizontalSeam = [];

    var width = targetWidth || WIDTH;
    var height = targetHeight || HEIGHT;
    var i = 0;

    pixels = energyMap(pixels);

    var resize = function () {
      if (currentWidth > width) {
        verticalSeam = findVerticalSeam(pixels);
        path = removeVerticalSeam(pixels, verticalSeam);
        pixels = energyZipper(pixels, path);
        currentWidth = pixels[0].length;
      }
      if (currentHeight > height) {
        horizontalSeam = findHorizontalSeam(pixels);
        path = removeHorizontalSeam(pixels, horizontalSeam);
        pixels = energyZipper(pixels, path);
        currentHeight = pixels.length;
      }

      if (i++ % 2 === 0) {
        imageRedraw();
        if (verticalSeam) drawSeam(verticalSeam, "vertical");
        if (horizontalSeam) drawSeam(horizontalSeam, "horizontal");
      }

      verticalSeam = null;
      horizontalSeam = null;

      if (currentWidth > width || currentHeight > height)
        setTimeout(resize, 0);
      else
        imageRedraw();
    };

    resize();
  }

  // Redraw the image once the seams have been removed.
  function imageRedraw() {
    var data = [];
    for (var i = 0; i < pixels.length; i++) {
      for (var j = 0; j < pixels[0].length; j++) {
        var pixel = pixels[i][j];
        data.push(pixel.r, pixel.g, pixel.b, 255);
      }
    }
    context.clearRect(0, 0, WIDTH, HEIGHT);

    WIDTH = pixels[0].length;
    HEIGHT = pixels.length;

    inputWidth.value = WIDTH;
    inputHeight.value = HEIGHT;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    updateSliders();

    var imageData = context.createImageData(WIDTH, HEIGHT);
    for (var k = 0; k < data.length; k++) {
      imageData.data[k] = data[k];
    }
    context.putImageData(imageData, 0, 0);
  }

  function onInputInput(e) {
    horizontalSlider.value = inputWidth.value / WIDTH * 100;
    verticalSlider.value = inputHeight.value / HEIGHT * 100;
  };

  // Event handler that updates the target render size based on the slider
  // vs the input fields.

  function onSlider(e){
    sliderWidth = horizontalSlider.value;
    sliderHeight = verticalSlider.value;

    inputWidth.value = ~~((sliderWidth * WIDTH)/100);
    inputHeight.value = ~~((sliderHeight * HEIGHT)/100);
  }


  function onButtonClick(e) {
    targetWidth = inputWidth.value;
    targetHeight = inputHeight.value;

    imageResize();
  }

  function updateSliders() {
    horizontalSlider.style.width = WIDTH + 'px';
    verticalSlider.style.width = HEIGHT + 'px';

    horizontalSlider.value = targetWidth / WIDTH * 100;
    verticalSlider.value = targetHeight / HEIGHT * 100;

    verticalSlider.style.top = (HEIGHT / 2) + 'px';
  }

  // Event handler for when the image is dropped into the app.
  function onDrop(e) {
    // get window.event if e argument missing (in IE)
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
      // stops the browser from redirecting off to the image.
    }
    var dt = e.dataTransfer;
    var files = dt.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var reader = new FileReader();
      //attach event handlers here...
      addEventHandler(reader, 'loadend', onLoadEnd.bindToEventHandler(file, files));
      reader.readAsDataURL(file);
    }
    return false;
  }

  // Event handler that listens to when the image is done loading.
  function onLoadEnd(e, file, files) {
    var bin = this.result;
    var newFile = document.createElement('div');
    newFile.innerHTML = 'Loaded : ' + file.name + ' size ' + file.size + ' B';
    image = new Image();
    image.src = e.target.result;
    image.onload = onImageLoad;
  }

  // Event handler for the url load. An alternative to dragging and dropping
  // in an image.
  function urlOnLoadEnd(e) {
    image = new Image();
    image.src = e.target.value;
    image.onload = onImageLoad;
  }

  // Event handler for image load. When the image is added, convert it to a
  // matrix of RGB pixel data.
  function onImageLoad() {
    // The width and height of the image, save it to the global scope.
    WIDTH = image.width;
    HEIGHT = image.height;

    // save original dimensions
    origWidth = image.width;
    origHeight = image.height;
    // set dimensions of canvas to equal the size of the image
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    inputWidth.value = WIDTH;
    inputHeight.value = HEIGHT;

    // set dimensions of canvas to equal the size of the image
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // document.querySelector('.url').style.display = 'none';

    horizontalSlider.style.width = WIDTH + 'px';
    verticalSlider.style.width = HEIGHT + 'px';

    verticalSlider.style.top = (HEIGHT / 2) + 'px';

    // draw image to context
    context.drawImage(image, 0, 0);
    // access data property, which contains [R0, G0, B0, A0, R1, G1, B1, A1,
    // ..., Rn, Gn, Bn, An];
    var data = context.getImageData(0, 0, WIDTH, HEIGHT).data;


    origImg = context.getImageData(0, 0, WIDTH, HEIGHT);
    pixels = [];
    // populate pixels array with objects, where each object is { r, g, b } for
    // a pixel. Removes the alpha data point by only incrementing i by 4.
    for (var i = 0; i < data.length; i += 4) {
      var pixel = {
        r: data[i],
        g: data[i + 1],
        b: data[i + 2]
      };
      pixels.push(pixel);
    }
    pixels = listToMatrix(pixels, WIDTH);
  }

  // Transforms an array of RGB pixel data into a matrix.
  function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;
    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }
      matrix[k].push(list[i]);
    }
    return matrix;
  }

  // Add's event handler capabilities.
  function addEventHandler(obj, evt, handler) {
    if (obj.addEventListener) {
      // W3C method
      obj.addEventListener(evt, handler, false);
    } else if (obj.attachEvent) {
      // IE method.
      obj.attachEvent('on' + evt, handler);
    } else {
      // Old school method.
      obj['on' + evt] = handler;
    }
  }


  Function.prototype.bindToEventHandler = function bindToEventHandler() {
    var handler = this;
    var boundParameters = Array.prototype.slice.call(arguments);
    //create closure
    return function (e) {
      e = e || window.event; // get window.event if e argument missing (in IE)
      boundParameters.unshift(e);
      handler.apply(this, boundParameters);
    };
  };

  // Saving functions
  function saveToFirebase(imageData) {
      var pic = ref.child('pics');
      var imagePng = canvas.toDataURL('image/png')
      
      ref.onAuth(function(authData){
        if(!authData){
          $('#notSignedIn').openModal();
        } else {
          var newPicRef = pic.push({
                            uid: getUid(authData),
                            name: getName(authData),
                            pic: imagePng,
                            time: Date.now()
          });
        };
      });
  };

  function onUndoClick() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    canvas.width = origWidth;
    canvas.height = origHeight;
    context.drawImage(image, 0, 0);
    onImageLoad();
  };

  function onSaveClick() {
    var imageData = context.getImageData(0,0,canvas.width, canvas.height); 
    saveToFirebase(imageData.data);
  };
})();

var saveToFirebase = function(){
  var pic = ref.child('pics');

  ref.onAuth(function(authData){
    var newPicRef = pic.push({
                        name: getName(authData),
                        pic: 'auth pic'
    });
  });

  console.log(authData)
};

var refPics = new Firebase('https://dazzling-fire-2339.firebaseio.com/pics');
// Attach an asynchronous callback to read the data at our posts reference
var retFromFirebase = function(){
  refPics.on("value", function(snapshot) {
    console.log(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

};
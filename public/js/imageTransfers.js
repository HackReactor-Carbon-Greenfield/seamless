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

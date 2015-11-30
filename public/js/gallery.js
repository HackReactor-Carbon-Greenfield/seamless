
(function retFromFirebase(){
  var ref = new Firebase("https://dazzling-fire-2339.firebaseio.com/");

  var authData = ref.getAuth();

  var uid = getUid(authData);

  ref.child('pics').orderByChild('uid').equalTo(uid).on('value', function(snapshot){
    var snapObj = snapshot.val();
    for(key in snapObj){
      // console.log(snapObj[key]['pic'])
      var imageData = new Image();
      
      imageData.src = snapObj[key]['pic']
      console.log(imageData.src)
        var imageSource = '<div class="card">' +
          '<div class="card-image firebaseImage">' +
            '<img src= '+ imageData.src +' />' +
          '</div>' +
          '<div class="card-action">' +
            '<a href="#">Link1</a>' +
            '<a href="#">Link2</a>' +
          '</div>'
        '</div>' 

      var imageTemplate = Handlebars.compile(imageSource);
      var imageResult = "";
      imageResult = imageTemplate(imageData)

      $('#gallery').append(imageResult);

    }
  })
})();
var ref = new Firebase("https://dazzling-fire-2339.firebaseio.com");


var login = function(){
  ref.authWithOAuthPopup("google", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });
};

var logout = function(){
  ref.unauth();
  console.log('logged out')
};
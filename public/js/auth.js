var ref = new Firebase('https://dazzling-fire-2339.firebaseio.com');

var isNewUser = true;

var getName = function(authData){
  return authData.google.displayName;
};

var getUid = function(authData){
  console.log('getUid Auth')
  return authData.uid;
};


var login = function(){
  ref.authWithOAuthPopup('google',function(error, authData) {
    if (error) {
      console.log('Login Failed!', error);
    } else {
      console.log('Authenticated successfully', authData.uid);
      if(authData && isNewUser){
        ref.child('users').child(authData.uid).set({
        name: getName(authData)
        })
      }
    };
  }, {remember: 'default'});
};

var logout = function(){
  console.log('logging user out')
  ref.unauth();
};

var logout = function(){
  ref.unauth();
  console.log('logged out')
};



var ref = new Firebase('https://dazzling-fire-2339.firebaseio.com');

var isNewUser = true;

var getName = function(authData){
  return authData.google.displayName;
};

var login = function(){
  ref.authWithOAuthPopup('google',function(error, authData) {
    if (error) {
      console.log('Login Failed!', error);
    } else {
      console.log('Authenticated successfully', authData.uid);
      if(authData && isNewUser){
        ref.child('users').child(authData.uid).set({
        provider: authData.provider,
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

function authDataCallback(authData) {
  if (authData) {
    document.getElementById('login').hide;

    console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
  } else {
    console.log('Auth data not found');
  }
}

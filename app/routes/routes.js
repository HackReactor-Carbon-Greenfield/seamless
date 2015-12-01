var path = require('path');
var morgan = require('morgan');


module.exports = function(app, express) {
  app.use(morgan('dev'));

  var router = express.Router();

  router.route('/api')

    .get(function(req, res) {
      res.sendFile(path.join(__dirname + '/../../public/index.html'));
    });
  
  return router;
};

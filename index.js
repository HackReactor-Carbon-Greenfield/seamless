var express = require('express');
var path = require('path');
var morgan = require('morgan');

var app = express();


app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));

//--------------------------------------------------------
// Routing:
//--------------------------------------------------------

var routes = require('./app/routes/routes.js')(app, express);
app.use('/api', routes);

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'));

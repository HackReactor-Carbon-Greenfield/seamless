var express = require('express');
var path = require('path');
var morgan = require('morgan');

var app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'));
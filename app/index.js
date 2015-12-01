var express = require('express');
var path = require('path');
var morgan = require('morgan');

var app = express();


app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));

//--------------------------------------------------------
// Routing:
//--------------------------------------------------------
var routes = require('./routes/routes.js')(app, express);
app.use('/', routes);

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'));

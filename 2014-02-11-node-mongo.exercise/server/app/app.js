'use strict';

var express = require('express');
var home = require('./routes/home');
var exercises = require('./routes/exercises');
var app = express();

app.set('port', process.env.PORT || 4000);
app.use(express.logger(':remote-addr -> :method :url [:status]'));
app.use(require('./lib/cors'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', home.index);
app.post('/exercises', exercises.create);
app.get('/exercises', exercises.index);
app.get('/exercises/:name', exercises.queryName);

var server = require('http').createServer(app);
server.listen(app.get('port'), function(){
  console.log('Node server listening. Port: ' + app.get('port'));
});


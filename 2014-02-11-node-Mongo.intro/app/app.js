'use strict';

var express = require('express');
var home = require('./routes/home');
var app = express();

app.set('port', process.env.PORT || 4000);
app.use(express.logger(':remote-addr -> :method :url [:status]'));
app.use(require('./lib/cors'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.post('/animals', home.create);
app.get('/animals', home.list);

var server = require('http').createServer(app);
server.listen(app.get('port'), function(){
  console.log('Node server listening. Port: ' + app.get('port'));
});


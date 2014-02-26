'use strict';

/* Answers */
var f1 = {country: 'USA', flag:'us'};
var f2 = {country: 'Canada', flag:'ca'};
var f3 = {country: 'Russia', flag:'ru'};
var f4 = {country: 'Italy', flag:'it'};
var f5 = {country: 'France', flag:'fr'};
var f6 = {country: 'Great Britain', flag:'gb'};
var f7 = {country: 'China', flag:'cn'};
var f8 = {country: 'Egypt', flag:'eg'};
var f9 = {country: 'Ireland', flag:'ie'};
var f10 = {country: 'Japan', flag:'jp'};
var f11 = {country: 'Mexico', flag:'mx'};
var f12 = {country: 'Morocco', flag:'ma'};
var f13 = {country: 'Norway', flag:'no'};
var f14 = {country: 'South Korea', flag:'kr'};
var f15 = {country: 'Spain', flag:'es'};
var f16 = {country: 'Sweden', flag:'se'};

global.flags = [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16];
/* End Answers */

var dbname = process.env.DBNAME;
var port = process.env.PORT || 4000;

var express = require('express');
var app = express();
var less = require('express-less');
var RedisStore = require('connect-redis')(express);
var initMongo = require('./lib/init-mongo');
var initRoutes = require('./lib/init-routes');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/* --- pipeline begins */
app.use(initMongo.connect);
app.use(initRoutes);
app.use(express.logger(':remote-addr -> :method :url [:status]'));
app.use(express.favicon());
app.use(express.static(__dirname + '/static'));
app.use('/less', less(__dirname + '/less'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  store : new RedisStore({host: 'localhost', port: 6379}),
  secret: 'change-this-to-a-super-secret-message',
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(app.router);
/* --- pipeline ends   */

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Database: ' + dbname);
});

module.exports = app;


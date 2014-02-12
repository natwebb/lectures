'use strict';

var Stock = require('../lib/stock');

exports.index = function(req, res){
  res.jsonp({ok:true});
};

exports.getquote = function(req, res){
  var s1 = new Stock(req.query.symbol);
  res.jsonp({stock: s1});
};

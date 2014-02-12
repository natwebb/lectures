'use strict';

var _ = require('lodash');

exports.product = function(req, res){
  var numbers = req.query.numbers.split(', ');
  var result = _.reduce(numbers, function(acc, e){
    return acc*e;
  }, 1);
  res.jsonp({product: result});
};

exports.namecalc = function(req, res){
  var names = req.query.names.split(', ');
  names = _.reject(names, function(e){return e.length%2===0;});
  var sum = _.reduce(names, function(acc, e){return acc + e.length;}, 0);
  var answer;
  if(sum%2===0){answer = sum*sum*sum;}
  else{answer = sum*sum;}
  res.jsonp({answer: answer});
};

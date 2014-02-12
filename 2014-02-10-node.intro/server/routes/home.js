'use strict';

exports.index = function(req, res){
  res.jsonp({ok:true});
};

exports.name = function(req, res){
  res.jsonp({name: 'My name is Node'});
};

exports.favcolor = function(req, res){
  res.jsonp({color: 'purple'});
};

exports.add = function(req, res){
  var total = parseFloat(req.params.a) + parseFloat(req.params.b);
  res.jsonp({sum: total});
};

exports.candrink = function(req, res){
  var verdict = '';
  if(req.params.b > 20){verdict = 'Yes, '+req.params.a+' can drink.';}
  else if(req.params.b < 18){verdict = 'No, '+req.params.a+' cannot drink.';}
  else{verdict = 'Maybe '+req.params.a+' can drink.';}
  res.jsonp({reply: verdict});
};

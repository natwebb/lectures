'use strict';

var _ = require('lodash');

exports.index = function(req, res){
  res.render('home/index', {title: 'Express Template'});
};

exports.calc = function(req, res){
  res.render('home/calc', {title: 'Calc You Later!'});
};

exports.add = function(req, res){
  var sum = parseInt(req.query.x) + parseInt(req.query.y);
  res.send({sum:sum});
};

exports.product = function(req, res){
  var nums = req.query.nums;
  nums = nums.split(',');
  var product = _.reduce(nums, function(acc, e){
    return acc * e;
  }, 1);
  res.send({product:product});
};

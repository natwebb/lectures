'use strict';

var _ = require('lodash');

exports.index = function(req, res){
  var random = _.random(6, 7);
  var flags = _.sample(global.flags, random);
  var countries = _.map(flags, function(flag){return flag.country;});
  flags = _.map(flags, function(flag){return flag.flag;});
  countries = _.shuffle(countries);
  flags = _.shuffle(flags);
  res.render('home/index', {flags: flags, countries: countries, title: 'Flags of the World'});
};

exports.check = function(req, res){
  var success = false;
  var country = _.find(global.flags, {'country':req.query.country});
  if(country.flag === req.query.flag){success = true;}
  res.send({success:success});
};

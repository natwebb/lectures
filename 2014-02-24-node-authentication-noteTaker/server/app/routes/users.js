'use strict';

var User = require('../models/user');

exports.create = function(req, res){
  var user = new User(req.body);
  user.hash(function(){
    user.insert(function(u){
      if(u){
        res.send({success: true});
      }else{
        res.send({success: false});
      }
    });
  });
};

exports.login = function(req, res){
  res.send({login:true});
};

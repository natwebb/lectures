'use strict';

var User = require('../models/user');

exports.auth = function(req, res){
  res.render('users/auth', {title:'User Authentication'});
};

exports.register = function(req, res){
  var user = new User(req.body);
  user.hashPassword(function(){
    user.insert(function(){
      if(user._id){
        res.send({result:true});
      }else{
        res.send({result:false});
      }
    });
  });
};

exports.login = function(req, res){
  User.findByEmailAndPassword(req.body.email, req.body.password, function(user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id.toString();
        req.session.save(function(){
          res.send({result:true});
        });
      });
    }else{
      req.session.destroy(function(){
        res.send({result:false});
      });
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};

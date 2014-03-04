'use strict';

module.exports = User;

var bcrypt = require('bcrypt');
var users = global.nss.db.collection('users');
var Mongo = require('mongodb');

function User(data){
  this.email = data.email;
  this.password = data.password;
}

User.prototype.hashPassword = function(fn){
  var self = this;
  bcrypt.hash(this.password, 8, function(err, hash){
    self.password = hash;
    fn();
  });
};

User.prototype.insert = function(fn){
  var self = this;
  users.find({email:this.email}).toArray(function(err, records){
    if(records.length === 0){
      users.insert(self, function(err, records){
        fn();
      });
    }else{
      fn();
    }
  });
};

User.findById = function(id, fn){
  var _id = new Mongo.ObjectID(id);
  users.findOne({_id:_id}, function(err, record){
    fn(record);
  });
};

User.findByEmail = function(email, fn){
  users.findOne({email:email}, function(err, record){
    fn(record);
  });
};

User.findByEmailAndPassword = function(eml, pwd, fn){
  users.findOne({email:eml}, function(err, record){
    if(record){
      bcrypt.compare(pwd, record.password, function(err, result){
        if(result){
          fn(record);
        }else{
          fn(null);
        }
      });
    }else{
      fn(null);
    }
  });
};

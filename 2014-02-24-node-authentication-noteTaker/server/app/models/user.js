'use strict';

var bcrypt = require('bcrypt');
var users = global.nss.db.collection('users');

module.exports = User;

function User(data){
  this.email = data.email;
  this.password = data.password;
}

User.prototype.hash = function(fn){
  var self = this;
  bcrypt.hash(this.password, 8, function(err, hash){
    self.password = hash;
    fn();
  });
};

User.prototype.insert = function(fn){
  var self = this;
  console.log(this.email);
  users.findOne({email:this.email}, function(err, record){
    if(record){
      fn(null);
    }else{
      users.insert(self, function(err, records){
        fn(records[0]);
      });
    }
  });
};

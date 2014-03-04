/* jshint expr:true */

'use strict';

process.env.DBNAME = 'note2-test';
var expect = require('chai').expect;
var User;

describe('User', function(){
  var u1;
  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      u1 = new User({email:'sue@aol.com', password:'678utf'});
      u1.hashPassword(function(){
        u1.insert(function(){
          done();
        });
      });
    });
  });

  describe('new', function(){
    it('should create a new User object', function(){
      u1 = new User({email:'bob@aol.com', password:'123abc'});
      expect(u1).to.be.instanceof(User);
      expect(u1.email).to.equal('bob@aol.com');
      expect(u1.password).to.equal('123abc');
    });
  });

  describe('#hashPassword', function(){
    it('should hash a password with salt', function(done){
      u1 = new User({email:'bob@aol.com', password:'123abc'});
      u1.hashPassword(function(){
        expect(u1.password).to.not.equal('123abc');
        done();
      });
    });
  });

  describe('#insert', function(){
    it('should insert a new user', function(done){
      u1 = new User({email:'bob@aol.com', password:'123abc'});
      u1.hashPassword(function(){
        u1.insert(function(){
          expect(u1._id.toString()).to.have.length(24);
          done();
        });
      });
    });

    it('should not insert a user if a duplicate email exists', function(done){
      u1 = new User({email:'sue@aol.com', password:'123abc'});
      u1.hashPassword(function(){
        u1.insert(function(){
          expect(u1).to.not.have.property('_id');
          done();
        });
      });
    });
  });

  describe('find methods', function(){
    describe('findById', function(){
      it('should return object with matching ID', function(done){
        User.findById(u1._id.toString(), function(record){
          expect(record._id).to.deep.equal(u1._id);
          done();
        });
      });
    });

    describe('findByEmailAndPassword', function(){
      it('should return a user by email and password', function(done){
        User.findByEmailAndPassword('sue@aol.com', '678utf', function(record){
          expect(record._id).to.deep.equal(u1._id);
          done();
        });
      });
      it('should not return a user with wrong email', function(done){
        User.findByEmailAndPassword('bad@aol.com', '678utf', function(record){
          expect(record).to.be.null;
          done();
        });
      });
      it('should not return a user with wrong password', function(done){
        User.findByEmailAndPassword('sue@aol.com', '402fij', function(record){
          expect(record).to.be.null;
          done();
        });
      });
    });


    describe('findByEmail', function(){
      it('should return object with matching email', function(done){
        User.findByEmail(u1.email, function(record){
          expect(record.email).to.deep.equal('sue@aol.com');
          done();
        });
      });
    });
  });

});

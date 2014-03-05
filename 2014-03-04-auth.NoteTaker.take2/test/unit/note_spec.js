/* jshint expr:true */

'use strict';

process.env.DBNAME = 'note2-test';
var expect = require('chai').expect;
var Mongo = require('mongodb');
var Note, User;
var u1, u2;

describe('Note', function(){
  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Note = require('../../app/models/note');
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
    it('should create a new Note object', function(){
      var n1 = new Note({title:'Node', body:'This is a test', dateCreated:'2014-03-05', tags:'homework, code, school', userId:u1._id.toString()});
      expect(n1.title).to.deep.equal('Node');
      expect(n1).to.be.instanceof(Note);
      expect(n1.body).to.deep.equal('This is a test');
      expect(n1.dateCreated).to.be.instanceof(Date);
      expect(n1.tags).to.have.length(3);
      expect(n1.userId).to.be.instanceof(Mongo.ObjectID);
    });

    it('should default to today\'s date and an empty array if no tags', function(){
      var n1 = new Note({title:'Node', body:'This is a test', dateCreated:'', tags:'', userId:u1._id.toString()});
      expect(n1.dateCreated).to.deep.equal(new Date());
      expect(n1.tags).to.have.length(0);
    });
  });

  describe('#insert', function(){
    it('should insert the note into the db', function(done){
      var n1 = new Note({title:'Node', body:'This is a test', dateCreated:'2014-03-05', tags:'homework, code, school', userId:u1._id.toString()});
      n1.insert(function(){
        expect(n1._id.toString()).to.have.length(24);
        done();
      });
    });
  });

  describe('find methods', function(){

    beforeEach(function(done){
      u2 = new User({email:'bob@aol.com', password:'456hij'});
      u2.hashPassword(function(){
        u2.insert(function(){
          done();
        });
      });
    });

    describe('.findByUserId', function(){
      it('should find all notes created by user', function(done){
        var n1 = new Note({title:'Node1', body:'This is a test1', dateCreated:'2014-03-05', tags:'homework, code, school', userId:u1._id.toString()});
        n1.insert(function(){
          var n2 = new Note({title:'Node2', body:'This is a test2', dateCreated:'2014-03-05', tags:'homework, code, school', userId:u2._id.toString()});
          n2.insert(function(){
            var n3 = new Note({title:'Node3', body:'This is a test3', dateCreated:'2014-03-05', tags:'homework, code, school', userId:u1._id.toString()});
            n3.insert(function(){
              var n4 = new Note({title:'Node4', body:'This is a test4', dateCreated:'2014-03-05', tags:'homework, code, school', userId:u2._id.toString()});
              n4.insert(function(){
                Note.findByUserId(u1._id.toString(), function(records){
                  expect(records).to.have.length(2);
                  done();
                });
              });
            });
          });
        });
      });
    });

  });

});

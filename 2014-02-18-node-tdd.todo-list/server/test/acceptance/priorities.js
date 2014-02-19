/* jshint expr: true */

'use strict';

process.env.DBNAME = 'todo-test';
var app = require('../../app/app');
var request = require('supertest');
var expect = require('chai').expect;
var Priority;

describe('priorities', function(){

  before(function(done){
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      Priority = global.nss.Priority;
      done();
    });
  });

  beforeEach(function(done){
    var p1 = new Priority({name: 'High', value: '10'});
    var p2 = new Priority({name: 'Medium', value: '5'});
    var p3 = new Priority({name: 'Low', value: '1'});

    p1.save(function(){
      p2.save(function(){
        p3.save(function(){
          done();
        });
      });
    });
  });

  afterEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('POST /priorities', function(){
    it('should create a new priority', function(done){
      request(app)
      .post('/priorities')
      .send({name:'Medium-Low', value:'3'})
      .end(function(err, res){
        expect(res.body.name).to.equal('Medium-Low');
        expect(res.body.value).to.deep.equal(3);
        expect(res.body._id).to.have.length(24);
        done();
      });
    });
  });

  describe('GET /priorities', function(){
    it('should return all priorities in the database', function(done){
      request(app)
      .get('/priorities')
      .end(function(err, res){
        expect(res.body.priorities).to.have.length(3);
        expect(res.body.priorities[0].name).to.be.ok;
        expect(res.body.priorities[0].value).to.be.above(0);
        expect(res.body.priorities[0]._id).to.have.length(24);
        done();
      });
    });
  });

  describe('GET /priorities/id', function(){
    it('should return one priority by ID', function(done){
      Priority.findByName('Medium', function(priority){
        var id = priority._id.toString();
        request(app)
        .get('/priorities/' + id)
        .end(function(err, res){
          expect(res.body._id).to.equal(id);
          expect(res.body.name).to.equal('Medium');
          done();
        });
      });
    });
  });

  describe('PUT /dogs/id', function(){
    it('should update one priority by ID', function(done){
      Priority.findByName('Medium', function(priority){
        var id = priority._id.toString();
        request(app)
        .put('/priorities/' + id)
        .send({name:'Medium-Low', value:'3'})
        .end(function(err, res){
          expect(res.body.name).to.equal('Medium-Low');
          expect(res.body.value).to.deep.equal('3');
          expect(res.body._id).to.have.length(24);
          done();
        });
      });
    });
  });

  describe('DELETE /dogs/id', function(){
    it('should delete one priority by ID', function(done){
      Priority.findByName('Medium', function(priority){
        var id = priority._id.toString();
        request(app)
        .del('/priorities/' + id)
        .end(function(err, res){
          expect(res.body.count).to.equal(1);
          expect(res.body.deletedPriority).to.be.ok;
          done();
        });
      });
    });
  });

});

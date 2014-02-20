/* jshint expr:true */

'use strict';

process.env.DBNAME = 'todo-test';
var app = require('../../app/app');
var request = require('supertest');
var expect = require('chai').expect;
var Priority, Todo, db, pIds, tId;

describe('to-dos', function(){

  before(function(done){
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      db = global.nss.db;
      Priority = global.nss.Priority;
      Todo = global.nss.Todo;
      done();
    });
  });

  beforeEach(function(done){
    var p1 = new Priority({name:'High', value:'10'});
    var p2 = new Priority({name:'Medium', value:'5'});
    var p3 = new Priority({name:'Low', value:'1'});
    db.dropDatabase(function(){
      p1.save(function(newP1){
        p2.save(function(newP2){
          p3.save(function(newP3){
            pIds = [newP1._id, newP2._id, newP3._id];
            var obj = {name:'Laundry', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry, self-care', priorityId:pIds[1]};
            var t1 = new Todo(obj);
            obj = {name:'Gym', dueDate:'02/24/2014', isComplete:false, tags:'gym, self-care', priorityId:pIds[1]};
            var t2 = new Todo(obj);
            obj = {name:'Homework', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
            var t3 = new Todo(obj);

            t1.save(function(){
              t2.save(function(){
                t3.save(function(newT3){
                  tId = newT3._id.toString();
                  done();
                });
              });
            });
          });
        });
      });
    });
  });

  describe('POST /todos', function(){
    it('should create a new todo', function(done){
      request(app)
      .post('/todos')
      .send({name:'Clean the house', dueDate:'02/27/2014', isComplete:false, tags:'home, Molly', priorityId:pIds[1]})
      .end(function(err, res){
        expect(res.body.name).to.equal('Clean the house');
        expect(res.body.isComplete).to.be.false;
        expect(res.body.tags).to.be.an.instanceof(Array);
        expect(res.body.priorityId).to.equal(pIds[1].toString());
        expect(res.body._id).to.have.length(24);
        done();
      });
    });
  });

  describe('GET /todos', function(){
    it('should return all todos in the database', function(done){
      request(app)
      .get('/todos')
      .end(function(err, res){
        expect(res.body.todos).to.have.length(3);
        expect(res.body.todos[0].name).to.be.ok;
        done();
      });
    });
  });

  describe('GET /todos/id', function(){
    it('should return one todo by id', function(done){
      request(app)
      .get('/todos/'+tId)
      .end(function(err, res){
        expect(res.body._id).to.equal(tId);
        expect(res.body.name).to.equal('Homework');
        done();
      });
    });
  });

  describe('PUT /todos/id', function(){
    it('should update one todo by id', function(done){
      request(app)
      .put('/todos/'+tId)
      .send({name:'Clean the house', dueDate:'02/27/2014', isComplete:false, tags:'home, Molly', priorityId:pIds[1]})
      .end(function(err, res){
        expect(res.body.name).to.equal('Clean the house');
        expect(res.body._id).to.have.length(24);
        done();
      });
    });
  });

  describe('DELETE /todos/id', function(){
    it('should delete one todo by id', function(done){
      request(app)
      .del('/todos/'+tId)
      .end(function(err, res){
        expect(res.body.count).to.equal(1);
        expect(res.body.deletedTodo).to.be.ok;
        done();
      });
    });
  });

  describe('GET /todos/search/id', function(){
    it('should return an array of to-dos by priority ID', function(done){
      request(app)
      .get('/todos/priority/'+pIds[1])
      .end(function(err, res){
        expect(res.body.todos).to.have.length(2);
        expect(res.body.todos[0].priorityId).to.equal(pIds[1].toString());
        done();
      });
    });

    it('should return an array of to-dos by isComplete', function(done){
      request(app)
      .get('/todos/complete/false')
      .end(function(err, res){
        expect(res.body.todos).to.have.length(2);
        expect(res.body.todos[0].isComplete).to.be.false;
        done();
      });
    });

    it('should return an array of to-dos by tag', function(done){
      request(app)
      .get('/todos/tag/self-care')
      .end(function(err, res){
        expect(res.body.todos).to.have.length(2);
        expect(res.body.todos[0].tags).to.be.instanceof(Array);
        done();
      });
    });
  });

});

/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var Todo;
var Priority;
var db;
var pIds;

describe('To-Do', function(){

  before(function(done){
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      db = global.nss.db;
      Todo = global.nss.Todo;
      Priority = global.nss.Priority;
      done();
    });
  });

  beforeEach(function(done){
    var p1 = new Priority({name: 'Low', value: '1'});
    var p2 = new Priority({name: 'Medium', value: '5'});
    var p3 = new Priority({name: 'High', value: '10'});
    db.dropDatabase(function(){
      p1.save(function(newP1){
        p2.save(function(newP2){
          p3.save(function(newP3){
            pIds = [newP1._id, newP2._id, newP3._id];
            done();
          });
        });
      });
    });
  });

  describe('new', function(){
    it('should create a new to-do', function(){
      var obj = {name:'Laundry', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry', priorityId:pIds[1]};
      var t1 = new Todo(obj);

      expect(t1).to.be.an.instanceof(Todo);
      expect(t1).to.have.property('name').that.deep.equals('Laundry');
      expect(t1).to.have.property('dueDate').that.is.an.instanceof(Date);
      expect(t1).to.have.property('isComplete').that.deep.equals(false);
      expect(t1).to.have.property('tags').that.deep.equals(['home', 'laundry']);
      expect(t1).to.have.property('priorityId');
    });
  });

  describe('#save', function(){
    it('should save a to-do to the database', function(done){
      var obj = {name:'Laundry', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry', priorityId:pIds[0]};
      var t1 = new Todo(obj);

      t1.save(function(savedTodo){
        expect(savedTodo).to.be.an.instanceof(Todo);
        expect(savedTodo).to.have.property('_id').and.be.ok;
        done();
      });
    });

    it('should allow to-dos to update if they already exist', function(done){
      var obj = {name:'Laundry', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry', priorityId:pIds[0]};
      var t1 = new Todo(obj);

      t1.save(function(){
        t1.name = 'Gym';
        t1.isComplete = true;
        t1.save(function(count){
          expect(count).to.equal(1);
          done();
        });
      });
    });
  });

  describe('.findAll', function(){
    it('should return all todos in the db', function(done){
      var obj = {name:'Laundry', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry', priorityId:pIds[0]};
      var t1 = new Todo(obj);
      obj = {name:'Gym', dueDate:'02/24/2014', isComplete:false, tags:'gym', priorityId:pIds[1]};
      var t2 = new Todo(obj);
      obj = {name:'Homework', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t3 = new Todo(obj);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findAll(function(todos){
              expect(todos).to.have.length(3);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findById', function(){
    it('should return a to-do based on ID', function(done){
      var obj = {name:'Laundry', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry', priorityId:pIds[0]};
      var t1 = new Todo(obj);
      obj = {name:'Gym', dueDate:'02/24/2014', isComplete:false, tags:'gym', priorityId:pIds[1]};
      var t2 = new Todo(obj);
      obj = {name:'Homework', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t3 = new Todo(obj);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            var testId = t2._id.toString();
            Todo.findById(testId, function(todo){
              expect(todo).to.be.an.instanceof(Todo);
              expect(todo._id).to.deep.equal(t2._id);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByComplete', function(){
    it('should return an array of to-dos with isComplete = true', function(done){
      var obj = {name:'Laundry', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry', priorityId:pIds[0]};
      var t1 = new Todo(obj);
      obj = {name:'Gym', dueDate:'02/24/2014', isComplete:false, tags:'gym', priorityId:pIds[1]};
      var t2 = new Todo(obj);
      obj = {name:'Homework', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t3 = new Todo(obj);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByComplete(true, function(todos){
              expect(todos).to.have.length(1);
              done();
            });
          });
        });
      });
    });

    it('should return an array of to-dos with isComplete = false', function(done){
      var obj = {name:'Laundry', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry', priorityId:pIds[0]};
      var t1 = new Todo(obj);
      obj = {name:'Gym', dueDate:'02/24/2014', isComplete:false, tags:'gym', priorityId:pIds[1]};
      var t2 = new Todo(obj);
      obj = {name:'Homework', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t3 = new Todo(obj);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByComplete(false, function(todos){
              expect(todos).to.have.length(2);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByPriority', function(){
    it('should return all to-dos with a certain priority', function(done){
      var obj = {name:'Laundry', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry', priorityId:pIds[0]};
      var t1 = new Todo(obj);
      obj = {name:'Gym', dueDate:'02/24/2014', isComplete:false, tags:'gym', priorityId:pIds[0]};
      var t2 = new Todo(obj);
      obj = {name:'Homework', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t3 = new Todo(obj);

      var id = pIds[0].toString();

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByPriority(id, function(todos){
              expect(todos).to.have.length(2);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByTag', function(){
    it('should return all to-dos with a certain tag', function(done){
      var obj = {name:'Laundry', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry, self-care', priorityId:pIds[0]};
      var t1 = new Todo(obj);
      obj = {name:'Gym', dueDate:'02/24/2014', isComplete:false, tags:'gym, self-care', priorityId:pIds[0]};
      var t2 = new Todo(obj);
      obj = {name:'Homework', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t3 = new Todo(obj);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByTag('self-care', function(todos){
              expect(todos).to.have.length(2);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByName', function(){
    it('should return all to-dos with a certain name', function(done){
      var obj = {name:'Laundry', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry, self-care', priorityId:pIds[0]};
      var t1 = new Todo(obj);
      obj = {name:'Laundry', dueDate:'02/24/2014', isComplete:false, tags:'gym, self-care', priorityId:pIds[0]};
      var t2 = new Todo(obj);
      obj = {name:'Homework', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t3 = new Todo(obj);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByName('Laundry', function(todos){
              expect(todos).to.have.length(2);
              done();
            });
          });
        });
      });
    });
  });

  describe('.deleteById', function(){
    it('should delete a to-do based on ID', function(done){
      var obj = {name:'Laundry', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry', priorityId:pIds[0]};
      var t1 = new Todo(obj);
      obj = {name:'Gym', dueDate:'02/24/2014', isComplete:false, tags:'gym', priorityId:pIds[1]};
      var t2 = new Todo(obj);
      obj = {name:'Homework', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t3 = new Todo(obj);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            var testId = t2._id.toString();
            Todo.deleteById(testId, function(count, deletedTodo){
              expect(deletedTodo).to.be.an.instanceof(Todo);
              expect(count).to.deep.equal(1);
              done();
            });
          });
        });
      });
    });
  });

});

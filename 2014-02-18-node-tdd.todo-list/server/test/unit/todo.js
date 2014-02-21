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

  describe('.findByPage', function(){
    it('should return groups of 5 by page #', function(done){
      var obj = {name:'One', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry, self-care', priorityId:pIds[0]};
      var t1 = new Todo(obj);
      obj = {name:'Two', dueDate:'02/24/2014', isComplete:false, tags:'gym, self-care', priorityId:pIds[0]};
      var t2 = new Todo(obj);
      obj = {name:'Three', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t3 = new Todo(obj);
      obj = {name:'Four', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t4 = new Todo(obj);
      obj = {name:'Five', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t5 = new Todo(obj);
      obj = {name:'Get pagination working', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t6 = new Todo(obj);
      obj = {name:'Seven', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t7 = new Todo(obj);
      obj = {name:'Eight', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t8 = new Todo(obj);
      obj = {name:'Nine', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t9 = new Todo(obj);
      obj = {name:'Ten', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t10 = new Todo(obj);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            t4.save(function(){
              t5.save(function(){
                t6.save(function(){
                  t7.save(function(){
                    t8.save(function(){
                      t9.save(function(){
                        t10.save(function(){
                          Todo.findByPage(5, 2, function(todos){
                            expect(todos).to.have.length(5);
                            expect(todos[0].name).to.equal('Get pagination working');
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
        });
      });
    });
  });

  describe('.masterFind', function(){
    it('should return only things with tag homework', function(done){
      var obj = {name:'One', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry, self-care', priorityId:pIds[0]};
      var t1 = new Todo(obj);
      obj = {name:'Two', dueDate:'02/24/2014', isComplete:false, tags:'gym, self-care', priorityId:pIds[0]};
      var t2 = new Todo(obj);
      obj = {name:'Three', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[1]};
      var t3 = new Todo(obj);
      obj = {name:'Four', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t4 = new Todo(obj);
      obj = {name:'Five', dueDate:'03/01/2014', isComplete:false, tags:'school, homework', priorityId:pIds[1]};
      var t5 = new Todo(obj);
      obj = {name:'Get pagination working', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t6 = new Todo(obj);
      obj = {name:'Seven', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t7 = new Todo(obj);
      obj = {name:'Eight', dueDate:'03/01/2014', isComplete:false, tags:'school, homework', priorityId:pIds[2]};
      var t8 = new Todo(obj);
      obj = {name:'Nine', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[1]};
      var t9 = new Todo(obj);
      obj = {name:'Ten', dueDate:'03/01/2014', isComplete:false, tags:'school, homework', priorityId:pIds[2]};
      var t10 = new Todo(obj);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            t4.save(function(){
              t5.save(function(){
                t6.save(function(){
                  t7.save(function(){
                    t8.save(function(){
                      t9.save(function(){
                        t10.save(function(){
                          Todo.masterFind({tag:'homework'}, function(records){
                            expect(records).to.have.length(8);
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
        });
      });
    });

    it('should return only things with priority high', function(done){
      var obj = {name:'One', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry, self-care', priorityId:pIds[0]};
      var t1 = new Todo(obj);
      obj = {name:'Two', dueDate:'02/24/2014', isComplete:false, tags:'gym, self-care', priorityId:pIds[0]};
      var t2 = new Todo(obj);
      obj = {name:'Three', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[1]};
      var t3 = new Todo(obj);
      obj = {name:'Four', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t4 = new Todo(obj);
      obj = {name:'Five', dueDate:'03/01/2014', isComplete:false, tags:'school, homework', priorityId:pIds[1]};
      var t5 = new Todo(obj);
      obj = {name:'Get pagination working', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t6 = new Todo(obj);
      obj = {name:'Seven', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t7 = new Todo(obj);
      obj = {name:'Eight', dueDate:'03/01/2014', isComplete:false, tags:'school, homework', priorityId:pIds[2]};
      var t8 = new Todo(obj);
      obj = {name:'Nine', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[1]};
      var t9 = new Todo(obj);
      obj = {name:'Ten', dueDate:'03/01/2014', isComplete:false, tags:'school, homework', priorityId:pIds[2]};
      var t10 = new Todo(obj);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            t4.save(function(){
              t5.save(function(){
                t6.save(function(){
                  t7.save(function(){
                    t8.save(function(){
                      t9.save(function(){
                        t10.save(function(){
                          Todo.masterFind({priorityId:pIds[2].toString()}, function(records){
                            expect(records).to.have.length(5);
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
        });
      });
    });

    /*it('should return the second page of 4 things sorted by priority', function(done){
      var obj = {name:'One', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry, self-care', priorityId:pIds[0]};
      var t1 = new Todo(obj);
      obj = {name:'Two', dueDate:'02/24/2014', isComplete:false, tags:'gym, self-care', priorityId:pIds[0]};
      var t2 = new Todo(obj);
      obj = {name:'Three', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[1]};
      var t3 = new Todo(obj);
      obj = {name:'Four', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t4 = new Todo(obj);
      obj = {name:'Five', dueDate:'03/01/2014', isComplete:false, tags:'school, homework', priorityId:pIds[1]};
      var t5 = new Todo(obj);
      obj = {name:'Get pagination working', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t6 = new Todo(obj);
      obj = {name:'Seven', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t7 = new Todo(obj);
      obj = {name:'Eight', dueDate:'03/01/2014', isComplete:false, tags:'school, homework', priorityId:pIds[2]};
      var t8 = new Todo(obj);
      obj = {name:'Nine', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[1]};
      var t9 = new Todo(obj);
      obj = {name:'Ten', dueDate:'03/01/2014', isComplete:false, tags:'school, homework', priorityId:pIds[2]};
      var t10 = new Todo(obj);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            t4.save(function(){
              t5.save(function(){
                t6.save(function(){
                  t7.save(function(){
                    t8.save(function(){
                      t9.save(function(){
                        t10.save(function(){
                          Todo.masterFind({sort:'priority', page:'2', limit:'4', order:'desc'}, function(records){
                            expect(records).to.have.length(4);
                            expect(records[0].priorityId).to.equal(pIds[2]);
                            expect(records[3].priorityId).to.equal(pIds[1]);
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
        });
      });
    });*/

    it('should return the third page of 3 things sorted ascending by dueDate', function(done){
      var obj = {name:'One', dueDate:'02/21/2014', isComplete:false, tags:'home, laundry, self-care', priorityId:pIds[0]};
      var t1 = new Todo(obj);
      obj = {name:'Two', dueDate:'02/24/2014', isComplete:false, tags:'gym, self-care', priorityId:pIds[0]};
      var t2 = new Todo(obj);
      obj = {name:'Three', dueDate:'03/23/2014', isComplete:true, tags:'school, homework', priorityId:pIds[1]};
      var t3 = new Todo(obj);
      obj = {name:'Four', dueDate:'03/21/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t4 = new Todo(obj);
      obj = {name:'Five', dueDate:'03/09/2014', isComplete:false, tags:'school, homework', priorityId:pIds[1]};
      var t5 = new Todo(obj);
      obj = {name:'Get pagination working', dueDate:'03/01/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t6 = new Todo(obj);
      obj = {name:'Seven', dueDate:'04/17/2014', isComplete:true, tags:'school, homework', priorityId:pIds[2]};
      var t7 = new Todo(obj);
      obj = {name:'Eight', dueDate:'03/01/2013', isComplete:false, tags:'school, homework', priorityId:pIds[2]};
      var t8 = new Todo(obj);
      obj = {name:'Nine', dueDate:'03/01/2015', isComplete:true, tags:'school, homework', priorityId:pIds[1]};
      var t9 = new Todo(obj);
      obj = {name:'Ten', dueDate:'03/01/2014', isComplete:false, tags:'school, homework', priorityId:pIds[2]};
      var t10 = new Todo(obj);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            t4.save(function(){
              t5.save(function(){
                t6.save(function(){
                  t7.save(function(){
                    t8.save(function(){
                      t9.save(function(){
                        t10.save(function(){
                          Todo.masterFind({sort:'dueDate', page:'3', limit:'3', order:'asc'}, function(records){
                            console.log(records);
                            expect(records).to.have.length(3);
                            expect(records[0].dueDate.toDateString()).to.equal('Fri Mar 21 2014');
                            expect(records[2].dueDate.toDateString()).to.equal('Thu Apr 17 2014');
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

/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var Priority;
var db;

describe('Priority', function(){

  before(function(done){
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      db = global.nss.db;
      Priority = global.nss.Priority;
      done();
    });
  });

  beforeEach(function(done){
    db.dropDatabase(function(){
      done();
    });
  });

  describe('new', function(){
    it('should create a new Priority', function(){
      var obj = {name:'High', value:'10'};
      var p1 = new Priority(obj);

      expect(p1).to.be.an.instanceof(Priority);
      expect(p1).to.have.property('name').that.deep.equals('High');
      expect(p1).to.have.property('value').that.deep.equals(10);
    });
  });

  describe('#save', function(){
    it('should save a priority object into the database', function(done){
      var obj = {name:'High', value:'10'};
      var p1 = new Priority(obj);
      p1.save(function(savedPriority){
        expect(savedPriority).to.be.an.instanceof(Priority);
        expect(savedPriority).to.have.property('_id').and.be.ok;
        done();
      });
    });

    it('should not create duplicate priorities based on name', function(done){
      var p1 = new Priority({name: 'High', value:'10'});
      var p2 = new Priority({name: 'Medium', value:'5'});
      var p3 = new Priority({name: 'High', value:'1'});
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findAll(function(priorities){
              expect(priorities).to.have.length(2);
              done();
            });
          });
        });
      });
    });

    it('should allow properties to be updated on existing priorities', function(done){
      var p1 = new Priority({name: 'High', value:'10'});
      var p2 = new Priority({name: 'High', value:'8'});
      p1.save(function(){
        p1.name = 'High';
        p1.value = '3';
        var startId = p1._id.toString();
        p1.save(function(){
          p2.save(function(){
            Priority.findById(startId, function(priority){
              expect(priority).to.have.property('name').that.deep.equals('High');
              expect(priority).to.have.property('value').that.deep.equals(3);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findAll', function(){
    it('should return all Priorities in the database', function(done){
      var p1 = new Priority({name: 'High', value:'10'});
      var p2 = new Priority({name: 'Medium', value:'5'});
      var p3 = new Priority({name: 'Low', value:'1'});
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findAll(function(priorities){
              expect(priorities).to.have.length(3);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByName', function(){
    it('should return the desired priority object', function(done){
      var p1 = new Priority({name: 'High', value:'10'});
      var p2 = new Priority({name: 'Medium', value:'5'});
      var p3 = new Priority({name: 'Low', value:'1'});
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findByName('Medium', function(foundPriority){
              expect(foundPriority).to.be.an.instanceof(Priority);
              expect(foundPriority).to.have.property('name', 'Medium');
              done();
            });
          });
        });
      });
    });
  });

  describe('.findById', function(){
    it('should return the desired priority object', function(done){
      var p1 = new Priority({name: 'High', value:'10'});
      var p2 = new Priority({name: 'Medium', value:'5'});
      var p3 = new Priority({name: 'Low', value:'1'});
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            var id = p1._id.toString();
            Priority.findById(id, function(foundPriority){
              expect(foundPriority).to.be.an.instanceof(Priority);
              expect(foundPriority._id).to.deep.equal(p1._id);
              done();
            });
          });
        });
      });
    });
  });

  describe('.deleteById', function(){
    it('should delete a single priority by ID', function(done){
      var p1 = new Priority({name: 'High', value:'10'});
      var p2 = new Priority({name: 'Medium', value:'5'});
      var p3 = new Priority({name: 'Low', value:'1'});
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            var id = p1._id.toString();
            Priority.deleteById(id, function(count, deletedPriority){
              Priority.findAll(function(records){
                expect(records.length).to.deep.equal(2);
                expect(count).to.deep.equal(1);
                expect(deletedPriority._id).to.deep.equal(p1._id);
                done();
              });
            });
          });
        });
      });
    });
  });

});

'use strict';

module.exports = Todo;
var todos = global.nss.db.collection('todos');
var mongodb = require('mongodb');

function Todo(data){
  this.name = data.name;
  if(data.dueDate instanceof Date||data.dueDate.match(/(\d){2}\/(\d){2}\/(\d){4}/)){
    this.dueDate = new Date(data.dueDate);
  }
  this.isComplete = data.isComplete || false;
  if(data.tags instanceof Array){
    this.tags = data.tags;
  }else{
    this.tags = data.tags.split(', ');
  }
  this.priorityId = data.priorityId;
  this._id = data._id;
}

Todo.prototype.save = function(fn){
  todos.save(this, function(err, record){ /*returns the saved to-do if first time, otherwise returns a count of updated records */
    fn(record);
  });
};

Todo.findAll = function(fn){
  todos.find().toArray(function(err, records){
    fn(records);
  });
};

Todo.findById = function(idString, fn){
  var id = new mongodb.ObjectID(idString);
  todos.findOne({_id:id}, function(err, record){
    fn(new Todo(record));
  });
};

Todo.findByComplete = function(complete, fn){
  todos.find({isComplete:complete}).toArray(function(err, records){
    fn(records);
  });
};

Todo.findByPriority = function(idString, fn){
  var id = new mongodb.ObjectID(idString);
  todos.find({priorityId:id}).toArray(function(err, records){
    fn(records);
  });
};

Todo.findByTag = function(tag, fn){
  todos.find({tags:tag}).toArray(function(err, records){
    fn(records);
  });
};

Todo.findByName = function(name, fn){
  todos.find({name:name}).toArray(function(err, records){
    fn(records);
  });
};

Todo.deleteById = function(idString, fn){
  var id = new mongodb.ObjectID(idString);
  Todo.findById(idString, function(record){
    var deletedTodo = record;
    todos.remove({_id:id}, function(err, count){
      fn(count, deletedTodo);
    });
  });
};

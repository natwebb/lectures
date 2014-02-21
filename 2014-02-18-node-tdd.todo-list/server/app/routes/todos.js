'use strict';

var Priority, Todo;
var mongodb = require('mongodb');

exports.create = function(req, res){
  init();

  var t1 = new Todo(req.body);
  t1.save(function(){
    res.send(t1);
  });
};

exports.index = function(req, res){
  init();
  if(req.query){
    Todo.masterFind(req.query, function(records){
      res.send({todos:records});
    });
  }
  else{
    Todo.findAll(function(records){
      res.send({todos:records});
    });
  }
};

exports.show = function(req, res){
  init();

  Todo.findById(req.params.id, function(record){
    res.send(record);
  });
};

exports.update = function(req, res){
  init();

  var t1 = new Todo(req.body);
  t1._id = new mongodb.ObjectID(req.params.id);
  t1.save(function(){
    res.send(t1);
  });
};

exports.destroy = function(req, res){
  init();

  Todo.deleteById(req.params.id, function(count, deletedTodo){
    res.send({count:count, deletedTodo:deletedTodo});
  });
};

exports.searchBy = function(req, res){
  init();

  if(req.params.search==='priority'){
    Todo.findByPriority(req.params.data, function(records){
      res.send({todos:records});
    });
  }
  else if(req.params.search==='complete'){
    var b = (req.params.data==='true');
    Todo.findByComplete(b, function(records){
      res.send({todos:records});
    });
  }
  else if(req.params.search==='tag'){
    Todo.findByTag(req.params.data, function(records){
      res.send({todos:records});
    });
  }

};

function init(){
  Priority = global.nss.Priority;
  Todo = global.nss.Todo;
}

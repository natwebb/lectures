'use strict';

var Priority;

exports.create = function(req, res){
  init();

  var p1 = new Priority(req.body);
  p1.save(function(){
    res.send(p1);
  });
};

exports.index = function(req, res){
  init();

  Priority.findAll(function(priorities){
    res.send({priorities:priorities});
  });
};

exports.show = function(req, res){
  init();

  Priority.findById(req.params.id, function(priority){
    res.send(priority);
  });
};

exports.update = function(req, res){
  init();

  Priority.findById(req.params.id, function(priority){
    priority.name = req.body.name;
    priority.value = req.body.value;
    priority.save(function(){
      res.send(priority);
    });
  });
};

exports.destroy = function(req, res){
  init();

  Priority.deleteById(req.params.id, function(count, deletedPriority){
    res.send({count:count, deletedPriority:deletedPriority});
  });
};

function init(){
  Priority = global.nss.Priority;
}

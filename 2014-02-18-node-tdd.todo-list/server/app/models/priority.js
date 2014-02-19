'use strict';

module.exports = Priority;
var priorities = global.nss.db.collection('priorities');
var mongodb = require('mongodb');

function Priority(data){
  this.name = data.name;
  this.value= parseInt(data.value);
  this._id = data._id;
}

Priority.prototype.save = function(fn){
  var self = this;

  if(self._id){
    priorities.save(self, function(err, record){
      fn(record);
    });
  }
  else{
    Priority.findByName(self.name, function(foundPriority){
      if(foundPriority){
        fn(foundPriority);
      }
      else{
        priorities.save(self, function(err, record){
          fn(record);
        });
      }
    });
  }
};

Priority.findAll = function(fn){
  priorities.find().toArray(function(err, records){
    fn(records);
  });
};

Priority.findByName = function(name, fn){
  priorities.findOne({name:name}, function(err, record){
    if(record){fn(new Priority(record));}
    else{fn(null);}
  });
};

Priority.findById = function(searchId, fn){
  var id = new mongodb.ObjectID(searchId);
  priorities.findOne({_id:id}, function(err, record){
    fn(new Priority(record));
  });
};

Priority.deleteById = function(deletedId, fn){
  var id = new mongodb.ObjectID(deletedId);
  Priority.findById(deletedId, function(record){
    var deletedPriority = record;
    priorities.remove({_id:id}, function(err, count){
      fn(count, deletedPriority);
    });
  });
};


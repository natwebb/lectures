'use strict';

var MongoClient = require('mongodb').MongoClient;
var Exercise = require('../models/exercise');

exports.create = function(req, res){
  MongoClient.connect('mongodb://localhost/gym', function(err, db){
    if(err){throw err;}

    var ex1 = new Exercise(req.body.name, req.body.time, req.body.calories, req.body.date);

    db.collection('exercises').insert(ex1, function(err, records){
      res.send(records[0]);
    });
  });
};

exports.index = function(req, res){
  MongoClient.connect('mongodb://localhost/gym', function(err, db){
    if(err){throw err;}

    db.collection('exercises').find().toArray(function(err, exercises){
      res.send({exercises:exercises});
    });
  });
};

exports.queryName = function(req, res){
  MongoClient.connect('mongodb://localhost/gym', function(err, db){
    if(err){throw err;}

    db.collection('exercises').find({name:req.params.name}).toArray(function(err, exercises){
      res.send({exercises:exercises});
    });
  });
};

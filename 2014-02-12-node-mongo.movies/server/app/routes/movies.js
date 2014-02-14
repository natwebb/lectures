'use strict';

var Movie = require('../models/movie');
var mongodb = require('mongodb');

exports.index = function(req, res){
  var db = req.app.locals.db;

  db.collection('movies').find().toArray(function(err, movies){
    res.send({movies:movies});
  });
};

exports.searchBy = function(req, res){
  var db = req.app.locals.db;

  db.collection('movies').find(req.query).toArray(function(err, movies){
    res.send({movies:movies});
  });
};

exports.getById = function(req, res){
  var db = req.app.locals.db;
  var id = new mongodb.ObjectID(req.params.id);
  db.collection('movies').find({_id:id}).toArray(function(err, movies){
    res.send({movies:movies});
  });
};

exports.create = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  var movie = new Movie(req.body);

  movies.insert(movie, function(err, records){
    res.send(records[0]);
  });
};

exports.deleteMovie = function(req, res){
  var db = req.app.locals.db;
  var id = new mongodb.ObjectID(req.params.id);
  db.collection('movies').remove({_id:id}, function(err, count){
    res.send({id:req.params.id});
  });
};

exports.updateMovie = function(req, res){
  var db = req.app.locals.db;
  var id = new mongodb.ObjectID(req.params.id);
  var movie = new Movie(req.body);

  db.collection('movies').update({_id:id}, movie, function(err, count){
    movie._id = id;
    res.send({count:count, id:id, movie:movie});
  });
};

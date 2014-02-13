'use strict';

var Movie = require('../models/movie');

exports.index = function(req, res){
  var db = req.app.locals.db;

  db.collection('movies').find().toArray(function(err, movies){
    res.send({movies:movies});
  });
};

exports.searchBy = function(req, res){
  console.log(req.query);
  var db = req.app.locals.db;

  db.collection('movies').find(req.query).toArray(function(err, movies){
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

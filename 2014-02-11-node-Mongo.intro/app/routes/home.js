'use strict';
var MongoClient = require('mongodb').MongoClient;

exports.list = function(req, res){
  MongoClient.connect('mongodb://localhost/shelter', function(err, db) {
    if(err){throw err;}
    console.log('Connected to Database');

    db.collection('animals').find().toArray(function(err, animals){
      console.log('ANIMAL LIST');
      console.log(animals);
    });
  });
};

exports.create = function(req, res){
  console.log('PARAMS');
  console.log(req.params);
  console.log('QUERY');
  console.log(req.query);
  console.log('BODY');
  console.log(req.body);

  MongoClient.connect('mongodb://localhost/shelter', function(err, db) {
    if(err){throw err;}
    console.log('Connected to Database');

    var animal = {name: req.body.name, age: parseInt(req.body.age), gender: req.body.gender};

    db.collection('animals').insert(animal, function(err, records){
      console.log('RECORDS INSERTED');
      console.log(records);
    });
  });

  res.jsonp({ok:true});
};


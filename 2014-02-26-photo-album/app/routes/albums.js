'use strict';

var Album = require('../models/album');
var moment = require('moment');

exports.new = function(req, res){
  res.render('albums/new');
};

exports.create = function(req, res){
  var album = new Album(req.body);
  album.addCover(req.files.cover.path);
  album.insert(function(){
    res.redirect('/');
  });
};

exports.index = function(req, res){
  Album.findAll(function(albums){
    res.render('albums/index', {moment:moment, albums:albums, title:'Photo Albums'});
  });
};

exports.show = function(req, res){
  Album.findById(req.params.id, function(album){
    res.render('albums/show', {album: album, moment:moment, title:album.title});
  });
};

exports.addPhoto = function(req, res){
  Album.findById(req.params.id, function(album){
    album.addPhoto(req.files.photo.path, req.files.photo.name);
    album.update(function(){
      res.redirect('albums/'+ req.params.id);
    });
  });
};

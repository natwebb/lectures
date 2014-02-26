'use strict';

var Album = require('../models/album');

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

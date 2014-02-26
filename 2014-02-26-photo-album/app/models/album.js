'use strict';

module.exports = Album;

var fs = require('fs');
var path = require('path');
var albums = global.nss.db.collection('albums');
//var Mongo = require('mongodb');
//var _ = require('lodash');

function Album(album){
  this.title = album.title;
  this.taken = new Date(album.taken);
}

Album.prototype.addCover = function(oldpath){
  var dirname = this.title.replace(/\s/g, '').toLowerCase();
  var newpath = __dirname + '/../static/img/' + dirname;
  fs.mkdirSync(newpath);

  var extension = path.extname(oldpath);
  newpath += '/cover' + extension;
  fs.renameSync(oldpath, newpath);

  this.cover = path.normalize(newpath);
};

Album.prototype.insert = function(callback){
  albums.insert(this, function(err, records){
    callback(records[0]);
  });
};


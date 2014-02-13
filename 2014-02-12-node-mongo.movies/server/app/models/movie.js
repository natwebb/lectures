'use strict';

module.exports = function(movie){
  this.name = movie.name || '';
  this.rating = movie.rating || '';
  this.runtime = parseInt(movie.runtime || 0);
  this.year = parseInt(movie.year || 0);
  this.studio = movie.studio || '';
  this.actors = movie.actors ? movie.actors.split(', '):[];
  this.director = movie.director || '';
  this.poster = movie.poster || '';
};

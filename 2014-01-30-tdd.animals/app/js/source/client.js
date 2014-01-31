/* jshint unused:false */

var Client = (function(){

  'use strict';

  function Client(n){
    this.name = n;
    this.animals = [];
  }

  Client.prototype.adopt = function(animal){
    this.animals.push(animal);
  };

  return Client;
})();

/* jshint unused:false */

var Animal = (function(){

  'use strict';

  function Animal(name, species, gender, age){
    this.name = name;
    this.species = species || 'not set';
    this.gender = gender || 'not set';
    this.age = age || 0;
  }

  return Animal;
})();

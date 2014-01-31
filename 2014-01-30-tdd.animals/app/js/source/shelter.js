/* jshint unused:false */

var Shelter = (function(){

  'use strict';

  function Shelter(n, h){
    this.name = n;
    this.location = 'not defined';
    this.capacity = 0;
    this.animals = [];
  }

  Shelter.prototype.setHours = function(h){
    var hours = _.map(h, function(time){
      return time.day+' '+time.open+'-'+time.close;
    });
    this.hours = hours.join(', ');
  };

  Shelter.prototype.getHours = function(){
    return this.hours;
  };

  Shelter.prototype.addAnimal = function(animal){
    this.animals.push(animal);
  };

  Shelter.prototype.placeAnimal = function(name){
    return _.remove(this.animals, function(e){
      return e.name === name;
    })[0];
  };

  return Shelter;
})();

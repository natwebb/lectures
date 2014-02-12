'use strict';

function Exercise(name, time, cals, date){
  this.name = name;
  this.time = parseInt(time);
  this.calories = parseInt(cals);
  this.date = date;
}

module.exports = Exercise;

/* jshint unused: false */
/* global Cart: false */

var Person = (function(){

  'use strict';

  function Person(name, cash){
    this.name = name;
    this._cash = cash;
    this.cart = new Cart();
  }

  Object.defineProperty(Person.prototype, 'cash', {get: function(){return this._cash;}});

  Person.prototype.checkout = function(){
    if(this.cart.total > this.cash){return;}
    this._cash -= this.cart.total;
    this.cart.products = [];
  };

  return Person;
})();

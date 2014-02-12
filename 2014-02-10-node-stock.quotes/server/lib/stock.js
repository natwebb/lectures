'use strict';

function Stock(symbol){
  this.symbol = symbol;
  this.quote = (Math.floor(Math.random()*200) + 50);
}

module.exports = Stock;

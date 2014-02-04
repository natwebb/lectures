/* jshint unused: false */

var Portfolio = (function(){

  'use strict';

  function Portfolio(n){
    this.name = n;
    this._stocks = [];
  }

  Object.defineProperty(Portfolio.prototype, 'stockCount', {
    get: function(){return this._stocks.length;}
  });

  Portfolio.prototype.addStock = function(stock){
    this._stocks = this._stocks.concat(stock);
  };

  Portfolio.prototype.getStock = function(stockName){
    if(Array.isArray(stockName)){
      var tempArray = [];

      for(var k = 0; k < stockName.length; k++){
        tempArray.push(findStock(stockName[k], this._stocks));
      }

      return tempArray;
    }
    else{
      return findStock(stockName, this._stocks);
    }
  };

  Portfolio.prototype.delStock = function(stockName){
    if(Array.isArray(stockName)){
      var tempArray = [];
      for(var i = 0; i < stockName.length ; i++){
        tempArray.push(removeStock(stockName[i], this._stocks));
      }
      return tempArray;
    }
    else{
      return removeStock(stockName, this._stocks);
    }
  };

  function removeStock(symbol, stocks){
    return _.remove(stocks, function(e){
      return e.symbol === symbol;
    })[0];
  }

  function findStock(symbol, stocks){
    return _.find(stocks, function(e){
      return e.symbol === symbol;
    });
  }

  return Portfolio;

})();

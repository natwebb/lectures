/* jshint unused: false */

var Stock = (function(){

  'use strict';

  function Stock(symb, sh, p){
    this._symbol = symb;
    this._shares = sh;
    this._purchaseAmount = p;
  }

  Object.defineProperty(Stock.prototype, 'symbol', {
    get: function(){return this._symbol;}
  });

  Object.defineProperty(Stock.prototype, 'shares', {
    get: function(){return this._shares;}
  });

  Object.defineProperty(Stock.prototype, 'purchaseAmount', {
    get: function(){return this._purchaseAmount;}
  });

  Stock.prototype.value = function(fn) {
    var self = this;
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+this.symbol+'&callback=?';

    $.getJSON(url, function(quote){
      var total = quote.LastPrice * self.shares;
      fn(total);
    });
  };

/*
  Stock.prototype.getValue = function(fn) {
    this.getQuote(function(quote){
      var total = quote.LastPrice * shares;
      fn(total);
    });
  };
/*
  Stock.prototype.getSymbol = function() {
    return symbol;
  };

  Stock.prototype.getShares = function() {
    return shares;
  };

  Stock.prototype.getPurchaseAmount = function() {
    return purchaseAmount;
  };
*/
  return Stock;

})();

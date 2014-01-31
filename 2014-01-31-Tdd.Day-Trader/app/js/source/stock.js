/* jshint unused: false */

var Stock = (function(){

  'use strict';

  var symbol, shares, purchaseAmount;

  function Stock(symb, sh, p){
    symbol = symb;
    shares = sh;
    purchaseAmount = p;
  }

  Stock.prototype.getQuote = function(fn) {
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+symbol+'&callback=?';
    $.getJSON(url, fn);
  };

  Stock.prototype.getValue = function(fn) {
    this.getQuote(function(quote){
      var total = quote.LastPrice * shares;
      fn(total);
    });
  };

  Stock.prototype.getSymbol = function() {
    return symbol;
  };

  Stock.prototype.getShares = function() {
    return shares;
  };

  Stock.prototype.getPurchaseAmount = function() {
    return purchaseAmount;
  };

  return Stock;

})();

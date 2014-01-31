/* jshint unused: false */

var Portfolio;

function portfolioFactory(n){

  'use strict';
  
  var stocks = [];

  function PortfolioFn(n){
    this.name = n;
  }

  PortfolioFn.prototype.stockCount = function() {
    return stocks.length;
  };

  PortfolioFn.prototype.addStock = function(s1) {
    stocks.push(s1);
  };

  PortfolioFn.prototype.removeStock = function(symb){
    var rmvd = _.remove(stocks, function(e){
      return e.getSymbol() === symb;
    });
    return rmvd;
  };

  Portfolio = PortfolioFn;

  return new PortfolioFn(name);

}

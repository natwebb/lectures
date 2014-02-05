/* jshint unused: false */
/* global Stock: false */

var Client = (function(){

  'use strict';

  function Client(n, c){
    this.name = n;
    this.cash = c;
    this._portfolios = [];
  }

  Object.defineProperty(Client.prototype, 'portfolioCount', {
    get: function(){ return this._portfolios.length;}
  });

  Client.prototype.addPortfolio = function(portf){
    var ports = [].concat(portf);
    this._portfolios = this._portfolios.concat(ports);
  };

  Client.prototype.getPortfolio = function(portf){
    if(Array.isArray(portf)){
      var tempArray = [];
      for(var i = 0; i < portf.length; i++){
        tempArray = tempArray.concat(findPortfolio(portf[i], this._portfolios));
      }
      return tempArray;
    }
    else{
      return findPortfolio(portf, this._portfolios);
    }
  };

  Client.prototype.delPortfolio = function(portf){
    portf = [].concat(portf);
    return _.remove(this._portfolios, function(e){
      return _.contains(portf, e.name);
    });
  };

  Client.prototype.purchaseStock = function(symbol, shares, fn) {
    var self = this;
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+symbol+'&callback=?';

    $.getJSON(url, function(quote){
      var stock;
      var total = quote.LastPrice * shares;
      if(self.cash >= total){
        self.cash -= total;
        stock = new Stock(symbol, shares, quote.LastPrice);
      }
      fn(stock);
    });
  };

  Client.prototype.sellStock = function(stock, shares, fn) {
    var self = this;
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+stock.symbol+'&callback=?';

    $.getJSON(url, function(quote){
      if(stock.shares >= shares){
        var saleProceeds = quote.LastPrice * shares;
        self.cash += saleProceeds;
        stock.shares -= shares;
        fn(stock);
      }
      else{
        fn();
      }
    });
  };

  function findPortfolio(one, ofmany){
    return _.find(ofmany, function(e){
      return e.name === one;
    });
  }

  return Client;

})();

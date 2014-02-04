/* jshint unused: false */

var Client = (function(){

  'use strict';

  function Client(n){
    this.name = n;
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
    var tempArray = [].concat(portf);
    var rmvd = _.remove(this._portfolios, function(e){
      _.contains(tempArray, e.name);
    });
    debugger;
    return rmvd;
  };

  function findPortfolio(one, ofmany){
    return _.find(ofmany, function(e){
      return e.name === one;
    });
  }

  return Client;

})();

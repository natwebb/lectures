/* jshint unused: false */
/* jshint loopfunc: true */

var Cart = (function(){

  'use strict';

  function Cart(){
    this.products = [];
  }

  Cart.prototype.add = function(product, number){
    for(var i=0; i<number; i++){
      this.products.push(product);
    }
  };

  Cart.prototype.remove = function(name, number){
    for(var i=0; i<number; i++){
      var found = _.findIndex(this.products, function(e){return e.name === name;});
      this.products.splice(found, 1);
    }
  };

  Object.defineProperty(Cart.prototype, 'total', {
    get: function(){
      var total = _.reduce(this.products, function(sum, product) {
        return sum + product.price;
      }, 0);

      return total;
    }
  });

  return Cart;
})();

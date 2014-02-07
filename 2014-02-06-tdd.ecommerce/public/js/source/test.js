/* global test, ok, Product, deepEqual, Person, Cart:false */

'use strict';

test('Product#new', function(){
  var p1 = new Product('Hat', 5000);

  ok(p1 instanceof Product, 'p1 should be a Product');
  deepEqual(p1.name, 'Hat', 'p1 name is Hat');
  deepEqual(p1.price, 5000, 'The hat costs $5000');
});

test('Person#new', function(){
  var r1 = new Person('Bob', 10000);

  ok(r1 instanceof Person, 'r1 should be a Person');
  deepEqual(r1.name, 'Bob', 'r1 name is Bob');
  deepEqual(r1.cash, 10000, 'Bob has 10 Gs');
});

test('Cart#new', function(){
  var c1 = new Cart();

  ok(c1 instanceof Cart, 'r1 should be a Cart');
});

test('Cart#add', function(){
  var r1 = new Person('Bob', 10000);
  var p1 = new Product('Hat', 5000);
  var p2 = new Product('Cat', 70);

  r1.cart.add(p1, 1);
  r1.cart.add(p2, 4);

  deepEqual(r1.cart.products.length, 5, 'cart should have five products in it');
  deepEqual(r1.cart.products[0], p1, 'first thing in cart should be p1');
  deepEqual(r1.cart.products[1], p2, 'second thing in cart should be p2');
});

test('Cart#remove', function(){
  var r1 = new Person('Bob', 10000);
  var p1 = new Product('Hat', 5000);
  var p2 = new Product('Cat', 70);
  var p3 = new Product('Mat', 100);

  r1.cart.add(p1, 1);
  r1.cart.add(p2, 4);
  r1.cart.add(p3, 3);

  r1.cart.remove('Hat', 1);
  r1.cart.remove('Cat', 2);

  deepEqual(r1.cart.products.length, 5, 'cart should only have five products in it');
  deepEqual(r1.cart.products[0], p2, 'first thing in cart should now be p2');
  deepEqual(r1.cart.products[2], p3, 'third thing in cart should now be p3');

});

test('Cart#total', function(){
  var r1 = new Person('Bob', 10000);
  var p1 = new Product('Hat', 5000);
  var p2 = new Product('Cat', 70);

  r1.cart.add(p1, 1);
  r1.cart.add(p2, 4);
  r1.cart.remove('Cat', 2);

  deepEqual(r1.cart.total, 5140, 'cart total should be $5140');
});

test('Person#checkout', function(){
  var r1 = new Person('Bob', 10000);
  var r2 = new Person('Bob', 10000);
  var p1 = new Product('Hat', 5000);
  var p2 = new Product('Cat', 70);

  r1.cart.add(p1, 1);
  r1.cart.add(p2, 4);
  r1.cart.remove('Cat', 2);

  r2.cart.add(p1, 10);

  r1.checkout();
  r2.checkout();

  deepEqual(r1.cart.products.length, 0, 'cart should have no products in it');
  deepEqual(r1.cash, 4860, 'r1 should have $4860 left');
  deepEqual(r2.cash, 10000, 'r2 should still have $10000');
});

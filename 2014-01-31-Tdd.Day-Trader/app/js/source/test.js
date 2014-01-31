/* global portfolioFactory: false, Portfolio: false, start: false, asyncTest: false, test: false, ok: false, deepEqual: false, Stock: false */

'use strict';

test('Stock#new', function() {
  var s1 = new Stock('AAPL', 50, 25);

  s1.symbol = 'x';
  s1.shares = 'x';
  s1.purchaseAmount = 'x';

  ok(s1 instanceof Stock, 's1 should be an instance of Stock');
  deepEqual(s1.getSymbol(), 'AAPL', 's1\'s symbol should be AAPL');
  deepEqual(s1.getShares(), 50, 's1 should have 50 shares');
  deepEqual(s1.getPurchaseAmount(), 25, 's1 should have a purchase price of $25');
});

asyncTest('Stock#getQuote()', function() {
  var s1 = new Stock('AAPL', 50, 25);
  s1.getQuote(function(quote){
    ok(quote.LastPrice > 0, 'AAPL quote should be above zero');
    start();
  });
});

asyncTest('Stock#value', function() {
  var s1 = new Stock('AAPL', 50, 25);
  s1.getValue(function(value){
    ok(value > 0, 'AAPL total value should be above zero');
    start();
  });
});

test('Portfolio#new', function() {
  var p1 = portfolioFactory('Tech Stocks');

  ok(p1 instanceof Portfolio, 'p1 should be an instance of Portfolio');
  deepEqual(p1.name, 'Tech Stocks', 'p1 name should be Tech Stocks');
  deepEqual(p1.stockCount(), 0, 'Should be zero stocks inside p1');
});

test('Portfolio#addStock', function() {
  var p1 = portfolioFactory('Tech Stocks');
  var s1= new Stock('AAPL');
  var s2= new Stock('MSFT');
  var s3= new Stock('AMZN');

  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock(s3);

  deepEqual(p1.stockCount(), 3, 'p1 should have 3 stocks');
});

test('Portfolio#removeStock', function() {
  var p1 = portfolioFactory('Tech Stocks');
  var s1= new Stock('AAPL');
  var s2= new Stock('MSFT');
  var s3= new Stock('AMZN');

  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock(s3);

  var removed = p1.removeStock('MSFT');

  deepEqual(p1.stockCount(), 2, 'p1 should have 2 stocks');
  deepEqual(removed.getSymbol(), 'MSFT', 'removed stock should have symbol MSFT');
});


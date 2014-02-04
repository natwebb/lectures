/* global Client, Portfolio, asyncTest, start, test, ok, deepEqual, Stock, throws: false */

'use strict';

test('Stock#new', function() {
  var s1 = new Stock('AAPL', 50, 25);

  throws(function(){
    s1.symbol = 'abc';
  }, 's1 should not be able to set symbol on s1');

  throws(function(){
    s1.shares = 100;
  }, 's1 should not be able to alter the share amount');

  throws(function(){
    s1.purchaseAmount = 10;
  }, 's1 should not be able to alter the purchase amount');

  ok(s1 instanceof Stock, 's1 should be an instance of Stock');
  deepEqual(s1.symbol, 'AAPL', 's1\'s symbol should be AAPL');
  deepEqual(s1.shares, 50, 'the number of shares should be retrieved as 50');
  deepEqual(s1.purchaseAmount, 25, 'the purchase price should be retrieved as 25');
});

asyncTest('Stock#value', function() {
  var s1 = new Stock('AAPL', 50, 25);
  s1.value(function(val){
    ok(val > 0, 'AAPL total value should be above zero');
    start();
  });
});

test('Portfolio#new', function() {
  var p1 = new Portfolio('Tech Stocks');

  ok(p1 instanceof Portfolio, 'p1 should be an instance of Portfolio');
  deepEqual(p1.name, 'Tech Stocks', 'p1 name should be Tech Stocks');
  deepEqual(p1.stockCount, 0, 'Should be zero stocks inside p1');
});

test('Portfolio#addStock', function() {
  var p1 = new Portfolio('Tech Stocks');
  var s1 = new Stock('AAPL', 50, 125);
  var s2 = new Stock('MSFT', 60, 225);
  var s3 = new Stock('AMZN', 70, 325);
  var s4 = new Stock('GOOG', 80, 425);

  p1.addStock(s1);
  p1.addStock(s2);
  p1.addStock([s3, s4]);

  deepEqual(p1.stockCount, 4, 'p1 should have 4 stocks');
});


test('Portfolio#getStock', function() {
  var p1 = new Portfolio('Tech Stocks');
  var s1 = new Stock('AAPL', 50, 125);
  var s2 = new Stock('MSFT', 60, 225);
  var s3 = new Stock('AMZN', 70, 325);
  var s4 = new Stock('GOOG', 80, 425);

  p1.addStock([s1, s2, s3, s4]);

  var testStock = p1.getStock('AAPL');
  var s5 = p1.getStock('ZZZZ');
  var testMult = p1.getStock(['MSFT','AMZN']);

  ok(testStock instanceof Stock, 'first stock should be a Stock');
  deepEqual(testStock.symbol, 'AAPL', 'first stock gotten should have name AAPL');
  ok(!s5, 'should not find ZZZZ');
  deepEqual(testMult.length, 2, 'stock array should have length 2');
  deepEqual(testMult[0].symbol, 'MSFT', 'stock array at 0 should have name MSFT');
  deepEqual(testMult[1].symbol, 'AMZN', 'stock array at 1 should have name AMZN');
});


test('Portfolio#delStock', function() {
  var p1 = new Portfolio('Tech Stocks');
  var p2 = new Portfolio('More Tech Stocks');
  var s1 = new Stock('AAPL', 50, 125);
  var s2 = new Stock('MSFT', 60, 225);
  var s3 = new Stock('AMZN', 70, 325);
  var s4 = new Stock('GOOG', 80, 425);

  p1.addStock([s1, s2, s3, s4]);
  p2.addStock([s1, s2, s3, s4]);

  var testStock = p1.delStock('AAPL');
  var badTestStock = p1.delStock('ZZZZ');
  var testStocks = p2.delStock(['AMZN','MSFT']);

  deepEqual(p1.stockCount, 3, 'should still have 3 stocks in p1');
  deepEqual(testStock.symbol, 'AAPL', 'deleted stock gotten should have name AAPL');
  ok(!badTestStock, 'deleting nonexistent stock should return nothing');
  deepEqual(p2.stockCount, 2, 'should still have 2 stocks in p2');
  deepEqual(testStocks.length, 2, 'should have taken out 2 stocks');
  deepEqual(testStocks[0].symbol, 'AMZN', 'first deleted stock gotten from p2 should have name AMZN');
  deepEqual(testStocks[1].symbol, 'MSFT', 'second deleted stock gotten from p2 should have name MSFT');
});

test('Client#new', function() {
  var c1 = new Client('Wilbur Henderson');

  ok(c1 instanceof Client, 'c1 should be an instance of Client');
  deepEqual(c1.name, 'Wilbur Henderson', 'c1 name should be Wilbur Henderson');
  deepEqual(c1.portfolioCount, 0, 'Should be zero portfolios inside c1');
});

test('Client#addPortfolio', function() {
  var c1 = new Client('Wilbur Henderson');
  var p1 = new Portfolio('Pig Stocks');
  var p2 = new Portfolio('Heavy Equipment');

  c1.addPortfolio([p1, p2]);

  deepEqual(c1.portfolioCount, 2, 'c1 should have 2 portfolios');
});

test('Client#getPortfolio', function() {
  var c1 = new Client('Wilbur Henderson');
  var p1 = new Portfolio('Pig Stocks');
  var p2 = new Portfolio('Heavy Equipment');
  var p3 = new Portfolio('Illegal Guns');
  var p4 = new Portfolio('Pictures of Horses');

  c1.addPortfolio([p1, p2, p3, p4]);

  var testPort = c1.getPortfolio('Heavy Equipment');
  var p5 = c1.getPortfolio('ZZZZ');
  var testMult = c1.getPortfolio(['Pig Stocks','Illegal Guns']);

  ok(testPort instanceof Portfolio, 'first portfolio should be a Portfolio');
  deepEqual(testPort.name, 'Heavy Equipment', 'first portfolio gotten should have name Heavy Equipment');
  ok(!p5, 'should not find ZZZZ');
  deepEqual(testMult.length, 2, 'portfolio array should have length 2');
  deepEqual(testMult[0].name, 'Pig Stocks', 'stock array at 0 should have name Pig Stocks');
  deepEqual(testMult[1].name, 'Illegal Guns', 'stock array at 1 should have name Illegal Guns');
});

test('Client#delPortfolio', function() {
  var c1 = new Client('Wilbur Henderson');
  var c2 = new Client('Abner Gumtooth');
  var p1 = new Portfolio('Pig Stocks');
  var p2 = new Portfolio('Heavy Equipment');
  var p3 = new Portfolio('Illegal Guns');
  var p4 = new Portfolio('Pictures of Horses');

  c1.addPortfolio([p1, p2, p3, p4]);
  c2.addPortfolio([p1, p2, p3, p4]);

  var testPort = c1.delPortfolio('Pictures of Horses');
  var badTestPort = c1.delPortfolio('ZZZZ');
  var testPorts = c2.delPortfolio(['Illegal Guns','Pig Stocks']);

  deepEqual(c1.portfolioCount, 3, 'should still have 3 portfolios in c1');
  deepEqual(testPort.name, 'Pictures of Horses', 'deleted portfolio gotten should have name Pictures of Horses');
  ok(!badTestPort, 'deleting nonexistent portfolio should return nothing');
  deepEqual(c2.portfolioCount, 2, 'should still have 2 portfolios in c2');
  deepEqual(testPorts.length, 2, 'should have taken out 2 portfolios');
  deepEqual(testPorts[0].name, 'Illegal Guns', 'first deleted portfolio gotten from c2 should have name Illegal Guns');
  deepEqual(testPorts[1].name, 'Pig Stocks', 'second deleted portfolio gotten from c2 should have name Pig Stocks');
});

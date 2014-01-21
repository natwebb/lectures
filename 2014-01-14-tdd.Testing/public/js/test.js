/*
test("name of function you're testing", function() {
  deepEqual(actual, expected, "my test message");
});
*/

test("add", function() {
  deepEqual(add(9,10), 19, "adding 9 and 10");
  deepEqual(add(-9,10), 1, "adding -9 and 10");
  deepEqual(add(0,0), 0, "adding 0 and 0");
});

test("sum", function() {
  deepEqual(sum([11,3,8]), 22, "summing 11, 3, and 8");
});

test("countEvens", function() {
  deepEqual(countEvens([3,8,6,4,7]), 3, "should be 3 even values");
});

test("makeEvenStringsUppercase", function() {
  var actual = ['hello', 'cohort', 'iv', 'welcome', 'to', 'tdd'];
  var expected = ['hello', 'COHORT', 'IV', 'welcome', 'TO', 'tdd'];
  deepEqual(makeEvenStringsUppercase(actual), expected, "should be 3 uppercase string");
});

test("sumLengthOfStrings", function() {
  var string = "this is a very long string";
  deepEqual(sumLengthOfStrings(string), 21, "string should be 21 characters long");
});

test("makeCatWithName", function() {
  deepEqual(makeCatWithName("fluffy").name, "fluffy", "cat's name should be fluffy");
});

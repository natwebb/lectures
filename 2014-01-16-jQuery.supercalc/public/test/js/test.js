/*
test("name of function you're testing", function() {
  deepEqual(actual, expected, "my test message");
});
*/

test("containsChar", function() {
  deepEqual(containsChar('mouse','u'), true, "mouse should contain u");
  deepEqual(containsChar('mouse','z'), false, "mouse should not contain z");
});

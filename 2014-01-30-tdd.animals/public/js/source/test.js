/* global test, ok, Shelter, deepEqual, Animal, Client: false */

'use strict';

test('Shelter', function() {
  var shelter = new Shelter();
  var s1 = new Shelter();
  var string = 'my string';

  ok(shelter instanceof Shelter, 'Yes, shelter is an instance of Shelter');
  ok(s1 instanceof Shelter, 'Yes, s1 is an instance of Shelter');
  ok(!(string instanceof Shelter), 's1 is not an instance of Shelter');
});

test('Shelter#name', function(){
  var s1 = new Shelter('Green Hills Shelter');

  deepEqual(s1.name, 'Green Hills Shelter', 's1 should have a name');
});

test('Shelter#location', function(){
  var s1 = new Shelter('Green Hills Shelter');
  s1.location = '100 Main Street';
  var s2 = new Shelter('GHS');

  deepEqual(s1.location, '100 Main Street', 's1 should have a location');
  deepEqual(s2.location, 'not defined', 's2 should have a default location');
});

test('Shelter#capacity', function(){
  var s1 = new Shelter('Green Hills Shelter');

  deepEqual(s1.capacity, 0, 's1 should have a zero capacity');
});

test('Shelter#setHours()', function(){
  var s1 = new Shelter('Green Hills Shelter');
  s1.setHours([
    {day:'Monday', open:'8AM', close:'5PM'},
    {day:'Wednesday', open:'11AM', close:'2PM'},
    {day:'Friday', open:'9AM', close:'4PM'},
  ]);

  deepEqual(s1.getHours(), 'Monday 8AM-5PM, Wednesday 11AM-2PM, Friday 9AM-4PM', 's1 should have set hours');
});

test('Shelter#addAnimal()', function(){
  var a1 = new Animal('Fido');
  var s1 = new Shelter();
  s1.addAnimal(a1);

  deepEqual(s1.animals.length, 1, 'One animal was added to the shelter');
  ok(s1.animals[0] instanceof Animal, 'An animal was added, not a person');
  deepEqual(s1.animals[0].name, 'Fido', 'The animal\'s name is indeed Fido');
});

test('Shelter#placeAnimal()', function(){
  var a1 = new Animal('Fido');
  var a2 = new Animal('Simba');
  var a3 = new Animal('Ninja Cat');
  var s1 = new Shelter();
  s1.addAnimal(a1);
  s1.addAnimal(a2);
  s1.addAnimal(a3);
  var p1 = s1.placeAnimal('Simba');

  deepEqual(p1.name, 'Simba', 'The placed animal has name of Simba');
  deepEqual(s1.animals.length, 2, 'The placed animal was removed from the animals array');
});

/*------------------ANIMAL TESTING---------------*/

test('Animal', function() {
  var a1 = new Animal();

  ok(a1 instanceof Animal, 'Yes, a1 is an instance of Animal');
});

test('Animal#name', function(){
  var a1 = new Animal('Fido');

  deepEqual(a1.name, 'Fido', 'Yes, Fido is the name of the Animal');
});

test('Animal#species', function(){
  var a1 = new Animal('Fido', 'dog');
  var a2 = new Animal('Fido');
  deepEqual(a1.species, 'dog', 'Yes, species is dog');
  deepEqual(a2.species, 'not set', 'Species was not defined');
});

test('Animal#gender', function(){
  var a1 = new Animal('Fido', 'dog', 'male');
  var a2 = new Animal('Fido', 'dog');

  deepEqual(a1.gender, 'male', 'Yes, dog is a male');
  deepEqual(a2.gender, 'not set', 'Gender was not defined');
});

test('Animal#age', function(){
  var a1 = new Animal('Fido', 'dog', 'male', 3);
  var a2 = new Animal('Fido', 'dog', 'male');
  deepEqual(a1.age, 3, 'The age is set to 3');
  deepEqual(a2.age, 0, 'The age is set to default');
});

/*---------------------CLIENT TESTING-------------*/
test('Client#adopt()', function(){
  var s1 = new Shelter();
  var a1 = new Animal('Fido');
  var c1= new Client('Bill');

  s1.addAnimal(a1);
  var adoptee = s1.placeAnimal('Fido');
  c1.adopt(adoptee);

  deepEqual(c1.animals.length, 1, 'Client should have one animal');
  deepEqual(c1.animals[0].name, 'Fido', 'and his name should be Fido');
});

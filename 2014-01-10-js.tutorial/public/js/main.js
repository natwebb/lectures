console.log('hello from javascript');
console.log('Nat Webb');

//debugger

var a = 10;
var b = 20;
var c = a + b;
var d = c * b;
var e = d * (b - a);

var power = Math.pow(2, 8);

console.log('e is ' + e);
console.log('2 to the 8th power is ' + power);

var len = 8;
var wid = 12;
var area = len * wid;

console.log('the area of a room that is ' + len + 'ft by ' + wid + 'ft is ' + area + ' square feet');

var radius = 5;
var height = 9;

var volume = Math.PI * Math.pow(radius, 2) * height;

console.log('the volume of a cylinder with radius ' + radius + 'in. and height ' + height + 'in. is ' + volume + ' cubic inches');

var bucket = 29572;
var room1 = 3*5;
var room2 = 7*9;
var room3 = 6*2;
var house = room1 + room2 + room3;

var houses = Math.floor(bucket/house);

console.log("you can paint " + houses + " houses");

var distance = 2538000;
var rate = 1; //rate is measured in warp units
var days = (distance/rate)*365

console.log('it will take me about ' + days + ' days');

//var firstName = prompt('Enter your first name');
//var lastName = prompt('Enter your last name');

//console.log('your full name is ' + firstName + " " + lastName)

//var l = parseInt(prompt('Enter the length of your room'));
//var w = parseInt(prompt('Enter the width of your room'));
//var h = parseInt(prompt('Enter the height of your room'));

//var volume = l*w*h;

//console.log('The volume of your room is ' + volume);

var age = prompt('What is your age?');
if(age<18)
  console.log('You cannot vote');
  else
  console.log('You can vote');

$(document).ready(initialize);

function initialize(){
  $('#calc').click(calculate);
  $('#clear').click(clear);
  $('#sum').click(sum);
  $('#product').click(product);
}

/*---Click Handlers---*/
function calculate(){
  var num1 = parseFloat($('#num1').val());
  var num2 = parseFloat($('#num2').val());
  var oper = $('#op').val();

  $('#result').text(compute(num1, num2, oper));
}

function clear(){
  $('#num1').val(null);
  $('#num1').focus();
  $('#num2').val(null);
  $('#op').val(null);
  $('#result').text("");
}

function sum(){
  var total = 0;

  $('.new').each(function(index, element){
    total += parseFloat(element.value);
  });

  //for(var i = 0; i<nums.length; i++)
  //var nums = $('.new');
  //  total += parseFloat(nums[i].value);

  $('#newresult').text(total);
}

function product(){
  var nums = $('.new');
  var total = 1;
  for(var i = 0; i<nums.length; i++)
    total *= parseFloat(nums[i].value);
  $('#newresult').text(total);
}

/*---Math Functions---*/
function compute(x, y, op){
  var result = 0;

  switch(op){
    case "+":
      result = x+y;
      break;
    case "-":
      result = x-y;
      break;
    case "*":
      result = x*y;
      break;
    case "/":
      result = x/y;
      break;
  }

  return(result);
}

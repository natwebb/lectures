(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#one').click(one);
    $('#two').click(two);
    $('#add').click(add);
    $('#canDrink').click(canDrink);
    $('#product-button').click(product);
    $('#names-button').click(namesCalc);
  }

  function one(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/name?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

  function two(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/favcolor?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

  function add(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/add/'+$('#num1').val()+'/'+$('#num2').val()+'?callback=?';
    $.getJSON(url, function(data){
      $('#sum').text(data.sum);
    });
  }

  function canDrink(){
    var name = $('#name').val();
    var age = parseInt($('#age').val());
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/candrink/'+name+'/'+age+'?callback=?';
    $.getJSON(url, function(data){
      $('#drinkResponse').text(data.reply);
    });
  }

  function product(){
    var numbers = $('#numbers').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/product?numbers='+numbers+'&callback=?';
    $.getJSON(url, function(data){
      $('#productResponse').text(data.product);
    });
  }

  function namesCalc(){
    var names = $('#names').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/namecalc?names='+names+'&callback=?';
    $.getJSON(url, function(data){
      $('#namesResponse').text(data.answer);
    });
  }


})();


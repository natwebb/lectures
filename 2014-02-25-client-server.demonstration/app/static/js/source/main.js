(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#addButton').click(add);
    $('#productButton').click(product);
  }

  function add(){
    var x = $('#num1').val();
    var y = $('#num2').val();
    var url = '/calc/add?x='+x+'&y='+y;
    $.getJSON(url, function(data){
      $('#sum').text(data.sum);
    });
  }

  function product(){
    var url = '/calc/product?nums='+$('#nums').val();
    $.getJSON(url, function(data){
      $('#product').text(data.product);
    });
  }

})();


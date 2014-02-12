(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#getQuote').click(getQuote);
  }

  function getQuote(){
    var symbol = $('#stockSymbol').val();
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/getquote?symbol='+symbol+'&callback=?';
    console.log(url);
    $.getJSON(url, function(data){
      console.log(data);
      var $tr1 = $('<tr>');
      var $td1 = $('<td>');
      $td1.text(data.stock.symbol);
      var $td2 = $('<td>');
      $td2.text(data.stock.quote);
      $tr1.append($td1);
      $tr1.append($td2);
      $('#stockTable tbody').append($tr1);
    });
  }

})();


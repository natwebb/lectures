(function(){

  'use strict';

  $(document).ready(init);

  function init(){
    $('#add-item').click(addItem);
  }

  function addItem(event){
    var item = $('#item').val();
    var quantity = parseInt($('#quantity').val());
    var amount = parseFloat($('#amount').val());
    var total = quantity*amount;
    addItemToTable(item, quantity, amount, total);
    updateTotals();
    event.preventDefault();
  }

  function addItemToTable(item, quantity, amount, total){
    var $tr = $('<tr>');
    var $item = $('<td>');
    $item.text(item);
    var $quantity = $('<td>');
    $quantity.text(quantity);
    var $amount = $('<td>');
    $amount.text(numberToCurrency(amount));
    var $total = $('<td>');
    $total.text(numberToCurrency(total));

    $tr.append($item);
    $tr.append($quantity);
    $tr.append($amount);
    $tr.append($total);
    $('tbody').append($tr);
  }

  function numberToCurrency(number){
    return '$' + number.toFixed(2);
  }

  function updateTotals(){
    var $amounts = $('tbody > tr > td:nth-child(3)');
    var numbers = transformTdsToNumbers($amounts);
    var sumAmounts = sum(numbers);
    $('tfoot > tr > td:nth-child(3)').text(numberToCurrency(sumAmounts));

    var $totals = $('tbody > tr > td:nth-child(4)');
    numbers = transformTdsToNumbers($totals);
    var sumTotals = sum(numbers);
    $('tfoot > tr > td:nth-child(4)').text(numberToCurrency(sumTotals));
  }

  function transformTdsToNumbers($tds){
    return $.map($tds, function(td){
      return parseFloat(td.textContent.slice(1));
    });
  }

  function sum(numbers){
    var total = 0;
    for(var i = 0; i<numbers.length; i++){
      total += numbers[i];
    }
    return total;
  }

})();

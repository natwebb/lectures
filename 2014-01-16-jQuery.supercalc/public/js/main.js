$(document).ready(initialize);

function initialize(){
  $('.number').click(displayNumber);
  $('#clear').click(clearAll);
  $('#plusmin').click(plusMin);
  $('#push').click(pushToQueue);
  $('.operator').click(compute);
}

function displayNumber(){
  var full
  var displayed = $('#display').text();
  var current = this.textContent;

  if (current==='.' && containsChar(displayed, '.')) return;

  if (displayed === '0' && current!=='.')
    $('#display').text(current);
  else {
    full = displayed + current;
    $('#display').text(full);
  }
}

function clearAll(){
  $('#display').text('0');
  $('#queue').empty();
}

function plusMin(){
  var displayed = parseFloat($('#display').text());
  displayed *= -1;
  $('#display').text(displayed);
}

function pushToQueue(){
  var displayed = $('#display').text();
  $('#display').text('0');
  var $li = $('<li>');
  $li.text(displayed);
  $('#queue').prepend($li);
}

function compute(){
  var oper = this.id;
  var nums = parseTags($('#queue li'));
  var total

  switch(oper)
  {
    case 'add':
      total = nums[0] + nums[1];
      break;
    case 'sub':
      total = nums[1] - nums[0];
      break;
    case 'mul':
      total = nums[1] * nums[0];
      break;
    case 'div':
      total = nums[1] / nums[0];
      break;
    case 'sum':
      total = 0;
      $(nums).each(function(){
        total += this;
      });
      break;
    case 'pow':
      total = Math.pow(nums[1], nums[0]);
  }

  $('#display').text(total);
  $('#queue').empty();
}

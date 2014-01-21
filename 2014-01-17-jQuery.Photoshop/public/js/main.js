$(document).ready(initialize);

function initialize(){
  $('#add-color').click(clickAddColor);
  $('#add-pixels').click(clickAddPixels);
  $('#colors').on('click', '.color', clickSelectColor);
  $('#pixels').on('mouseover', '.pixel', hoverColorPixel);
}

function hoverColorPixel(){
  var color = $('.selected').css('background-color');
  $(this).css('background-color', color);
}

function clickAddPixels(){
  var num = $('#number-text').val();
  num = parseInt(num);

  $('#pixels').css('display','block');

  for(var i = 0; i<num; i++){
    var $pixel = $('<div>');
    $pixel.addClass('pixel');
    $('#pixels').prepend($pixel);
  }
}

function clickAddColor(){
  var colorText = $('#color-text').val();
  $('#color-text').val('');
  $('#color-text').focus();

  var $newColor = $('<div>');
  $newColor.addClass('color');
  $newColor.css('background-color', colorText);

  $('#colors').append($newColor);
}

function clickSelectColor(){
  if ($(this).hasClass('selected')){
    $(this).removeClass('selected');
  }
  else{
    $('.color').removeClass('selected');
    $(this).addClass('selected');
  }
}

(function(){

  'use strict';

  $(document).ready(init);

  var timer;

  function init(){
   // setTimeout(alertMe, 5000);
    $('#start').click(start);
    $('#stop').click(stop);
    $('#reset').click(reset);
  }

  function start(){
    clearInterval(timer);
    timer = setInterval(makeColorBox, 100);
  }

  function stop(){
    clearInterval(timer);
  }

  function reset(){
    $('body').css('background-color', 'white');
    $('#container').empty();
  }

  function makeColorBox(){
    var $div = $('<div>');
    $div.addClass('box');
    $div.css('background-color', randomColor());
    $('body').css('background-color', randomColor());
    $('#container').prepend($div);
  }

  function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var a = Math.random();

    var color = 'rgba('+r+', '+g+', '+b+', '+a+')';
    return color;
  }

  //function alertMe(){
   // alert('oyez oyez oyez');
  //}

})();

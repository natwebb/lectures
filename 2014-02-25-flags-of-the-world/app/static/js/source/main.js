(function(){

  'use strict';

  var countryName;
  var flagCode;
  var timer;
  var time = 60;

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('.name').click(clickName);
    $('.flag').click(clickFlag);
    $('#reload').click(reloadPage);
    startTimer();
  }

  function clickName(){
    if(!$(this).hasClass('eliminated')){
      countryName = $(this).text();
      $('.name').removeClass('chosen');
      $(this).addClass('chosen');
      checkMatch();
    }
  }

  function clickFlag(){
    if(!$(this).hasClass('eliminated')){
      flagCode = $(this).attr('class').slice(-2);
      $('.flag').removeClass('chosen');
      $(this).addClass('chosen');
      checkMatch();
    }
  }

  function checkMatch(){
    if(countryName&&flagCode){
      console.log(countryName, flagCode);
      var url = '/check';
      var type = 'GET';
      var success = successfulMatch;
      var data = {country: countryName, flag:flagCode};
      $.ajax({url:url, type:type, data:data, success:success});
      countryName = undefined;
      flagCode = undefined;
    }
  }

  function successfulMatch(data){
    if(data.success){
      $('.chosen').addClass('eliminated');
    }

    $('.chosen').removeClass('chosen');
    checkVictory();
  }

  function checkVictory(){
    if($('.eliminated').length/2===$('.name').length){
      clearInterval(timer);
      alert('You win!');
    }
  }

  function startTimer(){
    clearInterval(timer);
    timer = setInterval(countdown, 1000);
  }

  function countdown(){
    time--;
    $('#countdown').text('Time Left '+time);
    if(time===0){loseGame();}
  }

  function loseGame(){
    clearInterval(timer);
    $('.name').addClass('eliminated');
    $('.flag').addClass('eliminated');
    alert('Out of time!');
  }

  function reloadPage(){
    location.reload(true);
  }

})();


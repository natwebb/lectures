(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#register').click(registerNewUser);
    $('#login').click(loginUser);
  }

  function registerNewUser(event){
    var url = '/register';
    var type = 'POST';
    var data = $('#userData').serialize();
    var success = returnHome;
    $.ajax({url:url, type:type, data:data, success:success});
    event.preventDefault();
  }

  function loginUser(){
    var url = '/login';
    var type = 'POST';
    var data = $('#userData').serialize();
    var success = returnHome;
    $.ajax({url:url, type:type, data:data, success:success});
    event.preventDefault();
  }

  function returnHome(data){
    if(data.result){
      window.location.replace('/');
    }else{
      alert('Error, please try again!');
    }
  }

})();


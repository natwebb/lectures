(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#toggleUser').click(toggleUserForm);
    $('#register').click(clickRegister);
    $('#login').click(clickLogin);
  }

  function toggleUserForm() {
    $('#user').toggleClass('hide');
  }

  function clickRegister() {
    var url = createUrl() + '/users';
    var type = 'POST';
    var data = {email:$('#email').val(), password:$('#password').val()};
    var success = registrationMessage;

    $.ajax({url:url, type:type, data:data, success:success});
  }

  function registrationMessage(data){
    if(data.success){
      alert('Registration successful!');
    }else{
      alert('Registration failed-- duplicate email!');
    }
  }

  function clickLogin() {
    var url = createUrl() + '/users/login';
    var type = 'PUT';
    var data = {email:$('#email').val(), password:$('#password').val()};
    var success = loginMessage;

    $.ajax({url:url, type:type, data:data, success:success});
  }

  function loginMessage(data){
    console.log(data);
  }

  function createUrl() {
    return window.location.origin.replace(/(\d){4}/g, '4000');
  }

})();


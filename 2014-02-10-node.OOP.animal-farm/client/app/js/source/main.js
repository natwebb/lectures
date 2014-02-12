(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#create').click(create);
  }

  function create(){
    var animal = $('#animals').val();
    var name = $('#name').val();
    var gender = $('#gender').val();
    var age = $('#age').val();
    var url = window.location.origin.replace(/[0-9]{4}/g,'4000');
    url += '/animal?species='+animal+'&name='+name+'&gender='+gender+'&age='+age+'&callback=?';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }

})();


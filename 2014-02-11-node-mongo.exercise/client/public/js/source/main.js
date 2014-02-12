(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#create-exercise').click(createExercise);
    $('#query').click(clickQuery);
    getExercises();
    queryList();
  }

  function getExercises(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/exercises';
    $.getJSON(url, displayExercises);
  }

  function displayExercises(data){
    $('#exercises > tbody').empty();
    _.forEach(data.exercises, function(exercise){
      addRow(exercise.name, exercise.time, exercise.calories, exercise.date);
    });
  }

  function queryList(){
    $('#names').empty();
    var $all = $('<option>');
    $all.text('All');
    $('#names').append($all);
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/exercises';
    $.getJSON(url, function(data){
      var uniques = _.uniq(data.exercises, 'name');
      console.log(uniques);
      _.forEach(uniques, function(e){
        var $opt = $('<option>');
        $opt.text(e.name);
        $('#names').append($opt);
      });
    });
  }

  function addRow(name, time, cals, date){
    var exercise = [name, time, cals, date];
    var $tr = $('<tr>');

    for(var i = 0; i<4; i++){
      var $td = $('<td>');
      $td.text(exercise[i]);
      $tr.append($td);
    }

    $('#exercises > tbody').prepend($tr);
  }

  function createExercise(){
    var name = $('#name').val();
    var time = $('#time').val();
    var cals = $('#cals').val();
    var date = $('#date').val();

    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/exercises';

    var options = {};
    options.url = url;
    options.type = 'POST';
    options.data = {name: name, time: time, calories: cals, date: date};
    options.success = exerciseCreated;
    $.ajax(options);
  }

  function exerciseCreated(data){
    addRow(data.name, data.time, data.calories, data.date);
    queryList();
  }

  function clickQuery(){
    var query = $('#names').val();
    if(query==='All'){query='';}
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/exercises/'+query;
    $.getJSON(url, displayExercises);
  }
})();


(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#savePriority').click(savePriority);
    $('#priorityTable > tbody').on('click', '.clickable', clickHotCell);
    $('#priorityTable > tbody').on('click', '.updatePriority', updatePriority);
    $('#priorityTable > tbody').on('click', '.deletePriority', deletePriority);
    showAllPriorities();
  }

  function savePriority(event){
    var url = createUrl() + '/priorities';
    var data = $('#priority').serialize();
    var type = 'POST';
    var success = addPriorityRow;
    $.ajax({url:url, data:data, type:type, success:success});
    $('#priority').find('input').val('');
    $('#name').focus();
    event.preventDefault();
  }

  function createUrl(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    return url;
  }

  function addPriorityRow(data){
    if(data._id){
      var $tr = $('<tr>');
      $tr.attr('data-id', data._id);

      var $nameTd = $('<td>');
      var $name = $('<div>');
      $name.text(data.name);
      $name.addClass('clickable');
      $nameTd.append($name);

      var $valTd = $('<td>');
      var $value = $('<div>');
      $value.text(data.value);
      $value.addClass('clickable');
      $valTd.append($value);

      var $del = $('<td>');
      var $delButton = $('<button>');
      $delButton.text('Delete');
      $delButton.addClass('alert small deletePriority');
      $del.append($delButton);

      var $save = $('<td>');
      var $saveButton = $('<button>');
      $saveButton.text('Save');
      $saveButton.addClass('hide small updatePriority');
      $save.append($saveButton);

      $tr.append($nameTd, $valTd, $del, $save);
      $('#priorityTable > tbody').append($tr);
    }
  }

  function clickHotCell(){
    $(this).parent().siblings('td:nth-child(4)').children('button').removeClass('hide');
    $(this).replaceWith($('<input placeholder='+this.textContent+'>'));
  }

  function updatePriority(){
    var url = createUrl() + '/priorities/' + $(this).parent().parent().attr('data-id');
    var type = 'PUT';
    var success = updatePriorityRow;

    var name;
    var value;

    var newName = $(this).parent().siblings('td:nth-child(1)').children('input').val();
    if(newName){
      name = newName;
    }else{
      name = $(this).parent().siblings('td:nth-child(1)').children('div').text();
    }

    var newValue = $(this).parent().siblings('td:nth-child(2)').children('input').val();
    if(newValue){
      value = newValue;
    }else{
      value = $(this).parent().siblings('td:nth-child(2)').children('div').text();
    }

    var data = {name:name, value:value};

    $.ajax({url:url, data:data, type:type, success:success});
  }

  function updatePriorityRow(data){
    var $row = $('#priorityTable > tbody').children('[data-id='+data._id+']');
    $row.children(':nth-child(1)').children().replaceWith($('<div class="clickable">'+data.name+'</td>'));
    $row.children(':nth-child(2)').children().replaceWith($('<div class="clickable">'+data.value+'</td>'));
    $row.find('.updatePriority').addClass('hide');
  }

  function deletePriority(){
    var url = createUrl() + '/priorities/' + $(this).parent().parent().attr('data-id');
    var type = 'DELETE';
    var success = removePriorityRow;

    $.ajax({url:url, type:type, success:success});
  }

  function removePriorityRow(data){
    var $row = $('#priorityTable > tbody').children('[data-id='+data.deletedPriority._id+']');
    $row.remove();
  }

  function showAllPriorities(){
    var url = createUrl() + '/priorities';
    $.getJSON(url, function(data){
      _.forEach(data.priorities, function(priority){
        addPriorityRow(priority);
      });
    });
  }

})();


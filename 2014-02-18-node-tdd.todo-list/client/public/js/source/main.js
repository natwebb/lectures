(function(){

  'use strict';

  var priorityArray = [];
  var currentSearch = createUrl()+'/todos?limit=10&page=1&sort=isComplete&order=asc';
  var page = 1;

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    loadPriorities();
    loadTodos();
    $('#newTodo').click(saveNewTodo);
    $('#showAll').click(showAll);
    $('#dateHead').click(sortByHeader);
    $('#completeHead').click(sortByHeader);
    $('#updatePage').click(updatePage);
    $('#previousPage').click(previousPage);
    $('#nextPage').click(nextPage);
    $('#toggleNewTodo').click(toggleNewTodo);
    $('#todoTable > tbody').on('click', '.tagBox', filterByTag);
    $('#todoTable > tbody').on('click', 'input[type=checkbox]', toggleIsComplete);
  }

  function saveNewTodo(){
    var url = createUrl() + '/todos';
    var type = 'POST';
    var success = addTodoRow;
    var data = {isComplete:$('#isComplete').is(':checked'), name:$('#name').val(), dueDate:$('#dueDate').val(), priorityId:$('#priority').val(), tags:$('#tags').val()};

    $.ajax({url:url, type:type, data:data, success:success});

    $(this).parent().parent().find('input').val('');
  }

  function showAll(){
    $('#todoTable > tbody').empty();
    var limit = $('#perPage').val() || 10;
    currentSearch = createUrl() + '/todos?page=1&sort=isComplete&order=asc&limit=' + limit;
    page = 1;
    loadTodos();
  }

  function loadTodos(){
    $.getJSON(currentSearch, function(data){
      _.forEach(data.todos, function(e){
        addTodoRow(e);
      });
    });
    $('#pageBox').text('Page: '+page);
  }

  function addTodoRow(data){
    var $tr = $('<tr>');
    $tr.attr('data-id', data._id);

    var $complete = $('<td>');
    var $check = $('<input type="checkbox">');
    $check.prop('checked', (data.isComplete==='true'));
    $complete.append($check);

    var $name = $('<td>');
    $name.text(data.name);

    var $due = $('<td>');
    $due.text((new Date(data.dueDate)).toDateString());

    var $priority = $('<td>');
    var priorityLevel = _.find(priorityArray, function(p){
      return p._id.toString() === data.priorityId;
    });
    $priority.text(priorityLevel.name);

    var $tags = $('<td>');
    _.forEach(data.tags, function(tag){
      if(tag){
        var $box = $('<div>');
        $box.addClass('tagBox');
        $box.text(tag);
        $tags.append($box);
      }
    });

    var $del = $('<td>');
    var $delButton = $('<button class="small alert deleteButton">Delete</button>');
    $del.append($delButton);

    $tr.append($complete, $name, $due, $priority, $tags, $del);
    $('#todoTable tbody').append($tr);
  }

  function loadPriorities(){
    var url = createUrl() + '/priorities';
    $.getJSON(url, function(data){
      var priorities = data.priorities;
      priorities = _.sortBy(priorities, function(e){return e.value;});
      _.forEach(priorities, function(e){
        priorityArray.push(e);
        var $opt = $('<option>');
        $opt.text(e.name);
        $opt.val(e._id.toString());
        $('#priority').append($opt);
      });
    });
  }

  function sortByHeader(){
    $('#todoTable > tbody').empty();
    var limit = $('#perPage').val() || 10;
    var url = createUrl() + '/todos?limit='+limit+'&sort='+$(this).attr('data-name')+'&order='+$(this).attr('data-sort')+'&page=1';
    page = 1;
    currentSearch = url;
    if($(this).attr('data-sort')==='desc'){$(this).attr('data-sort', 'asc');}
    else{$(this).attr('data-sort', 'desc');}
    loadTodos();
  }

  function filterByTag(){
    $('#todoTable > tbody').empty();
    page = 1;
    var url = createUrl() + '/todos?limit='+$('#perPage').val()+'&tag='+$(this).text()+'&page=1';
    currentSearch = url;
    loadTodos();
  }

  function toggleIsComplete(){
    var url = createUrl() + '/todos/isComplete/toggle';
    var type = 'PUT';
    var data = {id:$(this).parent().parent().attr('data-id'), isComplete:$(this).is(':checked')};
    $.ajax({url:url, type:type, data:data});
  }

  function updatePage(){
    if($('#perPage').val()){
      $('#todoTable > tbody').empty();
      var url = currentSearch.replace(/limit=\d+/, 'limit='+$('#perPage').val());
      currentSearch = url;
      loadTodos();
    }
  }

  function nextPage(){
    $('#todoTable > tbody').empty();
    page++;
    var url = currentSearch.replace(/page=\d+/, 'page='+page);
    currentSearch = url;
    loadTodos();
  }

  function previousPage(){
    if(page>1){
      $('#todoTable > tbody').empty();
      page--;
      var url = currentSearch.replace(/page=\d+/, 'page='+page);
      currentSearch = url;
      loadTodos();
    }
  }

  function toggleNewTodo(){
    $('#newTodoRow').toggleClass('hide');
  }

  function createUrl(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    return url;
  }
})();


(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    //loadAlbumCovers();
  }
/*
  function loadAlbumCovers(){
    $.getJSON('/albums', function(data){
      _.forEach(data.records, function(album){
        makeAlbumBox(album);
      });
    });
  }

  function makeAlbumBox(album){
    console.log(album);
    var $div = $('<div class="albumBox">');
    $div.css('background-image', 'url('+album.cover.slice(53)+')');
    $div.attr('data-id', album._id);

    var $title = $('<div class="titleBox">');
    $title.text(album.title);

    var $date = $('<div class="dateBox">');
    $date.text(album.taken.slice(0,10));

    $div.append($title, $date);
    $('#albumWrapper').append($div);
  }
  */
})();


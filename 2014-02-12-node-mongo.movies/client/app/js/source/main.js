(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#movie').submit(submitMovie);
    $('#movieRow').on('click', '.searchable', searchBy);
    $('#showAll').click(displayMovies);
    $('#toggleForm').click(toggleForm);
    displayMovies();
  }

  function submitMovie(event){
    var data = $(this).serialize();
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/movies';
    var type = 'POST';
    var success = newMovie;

    $.ajax({url:url, type:type, data:data, success:success});

    event.preventDefault();
  }

  function newMovie(movie){
    makeMovieBox(movie);
    $('#movie input').val('');
    $('#name').focus();
  }

  function displayMovies(){
    $('#movieRow').empty();
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/movies';
    $.getJSON(url, function(data){
      var movies = data.movies;
      for(var i=0; i<movies.length; i++){
        makeMovieBox(movies[i]);
      }
    });
  }

  function searchBy(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/movies';
    url += '/query?'+$(this).attr('data')+'='+this.textContent;
    $.getJSON(url, function(data){
      var movies = data.movies;
      $('#movieRow').empty();
      _.forEach(movies, function(movie){
        makeMovieBox(movie);
      });
    });
  }

  function makeMovieBox(movie){
    var $newMovie = $('<div>');
    $newMovie.addClass('movieBox');

    var $poster = $('<div>');
    $poster.addClass('posterBox');
    $poster.css('background-image', 'url('+movie.poster+')');
    $newMovie.append($poster);

    var $text = $('<ul>');
    $text.addClass('movieTextBox');

    var $name = $('<li>');
    $name.text(movie.name);
    $text.append($name);

    var $rating = $('<li>');
    $rating.text('Rated ' + movie.rating);
    $text.append($rating);

    var $director = $('<li>');
    $director.text('Directed by ' + movie.director);
    $text.append($director);

    var $actors = $('<li>');
    $actors.text('Starring ');
    _.forEach(movie.actors, function(actor){
      var $span = $('<span>');
      $span.addClass('searchable');
      $span.attr('data', 'actors');
      $span.text(actor + ' ');
      $actors.append($span);
    });
    $text.append($actors);

    var $runtime = $('<li>');
    $runtime.text('Running Time: ' + movie.runtime + ' minutes');
    $text.append($runtime);

    var $year = $('<li>');
    $year.text('Release Year: ' + movie.year);
    $text.append($year);

    var $studio = $('<li>');
    $year.text('Produced by ' + movie.studio);
    $text.append($studio);

    $newMovie.append($text);

    $('#movieRow').append($newMovie);
  }

  function toggleForm(){
    $('#movie').toggleClass('hide');
  }

})();


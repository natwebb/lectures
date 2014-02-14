(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#addMovie').click(submitMovie);
    $('#updateMovie').click(updateMovie);
    $('#movieRow').on('click', '.searchable', searchBy);
    $('#movieRow').on('click', '.deleteX', deleteMovie);
    $('#movieRow').on('click', '.updateU', populateMovieForm);
    $('#showAll').click(displayAllMovies);
    $('#toggleForm').click(toggleForm);
    displayAllMovies();
  }

  function submitMovie(event){
    var data = $(this).closest('#movie').serialize();
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

  function displayAllMovies(){
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
    url += '/query?'+$(this).data('infotype')+'='+this.textContent;
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
    $newMovie.attr('data-movieId', movie._id);

    /*---Make Poster Box---*/
    var $poster = $('<div>');
    $poster.addClass('posterBox');
    $poster.css('background-image', 'url('+movie.poster+')');
    $newMovie.append($poster);

    /*---Make Text Box---*/
    var $text = makeTextBox(movie);
    $newMovie.append($text);

    /*---Make Delete X---*/
    var $x = $('<div>');
    $x.addClass('actionButton deleteX');
    $x.text('X');
    $newMovie.append($x);

    /*---Make Update U---*/
    var $u = $('<div>');
    $u.addClass('actionButton updateU');
    $u.text('U');
    $newMovie.append($u);

    $('#movieRow').append($newMovie);
  }

  function makeTextBox(movie){
    var $text = $('<ul>');
    $text.addClass('movieTextBox');

    var $name = $('<li>');
    $name.text(movie.name.toUpperCase());
    $text.append($name);

    var $rating = $('<li>');
    var $ratSpan = $('<span>');
    $ratSpan.addClass('searchable');
    $ratSpan.attr('data-infotype', 'rating');
    $ratSpan.text(movie.rating);
    $rating.text('Rated ');
    $rating.append($ratSpan);
    $text.append($rating);

    var $director = $('<li>');
    var $dirSpan = $('<span>');
    $dirSpan.addClass('searchable');
    $dirSpan.attr('data-infotype', 'director');
    $dirSpan.text(movie.director);
    $director.text('Directed by ');
    $director.append($dirSpan);
    $text.append($director);

    var $actors = $('<li>');
    $actors.text('Starring ');
    _.forEach(movie.actors, function(actor){
      var $span = $('<span>');
      $span.addClass('searchable');
      $span.attr('data-infotype', 'actors');
      $span.text(actor + ', ');
      if(movie.actors.indexOf(actor)===(movie.actors.length-1)){$span.text(actor);}
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
    $studio.text('Produced by ' + movie.studio);
    $text.append($studio);

    return $text;
  }

  function deleteMovie(){
    var id = $(this).parent().attr('data-movieId');
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/movies/'+ id;
    var type = 'DELETE';
    var success = removeMovieBox;

    $.ajax({url:url, type:type, success:success});
  }

  function removeMovieBox(data){
    $('.movieBox[data-movieid='+data.id+']').remove();
  }

  function populateMovieForm(){
    $('#movie').removeClass('hide');
    $('#addMovie').addClass('hide');
    $('#updateMovie').removeClass('hide');

    var id = $(this).parent().attr('data-movieId');
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/movies/'+ id;

    $.getJSON(url, function(data){
      var movie = data.movies[0];
      $('#movie input[name="name"]').val(movie.name);
      $('#movie input[name="rating"]').val(movie.rating);
      $('#movie input[name="runtime"]').val(movie.runtime);
      $('#movie input[name="year"]').val(movie.year);
      $('#movie input[name="studio"]').val(movie.studio);
      $('#movie input[name="actors"]').val(movie.actors.join(', '));
      $('#movie input[name="director"]').val(movie.director);
      $('#movie input[name="poster"]').val(movie.poster);
      $('#updateMovie').attr('data-movieId', movie._id);
    });
  }

  function updateMovie(event){
    var id = $(this).attr('data-movieId');
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/movies/'+ id;
    var type = 'PUT';
    var data = $(this).closest('#movie').serialize();
    var success = resetAfterUpdate;

    $.ajax({url:url, type:type, data:data, success:success});

    event.preventDefault();
  }

  function toggleForm(){
    $('#movie').toggleClass('hide');
  }

  function resetAfterUpdate(data){
    var movie = data.movie;

    var $text = makeTextBox(movie);
    $('.movieBox[data-movieid='+data.id+'] .movieTextBox').remove();
    $('.movieBox[data-movieid='+data.id+']').append($text);

    /*
    $('.movieBox[data-movieid='+data.id+'] .movieTextBox li:nth-child(1)').text(movie.name.toUpperCase());
    $('.movieBox[data-movieid='+data.id+'] .movieTextBox li:nth-child(2) span').text(movie.rating);
    $('.movieBox[data-movieid='+data.id+'] .movieTextBox li:nth-child(3) span').text(movie.director);
    $('.movieBox[data-movieid='+data.id+'] .movieTextBox li:nth-child(4)').text('Starring ');
    _.forEach(movie.actors, function(actor){
      var $span = $('<span>');
      $span.addClass('searchable');
      $span.attr('data-infotype', 'actors');
      $span.text(actor + ' ');
      $('.movieBox[data-movieid='+data.id+'] .movieTextBox li:nth-child(4)').append($span);
    });
    $('.movieBox[data-movieid='+data.id+'] .movieTextBox li:nth-child(5)').text('Running Time: '+movie.runtime+' minutes');
    $('.movieBox[data-movieid='+data.id+'] .movieTextBox li:nth-child(6)').text('Release Year: '+movie.year);
    $('.movieBox[data-movieid='+data.id+'] .movieTextBox li:nth-child(7)').text('Produced by '+movie.studio);
    */

    $('#movie input').val('');
    $('#name').focus();
    $('#addMovie').removeClass('hide');
    $('#updateMovie').addClass('hide');
    $('#movie').addClass('hide');
  }

})();


/* global Animal, animalFactory: false */

(function(){

  'use strict';

  $(document).ready(initialize);

  var animals = [];

  function initialize(){
    $('#add-photo').click(clickAddPhoto);
    $('#add-animal').click(clickAddAnimal);
    populateAnimalTable();
  }

  function clickAddPhoto(){
    var url = $('#photo').val();
    var $a = $('<a class="th">');

    var $newDiv = $('<div>');
    $newDiv.css('background-image', 'url('+url+')');
    $newDiv.addClass('animalPhoto');

    $a.append($newDiv);
    $('#photos').append($a[0]);

    $('#photo').val('');
    event.preventDefault();
  }

  function clickAddAnimal(){
    var name = $('#name').val();
    var species = $('#species').val();
    var gender = $('#gender').val();
    var age = $('#age').val() * 1;
    var color = $('#color').val();
    var description = $('#description').val();
    var photos = getAnimalPhotos();

    var animal = new Animal(name, species, gender, age, color, description, photos);
    animals.push(animal);
    addAnimalToTable(animal);

    event.preventDefault();
  }

  function getAnimalPhotos(){
    return _.map($('#photos > a > div'), function(e){
      return $(e).css('background-image');
    });
  }

  function populateAnimalTable(){
    animals = animalFactory();
    for(var i = 0; i<animals.length; i++){
      addAnimalToTable(animals[i]);
    }
  }

  function addAnimalToTable(a){
    var $tr = $('<tr>');

    var $name = $('<td>');
    $name.text(a.name);
    $tr.append($name);

    var $species = $('<td>');
    var $anchor = $('<a>');
    $anchor.attr('href', '#');
    $anchor.attr('data-search', 'species');
    $anchor.attr('data-value', a.species);
    $anchor.text(a.species);
    $species.append($anchor);
    $tr.append($species);

    var $gender = $('<td>');
    $anchor = $('<a>');
    $anchor.attr('href', '#');
    $anchor.attr('data-search', 'gender');
    $anchor.attr('data-value', a.gender);
    $anchor.text(a.gender);
    $gender.append($anchor);
    $tr.append($gender);

    var $age = $('<td>');
    $anchor = $('<a>');
    $anchor.attr('href', '#');
    $anchor.attr('data-search', 'age');
    $anchor.attr('data-value', a.age);
    $anchor.text(a.age);
    $age.append($anchor);
    $tr.append($age);

    var $color = $('<td>');
    $anchor = $('<a>');
    $anchor.attr('href', '#');
    $anchor.attr('data-search', 'color');
    $anchor.attr('data-value', a.color);
    $anchor.text(a.color);
    $color.append($anchor);
    $tr.append($color);

    var $description = $('<td>');
    $description.text(a.description);
    $tr.append($description);

    var $photos = $('<td>');
    var thumbs = makeThumbnails(a.photos);
    for(var j = 0; j<thumbs.length; j++){
      $photos.append(thumbs[j]);
    }
    $tr.append($photos);

    $('#animalTable').prepend($tr);
  }

  function makeThumbnails(urlArr){
    var thumbs = _.map(urlArr, function(url){
      var $a = $('<a class="th">');
      var $newDiv = $('<div>');
      $newDiv.css('background-image', url);
      $newDiv.addClass('animalPhoto');
      $a.append($newDiv);
      return $a;
    });

    return thumbs;
  }

})();

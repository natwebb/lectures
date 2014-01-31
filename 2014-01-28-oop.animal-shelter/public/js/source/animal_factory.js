/* global Animal: false */

(function(){

  'use strict';

  window.animalFactory = function(){
    var animals = [];
    var photos;
    var animal;

    photos = [];
    photos[0] = 'url(http://www.ezra-jack-keats.org/wp-content/uploads/2012/09/black-cat.jpg)';
    photos[1] = 'url(http://wallalay.com/wp-content/uploads/2013/11/Black-Cat-6.jpg)';
    animal = new Animal('Pixel', 'Cat', 'Female', '2', 'Black', 'Very strange', photos);
    animals.push(animal);

    photos = [];
    photos[0] = 'url(http://mypages.valdosta.edu/psmckinley/cat2.jpg)';
    photos[1] = 'url(http://www.deargrumpycat.com/wp-content/uploads/2013/02/Grumpy-Cat1.jpg)';
    animal = new Animal('Tardar Sauce', 'Cat', 'Female', '6', 'Brown', 'This is one grumpy cat', photos);
    animals.push(animal);

    photos = [];
    photos[0] = 'url(http://static02.mediaite.com/geekosystem/uploads/2013/12/doge.jpg)';
    photos[1] = 'url(http://static3.wikia.nocookie.net/__cb20130826211346/creepypasta/images/0/01/DOGE.png)';
    animal = new Animal('Doge', 'Dog', 'Male', '1', 'Orange and white', 'So friend, much adopt, wow', photos);
    animals.push(animal);

    photos = [];
    photos[0] = 'url(https://images.akc.org/breeds/action_images/shiba_inu.jpg)';
    photos[1] = 'url(http://all-puppies.com/wp-content/uploads/2013/11/Shiba-Inu-Smile.jpg)';
    animal = new Animal('Bilbo', 'Dog', 'Male', '1', 'Orange and white', 'Loves to get under the blankets', photos);
    animals.push(animal);

    photos = [];
    photos[0] = 'url(http://upload.wikimedia.org/wikipedia/commons/e/ed/Ara_macao_-on_a_small_bicycle-8.jpg)';
    photos[1] = 'url(http://www.fxdirectory.info/wp-content/uploads/2011/05/Red-Parrot-which-has-its-own-uniqueness.jpg)';
    animal = new Animal('Sherlock', 'Bird', 'Male', '10', 'Multicolored', 'Parrot who repeats everything you say', photos);
    animals.push(animal);

    photos = [];
    photos[0] = 'url(http://www.lafebervet.com/wp-content/uploads/2012/05/hedgehog_stock_photo.jpg)';
    photos[1] = 'url(http://pokejungle.net/wp-content/uploads/2013/01/Cute-Hedgehog.jpg)';
    animal = new Animal('Charlemagne', 'Hedgehog', 'Female', '3', 'Brown', 'Loves to trundle down the halls of power', photos);
    animals.push(animal);

    photos = [];
    photos[0] = 'url(http://cdn.zmescience.com/wp-content/uploads/2011/10/hedgehog.jpg)';
    photos[1] = 'url(http://i.telegraph.co.uk/multimedia/archive/01456/ppet1_1456179c.jpg)';
    animal = new Animal('Winston', 'Hedgehog', 'Male', '5', 'Brown', 'Looks great with a cigar', photos);
    animals.push(animal);

    return animals;
  };

})();

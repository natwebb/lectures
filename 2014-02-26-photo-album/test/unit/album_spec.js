'use strict';

process.env.DBNAME = 'albumtest';
var expect = require('chai').expect;
var fs = require('fs');
var exec = require('child_process').exec;
var Album;

describe('Album', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Album = require('../../app/models/album');
      done();
    });
  });

  beforeEach(function(done){
    var path = __dirname + '/../../app/static/img/test*';
    var cmd = 'rm -rf ' + path;

    exec(cmd, function(){
      var origfile = __dirname + '/../fixtures/euro.jpg';
      var copyfile = __dirname + '/../fixtures/euro-copy.jpg';
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));

      global.nss.db.dropDatabase(function(err, result){
        done();
      });
    });
  });

  describe('new', function(){
    it('should create a new album object', function(){
      var o = {};
      o.title = 'Test Euro Vacation';
      o.taken = '2010-03-25';
      var a1 = new Album(o);
      expect(a1).to.be.instanceof(Album);
      expect(a1.title).to.equal('Test Euro Vacation');
      expect(a1.taken).to.be.instanceof(Date);
      expect(a1.photos).to.have.length(0);
    });
  });

  describe('#addCover', function(){
    it('should add a cover to the new album', function(){
      var o = {};
      o.title = 'Test Euro Vacation';
      o.taken = '2010-03-25';
      var a1 = new Album(o);
      var oldname = __dirname + '/../fixtures/euro-copy.jpg';
      a1.addCover(oldname);
      expect(a1.cover).to.equal('/img/testeurovacation/cover.jpg');
    });
  });

  describe('#insert', function(){
    it('should insert an album into the database', function(done){
      var o = {};
      o.title = 'Test Euro Vacation';
      o.taken = '2010-03-25';
      var a1 = new Album(o);
      var oldname = __dirname + '/../fixtures/euro-copy.jpg';
      a1.addCover(oldname);
      a1.insert(function(savedAlbum){
        expect(savedAlbum._id.toString()).to.have.length(24);
        done();
      });
    });
  });

  describe('find methods', function(){
    beforeEach(function(done){
      var a1 = new Album({title: 'A', taken:'2012-03-25'});
      var a2 = new Album({title: 'B', taken:'2012-03-26'});
      var a3 = new Album({title: 'C', taken:'2012-03-27'});

      a1.insert(function(){
        a2.insert(function(){
          a3.insert(function(){
            done();
          });
        });
      });
    });

    describe('.findAll', function(){
      it('should find all the albums in the database', function(done){
        Album.findAll(function(albums){
          expect(albums).to.have.length(3);
          done();
        });
      });
    });

    describe('.findById', function(){
      it('should return an album by ID', function(done){
        var a4 = new Album({title: 'A', taken:'2012-03-25'});
        a4.insert(function(){
          Album.findById(a4._id.toString(), function(album){
            expect(album._id.toString()).to.equal(a4._id.toString());
            done();
          });
        });
      });
    });
  });

  describe('adding photos', function(){
    beforeEach(function(done){
      var origfile = __dirname + '/../fixtures/euro.jpg';
      var copyfile = __dirname + '/../fixtures/euro-two.jpg';
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));
      done();
    });

    describe('#addPhoto', function(){
      it('should add a photo to an album and update the album', function(done){
        var a1 = new Album({title: 'Test Euro Vacation', taken:'2012-03-25'});
        var oldname = __dirname + '/../fixtures/euro-copy.jpg';
        a1.addCover(oldname);
        a1.insert(function(){
          var imgPath = __dirname + '/../fixtures/euro-two.jpg';
          a1.addPhoto(imgPath, 'europe.jpg');
          expect(a1.photos[0]).to.equal('/img/testeurovacation/europe.jpg');
          done();
        });
      });
    });
  });

  describe('#update', function(){
    it('should update an album in the database', function(done){
      var a1 = new Album({title: 'Test Euro Vacation', taken:'2012-03-25'});
      a1.insert(function(){
        a1.title = 'Test American Vacation';
        a1.update(function(count){
          expect(count).to.equal(1);
          done();
        });
      });
    });
  });
});

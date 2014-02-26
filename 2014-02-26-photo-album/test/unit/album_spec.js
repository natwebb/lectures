'use strict';

process.env.DBNAME = 'albumtest';
var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
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
    var path = __dirname + '/../../app/static/img';
    rimraf.sync(path);
    fs.mkdirSync(path);
    var origfile = __dirname + '/../fixtures/euro.jpg';
    var copyfile = __dirname + '/../fixtures/euro-copy.jpg';
    fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));

    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('new', function(){
    it('should create a new album object', function(){
      var o = {};
      o.title = 'Euro Vacation';
      o.taken = '2010-03-25';
      var a1 = new Album(o);
      expect(a1).to.be.instanceof(Album);
      expect(a1.title).to.equal('Euro Vacation');
      expect(a1.taken).to.be.instanceof(Date);
    });
  });

  describe('#addCover', function(){
    it('should add a cover to the new album', function(){
      var o = {};
      o.title = 'Euro Vacation';
      o.taken = '2010-03-25';
      var a1 = new Album(o);
      var oldname = __dirname + '/../fixtures/euro-copy.jpg';
      a1.addCover(oldname);
      expect(a1.cover).to.equal(path.normalize(__dirname + '/../../app/static/img/eurovacation/cover.jpg'));
    });
  });

  describe('#insert', function(){
    it('should insert an album into the database', function(done){
      var o = {};
      o.title = 'Euro Vacation';
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
});

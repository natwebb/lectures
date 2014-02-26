/* jshint expr:true */

'use strict';

process.env.DBNAME = 'albumtest';
var app = require('../../app/app');
var request = require('supertest');
//var expect = require('chai').expect;
var fs = require('fs');
var rimraf = require('rimraf');
//var path = require('path');
var Album;

describe('tasks', function(){

  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
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

  describe('GET /albums/new', function(){
    it('should display the new album html page', function(done){
      request(app)
      .get('/albums/new')
      .expect(200, done);
    });
  });

  describe('POST /albums', function(){
    it('should create a new album and send user back to home', function(done){
      var filename = __dirname + '/../fixtures/euro-copy.jpg';
      request(app)
      .post('/albums')
      .attach('cover', filename)
      .field('title', 'European Vacation')
      .field('taken', '2014-02-25')
      .expect(302, done);
    });
  });

});

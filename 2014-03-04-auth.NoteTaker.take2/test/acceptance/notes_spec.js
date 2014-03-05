/* jshint expr:true */

'use strict';

process.env.DBNAME = 'note2-test';
var app = require('../../app/app');
var request = require('supertest');
//var expect = require('chai').expect;
var User, Note;
var u1;
var cookie;

describe('Notes', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      Note = require('../../app/models/note');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      u1 = new User({email:'sue@aol.com', password:'678utf'});
      u1.hashPassword(function(){
        u1.insert(function(){
          done();
        });
      });
    });
  });

  describe('GET /', function(){
    it('should display the new home page', function(done){
      request(app)
      .get('/')
      .expect(200, done);
    });
  });

  describe('GET /notes', function(){
    it('should not display notes page if user isn\'t logged in', function(done){
      request(app)
      .get('/notes')
      .expect(302, done);
    });
  });

  describe('AUTHORIZED', function(){
    beforeEach(function(done){
      request(app)
      .post('/login')
      .field('email', 'sue@aol.com')
      .field('password', '678utf')
      .end(function(err, res){
        cookie = res.headers['set-cookie'];
        done();
      });
    });

    describe('GET /notes', function(){
      it('should display notes page if user is logged in', function(done){
        request(app)
        .get('/notes')
        .set('cookie', cookie)
        .expect(200, done);
      });
    });
  });
});

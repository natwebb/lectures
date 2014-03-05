'use strict';

var Note = require('../models/note');

exports.index = function(req, res){
  Note.findByUserId(req.session.userId, function(notes){
    res.render('notes/index', {title:'Notes Page', notes:notes});
  });
};

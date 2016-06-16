'use strict';

var express = require('express');
var path = require('path');
var app = express();
var nunjucks = require('nunjucks');
var homeController = require('./controllers/homeController');

app.use('/img',  express.static(__dirname + '/webapp/img'));
app.use('/js',  express.static(__dirname + '/webapp/js'));
app.use('/views',  express.static(__dirname + '/webapp/views'));
app.use('/css',  express.static(__dirname + '/webapp/css'));

app.use('/vendor',  express.static(__dirname + '/bower_components'));

app.set('webapp', __dirname + '/webapp');

var nun = nunjucks.configure('webapp', {
    autoescape: true,
    express: app,
    tags: {
        blockStart: '<%',
        blockEnd: '%>',
        variableStart: '<$',
        variableEnd: '$>',
        commentStart: '<#',
        commentEnd: '#>'
    }
});

app.get('/', function(req, res){
  res.status(301);
  res.redirect('/Home');
});

homeController.listen(app);

app.listen(3000, function(){
  console.log('AngularApp started on port 3000');
});

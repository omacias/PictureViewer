'use strict';

var express = require('express');
var lowdb = require('lowdb');
var path = require('path');
var app = express();
var nunjucks = require('nunjucks');
var msjs = require('./resources/language/messages_EN.json');
var homeController = require('./controllers/homeController');
var imageController = require('./controllers/imageController');

declareMiddlewares();

configNunjucks();

interceptor();

redirectHome();

controllersListen();

startServer();

function declareMiddlewares(){
  app.use('/img',  express.static(__dirname + '/webapp/img'));
  app.use('/js',  express.static(__dirname + '/webapp/js'));
  app.use('/views',  express.static(__dirname + '/webapp/views'));
  app.use('/css',  express.static(__dirname + '/webapp/css'));

  app.use('/vendor',  express.static(__dirname + '/bower_components'));

  app.set('webapp', __dirname + '/webapp');
}

function configNunjucks(){
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
}

function interceptor() {
  //interceptor*******************
  app.use(function(req, res, next) {
    res.locals.app_title = msjs.app_title;
    res.locals.app_lang = msjs.app_lang;
    res.locals.messages = JSON.stringify(msjs);
    next();
  });
  //******************************
}

function redirectHome() {
  app.get('/', function(req, res){
    res.status(301);
    res.redirect('/Home');
  });
}

function controllersListen(){
  homeController.listen(app);
  imageController.listen(app);
}

function startServer(){
  app.listen(3000, function(){
    console.log('AngularApp started on port 3000');
  });
}

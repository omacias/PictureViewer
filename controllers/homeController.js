'use strict';

exports.listen = function(app){
  load(app);
  license(app);
  photographersJson(app);
};

function load(app){
  app.get('/Home', function(req, res){
    res.render('index.html', {});
  });
}

function license(app){
  app.get('/License', function(req, res){
    res.render('license.html', {});
  });
}

function photographersJson(app) {
  app.get('/getPhotographers', function(req, res){
    res.json([{
      name: "Zach Walls",
      from: "England",
      style: "img/zach.jpg",
      fb: "http://www.facebook.com/Zach_Walls",
      fbShort: "/Zach_Walls"
    },{
      name: "Lara Candle",
      from: "France",
      style: "img/lara.jpg",
      fb: "http://www.facebook.com/Lara_Candle",
      fbShort: "/Lara_Candle"
    },{
      name: "Andrea Reis",
      from: "Brasil",
      style: "img/andrea.jpg",
      fb: "http://www.facebook.com/Andrea_Reis",
      fbShort: "/Andrea_Reis"
    }]);
  });
}

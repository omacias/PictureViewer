'use strict';

var path = require('path');

exports.listen = function(app){
  getPicture(app);
}

function getPicture(app){
  app.get('/getPicture/:uniqueId', function(req, res){
    res.sendFile(path.resolve(__dirname + '/../resources/img/'+ req.params.uniqueId +'.jpg'));
  });
}

'use strict';

exports.listen = function(app){
  load(app);
  license(app);
  photographersJson(app);
  albumsJson(app);
  jsonExample(app);
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
        style: "/getPicture/zach",
        fb: "http://www.facebook.com/Zach_Walls",
        fbShort: "/Zach_Walls"
      },{
        name: "Lara Candle",
        from: "France",
        style: "/getPicture/lara",
        fb: "http://www.facebook.com/Lara_Candle",
        fbShort: "/Lara_Candle"
      },{
        name: "Andrea Reis",
        from: "Brasil",
        style: "/getPicture/andrea",
        fb: "http://www.facebook.com/Andrea_Reis",
        fbShort: "/Andrea_Reis"
      }]);
    });
  }

  function albumsJson(app){
    app.get('/getAlbums', function(req, res){
      res.json([
        {
          albumName: "Around Azteca Culture",
          albumDescription: "Pictures taken into Azteca Culture and Mexico surroundings",
          albumCover: "/getPicture/azteca",
          albumLocation: "Mexico City",
          albumDate: new Date()
        },
        {
          albumName: "Barcelona World Cup",
          albumDescription: "Barcelona World Cup pics, enjoy these awesome pics",
          albumCover: "/getPicture/barcelona",
          albumLocation: "Barcelona",
          albumDate: new Date()
        },
        {
          albumName: "USA July 4Th",
          albumDescription: "July 4Th Celebration in New York",
          albumCover: "/getPicture/july4",
          albumLocation: "New York, USA",
          albumDate: new Date()
        },
        {
          albumName: "New Zealand Tour",
          albumDescription: "Several places around New Zealand",
          albumCover: "/getPicture/zealand",
          albumLocation: "New Zealand",
          albumDate: new Date()
        },
        {
          albumName: "Brazil Festival February",
          albumDescription: "Brazil Festival, incredible images :)",
          albumCover: "/getPicture/brazil",
          albumLocation: "Mexico, City",
          albumDate: new Date()
        },
        {
          albumName: "London Olympic Games",
          albumDescription: "London Olimpic Games opening celebration",
          albumCover: "/getPicture/london",
          albumLocation: "London, UK",
          albumDate: new Date()
        }
      ]);
    });
}

function jsonExample(app) {
  app.get('/Json/get', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/plain");
    res.send([
              {
                "ID": 1,
                "Label": "A",
                "CHILD": [
                  {
                    "ID": 2,
                    "Label": "B",
                    "CHILD": [
                      {
                        "ID": 5,
                        "Label": "E",
                        "CHILD": null
                      },
                      {
                        "ID": 6,
                        "Label": "F",
                        "CHILD": null
                      },
                      {
                        "ID": 7,
                        "Label": "G",
                        "CHILD": null
                      }
                    ]
                  },
                  {
                    "ID": 3,
                    "Label": "C",
                    "CHILD": null
                  },
                  {
                    "ID": 4,
                    "Label": "D",
                    "CHILD":[
                      {
                        "ID": 8,
                        "Label": "H",
                        "CHILD": null
                      },
                      {
                        "ID": 9,
                        "Label": "I",
                        "CHILD": null
                      }
                    ]
                  }
                ]
              }
            ]);
  });
}

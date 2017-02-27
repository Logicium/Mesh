var express = require('express');
var router = express.Router();
var LinvoDB = require("linvodb3");
LinvoDB.dbPath = process.cwd();
var Activities = new LinvoDB("activities", {});

router.get('/',function(request,response){
  Activities.find({}, function (err, docs) {
    response.send(docs);
  });

});

router.post('/add',function(request,response){
    //Create new activity
});

module.exports = {r:router,database:Activities};



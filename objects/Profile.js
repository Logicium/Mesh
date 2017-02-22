var express = require('express');
var router = express.Router();
var LinvoDB = require("linvodb3");
LinvoDB.dbPath = process.cwd();
var Profile = new LinvoDB("profile", {});

router.get('/',function(request,response){
  //List all from Database
  console.log("Download Profile request.");
  Profile.find({}, function (err, docs) {
    response.send(docs);
  });
});

module.exports = router;
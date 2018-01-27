var express = require('express');
var router = express.Router();
var Profile = require('./../server/Databases').Profiles;

router.get('/',function(request,response){
  //List all from Database
  console.log("Download Profile request.");
  Profile.find({}, function (err, docs) {
    response.send(docs);
  });
});

module.exports = router;

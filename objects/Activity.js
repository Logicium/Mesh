var express = require('express');
var router = express.Router();
var Activities = require('./../server/Databases').Activities;

router.get('/',function(request,response){
  Activities.find({}, function (err, docs) {
    response.send(docs);
  });
});

router.post('/add',function(request,response){
    //Create new activity
});

module.exports = router;

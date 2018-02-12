var express = require('express');
var router = express.Router();
var Activities = require('./../server/Databases').Activities;
var Members =  require('./../server/Databases').Members;

router.get('/',function(request,response){
  Activities.find({}, function (err, docs) {
    response.send(docs);
  });
});

router.post('/list',function(request,response){
    console.log("Download all org Activities request.");
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Activities.find({org:linkedMember.defaultOrg},function(err,orgActivities){
            response.send(orgActivities);
        });
    });
});

router.post('/add',function(request,response){
    //Create new activity
});

module.exports = router;

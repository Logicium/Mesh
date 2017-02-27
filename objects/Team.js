var express = require('express');
var router = express.Router();
var LinvoDB = require("linvodb3");
LinvoDB.dbPath = process.cwd();
var Teams = new LinvoDB("teams", {});

router.get('/',function(request,response){
  //List all from Database
  console.log("Download all Teams request.");
  Teams.find({}, function (err, docs) {
    response.send(docs);
  });
});

router.post('/add',function(request,response){
  console.log("Add team request: ");
  console.log(request.body);
  Teams.insert(request.body, function (err, newDoc) {
    console.log(newDoc);
    response.send({message:"New team added",data:newDoc});
  });
});

router.post('/update',function(request,response){
    //Update
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;

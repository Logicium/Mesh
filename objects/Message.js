var LinvoDB = require("linvodb3");
LinvoDB.dbPath = process.cwd();
var Messages = new LinvoDB("messages",{});

var Message = function(){
    this.members = [];
    this.teams = [];
    this.users = [];
    this.message = "";
    this.media = "";
};

Message.prototype={

};


var express = require('express');
var router = express.Router();

router.get('/',function(request,response){
    response.send({data:Messages.all});
    //List all from Database
});

router.post('/add',function(request,response){
  console.log("Add message request: ");
  console.log(request.body);
  var m = new Message(request.body);
  Messages.insert(m, function (err, newDoc) {
    console.log(newDoc);
    response.send({message:"New message added!",data:newDoc});
  });

  //Special feature coming soon ;)
  // var a = new Activity(request.body.activity);
  // Activities.insert(a,function(err,newDoc){});

});

router.post('/update',function(request,response){
    //Update
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;
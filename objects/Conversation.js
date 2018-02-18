var express = require('express');
var router = express.Router();
var Messages =  require('./../server/Databases').Messages;
var Conversations =  require('./../server/Databases').Conversation;
var Members =  require('./../server/Databases').Members;

var Conversation = function(dataModel){
    this.from = dataModel[0]+'';
    this.members = dataModel[1];
    this.teams = dataModel[2];
    this.message = dataModel[3]+'';
    this.media = dataModel[4]+'';
    this.org = '';
};

//Find all organization messages, then find all messages that belong to that user.
router.get('/',function(request,response){
  Messages.find({}, function (err, docs) {
    response.send(docs);
  });
});

router.post('/list',function(request,response){
    console.log("Download all user Messages request.");
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Conversations.find({$and:[{members:linkedMember._id},{org:linkedMember.defaultOrg}]},function(err,orgMessages){
            response.send(orgMessages);
        });
    });
});

router.post('/add',function(request,response){
  console.log("Add message request: ");
  console.log(request.body);
  var c = new Conversation(request.body);
  Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
      m.org = linkedMember.defaultOrg;
      Conversations.insert(m, function (err, newDoc) {
        console.log(newDoc);
        response.send({message:"New message added!",data:newDoc});
      });
  });
});

router.post('/find',function(request,response){
    console.log("Finding one: "+request.body._id);
    Messages.find({'_id':request.body._id}, function (err, docs) {
        response.send(docs);
    });
});

router.post('/update',function(request,response){
    console.log(request.body);
    var updateObject = request.body.objectData;
    var updateId = updateObject._id;
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Conversations.update({$and:[{_id:updateId},{org:linkedMember.defaultOrg}]},updateObject,{},function(err,doc){
            console.log(JSON.stringify(doc));
            response.send({message:'Successfully Updated',doc:doc});
        });
    });
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;

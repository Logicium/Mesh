var express = require('express');
var router = express.Router();
var LinvoDB = require("linvodb3");
LinvoDB.dbPath = process.cwd();
var Members = new LinvoDB("members", {});
var Activity = require('./objects/Activity.js').database;

var Member = function(DataModel){
    this.firstName = DataModel['firstName'];
    this.lastName = DataModel['lastName'];
    this.fullName = this.firstName + ' ' + this.lastName;
    this.twitter = DataModel['twitter'];
    this.facebook = DataModel['facebook'];
    this.website = DataModel['website'];

    this.roles = [];
    this.projects = [];
    this.activity = [];
    this.teams = [];
    this.messages = [];
    this.events = [];
};

Member.prototype = {

};

router.get('/',function(request,response){
    //List all from Database
    console.log("Download all Members request.");
    Members.find({}, function (err, docs) {
        response.send(docs);
    });
});

router.post('/delete',function(request,response){
    //Delete
});

router.post('/add',function(request,response){
    console.log("Add member request: ");
    console.log(request.body);
    Members.insert(request.body, function (err, newDoc) {
        console.log(newDoc);
        response.send({message:"New member added",data:newDoc});
        Activity.insert({message:newDoc.inputs.fullName+"was added",type:'memberAdd'}, function (err, newDoc) {
          console.log(newDoc);
        });
    });
});

//Returns only the raw JSON of a userObject
router.get('/find',function(request,response){
    console.log("Finding one member: "+response._id);
    Members.find({'_id':response._id}, function (err, docs) {
        response.send(docs);
    });
});

router.post('/update',function(request,response){
    console.log('Update request: '+request._id);
    Members.update({ id: request._id }, request, {}, function(err, doc) {
        response.send({message:"Updated successfully."})
    });
});

router.get('/findOneObject',function(request,response){
    console.log("Finding one user complete: "+response._id);
  Members.find({'_id':response._id}, function (err, docs) {
        response.send(new Members(docs));
    });
});

router.post('/authenticateMember',function(request,response){
    console.log("Authenticate Member request");
    console.log(request.body);
    var memberEmail = String(request.body.email).trim().toLowerCase();
    var memberPassword = request.body.password;
    console.log("cE: "+memberEmail);
    console.log("cP: "+memberPassword);
    Members.find({}, function (err, docs) {
        var members = docs;
        //console.log(users);
        if(!(members === null)){
            for(var i = 0;i<members.length;i++){
                console.log(members[i]);
                if(
                    (members[i]['email'] == memberEmail) &&
                    (members[i]['password'] == memberPassword)
                ){
                    console.log("Login successful.");
                    response.send({message:"Login successful.", user:(members[i])});
                    return;
                }
            }
            response.send({message:"Credentials not found."});
        }
        else{
            $('.sign-in-status-text').text("Users not loaded yet.");
        }
    });
});

module.exports = router;

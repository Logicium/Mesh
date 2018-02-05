var express = require('express');
var router = express.Router();
var Members = require('./../server/Databases').Members;
var Activities = require('./../server/Databases.js').Activities;

var Member = function(DataModel){
    this.firstName = DataModel[0];
    this.lastName = DataModel[1];
    this.fullName = this.firstName + ' ' + this.lastName;
    this.email = DataModel[2];
    this.password = DataModel[3]
    this.image = DataModel[4];
    this.roles = [DataModel[5]];
    this.teams = [DataModel[6]];
    this.projects = [DataModel[7]];
    this.activity = [];
    this.messages = [];
    this.events = [];
    this.label = this.fullName;
    this.icon = this.image;
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
    var m = new Member(request.body.inputs);
    Members.insert(m, function (err, newDoc) {
        console.log(newDoc);
        response.send({message:"New member added",data:newDoc});
        Activities.insert({message:newDoc.fullName+" was added",type:'memberAdd',link: newDoc._id}, function (err, newDoc) {
          console.log(newDoc);
        });
    });
});

//Returns only the raw JSON of a userObject
router.post('/find',function(request,response){
    console.log("Finding one member: "+(request.body._id || request.body.token ));
    if(request.body._id === undefined){request.body._id = 'skip'};
    Members.find({$or:[{'_id':request.body._id},{'loginToken':request.body.token}]}, function (err, docs) {
        response.send(docs);
    });
});

router.post('/update',function(request,response){
    console.log('Update request: '+request._id);
    Members.update({ id: request._id }, request, {}, function(err, doc) {
        response.send({message:"Updated successfully."})
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

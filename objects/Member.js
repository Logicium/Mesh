var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var Members = require('./../server/Databases').Members;
var Activities = require('./../server/Databases.js').Activities;
var Databases = require('./../server/Databases');

var Member = function(DataModel){
    this.firstName = DataModel[0]+'';
    this.lastName = DataModel[1]+'';
    this.fullName = this.firstName + ' ' + this.lastName;
    this.email = DataModel[2]+'';
    this.password = DataModel[3]+'';
    this.image = DataModel[4]+'';
    this.roles = DataModel[5].filter(Boolean);
    this.teams = DataModel[6].filter(Boolean);
    this.projects = DataModel[7].filter(Boolean);
    this.activity = [];
    this.messages = [];
    this.events = [];
    this.tasks = [];
    this.orgs = [];
    this.defaultOrg = '';
    this.label = this.fullName;
    this.icon =  ( (this.image.length!=0) ? this.image : 'public/images/demo/member.jpg' );
};

router.get('/',function(request,response){
    //List all from Database
    console.log("Download all Members request.");
    Members.find({}, function (err, docs) {
        response.send(docs);
    });
});

router.post('/list',function(request,response){
    console.log("Download all org Members request.");
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Members.find({orgs:linkedMember.defaultOrg},function(err,orgMembers){
            response.send(orgMembers);
        });
    });
});

router.post('/delete',function(request,response){
    //Delete
});

router.post('/add',function(request,response){
    console.log("Add member request: ");
    console.log(request.body);
    var m = new Member(request.body.inputs);
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        m.defaultOrg = linkedMember.defaultOrg;
        m.orgs.push(linkedMember.defaultOrg);
        Members.insert(m, function (err, newDoc) {
            console.log(newDoc);

            var Config = fs.readFile(path.join(__dirname, './../public/libraries/Config.json'),'utf8',function (err,data) {
                if (err) throw err;
                data = JSON.parse(data);
                console.log(data);
                for(var i=0;i<data.length;i++){
                    data[i].memberLink = newDoc._id;
                    data[i].orgLink = linkedMember.defaultOrg;
                    Databases.Settings.insert(data[i], function (err, newDoc) {
                        console.log(newDoc);
                        console.log('Settings file initialized');
                    });
                }
            });

            Activities.insert(
              {message:newDoc.fullName+" was added",type:'memberAdd',link: newDoc._id,org:linkedMember.defaultOrg,creator:linkedMember._id},
              function (err, newDoc) {
              console.log(newDoc);
            });

            response.send({message:"New member added",data:newDoc});
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

router.post('/activities',function(request,response){
    console.log("Finding member activities: "+(request.body._id || request.body.token ));
    if(request.body._id === undefined){request.body._id = 'skip'};
    Members.findOne({$or:[{'_id':request.body._id},{'loginToken':request.body.token}]}, function (err, linkedMember) {
        Activities.find({creator:linkedMember._id},function(err,linkedActivities){
            response.send(linkedActivities);
        });
    });
});


router.post('/update',function(request,response){
    console.log(request.body);
    var updateObject = request.body.updateObject || request.body.objectData;
    var updateId = updateObject._id;
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Members.update({_id:updateId},updateObject,{},function(err,doc){
            console.log(JSON.stringify(doc));
            console.log('Logging doc');
            response.send({message:'Successfully Updated',doc:doc});
        });
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

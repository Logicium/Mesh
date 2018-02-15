var express = require('express');
var router = express.Router();
var Members = require('./../server/Databases').Members;
var Activities = require('./../server/Databases.js').Activities;

var Member = function(DataModel){
    this.firstName = DataModel[0]+'';
    this.lastName = DataModel[1]+'';
    this.fullName = this.firstName + ' ' + this.lastName;
    this.email = DataModel[2]+'';
    this.password = DataModel[3]+'';
    this.image = DataModel[4]+'';
    this.roles = DataModel[5];
    this.teams = DataModel[6];
    this.projects = DataModel[7];
    this.activity = [];
    this.messages = [];
    this.events = [];
    this.tasks = [];
    this.orgs = [];
    this.defaultOrg = '';
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
            response.send({message:"New member added",data:newDoc});
            Activities.insert(
              {message:newDoc.fullName+" was added",type:'memberAdd',link: newDoc._id,org:linkedMember.defaultOrg,creator:linkedMember._id},
              function (err, newDoc) {
              console.log(newDoc);
            });
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
    var updateObject = request.body.updateObject;
    var updateId = updateObject._id;
    Databases.Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Databases.Members.findOne({$and:[{_id:updateId},{orgLink:linkedMember.defaultOrg}]},function(err,doc){
            console.log(JSON.stringify(doc));
            doc = updateObject;
            console.log('Logging doc');
            doc.save(function (err) {});
            response.send({message:'Successfully Updated',doc});
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

var fs = require('fs');
var path = require('path');
var LinvoDB = require("linvodb3");
LinvoDB.dbPath = process.cwd();
var Databases = {};

var OrgsDB = new LinvoDB('orgs',{});
var SettingsDB = new LinvoDB('settings',{});
var MembersDB = new LinvoDB('members',{});
var ActivitiesDB = new LinvoDB('activities',{});
var TeamsDB = new LinvoDB('teams',{});
var EventsDB = new LinvoDB('events',{});
var ConversationsDB = new LinvoDB('convos',{});
var MessagesDB = new LinvoDB('messages',{});
var ProjectsDB = new LinvoDB('projects',{});
var RolesDB = new LinvoDB('roles',{});
var TasksDB = new LinvoDB('tasks',{});

Databases = {
    Orgs: OrgsDB,
    Settings: SettingsDB,
    Members: MembersDB,
    Activities: ActivitiesDB,
    Teams: TeamsDB,
    Events: EventsDB,
    Conversations: ConversationsDB,
    Messages: MessagesDB,
    Projects: ProjectsDB,
    Roles: RolesDB,
    Tasks: TasksDB,
};

//Create first Org
var org1 = {
    name: 'Org 1',
    creator: ''
}

//Initialize first user for Users Database:

var member1 = {
    firstName : 'Member',
    lastName : 'One',
    fullName : 'Member One',
    email : 'memberOne@m.c',
    password : 'password',
    image : 'public/images/demo/member.jpg',
    roles : [],
    teams : [],
    projects : [],
    activity : [],
    messages : [],
    events : [],
    tasks : [],
    label : 'Member One',
    icon : 'public/images/demo/member.jpg',
    defaultOrg : '',
    orgs: []
};

Databases.Members.insert(member1, function (err, newDoc) {
    console.log(newDoc);
    console.log('Member added');
    org1.creator = newDoc._id;
    Databases.Orgs.insert(org1,function(err,newOrg){
        console.log(newOrg);
        newDoc.defaultOrg = newOrg._id;
        newDoc.orgs.push(newOrg._id);
        newDoc.save(function(err){});

        Databases.Activities.insert({message:newDoc.fullName+" was added",type:'memberAdd',org: newOrg._id,link: newDoc._id}, function (err, newDoc) {
          console.log(newDoc);
        });

        var Config = fs.readFile(path.join(__dirname, './../public/libraries/Config.json'),'utf8',function (err,data) {
            if (err) throw err;
            data = JSON.parse(data);
            console.log(data);
            for(var i=0;i<data.length;i++){
                data[i].memberLink = newDoc._id;
                data[i].orgLink = newOrg._id;
                Databases.Settings.insert(data[i], function (err, newDoc) {
                    console.log(newDoc);
                    console.log('Settings file initialized');
                });
            }
        });
    });
});


module.exports = Databases;

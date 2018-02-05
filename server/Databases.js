var fs = require('fs');
var path = require('path');
var LinvoDB = require("linvodb3");
LinvoDB.dbPath = process.cwd();
var Databases = {};

var UsersDB = new LinvoDB('users',{});
var SettingsDB = new LinvoDB('settings',{});
var MembersDB = new LinvoDB('members',{});
var ActivitiesDB = new LinvoDB('activities',{});
var TeamsDB = new LinvoDB('teams',{});
var EventsDB = new LinvoDB('events',{});
var MessagesDB = new LinvoDB('messages',{});
var ProfilesDB = new LinvoDB('profiles',{});
var ProjectsDB = new LinvoDB('projects',{});
var RolesDB = new LinvoDB('roles',{});
var TasksDB = new LinvoDB('tasks',{});

Databases = {
    Users: UsersDB,
    Settings: SettingsDB,
    Members: MembersDB,
    Activities: ActivitiesDB,
    Teams: TeamsDB,
    Events: EventsDB,
    Messages: MessagesDB,
    Profiles: ProfilesDB,
    Projects: ProjectsDB,
    Roles: RolesDB,
    Tasks: TasksDB,
};

//Initialize first user for Users Database:

var member1 = {
    email:'memberXY@m.c',
    password:'password'
};

Databases.Members.insert(member1, function (err, newDoc) {
    console.log(newDoc);
    console.log('Member added');

    var Config = fs.readFile(path.join(__dirname, './../public/libraries/Config.json'),'utf8',function (err,data) {
        if (err) throw err;
        data = JSON.parse(data);
        console.log(data);
        for(var i=0;i<data.length;i++){
            data[i].memberLink = newDoc._id;
            Databases.Settings.insert(data[i], function (err, newDoc) {
                console.log(newDoc);
                console.log('Settings file initialized');
            });
        }
    });
});


module.exports = Databases;

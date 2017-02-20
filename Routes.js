var express = require('express'),app=express();
var router = express.Router();

var LinvoDB = require("linvodb3");
LinvoDB.dbPath = process.cwd();

//Datum Collections
var Members = new LinvoDB("members", {});
var Activities = new LinvoDB("activity",{});
var Events = new LinvoDB("events", {});
var Messages = new LinvoDB("messages",{});
var Tasks = new LinvoDB("tasks",{});
var Teams = new LinvoDB("teams",{});
var Projects = new LinvoDB("projects",{});
var Roles = new LinvoDB("roles",{});

//Datum Models
var User = require('./objects/User.js');
var Activity = require('./objects/Activity.js');
var Event = require('./objects/Event.js');
var Message = require('./objects/Message.js');
var Task = require('./objects/Task.js');
var Team = require('./objects/Team.js');
var Project = require('./objects/Project.js');
var Role = require('./objects/Role.js');

router.get('/',function(request,response){
    response.sendFile('/public/Orga.html', {"root": __dirname});
});

app.use('/users',User);
app.use('/activities',Activity);
app.use('/events',Event);
app.use('/messages',Message);
app.use('/tasks',Task);
app.use('/teams',Team);
app.use('/projects',User);
app.use('/roles',User);

//Returns the complete User object with

module.exports = router;

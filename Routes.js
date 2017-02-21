var express = require('express');
var router = express.Router();

var LinvoDB = require("linvodb3");
LinvoDB.dbPath = process.cwd();

//Datum Collections

var Activities = new LinvoDB("activity",{});
var Events = new LinvoDB("events", {});
var Tasks = new LinvoDB("tasks",{});
var Teams = new LinvoDB("teams",{});
var Projects = new LinvoDB("projects",{});
var Roles = new LinvoDB("roles",{});

router.get('/',function(request,response){
    response.sendFile('/public/Orga.html', {"root": __dirname});
});


//Returns the complete User object with

module.exports = router;

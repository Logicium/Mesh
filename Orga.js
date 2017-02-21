var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var schedule = require('node-schedule');
var util = require('util');
var path = require('path');

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);

var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use("/public", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(require('./Routes'));

var Member = require('./objects/Member.js');
var Activity = require('./objects/Activity.js');
var Event = require('./objects/Event.js');
var Message = require('./objects/Message.js');
var Task = require('./objects/Task.js');
var Team = require('./objects/Team.js');
var Project = require('./objects/Project.js');
var Role = require('./objects/Role.js');

app.use('/members',Member);
app.use('/activities',Activity);
app.use('/events',Event);
app.use('/messages',Message);
app.use('/teams',Team);
app.use('/projects',Project);
app.use('/roles',Role);

var server = app.listen(2101, function () {
    var port = server.address().port;
    console.log("Example app listening at http://localhost:%s", port);
});

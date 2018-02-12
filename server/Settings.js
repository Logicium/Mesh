var express = require('express');
var router = express.Router();
var multer  =   require('multer');
var path = require('path');
var jwt = require('jsonwebtoken');

var Databases = require('./Databases');

router.post('/list',function(request,response){
    console.log("Download all Settings request.");
    Databases.Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Databases.Settings.find({$and:[{memberLink:linkedMember._id},{orgLink:linkedMember.defaultOrg}]},function(err,linkedSettings){
            response.send(linkedSettings);
        });
    });
});

router.post('/login', function (request, response) {

    console.log("New user login request.");
    var incomingUser = request.body;
    console.log(incomingUser);

    var Users = Databases.Members.findOne({username:incomingUser.email,password:incomingUser.password},function(err,doc){
        console.log(doc);
        if (doc) {
            var token = jwt.sign({U:incomingUser.fullName}, 'superSecret', {expiresIn: '24h'});
            doc.loginToken = token;
            doc.save(function (err) {});
            response.send({message: 'Login Success!', data:doc, success: true, token: token});
        }
        else {
            response.send({message: 'Login Fail', success: false});
        }
    });
});

var storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now()+'.jpg');
    }
});

var upload = multer({ storage : storage}).single('file');

router.post('/upload',function(req,res,next){
    console.log('Upload file request.');
    upload(req,res,function(err) {
        console.log(req.file);
        if(err) {
            return res.end(JSON.stringify({message:"Error uploading file.",type:'error'}));
        }
        res.end(JSON.stringify({message:"File is Uploaded",filename:req.file.filename,type:'success'}));
    });
});

router.use(function(req, res, next) {
    console.log(req.file);

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'superSecret', function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

router.post('/add',function(request,response){
    console.log("Add settings request: ");
    console.log(request.body);
    Databases.Settings.insert(request.body, function (err, newDoc) {
        console.log(newDoc);
        response.send({message:"New settings added",data:newDoc});
    });
});

router.post('/update',function(request,response){
    console.log(request.body);
    var parentName = request.body.parentTitle;
    console.log(parentName);
    var parentIndex = request.body.parentIndex;
    var newConfig = JSON.parse(request.body.newConfig);
    console.log(newConfig);

    Databases.Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Databases.Settings.findOne({$and:[{name:parentName},{memberLink:linkedMember._id},{orgLink:linkedMember.defaultOrg}]},function(err,linkedSettings){
            console.log(JSON.stringify(linkedSettings));
            linkedSettings.data = newConfig[parentIndex].data;
            console.log('Logging doc');
            linkedSettings.save(function (err) {});
            response.send({message:'Successfully Updated',doc:linkedSettings});
        });
    });
});

router.post('/find',function(request,response){
    console.log(request.body);
    Databases.Settings.find({ id: request.body._id }, {}, function(err, doc) {
        response.send({message:"Updated successfully.",newDoc:doc})
    });
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;

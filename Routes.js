var express = require('express');
var router = express.Router();
var DirectoryStructureJSON = require('directory-structure-json');
var fs = require('fs');
var path = require('path');

router.get('/',function(request,response){
    response.sendFile('/public/Orga.html', {"root": __dirname});
});

router.get('/imports/libraries',function(request,response){
    var basepath = './public/libraries';
    DirectoryStructureJSON.getStructure(fs, basepath, function (err, structure, total) {
        if (err) console.log(err);
        response.send(structure);
    });
});

router.get('/imports/cards',function(request,response){
    var basepath = './public/cards';
    DirectoryStructureJSON.getStructure(fs, basepath, function (err, structure, total) {
        if (err) console.log(err);
        response.send(structure);
    });
});

router.get('/imports/details',function(request,response){
    var basepath = './public/details';
    DirectoryStructureJSON.getStructure(fs, basepath, function (err, structure, total) {
        if (err) console.log(err);
        response.send(structure);
    });
});

router.get('/imports/tools',function(request,response){
    var basepath = './public/tools';
    DirectoryStructureJSON.getStructure(fs, basepath, function (err, structure, total) {
        if (err) console.log(err);
        response.send(structure);
    });
});

router.get('/imports/panels',function(request,response){
    var basepath = './public/panels';
    DirectoryStructureJSON.getStructure(fs, basepath, function (err, structure, total) {
        if (err) console.log(err);
        response.send(structure);
    });
});

module.exports = router;

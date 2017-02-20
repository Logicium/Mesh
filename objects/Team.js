var express = require('express');
var router = express.Router();

router.get('/',function(request,response){
    //List all from Database
});

router.post('/add',function(request,response){
    //Create new
});

router.post('/update',function(request,response){
    //Update
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;

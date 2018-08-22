var express = require('express');
var router = express.Router();
var aliwaihui = require('../services/aliwaihui');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  aliwaihui(function(rate){
    //console.log('rate:'+rate);
    var resobj = {title: '首页',rate: rate};
    res.render('index', resobj);
  });
  //var resobj = {title: '首页',rate: null};
  //res.render('index', resobj);
  
});


router.get('/ab+cd', function(req, res) {
  //res.send('ab+cd');
  res.redirect("http://www.baidu.com");
});



module.exports = router;

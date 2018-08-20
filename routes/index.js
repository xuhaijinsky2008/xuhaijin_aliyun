var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var resobj = {title: '首页'};
  res.render('index', resobj);
});


router.get('/ab+cd', function(req, res) {
  //res.send('ab+cd');
  res.redirect("http://www.baidu.com");
});

module.exports = router;

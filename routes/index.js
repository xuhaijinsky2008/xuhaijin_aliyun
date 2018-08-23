var express = require('express');
var router = express.Router();
var aliwaihui = require('../services/aliwaihui');

/* GET home page. */
router.get('/', function(req, res, next) {

  var userdata = [
    {name: "快捷入口", links:[{name:"新闻",values:[{url:"https://cn.reuters.com",desc:"reuters"},{url:"https://twitter.com/",desc:"twitter"}]},
                            {name:"学习",values:[{url:"http://www.w3school.com.cn/",desc:"w3school"},{url:"https://pugjs.org/api/getting-started.html",desc:"pugjs"}]},
                            {name:"其他",values:[{url:"https://www.google.com",desc:"google"},{url:"https://translate.google.com",desc:"翻译"},{url:"https://github.com/xuhaijinsky2008/xuhaijin_aliyun",desc:"github"},{url:"https://www.blockchain.com/markets",desc:"币市"}]}]},
    {name: "洞见", links:[{name:"银行行业",values:[{url:"http://www.mckinsey.com.cn/insights/banking-insurance/",desc:"麦肯锡洞见：银行与保险"}]}]},
    {name: "联系方式", links:[{name:"邮箱",values:[{url:"mailto:520@xuhaijin.cn",desc:"520@xuhaijin.cn"}]}]}
]
  
  aliwaihui(function(rate){
    var resobj = {title: '首页',rate: rate,userdata: userdata};
    res.render('index', resobj);
  });
  
  
});


router.get('/ab+cd', function(req, res) {
  res.redirect("http://www.baidu.com");
});



module.exports = router;

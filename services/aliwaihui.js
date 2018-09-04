
 var rate = null;
 var getRate = function(callback){
     try {
        if(rate){
            callback(rate);
        }else{
            getexchangerate(function(exchangerate){
                callback(exchangerate);
            });
        }
     } catch (error) {
         console.log('error:'+error);
         callback(null);
     }
}

/** 
 * 调用阿里云商家接口获取工商银行港币和美元汇率
*/
function getexchangerate(callback){
    console.log("start getexchangerate service.")
    var HKDrate = '',USDrate = '';
    const http = require('http');
  
    var resdata = '';
    http.get({
      hostname: 'ali-waihui.showapi.com',
      port: 80,
      path: '/bank10?bankCode=ICBC',
      agent: false,
      headers:{'Authorization':'APPCODE 12972dc34dc345d1a7b073462c33647b'}
    }, (res) => {
      console.log('statusCode:', res.statusCode);
      //console.log('headers:', res.headers);
      if(res.statusCode != 200){
        new Error('query rate error.status code:'+res.statusCode);
      }
      res.on('data', (d) => {
        resdata += d;
      });
      res.on('end', () => {
        console.log('end getexchangerate service.');
        djson = JSON.parse(resdata);
        if(djson.showapi_res_code && djson.showapi_res_code != 0){
            new Error('query rate error.showapi_res_code:'+djson.showapi_res_code);
        }
        var codeList = djson.showapi_res_body.codeList;

        codeList.forEach(element => {
            if(element.code == 'HKD'){
                HKDrate = Math.floor(element.hui_out*100)/100;
            }else if(element.code == 'USD'){
                USDrate = Math.floor(element.hui_out*100)/100;
            }
            // if(HKDrate && USDrate){
            //     rate = {'HKDrate':HKDrate,'USDrate':USDrate};
            //     callback(rate);
            // }
        });
        rate = {'HKDrate':HKDrate,'USDrate':USDrate};
        callback(rate);
        
      });
  
    }).on('error', (e) => {
      console.error(e);
      callback(null);
    });
  }
  
  function clearexcrate(){
    rate = null;
  }
  var twohour = 2*60*60*1000;
  //一个小时清理一次缓存
  setInterval(clearexcrate,twohour);

  module.exports=getRate;
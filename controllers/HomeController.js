const dao = require('../dao/HomeDao');
const token = require('../utils/token');



//获取轮播图
exports.adslist = async function(req,res){
    let ret={code:1,msg:"ok"}

    let results = await dao.adslist()

    if(results.length == 0){
        ret.code = 0
        ret.msg = "查询失败"
    }else{
        ret.list = results
    }

    res.send(ret)
}

//获取活动块
exports.homeActive = async function(req,res){
    let ret={code:1,msg:"ok"}

    //查询活动块列表
    let results = await dao.homeActive()

    //根据活动块id 获取商品
    for(var i=0; i<results.length; i++){
        let in_results = await dao.homeActiveGoods(results[i].id)
        results[i].list = in_results;
    }

    ret.list = results;
    if(results.length == 0){
        ret.code = 0
        ret.msg = "查询失败"
    }else{
        ret.list = results
    }

    res.send(ret)
}

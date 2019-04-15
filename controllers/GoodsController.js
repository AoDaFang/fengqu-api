const dao = require('../dao/GoodsDao');
const token = require('../utils/token');



//获取轮播图
exports.ltngoods = async function(req,res){
    let ret={code:1,msg:"ok"}

    let results = await dao.ltngoods()

    if(results.length == 0){
        ret.code = 0
        ret.msg = "查询失败"
    }else{
        ret.list = results
    }

    res.send(ret)
}

//分页查询商品列表
exports.list = async function (req, res) {
    let ret = {code:1, msg:"ok"};

    let {page,size} = req.query

    if(!page) page=1;
    if(!size) size=5;

    let results = await dao.list(page, size)

    ret.list = results;
    res.send(ret)
}

//获取单个商品详情
exports.goodsDetail = async function (req, res) {
    let ret = {code:1, msg:"ok"};

    let {id} = req.query

    let results = await dao.goodsDetailById(id)
    console.log(results)
    if(results.length == 1){
        ret.item = results[0]
    }else{
        ret.code = 0;
        ret.msg = '没有商品'
    }

    res.send(ret)
}
//商品搜索
exports.search = async function (req,res) {
    let ret = {code:1, msg:"ok"};

    let {name} = req.query

    let results = await dao.search(name)
    if(results.length != 0){
        ret.list = results
    }else{
        ret.code = 0;
        ret.msg = '没有商品'
    }



    res.send(ret)
}












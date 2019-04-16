const dao = require('../dao/CartDao');
const goodsDao = require('../dao/GoodsDao');
const token = require('../utils/token');


//获取购物车列表
exports.getList = async function(req,res){
    let ret={code:1,msg:"ok"}

    let {user_id} = req.query

    let results = await dao.getList(user_id)

    for(var item of results){
        var goods_item = await goodsDao.goodsDetailById(item.goods_id)
        item.goods_detail = goods_item[0]
    }


    if(results.length == 0){
        ret.code = 0
        ret.msg = "查询失败"
    }else{
        ret.list = results
    }

    res.send(ret)
}

//在商品详情页点击添加购物车进行的操作，添加购物信息(没有这条购物车信息的情况下)  或者增加购物车数量
exports.add = async function (req,res) {
    let ret={code:1,msg:"ok"}
    var {user_id,goods_id,num} = req.body

    var result = await dao.getItem(user_id, goods_id);

    var temp_num = 0;

    if(result.length == 0){
        temp_num = 0;
    }else{
        temp_num = result[0].num
    }

    num = parseInt(temp_num) + parseInt(num)
    console.log(num)
    if(result.length > 0 ){
        //执行修改
        var updateResult = await dao.updateItem(user_id, goods_id, num);
        if(updateResult.affectedRows == 1){
            ret.msg = "修改成功"
        }else{
            ret.code = 0;
            ret.msg = "修改失败"
        }
    }else{
        //执行添加
        try{
            var addResult = await dao.addItem(user_id, goods_id, num)
            if(addResult.affectedRows == 1){
                ret.msg = "添加成功"
            }else{
                ret.code = 0;
                ret.msg = "添加失败"
            }
        }catch (e){
            ret.code = 0;
            ret.msg = e
        }
    }
    res.send(ret)
}

//修改商品数量
exports.modifyCount = async function (req, res) {
    let ret={code:1,msg:"ok"}
    var {user_id,goods_id,num} = req.body

    var result = await dao.getItem(user_id, goods_id);
    if(result.length > 0 ){
        //执行修改
        var updateResult = await dao.updateItem(user_id, goods_id, num);
        if(updateResult.affectedRows == 1){
            ret.msg = "修改成功"
        }else{
            ret.code = 0;
            ret.msg = "修改失败,数据库修改失败"
        }
    }else{
        ret.code = 0;
        ret.msg = "修改失败，购物车没有这条数据"
    }
    res.send(ret)
}


//删除商品信息
exports.delete = async function (req,res) {
    var ret = {code:1, msg:"ok"}
    var {user_id, goods_id} = req.body

    var results = await dao.deleteItem(user_id, goods_id)

    if(results.affectedRows == 1){
        ret.msg = "删除成功"
    }else{
        ret.code = 0;
        ret.msg = "删除失败"
    }

    res.send(ret)
}


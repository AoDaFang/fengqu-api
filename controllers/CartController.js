const dao = require('../dao/CartDao');
const goodsDao = require('../dao/GoodsDao');
const token = require('../utils/token');


//获取购物车列表
exports.getList = async function(req,res){
    let ret={code:1,msg:"ok"}

    let results = await dao.getList()

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

//添加购物信息  或者修改购物信息
exports.add = async function (req,res) {
    let ret={code:1,msg:"ok"}
    var {user_id,goods_id,num} = req.body

    var result = await dao.getItem(user_id, goods_id);
    if(result.length > 0 ){
        //执行修改
        var updateResult = await dao.updateItem(user_id, goods_id, num);
        console.log(updateResult)
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
                ret.msg = "修改失败"
            }
        }catch (e){
            ret.code = 0;
            ret.msg = e
        }
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


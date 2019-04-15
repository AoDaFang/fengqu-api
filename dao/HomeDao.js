//Data Access Object 数据访问对象
//持久化层  数据层
const MySQL = require('./MySQL')

exports.adslist = function(){
    var sql = "select * from tb_ads"
    return MySQL.query(sql)
}

//获取主页活动块列表
exports.homeActive = function(){
    var sql = "select * from tb_homeactive"
    return MySQL.query(sql)
}

//根据活动块的id 获取活动商品
exports.homeActiveGoods = function (id) {
    var sql = 'SELECT * FROM tb_goods where homeactive_id=?'
    var data = [id]
    return MySQL.query(sql,data)
}


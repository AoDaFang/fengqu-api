//Data Access Object 数据访问对象
//持久化层  数据层
const MySQL = require('./MySQL')

exports.getList = function(user_id){
    var sql = "select * from tb_cart where user_id=?"
    var data = [user_id]
    return MySQL.query(sql, data)
}


exports.getItem = function (user_id, goods_id) {
    var sql = 'select * from tb_cart where user_id=? and goods_id=?'
    data = [user_id, goods_id]
    return MySQL.query(sql,data)
}

exports.updateItem = function (user_id, goods_id, num) {
    var sql = 'update tb_cart set num=? where user_id=? and goods_id=?'
    data = [num,user_id, goods_id]
    return MySQL.query(sql,data)
}

exports.addItem = function (user_id, goods_id, num) {
    var sql = 'insert into tb_cart(user_id,goods_id,num) values(?,?,?)'
    data = [user_id, goods_id, num]
    return MySQL.query(sql,data)
}
exports.deleteItem = function (user_id, goods_id) {
    var sql = 'delete from tb_cart where user_id=? and goods_id=?'
    data = [user_id, goods_id]
    return MySQL.query(sql,data)
}
//Data Access Object 数据访问对象
//持久化层  数据层
const MySQL = require('./MySQL')

//闪购列表
exports.ltngoods = function(uid,movie_id){
    var sql = "select * from tb_ltn_goods"
    return MySQL.query(sql)
}
//分页获取商品列表
exports.list = function (page, size) {
    let sql = 'select * from tb_goods limit ?,?';
    let data = [parseInt((page-1)*size), parseInt(size)]
  return MySQL.query(sql, data)
}
//根据商品id获取商品详情
exports.goodsDetailById = function (id) {
    let sql = 'select * from tb_goods where id=?';
    let data = [id]
    return MySQL.query(sql, data)
}
//搜索商品
exports.search = function (name) {
    name = '%' + name + '%'
    let sql = "SELECT * from tb_goods where name like ?";
    let data = [name]
    return MySQL.query(sql, data)
}

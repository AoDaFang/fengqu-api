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



exports.deleteLike = function(uid,movie_id){
    var sql = "delete from tb_user_like where uid=? and movie_id=?"
    var data = [uid,movie_id]
    return MySQL.query(sql,data)
}
exports.getLike = function(uid,movie_id){
    var sql = "select * from tb_user_like where uid=? and movie_id=?"
    var data = [uid,movie_id]
    return MySQL.query(sql,data)
}
exports.addLike = function(uid,movie_id){
    var sql = "insert into tb_user_like(uid,movie_id,uptime) values(?,?,now())"
    var data = [uid,movie_id]
    return MySQL.query(sql,data)
}
exports.insert = function(user){
    console.log("---insert---")
    var sql = "insert into tb_user(name,nick,passwd,phone) values(?,?,?,?)"
    var data = [user.name,user.nick,user.passwd,user.phone]
    return MySQL.query(sql,data)
}
exports.getUserByPhone = function(phone,passwd){
    var sql = "select * from tb_user where phone=? and passwd=?"
    var data = [phone,passwd]
    return MySQL.query(sql,data)
}
exports.getUserById = function(id){
    var sql = "select * from tb_user where id="+id
    return MySQL.query(sql)
}

exports.addRemark = function (uid,movie_id,remark) {
    var sql = "insert into tb_user_remark(uid,movie_id,ctime,remark) values(?,?,now(),?)";
    var data = [uid,movie_id,remark]
    return MySQL.query(sql,data)
}
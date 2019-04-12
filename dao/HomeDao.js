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
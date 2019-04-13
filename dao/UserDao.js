//Data Access Object 数据访问对象
//持久化层  数据层
const MySQL = require('./MySQL')

//登录
exports.login = function (phone, password) {
    var sql = 'select * from tb_user where phone=? and password=?'
    var data = [phone,password]
    return MySQL.query(sql,data)
}
//注册
exports.register = function (phone, password) {
    var sql = 'insert into tb_user(phone,password) values(?,?)'
    var data = [phone,password]
    return MySQL.query(sql,data)
}

//添加验证码
exports.addmsgcode = function (phone, msgcode) {
    var sql = 'insert into tb_tempmsg(phone,temp_msg) values(?,?)'
    var data = [phone,msgcode]
    return MySQL.query(sql,data)
}
//根据phone获取验证码
exports.getMsg = function (phone) {
    var sql = 'select * from tb_tempmsg where phone=? '
    var data = [phone]
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
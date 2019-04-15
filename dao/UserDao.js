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

const dao = require('../dao/UserDao');
const token = require('../utils/token');

//登录
exports.login=async function(req, res, next){
    let ret={
        code:1,msg:"login ok"
    }
    var {phone,password} = req.body

    var results = await dao.login(phone,password)

    if(results.length == 0){
        ret.code = 0
        ret.msg = "error"
    }

    ret.user = results[0]

    res.send(ret)
}
//注册
exports.register = async function (req, res, next) {
    let ret={
        code:1,msg:"register ok"
    }
    var {phone,password, msg} = req.body
    console.log(password)

    //首先查询phone和msg是否匹配
    var msgObj = await dao.getMsg(phone)
    if(msgObj[0].temp_msg != msg){
        ret.code = 0
        ret.msg = "短信验证码错误"
        res.send(ret)
        return
    }


    var results = await dao.register(phone,password)

    if(results.affectedRows == 0){
        ret.code = 0
        ret.msg = "error"
    }

    res.send(ret)
}

//短信验证码
exports.addmsgcode = async function (req, res, next) {
    let ret={
        code:1,msg:"code ok"
    }

    var {phone} = req.query

    if(!phone){
        ret.code = 0
        ret.msg = "请传入手机号"
        res.send(ret)
        return
    }

    var msgcode = "" + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) +
        parseInt(Math.random() * 10)

    var results = await dao.addmsgcode(phone,msgcode)

    if(results.affectedRows == 0){
        ret.code = 0
        ret.msg = "error"
    }
    ret.msgcode = msgcode
    res.send(ret)
}









//添加用户想看
exports.like_add = async function(req,res){
    let ret={code:1,msg:"ok"}
    let {movie_id} = req.query
    let {uid} = req.query;
    try{
        let result = await dao.addLike(uid,movie_id)
        console.log(result)
        if(result.affectedRows!=1){
            ret.code = 0
            ret.msg = "err"
        }
    }catch(e){
        ret.code = 0
        ret.msg = "err"
        ret.err = e.toString()
    }

    res.send(ret)
}
//获取用户是否想看
exports.like_get = async function(req,res){
    let ret={code:1,msg:"ok"}

    //从session中获取已经登录的用户信息
    let {movie_id} = req.query;
    let {uid} = req.query;
    let results = await dao.getLike(uid,movie_id)
    if(results.length!=1){
        ret.code = 0
        ret.msg = "dislike"
    }
    res.send(ret)
}
//用户不想看
exports.like_delete = async function(req,res){
    let ret={code:1,msg:"ok"}
    //TODO:
    let {movie_id} = req.query
    let user = req.session.user
    try{
        let result = await dao.deleteLike(user.id,movie_id)
        console.log(result)
        if(result.affectedRows!=1){
            ret.code = 0
            ret.msg = "用户想看的记录不存在"
        }
    }catch(e){
        ret.code = 0
        ret.msg = "err"
        ret.err = e.toString()
    }


    res.send(ret)
}

exports.sendSMS=function(req, res, next) {
    //1. 取请求参数
    let reqdata = req.query
    let {phone} = reqdata //解构赋值,变量名称必须跟对象中的属性名称一样才能取出
    console.log(phone)
    var ret={
        code:1,msg:"send sms ok......"
    }
    res.send(ret);
}
exports.reg=async function(req, res, next) {
    //1. 取请求参数
    let user= req.body

    //解构赋值,变量名称必须跟对象中的属性名称一样才能取出
    let {name,nick,passwd,province,city,phone} = user
    var response={
        code:1,msg:"reg ok"
    }

    try{
        let ret = await dao.insert(user);
        console.log(ret);
        if(ret.affectedRows==1){
            user.id = ret.insertId
            response.user = user
        }else{
            response.code = 0
            response.msg = "注册失败"
        }
    }catch(e){
        console.log(e)
    }
    res.send(response);//只允许执行一次

    // dao.insert(user).then(function (ret) {
    //     console.log(ret);
    //     if(ret.affectedRows==1){
    //         user.id = ret.insertId
    //         response.user = user
    //     }
    // },function(err){
    //     response.code = 0
    //     response.msg = "注册失败"
    // }).then(function(){
    //     res.send(response);
    // })
}

exports.logout=async function(req, res, next){
    let ret={
        code:1,msg:"logout ok"
    }
    req.session.user=null
    res.send(ret)
}

exports.add_Remark = async function (req,res) {
    let ret={code:1,msg:"ok"}
    let {movie_id} = req.query
    let {uid} = req.query;
    let {remark} = req.body;
    try{
        let result = await dao.addRemark(uid,movie_id,remark)
        console.log(result)
        if(result.affectedRows!=1){
            ret.code = 0
            ret.msg = "err"
        }
    }catch(e){
        ret.code = 0
        ret.msg = "err"
        ret.err = e.toString()
    }

    res.send(ret)
}
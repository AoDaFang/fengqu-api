var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/UserController')


/* restful api */

// router.get('/sendsms', ctrl.sendSMS);
// router.post('/reg', ctrl.reg);
//
// router.post('/like', ctrl.like_add)
//     .get('/like', ctrl.like_get)
//     .delete('/like', ctrl.like_delete);

//登录
router.post('/login',ctrl.login)

//注册
router.post('/register', ctrl.register)

//短信验证码
router.get('/msgcode',ctrl.addmsgcode)

//添加用户想看   post http://localhost:3000/users/like    ?movie_id=&uid=
//查询是否想看   get  http://localhost:3000/users/like    ?uid=
//用户不想看     delete http://localhost:3000/users/like  ?movie_id=&uid=

router.post('/remark',ctrl.add_Remark);//添加评论
module.exports = router;

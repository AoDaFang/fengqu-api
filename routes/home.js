var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/HomeController')


/* restful api */
router.get('/adslist', ctrl.adslist)

router.get('/homeactive',ctrl.homeActive)



router.get('/sendsms', ctrl.sendSMS);
router.post('/reg', ctrl.reg);

router.post('/like', ctrl.like_add)
    .get('/like', ctrl.like_get)
    .delete('/like', ctrl.like_delete);

//添加用户想看   post http://localhost:3000/users/like    ?movie_id=&uid=
//查询是否想看   get  http://localhost:3000/users/like    ?uid=
//用户不想看     delete http://localhost:3000/users/like  ?movie_id=&uid=

router.post('/remark',ctrl.add_Remark);//添加评论
module.exports = router;

var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/GoodsController')


/* restful api */

// router.get('/sendsms', ctrl.sendSMS);
// router.post('/reg', ctrl.reg);
//
// router.post('/like', ctrl.like_add)
//     .get('/like', ctrl.like_get)
//     .delete('/like', ctrl.like_delete);

//总的商品列表 分页
router.get('/',ctrl.list)

//根据id，获取商品信息
router.get('/goodsdetail',ctrl.goodsDetail)

//搜索商品
router.get('/search', ctrl.search)

//获取闪购商品
router.get('/ltngoods', ctrl.ltngoods)


//添加用户想看   post http://localhost:3000/users/like    ?movie_id=&uid=
//查询是否想看   get  http://localhost:3000/users/like    ?uid=
//用户不想看     delete http://localhost:3000/users/like  ?movie_id=&uid=

module.exports = router;

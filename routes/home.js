var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/HomeController')


/* restful api */
router.get('/adslist', ctrl.adslist)

router.get('/homeactive',ctrl.homeActive)




//添加用户想看   post http://localhost:3000/users/like    ?movie_id=&uid=
//查询是否想看   get  http://localhost:3000/users/like    ?uid=
//用户不想看     delete http://localhost:3000/users/like  ?movie_id=&uid=

module.exports = router;

var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/CartController')


router.post('/addgoods',ctrl.add)
router.post('/modifycount',ctrl.modifyCount)

/* restful api */
router.get('/', ctrl.getList)

    .delete("/", ctrl.delete)




//添加用户想看   post http://localhost:3000/users/like    ?movie_id=&uid=
//查询是否想看   get  http://localhost:3000/users/like    ?uid=
//用户不想看     delete http://localhost:3000/users/like  ?movie_id=&uid=

module.exports = router;

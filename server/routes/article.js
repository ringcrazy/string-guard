var express = require('express');
var router = express.Router();
var Article = require('../app/controllers/article')
var User = require('../app/controllers/user')

/**
 * @api {post} /api/article/get get
 * @apiName get
 * @apiGroup article
 * @apiDescription 获取字符串
 *
 * @apiVersion 0.0.1
 * @apiSampleRequest http://localhost:3000/api/article/get

 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
    {
      code: 0,
      msg: '字符串获取成功',
      data: {
          content: ''
      }
    }
 */
router.post('/article/get',User.signinRequired, Article.get);


/**
 * @api {post} /api/article/update update
 * @apiName update
 * @apiGroup article
 * @apiDescription 更新字符串
 * 
 * @apiParam {string} content content 字符串内容 
 *
 * @apiVersion 0.0.1
 * @apiSampleRequest http://localhost:3000/api/article/update

 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
    {
      code: 0,
      msg: '字符串更新成功',
      data: {
          content: ''
      }
    }
 */
router.post('/article/update', User.signinRequired, Article.update)



module.exports = router;
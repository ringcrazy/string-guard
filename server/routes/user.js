var express = require('express');
var router = express.Router();
var User = require('../app/controllers/user')

/**
 * @api {post} /api/user/login login
 * @apiName login
 * @apiGroup user
 * @apiDescription 登录
 * 
 * @apiParam {string} username 用户名称
 * @apiParam {string} password 密码
 *
 * @apiVersion 0.0.1
 * @apiSampleRequest http://localhost:3000/api/user/login

 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
    {
      code: 0,
      msg: '登录成功',
      data: {
        user: {
          username: String
        }
      }
    }
 */
router.post('/user/login', User.login);

/**
 * @api {post} /api/user/logout logout
 * @apiName logout
 * @apiGroup user
 * @apiDescription 登出
 *
 * @apiVersion 0.0.1
 * @apiSampleRequest http://localhost:3000/api/user/logout

 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
    {
      code: 0,
      msg: '登出成功'
    }
 */
router.post('/user/logout', User.logout)

/**
 * @api {post} /api/user/islogin islogin
 * @apiName islogin
 * @apiGroup user
 * @apiDescription 是否登录状态
 *
 * @apiVersion 0.0.1
 * @apiSampleRequest http://localhost:3000/api/user/islogin

 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
    {
      code: 0,
      msg: '已登录',
      data: {
      }
    }
 */
router.post('/user/islogin', User.islogin)


module.exports = router;

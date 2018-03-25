var express = require('express');
var router = express.Router();
var Rule = require('../app/controllers/rule')
var User = require('../app/controllers/user')

/**
 * @api {post} /api/rule/get get
 * @apiName get
 * @apiGroup rule
 * @apiDescription 获取规则
 *
 * @apiVersion 0.0.1
 * @apiSampleRequest http://localhost:3000/api/rule/get

 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
    {
      code: 0,
      msg: '获取规则成功',
      data: {
      }
    }
 */
router.post('/rule/get', User.signinRequired, Rule.get);

/**
 * @api {post} /api/rule/update update
 * @apiName update
 * @apiGroup rule
 * @apiDescription 更新规则
 *
 * @apiParam {int} allowedCount allowedCount 每天允许登录次数
 * @apiParam {string} workday workday 工作日时间段 {startHour: 8,startMinute: 0,endHour: 17,endMinute: 0}
 * @apiParam {string} weekend weekend 休息日时间段 {startHour: 8,startMinute: 0,endHour: 13,endMinute: 0}
 * 
 * @apiVersion 0.0.1
 * @apiSampleRequest http://localhost:3000/api/rule/update

 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
    {
      code: 0,
      msg: '更新规则成功',
      data: {
      }
    }
 */
router.post('/rule/update', User.signinRequired, Rule.update)

module.exports = router;

var mongoose = require("mongoose");
var User = require("../models/user");
var Rule = require("../models/rule");
var Moment = require("moment");

// 登录
exports.login = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  // 查找用户
  User.findOne({ name: username }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      res.json({
        code: 1,
        msg: "该用户不存在"
      });
    }

    // 对比密码
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log(err);
      }
      if (!isMatch) {
        return res.json({
          code: 1,
          msg: "密码错误"
        });
      }

      // 验证规则
      Rule.findOne(function(err, rule) {
        if (err) {
          console.log(err);
        }
        if (!rule) {
          console.log("验证规则不存在");
        }

        // 验证登录次数
        if (rule.loginCount >= rule.allowedCount) {
          return res.json({
            code: 1,
            msg: "登录超过给定的次数，无法登录"
          });
        }
        var startHour;
        var endHour;
        var startMinute;
        var endMinute;
        var day = Moment().day();
        var hour = Moment().hour();
        var minute = Moment().minute();
        if (day === 0 || day === 6) {
          startHour = rule.weekend.startHour;
          endHour = rule.weekend.endHour;
          startMinute = rule.weekend.startMinute;
          endMinute = rule.weekend.endMinute;
        } else if (0 < day < 6) {
          startHour = rule.workday.startHour;
          endHour = rule.workday.endHour;
          startMinute = rule.workday.startMinute;
          endMinute = rule.workday.endMinute;
        }

        function decorate(val){
            if(val < 10){
              return '0'+ val
            }else{
              return val + ''
            }
        }

        var start = decorate(startHour) + decorate(startMinute)
        var current = decorate(hour) + decorate(minute)
        var end = decorate(endHour) + decorate(endMinute)

        // 验证登录时间段
        if (current >=start   && current < end ) {
            // 更新rule
            ++rule.loginCount;
            rule.save(function(err, rule) {
              if (err) {
                console.log(err);
              }
              req.session.username = username;
              return res.json({
                code: 0,
                msg: "登录成功"
              });
            });
          
        } else {
          return res.json({
            code: 1,
            msg: "不在登录时间内，无法登录"
          });
        }
      });
    });
  });
};

// 登出
exports.logout = function(req, res) {
  delete req.session.username
  res.json({
    code: 0,
    msg: "成功退出"
  });
};

// 用户是否登录
exports.islogin = function(req, res) {
  if (req.session.user) {
    res.json({
      code: 0,
      msg: "已登录"
    });
  } else {
    res.json({
      code: 1,
      msg: "未登录"
    });
  }
};

// 判断用户是否登录
exports.signinRequired = function(req, res, next) {
    var username = req.session.username
    if(!username){
        return res.json({
            code: 2,
            msg: '当前用户未登录'
        })
    }
    next()
};

// 更改密码
exports.update = function(req, res, next) {};

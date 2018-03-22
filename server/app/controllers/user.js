var mongoose = require("mongoose");
var User = mongoose.model("User");
var Rule = mongoose.model("Rule");
var Moment = require("moment");

// 登录
exports.login = function(req, res) {
  var _user = req.params.user;
  var name = _user.name;
  var password = _user.password;

  // 查找用户
  User.findOne({ name: name }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      return res.json({
        code: 1,
        msg: "该用户不存在"
      });
    }

    // 对比密码
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log(err);
      }
      if (isMatch) {

        // 保存会话状态
        req.session.user = user;
        return res.json({
          code: 0,
          msg: "登录成功"
        });
      } else {
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
        if(!rule){
            console.log('验证规则不存在')
        }

        // 验证登录次数
        if(rule.loginCount >= rule.allowedCount){
            return res.json({
                code: 1,
                msg: "登录超过给定的次数，无法登录"
            })
        }
        var start
        var end
        var day = Moment().day();
        var hour = Moment().hour();
        if (day === 0 || day === 6) {
            start = rule.weekend.start
            end = rule.weekend.end
        } else if (0 < day < 6) {
            start = rule.workday.start
            end = rule.workday.end
        }

        // 验证登录时间段
        if(!(start <= hour < end)){
            return res.json({
                code: 1,
                msg: '不在登录时间内，无法登录'
            })
        }

        // 更新rule
        rule.loginCount ++
        rule.save(function(err, rule){
            if(err){
                console.log(err)
            }
            res.json({
                code: 0,
                msg: '登录成功'
            })
        })
      });
    });
  });
}

// 登出
exports.logout = function(req, res){
    delete req.session.user
    res.json({
        code: 0,
        msg: '成功退出'
    })
}

// 用户是否登录
exports.islogin = function(req, res){
    if(req.session.user){
        res.json({
            code: 0,
            msg: '已登录'
        })
    }else{
        res.json({
            code: 1,
            msg: '未登录'
        })
    }
}

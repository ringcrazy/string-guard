var mongoose = require("mongoose");
var Rule = require("../models/rule")
var _ = require('underscore')

// 设置规则
exports.update = function(req, res){
    var ruleObj = {
        allowedCount: req.body.allowedCount,
        workday: req.body.workday,
        weekend: req.body.weekend
    }
    console.log(ruleObj)
    var _rule
    Rule.findOne(function(err, rule){
        if(err){
            console.log(err)
        }
        _rule = _.extend(rule, ruleObj)
        _rule.save(function(err, rule){
            if(err){
                console.log(err)
            }
            res.json({
                code: 0,
                msg: '修改规则成功',
                data: rule
            })
        })
    })
}

// 获取规则
exports.get = function(req, res){
    Rule.findOne(function(err, rule){
        if(err){
            console.log(err)
        }
        res.json({
            code: 0,
            msg: '成功获取规则',
            data: rule
        })
    })
}
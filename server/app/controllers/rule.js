var mongoose = require("mongoose");
var Rule = mongoose.model("Rule");
var _ = require('underscore')

// 设置规则
exports.update = function(req, res){
    var ruleObj = req.params.rule
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
                msg: '修改规则成功'
            })
        })
    })
}

// 获取规则
exports.get = function(req, res){

    Rule.findOne(function(err, rule){
        console.log(rule)
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
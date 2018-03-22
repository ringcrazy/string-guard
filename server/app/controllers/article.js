var mongoose = require('mongoose')
var Article = mongoose.model('Article')
var _ = require('underscore')

// 获取
exports.get = function(req, res){
    Article.findOne(function(err, article){
        if(err){
            console.log(err)
        }
        res.json({
            code: 0,
            msg: '提取字符串成功',
            data: article
        })
    })
}

// 设置
exports.update = function(req, res){
    var articleObj = req.params.article
    var _article
    Article.findOne(function(err, article){
        if(err){
            console.log(err)
        }
        _article = _.extend(article, articleObj)
        _article.save(function(err, article){
            if(err){
                console.log(err)
            }
            res.json({
                code: 0,
                msg: '更新字符串成功',
                data: article
            })
        })

    })
}
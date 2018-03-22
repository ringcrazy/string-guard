var mongoose = require('mongoose')

var RuleScheme = new mongoose.Schema({
    
    // 当天的登录次数
    loginCount: {
        type: Number,
        default: 0
    },

    // 每天允许登录次数
    allowedCount:{
        type: Number,
        default: 10
    },

    // 每天允许登录的时间段
    workday:{
        start: {
            type: Number,
            default: 8
        },
        end: {
            type: Number,
            default: 17
        }
    },
    weekend:{
        start: {
            type: Number,
            default: 8
        },
        end: {
            type: Number,
            default: 13
        }
    },

    meta: {
        createAt: {
          type: Date,
          default: Date.now()
        },
        updateAt: {
          type: Date,
          default: Date.now()
        }
      }
})

RuleScheme.pre('save', function(next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
      this.meta.updateAt = Date.now()
    }
  
    next()
  })


module.exports = RuleScheme
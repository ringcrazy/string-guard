var mongoose = require('mongoose')

// 加解密相关，哈希、加盐
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10

var UserSchema = new mongoose.Schema({

  // 用户名
  name: {
    unique: true,
    type: String
  },

  // 密码
  password: String,

  // 角色 > 10 表示为管理员
  role: {
    type: Number,
    default: 12
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

UserSchema.pre('save', function(next) {
  var user = this

  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  // 加盐  SALT_WORK_FACTOR:计算强度
  // 生成一个随机的盐
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)

    // 对密码进行加盐，生成一个hash
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)

      // Store hash in your password DB. 
      user.password = hash
      next()
    })
  })
})

// 模型方法
UserSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

// 实例方法
UserSchema.methods = {
    comparePassword: function(_password, cb){
        bcrypt.compare(_password, this.password, function(err, isMatch) {
            if (err) return cb(err)
            cb(null, isMatch)
        })
    }
}

module.exports = UserSchema
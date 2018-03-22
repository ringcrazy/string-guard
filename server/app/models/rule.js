var mongoose = require('mongoose')
var RuleSchema = require('../schemas/rule')
var Rule = mongoose.model('Rule', RuleSchema)

module.exports = Rule
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var session = require('express-session')


// connect mongodb 
var mongoStore = require('connect-mongo')(session)
var dbUrl = 'mongodb://localhost:3001/string-protect'
mongoose.connect(dbUrl, function(err){
  if(err){
    console.log(err)
  }

  var User = mongoose.model("User");
  var Rule = mongoose.model("Rule");
  var Article = mongoose.model("Article")
  
  // 初始化数据
  User.findOne(function(err, user){
    if(err){
      console.log(err)
    }
    if(!user){
      user = new User({
        name: 'admin',
        password: '123456'
      })
      user.save(function(err, user){
        if(err){
          console.log(err)
        }
        console.log('初始化用户成功！')
      })
    }
  })

  Rule.findOne(function(err, rule){
    if(err){
      console.log(err)
    }
    if(!rule){
      rule = new Rule()
      rule.save(function(err, rule){
        if(err){
          console.log(err)
        }
        console.log('初始化规则成功')
      })
    }
  })

  Article.findOne(function(err, article){
    if(err){
      console.log(err)
    }
    if(!article){
      article = new Article({
        content: 'i am the protected string'
      })
      article.save(function(err, article){
        if(err){
          console.log(err)
        }
        console.log('初始化字符串成功')
      })
    }
  })
})

// models loading
var models_path = __dirname + '/app/models'
var walk = function(path) {
  fs
    .readdirSync(path)
    .forEach(function(file) {
      var newPath = path + '/' + file
      var stat = fs.statSync(newPath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(newPath)
        }
      }
      else if (stat.isDirectory()) {
        walk(newPath)
      }
    })
}
walk(models_path)

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var ruleRouter = require('./routes/rule')
var articleRouter = require('./routes/article')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 持久化session会话
app.use(session({
  secret: 'string-protect',
  store: new mongoStore({
    url: dbUrl, // 数据库地址
    collection: 'sessions' // 表名称
  })
}))

app.use(express.static(path.join(__dirname, 'public')));

// routing
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})
app.use('/', indexRouter);
app.use('/api', [userRouter, ruleRouter, articleRouter]);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;

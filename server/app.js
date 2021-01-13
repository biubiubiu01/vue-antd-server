var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressJWT = require('express-jwt');

var app = express();

// CORS & Preflight request
app.use((req, res, next) => {
  if (req.path !== '/' && !req.path.includes('.')) {
    res.set({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
      'Access-Control-Allow-Methods': 'POST,GET',
      'Content-Type': 'application/json; charset=utf-8'
    });
  }
  next();
});

//token验证
app.use(
  expressJWT({
    secret: 'tokenSecret',
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken: req => {
      if (req.headers.authorization) {
        return req.headers.authorization;
      }
      return null;
    }
  }).unless({
    path: ['/api/user/login', '/api/user/code', '/api/user/cellphone'] //白名单
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./routes/index'));
app.use('/api/user', require('./routes/user'));
app.use('/api/userManage', require('./routes/userManage'));

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

var debug = require('debug')('my-application');
app.set('port', process.env.PORT || 4000); // 设定监听端口

//启动监听
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
  console.log(`服务启动成功,请打开 http://localhost:${process.env.PORT || 4000}`);
});

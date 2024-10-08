var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

// const maria = require('./database/connect/maria-db');
// maria.connect()

const { mongoDB } = require("./database/connect/mongo-db");
mongoDB();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filesRouter = require('./routes/files');
var categoriesRouter = require('./routes/categories');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'njk');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 정적 파일 제공
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/files', filesRouter);
app.use('/api/categories', categoriesRouter);

//5초 타임아웃 설정
app.use(function(req, res, next) {
  res.setTimeout(5000, () => {
    console.log('Request timed out.');
    res.status(408).send('Request timed out')
  });
  next()
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
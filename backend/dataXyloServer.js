/* jshint esversion: 6 */
/* jshint node: true */
(function(){
  'use strict';
})();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const constants = require('./app/config/constants');
const index = require('./app/routes/index');

let app = express();

app.use(morgan('dev')); // to get console logs
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // to support URL-encoded bodies 
app.use(cookieParser()); // to accept any cookies if needed
app.use(express.static(path.join(__dirname, 'public')));

// allowing cross-origins
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// all apis
app.use('/dataxylo/api', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err || {};

  // send error
  res.status(err.status || 500);
  res.send(err);
});

app.listen(3500, () => {
  console.log('server running on port 3500, http://localhost:3500/');
}); 
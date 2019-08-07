var express = require('express')
var bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.json());
app.use('/rest/postUserProfile', require('./routes/postUserProfile'))
app.use('/rest/loginUser', require('./routes/loginUser'))
app.use('/rest/postFeed', require('./routes/postFeed'))
app.use('/rest/postFeedComment', require('./routes/postFeedComment'))


app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app
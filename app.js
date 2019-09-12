var express = require('express')
var bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.json());
app.use('/rest/postUserProfile', require('./routes/postUserProfile'))
app.use('/rest/loginUser', require('./routes/loginUser'))
app.use('/rest/postFeed', require('./routes/postFeed'))
app.use('/rest/postFeedComment', require('./routes/postFeedComment'))
app.use('/rest/getFeedsComments' , require('./routes/getFeedscomments'))
app.use('/rest/postFeedLike' , require('./routes/postFeedLike'))
app.use('/rest/getFeeds' , require('./routes/getFeedsById'))
app.use('/rest/getFeedLikes' , require('./routes/getFeedLikes'))
app.use('/rest/postCelebDetails' , require('./routes/postCelebDetails'))
app.use('/rest/getTotalCelebs' , require('./routes/getTrendingCelebs'))
app.use('/rest/createMasterLiveStream' , require('./routes/createMasterLiveStream'))
app.use('/rest/createLiveStreamContest' , require('./routes/createLiveStreamContest'))
app.use('/rest/getStreamDetails' , require('./routes/getLiveStreamDetails'))
app.use('/rest/getContestQuestions' , require('./routes/getContestQuestions'))
app.use('/rest/getTwitterFav' , require('./routes/getTwitterFav'))
app.use('/rest/publishQuestion' , require('./routes/publishQuestion'))


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
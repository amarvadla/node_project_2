var express = require('express')
var router = express.Router()
var feeds = require('../schemas/feeds')
var userSchema = require('../schemas/userSchema')
var _ = require('lodash');

router.get('/', (req, res) => {
    var input = req.query
    // var reqBody = _.pick(req.body, ['email', 'password']);
    userSchema.findById({ _id: input.userId }, (err, data) => {
        if (err) {
            res.json({ statusCode: 0, statusMessage: 'wrong user id' })
        } else if (data) {
            feeds.find((err, feed) => {
                // var dataS = [];
                // for (var i = 0; i < feed.length; i++) {
                //     var feedSchema = new feeds(feed[i])
                //     dataS = dataS.concat(feedSchema.simpleObj())
                // }
                // res.json({ statusCode: 1, statusMessage: 'success', data: dataS })
                var feedArray = []
                for (var i = 0; i < feed.length; i++) {
                    var feedObj = feed[i]
                    var responseObj = {}
                    responseObj.id = feedObj._id
                    responseObj.text = feedObj.text
                    responseObj.imageUrl = feedObj.imageUrl
                    responseObj.comments = feedObj.comments.length
                    responseObj.likes = feedObj.likes.length
                    feedArray.push(responseObj)
                }

                res.json({ statusCode: 1, statusMessage: 'success', data: feedArray })
            })
        }
    })
})

module.exports = router
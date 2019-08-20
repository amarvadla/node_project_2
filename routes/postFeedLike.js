var express = require('express')
var router = express.Router()
var feeds = require('../schemas/feeds')
var userSchema = require('../schemas/userSchema')

router.post('/', (req, res) => {
    var input = req.body
    userSchema.findById({ _id: input.userId }, (err, data) => {
        if (err) {
            res.json({ statusCode: 0, statusMessage: 'wrong userId' })
        } else if (data) {
            feeds.findById({ _id: input.feedId }, (err, data) => {
                if (err) {
                    console.log(err)
                    res.json({ statusCode: 0, statusMessage: 'error' })
                } else if (data) {
                    var includes = false;
                    for (var i = 0; i < data.likes.length; i++) {
                        if(data.likes[i].userId == input.userId){
                            includes = true
                        }
                    }
                    if (includes){
                        feeds.findById({ _id: input.feedId }, (err, data) => {
                            if (err) {

                            } else if (data) {
                                feeds.update({ _id: input.feedId }, {
                                    $pull: {
                                        likes: {
                                            userId: input.userId
                                        }
                                    }
                                }, (err, data) => {
                                    if (data) {
                                        res.json({ statusCode: 1, statusMessage: 'unLiked' })
                                    } else {

                                    }
                                })
                            }
                        })
                    } else {
                        feeds.findById({ _id: input.feedId }, (err, data) => {
                            if (err) {

                            } else if (data) {
                                feeds.update({ _id: input.feedId }, {
                                    $push: {
                                        likes: {
                                            userId: input.userId
                                        }
                                    }
                                }, (err, data) => {
                                    if (data) {
                                        res.json({ statusCode: 1, statusMessage: 'Liked' })
                                    } else {

                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
    })
})


module.exports = router
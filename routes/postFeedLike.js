var express = require('express')
var router = express.Router()
var feeds = require('../schemas/feeds')
var userSchema = require('../schemas/userSchema')

router.post('/', (req, res) => {
    var input = req.body

    userSchema.findById({ _id: input.userId }, (err, data) => {
        if (err) {
            res.json({ statusCode: 0, statusMessage: 'wrong user id' })
        } else if (data) {
            feeds.findById({ _id: input.feedId }, (err, data) => {
                if (err) {
                    res.json({ statusCode: 0, statusMessage: 'wrong feed id' })
                } else if (data) {
                    data.likes.find({ userId: input.userId }, (err, data) => {
                        if (!data) {
                            data.update({
                                _id: input.feedId
                            }, {
                                    $push: {
                                        likes: {
                                            userId: input.userId
                                        }
                                    }
                                }, (err, data) => {

                                })
                        } else {
                            data.update({
                                _id: input.feedId
                            }, {
                                    $pull: {
                                        likes: {
                                            userId: input.userId
                                        }
                                    }
                                }, (err, data) => {

                                })
                        }
                    })

                }
            })
        }
    })

})

module.exports = router
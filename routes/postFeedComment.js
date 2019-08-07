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
                    res.json({ statusCode: 0, statusMessage: 'wrong feedId' })
                } else if (data) {
                    feeds.update({
                        _id: input.feedId
                    }, {
                            $push: {
                                comments: {
                                    comment: input.comment,
                                    userId: input.userId
                                }
                            }
                        }, (err, data) => {
                            if (data) {
                                res.json({ statusCode: 1, statusMessage: 'succesfully commented' })
                            }
                        })
                }
            })
        }
    })

})

module.exports = router
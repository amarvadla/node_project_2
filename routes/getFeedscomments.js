var express = require('express')
var router = express.Router()
var feeds = require('../schemas/feeds')
var userSchema = require('../schemas/userSchema')

router.get('/', (req, res) => {
    var input = req.query

    userSchema.findById({ _id: input.userId }, (err, data) => {
        if (err) {
            res.json({ statusCode: 0, statusMessage: 'wrong user id' })
        } else if (data) {
            feeds.findById({ _id: input.feedId }, (err, dataObj) => {
                if (err) {
                    res.json({ statusCode: 0, statusMessage: 'wrong feed id' })
                } else if (dataObj) {

                    var commentsArray = []
                    for (var i = 0; i < dataObj.comments.length; i++) {
                        var resObj = {}
                        resObj.id = dataObj.comments[i]._id
                        resObj.comment = dataObj.comments[i].comment
                        resObj.userName = data.username

                        commentsArray.push(resObj)
                    }

                    res.json({
                        statusCode: 1,
                        statusMessage: 'success',
                        data: commentsArray
                    })
                }
            })
        }
    })

})

module.exports = router
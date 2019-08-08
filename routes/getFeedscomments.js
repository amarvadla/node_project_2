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
                    res.json({
                        statusCode: 1,
                        statusMessage: 'success',
                        data: dataObj.comments
                    })
                }
            })
        }
    })

})

module.exports = router
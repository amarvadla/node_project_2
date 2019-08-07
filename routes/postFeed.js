var express = require('express')
var router = express.Router()
var feeds = require('../schemas/feeds')
var userSchema = require('../schemas/userSchema')


router.post('/', (req, res) => {
    var input = req.body

    userSchema.findById({ _id: input.userId }, (err, data) => {

        if (err) {
            req.json({ statusCode: 0, statusMessge: 'please enter valid userId' })
        } else if (data) {
            var feedsData = new feeds();
            feedsData.userId = input.userId;
            feedsData.imageUrl = input.imageUrl;
            feedsData.text = input.text;

            feedsData.save((err, data) => {
                if (err) {
                    res.json({ statusCode: 0, statusMessage: 'something went wrong' })
                } else if (data) {
                    res.json({
                        statusCode: 1, statusMessage: 'succesfully posted', data: {
                            feedId: data._id
                        }
                    })
                }
            })
        }
    })

})

module.exports = router

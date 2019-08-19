var express = require('express')
var router = express.Router()
var feeds = require('../schemas/feeds')
var userSchema = require('../schemas/userSchema')
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req, res) => {
    var input = req.query

    userSchema.findById({ _id: input.userId }, (err, data) => {
        if (err) {
            res.json({ statusCode: 0, statusMessage: 'wrong user id' })
        } else if (data) {
            // feeds.findById({ _id: input.feedId }, (err, dataObj) => {
            //     if (err) {
            //         res.json({ statusCode: 0, statusMessage: 'wrong feed id' })
            //     } else if (dataObj) {


            //     }
            // })


            feeds.aggregate([{ $match: { _id: ObjectId("5d4bcf9126bc8328dc3f9af5") } },
             { "$unwind": "$comments" },
             { $replaceRoot: { newRoot: "$comments" } },
            { $lookup: { from: "userschemas", localField: "userId", foreignField: "_id", as: "userObj" } },
            { "$unwind": "$userObj" },
            {
                $project: {
                    commentId: "$_id", _id: 0, comment: 1, userId: 1,
                    profileImage: "$userObj.password"
                }
            }
            ]).exec(function (err, data) {
                // if (err) {
                //     console.log(err)
                // }
                // var dataObj = data[0]
                // var commentsArray = []
                // for (var i = 0; i < dataObj.comments.length; i++) {
                //     var resObj = {}
                //     resObj.id = dataObj.comments[i]._id
                //     resObj.comment = dataObj.comments[i].comment
                //     resObj.username = dataObj.userObj.username

                //     commentsArray.push(resObj)
                // }


                res.json({
                    statusCode: 1,
                    statusMessage: 'success',
                    data: data
                })
            })


        }
    })

})

module.exports = router
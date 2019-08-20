var express = require('express')
var router = express.Router()
var feeds = require('../schemas/feeds')
var userSchema = require('../schemas/userSchema')
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req, res) => {

    var input = req.query

    userSchema.findById({ _id: input.userId }, (err, data) => {
        if (err) {
            console.log(err)
        } else if (data) {
            feeds.aggregate([
                { $match: { '_id': ObjectId(input.feedId) } },
                { '$unwind': '$likes' },
                { $replaceRoot: { newRoot: '$likes' } },
                {
                    $lookup: {
                        from: 'userschemas',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userObj'
                    }
                }, { '$unwind': '$userObj' }, {
                    $project: {
                        commentID: '$_id',
                        userId: '$userId',
                        userName: '$userObj.username'
                    }
                }]).exec((err, data) => {
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


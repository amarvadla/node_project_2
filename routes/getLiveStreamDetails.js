var express = require('express')
var router = express.Router()
var schema = require('../schemas/liveStreamContest')
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req, res) => {

    var input = req.query

    // schema.findById({ _id : input.contestId} , (err,data) => {
    //     console.log(data)
    // })

    schema.aggregate([
        { $match: { _id: ObjectId("5d6a09d6226c5e0a081d4b9b") } },
        { "$unwind": "$masterDataId" },
        { $lookup: { from: "liveStreamMaster", localField: "masterDataId", foreignField: "_id", as: "streamData" } },
        { "$unwind": "$streamData" },
        {
            $project: {
                id: "$streamData._id", contestTitle: "$streamData.contestTitle", applicationName: "$streamData.applicationName",
                host: "$streamData.host", port: "$streamData.port", streamName: "$streamData.streamName", userName: "$streamData.userName",
                password: "$streamData.password", _id: 0
            }
        }
    ]).exec((err, data) => {

        if(err){
            res.json({
                statusCode: 1,
                statusMessage: err
            })
        }else if(data){
            res.json({
            statusCode: 1,
            statusMessage: 'success',
            data: data
            })
        }

        
    })



})

module.exports = router
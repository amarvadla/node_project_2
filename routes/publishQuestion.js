const express = require('express');
const router = express.Router();
var liveStreamSchema = require('../schemas/liveStreamContest');
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req, res) => {
    var input = req.query;

    liveStreamSchema.aggregate([
        { $match :{ _id : ObjectId(input.contestId)}},
        {"$unwind" : "$questions"},
        {$replaceRoot: { newRoot: "$questions" } },
        { $match : {_id : ObjectId(input.questionId)}}
        ]).exec( (err,data) =>{
            res.json(data)
        })

})

module.exports = router
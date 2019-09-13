const express = require('express');
const router = express.Router();
var liveStreamSchema = require('../schemas/liveStreamContest');
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req, res) => {
    var input = req.query;

    liveStreamSchema.aggregate([
        { $match: { _id: ObjectId(input.contestId) } },
        { "$unwind": "$questions" },
        { $replaceRoot: { newRoot: "$questions" } },
        { $match: { _id: ObjectId(input.questionId) } }
    ]).exec((err, data) => {

        if (data) {

            var ques = data[0];

            questionTime = ques.questionTime;

            var currentDat = new Date();
            var changedDate = new Date();
            changedDate.setSeconds(changedDate.getSeconds() + questionTime);


            liveStreamSchema.update({
                _id: ObjectId(input.contestId),
                questions: { $elemMatch: { _id: ObjectId(input.questionId) } }
            }, { $set: { "questions.$.startDate": new Date(), "questions.$.endDate": changedDate } }, (err, data) => {
                if (err) {
                    res.json(err)
                } else if (data) {
                    res.json(data)
                }
            })
        }

    })

})

module.exports = router
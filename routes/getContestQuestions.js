var express = require('express')
var router = express.Router()
var liveStreamSchema = require('../schemas/liveStreamContest')
var ObjectId = require('mongodb').ObjectID

router.get('/', (req, res) => {

    var input = req.query

    liveStreamSchema.findById(input.contestId, (err, data) => {

        if (err) {
            res.json({ statusCode: 0, statusMessage: "error" })
        } else if (data) {

            var questionsArray = data.questions
            var newQuestions = []

            for (var i = 0; i < questionsArray.length; i++) {
                var questionObj = {}

                questionObj.questionId = questionsArray[i]._id
                questionObj.questionTime = questionsArray[i].questionTime
                questionObj.bufferTime = questionsArray[i].bufferTime
                questionObj.questionText = questionsArray[i].questionText

                var optionsArray = []

                for (var j = 0; j < questionsArray[i].options.length; j++) {

                    var optionsObj = {}

                    optionsObj.optionValue = questionsArray[i].options[j].optionValue
                    optionsObj.count = questionsArray[i].options[j].count
                    optionsObj.isParticipated = questionsArray[i].options[j].isParticipated

                    optionsArray.push(optionsObj)
                }

                questionObj.options = optionsArray

                newQuestions.push(questionObj)

            }

            res.json({ statusCode: 1, statusMessage: "success", data: newQuestions });

        }
    })

})


module.exports = router
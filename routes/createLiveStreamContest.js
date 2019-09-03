const express = require('express')
const router = express.Router()
var liveStreamSchema = require('../schemas/liveStreamContest')

router.post('/', (req,res) => {

  var input = req.body

  var liveSchema = new liveStreamSchema()

    liveSchema.masterDataId = input.masterDataId
    liveSchema.contestTitle = input.contestTitle
    liveSchema.contestNumber = input.contestNumber
    liveSchema.totalQues = input.totalQues
    liveSchema.startDate = input.startDate
    liveSchema.endDate = input.endDate
    liveSchema.questions = input.questions

    liveSchema.save((err,data)=>{
        if(err){
            res.json({ statusCode : 0 , statusMessage : err})
        }else if(data){

            var liveStreamContestData = {};

            liveStreamContestData.contestId = data._id
            liveStreamContestData.contestTitle = data.contestTitle
            liveStreamContestData.contestNumber = data.contestNumber
            liveStreamContestData.totalQues = data.totalQues
            liveStreamContestData.startDate = data.startDate
            liveStreamContestData.endDate = data.endDate

            var questions = []
            
            for(var i=0;i<data.questions.length ;i++){
    
                var options = []

                for(var j=0 ;j <data.questions[i].options.length;j++){
                    
                    var obj = {}
                    obj.optionValue = data.questions[i].options[j].optionValue
                    obj.count = data.questions[i].options[j].count

                    options.push(obj)
                }  

                var quesObj = {}

                quesObj.questionTime =  data.questions[i].questionTime
                quesObj.bufferTime = data.questions[i].bufferTime
                quesObj.questionText =  data.questions[i].questionText
                quesObj.options = options

                questions.push(quesObj)
            }



            liveStreamContestData.questions = questions

            res.json({statusCode : 1,statusMessage : "success" , data : liveStreamContestData})
        }
    })

})

module.exports = router
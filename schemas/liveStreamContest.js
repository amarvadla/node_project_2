const mongoose = require('mongoose')
const Schema = mongoose.Schema

const optionsSchema = Schema({

    optionValue : {
        type : String
    },
    count : {
        type : Number
    },
    isParticipated : {
        type : Boolean
    }

})

const questionSchema = Schema({
    questionTime : {
        type : Number
    },
    bufferTime : {
        type : Number
    },
    questionText : {
        type : String
    },
    options : [optionsSchema]
})


const liveStreamContest = Schema({

    masterDataId : {
        type : Schema.Types.ObjectId,
        ref : 'liveStreamMaster'
    },

    contestTitle : {
        type : String,
        ref : 'liveStreamMaster'
    },

    contestNumber : {
        type : Number
    },

    totalQues : {
        type : Number
    },

    startDate : {
        type : Date
    },

    endDate : {
        type : Date
    },

    questions : [questionSchema]

}, {versionKey : false, collection : "liveStreamContest"})

var liveStreamContestModel = mongoose.model("liveStreamContest", liveStreamContest)
module.exports = liveStreamContestModel
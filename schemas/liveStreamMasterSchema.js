const mongoose = require('mongoose')
const Schema = mongoose.Schema

const liveStreamMaster = Schema({

    contestTitle : {
        type : String,
        required : true
    },

    applicationName :{
        type : String,
        required : true
    },

    host : {
        type : String,
        required : true
    },

    port : {
        type : Number,
        required : true
    },

    streamName : {
        type : String,
        required : true
    },

    userName : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    createdDate : {
        type : Date,
        default : Date.now
    }

}, { versionKey : false, collection : "liveStreamMaster"})

var liveStreamModel = mongoose.model("liveStreamMaster", liveStreamMaster)
module.exports = liveStreamModel
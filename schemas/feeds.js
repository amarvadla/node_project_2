var mongoose = require('mongoose')
var Schema = mongoose.Schema

var likesSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    }
})

var commentsSchema = Schema({
    comment: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    }
})

var feeds = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    }, imageUrl: {
        type: String,
        required: true
    }, text: {
        type: String,
        required: true
    },
    likes: [likesSchema],
    comments: [commentsSchema]
})

var feedsModel = mongoose.model('feeds', feeds);

module.exports = feedsModel
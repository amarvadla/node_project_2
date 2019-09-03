var mongoose = require('mongoose')
var Schema = mongoose.Schema
var _ = require('lodash')

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
},{ versionKey: false, collection: 'feeds' })

feeds.methods.simpleObj = function () {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    for (var i = 0; i < obj.likes.length; i++) {
        obj.likes[i].id = obj.likes[i]._id;
        delete obj.likes[i]._id
    }

    for (var i = 0; i < obj.comments.length; i++) {
        obj.comments[i].id = obj.comments[i]._id;
        delete obj.comments[i]._id
    }

    return obj;
}

var feedsModel = mongoose.model('feeds', feeds);

module.exports = feedsModel
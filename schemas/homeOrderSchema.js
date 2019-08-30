var mongoose = require('mongoose')
var Schema = mongoose.Schema

var orderSchema = Schema({
    name : {type : String},
    order : {type : String},
    sectionName : {type : String},
    limit : {type : Number}
})

var homeOrderSchema = Schema({
    version : {type :String},
    type : {type : String},
    homePageOrder : [orderSchema]
}, { versionKey: false, collection: "HomePageOrder" })


var homeOrder = mongoose.model('HomePageOrder' , homeOrderSchema) 
module.exports = homeOrder
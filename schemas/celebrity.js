var mongoose = require('mongoose')
var Schema = mongoose.Schema

var celebrity = Schema({

    name: { type: String, require: true, unique: true },
    dob: { type: Date },
    pob: { type: String },
    languagesKnows: { type: [String] },
    spouses: { type: [String] },
    relationShipStatus: { type: String },
    residence: { type: String },
    almaMatter: { type: String },
    occupation: { type: String },
    industry : { type : [String]}

}, { versionKey: false, collection: 'celebrity' })

var celeb = mongoose.model('celebrity', celebrity)
module.exports = celeb
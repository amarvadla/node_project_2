var express = require('express')
var router = express.Router()
var userSchema = require('../schemas/userSchema')
var celebSchema = require('../schemas/celebrity')


router.post('/', (req, res) => {

    var input = req.body;
    var outputData = { statusCode: 0, statuMessage: 'wrong user id' }

    userSchema.findById({ _id: input.userId }, (err, data) => {

        if (err) {
            res.json(outputData)
        } else if (data) {

            var celeb = new celebSchema()
            celeb.name = input.name
            celeb.dob = input.dob
            celeb.age = input.age
            celeb.pob = input.pob
            celeb.languagesKnows = input.languagesKnows
            celeb.spouses = input.spouses
            celeb.relationShipStatus = input.relationShipStatus
            celeb.residence = input.residence
            celeb.almaMatter = input.almaMatter
            celeb.occupation = input.occupation
            celeb.industry = input.industry

            celeb.save((err, data) => {
                if (err) {
                    res.json({ statusCode: 0, statusMessage: 'something went wrong' })
                } else if (data) {
                    res.json({
                        statusCode: 1, statusMessage: 'succesfully inserted', data: {
                            celebId: data._id
                        }
                    })
                }
            })

        }

    })

})

module.exports = router
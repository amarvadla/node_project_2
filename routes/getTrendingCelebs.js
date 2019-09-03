var express = require('express')
var router = express.Router()
var celebUtils = require('../utils/celebUtils')
var celebSchema = require('../schemas/celebrity')

router.get('/', (req, res) => {

    var input = req.query

    var coOrdinates = {
        lat: input.lat,
        lon: input.lon
    }


    var state = celebUtils.getState(coOrdinates).then((data) => {

        var state = data;

        var array = [];

        celebSchema.find({ industry: ["bollywood"] }, (err, data) => {

            for (let i = 0; i < data.length; i++) {
                array.push(data[i]);
            }

            celebSchema.find({ industry: { $nin: ["bollywood"] } }, (err, data) => {

                for (let i = 0; i < data.length; i++) {
                    array.push(data[i]);
                }

                res.json(array)

            })

        })

    }).then((err) => {
        // res.json(err)
    }).catch((err) => {
        //  res.json(err)
    });

})


module.exports = router
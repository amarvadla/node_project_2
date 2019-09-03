const express = require('express')
const router = express.Router()
var masterSchema = require('../schemas/liveStreamMasterSchema')


router.post('/', (req, res) => {
    var input = req.body

    var master = new masterSchema()

    master.contestTitle = input.contestTitle
    master.applicationName = input.applicationName
    master.host = input.host
    master.port = input.port
    master.streamName = input.streamName
    master.userName = input.userName
    master.password = input.password

    master.save((err, data) => {
        if (err) {
            res.json({ statusCode: 0, statusMessage: err })
        } else if (data) {
            res.json({ statusCode: 1, statusMessage: "success", data: { id: data._id } })
        }
        else {
            res.json({ statusCode: 0, statusMessage: "unable to create" })
        }
    })

})

module.exports = router

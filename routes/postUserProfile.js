var express = require('express')
var router = express.Router()
var userSchema = require('../schemas/userSchema')

router.post('/', (req, res) => {
    var input = req.body
    console.log(input)
    var user = new userSchema(input);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(res.json(user._id));
    }).catch((e) => {
        res.status(400).send(e)
    })

})

exports = module.exports = router
var express = require('express')
var router = express.Router()
var userSchema = require('../schemas/userSchema')

router.get('/', (req, res) => {

    var input = req.body

    userSchema.login(input.email, input.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).json({id : user._id});
        });
    }).catch((e) => {
        res.send({
            'statusCode': 0,
            'statusMessage': 'wrong credentials',
            'error': e
        })

    });
})

module.exports = router
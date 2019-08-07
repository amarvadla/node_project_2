var userSchema = require('../schemas/userSchema')

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    userSchema.findToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
}

exports = module.exports = authenticate
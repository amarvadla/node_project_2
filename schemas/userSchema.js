var mongoose = require('mongoose')
var jwt = require('jsonwebtoken');
var bycrpt = require('bcryptjs');
var schema = mongoose.Schema

var userSchema = schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    dob: {
        type: Date
    }, tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})


userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();


    // user.tokens.push({ access, token });
    user.tokens = user.tokens.concat([{ access, token }]);

    return user.save().then(() => {
        return token;
    }
    );
}

userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bycrpt.genSalt(10).then((salt) => {
            bycrpt.hash(user.password, salt, (err, hash) => {
                if (hash) {
                    user.password = hash;
                    next();
                }
            }).catch((e) => {
                console.log(e);
                next();
            })
        })

    } else {
        next();
    }
});

userSchema.statics.login = function (email, password) {

    var user = this;

    return user.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bycrpt.compare(password, user.password, (err, bool) => {
                // console.log(bool);
                if (bool) {
                    // console.log(user)
                    resolve(user);
                } else {
                    reject();
                }
            });
        })
    })
}

userSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
    })
}

var userModel = mongoose.model('userSchema', userSchema)
exports = module.exports = userModel
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var normalizedPath = require("path").join(__dirname, "./schemas/");
require("fs").readdirSync(normalizedPath).forEach(function (file) {
    require("./schemas/" + file);
});

mongoose.connect('mongodb://localhost:27017/project2')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Database Connection Error:'))
db.once('open', function () {
    require('./jobs/cronJobs')
})

exports = module.exports = {
    mongoose: mongoose
}


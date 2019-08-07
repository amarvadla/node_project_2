var mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/project2')
var db = mongoose.connection

db.on('error', () => { console.log('db connection error') })
db.on('open', () => {
    var app = require('./app')
    var http = require('http')
    var port = process.env.PORT || 8080
    app.set('port', port)

    var server = http.createServer(app)
    var ip = '127.0.0.1'
    server.listen(port, ip, () => {
        console.log('server has started ' + ip + ' : ' + port)
    })
    server.on('error', (err) => { console.log(err) })
})

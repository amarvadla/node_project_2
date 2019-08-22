var cron = require('node-cron');
var ref = require('../fireBaseAdmin')

cron.schedule('*/1 * * * *', function (res) {

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    var usersRef = ref.child("users");
    usersRef.set({
        amar: {
            date_of_birth: dateTime,
            full_name: "asd Turing"
        },
        vickram: {
            date_of_birth: dateTime,
            full_name: "Gracesadas Hopper"
        }
    });
})
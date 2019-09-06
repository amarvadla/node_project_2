var Twitter = require('twitter');
var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {


    var client = new Twitter({
        consumer_key: 'nyUt7KByiBK7Nsakl7uU870qN',
        consumer_secret: '0ihurRQGOOoaOfEtkKkNBTsiFbCwQhXdHaapXmrt7OL96sLL66',
        access_token_key: '149378569-teGsbTggdf9m1tcYFD6ZYhXSTULODDmZxSZrJkUE',
        access_token_secret: 'QzaEBQPtWWklAmFFVdzycZV3pUbVjUOiwGgIdqxDP1gV3'
    });

    var params = { screen_name: 'amar3696' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            res.json({ response : response.statu, tweets : tweets})
        }
    });


})

module.exports = router


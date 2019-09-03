const requestify = require('requestify')

function getState(coOrdinates) {
    let getPromise = new Promise((resolve, reject) => {
        var api = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + coOrdinates.lat + ',' + coOrdinates.lon + '&key=AIzaSyAYwlQ5CBjFAkBdoSF9xQz4-D3Lw_eG4SY'
        requestify.get(api).then((response) => {
            var body = response.getBody()

            console.log(body)
            // resolve(body)
        }).then((err) => {
            // reject("error")
        }).catch((err) => {
            // reject("error")
        })

        resolve("tamilnadu")

    })

    return getPromise
};

module.exports = {
    getState: getState
}

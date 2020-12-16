const request = require('request');
const asyncHandler = require('../middleware/async');

const reverseGeocoding = asyncHandler(async(latitude, longitude) => {

    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        longitude + ', ' + latitude +
        '.json?access_token=' + process.env.ACCESS_TOKEN;

    request({ url: url, json: true }, async function(error, response) {
        if (error) {
            console.log('Unable to connect to Geocode API');
        } else if (response.body.features.length == 0) {
            console.log('Unable to find location. Try to' +
                ' search another location.');
            return 'Unable to find location. Try to' +
                ' search another location.';
        } else {
            let address = await response.body.features[0].place_name;
            //console.log(typeof address);

            console.log(address, 'add')
            return address;
        }
    })
})

module.exports = reverseGeocoding;
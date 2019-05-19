const request = require('request')

const geoCode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) + '.json?access_token=pk.eyJ1Ijoic29waGVhcml0aCIsImEiOiJjanZoMWxkcm8wZHZoM3lwMDNmdzE2MGNlIn0.Nwm_j8ug-twqVVwctqAajg&limit=1'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode
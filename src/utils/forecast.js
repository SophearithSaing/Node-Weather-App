const request = require('request')

const forecast = (lat, long, callback) => {
    // set up to show SI unit with ?key=value&otherKey=otherValue
    const url = 'https://api.darksky.net/forecast/c158cda71b180ed76124be353040589e/' + lat + ','+ long + '?units=si'
    
    request({ url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
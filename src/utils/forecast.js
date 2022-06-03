const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4125996edaef450f8f931a82f8c3ec4b&query=${latitude},${longitude}&units=f`
  request({  url,  json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services')
    } else if (body.error) {
      callback(`Unable to find location based on lat ${latitude} and long ${longitude} => ` + body.error.info)
    } else {
      callback(undefined, body)
    }
  })
}

module.exports = forecast
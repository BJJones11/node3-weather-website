const request = require('request')

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoiYnJpYW4tam9uZXMiLCJhIjoiY2wyN2xvOGxqMDBuZTNkbXUzZGphaHRzNCJ9.LZZ2ayIb8RV3dGEiYrmTrg`
  
  request({  url,  json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services')
    } else if (!body.features.length) {
      callback(`Unable to find location based on address ${address}`)
    } else {
      latLong = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place: body.features[0].place_name
      }
    callback(undefined, latLong)
    }
  })
}

module.exports = geoCode
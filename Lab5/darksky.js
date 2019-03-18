const request = require('request')
const credentials = require('./credentials.js')

const city = function(ciudad, callback){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ciudad+'.json?access_token=' + credentials.apikey2

    request({url, json: true}, function(error, response){
        if(response.statusCode == 401){
            console.log(data.message + "Error 401")
            callback('Service Unavailable', undefined)
        }else if(response.statusCode == 200){
            const data = response.body
            const lon = data.features[0].center[0]
            const lat = data.features[0].center[1]
            darksky(lat, lon)
        }
        else{
            console.log(data)
            callback(undefined, error)
            
        }
    })       
}

const darksky = function(latitude, longitude, callback){
    const url = 'https://api.darksky.net/forecast/' + credentials.apikey + '/' + latitude +',' + longitude + '?lang=es&units=si'
    
    request({ url, json: true}, function(error, response) {
        if(response.statusCode == 200){
            const data = response.body
            const summary = data.hourly.summary
            const temperature = data.currently.temperature
            const probLluvia = data.currently.precipProbability

            console.log(summary+" Actualmente esta a "+temperature+"°C y hay "+probLluvia+"% de probabilidad de lluvia")
        }else if(response.statusCode == 401){
            callback(undefined, response.body)
        }
    })
}

//city("Monterrey")
module.exports={
    city: city
}

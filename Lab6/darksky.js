const request = require('request')
const credentials = require('./credentials.js')

const city = function(ciudad, callback){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ciudad+'.json?access_token=' + credentials.apikey2

    request({url, json: true}, function(error, response){
        if(error){
            callback("Error de ciudad", undefined)
        }else if(response.message == "Not Authorized - Invalid Token"){
            callback(response.message, undefined)
        }else if(response.statusCode == 200){
            const data = response.body
            const lon = data.features[0].center[0]
            const lat = data.features[0].center[1]
            callback(lat, lon, false)
        }
        else{
            //console.log(data)
            callback(undefined, undefined, error)
            
        }
    })       
}

const darksky = function(latitude, longitude, callback){
    const url = 'https://api.darksky.net/forecast/' + credentials.apikey + '/' + latitude +',' + longitude + '?lang=es&units=si'
    request(url, function(error, response, body) {
        const pBody = JSON.parse(body)
        if(error){
            callback("Servicio OUT!!", undefined)
        }else if(pBody.code == '400'){
            callback(pBody.error, undefined)
        }else{
            const info = pBody.currently
            //const data = response.body
            const summary = info.summary
            const temperature = info.temperature
            const probLluvia = info.precipProbability
            console.log(summary+" Actualmente esta a "+temperature+"°C y hay "+probLluvia+"% de probabilidad de lluvia")
        }
    })
}

module.exports={
    city: city,
    darksky: darksky
}

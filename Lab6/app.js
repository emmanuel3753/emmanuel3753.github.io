
//const clima = require('./darksky.js')

//clima.city("Monterrey", clima.darksky)

const path = require('path')
const express = require('express')
const darksky = require("./darksky.js")
const app = express()

const city = 'Monterrey'
const port = 3000
const publicDir = path.join(__dirname, 'public')

app.use(express.static(publicDir))

app.get('/darksky', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if( !req.query.search ) {
      return res.send({
        error: 'La city es invalida'
      })
    }
    darksky.city(req.query.search, function(error, response) {
      if(error) {
        return res.send({
          error: error
        })
      }
      const city = req.query.search
      const long = response.longitud
      const lat = response.latitud
      darksky.darksky(lat, long, function(error, response) {
          if(error) {
            return res.send({
              error: error
            })
          }
          res.send({
            location: city,
            weather: response.darksky,
          })
        }) 
    })
})

app.listen(port, function(){
    console.log('up and running')
})

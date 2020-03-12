const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = 'https://api.darksky.net/forecast/d6f5b29d98236505aa5c940c092d8b01/' + latitude + ',' + longitude +'?units=si'
    request({url,json:true},(error,{body}) => {
        if (error) {
            callback('Unable to connect to weather service',undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}



// const url = 'https://api.darksky.net/forecast/d6f5b29d98236505aa5c940c092d8b01/37.8267,-122.3382?units=si'

// request({url: url, json: true}, (error, response)=>{
//     if (error){
//         console.log('Unable to connect to weather service')
//     }else if (response.body.error) {
//         console.log('Unable to find location')
//     }
    
//     else {
//         console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain')
//     }
// })


module.exports = forecast
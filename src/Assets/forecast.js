const request = require('request');

const forecast = function(lat,lon,callback){
    const url = 'http://api.weatherapi.com/v1/current.json?key=409b6ea824fb44ac915180347242309&q='+ encodeURIComponent(lat) + ',' + encodeURIComponent(lon)
    request({url:url,json:true},(error,response)=>{
        if(error)
        callback('Weather services unavailable!',undefined)
        else if(response.body.error)
        callback('Try after some time',undefined)
        else
        callback(undefined,{
            Forecast:response.body.current.condition.text,
            Temperature:response.body.current.temp_c,
            feelslike:response.body.current.feelslike_c,
            windspeed:response.body.current.wind_kph,
            winddirection:response.body.current.wind_dir,
            humidity:response.body.current.humidity,
            
        })
    })
}

module.exports = forecast
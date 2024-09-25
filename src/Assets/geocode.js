const request = require('request')

//  For Location
const geocode = function(Address,callback){
    const url = 'http://api.positionstack.com/v1/forward?access_key=e9d51fb46247a04ddf38c8aa19f51205&query='+ encodeURIComponent(Address)
    request({url: url,json: true},(error,response)=>{
        if(error)
        callback('Weather services unavailable!',undefined)
        else if(response.body.error){
            callback('unable to find location. Try another search',undefined)
        }
        else{
            callback(undefined,{
                location:response.body.data[0].name,
                latitude:response.body.data[0].latitude,
                longitude:response.body.data[0].longitude
            })
        }
    })
}

module.exports = geocode
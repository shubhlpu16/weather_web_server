const axios = require('axios');
const config = require('./config');






const getWeatherDetails=(location,callback)=>{

  axios
      .get(`${config.urls.weather_url}?access_key=${config.tokens.weather_token}&query=${location.latitude},${location.longitude}`)
      .then(response=>{
        if(response.status='200')
        {const data=response.data.current
        callback({data:`It is ${data.weather_descriptions[0]},with ${data.temperature} degrees Celcius. It feels like ${data.feelslike} degrees Celcius.There is ${data.precip}% chance of rain`});}
        else if(response.data.error)
        {
          callback('Unable to find Location')
        }
      })
      .catch(err=>callback({error:`${err.code}! Unable to connect weather service`}));

}

module.exports=getWeatherDetails

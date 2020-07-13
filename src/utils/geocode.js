const axios = require('axios');
const config = require('./config');


const index=0;



const getGeoCode=(address,callback)=>{

  axios
      .get(`${config.urls.geo_url}/${encodeURIComponent(address)}.json?access_token=${config.tokens.geo_token}`)
      .then(response=>{
        if(response.data.features.length===0)
        {
          callback({error:'Unable to find location, Try another search',place_details:{}})
        }
        else
        callback({place_details:{
          latitude:response.data.features[index].center[1],
          longitude:response.data.features[index].center[0],
          location:response.data.features[index].place_name,
        },error:undefined})
      })
      .catch(err=>callback({error:  `${err.code}! Unable to connect to mapbox`,place_details:{}})
      );

}

module.exports=getGeoCode

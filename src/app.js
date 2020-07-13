const path = require('path');
const hbs =require('hbs');
const express = require('express');

const getGeoCode = require('./utils/geocode');
const getWeatherDetails = require('./utils/weather');

const app = express();


app.set('view engine','hbs')
const publicDirectoryPath= path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather',
    name:'shubham'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About',
      name:'shubham'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help',
      name:'shubham'
  })
})


app.get('/weather',(req,res)=>{
  if(!req.query.address)
  {
    return res.send({
      error:'Address not sent in query params'
    })
  }
  getGeoCode(req.query.address,(response)=>{
    if(response.error)
      return res.send({
        error:response.error,
      });
      getWeatherDetails(response.place_details,(responseData)=>{
        if(responseData.error)
        return res.send({
          error:responseData.error,
        })
        res.send({
          location:response.place_details.location,
            forcast:responseData.data,
            icon:responseData.icon,
            address: req.query.address,
        })

      })

    }
  )

})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:'404',
    content:'Article Not Found',
      name:'shubham'
  })
})

app.get('*',(req,res)=>{
  res.render('404',{
    title:'404',
    content:'Page Not Found',
      name:'shubham',
  })
})
app.listen(3000);

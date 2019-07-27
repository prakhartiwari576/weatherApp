const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine','hbs')
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
  res.render('index.hbs')
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:'Please provide an address'
    })
  }else{
    geocode.geocode(req.query.address,(error,data)=>{
      if(error){
        return res.send({
          error:error
        })
      }else{
        forecast.forecast(data.latitude,data.longitude,(error1,data1)=>{
          if(error1){
            return res.send({
              error:error1
            })
          }else{
            res.send({
              location:data.location,
              weatherSummary:data1
            })
          }
        })
      }
    })
  }
})

app.listen(port,()=>{
  console.log(`Server is up and running on port ${port}`)
})

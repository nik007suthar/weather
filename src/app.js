const express = require('express')
const hbs = require('hbs')
const geocode = require('./Assets/geocode')
const forecast = require('./Assets/forecast')

const path = require('path')
const { title } = require('process')
const { error } = require('console')
const app = express()

app.use(express.static('src'));

app.set('view engine','hbs')

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

const viewpath = path.join(__dirname,'../template/views')
app.set('views',viewpath)

const partialpath =path.join(__dirname,'../template/partials')
hbs.registerPartials(partialpath)

app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Nikhil'
    })
})

app.get('/About',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Nikhil'
    })
})

app.get('/Help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        msg: 'This is help page'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.Address){
        return res.send({
            error: 'You must provide an Address'
        })
    }
    
    geocode(req.query.Address,(error,{latitude,longitude,location} = {})=>{
        if(error)
        return res.send({error})
    
        forecast(latitude,longitude,(error,forecast_data)=>{
            if(error)
            return res.send({error})
            res.send({
                forecast:forecast_data,
                location
            })   
        })
    })

})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        message:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        message:'Page Not Found'
    })
})

app.listen(3000,()=>{
    console.log('App is running on port 3000')
})
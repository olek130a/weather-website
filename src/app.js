const path = require ('path')
const geocode = require('./geocode')
const forecast = require('./forecast')
const express = require ('express')
const hbs = require ('hbs')

const app = express()

//paths for express config
const viewsPath = path.join(__dirname,'../templates/views')
const publicDirectoryPath = path.join(__dirname,'../public')
const pratialsPath = path.join(__dirname,'../templates/partials')

//setup handlers engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(pratialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Olek'
    })
})


app.get('/about',(req, res) => {
    res.render('about',{
        title: 'about me',
        name: 'Olek'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help page!',
        name: 'Olek'
    })
})




app.get('/weather',(req,res) =>{
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode (req.query.address,(error,{longitude,latitude,location}={})=>{
        if (error){
            return res.send({error})
        }
    forecast (longitude,latitude,(error,forecastdata)=>{
        if (error){
            return res.send({error})
        }
        res.send({
            location,
            forecast: forecastdata,
            address: req.query.address
        })
    })
    })
})

   

app.get('/products',(req,res) =>{
    if (!req.query.search){
        return res.send({
            error:'You must provide a serch term'
        })
    }
    console.log(req.query.search)
    res.send({
        produts:[]
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        error:'Help article not found',
        title:'404',
        name: 'Olek'
    })
})


app.get('*',(req,res) =>{
    res.render('404',{
        error:'Page not found',
        title:'404',
        name: 'Olek'
    })
})

app.listen(3000, () => {
    console.log('server is up')
})

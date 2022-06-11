const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
  //Express needs templates file to be named views by default, this is how you can customize it
const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Brian Jones'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Brian Jones'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: `I've fallen and I can't get up!`,
    title: 'HELP!',
    name: 'Brian Jones'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided'
    })
  }
  geoCode(req.query.address, (error, {latitude, longitude, place} = {}) => {
    if (error) {
      return res.send({
        error: 'geoCode call failed to identify latitude/longitude'
      })
    } 
    forecast(latitude, longitude, (error, {current} = {}) => {
      if (error) {
        return res.send({
          error: error
        })
      }
      res.send({
        forecast: `It is currently ${current.weather_descriptions} with a tempature of ${current.temperature} but feels like ${current.feelslike}, and there is a ${current.precip} percent chance of rain!`,
        location: place,
        address: req.query.address
      })
      // console.log(`In ${place} it is ${current.weather_descriptions}. 
      // The tempature is currently ${current.temperature} but feels like ${current.feelslike},
      // and there is a ${current.precip} percent chance of rain!`)
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  } 

  console.log(req.query.search)
  res.send({
    products: []
  })
})

// 404 handling
app.get('/help/*', (req, res) => {
  res.render('404', {
    message: `Help article not found.`,
    title: '404 Not Found',
    name: 'Brian Jones'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    message: `Page not found.`,
    title: '404 Not Found',
    name: 'Brian Jones'
  })
})

// Only have to call this once, it starts up the server on the port I specifiy (console is just for seeing in terminal)
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})



////////////Everything below here was testing with app.get and res.send

// app.get takes in 2 arguments and defines what to do at a certain page
//   1st parameter is route, second is function of what to do
//   Main domain would have '' in first parameter, others like /help would go in first parameter
// app.get('', (req, res) => {
//   res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//   res.send({
//     name: 'Brian',
//     age: 30
//   })
// })

// app.get('/about', (req, res) => {
//   res.send('<h1>This page is about learning</h1>')
// })


// require core node modules
const path = require('path')

// require npm modules
const express = require('express')
const hbs = require('hbs')

// require functions
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define path for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory
app.use(express.static(publicDirectoryPath))

// access home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather-app',
        name: 'Rith'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Rith'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a message',
        title: 'Help',
        name: 'Rith'
    })
})

// old handlers for index, help and about
// app.get('' , (req, res) => {
//     res.send('Hello express!!')
// })
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Rith',
//         age: 21
//     })
// })
// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>') 
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a valid address.'
        })
    }
    geoCode(req.query.address, (error, geoCodeData = {}) => {
        const { latitude: lat, longitude: long, location } = geoCodeData
        if (error) {
            return res.send({ error })
        }
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({
                    errro: 'error message'
                })
            }
            res.send({
                // location: location,
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    // if (!req.query.search) {
    //     res.send({
    //         error: 'You must provide a search term.'
    //     })
    // } else {
    //     res.send({
    //         product: []
    //     })
    // }

    // another way of doing it
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({
        product: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Rith'
    })
})

// last route handler for error 404 page
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Rith'
    })
})

// Start the server locally
// Port 3000
// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
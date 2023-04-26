const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')
const handlebarsHelper = require('./config/handlebars-helper')
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', handlebarsHelper: handlebarsHelper }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log('error'))
})

app.get('/search', (req, res) => {
  const sort = req.query.sort
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .sort(`${sort}`)
    .then((restaurants) => {
      const filteredRestaurants = restaurants.filter((item) => 
         item.name.toLowerCase().includes(keyword) ||
         item.category.toLowerCase().includes(keyword)
    )
      res.render('index', { restaurants: filteredRestaurants, keyword, sort})
    })
    .catch((error) => console.log('error'))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log('error'))
})

app.post('/restaurants', (req, res) => {
  const newRestaurant = req.body
  return Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch((error) => console.log('error'))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = req.body
  return Restaurant.findByIdAndUpdate(id, restaurant)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log('error'))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log('error'))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}` )
})
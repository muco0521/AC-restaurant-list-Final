const router = require('express').Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

router.get('/search', (req, res) => {
  const sort = req.query.sort
  const keyword = req.query.keyword.trim().toLowerCase()
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort(`${sort}`)
    .then((restaurants) => {
      const filteredRestaurants = restaurants.filter((item) =>
        item.name.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword)
      )
      res.render('index', { restaurants: filteredRestaurants, keyword, sort })
    })
    .catch((error) => console.log(error))
})

module.exports = router

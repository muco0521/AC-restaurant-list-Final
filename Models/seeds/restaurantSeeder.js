const Restaurant = require('../restaurant.js')
const { users, restaurants } = require('./data')
const db = require('../../config/mongoose')
const User = require('../user')
const bcrypt = require('bcryptjs')

db.once('open', async () => {
  await Promise.all(
    users.map(async (user, userIndex) => {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(user.password, salt)
      user.password = hash
      const createdUser = await User.create({ ...user })
      console.log('user created!')

      const userRestaurant = []
      restaurants.forEach((restaurant, restIndex) => {
        if (restIndex < (userIndex + 1) * 3 && restIndex >= userIndex * 3) {
          restaurant.userId = createdUser._id
          userRestaurant.push(restaurant)
        }
      })
      await Restaurant.create(userRestaurant)
      console.log('restaurant created!')
    })
  )
  console.log('done')
  process.exit()
})

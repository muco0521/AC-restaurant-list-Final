const router = require('express').Router()
const User = require('../../Models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    req.flash('success_msg', '您已經成功登出')
    res.redirect('/users/login')
  })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'users/login'
}))

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填的' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }

  if (errors.length) {
    return res.render('register', {
      errors, name, email, password, confirmPassword
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '此信箱已經被註冊過了' })
        return res.render('register', {
          errors, name, email, password, confirmPassword
        })
      }

      return User.create({
        name, email, password, confirmPassword 
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router
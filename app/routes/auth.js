const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('strava', {
  session: false
})
const requireAuthJwt = passport.authenticate('jwt', {
  session: false
})
const { disconnect } = require('../controllers/auth')
const { generateToken } = require('./../controllers/auth/helpers/generateToken')
/*
 * Connect to Strava
 */
router.get('/auth/strava/connect', requireAuth)

/*
 * Callback to connect
 */
router.get('/auth/strava/callback', requireAuth, (req, res, next) => {
  console.log(req.user)
  if (!req.user) {
    return res.status(401).send('User Not Authenticated')
  }
  const token = generateToken(req.user)
  res.json(token)
})

/*
 * Connect to Strava
 */
router.post('/auth/strava/disconnect', requireAuthJwt, disconnect)

module.exports = router

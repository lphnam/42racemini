const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuthJwt = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const { getProfile, getAllProfile } = require('../controllers/profile')

/*
 * Get all profile route
 */
router.get('/all', trimRequest.all, getAllProfile)

/*
 * Get profile route
 */
router.get('/', requireAuthJwt, trimRequest.all, getProfile)

module.exports = router

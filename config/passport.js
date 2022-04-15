const passport = require('passport')
const Accounts = require('../app/models/accounts')
const Activities = require('../app/models/activities')
const StravaToken = require('../app/models/stravaToken')
const auth = require('../app/middleware/auth')
const JwtStrategy = require('passport-jwt').Strategy
const StravaStrategy = require('@riderize/passport-strava-oauth2').Strategy
const axios = require('axios')

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */
const jwtExtractor = (req) => {
  let token = null
  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer ', '').trim()
  } else if (req.body.token) {
    token = req.body.token.trim()
  } else if (req.query.token) {
    token = req.query.token.trim()
  }
  if (token) {
    // Decrypts token
    token = auth.decrypt(token)
  }
  return token
}

/**
 * Options object for jwt middlware
 */
const jwtOptions = {
  jwtFromRequest: jwtExtractor,
  secretOrKey: process.env.JWT_SECRET
}

/**
 * Login with JWT middleware
 */
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  Accounts.findById(payload.data._id, (err, user) => {
    if (err) {
      return done(err, false)
    }
    return !user ? done(null, false) : done(null, user)
  })
})

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */
const stravaJwtLogin = new StravaStrategy(
  {
    clientID: process.env.STRAVA_CLIENT_ID,
    clientSecret: process.env.STRAVA_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/strava/callback`,
    scope: ['read,read_all,profile:read_all,activity:read,activity:read_all']
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(';;;;;stravaJwtLogin')
    console.log(accessToken, refreshToken, profile)
    const stravaAccountData = transformStravaData(profile)
    const stravaTokenData = transformStravaTokenData(
      profile,
      accessToken,
      refreshToken
    )

    await StravaToken.findOneAndUpdate(
      { strava_id: profile.id },
      stravaTokenData,
      { upsert: true }
    )
    let account = await Accounts.findOne({ strava_id: profile.id })
    if (!account) {
      account = Accounts.create(stravaAccountData)
    }

    console.log(';;;; fetch activities')
    try {
      const response = await axios({
        method: 'GET',
        url: `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}`
      })

      const activities = transformStravaActivitiesData(response.data)
      for (let idx = 0; idx < activities.length; idx++) {
        const activity = activities[idx]
        await Activities.findOneAndUpdate({ id: activity.id }, activity, {
          upsert: true
        })
      }
    } catch (error) {
      console.error(error)
    }

    done(null, account, accessToken)
  }
)

passport.use(jwtLogin)
passport.use(stravaJwtLogin)

/**
 * Util functions
 *
 */
// eslint-disable-next-line func-style
function transformStravaData(profile) {
  const stravaData = { ...profile._json }
  stravaData.strava_id = profile.id
  stravaData.fullName = profile.fullName
  stravaData.strava_created_at = profile._json.created_at
  stravaData.strava_updated_at = profile._json.updated_at

  return stravaData
}

// eslint-disable-next-line func-style
function transformStravaTokenData(profile, accessToken, refreshToken) {
  if (!profile.id) {
    return
  }

  return {
    strava_id: profile.id,
    access_token: accessToken,
    refresh_token: refreshToken
  }
}

// eslint-disable-next-line func-style
function transformStravaActivitiesData(activities) {
  if (!activities.length) {
    return
  }

  const result = activities.map((activity) => {
    return {
      id: activity.id,
      type: activity.type,
      athlete: activity.athlete,
      content: { ...activity }
    }
  })

  return result
}

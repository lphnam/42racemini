const { handleError, buildErrObject } = require('../../middleware/utils')
const axios = require('axios')
const stravaToken = require('../../models/stravaToken')

/**
 * Roles authorization function called by route
 * @param {Array} roles - roles specified on the route
 */
const disconnect = async (req, res) => {
  const user = req.user
  const token = await stravaToken.findOne({ strava_id: user.strava_id })

  if (!token) {
    res.status(200).json({ status: 'OK' })
  } else {
    await token.deleteOne()

    try {
      const response = await axios({
        method: 'POST',
        url: `https://www.strava.com/oauth/deauthorize?access_token=${token.access_token}`
      })

      res.status(response.status).json(response.data)
    } catch (error) {
      if (
        error &&
        error.response &&
        (error.response.status === 401 ||
          error.status.statusText === 'Unauthorized')
      ) {
        return handleError(
          res,
          buildErrObject(401, 'Strava Authorization Error')
        )
      }

      handleError(res, error)
    }
  }
}

module.exports = { disconnect }

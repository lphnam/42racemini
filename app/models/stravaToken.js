const mongoose = require('mongoose')

const StravaTokenSchema = new mongoose.Schema(
  {
    strava_id: { type: String, default: '', unique: true, required: true },
    access_token: { type: String, default: '' },
    refresh_token: { type: String, default: '' }
    // ip: {
    //   type: String,
    //   required: true
    // },
    // browser: {
    //   type: String,
    //   required: true
    // },
    // country: {
    //   type: String,
    //   required: true
    // }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model(
  'StravaToken',
  StravaTokenSchema,
  'strava_token'
)

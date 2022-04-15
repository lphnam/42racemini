const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const AccountsSchema = new mongoose.Schema(
  {
    strava_id: { type: String, default: '', unique: true, required: true },
    provider: { type: String, default: 'strava' },
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    username: { type: String, default: '' },
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    bio: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    sex: { type: String, default: '' },
    premium: { type: Boolean, default: false },
    summit: { type: Boolean, default: false },
    strava_created_at: { type: Date, default: null },
    strava_updated_at: { type: Date, default: null },
    resource_state: { type: Number },
    profile_medium: { type: String, default: '' },
    profile: { type: String, default: '' },
    friend: { type: Number, default: 0 },
    follower: { type: Number, default: 0 },
    blocked: { type: Boolean, default: '' },
    can_follow: { type: Boolean, default: '' },
    follower_count: { type: Number, default: 0 },
    friend_count: { type: Number, default: 0 },
    mutual_friend_count: { type: Number, default: 0 },
    athlete_type: { type: Number },
    measurement_preference: { type: String, default: 'feet' }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

AccountsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Accounts', AccountsSchema)

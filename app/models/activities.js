const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ActivitiesSchema = new mongoose.Schema(
  {
    id: { type: String, default: '', required: true, unique: true },
    type: { type: String, default: '' },
    athlete: {
      id: { type: String, required: true },
      resource_state: { type: Number }
      // accountRef: { type: mongoose.Schema.ObjectId, ref: 'Accounts' }
    },
    content: { type: Object }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
ActivitiesSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Activities', ActivitiesSchema, 'activities')

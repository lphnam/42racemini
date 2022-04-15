const { createCity } = require('./createCity')
const { deleteCity } = require('./deleteCity')
const { getActivities } = require('./getActivities')
const { getAllActivities } = require('./getAllActivites')
const { getActivity } = require('./getActivity')
const { updateCity } = require('./updateCity')

module.exports = {
  getActivities,
  getAllActivities,
  getActivity,
  createCity,
  deleteCity,
  updateCity
}

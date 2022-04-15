const Activities = require('../../models/activities')
const { getItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getActivity = async (req, res) => {
  try {
    res.status(200).json(await getItem({ id: req.params.id }, Activities))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getActivity }

const { handleError } = require('../../middleware/utils')
const { getAllItemsFromDB } = require('./helpers')

/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllProfile = async (req, res) => {
  try {
    res.status(200).json(await getAllItemsFromDB())
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getAllProfile }

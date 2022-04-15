const Accounts = require('../../../models/accounts')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Gets profile from database by id
 * @param {string} id - user id
 */
const getProfileFromDB = (id = '') => {
  return new Promise((resolve, reject) => {
    Accounts.findById(id, '-_id -updatedAt -createdAt', async (err, user) => {
      try {
        await itemNotFound(err, user, 'NOT_FOUND')
        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { getProfileFromDB }

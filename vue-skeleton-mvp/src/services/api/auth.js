import axios from 'axios'

export default {
  async userLogin(payload) {
    return axios.get('/auth/strava/connect', payload, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
  },
  refreshToken() {
    return axios.get('/token')
  }
}

// axios
import axios from 'axios'

export const baseURL = process.env.VUE_APP_API_END_POINT

const accessToken = localStorage.getItem('accessToken')
axios.defaults.headers.common['x-access-token'] = accessToken
axios.defaults.headers.common['accept-language'] = localStorage.getItem('lang') || 'fi'

export default axios.create({
  baseURL
  // You can add your headers here
})

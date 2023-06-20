import { getMessageFromError } from '@/utils/functions'
import axios from '../../axios'
import router from '../../router'
export default {
  // login action
  async login({ commit, dispatch }, data) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      localStorage.removeItem('_expiredTime')
      const res = await this.$http.post('/signin', data)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      localStorage.setItem('accessToken', res.data.token)
      commit('SET_USER_INFO', res.data.data)
      commit('SET_PERMISSIONS', res.data.data.admin.role.access_permission)
      commit('SET_BEARER', res.data.token)

      return {
        message: res.data.message
      }
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      const messages = getMessageFromError(error)
      return Promise.reject(messages)
    } finally {
      let dataVariable = false
      const clearSetTimeOut = setInterval(() => {
        if (dataVariable == false) {
          dispatch('auth/verifyToken', null, { root: true })
            .then((res) => {
            })
            .catch((err) => {
              if (err.err.response.status == 401) {
                localStorage.removeItem('accessToken')
                router.go()
                clearInterval(clearSetTimeOut)
              }
            })
        }
      }, 1000 * 60 * 5)
    }
  },

  // logout action
  // ok
  logout() {
    localStorage.removeItem('accessToken')
  },
  verifyToken: async ({ commit }) => {
    // loading - true
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await axios.get('/verify-token')
      // loading - false
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      return {
        data: res.data
      }
    } catch (err) {
      // loading - false
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      return Promise.reject({
        err
      })
    }
  }
}

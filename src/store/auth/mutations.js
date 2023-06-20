import _ from 'lodash'
import axios from '@/axios'

export default {
  SET_BEARER(state, accessToken) {
    axios.defaults.headers.common['x-access-token'] = accessToken
  },
  SET_LOCAL_BEARER(state, lang) {
    localStorage.setItem('lang',lang)    
    axios.defaults.headers.common['accept-language'] = lang
  },
  SET_STATE: (state, payload) => {
    _.set(state, payload.action, payload.data)
  },
  SET_USER_INFO(state, user) {
    state.user = user
  },
  SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions
    state.permissionIds = Object.values(permissions).reduce((per, module) => {
      const ids = Object.values(module)
        .filter(per => {
          return !!per.status
        })
        .map(per => per.permissionId)
      per.push(...ids)
      return per
    }, [])
  }
}

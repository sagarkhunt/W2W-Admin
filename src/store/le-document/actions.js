import { getMessageFromError } from '@/utils/functions'
export default {
  async getAllLEDocuments({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/seeker-document', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'leDocuments',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'total',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCount',
        data: res.data.totalCount
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  // Le Bulk Email Module
  async sendBulkEmails({ commit }, data) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post('/email/send-bulk-email', data)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      return {
        message: res.data.message
      }
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      // Manage Error
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },

  // update email template
  async updateEmailTemplate({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`email/email-template/${id}`, data)
      commit('SET_STATE', {
        action: 'emailInfo',
        data: false
      })
      return {
        data: res.data.data,
        message: res.data.message
      }
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },

  // get documents types
  async fetchDocumentTypes({ commit }) {
    try {
      const res = await this.$http.get('/seeker-document/type')

      return {
        data: res.data.data,
        message: res.data.message
      }
    } catch (error) {
      // Manage Error
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },
}

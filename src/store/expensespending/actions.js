import { getMessageFromError } from '@/utils/functions'

export default {
  async getUserExpensesPending({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/expenses-pending', {
        params: {
          ...params
        }
      })
      
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })

      commit('SET_STATE', {
        action: 'userExpensesPending',
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
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  }
}

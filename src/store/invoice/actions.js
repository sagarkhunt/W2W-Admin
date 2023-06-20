import { getMessageFromError } from '@/utils/functions'

export default {
  // All Invoice Module
  async getAllInvoiceRecord({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/invoice', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'invoicedRecords',
        data: res.data.data
      })

      commit('SET_STATE', {
        action: 'total',
        data: res.data.totalDocument
      })

      commit('SET_STATE', {
        action: 'FilteredCount',
        data: res.data.totalDocument
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
  },
  async getSingleInvoice({ commit }, invoiceId) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`invoice/view/${invoiceId}`)
      commit('SET_STATE', {
        action: 'loading',
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
  async updateVerifyStatus({ commit }, { id, status }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      let payLoad = {
        status,
        type: 'verify'
      }
      const res = await this.$http.put(`invoice/verify/${id}`, { ...payLoad })
      commit('SET_STATE', {
        action: 'loading',
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
  async updateApprovedStatus({ commit }, { id, status }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      let params = {
        status,
        type: 'approved'
      }
      const res = await this.$http.put(`invoice/approved/${id}`, { ...params })
      commit('SET_STATE', {
        action: 'loading',
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
  async addRevisonRecord({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/invoice/revision/${id}`, data)
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
  //archived invoice status
  async updateStatusArchivedStatus({ commit }, { id, status }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      let params = {
        status,
        type: 'archive'
      }
      const res = await this.$http.put(`/invoice/archived/${id}`, { ...params })
      commit('SET_STATE', {
        action: 'loading',
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

  //mark As wrong invoice status
  async updateStatusMarkAsWrong({ commit }, { id, mark_as_wrong }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      let params = {
        mark_as_wrong,
        type: 'mark_as_wrong'
      }
      const res = await this.$http.put(`/invoice/mark-wrong/${id}`, { ...params })
      commit('SET_STATE', {
        action: 'loading',
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

  // quick pay invoice record get
  async getAllQuickPayInvoiceRecord({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/invoice', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'QuickPayInvoiceList',
        data: res.data.data
      })

      commit('SET_STATE', {
        action: 'totalCountQuickPay',
        data: res.data.totalDocument
      })

      commit('SET_STATE', {
        action: 'FilteredCountQuickPay',
        data: res.data.totalDocument
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
  },

  // update invoice details
  async updateInvoices({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/invoice/${id}`, data)
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
  // add file for invoice
  async addFileInvoice({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post(`/invoice/files/${id}`, data)
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

  // add ref number for invoice
  async addRefferenceInvoice({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/invoice/add-reference/${id}`, data)
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

  // update ref number for invoice
  async updateRefferenceInvoice({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/invoice/add-reference/${id}`, data)
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

  // Employer Payment Module
  async getPaymentByEmployer({ commit }, { id, invoice_type, payload }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const ids = id == null ? '' : id
      let res = await this.$http.get(`/invoice/${ids}${!ids ? `?invoice_type=${invoice_type}` : ''}`, {
        params: payload
      })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'employerPayments',
        data: res.data.data
      })

      commit('SET_STATE', {
        action: 'total',
        data: res.data.totalDocument
      })
      commit('SET_STATE', {
        action: 'FilteredCount',
        data: res.data.totalDocument
      })
      return {
        data: res.data,
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
  async addEmployerPayment({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post(`/invoice/payment/${id}`, data)
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
  // get employer payment details
  async getPaymentDetail({ commit }, { id }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/invoice/payment/${id}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'paymentDetails',
        data: res.data.data
      })

      return {
        data: res.data
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

  // get Invoice payment details
  async getPaymentInvoiceDetail({ commit }, { id }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/invoice/view/${id}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'getInvoiceDetail',
        data: res.data.data
      })

      return {
        data: res.data,
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
  async deletePaymentRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.delete(`/invoice/payment/${id}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      return {
        data: res.data,
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

  async singleInfoInvoice({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/invoice/view/${id}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })

      commit('SET_STATE', {
        action: 'singleInformationInvoice',
        data: res.data.data
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  //mark As wrong invoice status
  async updateStatusMarkAsWrongNegativeInvoice({ commit }, { id, mark_as_wrong }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      let params = {
        mark_as_wrong,
        type: 'mark_as_wrong'
      }
      const res = await this.$http.put(`/invoice/mark-wrong/${id}`, { ...params })
      commit('SET_STATE', {
        action: 'loading',
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

  // Archived Invoice Module
  async getArchivedInvoiceRecord({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/invoice', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'archivedInvoicedRecords',
        data: res.data.data
      })

      commit('SET_STATE', {
        action: 'totalArchived',
        data: res.data.totalDocument
      })

      commit('SET_STATE', {
        action: 'FilteredCountArchived',
        data: res.data.totalDocument
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
  },
  async updateVerifyStatusArchived({ commit }, { id, status }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      let payLoad = {
        status,
        type: 'verify'
      }
      const res = await this.$http.put(`invoice/verify/${id}`, { ...payLoad })
      commit('SET_STATE', {
        action: 'loading',
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
 
  async addRevisonRecordArchived({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/invoice/revision/${id}`, data)
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

  // For Bulk Archived Invoices
  async archivedInvoicesBulk({ commit }, { invoiceId }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post('/invoice/bulk-archive', { invoiceId })
      commit('SET_STATE', {
        action: 'loading',
        data: false
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
  },
  async verifyBlukInvoice({ commit }, { invoiceId }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post('/invoice/bulk-verify', { invoiceId })
      commit('SET_STATE', {
        action: 'loading',
        data: false
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

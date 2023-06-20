import { getMessageFromError } from '@/utils/functions'

export default {
  //get all team invoice
  async getTeamInvoiceRecord({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/team-invoice', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'teamInvoicedRecords',
        data: res.data.data
      })

      commit('SET_STATE', {
        action: 'totalTeamInvoice',
        data: res.data.totalDocument
      })

      commit('SET_STATE', {
        action: 'teamInvoiceFilteredCount',
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
  //update status
  async updateTeamInvoiceStatus({ commit }, { id, status }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      let params = {
        status,
        type: 'approved'
      }
      const res = await this.$http.patch(`/team-invoice/approved/${id}`, { ...params })
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
  //update verified team invoice
  async updateVerifyTeamInvoiceStatus({ commit }, { id, status }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      let payLoad = {
        status,
        type: 'verify'
      }
      const res = await this.$http.patch(`/team-invoice/verify/${id}`, { ...payLoad })
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

  //update mark as wrong in team invoice
  async updateTeamInvoiceMarkAsWrong({ commit }, { id, mark_as_wrong }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      let params = {
        mark_as_wrong,
        type: 'mark_as_wrong'
      }
      const res = await this.$http.put(`/team-invoice/mark-wrong/${id}`, { ...params })
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

  //send revision in team invoice
  async addRevisonRecordTeamInvoice({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.patch(`/team-invoice/send-for-revision/${id}`, data)
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

  //get all Quick Pay Team Invoices
  async getQuickPayTeamInvoiceRecord({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/team-invoice', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'QuickPayTeamInvoiceList',
        data: res.data.data
      })

      commit('SET_STATE', {
        action: 'totalQuickPay',
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

  // add ref number for invoice
  async addTeamRefferenceInvoice({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/team-invoice/add-reference/${id}`, data)
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
  async updateTeamRefferenceInvoice({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/team-invoice/add-reference/${id}`, data)
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

  // update invoice details
  async updateTeamInvoices({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/team-invoice/${id}`, data)
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

  async getSeeker() {
    const res = await this.$http.get('/team-invoice/seeker-team/', {})
    return {
      data: res.data.data.map((c) => ({
        value: c.id,
        label: c.team_name
      })),
      message: res.data.message
    }
  },

  async getSingleTeamInvoice({ commit }, { id }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/team-invoice/single/${id}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'teamInvoiceInfo',
        data: res.data.data
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

  async deleteTeamInvoiceRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.delete(`team-invoice/${id}`)
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

  //edit team invoice
  async getTeamInvoiceDataById({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/team-invoice/single/${id}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'teamInvoiceEditInfo',
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
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },

  // For Bulk Archived team Invoices
  async archivedTeamInvoicesBulk({ commit }, { invoiceId }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post('/team-invoice/bulk-archive', { invoiceId })
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
  // For Bulk verify team Invoices
  async verifyBlukTeamInvoice({ commit }, { invoiceId }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post('/team-invoice/bulk-verify', { invoiceId })
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
  //archived invoice status
  async updateStatusArchivedTeamInvoice({ commit }, { id, status }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      let params = {
        status,
        type: 'archive'
      }
      const res = await this.$http.patch(`/team-invoice/archived/${id}`, { ...params })
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
      const res = await this.$http.get('/team-invoice', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'archivedTeamInvoicedRecords',
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
      const res = await this.$http.put(`team-invoice/verify/${id}`, { ...payLoad })
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

  // Employer Payment Team invoice Module
  async getPaymentByEmployerTeamInvoice({ commit }, { id, invoice_type, payload }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const ids = id == null ? '' : id
      let res = await this.$http.get(`/team-invoice/${ids}${!ids ? `?invoice_type=${invoice_type}` : ''}`, {
        params: payload
      })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'employerPaymentsTeamInvoice',
        data: res.data.data
      })

      commit('SET_STATE', {
        action: 'employerPaymentsTotal',
        data: res.data.totalDocument
      })

      commit('SET_STATE', {
        action: 'employerPaymentsFilterCount',
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
  async addEmployerPaymentTeamInvoice({ commit }, { id, data }) {
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
  async getPaymentDetailTeamInvoice({ commit }, { id }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/team-invoice/single/${id}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'paymentDetailsTeam',
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

  //add employerPayment
  async addEmployerPaymentTeam({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post(`/team-invoice/payment/${id}`, data)
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
  }
}

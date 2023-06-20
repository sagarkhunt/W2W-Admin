import { getMessageFromError } from '@/utils/functions'

export default {
  async dashboardData({ commit }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/dashboard')
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'dashboardsData',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'compayDashboard',
        data: res.data.data.employer
      })
      commit('SET_STATE', {
        action: 'employerCashPaid',
        data: res.data.data.employer_paid.employer_cash_paid
      })
      commit('SET_STATE', {
        action: 'employerCashTotalPaid',
        data: res.data.data.employer_paid.total_paid
      })
      commit('SET_STATE', {
        action: 'leWork90Days',
        data: res.data.data.le_work_more90Days
      })
      commit('SET_STATE', {
        action: 'leCommisionPaidRecords',
        data: res.data.data.le_commission_paid
      })
      commit('SET_STATE', {
        action: 'leSalaryPaidOut',
        data: res.data.data.le_paid.seeker_cash_paid
      })
      commit('SET_STATE', {
        action: 'leSalaryPaidOutTotalPaid',
        data: res.data.data.le_paid.total_paid
      })
      commit('SET_STATE', {
        action: 'mostpaidLE',
        data: res.data.data.le_paid
      })
      commit('SET_STATE', {
        action: 'employer',
        data: res.data.data.employer
      })
      commit('SET_STATE', {
        action: 'insuranceRequests',
        data: res.data.data.insurance_request
      })      
      commit('SET_STATE', {
        action: 'invoices',
        data: res.data.data.invoice
      })
      commit('SET_STATE', {
        action: 'le60PerTaxInvoice',
        data: res.data.data.le_60_per_tax_invoice
      })
      commit('SET_STATE', {
        action: 'dashboardsSummaryData',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'EmployerCashData',
        data: res.data.data.invoice.invoiceCreatedWeekly
      })
      commit('SET_STATE', {
        action: 'LEData',
        data: res.data.data.invoice.statusWiseLe
      })
      commit('SET_STATE', {
        action: 'EmployerData',
        data: res.data.data.invoice.statusWiseCompany
      })
      commit('SET_STATE', {
        action: 'LECashData',
        data: res.data.data.le_paid.seeker_cash_paid
      })
         commit('SET_STATE', {
        action: 'MostPaidLEData',
        data: res.data.data.le_paid.most_paid_le
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
  async dashboardSummary({commit}){
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/dashboard')      
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'dashboardsSummaryData',
        data: res.data.data
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
  async getAllInvociceCommision({ commit },params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/invoice-commission',{params})
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'invoiceCommission',
        data: res.data.data|| []
      })      
      commit('SET_STATE', {
        action: 'totalInvoiceCommi',
        data: res.data.totalCount
      })

      commit('SET_STATE', {
        action: 'FilteredCountInvoiceCommi',
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
  },
}

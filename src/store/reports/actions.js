export default {
  // Report All Employer Cash Paid List
  async getAllEmployerCashPaid({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/paid-employer', { params })

      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'cashInPaidRecords',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalCountCashPaid',
        data: res.data.totalCount
      })

      commit('SET_STATE', {
        action: 'FilteredCountCashPaid',
        data: res.data.totalCount
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  // Report All Employer Cash Paid List
  async getInvoiceCreationList({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/invoice-creation', { params })

      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'invoiceCreationList',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalInvoiceCreation',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredInvoiceCreation',
        data: res.data.totalCount
      })

      return {
        data: res.data.data,
        totalCount: res.data.totalCount
      }
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  // LE More then 90 Days
  async getAll90DayRecords({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/seeker-worked-90days', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'LE90DaysRecords',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalLE90',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCountLE90',
        data: res.data.totalCount
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  // LE Paid Out Module
  async getAllPaidOutRecords({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/paid-seeker', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'paidOutRecords',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalPaidOut',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCountPaidOut',
        data: res.data.totalCount
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  // Most Paid LE
  async getAllMostPaidLERecord({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/most-paid-seeker', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'MostPaidLERecords',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalPaidOut',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCountPaidOut',
        data: res.data.totalCount
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  //Insurance Request Module
  async getAllInsurenceRequest({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/insurance/request', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'insurenceRequestRecords',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalMostPaid',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCountMostPaid',
        data: res.data.totalCount
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  // getInvoicesChartCreation
  async getInvoicesChartCreation({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/paid-employer/monthwise-paid', { params: params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'invoiceChartCreationData',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalMostPaid',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCountMostPaid',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'EmplyerChartData',
        data: res.data.data
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  //Invoice Creation chart data
  async getInvoiceCreationChartCreation({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/invoice-creation-count', { params: params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'paidOutRecords',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalMostPaid',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCountMostPaid',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'InvoiceCreationChartData',
        data: res.data.data
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  //Invoice Commission Chart
  async getInvoiceCommissionChart({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/invoice-commission-count', { params: params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'totalMostPaid',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCountMostPaid',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'InvoiceCommissionChartData',
        data: res.data.data
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  //LE Register Chart
  async LERegisterChart({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/seeker-registration-count', { params: params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'LeChartData',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalRegistration',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCountRegistration',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'LERegisteredData',
        data: res.data.data
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  //LE Deduction List Chart
  async LEDeductionChart({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/seeker-deduction-paid', { params: params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'LEDeductionData',
        data: res.data.data
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  //LE Salary Chart
  async getLEChartCreation({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/paid-seeker/monthwise-paid', { params: params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'totalMostPaid',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCountMostPaid',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'LEChartPaidData',
        data: res.data.data
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  //LE Registration List
  async getLeRegistratonList({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/seeker', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'LeRegistrationList',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'LeChartData',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalRegistration',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCountRegistration',
        data: res.data.totalCount
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },
  // get chart data
  async getChartData({ commit }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/seeker-registration-count')
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'LeChartData',
        data: res.data.data
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  // Report Le Deduction Module
  async getAllLEDeductionRecord({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/seeker-deduction', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'DeductionRecords',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalCashPaid',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCountCashPaid',
        data: res.data.totalCount
      })

      return {
        data: res.data.data,
        totalCount: res.data.totalCount
      }
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  // Report Invoice Commission
  async getInvoiceComission({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/invoice-commission', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'invoiceCommissionList',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalInvoiceCommission',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredInvoiceCommission',
        data: res.data.totalCount
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  ///invoice-creation-seeker-count
  async invoiceCreationSeekerCount({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/invoice-creation-seeker-count', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'creationSeekerCount',
        data: res.data.data
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  // entrepreneur registered share link
  async getRegisteredShareLink({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker/registered-share-link/${id}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'seekerRegisterShareLink',
        data: res.data.data.jobseeker
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

  //get all wrong invoice data
  async getAllWrongInvoice({ commit }, params) {
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
        action: 'wrongInvoiceRecords',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalWrongInvoice',
        data: res.data.totalDocument
      })

      commit('SET_STATE', {
        action: 'FilteredWrongInvoice',
        data: res.data.totalDocument
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },
  // Report Invoice Commission
  async getViewComission({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/seeker-compensation', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'viewCommissionList',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalViewCommission',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredViewCommission',
        data: res.data.totalCount
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  ///invoice-creation-seeker-count
  async seekerViewCommisionCount({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/invoice-commission-count', { params: params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'totalMostPaid',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredCountMostPaid',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'ViewCommissionChartData',
        data: res.data.data
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },
  // Report Invoice Commission
  async getFeeStatistics({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/seeker-fees-statistics', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'feeStatisticsList',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalFeeStatistics',
        data: res.data.totalCount
      })
      commit('SET_STATE', {
        action: 'FilteredFeeStatistics',
        data: res.data.totalCount
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
    }
  },
  async getFeeStatisticsDownloadData({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/seeker-fees-statistics', { params })
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
    }
  },

  // top 10 le commission
  async topTenLeSeekerFeeStatiscs({ commit }, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get('/reports/top-seeker-commission', { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'FeeStatiscsChartData',
        data: res.data.data
      })
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  },

  // top 10 le commission
  async getSingleSeekerchartData({ commit }, { seekerId, params }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/reports/seeker-commission-count/${seekerId}`, { params: params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'singleSeekerFeeStatiscsChartData',
        data: res.data.data
      })
      return {
        data: res.data.data
      }
    } catch (error) {
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
    }
  }
}

import { getMessageFromError } from '@/utils/functions'

export default {
  async getAllJobSeekers({ commit }, params) {
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
        action: 'jobseekers',
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
  },

  async updateJobseekerStatus({ commit }, { id, status }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`seeker/status/${id}`, { status })
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

  async getJobseekerById({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker/${id}`)

      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'jobseekerInfo',
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

  async udateJobseeker({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/seeker/${id}`, data)
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

  async deleteJobseeker({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.delete(`/seeker/${id}`)
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

  //Add activity points
  async addActivePoint({ commit }, data) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post('/seeker/add-activity-points/', data)
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
  // update user account status Active or block
  async updateUserAccountStatus({ commit }, { id, status }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`seeker/status/${id}`, { status })
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

  // Payslip action Module start   ==> add payslip , get all payslip , get payslip by id , update and delete payslip record
  async addRecordPayslip({ commit }, data) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post('/payslip', data)
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
  // add review
  async addRecordReviewGigs({ commit }, data) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post('/seeker/add-seeker-rating', data)
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
  // get review single
  async getSingleReviewRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker/review/${id}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'languageinfo',
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
  // update review
  async updateRecordReviewGigs({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/seeker/update-seeker-rating/${id}`, data)
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
  // delete review
  async deleteReviewRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.delete(`/seeker/review/${id}`)
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

  async getAllPayslip({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/payslip/all/${id}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'jobseekers',
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

  // get all le review list
  async getAllReviewList({ commit }, { id, payload }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker/seeker-reviews/${id}`, { params: payload })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'leAllReviewList',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'FilteredCountReview',
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
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },

  // get all le review list
  async getAllLogActivityList({ commit }, { id, payload }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/user/signin-history/${id}`, { params: payload })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'leAllActivityLogList',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'FilteredCountActivityLog',
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
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },

  //get skill for option drop down
  async getInvoiceNumber({ commit }, id) {
    const res = await this.$http.get(`/payslip/payslip-invoice/${id}`, {})
    return {
      data: res.data.data.map((c) => ({
        label: c.invoice_number,
        id: c.id
      }))
    }
  },
  // get reviewer name
  async getReviewerName({ commit }, id) {
    const res = await this.$http.get(`/seeker/seeker-recipients/${id}`, {})
    return {
      data: res.data.data.map((c) => ({
        value: c.id,
        label: c.company_name
      }))
    }
  },
  // get getReviewerGigName
  async getReviewerGigName({ commit }, { seekerId, companyId }) {
    const res = await this.$http.get(`/seeker/seeker-recipients-job/${seekerId}/${companyId}`, {})
    return {
      data: res.data.data.map((c) => ({
        value: c.id,
        label: c.job_title
      }))
    }
  },

  async getAllInsuranceRequest({ commit }, { id, payload }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/insurance/request/${id}`, { params: payload })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'insuranceRequest',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'FilteredCountInsuranceRequest',
        data: res.data.totalCount
      })

      commit('SET_STATE', {
        action: 'TotalInsuranceRequest',
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
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },
  async getPayslipById({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/payslip/${id}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'payslipInfo',
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
  async udateJobseekerPayslip({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/payslip/${id}`, data)
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
  async deletePayslipRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.delete(`/payslip/${id}`)
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
  // payslip action module end

  // Jobseeker Invoice Deductions pending
  async getSeekerInvoiceDeductionsPending({ commit }, { id, payload }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker-deduction/all/${id}`, { params: payload })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'seekerInvoiceDeductionPending',
        data: res.data.data
      })

      commit('SET_STATE', {
        action: 'FilteredCountDeducationPending',
        data: res.data.totalCount
      })

      commit('SET_STATE', {
        action: 'TotalDeducationPending',
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
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },

  // Jobseeker Invoice Deductions pending
  async getAllLeRecipientList({ commit }, { id, payload }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker/seeker-company/${id}`, { params: payload })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'leRecipientData',
        data: res.data.data
      })

      commit('SET_STATE', {
        action: 'FilteredCountLeRecipient',
        data: res.data.totalCount
      })

      commit('SET_STATE', {
        action: 'TotalLeRecipient',
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
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },
  // Jobseeker Invoice Deductions Fully Paid
  async getSeekerInvoiceDeductionsFullyPaid({ commit }, { id, payload }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker-deduction/all/${id}`, { params: payload })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'seekerInvoiceDeductionFullyPaid',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'FilteredCountDeducationPaid',
        data: res.data.totalCount
      })

      commit('SET_STATE', {
        action: 'TotalDeducationPaid',
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
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },
  async createSeekerInvoiceDeducations({ commit }, data) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post('/seeker-deduction', data)
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
  async getSeekerDeductionInvoiceById({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker-deduction/${id}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'seekerInvoiceDeductionInfo',
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
  async updateSeekerInvoiceDetail({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/seeker-deduction/${id}`, data)
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
  async deleteSeekerInvoiceDeductions({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.delete(`/seeker-deduction/${id}`)
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

  //job seeker Bank Info
  async getJobSeekerBankInfo({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker/${id}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'jobSeekerBankInfo',
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

  // seeker-document action
  async getSeekersDocument({ commit }, seekerProfileId) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker-document/${seekerProfileId}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'seekerDocumentInfo',
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

  // seeker-document delete
  async deleteLightEntrepreneurRecord({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.delete(`/seeker-document/${id}`)
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

  // seeker job-proposals-id action
  async getSeekerProposalsById({ commit }, id, params) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker/job-proposals/${id}`, { params })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'seekerJobProposalsInfo',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'totalseekerJob',
        data: res.data.totalCount
      })

      commit('SET_STATE', {
        action: 'FilteredCountseekerJob',
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
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },
  // seeker job-proposals-id status
  async getSeekerProposalsFeatured({ commit }, { id, is_status }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const payload = {
        is_featured: is_status
      }
      const res = await this.$http.put(`/job-post/featured/${id}`, payload)
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

  // Entrepreneur List send email
  async sendMailForJobseeker({ commit }, data) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post('/email/send-mail', data)
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
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },

  // Update Password
  async udatePasswordJobseeker({ commit }, { id, data }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/seeker/change-password/${id}`, data)
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

  //get proposal list
  async getProposalList({ commit }, proposalId) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker/job-proposals/${proposalId}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })

      commit('SET_STATE', {
        action: 'proposalList',
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
  //get requestResume
  async getRequestResumeList({ commit }, proposalId) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker-document/resume-request/${proposalId}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })

      commit('SET_STATE', {
        action: 'requestResumeList',
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
  //update request resume status
  async updateRequestResumeStatus({ commit }, { id, status }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.put(`/seeker-document/resume-request/${id}`, { status })
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
  //features status update
  async updateRequestResumeFeaturedStatus({ commit }, { id, status }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const payload = {
        is_featured: status
      }
      const res = await this.$http.put(`/job-post/featured/${id}`, payload)
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
  //update job request status
  async updateRequestResumeJobStatus({ commit }, { id, status }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const payload = {
        job_status: status
      }
      const res = await this.$http.put(`/job-post/job-status/${id}`, payload)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      return {
        data: res.data.token,
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

  //login as seeker
  async loginAsSeekerDashboard({ commit }, id) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.post(`/seeker/signin/${id}`)
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      return {
        data: res.data.token,
        jobSeekerToken: res.data.token
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
  // Jobseeker Invoice Deductions Fully Paid
  async getSeekerFeeStatistics({ commit }, { id, payload }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker/invoice-commission/${id}`, { params: payload })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      commit('SET_STATE', {
        action: 'seekerFeeStatistics',
        data: res.data.data
      })
      commit('SET_STATE', {
        action: 'FilteredCountFeeStatistics',
        data: res.data.totalCount
      })

      commit('SET_STATE', {
        action: 'TotalFeeStatistics',
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
      const { message } = getMessageFromError(error)
      return Promise.reject({
        message
      })
    }
  },
  // download user seeker pdf
  async downloadPDFReport({ commit }, { seekerIds }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      let jobSeekerId = '/seeker/generate-seekers-pdf?seekerIds[]=' + seekerIds.join('&seekerIds[]=')
      const res = await this.$http.get(jobSeekerId, { responseType: 'blob' })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      return {
        data: res.data
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
  //single seeker pdf download
  async downloadSingleSeekerProfilePdf({ commit }, { seekerId }) {
    commit('SET_STATE', {
      action: 'loading',
      data: true
    })
    try {
      const res = await this.$http.get(`/seeker/seeker-profile-pdf/${seekerId}`, { responseType: 'blob' })
      commit('SET_STATE', {
        action: 'loading',
        data: false
      })
      return {
        data: res.data
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
  }
}

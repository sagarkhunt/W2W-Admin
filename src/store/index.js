import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import auth from '@/store/auth'
import employer from '@/store/employer'
import jobseeker from '@/store/jobseeker'
import postedJobs from '@/store/posted-gigs'
import setting from '@/store/setting'
import users from '@/store/users'
import invoice from '@/store/invoice'
import leDocument from '@/store/le-document'
import defaultDocument from '@/store/default-document'
import reports from '@/store/reports'
import permission from '@/store/permission'
import dashboard from '@/store/dashboard'
import teaminvoice from '@/store/team-invoice'
import expensespending from '@/store/expensespending'
import emailschedule from '@/store/emailschedule'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    employer,
    jobseeker,
    postedJobs,
    setting,
    users,
    invoice,
    leDocument,
    defaultDocument,
    reports,
    permission,
    dashboard,
    teaminvoice,
    expensespending,
    emailschedule
  }
})

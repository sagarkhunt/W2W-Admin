import Vue from 'vue'
import Router from 'vue-router'
import { i18n } from './utils/i18n'

import Employers from '@/views/employers/routes'
import LEDocuments from '@/views/le-documents/routes'
import DefaultDocuments from '@/views/default-documents/routes'
import JobSeekers from '@/views/job-seekers/routes'
import PostedGigs from '@/views/posted-gigs/routes'
import industry from '@/views/settings/industry/routes'
import salaryManagement from '@/views/settings/salary-management/routes'
import countryManagement from '@/views/settings/countries-management/routes'
import cityManagement from '@/views/settings/city-management/routes'
import instituteManagement from '@/views/settings/institute-management/routes'
import insuranceManagement from '@/views/settings/insurances/routes'
import emailTemplatesManagement from '@/views/settings/email-templates/routes'
import keywordsManagement from '@/views/settings/manage-keywords/routes'
import siteManagement from '@/views/settings/site-management/routes'
import skillManagement from '@/views/settings/skill/routes'
import languageManagement from '@/views/settings/language/routes'
import appManagement from '@/views/settings/app-update/routes'
import roleManagement from '@/views/users/Roles/routes'
import userManagement from '@/views/users/routes'
import invoiceManagement from '@/views/invoices/all-invoices/routes'
import invoiceVault from '@/views/invoices/invoice-vault/routes'
import employerPayment from '@/views/invoices/employer-payment/routes'
import cashPaidReportModule from '@/views/reports/employer-cash-paid/routes'
import invoiceCommisionModule from '@/views/reports/invoice-commision/routes'
import LERegistrationModule from '@/views/reports/LE-registration/routes'
import viewCompensations from '@/views/reports/view-compensations/routes'
import feeStatistics from '@/views/reports/fee-statistics/routes'
import LEInsuranceRequestModule from '@/views/reports/insurance-request/routes'
import LE90DaysReportModule from '@/views/reports/LE-90-days/routes'
import invoiceCreationModule from '@/views/reports/invoice-creation-stats/routes'
import MostPaidLEReportModule from '@/views/reports/LE-most-paid/routes'
import LEDeductionReportModule from '@/views/reports/LE-deduction/routes'
import PaidOutReportModule from '@/views/reports/LE-paid-out/routes'
import WrongInvoiceModule from '@/views/reports/wrong-invoice/routes'
import sendBulkEmailModule from '@/views/send-bulk-email/routes'
import sendLEDocumentlModule from '@/views/send-le-documents/routes'
import negativeInvoicelModule from '@/views/invoices/negative-invoice-vault/routes'
import invoiceIntegrationModule from '@/views/invoices/invoice-integration/routes'
import archivedInvoiceModule from '@/views/invoices/archived-invoices/routes'
import teamInvoice from '@/views/team-invoices/routes'
import quickPayInvoiceModule from '@/views/invoices/quick-pay-invoice/routes'
import quickPayTeamInvoiceModule from '@/views/team-invoices/quick-pay-teaminvoice/routes'
import permitModule from '@/views/settings/manage-permit/routes'
import expensesPending from '@/views/expensespending/routes'
import emailScheduler from '@/views/email-scheduler/routes'
import banefitManagement from '@/views/settings/benefit-management/routes'
import redeemManagement from '@/views/settings/manage-redeem/routes'
import logsManagement from '@/views/settings/manage-logs/routes'
import store from './store/'
import axios from './axios'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta: {
            requiresAuth: false
          }
        },
        ...Employers,
        ...JobSeekers,
        ...PostedGigs,
        ...industry,
        ...salaryManagement,
        ...countryManagement,
        ...cityManagement,
        ...instituteManagement,
        ...keywordsManagement,
        ...siteManagement,
        ...skillManagement,
        ...languageManagement,
        ...roleManagement,
        ...userManagement,
        ...invoiceManagement,
        ...appManagement,
        ...LEDocuments,
        ...DefaultDocuments,
        ...invoiceVault,
        ...employerPayment,
        ...cashPaidReportModule,
        ...LE90DaysReportModule,
        ...MostPaidLEReportModule,
        ...PaidOutReportModule,
        ...sendBulkEmailModule,
        ...sendLEDocumentlModule,
        ...negativeInvoicelModule,
        ...invoiceCreationModule,
        ...invoiceCommisionModule,
        ...viewCompensations,
        ...feeStatistics,
        ...LERegistrationModule,
        ...quickPayInvoiceModule,
        ...quickPayTeamInvoiceModule,
        ...LEInsuranceRequestModule,
        ...WrongInvoiceModule,
        ...invoiceIntegrationModule,
        ...insuranceManagement,
        ...emailTemplatesManagement,
        ...LEDeductionReportModule,
        ...teamInvoice,
        ...archivedInvoiceModule,
        ...permitModule,
        ...expensesPending,
        ...emailScheduler,
        ...banefitManagement,
        ...redeemManagement,
        ...logsManagement
      ]
    },
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        {
          path: '/login',
          name: 'page-login',
          component: () => import('@/views/pages/Login.vue')
        },
        {
          path: '/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: '/error-404'
    }
  ]
})

const isAuthenticated = async () => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    await store
      .dispatch('auth/verifyToken')
      .then((res) => {
      })
      .catch((err) => {
        if (err.err.response.status == 401) {
          localStorage.removeItem('accessToken')
          router.go()
        }
      })
  }
  if (accessToken && !store.state.auth.user) {
    try {
      const res = await axios.get('/verify-token')
      if (res.status == 401) {
        localStorage.removeItem('accessToken')
        this.$router.push({ name: 'page-login' })
      }
      store.commit('auth/SET_USER_INFO', res.data.data)
      store.commit('auth/SET_PERMISSIONS', res.data.data.admin.role.access_permission)
      return true
    } catch (err) {
      return false
    }
  } else if (accessToken && store.state.auth.user) {
    return true
  }
  return false
}

router.beforeEach(async (to, from, next) => {
  if (to.name !== 'team-invoices-create') {
    localStorage.removeItem('dailyInfo')
  }

  const paramsLocale = localStorage.getItem('lang') || 'fi'

  // load locale messages
  const loadMessagesJson = require(`../i18n/${paramsLocale}/${paramsLocale}.json`)
  i18n.setLocaleMessage(paramsLocale, loadMessagesJson)
  i18n.locale = paramsLocale

  if (Object(to.meta).hasOwnProperty('requiresAuth')) {
    const authed = await isAuthenticated()
    if (!to.meta.requiresAuth && !authed) {
      store.dispatch('auth/logout')
      return next({
        path: 'login'
      })
    } else if (to.meta.requiresAuth && authed) {
      return next()
    } else {
      if (!to.meta.requiresAuth && to.meta && to.meta.permissions && !store.getters['auth/checkPermissionByIds'](to.meta.permissions || [])) {
        const app = window.document.getElementById('app')
        if (app && app.__vue__) {
          app.__vue__.$vs.notify({
            title: 'Error',
            text: `You don't have access to visit "${to.meta.pageTitle}"`,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'primary'
          })
        }
        return next({
          path: '/'
        })
      } else if (!to.meta.requiresAuth && to.meta && to.meta.roles && !to.meta.roles.includes(store.state.auth.user.admin.roleId)) {
        const app = window.document.getElementById('app')
        if (app && app.__vue__) {
          app.__vue__.$vs.notify({
            title: 'Error',
            text: `You don't have access to visit "${to.meta.pageTitle}"`,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'primary'
          })
        }
        return next({
          path: '/'
        })
      }
      return next()
    }
  }
  return next()
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router

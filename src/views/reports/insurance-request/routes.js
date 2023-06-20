import { REPORTS_INSURANCE_REQUEST } from '@/utils/permissions'

export default [
  {
    path: '/insurance-request/list',
    name: 'insurance-request-list',
    component: () => import('@/views/reports/insurance-request/InsuranceRequestList.vue'),
    meta: {
      pageTitle: 'sideBar.Reports.InsuranceRequest',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.reports' },
        { title: 'sideBar.Reports.InsuranceRequest', active: true }
      ],
      requiresAuth: false,
      permissions: [REPORTS_INSURANCE_REQUEST]
    }
  }
]

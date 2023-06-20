import { REPORTS_JOBSEEKER_SALARY_PAID_OUT } from '@/utils/permissions'

export default [
  {
    path: '/paid-out/list',
    name: 'paid-out-list',
    component: () => import('@/views/reports/LE-paid-out/PaidOutList.vue'),
    meta: {
      pageTitle: 'sideBar.Reports.LESalarypaidOut',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.reports' },
        { title: 'sideBar.Reports.LESalarypaidOut', active: true }
      ],
      requiresAuth: false,
      permissions: [REPORTS_JOBSEEKER_SALARY_PAID_OUT]
    }
  }
]

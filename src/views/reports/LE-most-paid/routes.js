import { REPORTS_MOST_PAID_JOBSEEKER } from '@/utils/permissions'

export default [
  {
    path: '/most-paid-le/list',
    name: 'most-paid-list',
    component: () => import('@/views/reports/LE-most-paid/MostPaidLEList.vue'),
    meta: {
      pageTitle: 'sideBar.Reports.MostPaidLE',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.reports' },
        { title: 'sideBar.Reports.MostPaidLE', active: true }
      ],
      requiresAuth: false,
      permissions: [REPORTS_MOST_PAID_JOBSEEKER]
    }
  }
]

import { REPORTS_FEE_STATISTICS } from '@/utils/permissions'

export default [
  {
    path: '/fee-statistics-list/',
    name: 'fee-statistics-list',
    component: () => import('@/views/reports/fee-statistics/FeeStatistics.vue'),
    meta: {
      pageTitle: 'sideBar.Reports.FeeStatistics',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.reports' }, { title: 'sideBar.Reports.FeeStatistics', active: true }],
      requiresAuth: false,
      permissions: [REPORTS_FEE_STATISTICS]
    }
  }
]

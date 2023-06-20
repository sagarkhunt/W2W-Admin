import { REPORTS_VIEW_COMMISSION } from '@/utils/permissions'

export default [
  {
    path: '/view-compensations/list',
    name: 'view-compensations-list',
    component: () => import('@/views/reports/view-compensations/ViewCommisonList.vue'),
    meta: {
      pageTitle: 'sideBar.Reports.ViewCommossions',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.reports' }, { title: 'sideBar.Reports.ViewCommossions', active: true }],
      requiresAuth: false,
      permissions: [REPORTS_VIEW_COMMISSION]
    }
  }
]

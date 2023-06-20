import { REPORTS_JOBSEEKER_WORK_MORE_THAN_90_DAYS } from '@/utils/permissions'

export default [
  {
    path: '/le-90-days/list',
    name: '90-days-list',
    component: () => import('@/views/reports/LE-90-days/All90DaysList.vue'),
    meta: {
      pageTitle: 'sideBar.Reports.LEWorkMoreThan90Days',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.reports' },
        { title: 'sideBar.Reports.LEWorkMoreThan90Days', active: true }
      ],
      requiresAuth: false,
      permissions: [REPORTS_JOBSEEKER_WORK_MORE_THAN_90_DAYS]
    }
  }
]

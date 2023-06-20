import { REPORTS_INSURANCE_CREATION_STAT } from '@/utils/permissions'

export default [
  {
    path: '/invoice-creation-statistics/',
    name: 'bulk-email',
    component: () => import('@/views/reports/invoice-creation-stats/InvoiceCreationList.vue'),
    meta: {
      pageTitle: 'sideBar.Reports.InvoicesCreationStats',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{title:'sideBar.reports'},
        { title: 'sideBar.Reports.InvoicesCreationStats', active: true }
      ],
      requiresAuth: false,
      permissions: [REPORTS_INSURANCE_CREATION_STAT]
    }
  }
]

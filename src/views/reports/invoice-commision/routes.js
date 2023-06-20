import { REPORTS_INSURANCE_COMMISSION } from '@/utils/permissions'

export default [
  {
    path: '/invoice-commission-list/',
    name: 'invoice-commission-list',
    component: () => import('@/views/reports/invoice-commision/InvoiceCommisonList.vue'),
    meta: {
      pageTitle: 'Invoice_Commissions',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{title:'sideBar.reports'},
        { title: 'Invoice_Commissions', active: true }
      ],
      requiresAuth: false,
      permissions: [REPORTS_INSURANCE_COMMISSION]
    }
  }
]

import { REPORTS_WRONG_INVOICES } from '@/utils/permissions'

export default [
  {
    path: '/wrong-invoices/list',
    name: 'wrong-invoices-list',
    component: () => import('@/views/reports/wrong-invoice/WrongInvoiceList.vue'),
    meta: {
      pageTitle: 'sideBar.Reports.WrongInvoices',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{title:'sideBar.reports'},
        { title: 'sideBar.Reports.WrongInvoices', active: true }
      ],
      requiresAuth: false,
      permissions: [REPORTS_WRONG_INVOICES]
    }
  }
]

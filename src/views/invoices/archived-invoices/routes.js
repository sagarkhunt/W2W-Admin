import { ARCHIEVED_INVOICE_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/archived-invoice/list',
    name: 'archived-invoices-list',
    component: () => import('@/views/invoices/archived-invoices/ArchivedInvoiceList.vue'),
    meta: {
      pageTitle: 'sideBar.Invoice.ArchivedInvoices',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.invoice' },{ title: 'sideBar.Invoice.ArchivedInvoices' , active: true }],
      requiresAuth: false,
      permissions: [ARCHIEVED_INVOICE_VIEW]
    }
  },
]

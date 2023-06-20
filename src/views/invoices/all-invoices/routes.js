import { INVOICE_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/all-invoices/list',
    name: 'invoices-list',
    component: () => import('@/views/invoices/all-invoices/InvoiceList.vue'),
    meta: {
      pageTitle: 'sideBar.Invoice.AllInvoices',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.invoice' }, { title: 'sideBar.Invoice.AllInvoices', active: true }],
      requiresAuth: false,
      permissions: [INVOICE_VIEW]
    }
  },
  {
    path: '/all-invoices/:id/view',
    name: 'invoices-view',
    component: () => import('@/views/invoices/all-invoices/InvoiceView.vue'),
    meta: {
      pageTitle: 'sideBar.Invoice.AllInvoices',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },
        { title: 'sideBar.Invoice.AllInvoices', url: '/all-invoices/list' },
        { title: 'InvoiceView', active: true }
      ],
      requiresAuth: false,
      permissions: [INVOICE_VIEW]
    }
  }
]

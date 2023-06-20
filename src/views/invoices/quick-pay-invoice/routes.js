export default [
  {
    path: '/quick-pay-invoice/invoice/list',
    name: 'quick-pay-invoices',
    component: () => import('@/views/invoices/quick-pay-invoice/QuickPayInvoiceList.vue'),
    meta: {
      pageTitle: 'sideBar.Invoice.QuickPayInvoice',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{title:'sideBar.invoice'},
        { title: 'sideBar.Invoice.QuickPayInvoice', active: true }
      ],
      requiresAuth: false
    }
  }
]

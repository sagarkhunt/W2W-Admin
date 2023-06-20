import { INVOICE_INTEGRATION_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/invoice-integration-list',
    name: 'invoice-integration-list',
    component: () => import('@/views/invoices/invoice-integration/InvoiceIntegrationList.vue'),
    meta: {
      pageTitle: 'AllInvoiceIntegration',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.invoice' },
        { title: 'AllInvoiceIntegration', active: true }
      ],
      requiresAuth: false,
      permissions: [INVOICE_INTEGRATION_VIEW]
    }
  }
]

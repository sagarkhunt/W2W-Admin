import { NEGATIVE_INVOICE_VAULT_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/negative-invoice-list',
    name: 'negative-invoice-list',
    component: () => import('@/views/invoices/negative-invoice-vault/NegativeInvoiceList.vue'),
    meta: {
      pageTitle: 'sideBar.Invoice.NegativeInvoiceVault',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.invoice' },
        { title: 'sideBar.Invoice.NegativeInvoiceVault', active: true }
      ],
      requiresAuth: false,
      permissions: [NEGATIVE_INVOICE_VAULT_VIEW]
    }
  }
]

import { INVOICE_VAULT_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/vault-invoices/list',
    name: 'vault-list',
    component: () => import('@/views/invoices/invoice-vault/VaultInvoiceList.vue'),
    meta: {
      pageTitle: 'sideBar.Invoice.InvoiceVault',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.invoice' },
        { title: 'sideBar.Invoice.InvoiceVault', active: true }
      ],
      requiresAuth: false,
      permissions: [INVOICE_VAULT_VIEW]
    }
  }
]

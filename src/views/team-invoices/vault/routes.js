import { TEAM_INVOICE_VAULT_VIEW, NEGATIVE_TEAM_INVOICE_VAULT_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/team-invoices/vault-invoices/list',
    name: 'team-vault-invoice-list',
    component: () => import('@/views/team-invoices/vault/TeamVaultInvoiceList.vue'),
    meta: {
      pageTitle: 'sideBar.TeamInvoice.TeamInvoiceVault',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.teamInvoice'},
        { title: 'sideBar.TeamInvoice.TeamInvoiceVault', active: true }
      ],
      requiresAuth: false,
      permissions: [TEAM_INVOICE_VAULT_VIEW]
    }
  },
  {
    path: '/team-invoices/negative-invoice-list',
    name: 'negative-team-vault-invoice-list',
    component: () => import('@/views/team-invoices/vault/NegativeTeamVaultInvoiceList.vue'),
    meta: {
      pageTitle: 'sideBar.TeamInvoice.NegativeTeamInvoiceVault',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.teamInvoice' },
        { title: 'sideBar.TeamInvoice.NegativeTeamInvoiceVault', active: true }
      ],
      requiresAuth: false,
      permissions: [NEGATIVE_TEAM_INVOICE_VAULT_VIEW]
    }
  }
]

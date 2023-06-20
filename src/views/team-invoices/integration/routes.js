import { TEAM_INVOICE_INTEGRATION_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/team-invoices/invoice-integration-list',
    name: 'team-invoice-integrations',
    component: () => import('@/views/team-invoices/integration/TeamInvoiceIntegrations.vue'),
    meta: {
      pageTitle: 'TeamInvoicesIntegrations',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{title:'sideBar.teamInvoice'},
        { title: 'TeamInvoicesIntegrations', active: true }
      ],
      requiresAuth: false,
      permissions: [TEAM_INVOICE_INTEGRATION_VIEW]
    }
  }
]

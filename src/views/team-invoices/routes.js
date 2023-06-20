import { TEAM_INVOICE_VIEW } from '@/utils/permissions'

import teamVaultInvoiceList from '@/views/team-invoices/vault/routes.js'
import teamArchievedInvoices from '@/views/team-invoices/archieved/routes.js'
import TeamInvoiceEmployerPayment from '@/views/team-invoices/employerPayment/routes.js'
import TeamInvoiceIntegrations from '@/views/team-invoices/integration/routes.js'

export default [
  {
    path: '/team-invoices/list',
    name: 'team-invoices-list',
    component: () => import('@/views/team-invoices/TeamInvoiceList.vue'),
    meta: {
      pageTitle: 'sideBar.TeamInvoice.AllTeamInvoices',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.teamInvoice' }, { title: 'sideBar.TeamInvoice.AllTeamInvoices', active: true }],
      requiresAuth: false,
      permissions: [TEAM_INVOICE_VIEW]
    }
  },
  {
    path: '/team-invoices/:id/view',
    name: 'team-invoices-view',
    component: () => import('@/views/team-invoices/Teaminvoiceview.vue'),
    meta: {
      pageTitle: 'sideBar.TeamInvoice.AllTeamInvoices',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },
        { title: 'sideBar.TeamInvoice.AllTeamInvoices', url: '/team-invoices/list' },
        { title: 'TeamInvoiceView', active: true }
      ],
      requiresAuth: false,
      permissions: [TEAM_INVOICE_VIEW]
    }
  },

  // team vault invoice list
  ...teamVaultInvoiceList,

  // team archived invoices
  ...teamArchievedInvoices,

  // team invoice employer payment
  ...TeamInvoiceEmployerPayment,

  // team invoice integrations
  ...TeamInvoiceIntegrations
]

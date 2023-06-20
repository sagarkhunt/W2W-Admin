import { ARCHIEVED_TEAM_INVOICE_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/team-invoices/archived-invoice/list',
    name: 'team-archieved-invoices',
    component: () => import('@/views/team-invoices/archieved/TeamArchievedInvoice.vue'),
    meta: {
      pageTitle: 'sideBar.TeamInvoice.ArchivedInvoices',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.teamInvoice' },
        { title: 'sideBar.TeamInvoice.ArchivedInvoices', active: true }
      ],
      requiresAuth: false,
      permissions: [ARCHIEVED_TEAM_INVOICE_VIEW]
    }
  }
]

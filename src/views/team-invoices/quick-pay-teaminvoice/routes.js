export default [
  {
    path: '/quick-pay-team-invoice/list',
    name: 'quick-pay-invoice',
    component: () => import('@/views/team-invoices/quick-pay-teaminvoice/QuickPayTeamInvoiceList.vue'),
    meta: {
      pageTitle: 'sideBar.TeamInvoice.QuickPayTeamInvoice',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{title:'sideBar.teamInvoice'},
        { title: 'sideBar.TeamInvoice.QuickPayTeamInvoice', active: true }
      ],
      requiresAuth: false
    }
  }
]

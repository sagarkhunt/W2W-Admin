import { REPORTS_EMPLOYER_CASH_PAID_IN } from '@/utils/permissions'

export default [
  {
    path: '/cash-paid/list',
    name: 'cash-paids-list',
    component: () => import('@/views/reports/employer-cash-paid/CashPaidList.vue'),
    meta: {
      pageTitle: 'AllRecipientCashPaidIn',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.reports' }, { title: 'AllRecipientCashPaidIn', active: true }],
      requiresAuth: false,
      permissions: [REPORTS_EMPLOYER_CASH_PAID_IN]
    }
  }
]

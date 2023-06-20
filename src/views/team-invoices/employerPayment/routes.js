import { TEAM_INVOICE_EMPLOYER_PAYMENT_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/team-invoices/payments/list',
    name: 'team-invoice-employer-payment',
    component: () => import('@/views/team-invoices/employerPayment/TeamInvoiceEmployerPayment.vue'),
    meta: {
      pageTitle: 'TeamInvoicesEmployerPayments',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.teamInvoice' },
        { title: 'TeamInvoicesEmployerPayments', active: true }
      ],
      requiresAuth: false,
      permissions: [TEAM_INVOICE_EMPLOYER_PAYMENT_VIEW]
    }
  },
  {
    path: '/team-invoice/payments/:id/payment-details',
    name: 'employer-payment-details-team',
    component: () => import('@/views/team-invoices/employerPayment/EmployerPaymentDetailsTeam.vue'),
    meta: {
      pageTitle: 'payment_details',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.teamInvoice' },{ title: 'TeamInvoicesEmployerPayments' , url:'/team-invoices/payments/list' },
        { title: 'payment_details', active: true }
      ],
      requiresAuth: false,
      permissions: [TEAM_INVOICE_EMPLOYER_PAYMENT_VIEW]
    }
  }
]

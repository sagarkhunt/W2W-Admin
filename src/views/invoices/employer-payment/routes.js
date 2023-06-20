import { EMPLOYER_PAYMENT_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/payments/list',
    name: 'payments-list',
    component: () => import('@/views/invoices/employer-payment/EmployerPaymentList.vue'),
    meta: {
      pageTitle: 'sideBar.Invoice.EmployerPayment',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.invoice' },
        { title: 'sideBar.Invoice.EmployerPayment', active: true }
      ],
      requiresAuth: false,
      permissions: [EMPLOYER_PAYMENT_VIEW]
    }
  },
  {
    path: '/payments/:id/payment-details',
    name: 'payment-detail',
    component: () => import('@/views/invoices/employer-payment/EmployerPaymentDetails.vue'),
    meta: {
      pageTitle: 'payment_details',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.Invoice.EmployerPayment',url:'/payments/list' },
        { title: 'payment_details', active: true }
      ],
      requiresAuth: false,
      permissions: [EMPLOYER_PAYMENT_VIEW]
    }
  }
]

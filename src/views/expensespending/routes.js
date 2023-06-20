import { EMPLOYER_VIEW, EMPLOYER_ADD, EMPLOYER_EDIT, INVITE_EMPLOYER, INVITE_JOBSEEKER } from '@/utils/permissions'
export default [
  {
    path: '/expenses-pending/list',
    name: 'expenses-pending-list',
    component: () => import('@/views/expensespending/ExpensesPendingList.vue'),
    meta: {
      pageTitle: 'Expenses Pending',
      breadcrumb: [{ title: 'Dashboard', url: '/' }],
      requiresAuth: false,
      permissions: [EMPLOYER_VIEW]
    }
  }
]

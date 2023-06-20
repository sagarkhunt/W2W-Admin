import { REPORTS_JOBSEEEKER_DEDUCTION_LIST } from '@/utils/permissions'

export default [
  {
    path: '/le-deductions-reports/list',
    name: 'le-deducation-lists',
    component: () => import('@/views/reports/LE-deduction/DeductionList.vue'),
    meta: {
      pageTitle: 'sideBar.Reports.LEDeductionsLists',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{title:'sideBar.reports'},
        { title: 'sideBar.Reports.LEDeductionsLists', active: true }
      ],
      requiresAuth: false,
      permissions: [REPORTS_JOBSEEEKER_DEDUCTION_LIST]
    }
  },
]

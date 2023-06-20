import { REPORTS_JOBSEEKER_REGISTRATIONS } from '@/utils/permissions'

export default [
  {
    path: '/le-registration-list/',
    name: 'le-registration',
    component: () => import('@/views/reports/LE-registration/RegistrationList.vue'),
    meta: {
      pageTitle: 'sideBar.Reports.LERegistration',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{title:'sideBar.reports'},
        { title: 'sideBar.Reports.LERegistration', active: true }
      ],
      requiresAuth: false,
      permissions: [REPORTS_JOBSEEKER_REGISTRATIONS]
    }
  }
]

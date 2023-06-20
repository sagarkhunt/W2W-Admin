import { JOBSEEKER_VIEW, JOBSEEKER_EDIT, EMPLOYER_EDIT, INVITE_EMPLOYER, INVITE_JOBSEEKER } from '@/utils/permissions'

export default [
  {
    path: '/jobseekers/list',
    name: 'jobseekers-list',
    component: () => import('@/views/job-seekers/JobseekersList.vue'),
    meta: {
      pageTitle: 'sideBar.Customers.ManageLightEntrepreneur',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.customers' }, { title: 'sideBar.Customers.ManageLightEntrepreneur', active: true }],
      requiresAuth: false,
      permissions: [JOBSEEKER_VIEW]
    }
  },
  {
    path: '/jobseeker/:id/edit',
    name: 'Edit Entrepreneur',
    component: () => import('@/views/job-seekers/EditJobSeeker.vue'),
    meta: {
      pageTitle: 'EditEntrepreneur',
      breadcrumb: [{ title: 'Dashboard', url: '/' },  { title: 'sideBar.Customers.ManageLightEntrepreneur' , url: '/jobseekers/list' },{ title: 'EditEntrepreneur',active :true }],
      requiresAuth: false,
      permissions: [JOBSEEKER_EDIT]
    }
  },
  {
    path: '/jobseeker/:id/info',
    name: 'Edit Entrepreneur Info',
    component: () => import('@/views/job-seekers/SingleJobSeekerInfo.vue'),
    meta: {
      pageTitle: 'lightEntrepreneurManagement',
      breadcrumb: [{ title: 'Dashboard', url: '/' },{ title: 'sideBar.Customers.ManageLightEntrepreneur' , url: '/jobseekers/list' }, { title: 'lightEntrepreneurManagement', active: true }],
      requiresAuth: false,
      permissions: [JOBSEEKER_VIEW]
    }
  },
  {
    path: '/payslip/:id/:seekerId/edit',
    name: 'Edit Entrepreneur Payslip',
    component: () => import('@/views/job-seekers/EditPayslip.vue'),
    meta: {
      pageTitle: 'EditEntrepreneurPayslip',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'EditEntrepreneurPayslipList' }, { title: 'EditEntrepreneurPayslip', active: true, url: '/payslip' }],
      requiresAuth: false,
      permissions: [JOBSEEKER_EDIT]
    }
  },
  {
    path: '/seeker-document/resume-request/:id',
    name: 'RequestResume',
    component: () => import('@/views/job-seekers/ViewResumeRequest.vue'),
    meta: {
      pageTitle: 'lightEntrepreneurManagement',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.Customers.ManageLightEntrepreneur' }, { title: 'lightEntrepreneurManagement', active: true }],
      requiresAuth: false,
      permissions: [JOBSEEKER_VIEW]
    }
  },
  {
    path: '/seeker/job-proposals/:id',
    name: 'ViewProposal',
    component: () => import('@/views/job-seekers/ViewProposal.vue'),
    meta: {
      pageTitle: 'lightEntrepreneurManagement',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.Customers.ManageLightEntrepreneur' }, { title: 'lightEntrepreneurManagement', active: true }],
      requiresAuth: false,
      permissions: [JOBSEEKER_VIEW]
    }
  }
]

import { EMPLOYER_VIEW, EMPLOYER_ADD, EMPLOYER_EDIT, INVITE_EMPLOYER, INVITE_JOBSEEKER } from '@/utils/permissions'
export default [
  {
    path: '/employers/list',
    name: 'employers-list',
    component: () => import('@/views/employers/EmployersList.vue'),
    meta: {
      pageTitle: 'sideBar.Customers.EmployersCompanies',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.customers' }, { title: 'sideBar.Customers.EmployersCompanies', active: true }],
      requiresAuth: false,
      permissions: [EMPLOYER_VIEW]
    }
  },
  {
    path: '/employers/list/:id',
    name: 'employers-list-industryId',
    component: () => import('@/views/employers/EmployersList.vue'),
    meta: {
      pageTitle: 'Employers List',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.Customers.EmployersCompanies' }, { title: 'sideBar.Customers.EmployersCompanies', active: true }],
      requiresAuth: false,
      permissions: [EMPLOYER_VIEW]
    }
  },
  {
    path: '/create/employer',
    name: 'create-employers',
    component: () => import('@/views/employers/AddEmployer.vue'),
    meta: {
      pageTitle: 'add_employer',
      breadcrumb: [{ title: 'Dashboard', url: '/' },{ title: 'sideBar.Customers.EmployersCompanies', url: '/employers/list' },{ title: 'add_employer', active: true }],
      requiresAuth: false,
      permissions: [EMPLOYER_ADD]
    }
  },
  {
    path: '/employer/:id/edit',
    name: 'Edit Recipient',
    component: () => import('@/views/employers/EditEmployer.vue'),
    meta: {
      pageTitle: 'edit_employer',
      breadcrumb: [{ title: 'Dashboard', url: '/' },  { title: 'sideBar.Customers.EmployersCompanies', url: '/employers/list' }, { title: 'edit_employer', active: true }],
      requiresAuth: false,
      permissions: [EMPLOYER_EDIT]
    }
  },
  {
    path: '/employer/:id/info',
    name: 'employer-management',
    component: () => import('@/views/employers/SingleEmployerInfo.vue'),
    meta: {
      pageTitle: 'recipientManagement',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },
        { title: 'sideBar.Customers.EmployersCompanies', url: '/employers/list' },
        { title: 'edit_employer', active: true }
      ],
      requiresAuth: false,
      permissions: [EMPLOYER_VIEW]
    }
  }
]

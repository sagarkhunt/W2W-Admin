import { JOBSEEKER_DOCUMENT_LIST } from '@/utils/permissions'

export default [
  {
    path: '/le/documents-list',
    name: 'le-documents-list',
    component: () => import('@/views/le-documents/GetAllDocuments.vue'),
    meta: {
      pageTitle: 'sideBar.Customers.LEDocuments',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },
        {title:'sideBar.customers'},
        { title: 'sideBar.Customers.LEDocuments', active: true }
      ],
      requiresAuth: false,
      permissions: [JOBSEEKER_DOCUMENT_LIST]
    }
  }
]

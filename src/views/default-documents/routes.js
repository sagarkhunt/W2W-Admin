import { DEFAULT_DOCUMENT_LIST } from '@/utils/permissions'

export default [
  {
    path: '/default-document-list',
    name: 'default-document-list',
    component: () => import('@/views/default-documents/GetDefaultDocuments.vue'),
    meta: {
      pageTitle: 'sideBar.Customers.defaultDocuments',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.customers' }, { title: 'sideBar.Customers.defaultDocuments', active: true }],
      requiresAuth: false,
      permissions: [DEFAULT_DOCUMENT_LIST]
    }
  }
]

import { SEND_JOBSEEKER_DOCUMENTS } from '@/utils/permissions'

export default [
  {
    path: '/send/le-documents/',
    name: 'send-documemt',
    component: () => import('@/views/send-le-documents/sendLEDocuments.vue'),
    meta: {
      pageTitle: 'sideBar.Customers.SendLEDocuments',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.customers' }, { title: 'sideBar.Customers.SendLEDocuments', active: true }],
      requiresAuth: false,
      permissions: [SEND_JOBSEEKER_DOCUMENTS]
    }
  },
  {
    path: '/send/le-documents/view-seeker/:id',
    name: 'docunet-view-seeker',
    component: () => import('@/views/send-le-documents/DocumentSeekerView.vue'),
    meta: {
      pageTitle: 'SendLEDocumentsView',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },
        { title: 'sideBar.customers' },
        { title: 'sideBar.Customers.defaultDocuments', url: '/default-document-list' },
        { title: 'SendLEDocumentsView', active: true }
      ],
      requiresAuth: false,
      permissions: [SEND_JOBSEEKER_DOCUMENTS]
    }
  }
]

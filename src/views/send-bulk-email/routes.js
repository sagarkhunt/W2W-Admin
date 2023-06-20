import { SEND_BULK_EMAIL } from '@/utils/permissions'

export default [
  {
    path: '/send/bulk-email/',
    name: 'send-bulk-email',
    component: () => import('@/views/send-bulk-email/BulkEmail.vue'),
    meta: {
      pageTitle: 'sideBar.EmailSettings.SendBulkEmail',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.emailSettings' },
        { title: 'sideBar.EmailSettings.SendBulkEmail', active: true }
      ],
      requiresAuth: false,
      permissions: [SEND_BULK_EMAIL]
    }
  }
]

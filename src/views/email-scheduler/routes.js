import { EMAIL_SCHEDULER, SCHEDULED_EMALIS } from '@/utils/permissions'

export default [
  {
    path: '/email-scheduler/',
    name: 'email-scheduler',
    component: () => import('@/views/email-scheduler/EmailScheduler.vue'),
    meta: {
      pageTitle: 'sideBar.EmailSettings.emailScheduler',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.emailSettings' }, { title: 'sideBar.EmailSettings.emailScheduler', active: true }],
      requiresAuth: false,
      permissions: [EMAIL_SCHEDULER]
    }
  },
  {
    path: '/scheduled-email/list',
    name: 'scheduled-email-list',
    component: () => import('@/views/email-scheduler/ScheduledEmailList.vue'),
    meta: {
      pageTitle: 'sideBar.EmailSettings.scheduledEmail',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.emailSettings' }, { title: 'sideBar.EmailSettings.scheduledEmail', active: true }],
      requiresAuth: false,
      permissions: [SCHEDULED_EMALIS]
    }
  }
]

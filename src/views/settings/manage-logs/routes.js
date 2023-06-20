import { LOG_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/log/list',
    name: 'log-list',
    component: () => import('@/views/settings/manage-logs/LogsList.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.ManageLogs',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.settings' }, { title: 'sideBar.Settings.ManageLogs', active: true }],
      requiresAuth: false,
      permissions: [LOG_VIEW]
    }
  }
]

import { APP_INFORMATION_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/admin/app-update',
    name: 'device-list',
    component: () => import('@/views/settings/app-update/GetAllDevice.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.AppInformation',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.settings' }, { title: 'sideBar.Settings.AppInformation', active: true }],
      requiresAuth: false,
      permissions: [APP_INFORMATION_VIEW]
    }
  }
]

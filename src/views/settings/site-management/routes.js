import { SITE_SETTING_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/site-setting/view',
    name: 'site-view',
    component: () => import('@/views/settings/site-management/ViewSiteSetting.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.SiteSettings',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },{ title: 'sideBar.settings' },
        { title: 'sideBar.Settings.SiteSettings', active: true }
      ],
      requiresAuth: false,
      permissions: [SITE_SETTING_VIEW]
    }
  }
]

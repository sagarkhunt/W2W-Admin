import { INDUSTRIES_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/industries/list',
    name: 'industries-list',
    component: () => import('@/views/settings/industry/IndustriesList.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.ManagegigsIndustries',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.settings' }, { title: 'sideBar.Settings.ManagegigsIndustries', active: true }],
      requiresAuth: false,
      permissions: [INDUSTRIES_VIEW]
    }
  }
]

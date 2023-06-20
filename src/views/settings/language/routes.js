import { LANGUAGE_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/language/list',
    name: 'language-list',
    component: () => import('@/views/settings/language/LanguageList.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.ManageLanguage',
      breadcrumb: [{ title: 'Dashboard', url: '/' },{ title: 'sideBar.settings' },  { title: 'sideBar.Settings.ManageLanguage', active: true }],
      requiresAuth: false,
      permissions: [LANGUAGE_VIEW]
    }
  }
]

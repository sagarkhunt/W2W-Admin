import { PROHIBITED_KEYWORDS_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/manage-prohibited-keywords/list',
    name: 'keywords-list',
    component: () => import('@/views/settings/manage-keywords/KeywordsList.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.ManageProhibitedKeywords',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.settings' },  { title: 'sideBar.Settings.ManageProhibitedKeywords', active: true }],
      requiresAuth: false,
      permissions: [PROHIBITED_KEYWORDS_VIEW]
    }
  }
]

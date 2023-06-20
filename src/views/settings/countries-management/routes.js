import { COUNTRIES_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/manage-countries/list',
    name: 'countries-list',
    component: () => import('@/views/settings/countries-management/CountriesList.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.ManageCountries',
      breadcrumb: [{ title: 'Dashboard', url: '/' },{ title: 'sideBar.settings' }, { title: 'sideBar.Settings.ManageCountries', active: true }],
      requiresAuth: false,
      permissions: [COUNTRIES_VIEW]
    }
  }
]

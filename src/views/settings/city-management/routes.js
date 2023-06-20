import { CITIES_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/manage-cities/:id/list',
    name: 'cities-list',
    component: () => import('@/views/settings/city-management/CityManagementList.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.ManageCities',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.Settings.ManageCountries' , url:'/manage-countries/list' },  { title: 'sideBar.Settings.ManageCities' , active: true}],
      requiresAuth: false,
      permissions: [CITIES_VIEW]
    }
  }
]

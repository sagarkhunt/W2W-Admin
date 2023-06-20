import { INSURANCE_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/insurances/list',
    name: 'insurances-list',
    component: () => import('@/views/settings/insurances/InsurancesList.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.ManageInsurances',
      breadcrumb: [{ title: 'Dashboard', url: '/' },  { title: 'sideBar.settings' }, { title: 'sideBar.Settings.ManageInsurances', active: true }],
      requiresAuth: false,
      permissions: [INSURANCE_VIEW]
    }
  },
  {
    path: '/insurances/:id/view',
    name: 'insurances-view',
    component: () => import('@/views/settings/insurances/components/ViewInssuranceUser.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.ManageLEInsurance',
      breadcrumb: [{ title: 'Dashboard', url: '/' },  { title: 'sideBar.settings' }, { title: 'sideBar.Settings.ManageLEInsurance', active: true }],
      requiresAuth: false,
      permissions: [INSURANCE_VIEW]
    }
  }
]

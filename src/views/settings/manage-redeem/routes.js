import { BENEFITS_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/redeem/list',
    name: 'redeem-list',
    component: () => import('@/views/settings/manage-redeem/RedeemList.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.ManageRedeem',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.settings' }, { title: 'sideBar.Settings.ManageRedeem', active: true }],
      requiresAuth: false,
      permissions: [BENEFITS_VIEW]
    }
  },
]

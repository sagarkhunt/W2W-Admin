import { BENEFITS_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/benefit/list',
    name: 'benefit-list',
    component: () => import('@/views/settings/benefit-management/BenefitList.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.ManageBenefits',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.settings' }, { title: 'sideBar.Settings.ManageBenefits', active: true }],
      requiresAuth: false,
      permissions: [BENEFITS_VIEW]
    }
  },
  {
    path: '/benefit/:id/claim',
    name: 'Benefit Claim',
    component: () => import('@/views/settings/benefit-management/BenefitClaimView.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.UserClaimView',
      breadcrumb: [
        { title: 'Dashboard', url: '/' },
        { title: 'sideBar.Settings.ManageBenefits', url: '/benefit/list' },
        { title: 'sideBar.Settings.ManageBenefits', active: true }
      ],
      requiresAuth: false,
      permissions: [BENEFITS_VIEW]
    }
  }
]

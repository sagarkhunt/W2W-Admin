export default [
  {
    path: '/manage-permit/list',
    name: 'permit-list',
    component: () => import('@/views/settings/manage-permit/PermitList.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.Permit',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.settings' }, { title: 'sideBar.Settings.Permit', active: true }],
      requiresAuth: false
    }
  }
]

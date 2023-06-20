import { INSTITUTE_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/institute/list',
    name: 'institute-list',
    component: () => import('@/views/settings/institute-management/InstituteManagementList.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.ManageInstitute',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.settings' }, { title: 'sideBar.Settings.ManageInstitute', active: true }],
      requiresAuth: false,
      permissions: [INSTITUTE_VIEW]
    }
  }
]

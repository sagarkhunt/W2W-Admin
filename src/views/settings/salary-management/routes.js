import { SALARY_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/salary-manage/list',
    name: 'salary-list',
    component: () => import('@/views/settings/salary-management/AllManagementList.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.ManageSalary',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.settings' }, { title: 'sideBar.Settings.ManageSalary', active: true }],
      requiresAuth: false,
      permissions: [SALARY_VIEW]
    }
  }
]

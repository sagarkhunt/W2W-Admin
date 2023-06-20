import { ROLES_VIEW, ROLES_EDIT } from '@/utils/permissions'

export default [
  {
    path: '/roles/list',
    name: 'roles-list',
    component: () => import('@/views/users/Roles/RolesList.vue'),
    meta: {
      pageTitle: 'roles',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.users' }, { title: 'AllRolesList', active: true }],
      requiresAuth: false,
      permissions: [ROLES_VIEW]
    }
  },
  {
    path: '/users/roles/:id/edit',
    name: 'Edit Role',
    component: () => import('@/views/users/Roles/EditRole.vue'),
    meta: {
      pageTitle: 'EditRole',
      breadcrumb: [
        { title: 'Dashboard', url: '/' }, { title: 'sideBar.users' },
        { title: 'RoleList', url: '/roles/list' },
        { title: 'EditRole', active: true }
      ],
      requiresAuth: false,
      permissions: [ROLES_EDIT]
    }
  }
]

import { USERS_VIEW, USERS_ADD, USERS_EDIT } from '@/utils/permissions'

export default [
  {
    path: '/users/list',
    name: 'users-list',
    component: () => import('@/views/users/UsersList.vue'),
    meta: {
      pageTitle: 'sideBar.users',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.users' }, { title: 'AllUsersList', active: true }],
      requiresAuth: false,
      permissions: [USERS_VIEW]
    }
  },
  {
    path: '/users/add',
    name: 'user-add',
    component: () => import('@/views/users/AddUser.vue'),
    meta: {
      pageTitle: 'sideBar.users',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.users' }, { title: 'sideBar.Users.CreateUsers', url: '/users/list' }, { title: 'add_user', active: true }],
      requiresAuth: false,
      permissions: [USERS_ADD]
    }
  },
  {
    path: '/user/:id/edit',
    name: 'Edit User',
    component: () => import('@/views/users/EditUser.vue'),
    meta: {
      pageTitle: 'edit_user',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.users' }, { title: 'sideBar.Users.CreateUsers', url: '/users/list' }, { title: 'edit_user', active: true }],
      requiresAuth: false,
      permissions: [USERS_EDIT]
    }
  }
]

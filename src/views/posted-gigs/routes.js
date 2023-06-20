import { POSTED_JOB_VIEW, POSTED_JOB_EDIT, POSTED_JOB_ADD } from '@/utils/permissions'

export default [
  {
    path: '/posted-jobs/list',
    name: 'posted-jobs',
    component: () => import('@/views/posted-gigs/PostedGigsList.vue'),
    meta: {
      pageTitle: 'sideBar.Customers.ManagePostedGigs',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.customers' }, { title: 'sideBar.Customers.ManagePostedGigs', active: true }],
      requiresAuth: false,
      permissions: [POSTED_JOB_VIEW]
    }
  },
  {
    path: '/posted-jobs/:id/edit-gigs-post',
    name: 'edit-gig-post',
    component: () => import('@/views/posted-gigs/EditGigPost.vue'),
    meta: {
      pageTitle: 'PostedGigsManagement',
      breadcrumb: [{ title: 'Dashboard', url: '/' },  { title: 'PostedGigsManagement', url: '/posted-jobs/list' }, { title: 'EditGigPost', active: true }],
      requiresAuth: false,
      permissions: [POSTED_JOB_EDIT]
    }
  },
  {
    path: '/create/gig-post',
    name: 'create-gig-post',
    component: () => import('@/views/posted-gigs/AddGigPost.vue'),
    meta: {
      pageTitle: 'PostedGigsManagement',
      breadcrumb: [{ title: 'Dashboard', url: '/' },  { title: 'PostedGigsManagement', url: '/posted-jobs/list' }, { title: 'add_gig_post', active: true }],
      requiresAuth: false,
      permissions: [POSTED_JOB_ADD]
    }
  }
]

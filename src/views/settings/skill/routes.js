import { SKILL_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/skill/list',
    name: 'skill-list',
    component: () => import('@/views/settings/skill/SkillList.vue'),
    meta: {
      pageTitle: 'sideBar.Settings.ManageSkills',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.settings' }, { title: 'sideBar.Settings.ManageSkills', active: true }],
      requiresAuth: false,
      permissions: [SKILL_VIEW]
    }
  }
]

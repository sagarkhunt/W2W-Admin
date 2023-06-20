import { EMAIL_TEMPLATE_VIEW } from '@/utils/permissions'

export default [
  {
    path: '/email-templates/list',
    name: 'email-template-list',
    component: () => import('@/views/settings/email-templates/TemplatesList.vue'),
    meta: {
      pageTitle: 'sideBar.EmailSettings.EmailTemplates',
      breadcrumb: [{ title: 'Dashboard', url: '/' }, { title: 'sideBar.emailSettings' }, { title: 'sideBar.EmailSettings.EmailTemplates', active: true }],
      requiresAuth: false,
      permissions: [EMAIL_TEMPLATE_VIEW]
    }
  }
]

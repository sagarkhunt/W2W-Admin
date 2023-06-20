import * as permissions from '@/utils/permissions'
import * as roles from '@/utils/roles'
import { i18n } from '../../../utils/i18n'

const {
  EMPLOYER_VIEW,
  JOBSEEKER_VIEW,
  POSTED_JOB_VIEW,
  INVITE_EMPLOYER,
  INVITE_JOBSEEKER,
  JOBSEEKER_DOCUMENT_LIST,
  DEFAULT_DOCUMENT_LIST,
  SEND_BULK_EMAIL,
  SEND_JOBSEEKER_DOCUMENTS,
  INVOICE_VIEW,
  INVOICE_VAULT_VIEW,
  NEGATIVE_INVOICE_VAULT_VIEW,
  ARCHIEVED_INVOICE_VIEW,
  EMPLOYER_PAYMENT_VIEW,
  INVOICE_INTEGRATION_VIEW,
  QUICKPAY_INVOICE_VIEW,
  TEAM_INVOICE_VIEW,
  TEAM_INVOICE_VAULT_VIEW,
  NEGATIVE_TEAM_INVOICE_VAULT_VIEW,
  ARCHIEVED_TEAM_INVOICE_VIEW,
  TEAM_INVOICE_EMPLOYER_PAYMENT_VIEW,
  TEAM_INVOICE_INTEGRATION_VIEW,
  QUICKPAY_TEAMINVOICE_VIEW,
  ROLES_VIEW,
  USERS_VIEW,
  REPORTS_EMPLOYER_CASH_PAID_IN,
  REPORTS_JOBSEEKER_SALARY_PAID_OUT,
  REPORTS_JOBSEEKER_WORK_MORE_THAN_90_DAYS,
  REPORTS_MOST_PAID_JOBSEEKER,
  REPORTS_INSURANCE_REQUEST,
  REPORTS_INSURANCE_CREATION_STAT,
  REPORTS_INSURANCE_COMMISSION,
  REPORTS_VIEW_COMMISSION,
  REPORTS_FEE_STATISTICS,
  REPORTS_WRONG_INVOICES,
  REPORTS_JOBSEEKER_REGISTRATIONS,
  REPORTS_QUICKPAY_INVOICES,
  REPORTS_JOBSEEEKER_DEDUCTION_LIST,
  REPORTS_JOBSEEKER_SENT_MAIL,
  INDUSTRIES_VIEW,
  INSURANCE_VIEW,
  SALARY_VIEW,
  COUNTRIES_VIEW,
  CITIES_VIEW,
  PROHIBITED_KEYWORDS_VIEW,
  LANGUAGE_VIEW,
  BENEFITS_VIEW,
  SKILL_VIEW,
  INSTITUTE_VIEW,
  SITE_SETTING_VIEW,
  EMAIL_TEMPLATE_VIEW,
  APP_INFORMATION_VIEW,
  EMAIL_SCHEDULER,
  SCHEDULED_EMALIS,
  PERMIT_VIEW,
  REDEEM_VIEW,
  LOG_VIEW,
} = permissions

const { ADMIN } = roles

const ALLPERMISSIONS = [...Object.values(permissions)]

export default [
  {
    url: '/',
    name: i18n.t('sideBar.dashboard'),
    slug: 'dashboard',
    icon: 'HomeIcon',
    permissions: ALLPERMISSIONS,
    roles: [ADMIN]
  },
  // employer
  {
    url: null,
    header: 'Customers',
    slug: 'customers',
    icon: 'UsersIcon',
    permissions: [EMPLOYER_VIEW, JOBSEEKER_VIEW, POSTED_JOB_VIEW, INVITE_EMPLOYER, INVITE_JOBSEEKER, JOBSEEKER_DOCUMENT_LIST, DEFAULT_DOCUMENT_LIST, SEND_BULK_EMAIL, SEND_JOBSEEKER_DOCUMENTS],
    items: [
      {
        url: null,
        name: i18n.t('sideBar.customers'),
        slug: 'Customers',
        icon: 'UsersIcon',
        permissions: [EMPLOYER_VIEW, JOBSEEKER_VIEW, POSTED_JOB_VIEW, INVITE_EMPLOYER, INVITE_JOBSEEKER, JOBSEEKER_DOCUMENT_LIST, DEFAULT_DOCUMENT_LIST, SEND_BULK_EMAIL, SEND_JOBSEEKER_DOCUMENTS],
        submenu: [
          {
            url: '/employers/list',
            name: i18n.t('sideBar.Customers.EmployersCompanies'),
            slug: 'home',
            permissions: [EMPLOYER_VIEW],
            icon: 'LayersIcon'
          },
          {
            url: '/jobseekers/list',
            name: i18n.t('sideBar.Customers.ManageLightEntrepreneur'),
            slug: 'home',
            permissions: [JOBSEEKER_VIEW],
            icon: 'UsersIcon'
          },
          {
            url: '/posted-jobs/list',
            name: i18n.t('sideBar.Customers.ManagePostedGigs'),
            slug: 'home',
            permissions: [POSTED_JOB_VIEW],
            icon: 'BriefcaseIcon'
          },
          {
            url: '/le/documents-list',
            name: i18n.t('sideBar.Customers.LEDocuments'),
            permissions: [JOBSEEKER_DOCUMENT_LIST],
            slug: 'le-docuements',
            icon: 'LayoutIcon'
          },
          {
            url: '/default-document-list',
            name: i18n.t('sideBar.Customers.defaultDocuments'),
            permissions: [DEFAULT_DOCUMENT_LIST],
            slug: 'default-docuements',
            icon: 'LayoutIcon'
          },
          {
            url: '/send/le-documents/',
            name: i18n.t('sideBar.Customers.SendLEDocuments'),
            permissions: [SEND_JOBSEEKER_DOCUMENTS],
            slug: 'home',
            icon: 'AtSignIcon'
          }
        ]
      }
    ]
  },
  // invoice
  {
    url: null,
    header: 'Invoices',
    slug: 'Invoices',
    icon: 'ArchiveIcon',
    permissions: [INVOICE_VIEW, INVOICE_VAULT_VIEW, NEGATIVE_INVOICE_VAULT_VIEW, ARCHIEVED_INVOICE_VIEW, EMPLOYER_PAYMENT_VIEW, INVOICE_INTEGRATION_VIEW, QUICKPAY_INVOICE_VIEW],
    items: [
      {
        url: null,
        name: i18n.t('sideBar.invoice'),
        slug: 'Invoices',
        icon: 'ArchiveIcon',
        permissions: [INVOICE_VIEW, INVOICE_VAULT_VIEW, NEGATIVE_INVOICE_VAULT_VIEW, ARCHIEVED_INVOICE_VIEW, EMPLOYER_PAYMENT_VIEW, INVOICE_INTEGRATION_VIEW, QUICKPAY_INVOICE_VIEW],
        submenu: [
          {
            url: '/all-invoices/list',
            name: i18n.t('sideBar.Invoice.AllInvoices'),
            slug: 'home',
            permissions: [INVOICE_VIEW],
            icon: 'BookIcon'
          },
          {
            url: '/vault-invoices/list',
            name: i18n.t('sideBar.Invoice.InvoiceVault'),
            slug: 'home',
            permissions: [INVOICE_VAULT_VIEW],
            icon: 'BriefcaseIcon'
          },
          {
            url: '/negative-invoice-list',
            name: i18n.t('sideBar.Invoice.NegativeInvoiceVault'),
            permissions: [NEGATIVE_INVOICE_VAULT_VIEW],
            slug: 'home',
            icon: 'UnlockIcon'
          },
          {
            url: '/archived-invoice/list',
            name: i18n.t('sideBar.Invoice.ArchivedInvoices'),
            slug: 'archived',
            permissions: [ARCHIEVED_INVOICE_VIEW],
            icon: 'ArchiveIcon'
          },
          {
            url: '/payments/list',
            name: i18n.t('sideBar.Invoice.EmployerPayment'),
            slug: 'home',
            permissions: [EMPLOYER_PAYMENT_VIEW],
            icon: 'DollarSignIcon'
          },
          {
            url: '/invoice-integration-list',
            name: i18n.t('sideBar.Invoice.InvoiceIntegration'),
            slug: 'home',
            permissions: [INVOICE_INTEGRATION_VIEW],
            icon: 'FeatherIcon'
          },
          {
            url: '/quick-pay-invoice/invoice/list',
            name: i18n.t('sideBar.Invoice.QuickPayInvoice'),
            slug: 'home',
            permissions: [QUICKPAY_INVOICE_VIEW],
            icon: 'CreditCardIcon'
          }
        ]
      }
    ]
  },
  // team invoice
  {
    url: null,
    header: 'Team Invoices',
    slug: 'Team',
    icon: 'BookIcon',
    permissions: [
      TEAM_INVOICE_VIEW,
      TEAM_INVOICE_VAULT_VIEW,
      NEGATIVE_TEAM_INVOICE_VAULT_VIEW,
      ARCHIEVED_TEAM_INVOICE_VIEW,
      TEAM_INVOICE_EMPLOYER_PAYMENT_VIEW,
      TEAM_INVOICE_INTEGRATION_VIEW,
      QUICKPAY_TEAMINVOICE_VIEW
    ],
    items: [
      {
        url: null,
        name: i18n.t('sideBar.teamInvoice'),
        slug: 'Team',
        icon: 'BookIcon',
        permissions: [
          TEAM_INVOICE_VIEW,
          TEAM_INVOICE_VAULT_VIEW,
          NEGATIVE_TEAM_INVOICE_VAULT_VIEW,
          ARCHIEVED_TEAM_INVOICE_VIEW,
          TEAM_INVOICE_EMPLOYER_PAYMENT_VIEW,
          TEAM_INVOICE_INTEGRATION_VIEW,
          QUICKPAY_TEAMINVOICE_VIEW
        ],
        submenu: [
          {
            url: '/team-invoices/list',
            name: i18n.t('sideBar.TeamInvoice.AllTeamInvoices'),
            slug: 'home',
            permissions: [TEAM_INVOICE_VIEW],
            icon: 'BookIcon'
          },
          {
            url: '/team-invoices/vault-invoices/list',
            name: i18n.t('sideBar.TeamInvoice.TeamInvoiceVault'),
            slug: 'home',
            permissions: [TEAM_INVOICE_VAULT_VIEW],
            icon: 'BriefcaseIcon'
          },
          {
            url: '/team-invoices/negative-invoice-list',
            name: i18n.t('sideBar.TeamInvoice.NegativeTeamInvoiceVault'),
            permissions: [NEGATIVE_TEAM_INVOICE_VAULT_VIEW],
            slug: 'home',
            icon: 'UnlockIcon'
          },
          {
            url: '/team-invoices/archived-invoice/list',
            name: i18n.t('sideBar.TeamInvoice.ArchivedInvoices'),
            slug: 'archived',
            permissions: [ARCHIEVED_TEAM_INVOICE_VIEW],
            icon: 'ArchiveIcon'
          },
          {
            url: '/team-invoices/payments/list',
            name: i18n.t('sideBar.TeamInvoice.EmployerPayment'),
            slug: 'home',
            permissions: [TEAM_INVOICE_EMPLOYER_PAYMENT_VIEW],
            icon: 'DollarSignIcon'
          },
          {
            url: '/team-invoices/invoice-integration-list',
            name: i18n.t('sideBar.TeamInvoice.InvoiceTeamIntegration'),
            slug: 'home',
            permissions: [TEAM_INVOICE_INTEGRATION_VIEW],
            icon: 'FeatherIcon'
          },
          {
            url: '/quick-pay-team-invoice/list',
            name: i18n.t('sideBar.TeamInvoice.QuickPayTeamInvoice'),
            slug: 'home',
            permissions: [QUICKPAY_TEAMINVOICE_VIEW],
            icon: 'CreditCardIcon'
          }
        ]
      }
    ]
  },
  // users
  {
    url: null,
    header: 'Users',
    slug: 'users',
    icon: 'UserIcon',
    permissions: [ROLES_VIEW, USERS_VIEW],
    items: [
      {
        url: null,
        name: i18n.t('sideBar.users'),
        slug: 'users',
        icon: 'UserIcon',
        permissions: [ROLES_VIEW, USERS_VIEW],
        submenu: [
          {
            url: '/roles/list',
            name: i18n.t('sideBar.Users.CreateRoles'),
            slug: 'home',
            permissions: [ROLES_VIEW],
            icon: 'LockIcon'
          },
          {
            url: '/users/list',
            name: i18n.t('sideBar.Users.CreateUsers'),
            slug: 'home',
            permissions: [USERS_VIEW],
            icon: 'UserPlusIcon'
          }
        ]
      }
    ]
  },
  // reports
  {
    url: null,
    header: 'Reports',
    slug: 'report',
    icon: 'CpuIcon',
    permissions: [
      REPORTS_EMPLOYER_CASH_PAID_IN,
      REPORTS_JOBSEEKER_SALARY_PAID_OUT,
      REPORTS_JOBSEEKER_WORK_MORE_THAN_90_DAYS,
      REPORTS_MOST_PAID_JOBSEEKER,
      REPORTS_INSURANCE_REQUEST,
      REPORTS_INSURANCE_CREATION_STAT,
      REPORTS_INSURANCE_COMMISSION,
      REPORTS_VIEW_COMMISSION,
      REPORTS_FEE_STATISTICS,
      REPORTS_WRONG_INVOICES,
      REPORTS_JOBSEEKER_REGISTRATIONS,
      REPORTS_QUICKPAY_INVOICES,
      REPORTS_JOBSEEEKER_DEDUCTION_LIST,
      REPORTS_JOBSEEKER_SENT_MAIL
    ],
    items: [
      {
        url: null,
        name: i18n.t('sideBar.reports'),
        slug: 'report',
        icon: 'CpuIcon',
        permissions: [
          REPORTS_EMPLOYER_CASH_PAID_IN,
          REPORTS_JOBSEEKER_SALARY_PAID_OUT,
          REPORTS_JOBSEEKER_WORK_MORE_THAN_90_DAYS,
          REPORTS_MOST_PAID_JOBSEEKER,
          REPORTS_INSURANCE_REQUEST,
          REPORTS_INSURANCE_CREATION_STAT,
          REPORTS_INSURANCE_COMMISSION,
          REPORTS_VIEW_COMMISSION,
          REPORTS_FEE_STATISTICS,
          REPORTS_WRONG_INVOICES,
          REPORTS_JOBSEEKER_REGISTRATIONS,
          REPORTS_QUICKPAY_INVOICES,
          REPORTS_JOBSEEEKER_DEDUCTION_LIST,
          REPORTS_JOBSEEKER_SENT_MAIL
        ],
        submenu: [
          {
            url: '/cash-paid/list',
            name: i18n.t('sideBar.Reports.EmployerCashpaidIn'),
            slug: 'home',
            permissions: [REPORTS_EMPLOYER_CASH_PAID_IN],
            icon: 'DollarSignIcon'
          },
          {
            url: '/paid-out/list',
            name: i18n.t('sideBar.Reports.LESalarypaidOut'),
            slug: 'home',
            permissions: [REPORTS_JOBSEEKER_SALARY_PAID_OUT],
            icon: 'ArrowDownIcon'
          },
          {
            url: '/le-90-days/list',
            name: i18n.t('sideBar.Reports.LEWorkMoreThan90Days'),
            slug: 'home',
            permissions: [REPORTS_JOBSEEKER_WORK_MORE_THAN_90_DAYS],
            icon: 'LogInIcon'
          },
          {
            url: '/most-paid-le/list',
            name: i18n.t('sideBar.Reports.MostPaidLE'),
            slug: 'home',
            permissions: [REPORTS_MOST_PAID_JOBSEEKER],
            icon: 'DollarSignIcon'
          },
          {
            url: '/insurance-request/list',
            name: i18n.t('sideBar.Reports.InsuranceRequest'),
            slug: 'home',
            permissions: [REPORTS_INSURANCE_REQUEST],
            icon: 'SendIcon'
          },
          {
            url: '/invoice-creation-statistics',
            name: i18n.t('sideBar.Reports.InvoicesCreationStats'),
            slug: 'home',
            permissions: [REPORTS_INSURANCE_CREATION_STAT],
            icon: 'ActivityIcon'
          },
          {
            url: '/invoice-commission-list',
            name: i18n.t('sideBar.Reports.InvoicesCommossions'),
            slug: 'home',
            permissions: [REPORTS_INSURANCE_COMMISSION],
            icon: 'DivideIcon'
          },
          {
            url: '/view-compensations/list',
            name: i18n.t('sideBar.Reports.ViewCommossions'),
            slug: 'home',
            permissions: [REPORTS_VIEW_COMMISSION],
            icon: 'PercentIcon'
          },
          {
            url: '/fee-statistics-list',
            name: i18n.t('sideBar.Reports.FeeStatistics'),
            slug: 'home',
            permissions: [REPORTS_FEE_STATISTICS],
            icon: 'BarChart2Icon'
          },
          {
            url: '/wrong-invoices/list',
            name: i18n.t('sideBar.Reports.WrongInvoices'),
            slug: 'home',
            permissions: [REPORTS_WRONG_INVOICES],
            icon: 'EyeOffIcon'
          },
          {
            url: '/le-registration-list/',
            name: i18n.t('sideBar.Reports.LERegistration'),
            slug: 'home',
            permissions: [REPORTS_JOBSEEKER_REGISTRATIONS],
            icon: 'UserPlusIcon'
          },
          {
            url: '/le-deductions-reports/list',
            name: i18n.t('sideBar.Reports.LEDeductionsLists'),
            permissions: [REPORTS_JOBSEEEKER_DEDUCTION_LIST],
            slug: 'home',
            icon: 'FolderPlusIcon'
          }
        ]
      }
    ]
  },
  // settings
  {
    url: null,
    header: 'Settings',
    slug: 'page2',
    icon: 'SettingsIcon',
    permissions: ALLPERMISSIONS,
    items: [
      {
        url: null,
        name: i18n.t('sideBar.settings'),
        slug: 'Settings',
        icon: 'SettingsIcon',
        permissions: ALLPERMISSIONS,
        submenu: [
          {
            url: '/industries/list',
            name: i18n.t('sideBar.Settings.ManagegigsIndustries'),
            slug: 'home',
            permissions: [INDUSTRIES_VIEW],
            icon: 'BarChartIcon'
          },
          {
            url: '/insurances/list',
            name: i18n.t('sideBar.Settings.ManageInsurances'),
            slug: 'home',
            permissions: [INSURANCE_VIEW],
            icon: 'ActivityIcon'
          },
          {
            url: '/salary-manage/list',
            name: i18n.t('sideBar.Settings.ManageSalary'),
            slug: 'home',
            permissions: [SALARY_VIEW],
            icon: 'DollarSignIcon'
          },
          {
            url: '/manage-permit/list',
            name: i18n.t('sideBar.Settings.Permit'),
            slug: 'home',
            permissions: [PERMIT_VIEW],
            icon: 'SlidersIcon'
          },

          {
            url: '/manage-countries/list',
            name: i18n.t('sideBar.Settings.ManageCountries'),
            slug: 'home',
            permissions: [COUNTRIES_VIEW],
            icon: 'GlobeIcon'
          },
          {
            url: '/manage-prohibited-keywords/list',
            name: i18n.t('sideBar.Settings.ManageProhibitedKeywords'),
            slug: 'home',
            permissions: [PROHIBITED_KEYWORDS_VIEW],
            icon: 'TypeIcon'
          },
          {
            url: '/language/list',
            name: i18n.t('sideBar.Settings.ManageLanguage'),
            slug: 'home',
            permissions: [LANGUAGE_VIEW],
            icon: 'AwardIcon'
          },
          {
            url: '/benefit/list',
            name: i18n.t('sideBar.Settings.ManageBenefits'),
            slug: 'home',
            permissions: [BENEFITS_VIEW],
            icon: 'AwardIcon'
          },
          {
            url: '/redeem/list',
            name: i18n.t('sideBar.Settings.ManageRedeem'),
            slug: 'home',
            permissions: [REDEEM_VIEW],
            icon: 'AwardIcon'
          },
          {
            url: '/log/list',
            name: i18n.t('sideBar.Settings.ManageLogs'),
            slug: 'home',
            permissions: [LOG_VIEW],
            icon: 'AwardIcon'
          },
          {
            url: '/skill/list',
            name: i18n.t('sideBar.Settings.ManageSkills'),
            slug: 'home',
            permissions: [SKILL_VIEW],
            icon: 'AwardIcon'
          },
          {
            url: '/institute/list',
            name: i18n.t('sideBar.Settings.ManageInstitute'),
            slug: 'institute',
            permissions: [INSTITUTE_VIEW],
            icon: 'AwardIcon'
          },
          {
            url: '/site-setting/view',
            name: i18n.t('sideBar.Settings.SiteSettings'),
            slug: 'home',
            permissions: [SITE_SETTING_VIEW],
            icon: 'ServerIcon'
          },
          {
            url: '/admin/app-update',
            name: i18n.t('sideBar.Settings.AppInformation'),
            slug: 'home',
            permissions: [APP_INFORMATION_VIEW],
            icon: 'TvIcon'
          }
        ]
      }
    ]
  },
  {
    url: null,
    header: 'Email Settings',
    slug: 'email settings',
    icon: 'UsersIcon',
    permissions: [EMAIL_SCHEDULER, SEND_BULK_EMAIL, EMAIL_TEMPLATE_VIEW, SCHEDULED_EMALIS],
    items: [
      {
        url: null,
        name: i18n.t('sideBar.emailSettings'),
        slug: 'email settings',
        icon: 'UsersIcon',
        permissions: [EMAIL_SCHEDULER, SEND_BULK_EMAIL, EMAIL_TEMPLATE_VIEW, SCHEDULED_EMALIS],
        submenu: [
          {
            url: '/email-templates/list',
            name: i18n.t('sideBar.EmailSettings.EmailTemplates'),
            slug: 'home',
            permissions: [EMAIL_TEMPLATE_VIEW],
            icon: 'MailIcon'
          },
          {
            url: '/send/bulk-email/',
            name: i18n.t('sideBar.EmailSettings.SendBulkEmail'),
            permissions: [SEND_BULK_EMAIL],
            slug: 'home',
            icon: 'MailIcon'
          },
          {
            url: '/email-scheduler/',
            name: i18n.t('sideBar.EmailSettings.emailScheduler'),
            permissions: [EMAIL_SCHEDULER],
            slug: 'home',
            icon: 'BriefcaseIcon'
          },
          {
            url: '/scheduled-email/list/',
            name: i18n.t('sideBar.EmailSettings.scheduledEmail'),
            permissions: [SCHEDULED_EMALIS],
            slug: 'home',
            icon: 'LayoutIcon'
          }
        ]
      }
    ]
  }
]

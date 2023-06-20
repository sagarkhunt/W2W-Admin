import { SearchByTypes } from '../../utils/searchTypes'
import { QuickPayTypes } from '../../utils/QuickPayTypes'
import { VatTypes } from '../../utils/vatTypes'

export default {
  invoicedRecords: [],

  total: 0,
  FilteredCount: 0,

  loading: false,
  revision_form: {
    admin_revision_note: ''
  },
  vaultInvoice: [],
  totalDocument: 0,
  totalRecordDocument: 0,

  // quick pay
  QuickPayInvoiceList : [],
  totalCountQuickPay : 0,
  FilteredCountQuickPay : 0,

  // Contracts
  noramlContracts: [],
  contractCount: 0,
  totalRecordContract: 0,

  // E contract
  eContracts: [],
  eCount: 0,
  eFilteredCount: 0,
  contractRecordInfo: {},

  // Employer Payments
  employerPayments: [],
  employerCount: 0,
  employerFilteredCount: 0,

  //payment details
  paymentDetails: [],
  getInvoiceDetail: {},
  seekerProfileId: '',
  paymentDetails: [],
  // getInvoiceDetail: {},

  //Negative Invoice Vault
  getNegativeInvoiceList: [],
  nCount: 0,
  nFilteredCount: 0,
  employerCompanyId: '',

  // Invoice
  singleInformationInvoice: {},

  SearchByTypes,
  VatTypes,
  QuickPayTypes,

  // Archived invoice 
  archivedInvoicedRecords : [],
  totalArchived: 0,
  FilteredCountArchived : 0
}

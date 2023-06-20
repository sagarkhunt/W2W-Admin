import { SearchByTypes } from '../../utils/searchTypes'
import { TeamInvoice } from '../../utils/teamInvoice'
import { QuickPayTypes } from '../../utils/QuickPayTypes'


export default {
  SearchByTypes,
  TeamInvoice,
  QuickPayTypes,

  //team invoice 
  teamInvoicedRecords :[],
  workHourList:[],
  seekerList:[],
  totalTeamInvoice:0,
  teamInvoiceFilteredCount:0,
  employeeList:[],
  employerInfo:[],
  teamInvoiceInfo:{},
  teamInvoiceEditInfo:[],
  totalArchived:0,
  FilteredCountArchived:0,
  archivedTeamInvoicedRecords:[],
  employerPaymentsTeamInvoice:[],
  getInvoiceDetailTeam:{},

  //Quick Pay Team Invoices
  QuickPayTeamInvoiceList : [],
  totalQuickPay : 0,
  FilteredCountQuickPay : 0,
  employerPaymentsTotal : 0,
  employerPaymentsFilterCount : 0,

  //payment detauls
  paymentDetailsTeam:[],
}


import { MonthTypes } from '../../utils/monthTypes'
import { Payment_Term } from '../../utils/paymentTermTypes'
import { WorkDetails } from '../../utils/WorkDetails'

export default {
  loading: false,

  // Cash In Paid Module
  cashInPaidRecords: [],
  FilteredCountCashPaid: 0,
  totalCashPaid: 0,

  // 90 Days Module
  LE90DaysRecords: [],
  totalLE90: 0,
  FilteredCountLE90: 0,

  // Most Paid LE Module
  MostPaidLERecords: [],
  totalMostPaid: 0,
  FilteredCountMostPaid: 0,

  // Paid Out Module
  paidOutRecords: [],
  totalPaidOut: 0,
  FilteredCountPaidOut: 0,

  //Insurance Request Module
  insurenceRequestRecords: [],

  // invoice creation stats chart data
  invoiceChartCreationData: [],

  //Le Registration Module
  LeRegistrationList: [],
  totalRegistration: 0,
  FilteredCountRegistration: 0,
  LeChartData: [],

  //Quick Pay Invoice
  QuickPayInvoiceList: [],

  // Le Bulk Email
  LeBulckEmailList: [],

  // le Deduction Module
  DeductionRecords: [],
  deductionRecordsInfo: [],

  //invoice commission
  invoiceCommissionList: [],
  totalInvoiceCommission: 0,
  FilteredInvoiceCommission: 0,

  amounts: [],
  months: [],
  MonthTypes,

  total: 0,
  FilteredCount: 0,

  //invopiceCreation
  invoiceCreationList: [],
  totalInvoiceCreation: 0,
  FilteredInvoiceCreation: 0,
  //invopiceCreation
  viewCommissionList: [],
  totalViewCommission: 0,
  FilteredViewCommission: 0,

  // fee statistics
  feeStatisticsList: [],
  totalFeeStatistics: 0,
  FilteredFeeStatistics: 0,

  ///invoice-creation-seeker-count
  creationSeekerCount: {},

  employerCompanyId: '',

  // Seeker Profile
  seekerProfile: {},
  seekerProfileId: '',

  // register share link state
  seekerRegisterShareLink: '',

  //LE sent email module
  totalSentEmail: 0,
  FilteredCountSentEmail: 0,
  LeSentEmailList: [],

  //wrong invoice
  wrongInvoiceRecords: [],
  totalWrongInvoice: 0,

  EmplyerChartData: [],
  LEChartPaidData: [],
  InvoiceCreationChartData: [],
  InvoiceCommissionChartData: [],
  FeeStatiscsChartData: [],
  singleSeekerFeeStatiscsChartData: [],
  ViewCommissionChartData: [],
  LERegisteredData: [],
  LEDeductionData: [],
  Payment_Term,
  WorkDetails
}

import { GenderTypes } from '@/utils/genderTypes'
import { ContractTypes } from '@/utils/contractTypes'
import { Payment_Term } from '../../utils/paymentTermTypes'
import { VatTypes } from '../../utils/vatTypes'

export default {
  jobseekers: [],
  jobseeker: {
    full_name: '',
    email: '',
    mobile: '',
    dob: '',
    gender: '',
    address: '',
    countryId: '',
    cityId: '',
    personal_tax: '',
    ssn: '',
    yearly_income: ''
  },
  jobseekerInfo: {},
  GenderTypes,
  ContractTypes,
  Payment_Term,
  VatTypes,

  loading: false,
  total: 0,
  FilteredCount: 0,
  // jobseeker payslip
  getPayslipRecords: [],
  payslipInfo: {},

  // Seeker Profile
  seekerProfile: {},
  seekerProfileInfoId: 0,

  // Jobseeker Invoice Deduction
  seekerInvoiceDeductionPending: [],
  seekerInvoiceDeductionFullyPaid: [],
  seekerInvoiceDeductionInfo: [],

  FilteredCountDeducationPending: 0,
  TotalDeducationPending: 0,
  FilteredCountDeducationPaid: 0,
  TotalDeducationPaid: 0,

  // fee statistics
  seekerFeeStatistics: [],
  FilteredCountFeeStatistics: 0,
  TotalFeeStatistics: 0,
  // Seeker Profile
  jobSeekerBankInfo: [],
  seekerProfileId: '',

  // seeker-document
  seekerDocumentInfo: [],

  // seekers-job-proposals info
  seekerJobProposalsInfo: [],

  // register share link state
  seekerRegisterShareLink: [],

  //view proposal
  proposalList: [],
  proposalId: '',

  //request resume
  requestResumeList: [],

  //insurance Request
  insuranceRequest: [],
  FilteredCountInsuranceRequest: 0,
  TotalInsuranceRequest: 0,
  // le recipient
  leRecipientData: [],
  FilteredCountLeRecipient: 0,
  TotalLeRecipient: 0,

  // le all review
  leAllReviewList: [],
  FilteredCountReview: 0,
  // activity log
  leAllActivityLogList:[],
  FilteredCountActivityLog:0
}

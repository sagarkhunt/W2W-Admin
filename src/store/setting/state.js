import { DeviceTypes } from '../../utils/deviceTypes'
import { ActiveBlocked } from '../../utils/ActiveBlocked'
export default {
  loading: false,
  total: 0,

  // For Industry Module
  industries: [],
  industryInfo: {},
  // For Salary Module
  salarySettingsTypes: [],
  salaryTypeInfo: {},

  // For Payment Module
  paymentSettings: [],
  paymentSettingInfo: {},

  // For Ttraveling Module
  travelingSettings: [],
  travellingSettingInfo: {},

  // For Food Module
  foodSettings: [],

  // For Employer Commison
  employerCommison: [],

  // For App Setting Module
  appSettings: [],
  appSettingInfo: {},

  // For Qualifications Management
  qualifications: [],
  qualificationInfo: {},

  // For Qualifications Management
  permitList: [],
  permitInfo: {},

  // Country Management Module
  countriesData: [],
  countryInfo: {},
  countryForm: {
    country_name: '',
    country_code: '',
    country_citizen: ''
  },

  // City Management Module
  citiesData: [],
  cityinfo: {},
  //institute management modueel
  instituteData: [],
  instituteinfo: {},

  //occupation management module
  occupationData: [],
  occupationInfo: {},

  // Prohibited Keyword Module
  prohibitedKeywordData: [],
  keywordinfo: {},

  // Skill Manage Module
  skillData: [],
  skillinfo: {},

  // Language Manage Module
  languageData: [],
  languageinfo: {},
  langTotal: 0,
  langFilteredCount: 0,

  // Benefit Manage Module
  benefitData: [],
  benefitTotal: 0,
  benefitFilteredCount: 0,

  // redeem Manage Module
  redeemData: [],
  redeemTotal: 0,
  redeemFilteredCount: 0,
  // log manage module
  userLogsData: [],
  userLogsTotal: 0,
  userLogsFilteredCount: 0,

  // Benefit User claim Manage Module
  benefitUserClaimData: [],
  benefitUserClaimTotal: 0,
  benefitUserClaimFilteredCount: 0,

  // Site Setting Module
  siteSettingInfo: {},
  // End Site Setting Module

  // App Device Module
  appDeviceInformation: [],



  // Insurance Management
  insurances: [],
  insuranceInfo: {},

  //Email Template
  emailTempalteRecords: [],
  emailInfo: {},

  // device type
  DeviceTypes,

  total: 0,
  FilteredCount: 0,
  ActiveBlocked,

  // insurance user apply data
  userInsuranceData: [],
  FilteredCountUserInsurance: 0,
  TotalUserInsurance: 0
}

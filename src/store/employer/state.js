import { OrganizationTypes } from '@/utils/organizationtyeps'
import { EmployessTypes } from '@/utils/employesTypes'
import { PaymentTypes } from '@/utils/PaymentTypes'
import { invoiceReviewMethod } from '@/utils/invoiceReviewMethod'

export default {
  loading: false,
  employers: [],
  invoiceReviewMethod,
  employer: {
    email: '',
    password: null,
    full_name: '',
    company_name: '',
    owner_ship_type: null,
    countryId: null,
    cityId: null,
    zip_code: '',
    phone_number: '',
    no_of_employees: null,
    industryId: null,
    address: '',
    company_phone: '',
    company_email: '',
    reg_number: '',
    logo: '',
    ssn: '',
    mobile: '',
    tax_number: ''
  },
  employerInfo: {},
  OrganizationTypes,
  EmployessTypes,
  PaymentTypes,
  total: 0,
  FilteredCount: 0,
  // employer company id
  employerCompanyId: '',
  // Employer Teams Members
  employerTeamMembers: [],
  // employer register via share link
  employerRegisterShareLink: [],
  // entrepreneur register via share link  
  entrepreneurRegisterShareLink: [],
  // company information
  companyInfo: [],
  // All LE Documents 
  allLEDocuments: [],

  total: 0,
  FilteredCount: 0,

  allLEDocumentsSeekerView:[],
  totalView:0,
  FilteredCountView:0
}

<template>
  <div class="edit__employer">
    <vs-card v-if="employerInfo && employerInfo.company">
      <div class="vx-row pt-5 px-5" v-if="employerInfo && employerInfo.company && employerInfo.company.is_private">
        <div class="vx-col w-full md:w-1/2 px-8">
          <!-- account information -->
          <vs-divider color="dark">{{ $t('account_information_1') }}</vs-divider>
          <!-- organization type -->
          <div class="vx-row mb-2 mt-5">
            <label for="og_type">{{ $t('organization_type') }}</label>
            <select-2
              id="og_type"
              icon-pack="feather"
              class="w-full"
              :placeholder="$t('select_employer')"
              name="organization type"
              :value="form.owner_ship_type"
              @input="(item) => (form.owner_ship_type = item && item.value)"
              :options="OrganizationTypes.map(x=>({...x, label: $t(x.label)}))"
              :ssr="true"
            />
            <span class="text-primary text-sm" v-show="errors.has('organization type')">{{ errors.first('organization type') }}</span>
          </div>
          <!-- company name -->
          <div class="vx-row mb-2">
            <label for="company_name">{{ $t('name') }}</label>
            <vs-input id="company_name" class="w-full" name="business name" v-model="form.company_name" v-validate="'required|min:3|max:60'" />
            <span class="text-primary text-sm" v-show="errors.has('business name')">{{ errors.first('business name') }}</span>
          </div>
          <!-- employer email -->
          <div class="vx-row mb-2">
            <label for="email">{{ $t('email') }}</label>
            <vs-input id="email" class="w-full" name="business id" v-model="form.email" v-validate="'required|email'" />
            <span class="text-primary text-sm" v-show="errors.has('business id')">{{ errors.first('business id') }}</span>
          </div>

          <div class="vx-row mb-2">
            <label for="phone_number">{{ $t('mobile') }}</label>
            <vs-input id="phone_number" class="w-full" name="business mobile" v-bind:rules="/\d{3}([- ]*)\d{3}/" v-validate="'required|min:6|max:16'" v-model="form.phone_number" />
            <span class="text-primary text-sm" v-show="errors.has('business mobile')">{{ errors.first('business mobile') }}</span>
          </div>
          <!-- country -->
          <div class="vx-row mb-2 mt-5">
            <label for="country">{{ $t('country') }}</label>
            <select-2
              class="w-full"
              :value="form.companyCountryId"
              @input="(item) => (form.companyCountryId = item && item.value)"
              name="country"
              placeholder="Select country"
              autocomplete
              :options="countries"
              val="value"
              :ssr="true"
              v-validate="'required'"
            />
            <span class="text-primary text-sm" v-show="errors.has('country')">{{ errors.first('country') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="address">{{ $t('address') }}</label>
            <vs-input id="address" class="w-full" name="Address" v-validate="'required|min:3|max:60'" v-model="form.address" />
            <span class="text-primary text-sm" v-show="errors.has('Address')">{{ errors.first('Address') }}</span>
          </div>

          <!-- invoice receiving method -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('invoice_reveiving_method') }}</label>
            <select-2
              id="invoice_review_method"
              placeholder="Select Method"
              class="w-full"
              name="invoice review method"
              :value="form.invoice_review_method"
              @input="(item) => (form.invoice_review_method = item && item.value)"
              :options="invoiceReviewMethod.map(x=>({...x, label: $t(x.label)}))"
              :ssr="true"
            />
            <span class="text-primary text-sm" v-show="errors.has('invoice review method')">{{ errors.first('invoice review method') }}</span>
          </div>
          <!-- tax number -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('tax_number') }}</label>
            <div class="flex w-full">
              <vs-input class="w-1/6 mr-2" name="tax number" :value="getCountryCode(form.companyCountryId)" disabled />
              <vs-input id="tax_number" class="w-full" name="tax number" v-validate="'max:16'" v-model="form.tax_number" />
            </div>
            <span class="text-primary text-sm" v-show="errors.has('tax number')">{{ errors.first('tax number') }}</span>
          </div>

          <div class="vx-row mb-2">
            <label for="description">{{ $t('description') }}</label>

            <vs-textarea id="description" class="w-full" name="business description" v-validate="'max:255'" v-model="form.description" />
            <span class="text-primary text-sm" v-show="errors.has('business description')">{{ errors.first('business description') }}</span>
          </div>
        </div>
      </div>

      <div class="vx-row pt-5 px-5" v-else>
        <div class="vx-col w-full md:w-1/2 px-8">
          <!-- account information -->
          <vs-divider color="dark">{{ $t('account_information') }}</vs-divider>

          <img :src="profile_preview" alt="" height="120" width="120" />
          <div class="vx-row mb-2">
            <label for="">{{ $t('profile_picture') }}</label>
            <input type="file" ref="banner" accept="image/jpeg, image/png" @change="handleProfileUpload" icon-pack="feather" name="Banner" class="vs-inputx vs-input--input normal w-full" />
          </div>
          <!-- organization type -->
          <div class="vx-row mb-2 mt-5">
            <label for="og_type">{{ $t('organization_type') }}</label>
            <select-2
              id="og_type"
              icon-pack="feather"
              class="w-full"
              name="organization type"
              :placeholder="$t('select_employer')"
              :value="form.owner_ship_type"
              @input="(item) => (form.owner_ship_type = item && item.value)"
              :options="OrganizationTypes.map(x=>({...x, label: $t(x.label)}))"
              :ssr="true"
            />
            <span class="text-primary text-sm" v-show="errors.has('organization type')">{{ errors.first('organization type') }}</span>
          </div>

          <!-- Business name -->
          <div class="vx-row mb-2">
            <label for="company_name">{{ $t('company_name') }}</label>
            <vs-input id="company_name" class="w-full" name="business name" v-model="form.company_name" v-validate="'required|min:3|max:60'" />
            <span class="text-primary text-sm" v-show="errors.has('business name')">{{ errors.first('business name') }}</span>
          </div>
          <!-- business id -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('reg_no') }}</label>
            <vs-input icon="icon icon-edit" icon-pack="feather" class="w-full" name="business id" v-validate="'required|min:3|max:30'" v-model="form.reg_number" />
            <span class="text-primary text-sm" v-show="errors.has('business id')">{{ errors.first('business id') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="description">{{ $t('company_description') }}</label>

            <vs-input id="description" class="w-full" name="business description" v-validate="'min:3|max:255'" v-model="form.description" />
            <span class="text-primary text-sm" v-show="errors.has('business description')">{{ errors.first('business description') }}</span>
          </div>

          <!-- business email -->
          <div class="vx-row mb-2">
            <label for="email">{{ $t('employer_email') }}</label>
            <vs-input id="email" class="w-full" name="business email" v-model="form.email" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('business email')">{{ errors.first('business email') }}</span>
          </div>
          <!-- Business Mobile -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('company_mobile') }}</label>
            <vs-input
              icon="icon icon-edit"
              icon-pack="feather"
              class="w-full"
              name="business mobile"
              v-bind:rules="/\d{3}([- ]*)\d{3}/"
              v-validate="'required|min:6|max:16'"
              v-model="form.phone_number"
            />
            <span class="text-primary text-sm" v-show="errors.has('business mobile')">{{ errors.first('business mobile') }}</span>
          </div>

          <div class="vx-row grid grid-cols-2 gap-3">
            <!-- country -->
            <div class="mb-2">
              <label for="c_country">{{ $t('country') }}</label>
              <select-2
                class="w-full"
                :value="form.companyCountryId"
                @input="(item) => (form.companyCountryId = item && item.value)"
                name="country"
                placeholder="Select country"
                autocomplete
                :options="countries"
                val="value"
                :ssr="true"
                v-validate="'required'"
              />
              <span class="text-primary text-sm" v-show="errors.has('country')">{{ errors.first('country') }}</span>
            </div>

            <!-- city -->
            <div class="mb-2">
              <label for="c_country">{{ $t('city') }}</label>
              <select-2
                class="w-full"
                :value="form.companyCityId"
                @input="(item) => (form.companyCityId = item && item.value)"
                name="city"
                placeholder="Select city"
                autocomplete
                val="value"
                :options="companyCities"
                :ssr="true"
              />
              <span class="text-primary text-sm" v-show="errors.has('city')">{{ errors.first('city') }}</span>
            </div>
          </div>

          <div class="vx-row grid grid-cols-3 gap-3">
            <!-- address -->
            <div class="mb-2 col-span-2">
              <label for="">{{ $t('address') }}</label>
              <vs-input icon="icon icon-edit" icon-pack="feather" class="w-full" name="address" v-validate="'required|min:3|max:60'" v-model="form.address" />
              <span class="text-primary text-sm" v-show="errors.has('address')">{{ errors.first('address') }}</span>
            </div>

            <!-- zip code -->
            <div class="mb-2">
              <label for="">{{ $t('zip_code') }}</label>
              <vs-input class="w-full" name="zip code" v-validate="'required|min:5'" v-model="form.zip_code" />
              <span class="text-primary text-sm" v-show="errors.has('zip code')">{{ errors.first('zip code') }}</span>
            </div>
          </div>

          <!-- no of employees -->
          <div class="vx-row mb-2">
            <label for="og_type">{{ $t('no_of_employees') }}</label>
            <select-2
              icon="icon icon-edit"
              placeholder="No of employees"
              icon-pack="feather"
              class="w-full"
              name="no of employees"
              :value="form.no_of_employees"
              @input="(item) => (form.no_of_employees = item && item.value)"
              :options="EmployessTypes"
            />
            <span class="text-primary text-sm" v-show="errors.has('no of employees')">{{ errors.first('no of employees') }}</span>
          </div>
        </div>

        <div class="vx-col w-full md:w-1/2 px-8">
          <!-- company information -->
          <vs-divider color="dark">{{ $t('invoiceDetails') }}</vs-divider>

          <div class="vx-row mb-2">
            <label for="">{{ $t('contact_name') }}</label>
            <vs-input class="w-full" name="contact person name" v-validate="'min:3|max:50'" v-model="form.full_name" />
            <span class="text-primary text-sm" v-show="errors.has('contact person name')">{{ errors.first('contact person name') }}</span>
          </div>

          <!-- invoice receiving method -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('invoice_reveiving_method') }}</label>
            <select-2
              id="invoice_review_method"
              placeholder="Select invoice review method"
              class="w-full"
              name="invoice review method"
              :value="form.invoice_review_method"
              @input="(item) => (form.invoice_review_method = item && item.value)"
              :options="invoiceReviewMethod.map(x=>({...x, label: $t(x.label)}))"
              :ssr="true"
            />
            <span class="text-primary text-sm" v-show="errors.has('invoice review method')">{{ errors.first('invoice review method') }}</span>
          </div>

          <!-- ssn -->
          <div v-if="employerInfo && employerInfo.company && employerInfo.company.is_private" class="vx-row mb-2">
            <label for="ssn">{{ $t('ssn') }} </label>
            <vs-input id="ssn" class="w-full" name="SSN" v-validate="'min:3|max:30'" v-model="form.ssn" />
            <span class="text-primary text-sm" v-show="errors.has('SSN')">{{ errors.first('SSN') }}</span>
          </div>

          <!-- tax number -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('tax_number') }} </label>
            <div class="flex w-full">
              <vs-input class="w-1/6 mr-2" name="tax number" :value="getCountryCode(form.companyCountryId)" disabled />
              <vs-input id="tax_number" class="w-full" name="tax number" v-validate="'max:16'" v-model="form.tax_number" />
            </div>
            <span class="text-primary text-sm" v-show="errors.has('tax number')">{{ errors.first('tax number') }}</span>
          </div>

          <!-- e-invoice address -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('e_invoice_address') }}</label>
            <vs-input icon="icon icon-edit" icon-pack="feather" class="w-full" name="e-invoice address" v-validate="'min:3|max:60'" v-model="form.e_invoice_address" />
            <span class="text-primary text-sm" v-show="errors.has('e-invoice address')">{{ errors.first('e-invoice address') }}</span>
          </div>
        </div>
      </div>
      <!-- Save & Reset Button -->
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-2 ml-4 flex flex-wrap items-center md:justify-start justify-center">
            <vs-button class="mr-2 vs-con-loading__container" id="create-chapter" type="relief" @click="save_changes" :disabled="!validateForm">{{ $t('update_employer') }}</vs-button>
            <vs-button to="/employers/list" color="dark" type="border" class="text-black md:mt-0 mt-2">{{ $t('cancel') }}</vs-button>
          </div>
        </div>
      </div>
    </vs-card>
  </div>
</template>
<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'EditEmployer',

  components: {
    Select2
  },

  data() {
    return {
      countries: [],
      userCities: [],
      companyCities: [],
      companyCities: [],
      profile_preview: null,
      logo_preview: null,
      form: {
        email: null,
        full_name: null,
        company_name: null,
        countryId: null,
        cityId: null,
        owner_ship_type: null,
        no_of_employees: null,
        zip_code: null,
        phone_number: null,
        reg_number: null,
        description: null,
        companyCityId: null,
        companyCountryId: null,
        address: null,
        mobile: null,
        ssn: null,
        tax_number: null,
        logo: null,
        profile_image: null,
        e_invoice_address: null,
        invoice_review_method: null
      }
    }
  },

  async mounted() {
    this.getCountryList()

    this.$store
      .dispatch('employer/getEmployerById', this.$route.params.id)
      .then((res) => {
        const data = res.data.data
        this.form.full_name = data.full_name
        this.form.email = data.email
        this.form.company_name = data.company && data.company.company_name
        this.form.no_of_employees = data.company && data.company.no_of_employees
        this.form.invoice_review_method = data.company && data.company.invoice_review_method
        this.form.e_invoice_address = data.company && data.company.e_invoice_address
        this.form.owner_ship_type = data.company && data.company.owner_ship_type
        this.form.zip_code = data.zip_code
        this.form.phone_number = data.phone_number
        this.form.reg_number = data.company && data.company.reg_number
        this.form.description = data.company && data.company.description
        this.form.address = data.company && data.company.address
        this.form.mobile = data.company && data.company.mobile
        this.form.ssn = data.company && data.company.ssn
        this.form.tax_number = data.company && data.company.tax_number && data.company.tax_number.slice(3)
        this.form.companyCountryId = data.company && data.company.countryReferenceId
        this.form.companyCityId = data.company && data.company.cityReferenceId
        this.form.profile_image = data.file_path
        this.profile_preview = data.file_path
      })
      .catch((err) => {
        const { message } = err
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      })
  },

  computed: {
    ...mapState('employer', ['loading', 'employerInfo', 'OrganizationTypes', 'EmployessTypes', 'invoiceReviewMethod']),
    validateForm() {
      return !this.errors.any()
    },

    getCountryCode() {
      return (countryId) => {
        return (this.countries.find((x) => x.value === countryId) || {}).country_code
      }
    }
  },

  methods: {
    ...mapActions('employer', { getEmployerById: 'getEmployerById', updateUser: 'updateUser' }),
    ...mapMutations('employer', { setState: 'SET_STATE' }),

    async getCountryList() {
      const { data } = await this.$store.dispatch('getCommonCountries')
      this.countries = data
    },

    // get user cities
    async getUserCities() {
      const { data } = await this.$store.dispatch('getCommonCities', this.form.countryId)
      this.userCities = data
    },

    // get company cities
    async getCompanyCities() {
      const { data } = await this.$store.dispatch('getCommonCities', this.form.companyCountryId)
      this.companyCities = data
    },

    //logo image set
    logoFile(e) {
      this.form.logo = e.target.files[0]
    },

    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      const data = new FormData()
      data.append('address', this.form.address == null ? '' : this.form.address)
      data.append('companyCityId', this.form.companyCityId)
      data.append('companyCountryId', this.form.companyCountryId)
      data.append('company_name', this.form.company_name)
      data.append('description', this.form.description == null ? '' : this.form.description)
      data.append('e_invoice_address', this.form.e_invoice_address == null ? '' : this.form.e_invoice_address)
      data.append('email', this.form.email)
      data.append('full_name', this.form.full_name == null ? '' : this.form.full_name)
      data.append('invoice_review_method', this.form.invoice_review_method == null ? '' : this.form.invoice_review_method)
      data.append('profile_image', this.form.profile_image)
      data.append('no_of_employees', this.form.no_of_employees == null ? '' : this.form.no_of_employees)
      data.append('owner_ship_type', this.form.owner_ship_type == null ? '' : this.form.owner_ship_type)
      data.append('phone_number', this.form.phone_number)
      data.append('reg_number', this.form.reg_number == null ? '' : this.form.reg_number)

      data.append('ssn', this.form.ssn == null ? '' : this.form.ssn)
      const taxNumber = this.form.tax_number == null ? '' : this.form.tax_number
      data.append('tax_number', `${this.getCountryCode(this.form.companyCountryId)}-${taxNumber}`)
      data.append('zip_code', this.form.zip_code == null ? '' : this.form.zip_code)

      try {
        const { message } = await this.updateUser({
          id: this.$route.params.id,
          data: data
        })
        this.$router.push({
          name: 'employers-list'
        })
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
      } catch ({ message }) {
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },

    //profile image set
    handleProfileUpload(e) {
      this.form.profile_image = e.target.files[0]
      this.profile_preview = URL.createObjectURL(e.target.files[0])
    },

    //company logo set
    handleLogoUpload(e) {
      this.form.logo = e.target.files[0]
      this.logo_preview = URL.createObjectURL(e.target.files[0])
    }
  },

  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '.edit__employer',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('.edit__employer > .con-vs-loading')
      }
    },

    'form.countryId': {
      immediate: true,
      handler() {
        if (this.form.countryId) {
          this.getUserCities()
        }
      }
    },

    'form.companyCountryId': {
      immediate: true,
      handler() {
        if (this.form.companyCountryId) {
          this.getCompanyCities()
        }
      }
    }
  }
}
</script>

<style lang="scss">
.edit__employer {
  position: relative;

  .con-vs-loading {
    position: absolute;
  }
}
</style>

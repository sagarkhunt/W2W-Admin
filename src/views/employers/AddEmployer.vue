<template>
  <div id="page-add-emaployer">
    <vs-card>
      <div class="vx-row pt-5 px-5">
        <div class="vx-col w-full md:w-1/2 px-8">
          <!-- account information -->
          <vs-divider color="dark">{{ $t('account_information') }} </vs-divider>

          <div class="vx-row mb-2">
            <label for="">{{ $t('profile_picture') }}</label>
            <vs-upload :limit="1" :value="form.profile_image" ref="profileImage" text="Upload profile image" :show-upload-button="false" accept="image/jpeg,image/png" />
          </div>
          <!-- organization type -->
          <div class="vx-row mb-2">
            <label for="og_type">{{ $t('organization_type') }}</label>
            <select-2
              id="og_type"
              icon="icon icon-edit"
              :placeholder="$t('select_employer')"
              icon-pack="feather"
              class="w-full"
              name="organization type"
              :value="form.owner_ship_type"
              @input="(item) => (form.owner_ship_type = item && item.value)"
              :options="OrganizationTypes.map(x=>({...x, label: $t(x.label)}))"
              v-validate="'required'"
            />
            <span class="text-primary text-sm" v-show="errors.has('organization type')">{{ errors.first('organization type') }}</span>
          </div>

          <!-- Business name -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('company_name') }}</label>
            <vs-input name="business name" class="w-full" v-validate="'required|min:3|max:60'" v-model="form.company_name" />
            <span class="text-primary text-sm" v-show="errors.has('business name')">{{ errors.first('business name') }}</span>
          </div>
          <!-- business id -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('reg_no') }}</label>
            <vs-input icon="icon icon-edit" icon-pack="feather" class="w-full" name="business id" v-validate="'required|min:3|max:30'" v-model="form.reg_number" />
            <span class="text-primary text-sm" v-show="errors.has('business id')">{{ errors.first('business id') }}</span>
          </div>

          <!-- business description -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('company_description') }}</label>
            <vs-textarea id="description" class="w-full" name="business description" v-validate="'max:255'" v-model="form.description" />
            <span class="text-primary text-sm" v-show="errors.has('business description')">{{ errors.first('business description') }}</span>
          </div>
          <!-- business email -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('employer_email') }}</label>
            <vs-input class="w-full" v-validate="'required||min:3|max:60'" name="business email" v-model="form.email" />
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
                v-validate="'required'"
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
              placeholder="no of employees"
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
            <vs-input name="contact person name" class="w-full" v-validate="'required|min:3|max:60'" v-model="form.full_name" />
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

          <!-- vat number -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('tax_number') }}</label>
            <div class="flex w-full">
              <vs-input class="w-1/6 mr-2" name="Tax Number" :value="getCountryCode(form.companyCountryId)" disabled />
              <vs-input icon="icon icon-edit" icon-pack="feather" class="w-full" name="tax number" v-validate="'max:16'" v-model="form.tax_number" />
            </div>

            <span class="text-primary text-sm" v-show="errors.has('tax number')">{{ errors.first('tax number') }}</span>
          </div>

          <!-- e-invoice address -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('e_invoice_address') }}</label>
            <vs-input class="w-full" name="e-invoice address" v-validate="'min:3|max:60'" v-model="form.e_invoice_address" />
            <span class="text-primary text-sm" v-show="errors.has('e-invoice address')">{{ errors.first('e-invoice address') }}</span>
          </div>
        </div>
      </div>

      <!-- Save & Reset Button -->
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-2 ml-4 flex flex-wrap items-center justify-start">
            <vs-button class="mr-2 vs-con-loading__container" id="add-employer" @click="save_changes" type="relief" :disabled="!validateForm">{{ $t('add_employer') }}</vs-button>
            <vs-button to="/employers/list" color="dark" type="border" class="text-left text-black">{{ $t('cancel') }}</vs-button>
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
  name: 'AddEmployer',

  components: {
    Select2
  },

  data() {
    return {
      countries: [],
      userCities: [],
      companyCities: [],
      companyCities: [],
      form: {
        email: null,
        contract_name: null,
        full_name: null,
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
        tax_number: null,
        invoice_review_method: null,
        e_invoice_address: null,
        logo: null,
        profile_image: null
      }
    }
  },

  mounted() {
    this.getCountryList()
  },

  computed: {
    ...mapState('employer', ['employer', 'OrganizationTypes', 'EmployessTypes', 'invoiceReviewMethod']),
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
    ...mapMutations('employer', { setState: 'SET_STATE' }),
    ...mapActions('employer', { addEmployer: 'addEmployer' }),

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
    //profile image set
    profilepictureFile(e) {
      this.form.profile_image = e.target.files[0]
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
      data.append('no_of_employees', this.form.no_of_employees == null ? '' : this.form.no_of_employees)
      data.append('owner_ship_type', this.form.owner_ship_type == null ? '' : this.form.owner_ship_type)
      data.append('phone_number', this.form.phone_number)
      data.append('reg_number', this.form.reg_number == null ? '' : this.form.reg_number)
      const taxNumber = this.form.tax_number || ''
      data.append('tax_number', `${this.getCountryCode(this.form.companyCountryId)}-${taxNumber}`)
      data.append('zip_code', this.form.zip_code == null ? '' : this.form.zip_code)
      this.$refs['profileImage'].filesx.forEach((file) => {
        data.append('profile_image', file)
      })

      try {
        const { message } = await this.addEmployer({
          data
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
    }
  },
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#add-employer',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#add-employer > .con-vs-loading')
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
<style lang="scss" scoped>
.file-browse {
  input::-webkit-file-upload-button {
    visibility: hidden;
  }
}
</style>

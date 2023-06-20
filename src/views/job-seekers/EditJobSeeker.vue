<template>
  <!-- update job seeker form -->
  <div id="page-add-emaployer">
    <vs-card>
      <div class="vx-row pt-5 px-5">
        <div class="vx-col w-full md:w-1/2 px-8">
          <!-- full name -->
          <div class="vx-row mb-2">
            <label for="full_name">{{ $t('full_name') }}</label>
            <vs-input id="full_name" class="w-full" name="full name" v-model="form.full_name" v-validate="'required|min:3|max:50'" />
            <span class="text-primary text-sm" v-show="errors.has('full name')">{{ errors.first('full name') }}</span>
          </div>

          <!-- email address -->
          <div class="vx-row mb-2">
            <label for="email">{{ $t('email_address') }}</label>
            <vs-input id="email" class="w-full" name="email address" v-model="form.email" v-validate="'required|email'" />
            <span class="text-primary text-sm" v-show="errors.has('email address')">{{ errors.first('email address') }}</span>
          </div>

          <!-- mobile number -->
          <div class="vx-row mb-2">
            <label for="mobile_number">{{ $t('mobile_number') }}</label>
            <vs-input id="mobile_number" class="w-full" name="mobile number" v-model="form.mobile" v-bind:rules="/\d{3}([- ]*)\d{3}/" v-validate="'required|min:6|max:16'" />
            <span class="text-primary text-sm" v-show="errors.has('mobile number')">{{ errors.first('mobile number') }}</span>
          </div>

          <!-- date of birth -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('date_of_birth') }}</label>
            <date-picker v-model="form.dob" :masks="{ L: 'DD.MM.YYYY' }" mode="date" class="w-full">
              <template v-slot="{ inputValue, inputEvents }">
                <vs-input class="w-full" v-validate="'required'" name="date of birth" :value="inputValue" v-on="inputEvents" readonly />
              </template>
            </date-picker>
            <span class="text-primary text-sm" v-show="errors.has('date of birth')">{{ errors.first('date of birth') }}</span>
          </div>

          <!-- gender -->
          <div class="vx-row mb-2 mt-5">
            <label for="gender">{{ $t('gender') }}</label>
            <select-2
              id="gender"
              placeholder="gender"
              icon-pack="feather"
              class="w-full"
              name="gender"
              v-validate="'required'"
              :value="form.gender"
              @input="(item) => (form.gender = item && item.value)"
              :options="GenderTypes.map(x=>({...x, label: $t(x.label)}))"
              :ssr="true"
            />
            <span class="text-primary text-sm" v-show="errors.has('gender')">{{ errors.first('gender') }}</span>
          </div>

          <!-- address -->
          <div class="vx-row mb-2">
            <label for="address">{{ $t('present_address') }}</label>
            <vs-input id="address" class="w-full" name="present address" v-model="form.address" v-validate="'required|min:3|max:60'" />
            <span class="text-primary text-sm" v-show="errors.has('present address')">{{ errors.first('present address') }}</span>
          </div>

          <!-- permanent address -->
          <div class="vx-row mb-2">
            <label for="permanent_address">{{ $t('permanent_address') }}</label>
            <vs-input id="permanent_address" class="w-full" name="permanent address" v-model="form.permanent_address" v-validate="'required|min:3|max:60'" />
            <span class="text-primary text-sm" v-show="errors.has('permanent address')">{{ errors.first('permanent address') }}</span>
          </div>
          <!-- ssn -->
          <div class="vx-row mb-2">
            <label for="ssn">{{ $t('ssn') }}</label>
            <vs-input id="ssn" class="w-full" name="SSN" v-model="form.ssn" v-validate="'required|min:3|max:11|'" />
            <span class="text-primary text-sm" v-show="errors.has('SSN')">{{ errors.first('SSN') }}</span>
          </div>

          <!-- yearly income -->
          <div class="vx-row mb-2">
            <label for="yearly_income">{{ $t('yearly_income') }}</label>
            <vs-input id="yearly_income" class="w-full" name="yearly income" v-model="form.yearly_income" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('yearly income')">{{ errors.first('yearly income') }}</span>
          </div>
        </div>

        <div class="vx-col w-full md:w-1/2 px-8">
          <!-- country -->
          <div class="vx-row mb-2 mt-5">
            <select-2
              class="w-full"
              :value="form.countryId"
              @input="(item) => (form.countryId = item && item.referenceId)"
              name="country"
              val="value"
              placeholder="Select country"
              autocomplete
              action="getCommonCountries"
              v-validate="'required'"
              v-on:input="changeCountry($event)"
              :ssr="true"
            />
            <span class="text-primary text-sm" v-show="errors.has('country')">{{ errors.first('country') }}</span>
          </div>

          <!-- city -->
          <div class="vx-row mb-2 mt-5">
            <select-2
              class="w-full"
              :value="form.cityId"
              @input="(item) => (form.cityId = item && item.referenceId)"
              name="city"
              placeholder="Select city"
              autocomplete
              val="value"
              :options="cityOptions"
              v-validate="'required'"
              :ssr="true"
            />
            <span class="text-primary text-sm" v-show="errors.has('city')">{{ errors.first('city') }}</span>
          </div>

          <!-- zip code -->
          <div class="vx-row mb-2">
            <label for="zip_code">{{ $t('zip_code') }}</label>
            <vs-input class="w-full" name="zip code" v-model="form.zip_code" v-validate="'required|min:3|max:6'" />
            <span class="text-primary text-sm" v-show="errors.has('zip code')">{{ errors.first('zip code') }}</span>
          </div>

          <!-- personal tax -->
          <div class="vx-row mb-2">
            <label for="min_personal_tax">{{ $t('min_personal_tax') }}</label>
            <vs-input class="w-full" name="personal tax" v-model="form.min_personal_tax" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('personal tax')">{{ errors.first('personal tax') }}</span>
          </div>

          <!-- max tax percentage -->
          <div class="vx-row mb-2">
            <label for="max_personal_tax">{{ $t('max_personal_tax') }}</label>
            <vs-input id="max_personal_tax" class="w-full" name="max tax percentage" v-model="form.max_personal_tax" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('max tax percentage')">{{ errors.first('max tax percentage') }}</span>
          </div>

          <!-- quick pay max -->
          <div class="vx-row mb-2">
            <label for="quick_pay_max">{{ $t('quick_pay_max') }}</label>
            <vs-input class="w-full" name="quick pay max" v-model="form.quick_pay_max" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('quick pay max')">{{ errors.first('quick pay max') }}</span>
          </div>

          <!-- quick pay max -->
          <div class="vx-row mb-2">
            <label for="Quick_Pay_Max">{{ $t('quick_pay_min') }}</label>
            <vs-input id="Quick_Pay_Max" class="w-full" name="quick pay min" v-model="form.quick_pay_min" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('quick pay min')">{{ errors.first('quick pay min') }}</span>
          </div>

          <!-- personal comission percentage -->
          <div class="vx-row mb-2">
            <label for="p_commision">{{ $t('personal_comission_percentage') }}</label>
            <vs-input id="p_commision" class="w-full" name="personal commission" v-model="form.personal_commission" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('personal commission')">{{ errors.first('personal commission') }}</span>
          </div>
        </div>
      </div>

      <!-- Save & Reset Button -->
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-4 flex lg:justify-end justify-center items-center">
            <vs-button class="mr-2 vs-con-loading__container" id="edit-jobseeker" type="filled" @click="save_changes" :disabled="!validateForm">{{ $t('update_entrepreneur') }}</vs-button>
            <vs-button to="/jobseekers/list" color="dark" type="border" class="text-left text-black lg:mr-4">{{ $t('cancel') }}</vs-button>
          </div>
        </div>
      </div>
    </vs-card>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { dateMixins } from '@/mixins/dateMixins.js'

export default {
  name: 'EditJobseeker',
  components: {
    Select2,
    DatePicker
  },
  data() {
    return {
      cityOptions: [],
      form: {
        full_name: null,
        email: null,
        mobile: null,
        dob: null,
        gender: null,
        address: null,
        permanent_address: null,
        countryId: null,
        cityId: null,
        zip_code: null,
        quick_pay_max: null,
        max_personal_tax: null,
        quick_pay_min: null,
        quick_pay_max: null,
        ssn: null,
        yearly_income: null
      }
    }
  },
  mixins: [dateMixins],
  async mounted() {
    this.$store
      .dispatch('jobseeker/getJobseekerById', this.$route.params.id)
      .then((res) => {
        const data = res.data.data
        this.form.full_name = data.full_name
        this.form.email = data.email
        this.form.mobile = data.jobSeeker && data.jobSeeker.mobile
        this.form.dob = data.dob
        this.form.gender = data.gender
        this.form.address = data.jobSeeker && data.jobSeeker.address
        this.form.permanent_address = data.jobSeeker && data.jobSeeker.permanent_address
        this.form.countryId = data.countryReferenceId
        this.form.cityId = data.cityReferenceId
        this.form.zip_code = data.zip_code
        this.form.min_personal_tax = (data.jobSeeker && data.jobSeeker.min_personal_tax) || null
        this.form.max_personal_tax = (data.jobSeeker && data.jobSeeker.max_personal_tax) || null
        this.form.personal_commission = (data.jobSeeker && data.jobSeeker.personal_commission) || 0
        this.form.ssn = (data.jobSeeker && data.jobSeeker.ssn) || null
        this.form.yearly_income = (data.jobSeeker && data.jobSeeker.yearly_income) || null
        this.form.quick_pay_min = (data.jobSeeker && data.jobSeeker.quick_pay_min) || null
        this.form.quick_pay_max = (data.jobSeeker && data.jobSeeker.quick_pay_max) || null
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
    ...mapState('jobseeker', ['loading', 'jobseekerInfo', 'GenderTypes']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('jobseeker', { getJobseekerById: 'getJobseekerById', udateJobseeker: 'udateJobseeker' }),
    ...mapMutations('jobseeker', { setState: 'SET_STATE' }),

    // update job seeker
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }

      this.form.dob = dateMixins.methods.formatOldDate(this.form.dob)
      try {
        const { message } = await this.udateJobseeker({
          id: this.$route.params.id,
          data: {
            ...this.form
          }
        })

        this.$router.push({
          name: 'jobseekers-list'
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
    // get user cities
    async getUserCities() {
      const { data } = await this.$store.dispatch('getCommonCities', this.form.countryId)
      this.cityOptions = data
    },
    changeCountry(event) {
      this.cityOptions = []
      this.cityId = null
      this.fetchCityByCounrtyId(event.referenceId)
    },
    //GET country wise city
    fetchCityByCounrtyId(id) {
      this.$store.dispatch('getCommonCities', id).then((res) => {
        this.cityOptions = res.data.reduce((acc, item) => {
          acc.push({ ...item, value: item.value })
          return acc
        }, [])
      })
    }
  },
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#edit-jobseeker',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#edit-jobseeker > .con-vs-loading')
      }
    },
    'form.countryId': {
      immediate: true,
      handler() {
        if (this.form.countryId) {
          this.getUserCities()
        }
      }
    }
  }
}
</script>
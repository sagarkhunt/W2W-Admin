<template>
  <!-- update job post form -->
  <div id="page-add-emaployer">
    <vs-card>
      <div class="vx-row pt-5 px-5">
        <div class="vx-col w-full md:w-1/2 px-8">
          <!-- Industry -->
          <div class="vx-row mb-2">
            <label for="industry">{{ $t('category') }}</label>
            <select-2
              id="industry"
              class="w-full"
              :value="form.industryId"
              @input="(item) => (form.industryId = item && item.value)"
              name="industry"
              v-validate="'required'"
              placeholder="Select industry"
              autocomplete
              :options="commanIndustry"
              :ssr="true"
              val="value"
            />
            <span class="text-primary text-sm" v-show="errors.has('industry')">{{ errors.first('industry') }}</span>
          </div>

          <!-- mobile number -->
          <div class="vx-row mb-2">
            <label for="mobile_number">{{ $t('no_of_vacancies') }}</label>
            <vs-input id="mobile_number" class="w-full" name="no of vacancies" v-model="form.vacancies" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('no of vacancies')">{{ errors.first('no of vacancies') }}</span>
          </div>

          <!-- email address -->
          <div class="vx-row mb-2">
            <label for="gender">{{ $t('gig_mode') }}</label>
            <select-2
              id="job_mode"
              placeholder="Select job mode"
              icon-pack="feather"
              class="w-full"
              name="job mode"
              v-validate="'required'"
              :value="form.job_mode"
              @input="(item) => (form.job_mode = item && item.value)"
              :options="gigModeOptions.map(x=>({...x, label: $t(x.label)}))"
              :ssr="true"
            />
            <span class="text-primary text-sm" v-show="errors.has('job mode')">{{ errors.first('job mode') }}</span>
          </div>
          <!-- Salary Offer -->
          <div class="vx-row mb-2">
            <label for="min_personal_tax">{{ $t('salary_offer_in_thousands') }}</label>
            <select-2
              id="salaryOffer"
              placeholder="Select salary offer"
              icon-pack="feather"
              class="w-full"
              name="salary offer"
              v-validate="'required'"
              :value="form.salary_offer"
              @input="(item) => (form.salary_offer = item && item.value)"
              :options="ContractTypes.map(x=>({...x, label: $t(x.label)}))"
            />
            <span class="text-primary text-sm" v-show="errors.has('salary offer')">{{ errors.first('salary offer') }}</span>
          </div>
          <!-- permits -->
          <div class="vx-row mb-2 mt-5">
            <label for="gender">{{ $t('Permit') }}</label>
            <select-2
              id="job_permits "
              class="w-full"
              multiple
              :value="form.job_permits"
              @input="(item) => (form.job_permits = item && item.value)"
              name="permit"
              placeholder="Select permit"
              autocomplete
              :options="allPermit"
              :ssr="true"
              val="value"
            />

            <!-- <span class="text-primary text-sm" v-show="errors.has('permit')">{{ errors.first('permit') }}</span> -->
          </div>

          <!-- country -->
          <div class="vx-row mb-2 mt-5">
            <label for="country">{{ $t('country') }}</label>

            <select-2
              class="w-full"
              :value="form.countryId"
              @input="(item) => (form.countryId = item && item.value)"
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

          <!-- Job Post Status -->
          <div class="vx-row mb-2">
            <label for="gender">{{ $t('job_post_status') }}</label>
            <select-2
              id="job_status"
              placeholder="Select job mode"
              icon-pack="feather"
              class="w-full"
              name="job status"
              v-validate="'required'"
              :value="form.job_status"
              @input="(item) => (form.job_status = item && item.value)"
              :options="jobPostStatus.map(x=>({...x, label: $t(x.label)}))"
            />
            <span class="text-primary text-sm" v-show="errors.has('job status')">{{ errors.first('job status') }}</span>
          </div>
          <!-- Job Description -->
          <div class="vx-row mb-2">
            <label for="yearly_income">{{ $t('job_description') }}</label>
            <vs-input id="yearly_income" class="w-full" name="job description" v-model="form.job_description" v-validate="'required|max:255'" />
            <span class="text-primary text-sm" v-show="errors.has('job description')">{{ errors.first('job description') }}</span>
          </div>
        </div>

        <div class="vx-col w-full md:w-1/2 px-8">
          <!-- country -->
          <div class="vx-row mb-2">
            <label for="permanent_address">{{ $t('gig_title') }}</label>
            <vs-input id="permanent_address" class="w-full" name="gig title" v-model="form.job_title" v-validate="'required|max:50'" />
            <span class="text-primary text-sm" v-show="errors.has('gig title')">{{ errors.first('gig title') }}</span>
          </div>

          <!-- city -->
          <div class="vx-row mb-2">
            <label for="permanent_address">{{ $t('experience_required_years') }}</label>
            <vs-input id="permanent_address" class="w-full" name="experience" v-model="form.experience" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('experience')">{{ errors.first('experience') }}</span>
          </div>

          <!-- zip code -->
          <div class="vx-row mb-2">
            <label for="zip_code">{{ $t('gig_duration') }}</label>
            <vs-input type="number" class="w-full" name="gig duration" v-model="form.job_duration" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('gig duration')">{{ errors.first('gig duration') }}</span>
          </div>
          <!-- date of Apply -->
          <div class="vx-row mb-2">
            <label for="">{{ $t('apply_before') }}</label>
            <date-picker v-model="form.apply_before" mode="date" class="w-full" :masks="{ L: 'DD.MM.YYYY' }">
              <template v-slot="{ inputValue, inputEvents }">
                <vs-input class="w-full" name="Apply Before" :value="inputValue" v-on="inputEvents" readonly />
              </template>
            </date-picker>
          </div>

          <!-- max tax percentage -->
          <div class="vx-row mb-2">
            <label for="max_personal_tax">{{ $t('address') }}</label>
            <vs-input id="max_personal_tax" class="w-full" name="address" v-model="form.address" v-validate="'required|max:60'" />
            <span class="text-primary text-sm" v-show="errors.has('address')">{{ errors.first('address') }}</span>
          </div>

          <!-- personal commission percentage -->
          <div class="vx-row mb-2 mt-5">
            <label for="city">{{ $t('city') }}</label>
            <select-2
              class="w-full"
              :value="form.cityId"
              @input="(item) => (form.cityId = item && item.referenceId)"
              name="city"
              placeholder="Select city"
              autocomplete
              :options="cityOptions"
              v-validate="'required'"
              :ssr="true"
              val="value"
            />
            <span class="text-primary text-sm" v-show="errors.has('city')">{{ errors.first('city') }}</span>
          </div>

          <!-- ssn -->
          <div class="vx-row mb-2">
            <label for="ssn">{{ $t('zip_code') }}</label>
            <vs-input id="ssn" class="w-full" name="zip code" v-model="form.zip_code" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('zip code')">{{ errors.first('zip code') }}</span>
          </div>

          <div class="vx-row mb-2 mt-5">
            <label for="city">{{ $t('company_contracter') }}</label>
            <select-2
              class="w-full"
              :value="form.companyId"
              @input="(item) => (form.companyId = item && item.value)"
              name="recipient"
              placeholder="Select recipient"
              label="company_name"
              autocomplete
              :options="allCompany"
              v-validate="'required'"
              :ssr="true"
            />
            <span class="text-primary text-sm" v-show="errors.has('recipient')">{{ errors.first('recipient') }}</span>
          </div>
        </div>
        <div class="form-row mt-5 skill-box ml-3">
          <!-- skills -->
          <div class="col-lg-6 mt-auto">
            <div class="">
              <!-- title -->
              <div class="form-row">
                <div class="form-group col-6">
                  <div class="pgp-title mb-2">
                    <h5 class="title-md">{{ $t('please_choose_the_set_of_skills_individually_you_are_looking_to_hire') }}</h5>
                  </div>
                </div>
              </div>
              <div class="job_skills">
                <span v-for="(skill, index) in skillNameOptions" :key="index" class="job_skill">
                  <span>
                    {{ skill }}
                  </span>
                  <button @click="deleteSkill(skill)" class="job_skill-btn">{{ $t('x') }}</button>
                </span>
              </div>
            </div>
          </div>
          <!-- add skill -->
          <div class="form-group col-xl-4 col-lg-6 mt-5">
            <label for="skill">{{ $t('add_skill') }}</label>
            <v-select v-model="tempSkill" :taggable="true" :pushTags="true" :reduce="(option) => option.id" :options="skillOption" v-on:input="addSkill(tempSkill)" class="border-input" />
          </div>
        </div>
      </div>

      <!-- Save & Reset Button -->
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-4 lg:float-right text-center">
            <vs-button class="mr-2 vs-con-loading__container" id="add-gig-post" type="filled" @click="save_changes" :disabled="!validateForm">{{ $t('save_post') }}</vs-button>
            <vs-button to="/posted-jobs/list" color="dark" type="border" class="text-left text-black">{{ $t('cancel') }}</vs-button>
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
  name: 'AddGigPost',
  components: {
    Select2,
    DatePicker
  },
  data() {
    return {
      profile_preview: null,
      tempSkill: null,
      logo_preview: null,
      skillOption: [],
      countries: [],
      cityOptions: [],
      commanIndustry: [],
      allCompany: [],
      allPermit: [],
      skillNameOptions: [],
      form: {
        companyId: null,
        industryId: null,
        vacancies: null,
        job_mode: null,
        salary_offer: null,
        job_permits: [],
        countryId: null,
        job_status: null,
        job_description: null,
        job_title: null,
        experience: null,
        job_duration: null,
        apply_before: null,
        address: null,
        cityId: null,
        zip_code: null,
        job_skills: []
      }
    }
  },
  async mounted() {
    this.$store
      .dispatch('postedJobs/getSkill')
      .then((res) => {
        this.skillOption = res.data
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
    //get country
    this.getCountryList()
    // Industry
    this.getCommanIndustry()
    // getAllCompany
    this.getAllCompany()
    // getAllPermits
    this.getAllPermits()
  },
  computed: {
    ...mapState('postedJobs', ['gigModeOptions', 'ContractTypes', 'jobPostStatus']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('postedJobs', { addGigPost: 'addGigPost' }),
    ...mapMutations('employer', { setState: 'SET_STATE' }),

    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.addGigPost({
          ...this.form,
          apply_before: dateMixins.methods.formatOldDate(this.form.apply_before)
        })
        this.$router.push({
          name: 'posted-jobs'
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
    addSkill(e) {
      let skillName = (this.skillOption.find((x) => x.id === e) || {}).label
      if (!this.skillNameOptions.includes(skillName)) {
        this.skillNameOptions.push(skillName)
        this.form.job_skills.push(e)
      }
      this.tempSkill = null
    },
    // delete skill
    deleteSkill(skill) {
      let skillId = (this.skillOption.find((x) => x.label === skill) || {}).id
      this.skillNameOptions = this.skillNameOptions.filter((x) => x !== skill)
      this.form.job_skills = this.form.job_skills.filter((x) => x !== skillId)
    },
    async changeCountry(event) {
      this.cityOptions = []
      this.cityId = null
      const { data } = await this.$store.dispatch('getCommonCities', this.form.countryId)
      this.cityOptions = data
    },
    //GET country wise city
    fetchCityByCounrtyId(id) {
      this.$store.dispatch('getCommonCities', id).then((res) => {
        this.cityOptions = res.data.reduce((acc, item) => {
          acc.push({ ...item, value: item.referenceId })
          return acc
        }, [])
      })
    },
    // get Common Industry
    async getCountryList() {
      const { data } = await this.$store.dispatch('getCommonCountries')
      this.countries = data
    },
    //get all industry
    async getCommanIndustry() {
      const { data } = await this.$store.dispatch('getCommanIndustry')
      this.commanIndustry = data
    },
    //get all company
    async getAllCompany() {
      const { data } = await this.$store.dispatch('getAllCompany')
      this.allCompany = data
    },
    // get all permit

    async getAllPermits() {
      const { data } = await this.$store.dispatch('getAllPermit')
      this.allPermit = data
    }
  },
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#add-gig-post',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#add-gig-post > .con-vs-loading')
      }
    },
    'form.countryId': {
      immediate: true,
      handler() {
        if (this.form.countryId) {
          this.changeCountry()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#add-gig-post {
  position: relative;

  .con-vs-loading {
    position: absolute;
  }
}
.skill-box {
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;

  @media (max-width: 425px) {
    padding: 10px 20px;
  }

  .job_skills {
    width: 100%;
    padding: 12px 15px;
    background-color: #fbfbfb;
    border: 1px solid #eaeaea;
    border-radius: 25px;
    min-height: 50px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    .job_skill {
      background-color: rgb(255, 75, 87);
      border-radius: 50px;
      padding: 10px;
      margin-right: 10px;
      color: #fff;
    }
    .job_skill-btn {
      background-color: transparent;
      border: none;
      color: #fff;
      margin-left: 10px;
    }
  }
}
.pgp-title {
  h5 {
    &.title-md {
      @media (max-width: 425px) {
        font-size: 14px;
      }
    }
  }
}
</style>
<style lang="scss">
#vs1__combobox {
  border-radius: 50px !important;
  padding: 10px !important;
}
.v-select {
  .vs__dropdown-menu {
    width: calc(100% - 30px);
    height: 100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
  }
}
</style>

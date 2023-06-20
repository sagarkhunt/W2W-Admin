<template>
  <!-- update job seeker form -->
  <div id="page-add-emaployer">
    <div class="mb-6 desc">{{ $t('here_you_can_manage_constant_urls_and_flags_that_are_required_in_system') }}</div>

    <vs-card>
      <div class="vx-row pt-5 px-5">
        <div class="vx-col w-full md:w-1/2 px-8">
          <!-- full name -->
          <div class="vx-row mb-2">
            <label for="company_email">{{ $t('company_email') }}</label>
            <vs-input id="company_email" class="w-full" name="Company Email" v-model="form.company_email" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('Company Email')">{{ errors.first('Company Email') }}</span>
          </div>

          <div class="vx-row mb-2">
            <label for="email">{{ $t('company_mobile_1') }}</label>
            <vs-input id="email" class="w-full" name="Company Mobile" v-model="form.company_mobile" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('Company Mobile')">{{ errors.first('Company Mobile') }}</span>
          </div>

          <div class="vx-row mb-2">
            <label for="mobile_number">{{ $t('facebook_url') }}</label>
            <vs-input id="mobile_number" class="w-full" name="Facebook Url" v-model="form.facebook_page_url" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('Facebook Url')">{{ errors.first('Facebook Url') }}</span>
          </div>

          <div class="vx-row mb-2">
            <label for="address">{{ $t('google_url') }}</label>
            <vs-input id="address" class="w-full" name="Google Url" v-model="form.google_page_url" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('Google Url')">{{ errors.first('Google Url') }}</span>
          </div>

          <div class="vx-row mb-2">
            <label for="p_address">{{ $t('instagram_url') }}</label>
            <vs-input id="p_address" class="w-full" name="Instagram Url" v-model="form.instagram_page_url" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('Instagram Url')">{{ errors.first('Instagram Url') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="zip_code">{{ $t('you_tube_url') }}</label>
            <vs-input class="w-full" name="YouTube Url" v-model="form.youtube_page_url" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('YouTube Url')">{{ errors.first('YouTube Url') }}</span>
          </div>

          <div class="vx-row mb-2">
            <label for="personal_tax">{{ $t('linkiden_url') }}</label>
            <vs-input class="w-full" name="Linkiden Url" v-model="form.linkedin_page_url" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('Linkiden Url ')">{{ errors.first('Linkiden Url') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="terms_of_Service">{{ $t('terms_of_Service') }}</label>
            <vs-input class="w-full" name="terms_of_Service" v-model="form.terms_service" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('terms_of_Service ')">{{ errors.first('terms_of_Service') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="privacy_policy">{{ $t('privacy_policy') }}</label>
            <vs-input class="w-full" name="privacy_policy" v-model="form.privacy_policy" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('privacy_policy ')">{{ errors.first('privacy_policy') }}</span>
          </div>
        </div>

        <div class="vx-col w-full md:w-1/2 px-8">
          <div class="vx-row mb-2">
            <label for="max_personal_tax">{{ $t('twitter_url') }}</label>
            <vs-input id="max_personal_tax" class="w-full" name="Twitter Url" v-model="form.twitter_page_url" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('Twitter Url')">{{ errors.first('Twitter Url') }}</span>
          </div>

          <div class="vx-row mb-2">
            <label for="p_commision">{{ $t('company_registration_no') }} (%)</label>
            <vs-input id="p_commision" class="w-full" name="Company Registration No" v-model="form.reg_no" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('Company Registration No')">{{ errors.first('Company Registration No') }}</span>
          </div>

          <div class="vx-row mb-2">
            <label for="ssn">{{ $t('company_address') }}</label>
            <vs-input id="ssn" class="w-full" name="Company Addresss" v-model="form.company_address" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('Company Addresss')">{{ errors.first('Company Addresss') }}</span>
          </div>

          <div class="vx-row mb-2">
            <label for="yearly_income">{{ $t('company_short_description') }}</label>
            <vs-input id="yearly_income" class="w-full" name="Company Short Description" v-model="form.description" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('Company Short Description')">{{ errors.first('Company Short Description') }}</span>
          </div>

          <div class="vx-row mb-2">
            <label for="yearly_income">{{ $t('footer_text') }}</label>
            <vs-input id="yearly_income" class="w-full" name="Footer text" v-model="form.footer_text" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('Footer text')">{{ errors.first('Footer text') }}</span>
          </div>

          <div class="vx-row mb-2 lg:mt-10 mt-6">
            <vs-checkbox v-model="form.url_access_mode">{{ $t('maintenance_mode') }}</vs-checkbox>
          </div>

          <div class="vx-row mb-2 lg:mt-10 mt-6">
            <vs-checkbox v-model="form.maintenance_mode">{{ $t('whitelist_countries') }}</vs-checkbox>
          </div>

          <div class="form-group col-xl-4 col-lg-6 mt-5">
            <label for="country">{{ $t('geo_ip') }}</label>
            <v-select v-model="slectedCountty" :menu-props="{ maxHeight: '400' }" :options="countryOption" class="border-input" multiple />
            <span class="text-primary text-sm" v-show="errors.has('Location')">{{ errors.first('Location') }}</span>
          </div>
        </div>
      </div>

      <!-- Save & Reset Button -->
      <div class="vx-row" v-if="checkPermissionByIds([permissions.SITE_SETTING_UPDATE])">
        <div class="vx-col w-full">
          <div class="mt-4 flex lg:justify-end justify-center">
            <vs-button class="lg:mr-2 vs-con-loading__container" id="edit-jobseeker" type="filled" @click="save_changes" :disabled="!validateForm">{{ $t('update_site_setting') }}</vs-button>
          </div>
        </div>
      </div>
    </vs-card>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'

export default {
  name: 'EditSiteSetting',
  components: {
    Select2
  },
  data() {
    return {
      countryOption: [],
      slectedCountty: [],
      form: {
        company_email: null,
        company_mobile: null,
        company_address: '',
        facebook_page_url: '',
        google_page_url: '',
        instagram_page_url: '',
        youtube_page_url: '',
        twitter_page_url: '',
        linkedin_page_url: '',
        description: '',
        footer_text: '',
        company_logo: '',
        reg_no: '',
        maintenance_mode: '',
        url_access_mode: '',
        countryId: [],
        terms_service: '',
        privacy_policy: ''
      }
    }
  },
  computed: {
    ...mapState('setting', ['loading', 'siteSettingInfo']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('setting', { getSiteSettingRecord: 'getSiteSettingRecord', udateSetting: 'udateSetting' }),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),
    // update job seeker
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      if (this.slectedCountty.length > 0) {
        this.form.countryId = []
        this.slectedCountty.map((el) => {
          this.form.countryId.push(el.value)
        })
      } else {
        this.form.countryId = []
      }
      try {
        const { message } = await this.udateSetting({
          id: this.siteSettingInfo.id,
          data: {
            ...this.form
          }
        })

        this.$router.push('/site-setting/view').catch(() => {})

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
  async mounted() {
    //get country option
    await this.$store
      .dispatch('getCommonCountries')
      .then((res) => {
        this.countryOption = res.data
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

    this.getSiteSettingRecord().then((siteSettingInfo) => {
      this.form.company_email = siteSettingInfo.data.company_email
      this.form.company_mobile = siteSettingInfo.data.company_mobile
      this.form.facebook_page_url = siteSettingInfo.data.facebook_page_url
      this.form.google_page_url = siteSettingInfo.data.google_page_url
      this.form.instagram_page_url = siteSettingInfo.data.instagram_page_url
      this.form.youtube_page_url = siteSettingInfo.data.youtube_page_url
      this.form.twitter_page_url = siteSettingInfo.data.twitter_page_url
      this.form.linkedin_page_url = siteSettingInfo.data.linkedin_page_url
      this.form.description = siteSettingInfo.data.description
      this.form.footer_text = siteSettingInfo.data.footer_text
      this.form.company_logo = siteSettingInfo.data.company_logo
      this.form.reg_no = siteSettingInfo.data.reg_no
      this.form.company_address = siteSettingInfo.data.company_address
      this.form.maintenance_mode = siteSettingInfo.data.maintenance_mode
      this.form.url_access_mode = siteSettingInfo.data.url_access_mode
      this.form.terms_service = siteSettingInfo.data.terms_service
      this.form.privacy_policy = siteSettingInfo.data.privacy_policy
      this.slectedCountty = siteSettingInfo.data.countryId.map((x) => {
        return this.countryOption.find((y) => {
          return y.value === x
        })
      })
    })
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
    }
  }
}
</script>
<style lang="scss" scoped>
.vs-card--content {
  .vx-row {
    .vx-col {
      .form-group {
        margin: 0 -1rem;
      }
    }
  }
}
.desc {
  margin-top: -1.25rem !important;
  @media (max-width: 425px) {
    margin-top: -0.25rem !important;
  }
}
</style>
<style lang="scss">
.vs-table--header,
.vs-table--search {
  flex-wrap: wrap;
  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

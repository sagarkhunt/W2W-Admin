<template>
  <div id="page-add-emaployer">
    <vs-card>
      <div class="vx-row pt-5 px-5">
        <div class="vx-col w-full md:w-1/2 px-8">
          <div class="vx-row mb-2">
            <label for="roleId">{{ $t('select_role') }} </label>
            <select-2
              id="roleId"
              class="w-full"
              :value="form.roleId"
              @input="(item) => (form.roleId = item && item.value)"
              name="Select Role"
              v-validate="'required'"
              placeholder="Select role"
              autocomplete
              action="getRoles"
            />
            <span class="text-primary text-sm" v-show="errors.has('Select Role')">{{ errors.first('Select Role') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="email">{{ $t('email') }}</label>
            <vs-input class="w-full" id="email" v-validate="'required|email'" name="Email" v-model="form.email" />
            <span class="text-primary text-sm" v-show="errors.has('Email')">{{ errors.first('Email') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="full_name">{{ $t('full_name') }}</label>
            <vs-input class="w-full" id="full_name" v-validate="'required|min:3|max:60'" name="Full Name" v-model="form.full_name" autocomplete="off" />
            <span class="text-primary text-sm" v-show="errors.has('Full Name')">{{ errors.first('Full Name') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="password">{{ $t('password') }}</label>
            <vs-input class="w-full" type="password" id="password" v-validate="'required'" name="Password" v-model="form.password" />
            <span class="text-primary text-sm" v-show="errors.has('Password')">{{ errors.first('Password') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="phone_number">{{ $t('phone_number') }}</label>
            <vs-input class="w-full" id="phone_number" v-validate="'required|min:3|max:11'" name="Phone Number" v-model="form.phone_number" type="number" />
            <span class="text-primary text-sm" v-show="errors.has('Phone Number')">{{ errors.first('Phone Number') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="address">{{ $t('address') }}</label>
            <vs-input class="w-full" id="address" v-validate="'required|min:3|max:60'" name="Address" v-model="form.address" />
            <span class="text-primary text-sm" v-show="errors.has('Address')">{{ errors.first('Address') }}</span>
          </div>
          <div class="vx-row mb-2 mt-3">
            <label for="countryId">{{ $t('select_country') }} </label>
            <select-2
              id="countryId"
              class="w-full"
              :value="form.countryId"
              @input="(item) => (form.countryId = item && item.value)"
              name="Select Country"
              v-validate="'required'"
              placeholder="Select country"
              autocomplete
              :options="countries"
              val="value"
              :ssr="true"
            />
            <span class="text-primary text-sm" v-show="errors.has('Select Country')">{{ errors.first('Select Country') }}</span>
          </div>
          <div class="vx-row mb-2 mt-3">
            <label for="cityId">{{ $t('select_city') }} </label>
            <select-2
              id="cityId"
              class="w-full"
              :value="form.cityId"
              @input="(item) => (form.cityId = item && item.value)"
              name="Select City"
              v-validate="'required'"
              placeholder="Select city"
              autocomplete
              val="value"
              :options="userCities"
              :ssr="true"
              :disabled="!form.countryId ? true : false"
            />
            <span class="text-primary text-sm" v-show="errors.has('Select City')">{{ errors.first('Select City') }}</span>
          </div>
        </div>
        <div class="vx-col w-full md:w-1/2 px-8">
          <div class="vx-row mb-2">
            <label for="zip_code">{{ $t('zip_code') }}</label>
            <vs-input class="w-full" id="zip_code" v-validate="'required|max:11'" name="Zip Code" v-model="form.zip_code" />
            <span class="text-primary text-sm" v-show="errors.has('Zip Code')">{{ errors.first('Zip Code') }}</span>
          </div>
          <div class="vx-row mb-2">
            <vs-upload
              :limit="1"
              :value="form.profile_image"
              ref="profileimage"
              text="Upload Profile Image"
              :show-upload-button="false"
              @on-delete="removeProfileImageHandler"
              accept="image/jpeg,image/png"
            />
          </div>
        </div>
      </div>

      <!-- Save & Reset Button -->
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="lg:mt-0 mt-8 ml-4 flex flex-wrap items-center md:justify-start justify-center">
            <vs-button class="mr-2 vs-con-loading__container" id="add-user" @click="save_changes" type="relief" :disabled="!validateForm">{{ $t('add_user') }}</vs-button>
            <vs-button to="/users/list" color="dark" type="border" class="text-left text-black">{{ $t('cancel') }}</vs-button>
          </div>
        </div>
      </div>
    </vs-card>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddUser',
  components: {
    Select2
  },
  data() {
    return {
      countries: [],
      userCities: [],
      form: {
        full_name: null,
        countryId: null,
        cityId: null,
        zip_code: null,
        phone_number: null,
        address: null,
        roleId: null,
        email: null,
        password: null,
        profile_image: null
      }
    }
  },
  mounted() {
    this.getCountryList()
  },

  computed: {
    ...mapState('users', ['loading']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('users', { addUser: 'addUser' }),
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      const data = new FormData()
      data.append('profile_image', this.form.profile_image)
      data.append('full_name', this.form.full_name)
      data.append('countryId', this.form.countryId)
      data.append('cityId', this.form.cityId)
      data.append('zip_code', this.form.zip_code)
      data.append('phone_number', this.form.phone_number)
      data.append('address', this.form.address)
      data.append('roleId', this.form.roleId)
      data.append('email', this.form.email)
      data.append('password', this.form.password)
      this.$refs['profileimage'].filesx.forEach((file) => {
        data.append('profile_image', file)
      })
      try {
        const { message } = await this.addUser(data)
        this.$router.push({
          name: 'users-list'
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
    async getCountryList() {
      const { data } = await this.$store.dispatch('getCommonCountries')
      this.countries = data
    },
    // remove profile image
    removeProfileImageHandler() {
      this.$refs.profileimage.filesx = []
    },
    // get user cities
    async getUserCities() {
      const { data } = await this.$store.dispatch('getCommonCities', this.form.countryId)
      this.userCities = data
    }
  },
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#add-user',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#add-user > .con-vs-loading')
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

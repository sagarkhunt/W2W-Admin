<template>
  <div class="add__countrie">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.UpdateCountry')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="country_name">{{ $t('country_name') }} </label>
          <vs-input id="country_name" class="w-full" name="Country Name" v-model="country_form.country_name" v-validate="'required|min:3|max:31'" />
          <span class="text-primary text-sm" v-show="errors.has('Country Name')">{{ errors.first('Country Name') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="country_code">{{ $t('country_code') }} </label>
          <vs-input id="country_code" class="w-full" name="Country Code" v-model="country_form.country_code" v-validate="'required|min:2'" />
          <span class="text-primary text-sm" v-show="errors.has('Country Code')">{{ errors.first('Country Code') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="country_citizen">{{ $t('nationality') }} </label>
          <vs-input id="country_citizen" class="w-full" name="Nationality" v-model="country_form.country_citizen" v-validate="'required|min:3|max:31'" />
          <span class="text-primary text-sm" v-show="errors.has('Nationality')">{{ errors.first('Nationality') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="updateCountryPopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="updateCountrieRecord" :disabled="!validateForm" type="submit">
            {{ $t('update') }}
          </button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { backgrondScrollHandler } from '@/utils/functions'

export default {
  name: 'EditCountries',
  props: {
    isModalShow: Boolean,
    countryRecordId: Number
  },
  data() {
    return {
      country_form: {
        country_name: '',
        country_code: '',
        country_citizen: ''
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    this.$store.dispatch('setting/getCountryById', this.countryRecordId).then((res) => {
      const data = res.data.data
      this.country_form.country_name = data.country_name
      this.country_form.country_code = data.country_code
      this.country_form.country_citizen = data.country_citizen
    })
  },
  computed: {
    // modal stat
    isActive: {
      get() {
        return this.isModalShow
      },

      set(val) {
        // handle background scroll
        backgrondScrollHandler(false)
        this.$emit('update:isModalShow', val)
      }
    },

    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('setting', {
      udateCountry: 'udateCountry'
    }),
    viewIndustry() {
      this.isActive = false
    },
    async updateCountrieRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/udateCountry', {
          id: this.countryRecordId,
          data: {
            ...this.country_form
          }
        })
        .then(({ message }) => {
          this.$emit('indList')
          this.isActive = false
          this.$vs.notify({
            title: 'Success',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
        })
        .catch(({ message }) => {
          this.$vs.notify({
            title: 'Error',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'primary'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>

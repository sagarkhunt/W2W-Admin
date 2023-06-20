<template>
  <div class="add__insurance">
    <vs-popup button-accept="false" ref="addInsuranceData" button-cancel="false" :active.sync="isActive" :title="$t('add_new_insurance')">
      <div class="con-exemple-prompt p-3">
        <div class="vx-row mb-2">
          <label for="full_name">{{ $t('insurance_name') }}</label>
          <vs-input id="full_name" class="w-full" name="Insurance Name" v-model="add_form.insurance_name" v-validate="'required|min:3|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('Insurance Name')">{{ errors.first('Insurance Name') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="full_name">{{ $t('insurance_number') }}</label>
          <vs-input id="full_name" class="w-full" name="Insurance Number" v-model="add_form.insurance_number" v-validate="'required|max:31'" />
          <span class="text-primary text-sm" v-show="errors.has('Insurance Number')">{{ errors.first('Insurance Number') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="full_name">{{ $t('insurance_email') }}</label>
          <vs-input id="full_name" class="w-full" name="Insurance Email" v-model="add_form.insurance_email" v-validate="'required|email'" />
          <span class="text-primary text-sm" v-show="errors.has('Insurance Email')">{{ errors.first('Insurance Email') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="full_name">{{ $t('insurance_website') }}</label>
          <vs-input id="full_name" class="w-full" name="Insurance Website" v-model="add_form.insurance_website" v-validate="'required|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('Insurance Website')">{{ errors.first('Insurance Website') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="full_name">{{ $t('insurance_packages') }}</label>
          <vs-input id="full_name" class="w-full" name="Insurance Packages" v-model="add_form.insurance_packages" v-validate="'required|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('Insurance Packages')">{{ errors.first('Insurance Packages') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="addInsuranceModal = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="saveChanges" :disabled="!validateForm" type="submit">{{ $t('add') }}</button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { backgrondScrollHandler } from '@/utils/functions'

export default {
  name: 'AddInsurance',
  props: {
    isModalShow: Boolean
  },
  data() {
    return {
      add_form: {
        insurance_email: '',
        insurance_name: '',
        insurance_number: '',
        insurance_website: '',
        insurance_packages: null
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
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
      addInsurance: 'addInsurance'
    }),

    async saveChanges() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/addInsurance', {
          ...this.add_form
        })
        .then(({ message }) => {
          this.$emit('newInvList')
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

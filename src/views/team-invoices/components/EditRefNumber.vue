<template>
  <div class="addtional__file">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.EditReferenceNumber')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="admin_revision_note">{{ $t('reference_number') }}</label>
          <vs-input id="admin_revision_note" class="w-full" name="Reference Number" v-model="form.reference_number" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Reference Number')">{{ errors.first('Reference Number') }}</span>
        </div>        
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="adFilePopup = false">{{ $t('close') }}</vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="saveRefNumber" :disabled="!validateForm" type="submit">{{ $t('update') }}</button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'EditTeamRefNumber',
  props: {
    isModalShow: Boolean,
    refNumberId: Number,
    refNumber: String
  },
  data() {
    return {
      form: {
        reference_number: ''
      }
    }
  },
  mounted() {      
      this.form.reference_number = this.refNumber
  },
  computed: {
    // modal stat
    isActive: {
      get() {
        return this.isModalShow
      },

      set(val) {
        this.$emit('update:isModalShow', val)
      }
    },

    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('teaminvoice', {
      updateTeamRefferenceInvoice: 'updateTeamRefferenceInvoice'
    }),
    async saveRefNumber() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('teaminvoice/updateTeamRefferenceInvoice', {
          id: this.refNumberId,
          data: {
            ...this.form
          }
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

<style></style>

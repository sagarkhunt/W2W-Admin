<template>
  <div>
    <!-- Add Invoice Number -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="`${$t('tooltip.SendForRevision')} : ${revisionNumber}`">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="admin_revision_note">{{ $t('revision_notes') }} </label>
          <vs-input id="admin_revision_note" class="w-full" name="Revision Notes" v-model="revision_form.admin_revision_note" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Revision Notes')">{{ errors.first('Revision Notes') }}</span>
        </div>
        <div class="vx-row mb-2 mt-3">
          <vs-checkbox v-model="revision_form.status">{{ $t('under_review') }}</vs-checkbox>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="revisonPopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="sendRevisonRecord" :disabled="!validateForm" type="submit">{{ $t('send') }}</button>
        </div>
      </div>
    </vs-popup>
    <!-- End Add Invoice Number -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddTeamSendForRevision',

  props: {
    isModalShow: Boolean,
    revisonRecordId: Number,
    revisionNumber: String
  },

  data() {
    return {
      revision_form: {
        admin_revision_note: ''
      }
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    },
    // modal state
    isActive: {
      get() {
        return this.isModalShow
      },

      set(val) {
        this.$emit('update:isModalShow', val)
      }
    }
  },
  methods: {
    ...mapActions('teaminvoice', {
      addRevisonRecordTeamInvoice: 'addRevisonRecordTeamInvoice'
    }),
    viewIndustry() {
      this.isActive = false
    },

    //add numbers
    async sendRevisonRecord() {
      try {
        const { message } = await this.addRevisonRecordTeamInvoice({
          id: this.revisonRecordId,
          data: {
            ...this.revision_form,
            type: 'under_review'
          }
        })
        this.revision_form.admin_revision_note = ''
        this.revision_form.under_review = false
        this.isActive = false
        this.$emit('newInvList')
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
  }
}
</script>

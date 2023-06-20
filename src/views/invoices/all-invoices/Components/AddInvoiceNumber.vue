<template>
  <div>
    <!-- Add Invoice Number -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.AddReferenceNumber')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="invoice_number">{{ $t('invoice_number') }}</label>
          <vs-input id="invoice_number" class="w-full" name="Reference number" v-model="invoice_number_form.reference_number" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Reference number')">{{ errors.first('Reference number') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="invoiceNumberPopup = false">{{ $t('close') }}</vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="addInvoiceNumber" :disabled="!validateForm" type="submit">{{ $t('add') }}</button>
        </div>
      </div>
    </vs-popup>
    <!-- End Add Invoice Number -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddInvoiceNumber',

  props: {
    isModalShow: Boolean,
    refNumberId: Number
  },

  data() {
    return {
      invoice_number_form: {
        reference_number: ''
      },
      invoiceNumberPopup: false
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    },
    // modal stat
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
    ...mapActions('invoice', {
      addRefferenceInvoice: 'addRefferenceInvoice'
    }),
    viewIndustry() {
      this.isActive = false
    },
    openInvoice() {
      this.invoiceNumberPopup = true
    },
    //add numbers
    async addInvoiceNumber() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('invoice/addRefferenceInvoice', {
          id: this.refNumberId,
          data: {
            ...this.invoice_number_form
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

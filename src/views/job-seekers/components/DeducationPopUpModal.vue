<template>
  <div>
    <!-- Deductions Info -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="deductionId ? $t('model.UpdateInvoiceDeduction') : $t('model.AddInvoiceDeduction')">
      <div class="con-exemple-prompt">
        <span class="text-primary text-sm" v-show="errors.has('Industry')">{{ errors.first('Industry') }}</span>
        <div class="mt-3">
          <label for="deductionAmount"> {{ $t('deduction_amount') }} </label>
          <vs-input vs-placeholder="Deduction Amount" name="Deduction Amount" class="w-full" v-model="invoice_deducations_form.deduction_amount" v-validate="'required'" />
        </div>

        <span class="text-primary text-sm" v-show="errors.has('Deduction Amount')">{{ errors.first('Deduction Amount') }}</span>
        <div class="mt-3">
          <label for="vat"> {{ $t('vat_1') }}</label>
          <select-2
            id="vat_type"
            placeholder="Select Vat"
            icon-pack="feather"
            class="w-full"
            name="VAT"
            v-validate="'required'"
            :value="invoice_deducations_form.vat"
            @input="(item) => (invoice_deducations_form.vat = Number(item && item.value))"
            :options="VatTypes"
          />
        </div>

        <span class="text-primary text-sm" v-show="errors.has('VAT')">{{ errors.first('VAT') }}</span>

        <div class="mt-3">
          <label for="deductionNotes"> {{ $t('deduction_notes') }} </label>
          <vs-input vs-placeholder="Deduction Notes" name="'Deduction Notes" v-model="invoice_deducations_form.deduction_notes" class="w-full" v-validate="'required'" />
        </div>

        <span class="text-primary text-sm" v-show="errors.has('Deduction Notes')">{{ errors.first('Deduction Notes') }}</span>
        <div class="mt-3">
          <label for="paymentTerm"> {{ $t('payment_term') }}</label>
          <select-2
            placeholder="select payment term"
            icon-pack="feather"
            class="w-full"
            name="Payment Term"
            :value="invoice_deducations_form.payment_term"
            @input="(item) => (invoice_deducations_form.payment_term = item && item.value)"
            v-validate="'required'"
            :options="Payment_Term.map(x=>({...x, label: $t(x.label)}))"
          />
        </div>

        <span class="text-primary text-sm" v-show="errors.has('Payment Term')">{{ errors.first('Payment Term') }}</span>

        <vs-input
          v-if="invoice_deducations_form.payment_term === 'in_parts'"
          placeholder="Total Deduction Amount (Including VAT)"
          vs-placeholder="Total Deduction Amount (Including VAT)"
          v-model="invoice_deducations_form.total_parts"
          class="mt-3 w-full"
          v-validate="'required'"
        />
        <div class="mt-3">
          <label for="totalDeducation"> {{ $t('total_deducation') }}</label>
          <vs-input :value="totalDeducationInParts" class="w-full" v-validate="'required'" disabled />
        </div>

        <div class="vx-row ml-1 mb-2 mt-3">
          <vs-checkbox v-model="invoice_deducations_form.is_priority">{{ $t('is_priority') }}</vs-checkbox>
        </div>
      </div>
      <div class="footer text-right">
        <vs-button class="mt-2 text-sm p-3" color="primary" type="filled" @click="isActive = false"> {{ $t('cancel') }} </vs-button>
        <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-success vs-button-filled p-3" @click="add_record_invoice_deducation" type="relief" :disabled="!validateForm">
          {{ deductionId ? 'Update' : 'Add' }}
        </button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapState } from 'vuex'
import { backgrondScrollHandler } from '@/utils/functions'

export default {
  name: 'DeductionPopUpModal',

  props: {
    isModalShow: Boolean,
    deductionId: Number
  },

  components: {
    Select2
  },

  data() {
    return {
      invoice_deducations_form: {
        seekerId: this.$route.params.id,
        payment_term: null,
        deduction_amount: null,
        deduction_notes: null,
        total_parts: null,
        vat: null,
        is_priority: false
      }
    }
  },

  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    if (this.deductionId) {
      this.$store.dispatch('jobseeker/getSeekerDeductionInvoiceById', this.deductionId).then(({ data }) => {
        this.invoice_deducations_form = {
          seekerId: data.seekerId,
          payment_term: data.payment_term,
          deduction_amount: data.did_amount,
          deduction_notes: data.deduction_notes,
          total_parts: data.total_parts,
          vat: data.vat.toString(),
          is_priority: data.is_priority || false
        }
      })
    }
  },

  computed: {
    ...mapState('jobseeker', ['VatTypes', 'Payment_Term']),

    // For Validation
    validateForm() {
      return !this.errors.any()
    },

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

    totalDeducationInParts() {
      let deductionAmount = Number(this.invoice_deducations_form.deduction_amount)
      let vatP = Number(this.invoice_deducations_form.vat)

      if (vatP > 0) {
        deductionAmount += (deductionAmount * vatP) / 100
      }
      const totalDeducationSum = deductionAmount / Number(this.invoice_deducations_form.total_parts)
      return totalDeducationSum.toFixed(2)
    }
  },

  methods: {
    async add_record_invoice_deducation() {
      this.invoice_deducations_form.total_parts = this.invoice_deducations_form.payment_term == 'fully' ? 1 :this.invoice_deducations_form.total_parts
      const payload = {
        url: this.deductionId ? 'jobseeker/updateSeekerInvoiceDetail' : 'jobseeker/createSeekerInvoiceDeducations',
        data: this.deductionId
          ? {
              id: this.deductionId,
              data: this.invoice_deducations_form
            }
          : this.invoice_deducations_form
      }
      if (!(await this.$validator.validate())) {
        return false
      }

      this.$store
        .dispatch(payload.url, payload.data)
        .then(({ message }) => {
          this.$emit('done')
          this.$vs.notify({
            title: 'Success',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })

          this.isActive = false
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
  },
  watch:{
    'invoice_deducations_form.payment_term': {
        immediate: true,
        handler(val) {
          if (val === 'in_parts') {
            this.invoice_deducations_form.total_parts = 1
          }
        }
      }
  }
}
</script>
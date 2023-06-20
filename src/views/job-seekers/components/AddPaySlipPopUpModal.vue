<template>
  <div>
    <!-- Deductions Info -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.AddPay')">
      <div class="con-exemple-prompt">
        <select-2
          id="payment_type"
          placeholder="Select Payment Type"
          icon-pack="feather"
          class="w-full mt-3"
          name="Payment Type"
          v-validate="'required'"
          :value="payslip_form.payment_type"
          @input="(item) => (payslip_form.payment_type = item && item.value)"
          :options="PaymentTypes.map(x=>({...x, label: $t(x.label)}))"
        />
        <span class="text-primary text-sm" v-show="errors.has('Payment Type')">{{ errors.first('Payment Type') }}</span>

        <vs-input class="mt-3 w-full" placeholder="Deduction Amount" name="Deduction Amount" vs-placeholder="Deduction Amount" v-model="payslip_form.deduction_amount" />

        <select-2
          id="invoice_number"
          placeholder="Select Invoice Number"
          icon-pack="feather"
          class="w-full mt-3"
          name="Invoice Number"
          v-validate="'required'"
          :value="payslip_form.invoice_id"
          @input="(item) => (payslip_form.invoice_id = item && item.value)"
          :options="invoiceNumber"
        />
        <span class="text-primary text-sm" v-show="errors.has('Invoice Number')">{{ errors.first('Invoice Number') }}</span>

        <vs-input class="mt-3 w-full" placeholder="Amount Paid" name="Amount Paid" vs-placeholder="Amount Paid" v-model="payslip_form.amount_paid" v-validate="'required'" />
        <span class="text-primary text-sm" v-show="errors.has('Amount Paid')">{{ errors.first('Amount Paid') }}</span>
        <div class="mb-5">
          <date-picker v-model="payslip_form.payment_date" mode="date" class="w-full" :masks="{ input: 'DD.MM.YYYY' }">
            <template v-slot="{ inputValue, inputEvents }">
              <vs-input placeholder="Payment Date" class="w-full mt-3" v-validate="'required'" name="Payment Date" :value="inputValue" v-on="inputEvents" />
            </template>
          </date-picker>
          <span class="text-primary text-sm" v-show="errors.has('Payment Date')">{{ errors.first('Payment Date') }}</span>
        </div>

        <!-- date picker -->
        <div class="mb-5">
          <date-picker v-model="range" mode="date" :masks="{ input: 'DD.MM.YYYY' }" is-range>
            <template v-slot="{ inputValue, inputEvents, isDragging }">
              <div class="flex justify-start items-center">
                <div class="relative flex-grow">
                  <svg
                    class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <input
                    placeholder="Select Date"
                    v-validate="'required'"
                    class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full date-range"
                    :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                    :value="inputValue.start"
                    v-on="inputEvents.start"
                    name="Date Range"
                  />
                </div>
                <span class="flex-shrink-0 m-2">
                  <svg class="w-4 h-4 stroke-current text-gray-600" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div class="relative flex-grow">
                  <svg
                    class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <input
                    placeholder="Select Date"
                    class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full date-range"
                    :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                    :value="inputValue.end"
                    v-on="inputEvents.end"
                  />
                </div>
              </div> </template
          ></date-picker>
          <span class="text-primary text-sm" v-show="errors.has('Date Range')">{{ errors.first('Date Range') }}</span>
        </div>

        <vs-input placeholder="Extra Info" vs-placeholder="Extra Info" v-model="payslip_form.extra_info" class="mt-3 w-full" />

        <p class="mt-3">{{ $t('payslip_file') }}</p>

        <input type="file" ref="banner" accept="image/jpeg, image/png" @change="payslipReceiptFile" icon-pack="feather" class="vs-inputx vs-input--input normal w-full" />

        <p class="mt-3">{{ $t('deduction_file') }}</p>
        <div class="vx-row mb-2"></div>
        <input type="file" ref="banner" accept="image/jpeg, image/png" @change="deductionReceiptFile" icon-pack="feather" class="vs-inputx vs-input--input normal w-full" />
      </div>
      <div class="footer text-right">
        <vs-button class="mt-2 text-sm p-3" color="primary" type="filled" @click="isActive = false"> {{ $t('close') }} </vs-button>
        <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-success vs-button-filled p-3" @click="createRecordPayslip" type="relief">{{ $t('add') }}</button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { dateMixins } from '@/mixins/dateMixins.js'
import { backgrondScrollHandler } from '@/utils/functions'
import moment from 'moment'

export default {
  name: 'AddPayslipModal',
  components: {
    DatePicker,
    Select2
  },
  props: {
    isModalShow: Boolean,
    jobseeker: Object
  },
  data() {
    return {
      // Payslip Form
      payslip_form: {
        payment_type: null,
        invoice_id: null,
        amount_paid: '',
        extra_info: '',
        deduction_amount: '',
        payment_date: '',
        seekerId: this.$route.params.id,
        payslip_receipt: '',
        deduction_receipt: ''
      },
      //invoice number
      invoiceNumber: [],
      range: {
        start: '',
        end: ''
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    this.$store
      .dispatch('jobseeker/getInvoiceNumber', this.$route.params.id)
      .then((res) => {
        this.invoiceNumber = res.data
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
    ...mapState('employer',['PaymentTypes']),
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
    ...mapActions('jobseeker', {
      addRecordPayslip: 'addRecordPayslip'
    }),

    payslipReceiptFile(e) {
      this.payslip_form.payslip_receipt = e.target.files[0]
    },
    deductionReceiptFile(e) {
      this.payslip_form.deduction_receipt = e.target.files[0]
    },

    async createRecordPayslip() {
      if (!(await this.$validator.validate())) {
        return false
      }
      // Formated Date
      this.payslip_form.payment_date = dateMixins.methods.formatOldDate(this.payslip_form.payment_date)

      // append payslip_form data

      const data = new FormData()
      data.append('start_date', this.range.start ? moment(this.range.start).format('YYYY-MM-DD') : null)
      data.append('end_date', this.range.end ? moment(this.range.end).format('YYYY-MM-DD') : null)
      data.append('payment_type', this.payslip_form.payment_type)
      data.append('invoice_id', this.payslip_form.invoice_id)
      data.append('extra_info', this.payslip_form.extra_info)
      data.append('amount_paid', this.payslip_form.amount_paid)
      data.append('deduction_amount', this.payslip_form.deduction_amount)
      data.append('payment_date', this.payslip_form.payment_date)
      data.append('seekerId', this.payslip_form.seekerId)
      data.append('payslip_receipt', this.payslip_form.payslip_receipt)
      data.append('deduction_receipt', this.payslip_form.deduction_receipt)

      try {
        const { message } = await this.addRecordPayslip(data)
        this.$emit('done')
        this.isActive = false
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
<style lang="scss" scoped>
.date-range {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.6rem 0.6rem 0.6rem 2rem !important;
}
</style>

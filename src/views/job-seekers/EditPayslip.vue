<template>
  <div>
    <vs-card>
      <div class="vx-row pt-5 px-5">
        <div class="vx-col w-full md:w-1/2 px-8">
          <!-- payment type select start -->
          <div class="vx-row mb-2 mt-5">
            <select-2
              id="payment_type"
              class="w-full"
              name="Payment Type"
              placeholder="Payment Type"
              :value="update_payslip_form.payment_type"
              @input="(item) => (update_payslip_form.payment_type = item && item.value)"
              v-validate="'required'"
              :options="PaymentTypes.map(x=>({...x, label: $t(x.label)}))"
            />
            <span class="text-primary text-sm" v-show="errors.has('Payment Type')">{{ errors.first('Payment Type') }}</span>
          </div>
          <!-- payment type select end -->

          <!-- deduction amount start -->
          <div class="vx-row mb-2 mt-5">
            <vs-input
              class="mt-3 w-full"
              placeholder="Deduction Amount"
              name="Deduction Amount"
              vs-placeholder="Deduction Amount"
              v-model="update_payslip_form.deduction_amount"
              v-validate="'required'"
            />
          </div>
          <!-- deduction amount end  -->

          <!-- invoice number start  -->
          <div class="vx-row mb-2 mt-5">
            <select-2
              id="invoice_number"
              placeholder="Select Invoice Number"
              icon-pack="feather"
              class="w-full mt-3"
              name="Invoice Number"
              v-validate="'required'"
              :value="update_payslip_form.invoice_id"
              @input="(item) => (update_payslip_form.invoice_id = item && item.value)"
              :options="invoiceNumber"
              disabled
            />
            <span class="text-primary text-sm" v-show="errors.has('Invoice Number')">{{ errors.first('Invoice Number') }}</span>
          </div>
          <!-- invoice number End -->

          <!-- amount paid start  -->
          <div class="vx-row mb-2 mt-5">
            <vs-input class="mt-3 w-full" placeholder="Amount Paid" name="Amount Paid" vs-placeholder="Amount Paid" v-model="update_payslip_form.amount_paid" v-validate="'required'" />
            <span class="text-primary text-sm" v-show="errors.has('Amount Paid')">{{ errors.first('Amount Paid') }}</span>
          </div>
          <!-- amount paid end  -->
        </div>
        <div class="vx-col w-full md:w-1/2 px-8">
          <!-- payment date start  -->
          <div class="vx-row mb-2 mt-5">
            <date-picker mode="date" v-model="update_payslip_form.payment_date" class="w-full" :masks="{ input: 'DD.MM.YYYY' }">
              <template v-slot="{ inputValue, inputEvents }">
                <vs-input placeholder="Payment Date" class="w-full" v-validate="'required'" name="Payment Date" :value="inputValue" v-on="inputEvents" readonly />
              </template>
            </date-picker>
            <span class="text-primary text-sm" v-show="errors.has('Payment Date')">{{ errors.first('Payment Date') }}</span>
          </div>
          <!-- payment date end  -->

          <!-- date range start -->
          <div class="vx-row mb-2 mt-5">
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
                      class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full date-range"
                      :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                      :value="inputValue.start"
                      v-on="inputEvents.start"
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
                </div>
              </template>
            </date-picker>
          </div>
          <!-- date range end -->

          <img :src="payslip_receipt_preview" alt="" height="100" width="100" />
          <div class="vx-row mb-2">
            <!-- pay slip start  -->
            <input type="file" ref="payslip_receipt" accept="image/jpeg, image/png" @change="handlePaySlipUpload" icon-pack="feather" class="vs-inputx vs-input--input normal w-full" />
            <!-- pay slip end  -->
          </div>

          <img :src="deduction_amount_preview" alt="" height="100" width="100" />
          <div class="vx-row mb-2">
            <!-- deduction slip start  -->
            <input type="file" ref="deduction_receipt" accept="image/jpeg, image/png" @change="handleDocumentUpload" icon-pack="feather" class="vs-inputx vs-input--input normal w-full" />
            <!-- deduction slip end  -->
          </div>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-4 float-right">
            <vs-button class="mr-2 vs-con-loading__container" id="edit-jobseeker" type="filled" @click="update_changes" :disabled="!validateForm">{{ $t('update_payslip') }}</vs-button>
            <vs-button to="/jobseekers/list" color="dark" type="border" class="text-left text-black">{{ $t('cancel') }} </vs-button>
          </div>
        </div>
      </div>
    </vs-card>
  </div>
</template>

<script>
import Select2 from '../../components/custom/form-elements/Select2.vue'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { mapActions, mapMutations, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import moment from 'moment'

export default {
  name: 'EditPayslip',
  components: { Select2, DatePicker },
  data() {
    return {
      deduction_amount_preview: null,
      payslip_receipt_preview: null,
      invoiceNumber: [],
      update_payslip_form: {
        payment_type: null,
        invoice_id: '',
        amount_paid: '',
        deduction_amount: '',
        payment_date: '',
        payslip_receipt: '',
        deduction_receipt: ''
      },
      range: {
        start: '',
        end: ''
      }
    }
  },
  mixins: [dateMixins],
  async mounted() {
    this.$store
      .dispatch('jobseeker/getInvoiceNumber', this.$route.params.seekerId)
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
    this.$store
      .dispatch('jobseeker/getPayslipById', this.$route.params.id)
      .then((res) => {
        const data = res.data.data
        this.range = {
          start: data.start_date ? moment(data.start_date).format('YYYY-MM-DD') : null,
          end: data.end_date ? moment(data.end_date).format('YYYY-MM-DD') : null
        }
        this.update_payslip_form.payment_type = data.payment_type
        this.update_payslip_form.invoice_id = data.invoiceId
        this.update_payslip_form.amount_paid = data.amount_paid
        this.update_payslip_form.deduction_amount = data.deduction_amount
        this.update_payslip_form.payment_date = data.payment_date
        this.update_payslip_form.payslip_receipt = data.payslip_receipt
        this.update_payslip_form.deduction_receipt = data.deduction_receipt
        this.payslip_receipt_preview = data.payslip_file_path || ''
        this.deduction_amount_preview = data.deudction_file_path || ''
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
    ...mapState('jobseeker', ['loading', 'jobseekerInfo', 'payslipInfo']),
    ...mapState('employer', ['loading', 'total', 'FilteredCount', 'employers', 'employerInfo', 'PaymentTypes']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('jobseeker', { getPayslipById: 'getPayslipById', udateJobseekerPayslip: 'udateJobseekerPayslip' }),
    ...mapMutations('jobseeker', { setState: 'SET_STATE' }),

    // update jobseeker payslip data

    async update_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      const data = new FormData()
      data.append('start_date', this.range.start ? moment(this.range.start).format('YYYY-MM-DD') : null)
      data.append('end_date', this.range.end ? moment(this.range.end).format('YYYY-MM-DD') : null)
      data.append('amount_paid', this.update_payslip_form.amount_paid)
      data.append('deduction_amount', this.update_payslip_form.deduction_amount)
      data.append('deduction_receipt', this.update_payslip_form.deduction_receipt)
      data.append('invoice_id', this.update_payslip_form.invoice_id)
      data.append('payment_date', dateMixins.methods.formatOldDate(this.update_payslip_form.payment_date))
      data.append('payment_type', this.update_payslip_form.payment_type)
      data.append('payslip_receipt', this.update_payslip_form.payslip_receipt)

      try {
        const { message } = await this.udateJobseekerPayslip({
          id: this.$route.params.id,
          data: data
        })

        this.$router.push({
          name: 'jobseekers-list'
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
    //profile image set
    handlePaySlipUpload(e) {
      this.update_payslip_form.payslip_receipt = e.target.files[0]
      this.payslip_receipt_preview = URL.createObjectURL(e.target.files[0])
    },
    //company logo set
    handleDocumentUpload(e) {
      this.update_payslip_form.deduction_receipt = e.target.files[0]
      this.deduction_amount_preview = URL.createObjectURL(e.target.files[0])
    }
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
.date-range {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.6rem 0.6rem 0.6rem 2rem !important;
}
</style>

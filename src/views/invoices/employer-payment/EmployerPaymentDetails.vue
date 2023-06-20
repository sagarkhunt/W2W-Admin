<template>
  <div>
    <div class="data_table">
      <vs-row>
        <!-- Invoice Details  -->
        <vs-col class="vx-col w-full px-4">
          <div class="recently_added__items">
            <vs-card class="cardx bg-green-500">
              <vs-table stripe maxHeight="500px" noDataText="" :data="[]">
                <template slot="header">
                  <!-- TABLE ACTION ROW -->
                  <p class="font-bold text-xl mb-2">{{ $t('invoice_details') }}</p>
                </template>

                <template slot="thead">
                  <vs-th>{{ $t('sr') }}</vs-th>
                  <vs-th>{{ $t('invoice_id') }}</vs-th>
                  <vs-th>{{ $t('company_name_1') }}</vs-th>
                  <vs-th>{{ $t('paid_on') }} </vs-th>
                  <vs-th>{{ $t('amount_paid_to_le') }}</vs-th>
                  <vs-th>{{ $t('invoice_total_amount') }} </vs-th>
                  <vs-th>{{ $t('remaining_amount') }} </vs-th>
                  <vs-th>{{ $t('status') }} </vs-th>
                </template>

                <template ref="tableBody">
                  <vs-tr>
                    <vs-td>#</vs-td>
                    <vs-td> {{ getInvoiceDetail.invoice_number }}</vs-td>
                    <vs-td> {{ (getInvoiceDetail.company && getInvoiceDetail.company.company_name) || '-' }} </vs-td>
                    <vs-td>{{ formatDate(getInvoiceDetail.due_date) }} </vs-td>
                    <vs-td> € {{ Number(getInvoiceDetail.paid_amount).toFixed(2) }} </vs-td>
                    <vs-td>€ {{ Number(getInvoiceDetail.company_pay_amount).toFixed(2) }} </vs-td>
                    <vs-td>€ {{ Number(getInvoiceDetail.remaining_pay_amount).toFixed(2) }} </vs-td>
                    <vs-td>{{ getInvoiceDetail.payment_status }} </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </vs-card>
          </div>
        </vs-col>
        <!-- Invoice Details  End-->

        <!-- Payment Details -->
        <vs-col class="vx-col w-full lg:w-1/2 px-4">
          <div class="recently_added__items">
            <vs-card class="cardx bg-green-500">
              <vs-table stripe maxHeight="500px" :data="paymentDetails">
                <template slot="header">
                  <!-- TABLE ACTION ROW -->
                  <p class="font-bold text-xl mb-2">{{ $t('payment_details') }}</p>
                  <button type="button" name="button" @click="quickPayment" id="add-employer" class="vs-component vs-button vs-button-primary vs-button-relief mb-2 sm:p-3 p-2">
                    <span class="">{{ $t('add_payment_info') }}</span>
                    <span class="vs-button-linex"></span>
                  </button>
                </template>

                <template slot="thead">
                  <vs-th>#</vs-th>
                  <vs-th>{{ $t('paid_on') }}</vs-th>
                  <vs-th>{{ $t('amount_paid') }} </vs-th>
                </template>

                <template slot-scope="{ data }" ref="tableBody">
                  <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                    <vs-td>#</vs-td>
                    <vs-td>{{ tr.payment_date }}</vs-td>
                    <vs-td>€ {{ tr.amount }}</vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </vs-card>
          </div>
        </vs-col>
        <!-- Payment Details End -->
      </vs-row>
    </div>
    <!-- invoice payment modal  -->
    <InvoicePaymentModal v-if="ispaymentPopupModalMounted" :isModalShow.sync="ispaymentPopupModalShow" :invoiceId="invoiceId" @done="getData" />
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { dateMixins } from '@/mixins/dateMixins.js'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import InvoicePaymentModal from './components/InvoicePaymentModale.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'PaymentDetail',
  components: {
    Select2,
    DatePicker,
    InvoicePaymentModal
  },
  data() {
    return {
      companyId: '',
      ispaymentPopupModalMounted: false,
      ispaymentPopupModalShow: false,
      invoiceId: '',
      val: '',
      form: {
        amount: '',
        payment_date: new Date()
      }
    }
  },
  mixins: [dateMixins],
  mounted() {
    this.getPayDetails()
    this.getPayInvoiceDetails()
  },
  computed: {
    ...mapState('invoice', ['loading', 'paymentDetails', 'getInvoiceDetail']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('invoice', {
      getPaymentDetail: 'getPaymentDetail',
      getPaymentInvoiceDetail: 'getPaymentInvoiceDetail',
      addEmployerPayment: 'addEmployerPayment',
      deletePaymentRecord: 'deletePaymentRecord'
    }),
    async getData() {
      this.getPayDetails()
      this.getPayInvoiceDetails()
    },
    async getPayDetails() {
      try {
        await this.getPaymentDetail(this.$route.params)
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

    async getPayInvoiceDetails() {
      try {
        await this.getPaymentInvoiceDetail(this.$route.params)
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

    async addPayments() {
      this.form.payment_date = dateMixins.methods.formatDateSubmit(this.form.payment_date)

      try {
        const { message } = await this.addEmployerPayment({
          id: this.$route.params.id,
          data: {
            ...this.form
          }
        })
        this.form.amount = ''
        this.form.payment_date = ''
        this.paymentPopup = false
        this.getPayDetails()
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
    quickPayment() {
      this.ispaymentPopupModalMounted = true
      this.ispaymentPopupModalShow = true
      this.invoiceId = parseInt(this.$route.params.id)
    },
    /**Delete Payment */
    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.paymentDelete'),
        accept: () => this.deletePayment(id),
        acceptText: 'Delete'
      })
    },
    async deletePayment(id) {
      try {
        const { message } = await this.deletePaymentRecord(id)
        this.$vs.notify({
          title: this.$t('delete_conformation.Success'),
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.getPayDetails()
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
  watch: {
    page() {
      this.handleChangePage(this.page)
    },
    ispaymentPopupModalShow: {
      immediate: true,
      handler(newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.invoiceId = ''
            this.ispaymentPopupModalMounted = false
          }, 0)
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.ispaymentPopupModalShow = false
    setTimeout(() => {
      next()
    }, 0)
  }
}
</script>

<style lang="scss" scoped></style>

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
                    <vs-td> {{ paymentDetailsTeam.invoice_number || '-' }}</vs-td>
                    <vs-td> {{ (paymentDetailsTeam.company && paymentDetailsTeam.company.company_name) || '-' }} </vs-td>
                    <vs-td>{{ formatDate(paymentDetailsTeam.due_date || '-') }} </vs-td>
                    <vs-td> € {{ Number(paymentDetailsTeam.total_paid_amount).toFixed(2) }} </vs-td>
                    <vs-td>€ {{ Number(paymentDetailsTeam.company_pay_amount).toFixed(2) || '-' }} </vs-td>
                    <vs-td>€ {{ (paymentDetailsTeam.remaining_pay_amount && Number(paymentDetailsTeam.remaining_pay_amount).toFixed(2)) || '-' }} </vs-td>
                    <vs-td> {{ paymentDetailsTeam.payment_status || '-' }} </vs-td>
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
              <vs-table stripe maxHeight="500px" :data="paymentDetailsTeam.invoice_seekers || []">
                <template slot="header">
                  <!-- TABLE ACTION ROW -->
                  <p class="font-bold text-xl mb-2">{{ $t('seeker_payment_details') }}</p>
                </template>

                <template slot="thead">
                  <vs-th>#</vs-th>
                  <vs-th>{{ $t('seeker_name') }}</vs-th>
                  <vs-th>{{ $t('paid_on') }} </vs-th>
                  <vs-th>{{ $t('amount') }} </vs-th>
                  <vs-th>{{ $t('amount_paid') }} </vs-th>
                  <vs-th>{{ $t('action') }}</vs-th>
                </template>

                <template slot-scope="{ data }" ref="tableBody">
                  <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                    <vs-td>#</vs-td>
                    <vs-td>{{ (tr.seeker && tr.seeker.user && tr.seeker.user.full_name) || '-' }}</vs-td>
                    <vs-td> {{ tr.payment_date || '-' }}</vs-td>
                    <vs-td>€ {{ (tr.seeker_company_pay && tr.seeker_company_pay.toFixed(2)) || '-' }}</vs-td>
                    <vs-td>€ {{ tr.paid_amount && tr.paid_amount.toFixed(2) }}</vs-td>
                    <vs-td>
                      <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                        <button
                          type="button"
                          name="button"
                          @click="quickPaymentSeekerTeam(tr.seeker.id, paymentDetailsTeam.teamId)"
                          id="add-employer"
                          class="vs-component vs-button vs-button-primary vs-button-relief mb-2 p-2 text-sm"
                        >
                          <span class="">{{ $t('payment') }}</span>
                          <span class="vs-button-linex"></span>
                        </button>
                      </div>
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </vs-card>
          </div>
        </vs-col>
        <!-- Payment Details End -->
      </vs-row>
    </div>
    <TeamSeekerPayment v-if="isSeekerPaymentModalMounted" :isModalShow.sync="isSeekerPaymentModalShow" :seekerTeamPayment="selectedSeekerPayment" @done="getPayDetails" />
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { dateMixins } from '@/mixins/dateMixins.js'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { mapActions, mapState } from 'vuex'
import TeamSeekerPayment from './components/TeamSeekerPaymentModal.vue'
export default {
  name: 'EmployerPaymentDetailsTeam',
  components: {
    Select2,
    DatePicker,
    TeamSeekerPayment
  },
  data() {
    return {
      companyId: '',
      paymentPopup: false,
      val: '',
      isSeekerPaymentModalMounted: false,
      isSeekerPaymentModalShow: false,
      selectedSeekerPayment: {}
    }
  },
  mixins: [dateMixins],
  mounted() {
    this.getPayDetails()
  },
  computed: {
    ...mapState('teaminvoice', ['loading', 'paymentDetailsTeam']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('teaminvoice', {
      getPaymentDetailTeamInvoice: 'getPaymentDetailTeamInvoice',
      addEmployerPayment: 'addEmployerPayment',
      deletePaymentRecord: 'deletePaymentRecord'
    }),
    async getPayDetails() {
      try {
        const { message } = await this.getPaymentDetailTeamInvoice(this.$route.params)

        this.$vs.notify({
          title: this.$t('delete_conformation.Success'),
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
    //seeker payment in team invoice
    quickPaymentSeekerTeam(seekerId, teamId) {
      const data = {
        seekerTeamId: seekerId,
        teamId: teamId
      }

      this.selectedSeekerPayment = data
      this.isSeekerPaymentModalMounted = true
      this.isSeekerPaymentModalShow = true
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
        this.form.seekerId = ''
        this.form.teamId = ''
        this.paymentPopup = false
        this.getPayDetails()
        this.$vs.notify({
          title: this.$t('delete_conformation.Success'),
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
    isSeekerPaymentModalShow: {
      immediate: true,
      handler(newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.selectedSeekerPayment = {}
            this.isSeekerPaymentModalMounted = false
          }, 0)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

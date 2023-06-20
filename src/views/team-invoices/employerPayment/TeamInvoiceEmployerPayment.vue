<template>
  <div class="teamInvoice_payment">
    <div class="mb-6 desc">{{ $t('here_accountant_can_manage_payments_employer_wise') }}</div>
    <div class="vx-card md:p-8 p-6">
      <div class="vx-row items-end">
        <div class="sm:flex items-end px-8 w-full mb-2 search-input-wrapper">
          <div class="vx-col md:w-full">
            <input type="text" class="border-input searchbar-input w-full" v-model="searchValue" placeholder="Try searching invoice no, email, refference no..." />
          </div>
        </div>

        <div class="vx-col w-full md:w-full px-8 mb-2 md:mt-2">
          <vs-table
            id="table-loading"
            class="vs-con-loading__container vh-hight-table"
            stripe
            :sst="true"
            maxHeight="500px"
            maxWidth="1000px"
            @change-page="handleChangePage"
            @sort="handleSort"
            :total="employerPaymentsFilterCount"
            :max-items="length"
            :data="employerPaymentsTeamInvoice"
          >
            <template slot="thead">
              <vs-th>{{ $t('creation_date') }} </vs-th>
              <vs-th sort-key="due_date">{{ $t('due_date') }}</vs-th>
              <vs-th sort-key="company_pay_amount">{{ $t('invoice_total_amount') }} </vs-th>
              <vs-th sort-key="invoice_number">{{ $t('invoice_no') }} </vs-th>
              <vs-th sort-key="invoice_by">{{ $t('invoice_by') }} </vs-th>
              <vs-th sort-key="invoice_to">{{ $t('invoice_to') }} </vs-th>
              <vs-th>{{ $t('action') }}</vs-th>
            </template>
            <template slot="header">
              <div class="flex flex-wrap justify-between items-end mb-3 md:w-auto w-full gap-3">
                <div class="md:mb-0 sm:mb-2 xl:mr-4 md:w-auto w-full ag-grid-table-actions-left">
                  <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                    <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                      <span class="mr-2">
                        {{ page * length - (length - (employerPaymentsFilterCount && 1)) }}
                        -
                        {{ employerPaymentsFilterCount - page * length > 0 ? page * length : employerPaymentsFilterCount }}
                        {{ $t('of') }} {{ employerPaymentsFilterCount }}
                      </span>
                      <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                    </div>
                    <vs-dropdown-menu class="remove-tip">
                      <vs-dropdown-item @click="handleChangeLength(10)">
                        <span>10</span>
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="handleChangeLength(20)">
                        <span>20</span>
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="handleChangeLength(50)">
                        <span>50</span>
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="handleChangeLength(100)">
                        <span>100</span>
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </div>
                <div class="width">
                  <select-2
                    id="filterby"
                    class="w-full"
                    :value="filterBy"
                    @input="(item) => (filterBy = item && item.value)"
                    name="Filter by"
                    placeholder="Filter by"
                    autocomplete
                    :options="SearchByTypes.map((x) => ({ ...x, label: $t(x.label) }))"
                  />
                </div>
                <div class="width">
                  <select-2
                    id="quickPay"
                    class=""
                    :value="quickPay"
                    @input="(item) => (quickPay = item && item.value)"
                    placeholder="Select quickpay"
                    name="Select quickpay"
                    autocomplete
                    :options="QuickPayTypes.map((x) => ({ ...x, label: $t(x.label) }))"
                  />
                </div>

                <div class="md:mb-0 mr-0.5 ag-grid-table-actions-left lg:mt-0 sm:mt-2 sm:w-auto w-full">
                  <vs-row vs-justify="flex-end">
                    <vx-tooltip :text="$t('tooltip.SelectDate')" class="Calender sm:w-auto w-full">
                      <div class="date-popup">
                        <date-picker v-model="range" range @change="selectDate($event)"> </date-picker>
                      </div>
                    </vx-tooltip>
                  </vs-row>
                </div>
              </div>
            </template>
            <template slot-scope="{ data }" ref="tableBody">
              <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                <vs-td>
                  {{ formatDate(tr.created_at) }}
                </vs-td>
                <vs-td>
                  {{ formatDate(tr.due_date) }}
                </vs-td>
                <vs-td v-if="tr.payment_date">
                  {{ formatDate(tr.payment_date) }}
                </vs-td>
                <vs-td> € {{ Number(tr.company_pay_amount).toFixed(2) || 0 }} </vs-td>
                <vs-td>
                  <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                    <p @click="viewTeamInvoiceRecord(tr)">
                      {{ tr.invoice_number }}
                    </p>
                  </div>
                </vs-td>

                <vs-td>
                  <div class="inline-flex" v-if="tr.team && tr.team.created_by && tr.team.created_by.user && tr.team.created_by.user.full_name" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                    <p @click="viewSingleEntrepreneur(tr.team && tr.team.created_by && tr.team.created_by.user && tr.team.created_by.user.id, tr.team && tr.team.created_by && tr.team.created_by.id)">
                      {{ (tr.team && tr.team.created_by && tr.team.created_by.user && tr.team.created_by.user.full_name) || '-' }}
                    </p>
                  </div>

                  <div v-else>-</div>
                </vs-td>
                <vs-td>
                  <div class="inline-flex" v-if="tr.company && tr.company.company_name" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                    <p @click="viewEmployerRecord(tr.company && tr.company.id, tr.company)">
                      {{ (tr.company && tr.company.company_name) || '-' }}
                    </p>
                  </div>
                  <div v-else>-</div>
                </vs-td>

                <vs-td>
                  <button
                    type="button"
                    name="button"
                    @click="viwePaymetDetailsTeam(tr.id, tr)"
                    id="add-employer"
                    class="vs-component vs-button vs-button-primary vs-button-relief"
                    style="padding: 10px; white-space: nowrap"
                  >
                    <span class="">{{ $t('payment_details') }}</span>
                    <span class="vs-button-linex"></span>
                  </button>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
          <div class="centerx">
            <vs-pagination :total="Math.ceil(employerPaymentsFilterCount / length)" v-model="page"></vs-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { dateMixins } from '@/mixins/dateMixins.js'
import { mapActions, mapState } from 'vuex'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  name: 'TeamInvoiceEmployerPayment',

  components: {
    Select2,
    DatePicker
  },

  data: () => ({
    page: 1,
    length: 10,
    search: '',
    filterBy: '',
    quickPay: '',
    employerId: '',
    employerOptions: [],

    selectedQuickPayment: {},
    employerFilters: {
      page: 1,
      limit: 20,
      search: null
    },
    //date Picker
    range: {},
    start_date: '',
    end_date: '',
    searchValue: ''
  }),

  mixins: [dateMixins],

  mounted() {
    this.getPayments()
    this.getEmployerOptions()
  },

  computed: {
    ...mapState('teaminvoice', ['loading', 'employerPaymentsTeamInvoice', 'employerPaymentsTotal', 'employerPaymentsFilterCount', 'SearchByTypes', 'QuickPayTypes']),
    validateForm() {
      return !this.errors.any()
    },
    paymentDate() {
      return (data) => {
        let html = data.map((i) => i.payment_date).join('<br/>')

        return html
      }
    }
  },

  methods: {
    ...mapActions('teaminvoice', {
      getPaymentByEmployerTeamInvoice: 'getPaymentByEmployerTeamInvoice',
      addEmployerPaymentTeamInvoice: 'addEmployerPaymentTeamInvoice'
    }),
    async getPayments() {
      try {
        const { data, message } = await this.getPaymentByEmployerTeamInvoice({
          id: this.employerId && this.employerId.value,
          invoice_type: 'unpaid',
          payload: {
            limit: this.length,
            page: this.page,
            search: this.searchValue,
            order: this.order,
            invoice_type: this.type,
            filter_by: this.filterBy,
            quick_pay: this.quickPay,
            start_date: this.start_date,
            end_date: this.end_date
          }
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
    async addPayments() {
      this.form.payment_date = dateMixins.methods.formatDateSubmit(this.form.payment_date)
      try {
        const { message } = await this.addEmployerPaymentTeamInvoice({
          id: this.form.id,
          data: {
            ...this.form
          }
        })
        this.paymentPopup = false
        this.getPayments()
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
    handleChangeLength(length) {
      this.page = 1
      this.length = length
      this.getPayments()
    },
    handleChangePage(page) {
      this.page = page
      this.getPayments()
    },
    handleSort(key, active) {
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getPayments()
    },
    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getPayments()
    },

    viwePaymetDetailsTeam(id, tr) {
      this.$store.commit('teaminvoice/SET_STATE', {
        action: 'getInvoiceDetailTeam',
        data: tr
      })
      this.$router.push(`/team-invoice/payments/${id}/payment-details`)
    },
    //Select Date
    selectDate(event) {
      this.start_date = moment(event[0]).format('YYYY-MM-DD') || null
      this.end_date = moment(event[1]).format('YYYY-MM-DD') || null
      this.getPayments()
    },
    // fetch seeker list
    async getEmployerOptions() {
      await this.$store
        .dispatch('getEmployer', this.employerFilters)
        .then((res) => {
          this.employerOptions = res.data
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
    // handle search seeker
    handleSearchSeeker(val) {
      if (this.employerFilters.search !== val) {
        this.employerFilters.search = val

        this.getEmployerOptions()
      }
    },
    viewTeamInvoiceRecord(tr) {
      this.$router.push(`/team-invoices/${tr.id}/view`)
    },
    //view light Entrepreneur
    viewSingleEntrepreneur(id, seekerId) {
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfileId',
        data: id
      })
      localStorage.setItem('seekerProfileInfoId', id)
      this.$router.push(`/jobseeker/${seekerId}/info`)
    },
    viewEmployerRecord(id, tr) {
      this.$store.commit('employer/SET_STATE', {
        action: 'employerCompanyId',
        data: tr.user.id
      })
      localStorage.setItem('employerCompanyId', id)
      localStorage.setItem('empCompanyId', tr.user.id)
      this.$router.push(`/employer/${id}/info`)
    }
  },
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#table-loading',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#table-loading > .con-vs-loading')
      }
    },

    filterBy: {
      handler(newVal) {
        this.page = 1
        this.getPayments()
      }
    },
    page() {
      this.handleChangePage(this.page)
    },

    quickPay: {
      handler(newVal) {
        this.page = 1
        this.getPayments()
      }
    },
    searchValue: {
      handler(newVal) {
        this.page = 1
        this.getPayments()
      }
    }
  }
}
</script>

<style lang="scss">
.teamInvoice_payment {
  .vs-table--header,
  .vs-table--search {
    flex-wrap: wrap;
    @media (max-width: 768px) {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .remove-tip {
    .vs-dropdown--menu--after {
      display: none;
    }
  }
  .vs-table--search-input {
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .v-select {
    .vs__dropdown-toggle {
      padding: 6px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      .vs__selected-options {
        .vs__search {
          margin: 0;
        }
      }
    }
  }
  .vh-hight-table {
    .vs-con-tbody {
      max-height: calc(100vh - 110px) !important;
    }
  }
  .date-popup {
    .mx-datepicker-range {
      width: 201px;
      @media (max-width: 425px) {
        width: 100% !important;
      }
    }
    .mx-input {
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: none;
      padding-left: 30px;
      padding-right: 10px;
      height: 37px;
    }
    .mx-input-wrapper {
      .mx-icon-calendar,
      .mx-icon-clear {
        left: 8px;
      }
    }
  }

  .Calender {
    .vs-card--header {
      display: flex !important ;
      justify-content: space-between;
    }
  }
  .width {
    @media (max-width: 768px) {
      margin-top: 5px;
      width: 145px;
    }
    @media (max-width: 500px) {
      width: 100%;
    }
    @media (max-width: 425px) {
      margin-top: 0px;
    }
  }
}

.mx-range-wrapper {
  .mx-calendar-panel-date {
    &:last-child {
      display: none;
    }
  }
}
.vuesax-app-is-ltr {
  .teamInvoice_payment {
    .vs-table--search {
      max-width: 100%;

      @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.desc {
  margin-top: -1.25rem !important;
  @media (max-width: 425px) {
    margin-top: -0.25rem !important;
  }
}
.searchbar-input {
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 0.9rem;
  border-radius: 5px;
}

.search-input-wrapper {
  width: 800px !important;
  @media (max-width: 768px) {
    width: 100%;
  }
}
</style>

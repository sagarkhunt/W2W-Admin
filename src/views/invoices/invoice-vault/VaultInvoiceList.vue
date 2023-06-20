<template>
  <div id="table-loading" class="vs-con-loading__container invoice_vault">
    <div class="mb-6 desc">{{ $t('here_you_can_see_all_approved_invoices') }}</div>
    <div class="vx-card md:p-8 p-6 md:pb-1">
      <vs-table
        class="vs-con-loading__container vh-hight-table"
        stripe
        :sst="true"
        maxHeight="750px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCount"
        :max-items="length"
        search
        :data="invoiceValutData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="invoice_to">{{ $t('company_name') }}</vs-th>
          <vs-th sort-key="invoice_number">{{ $t('invoice_Number') }}</vs-th>
          <vs-th sort-key="sub_total">{{ $t('sub_total') }}</vs-th>
          <vs-th sort-key="payment_date">{{ $t('payment_date') }}</vs-th>
          <vs-th sort-key="due_date">{{ $t('due_date') }}</vs-th>
          <vs-th sort-key="invoice_by">{{ $t('user_name') }}</vs-th>
          <vs-th>{{ $t('status') }}</vs-th>
          <vs-th>{{ $t('verify') }}</vs-th>
        </template>
        <template slot="header">
          <div class="md:whitespace-no-wrap lg:mb-3 md:mb-1 mb-3 xl:mr-4 md:mr-2 mr-0 w-auto ag-grid-table-actions-left mb-2">
            <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
              <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">
                  {{ page * length - (length - (FilteredCount && 1)) }}
                  -
                  {{ FilteredCount - page * length > 0 ? page * length : FilteredCount }}
                  {{ $t('of') }} {{ FilteredCount }}
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
          <div class="flex md:flex-no-wrap flex-wrap items-end mb-3 xl:w-full lg:w-auto w-full order-3 lg:order-0">
            <div class="width xl:mr-4 md:mr-2 mr-0">
              <select-2
                id="filterby"
                class="w-full"
                :value="filterBy"
                @input="(item) => (filterBy = item && item.value)"
                placeholder="Filter by"
                name="Filter by"
                autocomplete
                :options="SearchByTypes.map(x=>({...x, label: $t(x.label)}))"
              />
            </div>
            <div class="width xl:mr-4 md:mr-2 mr-0">
              <select-2
                id="quickPay"
                class=""
                :value="quickPay"
                @input="(item) => (quickPay = item && item.value)"
                placeholder="Select quickpay"
                name="Select quickpay"
                autocomplete
                :options="QuickPayTypes.map(x=>({...x, label: $t(x.label)}))"
              />
            </div>

            <div class="md:mb-0 mr-0.5 ag-grid-table-actions-left lg:mt-0 sm:mt-2 sm:w-auto w-full">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.SelectDate')" class="Calender sm:w-auto w-full">
                  <div class="date-popup xl:mr-4 lg:mr-2 mr-0">
                    <date-picker v-model="range" range @change="selectDate($event)"> </date-picker>
                  </div>
                </vx-tooltip>
              </vs-row>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>{{ tr.company && tr.company.company_name }}</vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewInvoiceRecord(tr)">{{ tr.invoice_number }}</p>
              </div>
            </vs-td>
            <vs-td>€ {{ tr.company_pay_amount.toFixed(2) || '-' }}</vs-td>
            <vs-td> {{ tr.payment_date == null ? '-' : formatDate(tr.payment_date) }}</vs-td>
            <vs-td>{{ formatDate(tr.due_date) }}</vs-td>
            <vs-td>{{ (tr.seeker && tr.seeker.user && tr.seeker.user.full_name) || '-' }} </vs-td>
            <vs-td>
              <vs-switch color="primary" v-model="tr.invoiceApproved" vs-value="active" @input="updateToApprovedInvoice(tr.id, tr.invoiceApproved)">
                <span slot="on">{{ $t('true') }}</span>
                <span slot="off">{{ $t('false') }}</span>
              </vs-switch>
            </vs-td>
            <vs-td>
              <vs-switch color="primary" v-model="tr.verified" vs-value="active" @input="updateToVerifyInvoiceVault(tr.id, tr.verified)">
                <span slot="on">{{ $t('verified') }}</span>
                <span slot="off">{{ $t('verify') }}</span>
              </vs-switch>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <div class="centerx">
        <vs-pagination :total="Math.ceil(FilteredCount / length)" v-model="page"></vs-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import Select2 from '../../../components/custom/form-elements/Select2.vue'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  name: 'InvoiceVaultList',
  components: { Select2, DatePicker },
  data() {
    return {
      length: 10,
      page: 1,
      type: 'vault',
      form: {
        SearchById: null
      },
      filterBy: '',
      quickPay: '',
      //date Picker
      range: {},
      start_date: '',
      end_date: ''
    }
  },
  mixins: [dateMixins],
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('invoice', ['loading', 'SearchByTypes', 'QuickPayTypes', 'FilteredCount', 'total', 'totalDocument', 'totalRecordDocument', 'vaultInvoice', 'invoicedRecords']),
    invoiceValutData() {
      return this.invoicedRecords.reduce((acc, item) => {
        item.invoiceStatus = item.verified === false ? false : true
        item.invoiceApproved = item.approved === false ? false : true
        acc.push(item)
        return acc
      }, [])
    }
  },
  methods: {
    ...mapActions('invoice', {
      getAllInvoiceRecord: 'getAllInvoiceRecord',
      updateVerifyStatus: 'updateVerifyStatus',
      updateApprovedStatus: 'updateApprovedStatus'
    }),
    sendToInvoiceList() {
      this.$router.push('/all-invoices/list')
    },
    handleChangeLength(length) {
      this.page = 1
      this.length = length
      this.getData()
    },
    handleChangePage(page) {
      this.page = page
      this.getData()
    },
    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getData()
    },
    handleSort(key, active) {
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },
    getData() {
      this.getAllInvoiceRecord({
        limit: this.length,
        page: this.page,
        search: this.search,
        invoice_type: this.type,
        filter_by: this.filterBy,
        quick_pay: this.quickPay,
        order: this.order,
        start_date: this.start_date,
        end_date: this.end_date
      })
    },
    //Select Date
    selectDate(event) {
      this.start_date = moment(event[0]).format('YYYY-MM-DD') || null
      this.end_date = moment(event[1]).format('YYYY-MM-DD') || null
      this.getData()
    },
    // update status approved
    async updateToApprovedInvoice(id, status) {
      try {
        const { message } = await this.updateApprovedStatus({
          id,
          status
        })
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.getData()
      } catch (err) {
        const { message } = err
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },
    async updateToVerifyInvoiceVault(id, status) {
      try {
        const { message } = await this.updateVerifyStatus({
          id,
          status
        })
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.getData()
      } catch (err) {
        const { message } = err
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },
    //view invoice details
    viewInvoiceRecord(tr) {
      this.$router.push(`/all-invoices/${tr.id}/view`)
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

    page() {
      this.handleChangePage(this.page)
    },
    quickPay: {
      handler(newVal) {
        this.page = 1
        this.getData()
      }
    },

    filterBy: {
      handler(newVal) {
        this.page = 1
        this.getData()
      }
    }
  }
}
</script>

<style lang="scss">
.invoice_vault {
  .remove-tip {
    .vs-dropdown--menu--after {
      display: none;
    }
  }
  .vs-table--header {
    @media (max-width: 768px) {
      display: flex;
      flex-wrap: wrap;
    }
    @media (min-width: 1024px) {
      flex-wrap: nowrap;
    }
  }
  .vs-table--search {
    max-width: 200px;
    order: 3;
    @media (max-width: 768px) {
      order: 2;
    }
    @media (max-width: 425px) {
      max-width: 63%;
    }
  }
  .vs-table--search-input {
    padding: 5px 10px;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    font-size: 0.7rem;
    width: 200px;
    color: rgba(0, 0, 0, 0.7);
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;

    @media (max-width: 576px) {
      width: 100%;
    }
  }

  .vs-con-dropdown {
    @media (max-width: 576px) {
      white-space: nowrap;
    }
  }
  .vh-hight-table {
    .vs-con-tbody {
      max-height: calc(100vh - 110px) !important;
    }
  }

  .date-popup {
    .mx-datepicker-range {
      width: 216px;
      @media (max-width: 425px) {
        width: 100%;
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

  .lg\:order-0 {
    @media (min-width: 992px) {
      order: 0 !important;
    }
  }
  .width {
    @media (max-width: 1024px) {
      width: 180px;
    }
    @media (max-width: 768px) {
      margin-top: 5px;
      width: 207px;
    }
    @media (max-width: 500px) {
      width: 100%;
    }
    @media (max-width: 425px) {
      margin-top: 0px;
      margin-bottom: 8px;
    }
  }

  .vs-con-table {
    .vs-table--header {
      .vs-table--search {
        padding: 0;
        margin: 0 0 0.75rem 0;
        @media (max-width: 992px) {
          margin-bottom: 2px;
        }
        @media (max-width: 575px) {
          margin-bottom: 10px;
        }
      }
    }
  }
}

.vuesax-app-is-ltr {
  .invoice_vault {
    .vs-table--search {
      @media (max-width: 768px) {
        margin-left: 17px;
      }
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
</style>
<style lang="scss" scoped>
.desc {
  margin-top: -1.25rem !important;
  @media (max-width: 425px) {
    margin-top: -0.25rem !important;
  }
}
</style>

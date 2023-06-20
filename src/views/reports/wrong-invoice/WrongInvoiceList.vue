<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_can_see_statistics_of_wrong_invoices') }}</div>
    <div class="vx-card md:p-8 p-6">
      <!-- filters -->
      <div class="vx-row mb-3">
        <!-- from date -->
        <div class="mb-3 vx-col w-full md:w-1/3">
          <label for="industry" class="mb-5">{{ $t('from_date') }} </label>
          <date-picker v-model="form.from_date" mode="date" class="w-full">
            <template v-slot="{ inputValue, inputEvents }">
              <vs-input class="w-full" v-validate="'required'" name="Date of Birth" :value="inputValue" v-on="inputEvents" readonly />
            </template>
          </date-picker>
          <span class="text-primary text-sm" v-show="errors.has('Date of Birth')">{{ errors.first('Date of Birth') }}</span>
        </div>

        <!-- tp date -->
        <div class="mb-3 vx-col w-full md:w-1/3">
          <label for="industry" class="mb-5">{{ $t('to_date') }} </label>
          <date-picker v-model="form.to_date" mode="date" class="w-full">
            <template v-slot="{ inputValue, inputEvents }">
              <vs-input class="w-full" v-validate="'required'" name="Date of Birth" :value="inputValue" v-on="inputEvents" readonly />
            </template>
          </date-picker>
          <span class="text-primary text-sm" v-show="errors.has('Date of Birth')">{{ errors.first('Date of Birth') }}</span>
        </div>

        <!-- action btn -->
        <div class="mb-3 vx-col w-full md:w-1/3 flex items-end">
          <vs-button class="mr-2 vs-con-loading__container" id="create-chapter" @click="showReport" type="relief"> {{ $t('show_report') }}</vs-button>
        </div>
      </div>

      <!-- invoice table -->
      <vs-table
        class="vs-con-loading__container"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredWrongInvoice"
        pagination
        :max-items="this.length"
        search
        :data="wrongInvoiceRecordsData"
      >
        <!-- data export btns -->
        <template slot="header">
          <div class="flex md:justify-start sm:justify-end justify-start w-full">
            <div class="mb-4 lg:mb-0 md:mr-4 ag-grid-table-actions-left">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.ExportCSV')">
                  <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportCSV">{{ $t('csv') }}</vs-button>
                </vx-tooltip>
              </vs-row>
            </div>
            <div class="mb-4 lg:mb-0 md:mr-4 ag-grid-table-actions-left">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.ExportExcel')">
                  <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportExcel">{{ $t('excel') }}</vs-button>
                </vx-tooltip>
              </vs-row>
            </div>
          </div>
        </template>

        <!-- column slots -->
        <template slot="thead">
          <vs-th sort-key="">{{ $t('paid_status') }}</vs-th>
          <vs-th sort-key="">{{ $t('payment_date') }} </vs-th>
          <vs-th sort-key="">{{ $t('created_date') }} </vs-th>
          <vs-th sort-key="">{{ $t('light_entrepreneur_name') }} </vs-th>
          <vs-th sort-key="">{{ $t('invoice_no') }}</vs-th>
          <vs-th sort-key="">{{ $t('gross_salary') }} </vs-th>
          <vs-th sort-key="">{{ $t('paid_to_account') }} </vs-th>
          <vs-th sort-key="">{{ $t('other_compensations') }} </vs-th>
          <vs-th sort-key="">{{ $t('personal_tax(%)_amount') }} </vs-th>
          <vs-th sort-key="">{{ $t('w2w_commission') }} </vs-th>
          <vs-th sort-key="">{{ $t('food_allowance') }} </vs-th>
        </template>

        <!-- data -->
        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ tr.payment_status || '-' }}</vs-td>
            <vs-td>{{ (tr.payment_date && formatDate(tr.payment_date)) || '-' }}</vs-td>
            <vs-td>{{ (tr.created_at && formatDate(tr.created_at)) || '-' }}</vs-td>
            <vs-td>{{ (tr.seeker && tr.seeker.user && tr.seeker.user.full_name) || '-' }}</vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewInvoiceRecord(tr)">{{ tr.invoice_number }}</p>
              </div>
            </vs-td>
            <vs-td>€ {{ tr.gross_salary.toFixed() }}</vs-td>
            <vs-td>€ {{ tr.sub_total.toFixed(2) }}</vs-td>
            <vs-td>€ {{ tr.other_compensation || 0 }}</vs-td>
            <vs-td>€ {{ tr.tax_amount.toFixed(2) }}</vs-td>
            <vs-td>€ {{ tr.w2w_commission_amount.toFixed(2) }}</vs-td>
            <vs-td>€ {{ tr.food_compensation.toFixed(2) || 0 }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <!-- invoice stats table -->
      <vs-table
        class="vs-con-loading__container"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredWrongInvoice"
        pagination
        :max-items="this.length"
        :data="[{}]"
      >
        <!-- data export btns -->
        <template slot="header">
          <div class="flex md:justify-start justify-end w-full">
            <div class="mb-4 md:mb-2 ag-grid-table-actions-left md:mr-4">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.ExportCSV')">
                  <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportAllTotalCSV">{{ $t('csv') }}</vs-button>
                </vx-tooltip>
              </vs-row>
            </div>
            <div class="mb-4 md:mb-2 ag-grid-table-actions-left md:mr-4">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.ExportExcel')">
                  <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportAllTotalExcel">{{ $t('excel') }}</vs-button>
                </vx-tooltip>
              </vs-row>
            </div>
          </div>
        </template>

        <!-- columns -->
        <template slot="thead">
          <vs-th>{{ $t('total_worked_hours_amount') }}</vs-th>
          <vs-th>{{ $t('total_paid_to_account') }} </vs-th>
          <vs-th>{{ $t('total_other_compensations') }} </vs-th>
          <vs-th>{{ $t('total_w2_w_commission') }} </vs-th>
        </template>

        <!-- data -->
        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>€ {{ totalWorkedHoursAmount.toFixed(2) }}</vs-td>
            <vs-td>€ {{ totalPaidToAccount.toFixed(2) }}</vs-td>
            <vs-td>€ {{ totalOtherCompensations.toFixed(2) }}</vs-td>
            <vs-td>€ {{ totalW2WCommission.toFixed(2) }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { mapActions, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

import moment from 'moment'

export default {
  name: 'WrongInvoice',

  components: {
    DatePicker
  },

  data() {
    return {
      totalWorkedHoursAmount: 0,
      totalPaidToAccount: 0,
      totalOtherCompensations: 0,
      totalW2WCommission: 0,
      totalFoodAllowance: 0,
      form: {
        companyCountryId: '',
        from_date: '',
        to_date: ''
      },
      length: 10,
      page: 1
    }
  },

  mixins: [dateMixins],

  mounted() {
    this.getData()
  },

  computed: {
    ...mapState('reports', ['loading', 'totalWrongInvoice', 'FilteredWrongInvoice', 'wrongInvoiceRecords']),
    wrongInvoiceRecordsData() {
      this.totalWorkedHoursAmount = 0
      this.totalPaidToAccount = 0
      this.totalOtherCompensations = 0
      this.totalW2WCommission = 0
      this.totalFoodAllowance = 0
      return this.wrongInvoiceRecords.reduce((acc, item) => {
        this.totalWorkedHoursAmount += Number(item.worked_value)
        this.totalPaidToAccount += Number(item.sub_total)
        this.totalW2WCommission += Number(item.w2w_commission_amount)

        let totalOtherCompensation = 0
        let totalFoodCompensation = 0
        item.worked_hours.reduce((accs, items) => {
          const dayCompensation = !items.day_compensation ? 0 : items.day_compensation
          const lunchCompensation = !items.lunch_compensation ? 0 : items.lunch_compensation
          totalOtherCompensation += Number(Math.round(items.other_compensation))
          totalFoodCompensation += Number(Math.round(lunchCompensation)) + Number(Math.round(dayCompensation))
          accs.push(items)
          return accs
        }, [])
        item.other_compensation = totalOtherCompensation
        item.food_compensation = totalFoodCompensation
        this.totalOtherCompensations += Number(totalOtherCompensation)
        this.totalFoodAllowance += Number(totalFoodCompensation)

        acc.push(item)
        return acc
      }, [])
    }
  },

  methods: {
    ...mapActions('reports', {
      getAllWrongInvoice: 'getAllWrongInvoice'
    }),
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
      this.getAllWrongInvoice({
        limit: this.length,
        page: this.page,
        search: this.search,
        invoice_type: 'negative',
        order: this.order,
        start_date: (this.form.from_date && moment(this.form.from_date).format('YYYY-MM-DD')) || '',
        end_date: (this.form.to_date && moment(this.form.to_date).format('YYYY-MM-DD')) || ''
      })
    },
    showReport() {
      this.getAllWrongInvoice({
        invoice_type: 'negative',
        start_date: moment(this.form.from_date).format('YYYY-MM-DD'),
        end_date: moment(this.form.to_date).format('YYYY-MM-DD')
      })
    },
    viewSingleEmployer(id) {
      this.$router.push(`/jobseeker/${id}/info`)
    },
    // export export file
    exportCSV() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.wrongInvoiceRecords.map((item, index) => ({
          'Sr#': index + 1,
          'Paid Status': item.payment_status,
          'Payment Date': item.payment_date,
          'Created Date': item.created_at,
          'LE Name': item.seeker.user.full_name,
          'SSN ': item.seeker.ssn,
          'Tax Number': item.seeker.tax_number,
          'Invoice No': item.invoice_number,
          'Gross Salary': null,
          'Paid to Account': item.sub_total,
          'Other Compensations': null,
          'Personal Tax(%) Amount': item.tax_amount,
          'W2W Commission': item.w2w_commission,
          'Food allowance': null
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'Negative Invoices.csv')
    },
    // export export file
    exportExcel() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.wrongInvoiceRecords.map((item, index) => ({
          'Sr#': index + 1,
          'Paid Status': item.payment_status,
          'Payment Date': item.payment_date,
          'Created Date': item.created_at,
          'LE Name': item.seeker.user.full_name,
          'SSN ': item.seeker.ssn,
          'Tax Number': item.seeker.tax_number,
          'Invoice No': item.invoice_number,
          'Gross Salary': null,
          'Paid to Account': item.sub_total,
          'Other Compensations': null,
          'Personal Tax(%) Amount': item.tax_amount,
          'W2W Commission': item.w2w_commission,
          'Food allowance': null
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'Negative Invoices.xlsx')
    },
    //all over total export details
    // export export file
    exportAllTotalCSV() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.wrongInvoiceRecords.map((item, index) => ({
          'Total Worked Hours Amount': this.totalWorkedHoursAmount,
          'Total Paid to Account': this.totalPaidToAccount,
          'Total Other Compensations': this.totalOtherCompensations,
          'Total W2W Commission': this.totalW2WCommission
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'Negative Invoices.csv')
    },
    // export export file
    exportAllTotalExcel() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.wrongInvoiceRecords.map((item, index) => ({
          'Total Worked Hours Amount': this.totalWorkedHoursAmount,
          'Total Paid to Account': this.totalPaidToAccount,
          'Total Other Compensations': this.totalOtherCompensations,
          'Total W2W Commission': this.totalW2WCommission
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'Negative Invoices.xlsx')
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
    }
  }
}
</script>
<style lang="scss">
.is-interactive {
  z-index: 99999999 !important;
}
.d-flex {
  display: flex;
  align-items: center;
}
.status {
  color: rgb(0, 128, 0);
}
</style>
<style lang="scss">
.vs-table--header {
  @media (max-width: 576px) {
    display: flex;
    flex-wrap: wrap;
  }
}
.vs-table--search {
  max-width: 200px;

  @media (max-width: 576px) {
    width: 100%;
    max-width: 100%;
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
.vs-table--tbody-table {
  @media (max-width: 1024px) {
    min-width: 1300px;
  }
}
.vs-con-dropdown {
  @media (max-width: 576px) {
    white-space: nowrap;
  }
}
</style>
<style lang="scss" scoped>
.vs-button {
  @media (max-width: 425px) {
    padding: 0.75rem 1.8rem;
    font-size: 0.8rem;
    &:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
      padding: 0.55rem 1.5rem;
    }
  }
}
.desc {
  margin-top: -1.25rem !important;
  @media (max-width: 425px) {
    margin-top: -0.25rem !important;
  }
}
</style>

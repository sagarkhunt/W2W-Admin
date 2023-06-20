<template>
  <div id="table-loading" class="vs-con-loading__container cashpaid_list">
    <div class="mb-6 desc">{{ $t('here_you_can_see_overview_report_of_employer_payment') }}</div>
    <div class="vx-card md:p-8 p-6">
      <vs-table
        class="vs-con-loading__container"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCountCashPaid"
        pagination
        :max-items="this.length"
        search
        :data="cashInPaidRecords"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="company_name">{{ $t('employer_name') }} </vs-th>
          <vs-th>{{ $t('cash_paid') }} </vs-th>
          <vs-th sort-key="payment_date">{{ $t('paid_on') }} </vs-th>
          <vs-th sort-key="payment_date">{{ $t('created_on') }} </vs-th>
        </template>

        <template slot="header">
          <div class="md:whitespace-no-wrap mb-3 xl:mr-4 md:mr-2 mr-0 w-auto ag-grid-table-actions-left mb-2">
            <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
              <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">
                  {{ page * length - (length - (FilteredCountCashPaid && 1)) }}
                  -
                  {{ FilteredCountCashPaid - page * length > 0 ? page * length : FilteredCountCashPaid }}
                  {{ $t('of') }} {{ FilteredCountCashPaid }}
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
          <div class="flex md:flex-no-wrap flex-wrap items-end sm:mb-3 mb-0 xl:w-full lg:w-auto w-full order-3 lg:order-0 sm:justify-start justify-center">
            <div class="mb-4 md:mb-0 lg:mr-4 ag-grid-table-actions-left">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.ExportCSV')">
                  <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportCSV">{{ $t('csv') }}</vs-button>
                </vx-tooltip>
              </vs-row>
            </div>
            <div class="mb-4 md:mb-0 lg:mr-4 ag-grid-table-actions-left">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.ExportExcel')">
                  <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportExcel">{{ $t('excel') }}</vs-button>
                </vx-tooltip>
              </vs-row>
            </div>
            <div class="mb-4 md:mb-0 lg:mr-4 ag-grid-table-actions-left">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.DownloadPdf')">
                  <vs-button
                    class="mr-1 vs-con-loading__container"
                    id="cashPaid_pdf"
                    type="filled"
                    color="primary"
                    icon-pack="feather"
                    icon="icon-download"
                    @click="downloadCashPaidPDF(cashInPaidRecords)"
                  >
                    {{ $t('pdf_1') }}</vs-button
                  >
                </vx-tooltip>
              </vs-row>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              <div v-if="tr.invoice && tr.invoice.company && tr.invoice.company.company_name" class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewSingleEmployer(tr.invoice && tr.invoice.company && tr.invoice.company && tr.invoice.company.id)">
                  {{ (tr.invoice && tr.invoice.company && tr.invoice.company.company_name) || '-' }}
                </p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td>€ {{ parseFloat(tr.amount).toFixed(2) }} </vs-td>
            <vs-td>{{ formatDate(tr.payment_date) }} </vs-td>
            <vs-td>{{ formatDate(tr.created_at) }} </vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <div class="chart-wrapper" style="width: auto; margin: 0 auto; padding-top: 2.5rem">
        <vs-card class="cardx bg-green-500 Calender">
          <template slot="header" class="Calender">
            <!-- TABLE ACTION ROW -->
            <p class="font-bold text-xl mb-2">{{ $t('employer_cash_paid_in') }}</p>
            <div class="date-popup">
              <date-picker v-model="range" range @change="changeDate($event)"> </date-picker>
            </div>
          </template>

          <div class="chart-container mx-auto">
            <apexchart type="area" height="350" :options="chartOptions" :series="series"> {{ EmployerCashChart }} </apexchart>
          </div>
        </vs-card>
      </div>
    </div>
    <div id="pdf-container"></div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import Vue from 'vue'
import EmployerCashPaidReportsPdf from '../../pdf/EmployerCashPaidReports.vue'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/bar'
import { mapActions, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  name: 'CashInPaid',
  components: {
    // LineChart
    DatePicker
  },
  data() {
    return {
      range: {},
      chartOptions: {
        chart: {
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          height: 350,
          type: 'area',
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.8
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
      },
      series: [{ data: [] }],
      week_start_date: '',
      week_end_date: '',

      length: 10,
      page: 1,
      search: '',
      generating: false
    }
  },
  mixins: [dateMixins],
  mounted() {
    this.getData()
    this.ECashChartData()
  },
  computed: {
    ...mapState('reports', ['loading', 'totalCountCashPaid', 'employerCompanyId', 'FilteredCountCashPaid', 'cashInPaidRecords', 'EmplyerChartData']),
    EmployerCashChart() {
      this.cashPaidChart()
    }
  },
  methods: {
    ...mapActions('reports', {
      getAllEmployerCashPaid: 'getAllEmployerCashPaid',
      getInvoicesChartCreation: 'getInvoicesChartCreation'
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
    ECashChartData() {
      this.getInvoicesChartCreation({
        week_start_date: this.week_start_date,
        week_end_date: this.week_end_date
      })
    },
    getData() {
      this.getAllEmployerCashPaid({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order
      })
    },
    changeDate(event) {
      this.week_start_date = event[0] == null ? '' : moment(event[0]).format('YYYY-MM-DD')
      this.week_end_date = event[1] == null ? '' : moment(event[1]).format('YYYY-MM-DD')
      this.ECashChartData()
    },
    viewSingleEmployer(id) {
      this.$store.commit('employer/SET_STATE', {
        action: 'employerCompanyId',
        data: id
      })
      localStorage.setItem('employerCompanyId', id)
      this.$router.push(`/employer/${id}/info`)
    },

    // download employer cash paid list pdf
    async downloadCashPaidPDF(EmpCashPaidData) {
      this.generating = true

      setTimeout(() => {
        const ap = document.querySelector('#mount-node')
        if (ap) {
          ap.remove()
        }
        const ele = document.querySelector('#pdf-container')
        const mounteNode = document.createElement('div')
        mounteNode.id = 'mount-node'
        ele.append(mounteNode)

        const cashPaidPdf = Vue.extend(EmployerCashPaidReportsPdf)
        new cashPaidPdf({
          propsData: {
            empCashPaidData: EmpCashPaidData
          }
        })
          .$on('downloaded', () => {
            setTimeout(() => {
              this.generating = false
            }, 2000)
          })
          .$mount('#mount-node')
      }, 100)
    },
    // export export file
    exportCSV() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.cashInPaidRecords.map((item, index) => ({
          'Sr#': index + 1,
          'Employer Name': item.invoice.company.user.full_name,
          'Cash Paid': parseFloat(item.amount).toFixed(2),
          'Paid On': item.payment_date
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'Employer Cash Paid.csv')
    },

    // export export file
    exportExcel() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.cashInPaidRecords.map((item, index) => ({
          'Sr#': index + 1,
          'Employer Name': item.invoice.company.user.full_name,
          'Cash Paid': parseFloat(item.amount).toFixed(2),
          'Paid On': item.payment_date
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'Employer Cash Paid.xlsx')
    },
    //cash paid chart data Chart
    async cashPaidChart() {
      this.chartOptions = {
        xaxis: {
          categories: this.EmplyerChartData.map((item) => moment(item.end_date).format('YYYY-MM-DD'))
        }
      }
      this.series = [
        {
          name: 'Employer Paid Count',
          data: this.EmplyerChartData.map((item) => (item.emp_paid_count == null ? 0 : item.emp_paid_count))
        }
      ]
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
    generating() {
      if (this.generating) {
        this.$vs.loading({
          container: '#cashPaid_pdf',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#cashPaid_pdf  > .con-vs-loading')
      }
    }
  }
}
</script>

<style lang="scss">
.cashpaid_list {
  .vs-table--header {
    @media (max-width: 575px) {
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
      width: 100%;
      max-width: 30%;
    }

    @media (max-width: 575px) {
      order: 2;
      max-width: 63%;
    }
  }

  .remove-tip {
    .vs-dropdown--menu--after {
      display: none;
    }
  }

  .date-popup {
    .mx-datepicker-range {
      width: 216px;
    }

    .mx-input {
      border: 1px solid transparent;
      box-shadow: none;
    }
  }

  .Calender {
    .vs-card--header {
      display: flex !important;
      justify-content: space-between;
    }
  }

  .mx-range-wrapper {
    .mx-calendar-panel-date {
      &:last-child {
        display: none;
      }
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

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .vs-table--tbody-table {
    @media (max-width: 768px) {
      min-width: 900px;
    }
  }

  .chart-wrapper {
    width: auto;

    @media (max-width: 576px) {
      width: auto !important;
    }
  }
}

.vuesax-app-is-ltr {
  .cashpaid_list {
    .vs-table--search {
      @media (max-width: 768px) {
        margin-left: 17px;
      }
    }
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

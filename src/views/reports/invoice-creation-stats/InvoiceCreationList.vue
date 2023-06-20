<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_can_see_statistics_of_invoices_created_by_le') }}</div>
    <div class="vx-card md:p-8 p-6">
      <div class="vx-row d-flex flex-no-wrap items-end justify-between">
        <div class="vx-col w-full md:w-1/2">
          <label for="industry" class="mb-5">{{ $t('select_month') }} </label>
          <Select-2
            placeholder="Select month"
            :value="monthSelectId"
            @input="(item) => (monthSelectId = item && item.value)"
            icon-pack="feather"
            class="w-full mt-3"
            name="vat_type"
            v-validate="'required'"
            :options="MonthTypes.map(x=>({...x, label: $t(x.label)}))"
          />
        </div>
        <div class="vx-col w-full md:w-1/2 flex items-center justify-start">
          <vs-button class="md:mr-2 vs-con-loading__container" id="create-chapter" type="relief" @click="monthWiseSelecttion()">{{ $t('show_report') }}</vs-button>
        </div>
      </div>
      <vs-table class="vs-con-loading__container" stripe :sst="true" maxHeight="500px" noDataText="" :data="[]">
        <template slot="header">
          <div class="md:mb-0 md:mr-4 ag-grid-table-actions-left mt-5">
            <vs-row vs-justify="flex-end">
              <vx-tooltip :text="$t('tooltip.ExportCSV')">
                <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportCSV">{{ $t('csv') }}</vs-button>
              </vx-tooltip>
            </vs-row>
          </div>
          <div class="md:mb-0 md:mr-4 ag-grid-table-actions-left mt-5">
            <vs-row vs-justify="flex-end">
              <vx-tooltip :text="$t('tooltip.ExportExcel')">
                <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportExcel">{{ $t('excel') }}</vs-button>
              </vx-tooltip>
            </vs-row>
          </div>
        </template>
        <template slot="thead" class="mt-5">
          <vs-th>{{ $t('users_having_0_invoices') }}</vs-th>
          <vs-th>{{ $t('users_having_1_invoices') }}: </vs-th>
          <vs-th>{{ $t('users_having_less_than_or_equal_to_5_invoices') }} </vs-th>
          <vs-th>{{ $t('users_having_less_than_or_equal_to_10_invoices') }} </vs-th>
          <vs-th>{{ $t('users_having_less_than_or_equal_to_50_invoices') }} </vs-th>
        </template>

        <template ref="tableBody">
          <vs-tr>
            <vs-td>{{ creationSeekerCount.zero || '-' }}</vs-td>
            <vs-td>{{ creationSeekerCount.one || '-' }}</vs-td>
            <vs-td>{{ creationSeekerCount.two_to_five || '-' }}</vs-td>
            <vs-td>{{ creationSeekerCount.five_to_ten || '-' }}</vs-td>
            <vs-td>{{ creationSeekerCount.more_than_ten || '-' }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <vs-table
        class="vs-con-loading__container"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQueryInvoice"
        @change-page="handleChangePageInvoice"
        @sort="handleSortInvoice"
        :total="FilteredInvoiceCreation"
        pagination
        :max-items="this.lengthInvoice"
        search
        :data="invoiceCreationList"
      >
        <template slot="thead">
          <vs-th sort-key="invoice_by">{{ $t('invoice_by') }}</vs-th>
          <vs-th sort-key="total_invoice">{{ $t('total_invoices') }} </vs-th>
          <vs-th sort-key="created_at">{{ $t('last_invoice_created') }}</vs-th>
        </template>
        <template slot="header">
          <div class="flex flex-wrap justify-between items-center md:mb-3 md:w-auto w-full">
            <div class="mb-3 mt-3 md:mb-0 md:mr-4 ag-grid-table-actions-left md:w-auto w-full">
              <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2">
                    {{ pageInvoice * lengthInvoice - (lengthInvoice - (FilteredInvoiceCreation && 1)) }}
                    -
                    {{ FilteredInvoiceCreation - pageInvoice * lengthInvoice > 0 ? pageInvoice * lengthInvoice : FilteredInvoiceCreation }}
                    {{ $t('of') }} {{ FilteredInvoiceCreation }}
                  </span>
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu class="remove-tip">
                  <vs-dropdown-item @click="handleChangeLengthInvoice(10)">
                    <span>10</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="handleChangeLengthInvoice(20)">
                    <span>20</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="handleChangeLengthInvoice(50)">
                    <span>50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="handleChangeLengthInvoice(100)">
                    <span>100</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              <div class="inline-flex" v-if="tr.id" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewSingleJobseeker(tr.id, tr.userId)">{{ tr.full_name || '-' }}</p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td>{{ tr.invoice || '-' }}</vs-td>
            <vs-td>{{ (tr.last_invoice && formatDate(tr.last_invoice)) || '-' }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <div class="chart-wrapper" style="width: auto; margin: 0 auto; padding-top: 2.5rem">
        <vs-card class="cardx bg-green-500 Calender">
          <template slot="header" class="Calender">
            <!-- TABLE ACTION ROW -->
            <p class="font-bold text-xl mb-2">{{ $t('Invoices_Creation_Statistics') }}</p>
            <div class="date-popup">
              <date-picker v-model="range" range @change="changeDate($event)"> </date-picker>
            </div>
          </template>

          <div class="chart-container mx-auto">
            <apexchart type="area" height="350" :options="chartOptions" :series="series">{{ invoiceStaticData }}</apexchart>
          </div>
        </vs-card>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { mapActions, mapState } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import moment from 'moment'
import VueApexCharts from 'vue-apexcharts'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { dateMixins } from '@/mixins/dateMixins.js'

export default {
  name: 'InvoiceCreationList',
  components: {
    Select2,
    // LineChart
    apexchart: VueApexCharts,
    DatePicker
  },
  data() {
    return {
      form: {
        MonthId: null
      },
      length: 10,
      page: 1,
      search: '',
      lengthInvoice: 10,
      pageInvoice: 1,
      searchInvoice: '',
      chartData: '',
      months: [],
      amounts: [],
      range: {},
      week_start_date: '',
      week_end_date: '',
      chartOptions: {
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '40PX',
            borderRadius: 5,
            e̶n̶d̶i̶n̶g̶S̶h̶a̶p̶e̶: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },

        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return 'Invoice Created Count' + ':'
                }
              }
            }
          ]
        }
      },
      series: [{ data: [] }],
      monthSelectId: ''
    }
  },
  mixins: [dateMixins],
  async mounted() {
    this.getData()
    this.InvoiceCreationChart()
  },
  computed: {
    ...mapState('reports', [
      'loading',
      'creationSeekerCount',
      'invoiceChartCreationData',
      'MonthTypes',
      'invoiceCreationList',
      'totalInvoiceCreation',
      'FilteredInvoiceCreation',
      'InvoiceCreationChartData'
    ]),
    invoiceStaticData() {
      this.StaticChart()
    }
  },
  methods: {
    ...mapActions('reports', {
      invoiceCreationSeekerCount: 'invoiceCreationSeekerCount',
      getInvoicesChartCreation: 'getInvoicesChartCreation',
      getInvoiceCreationList: 'getInvoiceCreationList',
      getInvoiceCreationChartCreation: 'getInvoiceCreationChartCreation'
    }),
    //employer
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
    //invoice creation
    handleChangeLengthInvoice(lengthInvoice) {
      this.pageInvoice = 1
      this.lengthInvoice = lengthInvoice
      this.getData()
    },
    handleChangePageInvoice(pageInvoice) {
      this.pageInvoice = pageInvoice
      this.getData()
    },
    updateSearchQueryInvoice(val) {
      this.pageInvoice = 1
      this.searchInvoice = val
      this.getData()
    },
    handleSortInvoice(key, active) {
      this.pageInvoice = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },
    InvoiceCreationChart() {
      this.getInvoiceCreationChartCreation({ week_start_date: this.week_start_date, week_end_date: this.week_end_date })
    },
    getData() {
      this.invoiceCreationSeekerCount({
        months: this.monthSelectId
      }),
        //chart data
        this.getInvoiceCreationStats()
      //invoice creation list
      this.getInvoiceCreationList({
        limit: this.lengthInvoice,
        page: this.pageInvoice,
        search: this.searchInvoice,
        months: this.monthSelectId,
        order: this.order
      })
    },
    changeDate(event) {
      this.week_start_date = event[0] == null ? '' : moment(event[0]).format('YYYY-MM-DD')
      this.week_end_date = event[1] == null ? '' : moment(event[1]).format('YYYY-MM-DD')

      this.InvoiceCreationChart()
    },
    viewSingleJobseeker(id, userId) {
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfileId',
        data: userId
      })
      localStorage.setItem('seekerProfileInfoId', userId)
      this.$router.push(`/jobseeker/${id}/info`)
    },
    //select month wise
    monthWiseSelecttion() {
      this.getData()
    },
    randomize() {
      return [0].map((v) => {
        return Math.round(300 + Math.random() * 700) / 10
      })
    },
    getInvoiceCreationStats() {
      this.getInvoicesChartCreation({ months: this.monthSelectId })
    },
    //chart data
    async StaticChart() {
      this.chartOptions = {
        xaxis: {
          categories: this.InvoiceCreationChartData.map((item) => moment(item.end_date).format('DD.MM.YYYY'))
        }
      }

      this.series = [
        {
          data: this.InvoiceCreationChartData.map((item) => (item.invoice_created_count == null ? 0 : item.invoice_created_count))
        }
      ]
    },
    // export export file
    async exportCSV() {
      //invoice creation list
      await this.getInvoiceCreationList({
        limit: 0,
        page: 1,
        search: this.searchInvoice,
        months: this.monthSelectId,
        order: this.order
      }).then(({ data }) => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(
          data.map((item, index) => ({
            'Sr#': index + 1,
            'Job Seeker': item.full_name,
            'Total Invoices': item.invoice,
            'Last Invoice Created': item.last_invoice == null ? '-' : this.formatDate(item.last_invoice)
          }))
        )
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
        XLSX.writeFile(wb, 'Invoices Creation Statistics.csv')
      })
    },
    // export export file
    async exportExcel() {
      //invoice creation list
      await this.getInvoiceCreationList({
        limit: 0,
        page: 1,
        search: this.searchInvoice,
        months: this.monthSelectId,
        order: this.order
      }).then(({ data }) => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(
          data.map((item, index) => ({
            'Sr#': index + 1,
            'Job Seeker': item.full_name,
            'Total Invoices': item.invoice,
            'Last Invoice Created': item.last_invoice == null ? '-' : this.formatDate(item.last_invoice)
          }))
        )
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
        XLSX.writeFile(wb, 'Invoices Creation Statistics.xlsx')
      })
    },

    updateTheme(e) {
      this.chartOptions = {
        theme: {
          palette: e.target.value
        }
      }
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
.remove-tip {
  .vs-dropdown--menu--after {
    display: none;
  }
}
.vc-popover-content-wrapper {
  z-index: 9999 !important;
}
.vs-table--header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.vs-table--tbody {
  @media (max-width: 576px) {
    min-width: 900px;
  }
}
.chart-wrapper {
  @media (max-width: 576px) {
    width: auto !important;
  }
  .Linechart-width {
    @media (max-width: 576px) {
      width: 400px;
      height: 400px;
      margin: 0 auto;
    }
    @media (max-width: 480px) {
      width: 300px;
      height: 300px;
    }
  }
  #line-chart {
    @media (max-width: 375px) {
      max-width: 282px !important;
    }
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
    display: flex !important ;
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

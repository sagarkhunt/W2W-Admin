<template>
  <div id="table-loading" class="vs-con-loading__container paid_list">
    <div class="mb-6 desc">{{ $t('here_you_can_see_overview_report_of_le_payment') }}</div>
    <div class="vx-card md:p-8 p-6">
      <vs-table
        class="vs-con-loading__container"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCountPaidOut"
        pagination
        :max-items="length"
        search
        :data="paidOutRecords"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="seeker_name">{{ $t('light_entrepreneur_name') }} </vs-th>
          <vs-th>{{ $t('cash_paid') }} </vs-th>
          <vs-th sort-key="payment_date">{{ $t('payment_date') }} </vs-th>
          <vs-th sort-key="created_at">{{ $t('created_on') }} </vs-th>
        </template>

        <template slot="header">
          <div class="md:whitespace-no-wrap mb-3 xl:mr-4 md:mr-2 mr-0 w-auto ag-grid-table-actions-left mb-2">
            <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
              <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">
                  {{ page * length - (length - (FilteredCountPaidOut && 1)) }}
                  -
                  {{ FilteredCountPaidOut - page * length > 0 ? page * length : FilteredCountPaidOut }}
                  {{ $t('of') }} {{ FilteredCountPaidOut }}
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
                    id="leReport_pdf"
                    type="filled"
                    color="primary"
                    icon-pack="feather"
                    icon="icon-download"
                    @click="downloadLEReports(paidOutRecords)"
                    >{{ $t('pdf_1') }}</vs-button
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
              <div v-if="tr.invoice && tr.invoice.seeker && tr.invoice.seeker.user && tr.invoice.seeker.user.full_name">
                <p @click="viewSingleEntrepreneur(tr.invoice && tr.invoice.seeker && tr.invoice.seeker.user && tr.invoice.seeker.user.id, tr.invoice)">
                  {{ (tr.invoice && tr.invoice.seeker && tr.invoice.seeker.user && tr.invoice.seeker.user.full_name) || '-' }}
                </p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td>€ {{ tr.amount }} </vs-td>
            <vs-td> {{ formatDate(tr.payment_date) }} </vs-td>
            <vs-td> {{ formatDate(tr.created_at) }} </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <div class="chart-wrapper" style="width: auto; margin: 0 auto; padding-top: 2.5rem">
        <vs-card class="cardx bg-green-500 Calender">
          <template slot="header" class="Calender">
            <!-- TABLE ACTION ROW -->
            <p class="font-bold text-xl mb-2">{{ $t('le_salary_paid_out') }}</p>
            <div class="date-popup">
              <date-picker v-model="range" range @change="changeDate($event)"> </date-picker>
            </div>
          </template>

          <div class="chart-container mx-auto">
            <apexchart type="area" height="350" :options="chartOptions" :series="series">{{ LESalaryCashData }}</apexchart>
          </div>
        </vs-card>
      </div>
    </div>
    <div id="pdf-container"></div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { mapActions, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import LESalaryReports from '../../pdf/LESalaryPaidReports.vue'
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import moment from 'moment'

export default {
  name: 'PaidOutRecord',
  components: {
    // LineChart
    apexchart: VueApexCharts,
    DatePicker
  },
  data() {
    return {
      length: 10,
      page: 1,
      range: {},
      generating: false,
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
                  return 'LE Paid Amount' + ':'
                }
              }
            }
          ]
        }
      },
      series: [{ data: [] }]
    }
  },
  mixins: [dateMixins],
  mounted() {
    this.getData()
    this.LEpaidOutChart()
  },
  computed: {
    ...mapState('reports', ['loading', 'totalPaidOut', 'FilteredCountPaidOut', 'paidOutRecords', 'LEChartPaidData']),
    LESalaryCashData() {
      this.paidOutChart()
    }
  },
  methods: {
    ...mapActions('reports', {
      getAllPaidOutRecords: 'getAllPaidOutRecords',
      getLEChartCreation: 'getLEChartCreation'
    }),
    viewSingleEntrepreneur(id, data) {
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfileId',
        data: id
      })
      localStorage.setItem('seekerProfileInfoId', id)
      this.$router.push(`/jobseeker/${data.seeker.id}/info`)
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
    handleSort(key, active) {
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },
    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getData()
    },
    LEpaidOutChart() {
      this.getLEChartCreation({ week_start_date: this.week_start_date, week_end_date: this.week_end_date })
    },
    getData() {
      this.getAllPaidOutRecords({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order
      })
    },
    changeDate(event) {
      this.week_start_date = event[0] == null ? '' : moment(event[0]).format('YYYY-MM-DD')
      this.week_end_date = event[1] == null ? '' : moment(event[1]).format('YYYY-MM-DD')
      this.LEpaidOutChart()
    },
    viewSingleJobseeker(id) {
      this.$router.push(`/jobseeker/${id}/info`)
    },
    randomize() {
      return [0, 0, 0].map((v) => {
        return Math.round(300 + Math.random() * 700) / 10
      })
    },

    // download LE salary Paid List Report
    async downloadLEReports(LeSalaryReportData) {
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

        const paidOutReportPdf = Vue.extend(LESalaryReports)
        new paidOutReportPdf({
          propsData: {
            leSalaryReport: LeSalaryReportData
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
        this.paidOutRecords.map((item, index) => ({
          'Sr#': index + 1,
          'Job Seeker': (item.invoice && item.invoice.seeker && item.invoice.seeker.user && item.invoice.seeker.user.full_name) || '-',
          ' Amount ': parseFloat(item.amount).toFixed(2),
          'Payment Date': item.payment_date
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'LE Salary Paid Out.csv')
    },
    // export export file
    exportExcel() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.paidOutRecords.map((item, index) => ({
          'Sr#': index + 1,
          'Job Seeker': (item.invoice && item.invoice.seeker && item.invoice.seeker.user && item.invoice.seeker.user.full_name) || '-',
          'Amount ': parseFloat(item.amount).toFixed(2),
          'Payment Date': item.payment_date
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'LE Salary Paid Out.xlsx')
    },
    //chart data
    async paidOutChart() {
      this.chartOptions = {
        xaxis: {
          categories: this.LEChartPaidData.map((item) => moment(item.end_date).format('YYYY-MM-DD'))
        }
      }

      this.series = [
        {
          data: this.LEChartPaidData.map((item) => (item.le_paid_count == null ? 0 : item.le_paid_count))
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
          container: '#leReport_pdf',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#leReport_pdf  > .con-vs-loading')
      }
    }
  }
}
</script>

<style lang="scss">
.paid_list {
  .remove-tip {
    .vs-dropdown--menu--after {
      display: none;
    }
  }

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
}
.mx-range-wrapper {
  .mx-calendar-panel-date {
    &:last-child {
      display: none;
    }
  }
}

.vuesax-app-is-ltr {
  .paid_list {
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

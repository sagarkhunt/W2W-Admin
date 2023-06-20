<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_can_see_statistics_of_deductions_on_invoices') }}</div>
    <div class="vx-card md:p-8 p-6">
      <vs-table
        id="table-loading"
        class="vs-con-loading__container"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCountCashPaid"
        :max-items="length"
        search
        :data="deductionRecords"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="full_name">{{ $t('job_seeker') }} </vs-th>
          <vs-th sort-key="deduction_amount"> {{ $t('amount') }} </vs-th>
          <vs-th sort-key="vat"> {{ $t('vat') }} (%) </vs-th>
          <vs-th> {{ $t('vat_amount') }} </vs-th>
          <vs-th> {{ $t('total_amount') }} </vs-th>
          <vs-th> {{ $t('deduction_status') }} </vs-th>
          <vs-th sort-ket="payment_term"> {{ $t('payment_plan') }} </vs-th>
          <vs-th> {{ $t('payment_parts') }} </vs-th>
        </template>

        <template slot="header">
          <div class="flex flex-wrap md:justify-between justify-end items-center mb-3 md:w-auto w-full">
            <div class="mb-3 md:mr-4 ag-grid-table-actions-left md:w-auto w-full">
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

            <div class="md:mb-0 md:mr-4 ag-grid-table-actions-left">
              <vs-row vs-justify="flex-end">
                <div class="width mr-2">
                  <select-2
                    id="filterby"
                    class=""
                    :value="filterBy"
                    @input="(item) => (filterBy = item && item.value)"
                    placeholder="Select payment plan"
                    name="Select filterby"
                    autocomplete
                    :options="Payment_Term.map(x=>({...x, label: $t(x.label)}))"
                  />
                  <span class="text-primary text-sm" v-show="errors.has('Select Employer')">{{ errors.first('Select Employer') }}</span>
                </div>
                <vx-tooltip :text="$t('tooltip.ExportCSV')">
                  <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportCSV">{{ $t('csv') }}</vs-button>
                </vx-tooltip>
                <vx-tooltip :text="$t('tooltip.ExportExcel')">
                  <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportExcel">{{ $t('excel') }}</vs-button>
                </vx-tooltip>
              </vs-row>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>

            <vs-td>
              <div class="inline-flex" v-if="tr.seeker && tr.seeker.user && tr.seeker.user.full_name" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewSingleJobseeker(tr)">
                  {{ tr.seeker && tr.seeker.user && tr.seeker.user.full_name }}
                </p>
              </div>
              <div v-else>-</div>
            </vs-td>

            <vs-td>€ {{ Number(tr.did_amount).toFixed(2) }} </vs-td>
            <vs-td> {{ tr.vat }}</vs-td>
            <vs-td> {{ tr.vatAmount }}</vs-td>
            <vs-td>€ {{ Number(tr.deduction_amount).toFixed(2) }} </vs-td>
            <vs-td>
              <vs-button v-if="tr.status == 'paid'" size="small" color="success"> {{ $t('paid') }} </vs-button>
              <vs-button v-else size="small" class="warning"> {{ $t('pending') }} </vs-button>
            </vs-td>
            <vs-td>
              {{ tr.payment_term == 'in_parts' ? 'In parts' : tr.payment_term == 'fully' ? 'Full' : '-' || '-' }}
            </vs-td>
            <vs-td> {{ tr.total_parts }} </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <div class="centerx">
        <vs-pagination :total="Math.ceil(FilteredCountCashPaid / length)" v-model="page"></vs-pagination>
      </div>
      <div class="chart-wrapper" style="width: auto; margin: 0 auto; padding-top: 2.5rem">
        <vs-card class="cardx bg-green-500 Calender">
          <template slot="header" class="Calender">
            <!-- TABLE ACTION ROW -->
            <p class="font-bold text-xl mb-2">{{ $t('LE_Deductions') }}</p>
            <div class="date-popup">
              <date-picker v-model="range" range @change="changeDate($event)"> </date-picker>
            </div>
          </template>

          <div class="chart-container mx-auto">
            <apexchart type="area" height="350" :options="chartOptions" :series="series">{{ DeductionListData }}</apexchart>
          </div>
        </vs-card>
      </div>
    </div>

    <!-- Add Invoice Number -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="addInvoiceNumberPopup" :title="$t('add_invoice_number')">
      <div class="con-exemple-prompt">
        <vs-input placeholder="Invoice Number" vs-placeholder="Invoice Number" class="mt-3 w-full" />
      </div>
      <div class="footer text-right">
        <vs-button class="mt-2 text-sm p-3" color="primary" type="filled" @click="addInvoiceNumberPopup = false"> {{ $t('close') }} </vs-button>
        <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-success vs-button-filled p-3" type="submit">{{ $t('add') }}</button>
      </div>
    </vs-popup>
    <!-- End Add Invoice Number -->
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
// import LineChart from '@/components/chart/LineChart'
import VueApexCharts from 'vue-apexcharts'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'
import Select2 from '@/components/custom/form-elements/Select2.vue'

export default {
  name: 'LEDeductionsLists',
  components: {
    // LineChart,
    Select2,
    apexchart: VueApexCharts,
    DatePicker
  },
  data() {
    return {
      page: 1,
      length: 10,
      search: '',
      week_start_date: '',
      week_end_date: '',
      week_start_date: '',
      week_end_date: '',
      filterBy: '',
      colorx: '#f91f43',
      viewDocumentPopup: false,
      document_form: {
        title: '',
        description: '',
        sent_on: ''
      },
      addInvoiceNumberPopup: false,
      deducationPopup: false,
      range: {},
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
                  return 'Deduction Amount' + ':'
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
  async mounted() {
    this.getData()
    this.LEDeductionChartData()
  },
  computed: {
    ...mapState('reports', ['loading', 'totalCashPaid', 'FilteredCountCashPaid', 'DeductionRecords', 'Payment_Term', 'LEDeductionData']),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),

    DeductionListData() {
      this.leDecuxtionChart()
    },

    deductionRecords() {
      return this.DeductionRecords.reduce((acc, item) => {
        item.vatAmount = (item.did_amount * item.vat) / 100
        acc.push(item)
        return acc
      }, [])
    }
  },
  methods: {
    ...mapMutations('reports', { setState: 'SET_STATE' }),
    ...mapActions('reports', {
      getAllLEDeductionRecord: 'getAllLEDeductionRecord',
      LEDeductionChart: 'LEDeductionChart'
    }),

    // view record
    viewDeductionRecords(id, data) {
      this.$store.commit('reports/SET_STATE', {
        action: 'deductionRecordsInfo',
        data: data.deduction_history
      })
      this.$router.push(`/deduction/${id}/info`)
    },
    viewDeducationsRecord() {
      this.deducationPopup = true
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
    LEDeductionChartData() {
      this.LEDeductionChart({ week_start_date: this.week_start_date, week_end_date: this.week_end_date })
    },
    getData() {
      this.getAllLEDeductionRecord({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order,
        filter_by: this.filterBy
      })
    },
    changeDate(event) {
      this.week_start_date = event[0] == null ? '' : moment(event[0]).format('YYYY-MM-DD') || null
      this.week_end_date = event[1] == null ? '' : moment(event[1]).format('YYYY-MM-DD') || null
      this.LEDeductionChartData()
    },
    addInvoiceNumber() {
      this.addInvoiceNumberPopup = true
    },
    randomize() {
      return [0, 0, 0].map((v) => {
        return Math.round(300 + Math.random() * 700) / 10
      })
    },
    jobseekerView(id) {
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfileId',
        data: id
      })
      localStorage.setItem('seekerProfileInfoId', id)
      this.$router.push(`/jobseeker/${id}/info`)
    },
    viewSingleJobseeker(data) {
      const userId = data.seeker && data.seeker.user && data.seeker.user.id
      const seekerId = data.seeker && data.seeker.id
      localStorage.setItem('seekerProfileInfoId', userId)
      this.$router.push(`/jobseeker/${seekerId}/info`)
    },
    // export file
    async exportCSV() {
      await this.getAllLEDeductionRecord({
        limit: 0,
        page: 1,
        search: this.search,
        order: this.order,
        filter_by: this.filterBy
      }).then(({ data }) => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(
          data.map((item, index) => ({
            'Sr#': index + 1,
            'Job Seeker': item.seeker.user.full_name,
            Amount: item.did_amount.toFixed(2),
            'VAT (%)': item.vat,
            'VAT amount': 0,
            'Total Amount': item.deduction_amount.toFixed(2),
            'Deduction Status': item.status === 'paid' ? 'Paid' : 'Pending',
            'Payment Plan': item.payment_term === 'in_parts' ? 'In parts' : item.payment_term === 'fully' ? 'Full' : '-' || '-',
            'Payment Parts': item.total_parts
          }))
        )
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
        XLSX.writeFile(wb, 'Invoices Creation Statistics.csv')
      })
    },
    // export export file
    async exportExcel() {
      await this.getAllLEDeductionRecord({
        limit: 0,
        page: 1,
        search: this.search,
        order: this.order,
        filter_by: this.filterBy
      }).then(({ data }) => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(
          data.map((item, index) => ({
            'Sr#': index + 1,
            'Job Seeker': item.seeker.user.full_name,
            Amount: item.did_amount.toFixed(2),
            'VAT (%)': item.vat,
            'VAT amount': 0,
            'Total Amount': item.deduction_amount.toFixed(2),
            'Deduction Status': item.status === 'paid' ? 'Paid' : 'Pending',
            'Payment Plan': item.payment_term === 'in_parts' ? 'In parts' : item.payment_term === 'fully' ? 'Full' : '-' || '-',
            'Payment Parts': item.total_parts
          }))
        )
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
        XLSX.writeFile(wb, 'Invoices Creation Statistics.xlsx')
      })
    },
    // Le deduction chart
    async leDecuxtionChart() {
      this.chartOptions = {
        xaxis: {
          categories: this.LEDeductionData.map((item) => moment(item.end_date).format('YYYY-MM-DD'))
        }
      }

      this.series = [
        {
          data: this.LEDeductionData.map((item) => (item.total_deduction_amount == null ? 0 : item.total_deduction_amount.toFixed(2)))
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
    page() {
      this.handleChangePage(this.page)
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
.remove-tip {
  .vs-dropdown--menu--after {
    display: none;
  }
}
.vs-table--header {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  -ms-flex-align: center;
  -webkit-box-align: center;
  align-items: center;

  @media (max-width: 1240px) {
    flex-wrap: wrap;
  }
}

.vuesax-app-is-ltr .vs-table--search {
  max-width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
}

.vs-table--search {
  @media (max-width: 1240px) {
    margin-left: 0;
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

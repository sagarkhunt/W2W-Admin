<template>
  <div id="table-loading" class="vs-con-loading__container commission_list">
    <div class="mb-6 desc">{{ $t('here_you_can_see_compensation_statistics_based_on_le') }}</div>
    <div class="vx-card md:p-8 p-6">
      <vs-table
        class="vs-con-loading__container"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredInvoiceCommission"
        pagination
        :max-items="length"
        search
        :data="invoiceCommissionList"
      >
        <template slot="header">
          <div class="md:whitespace-no-wrap mb-3 xl:mr-4 md:mr-2 mr-0 w-auto ag-grid-table-actions-left mb-2">
            <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
              <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">
                  {{ page * length - (length - (FilteredInvoiceCommission && 1)) }}
                  -
                  {{ FilteredInvoiceCommission - page * length > 0 ? page * length : FilteredInvoiceCommission }}
                  {{ $t('of') }} {{ FilteredInvoiceCommission }}
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
        </template>
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="full_name">{{ $t('light_entrepreneur_name') }}</vs-th>
          <vs-th sort-key="vat">{{ $t('vat') }} (%)</vs-th>
          <vs-th sort-key="compensation_amount">{{ $t('total_compensation') }}</vs-th>
          <vs-th sort-key="tax">{{ $t('tax_percentage') }}</vs-th>
          <vs-th sort-key="tax_amount">{{ $t('paid_taxes') }}</vs-th>
          <vs-th sort-key="w2w_commission">{{ $t('w2_w_fee') }} %</vs-th>
          <vs-th sort-key="w2w_commission_amount">{{ $t('w2_w_fees_paid') }}</vs-th>
          <vs-th sort-key="commission_amount">{{ $t('total_social_benefits') }} + {{ $t('insurance') }}</vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              <div class="inline-flex" v-if="tr.id" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewSingleJobseeker(tr.seeker && tr.seeker.user && tr.seeker.user.id, tr)">{{ (tr.seeker && tr.seeker.user && tr.seeker.user.full_name) || '-' }}</p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td>{{ tr.vat || 0 }} %</vs-td>
            <vs-td>€ {{ Number(tr.compensation_amount).toFixed(2) || 0 }}</vs-td>
            <vs-td>{{ tr.tax || '0' }}%</vs-td>
            <vs-td>€ {{ Number(tr.tax_amount).toFixed(2) || 0 }}</vs-td>
            <vs-td>{{ Number(tr.w2w_commission).toFixed(2) || 0 }} %</vs-td>
            <vs-td>€ {{ Number(tr.w2w_commission_amount).toFixed(2) || 0 }}</vs-td>
            <vs-td>€ {{ Number(tr.commission_amount).toFixed(2) || '0' }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <div class="chart-wrapper" style="width: auto; margin: 0 auto; padding-top: 2.5rem">
        <vs-card class="cardx bg-green-500 Calender">
          <template slot="header" class="Calender">
            <!-- TABLE ACTION ROW -->
            <p class="font-bold text-xl mb-2">{{ $t('Invoice_Commissions') }}</p>
            <div class="date-popup">
              <date-picker v-model="range" range @change="changeDate($event)"> </date-picker>
            </div>
          </template>

          <div class="chart-container mx-auto">
            <apexchart type="area" height="350" :options="chartOptions" :series="series">{{ InvoiceCommisionData }}</apexchart>
          </div>
        </vs-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import VueApexCharts from 'vue-apexcharts'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  name: 'InvoiceCommissionList',
  components: {
    Select2,
    // LineChart
    apexchart: VueApexCharts,
    DatePicker
  },
  data() {
    return {
      form: {
        companyCountryId: ''
      },
      length: 10,
      page: 1,
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
                  return 'Commision Amount' + ':'
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
    this.InvoiceCommission()
  },
  computed: {
    ...mapState('reports', ['loading', 'totalInvoiceCommission', 'FilteredInvoiceCommission', 'invoiceCommissionList', 'InvComissionChartData', 'InvoiceCommissionChartData']),
    InvoiceCommisionData() {
      this.invoiceCommissionChart()
    }
  },
  methods: {
    ...mapActions('reports', {
      getInvoiceComission: 'getInvoiceComission',
      getInvoiceCommissionChart: 'getInvoiceCommissionChart'
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
    InvoiceCommission() {
      this.getInvoiceCommissionChart({ week_start_date: this.week_start_date, week_end_date: this.week_end_date })
    },
    getData() {
      this.getInvoiceComission({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order
      })
    },
    changeDate(event) {
      this.week_start_date = event[0] == null ? '' : moment(event[0]).format('YYYY-MM-DD')
      this.week_end_date = event[1] == null ? '' : moment(event[1]).format('YYYY-MM-DD')
      this.InvoiceCommission()
    },
    async invoiceCommissionChart() {
      this.chartOptions = {
        xaxis: {
          categories: this.InvoiceCommissionChartData.map((item) => moment(item.end_date).format('YYYY-MM-DD'))
        }
      }

      this.series = [
        {
          data: this.InvoiceCommissionChartData.map((item) => (item.commission_amount == null ? 0 : item.commission_amount.toFixed(2)))
        }
      ]
    },
    viewSingleJobseeker(id, data) {
      localStorage.setItem('seekerProfileInfoId', id)
      this.$router.push(`/jobseeker/${data.seeker.id}/info`)
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
.commission_list {
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

    @media (max-width: 576px) {
      width: 100%;
    }
  }
  .vs-table--tbody-table {
    @media (max-width: 1024px) {
      min-width: 1300px;
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
  .commission_list {
    .vs-table--search {
      @media (max-width: 768px) {
        margin-left: 17px;
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
</style>

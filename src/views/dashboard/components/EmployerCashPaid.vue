<template>
  <div class="recently_added__items" id="CashPaid">
    <vs-card class="cardx bg-green-500">
      <vs-table id="table-loading" stripe maxHeight="500px" noDataText="" :data="employerCashPaid">
        <template slot="header">
          <!-- TABLE ACTION ROW -->
          <p class="font-bold text-xl mb-2">{{ $t('employer_cash_paid_in') }}</p>
        </template>
        <div class="chart-container mx-auto dashboard-charts">
          <apexchart type="area" height="350" :options="chartOptions" :series="series"> {{ ECashpaid }} </apexchart>
        </div>
      </vs-table>
    </vs-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import VueApexCharts from 'vue-apexcharts'
import moment from 'moment'
export default {
  name: 'EmployerCashPaid',
  components: {
    // LineChart
    apexchart: VueApexCharts
  },

  data() {
    return {
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
      series: [{ data: [] }]
    }
  },
  mixins: [dateMixins],

  computed: {
    ...mapState('dashboard', ['loading', 'employerCashPaid', 'employerCashTotalPaid', 'EmployerCashData']),
    ECashpaid() {
      this.dashboardCashPaidChart()
    }
  },
  methods: {
    //cash paid chart data Chart
    async dashboardCashPaidChart() {
      this.chartOptions = {
        xaxis: {
          categories: this.EmployerCashData && this.EmployerCashData.map((item) => moment(item.end_date).format('YYYY-MM-DD'))
        }
      }
      this.series = [
        {
          name: 'Employer Paid Count',
          data: this.EmployerCashData && this.EmployerCashData.map((item) => (item.emp_paid_count == null ? 0 : item.emp_paid_count.toFixed(2)))
        },
        {
          name: 'Commision Amount',
          data: this.EmployerCashData && this.EmployerCashData.map((item) => (item.commission_amount == null ? 0 : item.commission_amount.toFixed(2)))
        },
        {
          name: 'Created Count',
          data: this.EmployerCashData && this.EmployerCashData.map((item) => (item.invoice_created_count == null ? 0 : item.invoice_created_count))
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
    }
  }
}
</script>

<style scoped lang="scss">
.chart-container {
  .vs-table--tbody-table {
    min-width: 0px;
  }
}
</style>

<style lang="scss">
#CashPaid {
  #line-chart {
    @media (min-width: 2560px) {
      height: 492px !important;
      max-width: 510px !important;
    }

    @media (min-width: 1440px) {
      height: 492px !important;
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

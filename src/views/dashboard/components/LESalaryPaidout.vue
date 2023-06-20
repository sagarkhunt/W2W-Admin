<template>
  <div class="recently_added__items">
    <vs-card class="cardx bg-green-500">
      <vs-table stripe maxHeight="500px" :data="leSalaryPaidOut">
        <template slot="header">
          <!-- TABLE ACTION ROW -->
          <p class="font-bold text-xl mb-2">{{ $t('le_salary_paid_out') }}</p>
        </template>

        <div class="chart-container mx-auto dashboard-charts">
          <apexchart type="bar" height="350" :options="chartOptions" :series="series">{{ LEcashChartData }}</apexchart>
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
  name: 'DashboardLESalariPaidout',
  components: {
    // LineChart
    apexchart: VueApexCharts
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'bar',
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
            barHeight: '30PX',
            borderRadius: 10,
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
                  return 'Paid Amount' + ':'
                }
              }
            }
          ]
        }
      },
      series: [{ data: [] }]
    }
  },
  computed: {
    ...mapState('dashboard', ['loading', 'leSalaryPaidOutTotalPaid', 'leSalaryPaidOut', 'LECashData']),
    LEcashChartData() {
      this.dashboardPaidOutChart()
    }
  },
  mixins: [dateMixins],
  methods: {
    //chart data le paid out
    async dashboardPaidOutChart() {
      const res = this.LECashData.map((item) => {
        return item.seeker ? (item.seeker.user ? item.seeker.user.full_name : '') : ''
      })

      this.chartOptions = {
        xaxis: {
          categories: res
        }
      }

      this.series = [
        {
          data: this.LECashData && this.LECashData.map((item) => item.amount_paid)
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

<template>
  <div class="recently_added__items">
    <vs-card class="cardx bg-green-500">
      <vs-table noDataText="" :data="[]">
        <template slot="header">
          <!-- TABLE ACTION ROW -->
          <p class="font-bold text-xl mb-2">{{ $t('most_paid_le_top_5') }}</p>
        </template>

        <div class="chart-container mx-auto dashboard-charts">
          <apexchart type="bar" height="350" :options="chartOptions" :series="series">{{ MostPaidData }}</apexchart>
        </div>
      </vs-table>
    </vs-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'DashboardMostPaidLE',
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
            horizontal: false,
            columnWidth: '30px',
            borderRadius: 6,
            e̶n̶d̶i̶n̶g̶S̶h̶a̶p̶e̶: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },

        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return 'Most Paid :'
            }
          }
        }
      },
      series: [{ data: [] }]
    }
  },
  computed: {
    ...mapState('dashboard', ['loading', 'dashboardsData', 'MostPaidLEData']),
    MostPaidData() {
      this.dashboardLightMostPaidLE()
    }
  },
  mixins: [dateMixins],
  methods: {
    //chart data le paid out
    async dashboardLightMostPaidLE() {
      this.chartOptions = {
        xaxis: {
          categories: this.MostPaidLEData && this.MostPaidLEData.map((item) => item.full_name)
        }
      }
      this.series = [
        {
          name: 'Free Cash Flow',
          data: this.MostPaidLEData && this.MostPaidLEData.map((item) => item.amount_paid)
        }
      ]
    }
  },
  watch: {
    dashboardsData() {
      //pie chart emp
      this.dashboardLightMostPaidLE()
    },
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
<style lang="scss" scoped>
.vs-table--tbody-table {
  min-width: 300px;
}
</style>

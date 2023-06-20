<template>
  <div class="recently_added__items">
    <vs-card class="cardx bg-green-500">
      <vs-table stripe maxHeight="500px" noDataText="" :data="[]">
        <template slot="header">
          <!-- TABLE ACTION ROW -->
          <p class="font-bold text-xl mb-2">{{ $t('employer') }}</p>
        </template>

        <div class="chart-container mx-auto dashboard-charts" id="chart4">
          <apexchart type="line" height="350" :options="chartOptions" :series="series">{{ EmpData }}</apexchart>
        </div>
      </vs-table>
    </vs-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
import moment from 'moment'

export default {
  name: 'DashboardEmployer',
  components: {
    // LineChart
    apexchart: VueApexCharts
  },
  data() {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [2],
          curve: 'smooth',
          dashArray: [0]
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },

        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + ':'
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val + ' :'
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val + ':'
                }
              }
            }
          ]
        },
        grid: {
          borderColor: '#f1f1f1'
        },
        colors: ['#228B22', '#FFD700', '	#DC143C ']
      },
      series: []
    }
  },
  computed: {
    ...mapState('dashboard', ['loading', 'EmployerData']),
    EmpData() {
      this.dashboardEmpPieChart()
    }
  },
  methods: {
    //chart data le paid out
    async dashboardEmpPieChart() {
      this.chartOptions = {
        xaxis: {
          categories: this.EmployerData && this.EmployerData.map((item) => moment(item.end_date).format('YYYY-MM-DD'))
        }
      }
      this.series = [
        {
          name: 'Active Employer',
          data: this.EmployerData && this.EmployerData.map((item) => (item.active_emp == null ? 0 : item.active_emp))
        },
        {
          name: 'Pending Employer',
          data: this.EmployerData && this.EmployerData.map((item) => (item.blocked_emp == null ? 0 : item.blocked_emp))
        },
        {
          name: 'Blocked Employer',
          data: this.EmployerData && this.EmployerData.map((item) => (item.pending_emp == null ? 0 : item.pending_emp))
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

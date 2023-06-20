<template>
  <div class="recently_added__items">
    <vs-card class="cardx bg-green-500">
      <!-- TABLE ACTION ROW -->
      <vs-table noDataText="" :data="[]">
        <template slot="header">
          <p class="font-bold text-xl mb-2">{{ $t('light_enterpreneur') }}</p>
        </template>

        <div class="chart-container mx-auto dashboard-charts" id="chart3">
          <apexchart type="line" height="350" :options="chartOptions" :series="series">{{ LEChart }}</apexchart>
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
  name: 'DashboardLightEnterpreneur',
  components: {
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
        colors: ['#228B22', '#FFD700', '#DC143C']
      },
      series: [{ data: [] }]
    }
  },
  mixins: [dateMixins],
  computed: {
    ...mapState('dashboard', ['loading', 'LEData']),
    LEChart() {
      this.dashboardLightEnterpreneur()
    }
  },
  methods: {
    //chart data le paid out
    async dashboardLightEnterpreneur() {
      this.chartOptions = {
        xaxis: {
          categories: this.LEData && this.LEData.map((item) => moment(item.end_date).format('YYYY-MM-DD'))
        }
      }
      this.series = [
        {
          name: 'Active LE',
          data: this.LEData && this.LEData.map((item) => (item.active_le == null ? 0 : item.active_le))
        },
        {
          name: 'Pending LE',
          data: this.LEData && this.LEData.map((item) => (item.pending_le == null ? 0 : item.pending_le))
        },
        {
          name: 'Blocked LE',
          data: this.LEData && this.LEData.map((item) => (item.blocked_le == null ? 0 : item.blocked_le))
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

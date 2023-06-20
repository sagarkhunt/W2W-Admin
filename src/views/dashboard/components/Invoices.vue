<template>
  <div class="recently_added__items">
    <vs-card class="cardx bg-green-500">
      <vs-table stripe maxHeight="500px" noDataText="" :data="[]">
        <template slot="header">
          <!-- TABLE ACTION ROW -->
          <p class="font-bold text-xl mb-2">{{ $t('invoices') }}</p>
        </template>

        <div class="chart-container mx-auto dashboard-charts" id="chart5">
          <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
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
  name: 'DashboardInvoice',
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
          stacked: true
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
    ...mapState('dashboard', ['loading', 'dashboardsData'])
  },
  methods: {
    //chart data le paid out
    async dashboardEmpPieChart() {
      const res = ['Total Count', 'Approved Count', 'Invoice this Month', 'Invoice Last Month', 'Salary Pending', 'Invoice Pending', 'Total Created', 'Completed Inovoice', 'Pending Invoice']
      const res2 = [
        this.dashboardsData.invoice.total_count,
        this.dashboardsData.invoice.approved_count,
        this.dashboardsData.invoice.invoiceThisMonth.totalInvoices,
        this.dashboardsData.invoice.invoiceLastMonth.totalInvoices,
        this.dashboardsData.invoice.salaryPending.totalInvoices,
        this.dashboardsData.invoice.invoicePending.totalInvoices,
        this.dashboardsData.invoice.today_created,
        this.dashboardsData.invoice.completed_invoice,
        this.dashboardsData.invoice.pending_invoice
      ]
      this.chartOptions = {
        xaxis: {
          categories: res
        }
      }

      this.series = [
        {
          name: 'Invoices',
          data: res2
        }
      ]
    }
  },

  watch: {
    dashboardsData() {
      //pie chart emp
      this.dashboardEmpPieChart()
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

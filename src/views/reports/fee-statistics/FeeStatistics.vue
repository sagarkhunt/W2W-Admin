<template>
  <div id="table-loading" class="vs-con-loading__container commission_list">
    <div class="mb-6 desc">{{ $t('this_statistics_will_show_all_fees_charged_to_LEs') }}</div>
    <div class="vx-card md:p-8 p-6">
      <div class="sm:flex justify-end items-center px-3">
        <p class="sm:text-base text-sm font-bold">Search user</p>
        <div class="sm:flex items-end sm:pr-4 sm:pl-4 w-full mb-2 search-input-wrapper">
          <div class="vx-col md:w-full">
            <input type="text" class="border-input searchbar-input w-full" v-model="searchValue" placeholder="Try name, email, invoice number etc" />
          </div>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full md:w-full sm:px-8 px-6 mb-2 md:mt-2">
          <vs-table
            class="vs-con-loading__container"
            stripe
            :sst="true"
            maxHeight="500px"
            @change-page="handleChangePage"
            @sort="handleSort"
            :total="FilteredFeeStatistics"
            :max-items="length"
            :data="feeStatisticsList"
          >
            <template slot="header">
              <div class="sm:flex items-center justify-between w-full mb-3">
                <div class="md:whitespace-no-wrap xl:mr-4 md:mr-2 mr-0 w-auto ag-grid-table-actions-left">
                  <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                    <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                      <span class="mr-2">
                        {{ page * length - (length - (FilteredFeeStatistics && 1)) }}
                        -
                        {{ FilteredFeeStatistics - page * length > 0 ? page * length : FilteredFeeStatistics }}
                        {{ $t('of') }} {{ FilteredFeeStatistics }}
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
                <div class="sm:flex items-center">
                  <div>
                    <button class="bg-white cursor-pointer px-3 py-2 border-none">
                      <p class="font-bold">Export</p>
                    </button>
                  </div>
                  <div class="date-popup sm:mx-2 sm:mb-0 mb-2">
                    <date-picker v-model="range" range @change="changeStatisticsDate($event)"> </date-picker>
                  </div>
                  <div>
                    <button
                      class="sm:w-auto w-full bg-white py-2 px-3 rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary"
                      id="feeStastics_pdf"
                      @click="seekerDetailPdf()"
                    >
                      <p class="text-base text-primary">Download</p>
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <template slot="thead">
              <vs-th>{{ $t('sr') }}</vs-th>
              <vs-th sort-key="full_name">{{ $t('light_entrepreneur_name') }}</vs-th>
              <vs-th sort-key="created_at">{{ $t('date_joined') }}</vs-th>
              <vs-th sort-key="email">{{ $t('email_address') }}</vs-th>
              <vs-th sort-key="tot_accident_insurance">{{ $t('accident_insurance_fees') }}</vs-th>
              <vs-th sort-key="tot_health_insurance">{{ $t('health_insurance_fees') }}</vs-th>
              <vs-th sort-key="tot_w2w_commission">{{ $t('platform_fees') }}</vs-th>
              <vs-th sort-key="tot_commission">{{ $t('all_fees_combined') }}</vs-th>
              <vs-th>{{ $t('action') }}</vs-th>
            </template>

            <template slot-scope="{ data }" ref="tableBody">
              <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
                <vs-td>
                  <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                    <p @click="viewSingleJobseeker(tr.userId, tr.seekerId)">
                      {{ tr.full_name || '-' }}
                    </p>
                  </div>
                </vs-td>
                <vs-td>{{ formatDate(tr.created_at) }}</vs-td>
                <vs-td>{{ tr.email || '-' }}</vs-td>
                <vs-td>€ {{ tr.tot_accident_insurance.toFixed(2) }}</vs-td>
                <vs-td>€ {{ tr.tot_health_insurance.toFixed(2) || 0 }}</vs-td>
                <vs-td>€ {{ tr.tot_w2w_commission.toFixed(2) || 0 }}</vs-td>
                <vs-td>€ {{ tr.tot_commission.toFixed(2) || 0 }}</vs-td>
                <vs-td>
                  <vs-dropdown vs-trigger-click class="cursor-pointer">
                    <div class="p-4 border border-solid d-theme-border-grey-light cursor-pointer flex items-center justify-between font-medium">
                      {{ $t('action') }}
                      <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                    </div>
                    <vs-dropdown-menu class="employer_action">
                      <vs-dropdown-item @click="viewSingleJobseeker(tr.userId, tr.seekerId)" v-validate="'required'">
                        {{ $t('viewProfile') }}
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="viewSingleJobseekerDiagrams(tr.seekerId)" v-validate="'required'">
                        {{ $t('load_to_diagrams') }}
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="viewSingleJobseekerProfile(tr.userId)" v-validate="'required'">
                        {{ $t('adjust_service_fees') }}
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
          <div class="centerx">
            <vs-pagination :total="Math.ceil(FilteredFeeStatistics / length)" v-model="page"></vs-pagination>
          </div>
        </div>
      </div>

      <div class="chart-wrapper" style="width: auto; margin: 0 auto; padding-top: 2.5rem" v-if="singleSeekerFeeStatiscsChartData.length">
        <vs-card class="cardx bg-green-500 Calender">
          <template slot="header" class="Calender">
            <p class="font-bold text-xl mb-2">{{ $t('single_seeker_diagrams') }}</p>
            <div class="date-popup">
              <date-picker v-model="range" range @change="changeSingleDate($event)"> </date-picker>
            </div>
          </template>
          <div class="chart-container mx-auto">
            <apexchart type="area" height="350" :options="chartOptionsSingle" :series="seriesSingle">{{ singleSeekerFeeStatisticsData }}</apexchart>
          </div>
        </vs-card>
      </div>

      <div class="chart-wrapper" style="width: auto; margin: 0 auto; padding-top: 2.5rem">
        <vs-card class="cardx bg-green-500 Calender">
          <template slot="header" class="Calender">
            <p class="font-bold text-xl mb-2">{{ $t('top_ten_seeker_diagram') }}</p>
          </template>
          <div class="chart-container mx-auto">
            <apexchart type="area" height="350" :options="chartOptions" :series="series">{{ seekerFeeStatisticsData }}</apexchart>
          </div>
        </vs-card>
      </div>
    </div>
    <div id="pdf-container"></div>
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
import FeeStatiscsPdf from '../../pdf/FeeStatiscsPDF.vue'
import Vue from 'vue'

export default {
  name: 'FeeStatistics',
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
      seeker_week_start_date: '',
      seeker_week_end_date: '',
      seeker_statiscs_week_start_date: '',
      seeker_statiscs_week_end_date: '',
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
        seekerId: '',

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
      chartOptionsSingle: {
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
        seekerId: '',

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
      series: [{ data: [] }],
      seriesSingle: [{ data: [] }],
      searchValue: '',
      filterBy: '',
      generating: false
    }
  },
  mixins: [dateMixins],
  mounted() {
    this.getData()
    this.seekerFeeStatiscs()
  },

  computed: {
    ...mapState('reports', [
      'loading',
      'totalFeeStatistics',
      'FilteredFeeStatistics',
      'feeStatisticsList',
      'seekerViewComissionCount',
      'FeeStatiscsChartData',
      'WorkDetails',
      'singleSeekerFeeStatiscsChartData'
    ]),
    seekerFeeStatisticsData() {
      this.seekerFeeStatiscsChart()
    },
    singleSeekerFeeStatisticsData() {
      this.singleSeekerFeeStatiscsChart()
    }
  },
  methods: {
    ...mapActions('reports', {
      getFeeStatistics: 'getFeeStatistics',
      topTenLeSeekerFeeStatiscs: 'topTenLeSeekerFeeStatiscs',
      getSingleSeekerchartData: 'getSingleSeekerchartData',
      getFeeStatisticsDownloadData: 'getFeeStatisticsDownloadData'
    }),
    ...mapActions('jobseeker', {
      loginAsSeekerDashboard: 'loginAsSeekerDashboard'
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
    seekerFeeStatiscs() {
      this.topTenLeSeekerFeeStatiscs({ week_start_date: this.week_start_date, week_end_date: this.week_end_date })
    },
    getData() {
      this.getFeeStatistics({
        limit: this.length,
        page: this.page,
        search: this.searchValue,
        order: this.order,
        filter_by: this.filterBy,
        startDate: this.seeker_statiscs_week_start_date,
        endDate: this.seeker_statiscs_week_end_date
      })
    },

    changeDate(event) {
      this.week_start_date = event[0] == null ? '' : moment(event[0]).format('YYYY-MM-DD')
      this.week_end_date = event[1] == null ? '' : moment(event[1]).format('YYYY-MM-DD')
      this.seekerFeeStatiscs()
    },
    changeSingleDate(event) {
      this.seeker_week_start_date = event[0] == null ? '' : moment(event[0]).format('YYYY-MM-DD')
      this.seeker_week_end_date = event[1] == null ? '' : moment(event[1]).format('YYYY-MM-DD')
      this.getSeekerUserSingleChartData()
    },
    changeStatisticsDate(event) {
      this.seeker_statiscs_week_start_date = event[0] == null ? '' : moment(event[0]).format('YYYY-MM-DD')
      this.seeker_statiscs_week_end_date = event[1] == null ? '' : moment(event[1]).format('YYYY-MM-DD')
      this.getData()
    },
    async seekerFeeStatiscsChart() {
      this.chartOptions = {
        xaxis: {
          categories: this.FeeStatiscsChartData.map((item) => item.full_name)
        }
      }

      this.series = [
        {
          data: this.FeeStatiscsChartData.map((item) => (item.tot_commission == null ? 0 : item.tot_commission.toFixed(2)))
        }
      ]
    },
    async viewSingleJobseekerDiagrams(seekerId) {
      this.seekerId = seekerId
      this.getSeekerUserSingleChartData()
    },

    getSeekerUserSingleChartData() {
      this.getSingleSeekerchartData({
        seekerId: this.seekerId,
        params: {
          week_start_date: this.seeker_week_start_date,
          week_end_date: this.seeker_week_end_date
        }
      }).then((data) => {})
    },

    async singleSeekerFeeStatiscsChart() {
      this.chartOptionsSingle = {
        xaxis: {
          categories: this.singleSeekerFeeStatiscsChartData.map((item) => moment(item.end_date).format('YYYY-MM-DD'))
        }
      }

      this.seriesSingle = [
        {
          data: this.singleSeekerFeeStatiscsChartData.map((item) => (item.commission_amount == null ? 0 : item.commission_amount.toFixed(2)))
        }
      ]
    },

    // view user profile details
    viewSingleJobseeker(id, seekerId) {
      localStorage.setItem('seekerProfileInfoId', id)
      this.$router.push({
        name: 'Edit Entrepreneur Info',
        params: { id: seekerId, scrollTagFee: true }
      })
    },
    //view invoice details
    viewInvoiceRecord(id) {
      this.$router.push(`/all-invoices/${id}/view`)
    },
    // view seeker edit page
    viewSingleJobseekerProfile(userId) {
      this.$router.push(`/jobseeker/${userId}/edit`)
    },
    async seekerDetailPdf() {
      this.generating = true
      this.getFeeStatisticsDownloadData({
        limit: 0
      }).then((res) => {
        setTimeout(() => {
          const ap = document.querySelector('#mount-node')
          if (ap) {
            ap.remove()
          }
          const elem = document.querySelector('#pdf-container')
          const mounteNode = document.createElement('div')
          mounteNode.id = 'mount-node'
          elem.append(mounteNode)
          const pdfEmp = Vue.extend(FeeStatiscsPdf)
          new pdfEmp({
            propsData: {
              feeStatisticsListInfo: res.data.data
            }
          })
            .$on('downloaded', () => {
              setTimeout(() => {
                this.generating = false
              }, 2000)
            })
            .$mount('#mount-node')
        }, 100)
      })
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
    },
    searchValue: {
      handler(newVal) {
        this.page = 1
        this.getData()
      }
    },
    generating() {
      if (this.generating) {
        this.$vs.loading({
          container: '#feeStastics_pdf',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#feeStastics_pdf  > .con-vs-loading')
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('reports/SET_STATE', {
      action: 'singleSeekerFeeStatiscsChartData',
      data: []
    })
    setTimeout(() => {
      next()
    }, 0)
  }
}
</script>
<style lang="scss">
.con-vs-dropdown--menu {
  white-space: nowrap;
}
.start-end-th {
  .vs-table-text {
    justify-content: space-between;
  }
}
.filter-wrapper {
  .input-select-con {
    input {
      border-radius: 30px;
    }
  }
}
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

      @media (max-width: 575px) {
        width: 100%;
      }
    }
    .mx-input {
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: none;
      border-radius: 50px;
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
.text-base {
  font-size: 1rem !important;
}
.searchbar-input {
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 0.9rem;
  border-radius: 5px;
}
.commission_list {
  .search-input-wrapper {
    width: 500px !important;
    @media (max-width: 575px) {
      width: 100% !important;
    }
    .searchbar-input {
      border-radius: 30px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>

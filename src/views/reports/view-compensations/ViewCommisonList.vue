<template>
  <div id="table-loading" class="vs-con-loading__container commission_list">
    <div class="mb-6 desc">{{ $t('this_will_show_compensations_are_used_by_LEs') }}</div>
    <div class="vx-card md:p-8 p-6">
      <div class="flex justify-between">
        <div class="sm:flex items-end pr-8 pl-4 w-full mb-2 search-input-wrapper">
          <div class="vx-col md:w-full">
            <input type="text" class="border-input searchbar-input w-full" v-model="searchValue" placeholder="Try name, email, invoice number etc" />
          </div>
        </div>
        <div class="width filter-wrapper">
          <select-2
            id="filterby"
            class="w-full"
            :value="filterBy"
            @input="(item) => (filterBy = item && item.value)"
            placeholder="Select work detail type"
            name="Select type"
            autocomplete
            :options="WorkDetails.map(x=>({...x, label: $t(x.label)}))"
          />
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full md:w-full px-8 mb-2 md:mt-2">
          <vs-table
            class="vs-con-loading__container"
            stripe
            :sst="true"
            maxHeight="500px"
            @change-page="handleChangePage"
            @sort="handleSort"
            :total="FilteredViewCommission"
            :max-items="length"
            :data="viewCommissionList"
          >
            <template slot="header">
              <div class="md:whitespace-no-wrap mb-3 xl:mr-4 md:mr-2 mr-0 w-auto ag-grid-table-actions-left mb-2">
                <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                  <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                    <span class="mr-2">
                      {{ page * length - (length - (FilteredViewCommission && 1)) }}
                      -
                      {{ FilteredViewCommission - page * length > 0 ? page * length : FilteredViewCommission }}
                      {{ $t('of') }} {{ FilteredViewCommission }}
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
              <vs-th sort-key="vat">{{ $t('invoiceNumber') }}</vs-th>
              <vs-th class="start-end-th">
                {{ $t('startAddress') }}
              </vs-th>
              <vs-th class="start-end-th">
                {{ $t('endAddress') }}
              </vs-th>
              <vs-th>{{ $t('time') }}</vs-th>
              <vs-th sort-key="distance">{{ $t('distance') }}</vs-th>
              <vs-th sort-key="w2w_commission">{{ $t('allowances') }}</vs-th>
              <vs-th sort-key="full_half_comp">{{ $t('fullPerDiem') }}</vs-th>
              <vs-th sort-key="lunch_comp">{{ $t('mealMoney') }}</vs-th>
              <vs-th sort-key="other_compensation">{{ $t('otherCompensation') }}</vs-th>
              <vs-th>{{ $t('action') }}</vs-th>
            </template>

            <template slot-scope="{ data }" ref="tableBody">
              <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
                <vs-td>
                  <div class="inline-flex" v-if="tr.id" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                    <p @click="viewSingleJobseeker(tr.userid, tr.seekerid)">
                      {{ tr.full_name || '-' }}
                    </p>
                  </div>
                  <div v-else>-</div>
                </vs-td>
                <vs-td>{{ tr.invoice_number || '-' }}</vs-td>
                <vs-td> {{ tr.trip_start_address || '-' }}</vs-td>
                <vs-td> {{ tr.trip_end_address || '-' }}</vs-td>
                <vs-td>{{ tr.time_diff || '-' }}</vs-td>
                <vs-td>{{ tr.distance.toFixed(2) }}</vs-td>
                <vs-td>€ {{ tr.allowance.toFixed(2) || 0 }}</vs-td>
                <vs-td>€ {{ tr.fullhalfdaycompensation || 0 }}</vs-td>
                <vs-td>€ {{ tr.lunchcompensation || 0 }}</vs-td>
                <vs-td>€ {{ tr.other_compensation.toFixed(2) || 0 }}</vs-td>
                <vs-td>
                  <vs-dropdown vs-trigger-click class="cursor-pointer">
                    <div class="p-4 border border-solid d-theme-border-grey-light cursor-pointer flex items-center justify-between font-medium">
                      {{ $t('action') }}
                      <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                    </div>
                    <vs-dropdown-menu class="employer_action">
                      <vs-dropdown-item @click="viewSingleJobseeker(tr.userid, tr.seekerid)" v-validate="'required'">
                        {{ $t('openProfile') }}
                      </vs-dropdown-item>
                      <!-- icon="EditIcon" -->
                      <vs-dropdown-item @click="viewInvoiceRecord(tr.invoiceid)" v-validate="'required'">
                        {{ $t('openInvoice') }}
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="loginAsJobseeker(tr.userid)" v-validate="'required'">
                        {{ $t('editWorkDetail') }}
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
          <div class="centerx">
            <vs-pagination :total="Math.ceil(FilteredViewCommission / length)" v-model="page"></vs-pagination>
          </div>
        </div>
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
  name: 'ViewCommissionList',
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
      series: [{ data: [] }],
      searchValue: '',
      filterBy: ''
    }
  },
  mixins: [dateMixins],
  mounted() {},
  computed: {
    ...mapState('reports', ['loading', 'totalViewCommission', 'FilteredViewCommission', 'viewCommissionList', 'seekerViewComissionCount', 'ViewCommissionChartData', 'WorkDetails']),
    InvoiceCommisionData() {
      this.invoiceCommissionChart()
    }
  },
  methods: {
    ...mapActions('reports', {
      getViewComission: 'getViewComission',
      seekerViewCommisionCount: 'seekerViewCommisionCount'
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
    InvoiceCommission() {
      this.seekerViewCommisionCount({ week_start_date: this.week_start_date, week_end_date: this.week_end_date })
    },
    getData() {
      this.getViewComission({
        limit: this.length,
        page: this.page,
        search: this.searchValue,
        order: this.order,
        filter_by: this.filterBy
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
          categories: this.ViewCommissionChartData.map((item) => moment(item.end_date).format('YYYY-MM-DD'))
        }
      }

      this.series = [
        {
          data: this.ViewCommissionChartData.map((item) => (item.commission_amount == null ? 0 : item.commission_amount.toFixed(2)))
        }
      ]
    },
    viewSingleJobseeker(id, seekerId) {
      localStorage.setItem('seekerProfileInfoId', id)
      this.$router.push(`/jobseeker/${seekerId}/info`)
    },
    //view invoice details
    viewInvoiceRecord(id) {
      this.$router.push(`/all-invoices/${id}/view`)
    },
    //login to jobseeker
    loginAsJobseeker(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: 'Confirm Login',
        text: 'Are you sure, you want to login as jobseeker?',
        accept: () => this.loginJobseekerDashboard(id),
        acceptText: 'Yes'
      })
    },
    async loginJobseekerDashboard(id) {
      try {
        const { jobSeekerToken } = await this.loginAsSeekerDashboard(id)
        window.open(`${process.env.VUE_APP_FRONT_BASE_URL}/authlogin/?accToken=${jobSeekerToken}&workDetailsPage=true`, '_blank')
      } catch ({ message }) {
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
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
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('reports/SET_STATE', {
      action: 'viewCommissionList',
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
.searchbar-input {
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 0.9rem;
  border-radius: 5px;
}

.search-input-wrapper {
  width: 800px !important;
  .searchbar-input {
    border-radius: 30px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
}
</style>

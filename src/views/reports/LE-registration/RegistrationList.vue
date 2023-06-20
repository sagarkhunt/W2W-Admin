<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_can_see_statistics_of_le_joined_in_a_system') }}</div>
    <div class="vx-card md:p-8 p-6">
      <div class="vx-row pt-2 pb-2">
        <div class="vx-col lg:w-1/4 md:w-1/2 w-full">
          <label for="industry" class="mb-5">{{ $t('from_date') }} </label>
          <date-picker v-model="form.from_date" mode="date" class="w-full" :masks="{ input: 'DD.MM.YYYY' }">
            <template v-slot="{ inputValue, inputEvents }">
              <vs-input class="w-full" v-validate="'required'" name="Date of Birth" :value="inputValue" v-on="inputEvents" readonly />
            </template>
          </date-picker>
          <span class="text-primary text-sm" v-show="errors.has('Date of Birth')">{{ errors.first('Date of Birth') }}</span>
        </div>
        <div class="vx-col lg:w-1/4 md:w-1/2 w-full">
          <label for="industry" class="mb-5">{{ $t('to_date') }} </label>
          <date-picker v-model="form.to_date" mode="date" class="w-full" :masks="{ input: 'DD.MM.YYYY' }">
            <template v-slot="{ inputValue, inputEvents }">
              <vs-input class="w-full" v-validate="'required'" name="Date of Birth" :value="inputValue" v-on="inputEvents" readonly />
            </template>
          </date-picker>
          <span class="text-primary text-sm" v-show="errors.has('Date of Birth')">{{ errors.first('Date of Birth') }}</span>
        </div>
        <div class="flex mt-5 lg:w-auto w-full sm:flex-no-wrap flex-wrap">
          <div class="vx-col w-full">
            <vs-button class="mr-4 ml-3 sm:mb-0 mb-3 vs-con-loading__container" id="create-chapter" @click="showReport" type="relief">{{ $t('show_report') }}</vs-button>
          </div>
          <div class="flex sm:justify-end justify-start w-full">
            <div class="mb-4 ml-3 md:mb-0 md:mr-4 ag-grid-table-actions-left">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.ExportCSV')">
                  <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportCSV">{{ $t('csv') }}</vs-button>
                </vx-tooltip>
              </vs-row>
            </div>
            <div class="mb-4 md:mb-0 md:mr-4 ag-grid-table-actions-left">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.ExportExcel')">
                  <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportExcel">{{ $t('excel') }}</vs-button>
                </vx-tooltip>
              </vs-row>
            </div>
          </div>
        </div>
      </div>
      <vs-table
        class="vs-con-loading__container"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCountRegistration"
        search
        pagination
        :max-items="length"
        :data="LeRegistrationList"
      >
        <template slot="header">
          <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
            <div class="mb-3 md:mb-0 md:mr-4 ag-grid-table-actions-left md:w-auto w-full">
              <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2">
                    {{ page * length - (length - (FilteredCountRegistration && 1)) }}
                    -
                    {{ FilteredCountRegistration - page * length > 0 ? page * length : FilteredCountRegistration }}
                    {{ $t('of') }} {{ FilteredCountRegistration }}
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
          </div>
        </template>
        <template slot="thead">
          <vs-th sort-key="created_at">{{ $t('registered_on') }} </vs-th>
          <vs-th sort-key="full_name">{{ $t('light_entrepreneur_name') }}</vs-th>
          <vs-th sort-key="full_name">{{ $t('phone') }}</vs-th>
          <vs-th sort-key="email">{{ $t('email') }} </vs-th>
          <vs-th sort-key="ssn">{{ $t('date_of_birth') }} </vs-th>
          <vs-th sort-key="tax_number">{{ $t('tax%') }} </vs-th>
          <vs-th>{{ $t('filled_profile') }} </vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ formatDate(tr.created_at) || '-' }}</vs-td>
            <vs-td>
              <p @click="viewSingleJobseeker(tr.id, tr.jobSeeker && tr.jobSeeker.id)">
                {{ tr.full_name || '-' }}
              </p>
            </vs-td>
            <vs-td>{{ (tr.jobSeeker && tr.jobSeeker.mobile) || '-' }}</vs-td>
            <vs-td>{{ tr.email || '-' }}</vs-td>
            <vs-td>{{ (tr.dob && formatDate(tr.dob)) || '-' }}</vs-td>
            <vs-td>{{ tr.seekerTax || '-' }}</vs-td>
            <!-- status -->
            <vs-td :class="tr.incomplete_profile_flag ? 'statusNo' : 'statusYes'">
              {{ tr.incomplete_profile_flag == false ? 'YES' : 'NOT' || '-' }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <div class="chart-wrapper" style="width: auto; margin: 0 auto; padding-top: 2.5rem">
        <vs-card class="cardx bg-green-500 Calender">
          <template slot="header" class="Calender">
            <!-- TABLE ACTION ROW -->
            <p class="font-bold text-xl mb-2">{{ $t('LE_Registration') }}</p>
            <div class="date-popup">
              <date-picker1 v-model="range" range @change="changeDate($event)"> </date-picker1>
            </div>
          </template>

          <div class="chart-container mx-auto">
            <apexchart type="area" height="350" :options="chartOptions" :series="series">{{ LERegisterData }}</apexchart>
          </div>
        </vs-card>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { mapActions, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import VueApexCharts from 'vue-apexcharts'
import DatePicker1 from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  name: 'LE-Registration',
  components: {
    DatePicker,
    // LineChart
    apexchart: VueApexCharts,
    DatePicker1
  },
  data() {
    return {
      form: {
        companyCountryId: '',
        from_date: '',
        to_date: ''
      },
      length: 10,
      page: 1,
      search: '',
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
                  return 'Registered LE' + ':'
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
    this.LERegisterchart()
  },
  computed: {
    ...mapState('reports', ['loading', 'totalRegistration', 'FilteredCountRegistration', 'LeRegistrationList', 'LeChartData', 'LERegisteredData']),
    validateForm() {
      return !this.errors.any()
    },

    LERegisterData() {
      this.registrationChart()
    },

    employerData() {
      return this.LeRegistrationList.reduce((acc, item) => {
        item.is_status = item.status === 'blocked' ? 'Blocked' : item.status === active ? 'Active' : 'Pending'
        acc.push(item)
        return acc
      }, [])
    },
    // set total pages for pagination
    totalPages() {
      return Math.ceil(this.FilteredCountRegistration / this.length)
    }
  },
  methods: {
    ...mapActions('reports', {
      getLeRegistratonList: 'getLeRegistratonList',
      getChartData: 'getChartData',
      updateJobSeekerStatus: 'updateJobSeekerStatus',
      LERegisterChart: 'LERegisterChart'
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
    showReport() {
      this.getLeRegistratonList({
        start_date: moment(this.form.from_date).format('YYYY-MM-DD'),
        end_date: moment(this.form.to_date).format('YYYY-MM-DD')
      })
    },
    LERegisterchart() {
      this.LERegisterChart({ week_start_date: this.week_start_date, week_end_date: this.week_end_date })
    },
    getData() {
      this.getLeRegistratonList({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order,
        start_date: (this.form.from_date && moment(this.form.from_date).format('YYYY-MM-DD')) || '',
        end_date: (this.form.to_date && moment(this.form.to_date).format('YYYY-MM-DD')) || ''
      })
    },
    changeDate(event) {
      this.week_start_date = event[0] == null ? '' : moment(event[0]).format('YYYY-MM-DD') || null
      this.week_end_date = event[1] == null ? '' : moment(event[1]).format('YYYY-MM-DD') || null
      this.LERegisterchart()
    },
    viewSingleEmployer(id) {
      this.$router.push(`/jobseeker/${id}/info`)
    },
    randomize() {
      return [0].map((v) => {
        return Math.round(300 + Math.random() * 700) / 10
      })
    },
    // export export file
    exportCSV() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.LeRegistrationList.map((item, index) => ({
          'Sr#': index + 1,
          'LE Name': item.full_name && '-',
          Email: item.email,
          'Registered On': item.created_at,
          SSN: item.ssn,
          'Tax Number': item.tax_number,
          Status: item.status
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'LE Registration.csv')
    },
    // export export file
    exportExcel() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.LeRegistrationList.map((item, index) => ({
          'Sr#': index + 1,
          'LE Name': item.full_name && '-',
          Email: item.email,
          'Registered On': item.created_at,
          SSN: item.ssn,
          'Tax Number': item.tax_number,
          Status: item.status
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'LE Registration.xlsx')
    },
    // Employer Pending To Active
    async pendingToActive(id, status) {
      try {
        const { message } = await this.updateJobSeekerStatus({
          id,
          status: 'active'
        })

        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.getData()
      } catch (err) {
        const { message } = err
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },
    async updateStatus(id, status) {
      try {
        if (status === 'active') {
          const { message } = await this.updateJobSeekerStatus({
            id,
            status: 'blocked'
          })
          this.$vs.notify({
            title: 'Success',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
          this.getData()
        } else {
          const { message } = await this.updateCompanyStatus({
            id,
            status: 'active'
          })
          this.getData()
          this.$vs.notify({
            title: 'Success',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
        }
      } catch (err) {
        const { message } = err
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },

    //regitration list chart data
    async registrationChart() {
      this.chartOptions = {
        xaxis: {
          categories: this.LERegisteredData.map((item) => moment(item.end_date).format('YYYY-MM-DD'))
        }
      }

      this.series = [
        {
          data: this.LERegisteredData.map((item) => (item.seeker_registered == null ? 0 : item.seeker_registered))
        }
      ]
    },
    // Employer Pending To Active
    async updateLeRegistrationStatus(id, status) {
      try {
        const { message } = await this.updateCompanyStatus({
          id,
          status: 'active'
        })

        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.getData()
      } catch (err) {
        const { message } = err
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },

    viewSingleJobseeker(id, seekerId) {
      localStorage.setItem('seekerProfileInfoId', id)
      this.$router.push(`/jobseeker/${seekerId}/info`)
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
.is-interactive {
  z-index: 99999999 !important;
}
.d-flex {
  display: flex;
  align-items: center;
}
.statusYes {
  color: rgb(0, 128, 0);
  font-weight: 800;
}
.statusNo {
  color: #f00;
  font-weight: 800;
}
</style>
<style lang="scss">
.remove-tip {
  .vs-dropdown--menu--after {
    display: none;
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
.vs-table--header {
  @media (max-width: 576px) {
    display: flex;
    flex-wrap: wrap;
  }
}
.vs-table--search {
  max-width: 200px;

  @media (max-width: 576px) {
    width: 100%;
    max-width: 100%;
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

.vs-con-dropdown {
  @media (max-width: 576px) {
    white-space: nowrap;
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

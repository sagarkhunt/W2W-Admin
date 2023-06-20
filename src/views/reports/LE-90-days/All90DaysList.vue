<template>
  <div id="table-loading" class="vs-con-loading__container days_list">
    <div class="mb-6 desc">{{ $t('here_you_can_see_le_who_had_worked_more_that_90_in_a_system') }}</div>
    <div class="vx-card md:p-8 p-6">
      <vs-table
        class="vs-con-loading__container"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCountLE90"
        pagination
        :max-items="this.length"
        search
        :data="LE90DaysRecordsData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="user.full_name">{{ $t('light_entrepreneur_name') }} </vs-th>
          <vs-th>{{ $t('date_joined') }} </vs-th>
          <vs-th sort-key="user.email">{{ $t('email') }} </vs-th>
          <vs-th>{{ $t('registration_days') }} </vs-th>
        </template>

        <template slot="header">
          <div class="md:whitespace-no-wrap mb-3 xl:mr-4 md:mr-2 mr-0 w-auto ag-grid-table-actions-left mb-2">
            <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
              <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">
                  {{ page * length - (length - (FilteredCountLE90 && 1)) }}
                  -
                  {{ FilteredCountLE90 - page * length > 0 ? page * length : FilteredCountLE90 }}
                  {{ $t('of') }} {{ FilteredCountLE90 }}
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
          <div class="flex md:flex-no-wrap flex-wrap items-end sm:mb-3 mb-0 xl:w-full lg:w-auto w-full order-3 lg:order-0 sm:justify-start justify-center">
            <div class="mb-4 md:mb-0 lg:mr-4 ag-grid-table-actions-left">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.ExportCSV')">
                  <vs-button class="mr-1 btn" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportCSV">{{ $t('csv') }}</vs-button>
                </vx-tooltip>
              </vs-row>
            </div>
            <div class="mb-4 md:mb-0 lg:mr-4 ag-grid-table-actions-left">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.ExportExcel')">
                  <vs-button class="mr-1 btn" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportExcel">{{ $t('excel') }}</vs-button>
                </vx-tooltip>
              </vs-row>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              <div v-if="tr.full_name" class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewSingleJobseeker(tr.id, tr)">
                  {{ tr.full_name }}
                </p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td>{{ formatDate(tr.created_at) }} </vs-td>
            <vs-td> {{ tr.email }} </vs-td>
            <vs-td> {{ tr.diffDays || '-' }} </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { mapActions, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import Select2 from '@/components/custom/form-elements/Select2.vue'

export default {
  name: 'All90DaysList',
  components: {
    Select2
  },
  data() {
    return {
      filters: '',
      length: 10,
      page: 1
    }
  },
  mixins: [dateMixins],
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('reports', ['loading', 'totalLE90', 'FilteredCountLE90', 'LE90DaysRecords']),
    LE90DaysRecordsData() {
      return this.LE90DaysRecords.reduce((acc, item) => {
        const date1 = new Date()
        const date2 = new Date(item.created_at)
        const diffTime = Math.abs(date2 - date1)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        item.diffDays = diffDays
        acc.push(item)
        return acc
      }, [])
    }
  },
  methods: {
    ...mapActions('reports', {
      getAll90DayRecords: 'getAll90DayRecords'
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
      this.order = [key ? key : 'user.id', active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },
    getData() {
      this.getAll90DayRecords({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order
      })
    },
    viewSingleJobseeker(id, tr) {
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfileId',
        data: id
      })
      localStorage.setItem('seekerProfileInfoId', id)
      if (tr.jobSeeker) {
        this.$router.push(`/jobseeker/${tr.jobSeeker.id}/info`)
      }
    },
    // export export file

    exportCSV() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.LE90DaysRecords.map((item, index) => ({
          'Sr#': index + 1,
          Name: item.full_name,
          'Date Joined': dateMixins.methods.formatDate(item.created_at),
          Email: item.email,
          'Registration Days': item.diffDays
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'LE Work More Than 90 Days.csv')
    },
    // export export file
    exportExcel() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.LE90DaysRecords.map((item, index) => ({
          'Sr#': index + 1,
          Name: item.full_name,
          'Date Joined': dateMixins.methods.formatDate(item.created_at),
          Email: item.email,
          'Registration Days': item.diffDays
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'LE Work More Than 90 Days.xlsx')
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
.days_list {
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

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .vs-table--tbody-table {
    @media (max-width: 768px) {
      min-width: 900px;
    }
  }
}

.vuesax-app-is-ltr {
  .days_list {
    .vs-table--search {
      @media (max-width: 768px) {
        margin-left: 17px;
      }
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

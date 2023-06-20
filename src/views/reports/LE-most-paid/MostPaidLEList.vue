<template>
  <div id="table-loading" class="vs-con-loading__container most_paid">
    <div class="mb-6 desc">{{ $t('here_you_can_see_list_of_top_5_le_that_has_been_paid') }}</div>
    <div class="vx-card md:p-8 p-6">
      <vs-table
        class="vs-con-loading__container"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCountPaidOut"
        pagination
        :max-items="length"
        search
        :data="MostPaidLERecordsData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="created_at">{{ $t('creation_date') }}</vs-th>
          <vs-th sort-key="full_name">{{ $t('light_entrepreneur_name') }} </vs-th>
          <vs-th sort-key="amount_paid">{{ $t('total_amount_paid') }} </vs-th>
          <vs-th>{{ $t('working_days') }} </vs-th>
          <vs-th>{{ $t('commission') }} ( %2 ) </vs-th>
        </template>

        <template slot="header">
          <div class="md:whitespace-no-wrap mb-3 xl:mr-4 md:mr-2 mr-0 w-auto ag-grid-table-actions-left mb-2">
            <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
              <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">
                  {{ page * length - (length - (FilteredCountPaidOut && 1)) }}
                  -
                  {{ FilteredCountPaidOut - page * length > 0 ? page * length : FilteredCountPaidOut }}
                  {{ $t('of') }} {{ FilteredCountPaidOut }}
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
                  <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportCSV">{{ $t('csv') }}</vs-button>
                </vx-tooltip>
              </vs-row>
            </div>
            <div class="mb-4 md:mb-0 lg:mr-4 ag-grid-table-actions-left">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.ExportExcel')">
                  <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="exportExcel">{{ $t('excel') }}</vs-button>
                </vx-tooltip>
              </vs-row>
            </div>
          </div>
          <!-- </div> -->
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>{{ formatDate(tr.created_at) }}</vs-td>
            <vs-td>
              <div v-if="tr.full_name" class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewSingleJobseeker(tr.id, tr.seeker_id)">
                  {{ tr.full_name }}
                </p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td v-if="tr.amount_paid">€ {{ parseFloat(tr.amount_paid).toFixed(2) }} </vs-td>
            <vs-td v-else> 0 </vs-td>
            <vs-td> {{ tr.diffDays || '-' }} </vs-td>
            <vs-td> {{ tr.seeker_personal_commission }} </vs-td>
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

export default {
  name: 'LEMostPaid',
  data() {
    return {
      length: 10,
      page: 1
    }
  },
  mixins: [dateMixins],
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('reports', ['loading', 'totalPaidOut', 'FilteredCountPaidOut', 'MostPaidLERecords']),
    MostPaidLERecordsData() {
      return this.MostPaidLERecords.reduce((acc, item) => {
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
      getAllMostPaidLERecord: 'getAllMostPaidLERecord'
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
    handleSort(key, active) {
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },
    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getData()
    },

    getData() {
      this.getAllMostPaidLERecord({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order
      })
    },
    viewSingleJobseeker(id, seeker_id) {
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfileId',
        data: id
      })
      localStorage.setItem('seekerProfileInfoId', id)
      this.$router.push(`/jobseeker/${seeker_id}/info`)
    },
    // export export file
    exportCSV() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.MostPaidLERecords.map((item, index) => ({
          'Sr#': index + 1,
          'Job Seeker': item.full_name,
          'Total Amount Paid': parseFloat(item.amount).toFixed(2)
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'Most Paid LE.csv')
    },
    // export export file
    exportExcel() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.MostPaidLERecords.map((item, index) => ({
          'Sr#': index + 1,
          'Job Seeker': item.full_name,
          'Total Amount Paid': parseFloat(item.amount).toFixed(2)
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'Most Paid LE.xlsx')
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
.most_paid {
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
  .most_paid {
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

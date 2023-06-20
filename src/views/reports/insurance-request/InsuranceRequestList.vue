<template>
  <div id="table-loading" class="vs-con-loading__container insurance_request">
    <div class="mb-6 desc">{{ $t('here_you_can_see_le_who_has_requested_for_the_insurance') }}</div>
    <div class="vx-card md:p-8 p-6">
      <vs-table
        class="vs-con-loading__container"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCountMostPaid"
        pagination
        :max-items="this.length"
        search
        :data="insurenceRequestRecords"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="insurance_name">{{ $t('insurance_name') }} </vs-th>
          <vs-th sort-key="email">{{ $t('email') }} </vs-th>
          <vs-th sort-key="phone_number">{{ $t('telephone') }} </vs-th>
          <vs-th sort-key="full_namer"> {{ $t('light_entrepreneur_name') }} </vs-th>
          <vs-th>{{ $t('request_on') }} </vs-th>
        </template>

        <template slot="header">
          <div class="md:whitespace-no-wrap mb-3 xl:mr-4 md:mr-2 mr-0 w-auto ag-grid-table-actions-left mb-2">
            <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
              <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">
                  {{ page * length - (length - (FilteredCountMostPaid && 1)) }}
                  -
                  {{ FilteredCountMostPaid - page * length > 0 ? page * length : FilteredCountMostPaid }}
                  of {{ FilteredCountMostPaid }}
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
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              <div v-if="tr.insurance && tr.insurance.insurance_name">
                <p @click="viewSingleJobseeker(tr.seeker && tr.seeker.user && tr.seeker.user.id, tr)">
                  {{ tr.insurance && tr.insurance.insurance_name }}
                </p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td> {{ (tr.seeker && tr.seeker.user && tr.seeker.user.email) || '-' }} </vs-td>
            <vs-td> {{ (tr.seeker && tr.seeker.user && tr.seeker.user.phone_number) || '-' }} </vs-td>
            <vs-td>
              <p @click="viewSingleJobseeker(tr.seeker && tr.seeker.user && tr.seeker.user.id, tr)">
                {{ tr.seeker && tr.seeker.user && tr.seeker.user.full_name }}
              </p>
            </vs-td>
            <vs-td>{{ formatDate(tr.created_at) }} </vs-td>
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
  name: 'InsuranceRequestList',
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
    ...mapState('reports', ['loading', 'totalMostPaid', 'FilteredCountMostPaid', 'insurenceRequestRecords'])
  },
  methods: {
    ...mapActions('reports', {
      getAllInsurenceRequest: 'getAllInsurenceRequest'
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
    getData() {
      this.getAllInsurenceRequest({
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
      this.$router.push(`/jobseeker/${tr.seeker.id}/info`)
    },
    // export export file
    exportCSV() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.insurenceRequestRecords.map((item, index) => ({
          'Sr#': index + 1
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'LE Insurence Request.csv')
    },
    // export export file
    exportExcel() {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(
        this.insurenceRequestRecords.map((item, index) => ({
          'Sr#': index + 1
        }))
      )
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, 'LE Insurence Request.xlsx')
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
.insurance_request {
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
}
.vuesax-app-is-ltr {
  .insurance_request {
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

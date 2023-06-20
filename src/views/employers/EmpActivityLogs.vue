<template>
  <div class="odd-table">
    <vs-table
      stripe
      :sst="true"
      maxHeight="500px"
      @search="updateSearchQuery"
      @change-page="handleChangePage"
      @sort="handleSort"
      :total="FilteredCountActivityLog"
      pagination
      :max-items="length"
      search
      :data="jobseekerAcitivityLogData"
      id="table-loading"
      class="tbl-minwidth"
    >
      <template slot="thead">
        <vs-th>{{ $t('sr') }}</vs-th>
        <vs-th>{{ $t('full_name') }} </vs-th>
        <vs-th>{{ $t('incognito') }} </vs-th>
        <vs-th>{{ $t('ip') }} </vs-th>
        <vs-th>{{ $t('date') }} </vs-th>
        <vs-th>{{ $t('time') }} </vs-th>
        <vs-th>{{ $t('time_zone') }} </vs-th>
        <vs-th>{{ $t('device_type') }} </vs-th>
        <vs-th>{{ $t('browser') }} </vs-th>
        <vs-th>{{ $t('isSuccess') }} </vs-th>
      </template>

      <template slot="header">
        <div class="flex flex-wrap justify-between items-center sm:w-auto xl:w-full">
          <p class="mr-4 mt-5 md:mb-2 font-bold">{{ $t('log_activity_list') }}</p>
        </div>
        <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
          <div class="md:mb-0 md:mr-4 md:w-auto w-full ag-grid-table-actions-left">
            <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
              <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">
                  {{ page * length - (length - (FilteredCountActivityLog && 1)) }}
                  -
                  {{ FilteredCountActivityLog - page * length > 0 ? page * length : FilteredCountActivityLog }}
                  {{ $t('of') }} {{ FilteredCountActivityLog }}
                </span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <vs-dropdown-menu>
                <vs-dropdown-item @click="handleChangePage(10)">
                  <span>10</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="handleChangePage(20)">
                  <span>20</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="handleChangePage(50)">
                  <span>50</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="handleChangePage(100)">
                  <span>100</span>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </div>
      </template>

      <template slot="header"> </template>

      <template slot-scope="{ data }" ref="tableBody">
        <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
          <vs-td> {{ tr.id }}</vs-td>
          <vs-td> {{ tr.user_full_name || '-' }} </vs-td>
          <vs-td> {{ tr.incognito == true ? $t('yes') : $t('no') }} </vs-td>
          <vs-td> {{ tr.ip_address || '-' }} </vs-td>
          <vs-td> {{ formatDate(tr.date) || '-' }} </vs-td>
          <vs-td> {{ tr.time || '-' }} </vs-td>
          <vs-td> {{ tr.time_zone || '-' }} </vs-td>
          <vs-td> {{ tr.device || '-' }} </vs-td>
          <vs-td class="truncate text-max">
            <vx-tooltip :text="tr.user_agent">
              {{ tr.user_agent || '-' }}
            </vx-tooltip>
          </vs-td>
          <vs-td> {{ tr.is_success }} </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
export default {
  name: 'LELogActivity',
  components: {
    Select2,
    DatePicker
  },
  data() {
    return {
      order: [],
      length: 10,
      page: 1,
      order: [],
      search: '',
      data: [{}],
      val: '',

      generating: false,
      reviewId: ''
    }
  },
  mixins: [dateMixins],
  async mounted() {
    await this.getData()
  },
  computed: {
    ...mapState('jobseeker', ['loading', 'FilteredCountActivityLog', 'leAllActivityLogList']),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),

    console: () => console,

    // For Validation
    validateForm() {
      return !this.errors.any()
    },

    jobseekerAcitivityLogData() {
      return this.leAllActivityLogList.reduce((acc, item) => {
        acc.push(item)
        return acc
      }, [])
    }
  },
  methods: {
    ...mapActions('jobseeker', {
      getAllLogActivityList: 'getAllLogActivityList'
    }),
    ...mapMutations('jobseeker', { setState: 'SET_STATE' }),

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

    async getData() {
      await this.getAllLogActivityData()
    },

    getAllLogActivityData() {
      const payload = {
        page: this.page,
        limit: this.length,
        order: this.order,
        search: this.search
      }
      this.$store.dispatch('jobseeker/getAllLogActivityList', { id: localStorage.getItem('empCompanyId'), payload })
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
    generating() {
      if (this.generating) {
        this.$vs.loading({
          container: '#seekerDetail_pdf',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#seekerDetail_pdf  > .con-vs-loading')
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isActivityPointModalShow = false
    this.payslipPopup = false
    this.isDeducationModalShow = false
    this.taxInfoPopup = false
    this.updatePassword = false
    setTimeout(() => {
      next()
    }, 0)
  }
}
</script>

<style lang="scss" scoped>
.start-width {
  width: 30px;
}
.review-star:hover {
  fill: #e4aa18;
  cursor: pointer;
}

.text-max {
  max-width: 250px;
}
</style>

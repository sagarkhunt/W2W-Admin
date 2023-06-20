<template>
  <div class="expeses-pending__list">
    <div class="vx-card md:p-8 p-6 md:pb-1">
      <vs-table
        id="expeses-pending__list"
        class="vs-con-loading__container vh-hight-table"
        stripe
        :sst="true"
        maxHeight="750px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCount"
        :max-items="length"
        search
        :data="expensesPendingData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th>{{ $t('lightEntrepreneur') }}</vs-th>
          <vs-th>{{ $t('dedutionAmountTotal') }}</vs-th>
          <vs-th>{{ $t('unpaidParts') }}</vs-th>
          <vs-th sort-key="user.full_name">{{ $t('unpaidFully') }}</vs-th>
          <vs-th v-if="checkPermissionByIds([permissions.EMPLOYER_EDIT]) || checkPermissionByIds([permissions.EMPLOYER_LOGIN_AS]) || checkPermissionByIds([permissions.EMPLOYER_DELETE])"
            >{{ $t('action') }}
          </vs-th>
        </template>
        <template slot="header">
          <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
            <div class="mb-3 md:mb-0 md:mr-4 md:w-auto w-full ag-grid-table-actions-left">
              <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2">
                    {{ page * length - (length - (FilteredCount && 1)) }}
                    -
                    {{ FilteredCount - page * length > 0 ? page * length : FilteredCount }}
                    {{ $t('of') }} {{ FilteredCount }}
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
          <div class="mb-3"></div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              <div @click="viewSingleEntrepreneur(tr.seekerId, tr)">
                {{ titleCase(tr.full_name) }}
              </div>
            </vs-td>

            <vs-td> {{ tr.totalamount.toFixed(2) }} </vs-td>
            <vs-td v-if="tr.unpaipart">
              <div>{{ tr.unpaipart.toFixed(2) }}</div>
            </vs-td>
            <vs-td v-else>
              <div>{{ '0.00' }}</div>
            </vs-td>

            <vs-td v-if="tr.unpaifully">
              <div>{{ tr.unpaifully.toFixed(2) }}</div>
            </vs-td>
            <vs-td v-else>
              <div>{{ '0.00' }}</div>
            </vs-td>

            <vs-td>
              <vs-dropdown vs-trigger-click class="cursor-pointer">
                <div class="p-4 border border-solid d-theme-border-grey-light cursor-pointer flex items-center justify-between font-medium">
                  {{ $t('action') }}
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu class="employer_action">
                  <vs-dropdown-item @click="viewSingleEntrepreneur(tr.seekerId, tr)" v-validate="'required'">
                    {{ $t('openLeEprofile') }}
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <div class="centerx">
        <vs-pagination :total="Math.ceil(FilteredCount / length)" v-model="page"></vs-pagination>
      </div>
    </div>

    <!-- send email modal -->
    <SendEmailModal v-if="isSendEmailModalMounted" :isModalShow.sync="isSendEmailModalShow" :employer="selectedEmployer" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import SendEmailModal from '@/views/employers/components/SendEmailModal'
import Select2 from '@/components/custom/form-elements/Select2.vue'

export default {
  name: 'ExpensesPendingList',
  components: {
    SendEmailModal,
    Select2
  },
  data() {
    return {
      order: [],
      length: 10,
      page: 1,
      search: '',
      industryId: '',
      selectedEmployer: null,
      filterBy: '',
      values: 'root',

      // send email modal
      isSendEmailModalMounted: false,
      isSendEmailModalShow: false
    }
  },
  mixins: [dateMixins],
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('expensespending', ['loading', 'total', 'FilteredCount', 'userExpensesPending']),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),

    validateForm() {
      return !this.errors.any()
    },

    expensesPendingData() {
      return this.userExpensesPending.reduce((acc, item) => {
        acc.push(item)
        return acc
      }, [])
    }
  },
  methods: {
    ...mapMutations('expensespending', { setState: 'SET_STATE' }),
    ...mapActions('expensespending', {
      getUserExpensesPending: 'getUserExpensesPending'
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
      this.getUserExpensesPending({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order,
        filter_by: this.values
      })
    },
    viewSingleEntrepreneur(id, tr) {
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfileId',
        data: tr.id
      })
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfile',
        data: tr
      })
      localStorage.setItem('seekerProfileInfoId', tr.id)
      this.$router.push({
        name: 'Edit Entrepreneur Info',
        params: { id: id, scrollTag: true }
      })
    },
    // first later capital
    titleCase(text) {
      var splitStr = text.toLowerCase().split(' ')
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
      }
      return splitStr.join(' ')
    }
  },
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#expeses-pending__list',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#expeses-pending__list > .con-vs-loading')
      }
    },

    page() {
      this.handleChangePage(this.page)
    },

    // handle callback for send email
    isSendEmailModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isSendEmailModalMounted = false
          }, 0)
        }
      }
    },
    filterBy: {
      handler(newVal) {
        this.page = 1
        this.getData()
      }
    },

    $route: {
      deep: true,
      handler() {
        this.getData()
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isSendEmailModalShow = false
    setTimeout(() => {
      next()
    }, 0)
  }
}
</script>

<style lang="scss" scoped>
#employer-profile {
  .vs-popup {
    width: calc(100% - 50%) !important;
  }
}

.employer_action {
  width: 220px;
  li {
    padding: 5px;
    a {
      display: flex !important;
      align-items: center;
    }
  }
}
</style>
<style lang="scss" scoped>
.vuesax-app-is-ltr .vs-table--search {
  max-width: 100%;

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    width: 100%;
  }
}
.desc {
  margin-top: -1.25rem !important;
  @media (max-width: 425px) {
    margin-top: -0.25rem !important;
  }
}
</style>
<style lang="scss">
.vh-hight-table {
  .vs-con-tbody {
    max-height: calc(100vh - 110px) !important;
  }
}
.remove-tip {
  .vs-dropdown--menu--after {
    display: none;
  }
}
.vs-table--header,
.vs-table--search {
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

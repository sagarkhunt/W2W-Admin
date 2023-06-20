<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="vx-card md:p-8 p-6 md:pb-1">
      <vs-table
        class="vs-con-loading__container vh-hight-table"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="benefitUserClaimFilteredCount"
        pagination
        :max-items="length"
        search
        :data="benefitUserClaimData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th>{{ $t('benefit_title') }} </vs-th>
          <vs-th>{{ $t('claim_date') }} </vs-th>
          <vs-th>{{ $t('full_name') }} </vs-th>
          <vs-th>{{ $t('email') }} </vs-th>
        </template>

        <template slot="header">
          <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
            <div class="mb-3 md:mb-0 md:mr-4 ag-grid-table-actions-left md:w-auto w-full">
              <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2">
                    {{ page * length - (length - (benefitUserClaimFilteredCount && 1)) }}
                    -
                    {{ benefitUserClaimFilteredCount - page * length > 0 ? page * length : benefitUserClaimFilteredCount }}
                    {{ $t('of') }} {{ benefitUserClaimFilteredCount }}
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

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              {{ tr.title }}
            </vs-td>
            <vs-td>
              {{ formatDate(tr.created_at) }}
            </vs-td>
            <vs-td>
              {{ tr.full_name }}
            </vs-td>
            <vs-td>
              {{ tr.email }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <!-- Add Language -->
    <AddBenefitPopup v-if="isAddBenefitModal" :isModalShow.sync="isAddBenefitModalShow" @newInvList="getData()" />
    <!-- End Add Language -->

    <!-- Edit Language -->
    <EditBenefitPopup v-if="isEditBenefitModal" :isModalShow.sync="isEditBenefitModalShow" @indList="getData()" :benefitId="benefitId" />
    <!-- End Edit Language -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AddBenefitPopup from '@/views/settings/benefit-management/components/AddBenefitPopup.vue'
import EditBenefitPopup from '@/views/settings/benefit-management/components/EditBenefitPopup.vue'
import { dateMixins } from '@/mixins/dateMixins.js'

export default {
  name: 'BenefitClaimList',
  components: {
    AddBenefitPopup,
    EditBenefitPopup
  },
  mixins: [dateMixins],
  data() {
    return {
      languagePopup: false,
      updateLanguagePopup: false,
      page: 1,
      length: 10,
      search: '',
      skillId: '',
      //add benefit modal
      isAddBenefitModal: false,
      isAddBenefitModalShow: false,
      //edit benefit
      isEditBenefitModal: false,
      isEditBenefitModalShow: false
    }
  },
  mounted() {
    this.getUserClaimList()
  },
  computed: {
    ...mapState('setting', ['loading', 'benefitUserClaimTotal', 'benefitUserClaimFilteredCount', 'benefitUserClaimData']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('setting', {
      getAllUserClaimList: 'getAllUserClaimList'
    }),
    handleChangeLength(length) {
      this.page = 1
      this.length = length
      this.getUserClaimList()
    },

    handleChangePage(page) {
      this.page = page
      this.getUserClaimList()
    },

    handleSort(key, active) {
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getUserClaimList()
    },

    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getUserClaimList()
    },
    getUserClaimList() {
      const payload = {
        limit: this.length,
        page: this.page,
        search: this.search
      }
      this.$store.dispatch('setting/getAllUserClaimList', { id: this.$route.params.id, payload })
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
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isAddBenefitModalShow = false
    this.isEditBenefitModalShow = false
    setTimeout(() => {
      next()
    }, 0)
  }
}
</script>
<style lang="scss">
.vs-table--header,
.vs-table--search {
  flex-wrap: wrap;
  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
}
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
.remove-tip {
  .vs-dropdown--menu--after {
    display: none;
  }
}
.vh-hight-table {
  .vs-con-tbody {
    max-height: calc(100vh - 110px) !important;
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
</style>

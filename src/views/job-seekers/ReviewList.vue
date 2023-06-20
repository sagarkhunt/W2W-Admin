<template>
  <div class="odd-table">
    <vs-table
      stripe
      :sst="true"
      maxHeight="500px"
      @search="updateSearchQuery"
      @change-page="handleChangePage"
      @sort="handleSort"
      :total="FilteredCountReview"
      pagination
      :max-items="length"
      search
      :data="jobseekerReviewData"
      id="table-loading"
      class="tbl-minwidth"
    >
      <template slot="thead">
        <vs-th>{{ $t('sr') }}</vs-th>
        <vs-th>{{ $t('reviewer') }} </vs-th>
        <vs-th>{{ $t('gig_name') }} </vs-th>
        <vs-th>{{ $t('rating') }} </vs-th>
        <vs-th>{{ $t('review_text') }} </vs-th>
        <vs-th>{{ $t('action') }} </vs-th>
      </template>

      <template slot="header">
        <div class="flex flex-wrap justify-between items-center sm:w-auto xl:w-full">
          <p class="mr-4 mt-5 md:mb-2 font-bold">{{ $t('review_list') }}</p>
        </div>
        <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
          <div class="md:mb-0 md:mr-4 md:w-auto w-full ag-grid-table-actions-left">
            <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
              <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">
                  {{ page * length - (length - (FilteredCountReview && 1)) }}
                  -
                  {{ FilteredCountReview - page * length > 0 ? page * length : FilteredCountReview }}
                  {{ $t('of') }} {{ FilteredCountReview }}
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

      <template slot="header">
        <div class="flex flex-wrap justify-between items-center">
          <div @click="addRecviewRecord" class="btn-add-new p-2 md:mr-4 mb-3 ml-auto rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary">
            <span class="ml-2 text-base text-primary">{{ $t('add_review') }}</span>
          </div>
        </div>
      </template>

      <template slot-scope="{ data }" ref="tableBody">
        <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
          <vs-td> {{ tr.id }}</vs-td>
          <vs-td> {{ tr.company_name || '-' }} </vs-td>
          <vs-td> {{ tr.job_title || '-' }} </vs-td>
          <vs-td>
            <div class="col-lg-6 col-12" style="width: max-content">
              <div class="d-flex align-items-center">
                <div class="rating-icon flex items-center justify-center">
                  <div v-if="tr.rate">
                    <span v-for="(item, index) in 5" :key="index">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" :fill="tr.rate > index ? '#E4AA18' : '#9E9E9E'" class="start-width review-star">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div v-else>
                    {{ tr.rate }}
                  </div>
                </div>
              </div>
            </div>
          </vs-td>
          <vs-td>
            <p class="truncate text-max">
              {{ tr.comment }}
            </p>
          </vs-td>
          <vs-td>
            <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
              <vx-tooltip :text="$t('tooltip.EditReviwe')">
                <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecviewRecord(tr.id)" />
              </vx-tooltip>
              <vx-tooltip :text="$t('tooltip.DeletePayslip')">
                <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="deleteRecordReview(tr.id)" />
              </vx-tooltip>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <AddReviewPopUpModal v-if="isAddReviewModalMounted" :isModalShow.sync="isAddReviewModalShow" @done="getData" />
    <EditReviewPopUpModal v-if="isEditReviewModalMounted" :isModalShow.sync="isEditReviewModalShow" :reviewId="reviewId" @done="getData" />
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import AddReviewPopUpModal from './components/AddReviewPopUpModal.vue'
import EditReviewPopUpModal from './components/EditReviewPopUpModal.vue'
import moment from 'moment'
import Vue from 'vue'
export default {
  name: 'ReviewList',
  components: {
    Select2,
    DatePicker,
    AddReviewPopUpModal,
    EditReviewPopUpModal
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
      extra_info: '',
      // review modal
      isAddReviewModalMounted: false,
      isAddReviewModalShow: false,
      // edit review
      isEditReviewModalMounted: false,
      isEditReviewModalShow: false,

      generating: false,
      reviewId: ''
    }
  },
  mixins: [dateMixins],
  async mounted() {
    await this.getData()
  },
  computed: {
    ...mapState('jobseeker', ['loading', 'totalReview', 'FilteredCountReview', 'leAllReviewList']),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),

    console: () => console,

    // For Validation
    validateForm() {
      return !this.errors.any()
    },

    jobseekerReviewData() {
      return this.leAllReviewList.reduce((acc, item) => {
        acc.push(item)
        return acc
      }, [])
    },

    daysCounted() {
      const currentDate = new Date()
      var dateOne = moment(currentDate)
      var dateTwo = moment(this.lastLoginDate)
      var result = dateOne.diff(dateTwo, 'days')
      return result
    }
  },
  methods: {
    ...mapActions('jobseeker', {
      getAllReviewList: 'getAllReviewList',
      deleteReviewRecord: 'deleteReviewRecord'
    }),

    ...mapMutations('jobseeker', { setState: 'SET_STATE' }),

    addRecviewRecord() {
      this.isAddReviewModalMounted = true
      this.isAddReviewModalShow = true
    },

    editRecviewRecord(reviewId) {
      this.reviewId = reviewId
      this.isEditReviewModalMounted = true
      this.isEditReviewModalShow = true
    },
    deleteRecordReview(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: 'Confirm Delete',
        text: 'Are you sure, you want to delete this record?',
        accept: () => this.deleteRecordRecordById(id),
        acceptText: 'Delete'
      })
    },
    async deleteRecordRecordById(id) {
      try {
        const { message } = await this.deleteReviewRecord(id)
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.getData()
      } catch ({ message }) {
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
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

    async getData() {
      await this.getAllReviewData()
    },

    getAllReviewData() {
      const payload = {
        page: this.page,
        limit: this.length,
        order: this.order,
        search: this.search
      }
      this.$store.dispatch('jobseeker/getAllReviewList', { id: this.$route.params.id, payload })
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
    isAddReviewModalShow: {
      immediate: true,
      handler(newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.isAddReviewModalMounted = false
          }, 0)
        }
      }
    },
    isEditReviewModalShow: {
      immediate: true,
      handler(newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.isEditReviewModalMounted = false
          }, 0)
        }
      }
    },
    isActivityPointModalShow: {
      immediate: true,
      handler(newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.isActivityPointModalMounted = false
          }, 0)
        }
      }
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

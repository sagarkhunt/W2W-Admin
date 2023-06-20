<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="vx-card md:p-8 p-6 md:pb-1">
      <vs-table
        id="table-loading"
        class="vs-con-loading__container vh-hight-table"
        stripe
        :sst="true"
        maxHeight="750px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCountUserInsurance"
        :max-items="length"
        search
        :data="jobseekerData"
      >
        <template slot="thead">
          <vs-th sort-key="">{{ $t('sr') }}</vs-th>
          <vs-th sort-key="created_at">{{ $t('date_joined') }}</vs-th>
          <vs-th>{{ $t('profile_picture') }}</vs-th>
          <vs-th sort-key="full_name">{{ $t('light_entrepreneur_name') }}</vs-th>
          <vs-th sort-key="email">{{ $t('email_address') }}</vs-th>
          <vs-th>{{ $t('street_address') }}</vs-th>
          <vs-th sort-key="city_name">{{ $t('city') }}</vs-th>
        </template>

        <template slot="header">
          <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
            <div class="md:mb-0 md:mr-4 md:w-auto w-full ag-grid-table-actions-left">
              <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2">
                    {{ page * length - (length - (FilteredCountUserInsurance && 1)) }}
                    -
                    {{ FilteredCountUserInsurance - page * length > 0 ? page * length : FilteredCountUserInsurance }}
                    {{ $t('of') }} {{ FilteredCountUserInsurance }}
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
              {{ formatDate(tr.seeker && tr.seeker.user && tr.seeker.user.created_at) }}
            </vs-td>
            <vs-td>
              <span v-if="tr.seeker.user.file_path">
                <img :src="tr.seeker.user.file_path" :alt="tr.full_name" height="80" width="80" />
              </span>
              <span v-else> - </span>
            </vs-td>
            <vs-td>
              <div v-if="tr.seeker.user.full_name" class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewSingleEntrepreneur(tr.seeker.id, tr.seeker.user.id)">
                  {{ tr.seeker.user.full_name }}
                </p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td>
              {{ tr.seeker && tr.seeker.user && tr.seeker.user.email }}
            </vs-td>
            <vs-td>
              {{ tr.seeker && tr.seeker.address ? tr.seeker.address : '-' }}
            </vs-td>
            <vs-td>
              {{ (tr.seeker && tr.seeker.user && tr.seeker.user.cityReference && tr.seeker.user.cityReference.city_name) || '-' }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <div class="centerx">
        <vs-pagination :total="Math.ceil(FilteredCountUserInsurance / length)" v-model="page"></vs-pagination>
      </div>
    </div>
    <!-- Send Mail -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="activePromptForMail" :title="$t('model.SendMail')">
      <div class="con-exemple-prompt">
        <vs-input placeholder="Name" vs-placeholder="Name" v-model="val" class="mt-3 w-full" />
        <vs-input placeholder="Email" vs-placeholder="Email" v-model="val" class="mt-3 w-full" />
        <vs-input placeholder="Subject" vs-placeholder="Subject" v-model="val" class="mt-3 w-full" />
        <vs-textarea label="Message Body" width="300px" class="mt-3 w-full" />
      </div>
      <div class="footer text-right">
        <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="activePromptForMail = false"> {{ $t('close') }} </vs-button>

        <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" type="submit">{{ $t('send') }}</button>
      </div>
    </vs-popup>
    <SendEmailModal v-if="isSendEmailModalMounted" :isModalShow.sync="isSendEmailModalShow" :jobseeker="selectedJobseeker" />
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import SendEmailModal from '@/views/job-seekers/components/SendEmailModal'

export default {
  name: 'ViewInsuranceUser',
  components: {
    Select2,
    SendEmailModal
  },
  data() {
    return {
      activePromptForMail: false,
      invoiceUpdate: false,
      selectedJobseeker: null,
      order: [],
      length: 10,
      page: 1,
      search: '',
      val: '',
      data: [{}],
      seekerId: '',
      star: 0,
      userLeSeekerId: [],
      generating: false,

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
    ...mapState('setting', ['loading', 'TotalUserInsurance', 'FilteredCountUserInsurance', 'userInsuranceData']),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),
    jobseekerData() {
      return this.userInsuranceData.reduce((acc, item) => {
        item.jobseekerStatus = item.status === 'blocked' ? false : true
        acc.push(item)
        return acc
      }, [])
    }
  },
  methods: {
    ...mapActions('setting', {
      getAllUserInsurance: 'getAllUserInsurance',
      downloadPDFReport: 'downloadPDFReport'
    }),
    clearInvoiceIds() {
      this.userLeSeekerId = []
    },
    // for select id for le list
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
      if (!key) return
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
      const payload = {
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order
      }
      this.$store.dispatch('setting/getAllUserInsurance', { id: this.$route.params.id, payload })
    },
    viewSingleEntrepreneur(seekerId, userId) {
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfileId',
        data: seekerId
      })

      localStorage.setItem('seekerProfileInfoId', userId)
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
.vs-button-warning.vs-button-filled {
  background: #000 !important;
}

.start-width {
  width: 30px;
}

.review-star:hover {
  fill: #e4aa18;
  cursor: pointer;
}

.desc {
  margin-top: -1.25rem !important;

  @media (max-width: 425px) {
    margin-top: -0.25rem !important;
  }
}
</style>

<style lang="scss">
.vuesax-app-is-ltr .vs-table--search {
  @media (max-width: 768px) {
    width: auto;
  }

  @media (max-width: 425px) {
    width: 100%;
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

.min-h-table {
  max-height: 620px;
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
</style>

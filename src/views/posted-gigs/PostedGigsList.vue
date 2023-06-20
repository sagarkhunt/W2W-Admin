<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_see_all_the_gigs_and_you_can_manage_it') }}</div>
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
        :total="FilteredCount"
        :max-items="this.length"
        search
        :data="postedJobData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="created_at">{{ $t('added_date') }}</vs-th>
          <vs-th sort-key="apply_before">{{ $t('last_date') }}</vs-th>
          <vs-th sort-key="job_title">{{ $t('gig_title') }}</vs-th>
          <vs-th sort-key="company_name">{{ $t('company_name') }}</vs-th>
          <vs-th sort-key="city_name">{{ $t('city') }}</vs-th>
          <vs-th>{{ $t('gig_preview') }}</vs-th>
          <vs-th sort-key="job_status" v-if="checkPermissionByIds([permissions.POSTED_JOB_EDIT])">{{ $t('status') }}</vs-th>
          <vs-th v-if="checkPermissionByIds([permissions.POSTED_JOB_EDIT]) || checkPermissionByIds([permissions.POSTED_JOB_DELETE])">{{ $t('action') }}</vs-th>
        </template>

        <template slot="header">
          <div class="flex flex-wrap justify-between items-end mb-4 md:w-auto w-full">
            <div class="mb-3 md:mb-0 md:mr-4 ag-grid-table-actions-left md:w-auto w-full">
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
            <div
              v-if="checkPermissionByIds([permissions.POSTED_JOB_ADD])"
              @click="$router.push('/create/gig-post')"
              class="btn-add-new p-2 md:mr-4 rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary sm:ml-auto sm:w-auto w-full sm:mb-auto mb-4"
            >
              <span class="text-base text-primary text-center">{{ $t('add_gig_post') }}</span>
            </div>
            <div class="width sm:mr-2 mr-0 sm:w-auto w-full">
              <select-2 id="filterby" :value="filterBy" @input="(item) => (filterBy = item && item.value)" name="Select filterby" placeholder="All" autocomplete :options="gigstatus.map(x=>({...x, label: $t(x.label)}))" />
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              {{ formatDate(tr.created_at) }}
            </vs-td>
            <vs-td v-if="tr.diffDays === 3">
              <span style="color: red">{{ formatDate(tr.apply_before) }}</span>
            </vs-td>
            <vs-td v-else-if="tr.pastDate == true">
              <span style="color: red">{{ formatDate(tr.apply_before) }}</span>
            </vs-td>
            <vs-td v-else>
              {{ formatDate(tr.apply_before) }}
            </vs-td>
            <vs-td>
              <div v-if="tr.job_title" class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                {{ tr.job_title }}
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td>
              <div v-if="tr.company && tr.company.company_name" class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewPostedRecord(tr.company && tr.company.id, tr.company)">
                  {{ tr.company && tr.company.company_name }}
                </p>
              </div>
              <div v-else></div>
            </vs-td>
            <vs-td>
              {{ tr.cityReference && tr.cityReference.city_name }}
            </vs-td>

            <vs-td v-if="checkPermissionByIds([permissions.POSTED_JOB_EDIT]) || checkPermissionByIds([permissions.POSTED_JOB_DELETE])">
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.QuickPreview')">
                  <feather-icon icon="EyeIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="quickPreview(tr)" />
                </vx-tooltip>
              </div>
            </vs-td>

            <vs-td v-if="checkPermissionByIds([permissions.POSTED_JOB_EDIT])">
              <vs-switch color="primary" v-model="tr.jobStatus" vs-value="active" @input="updateJobPostStatus(tr.id, tr.jobStatus)">
                <span slot="on">{{ $t('active') }}</span>
                <span slot="off">{{ $t('blocked') }}</span>
              </vs-switch>
            </vs-td>

            <vs-td v-if="checkPermissionByIds([permissions.POSTED_JOB_EDIT]) || checkPermissionByIds([permissions.POSTED_JOB_DELETE])">
              <div class="inline-flex items-center" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.Editpost')" v-if="checkPermissionByIds([permissions.POSTED_JOB_EDIT])">
                  <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" v-if="checkPermissionByIds([permissions.POSTED_JOB_EDIT])" @click="gigPostEdit(tr.id)" />
                </vx-tooltip>
                <vx-tooltip :text="$t('tooltip.Deletepost')" v-if="checkPermissionByIds([permissions.POSTED_JOB_DELETE])">
                  <feather-icon
                    icon="Trash2Icon"
                    svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                    v-if="checkPermissionByIds([permissions.POSTED_JOB_DELETE])"
                    @click="deleteRecord(tr.id)"
                  />
                </vx-tooltip>
                <vs-td v-if="checkPermissionByIds([permissions.POSTED_JOB_EDIT])">
                  <vs-dropdown vs-trigger-click class="cursor-pointer">
                    <div class="p-2 border border-solid d-theme-border-grey-light cursor-pointer flex items-center justify-between font-medium">
                      {{ $t('share') }}
                      <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                    </div>
                    <vs-dropdown-menu class="employer_action">
                      <vs-dropdown-item v-if="checkPermissionByIds([permissions.POSTED_JOB_EDIT])">
                        <facebook :url="tr.facebookurl" scale="3"></facebook>
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </vs-td>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <div class="centerx">
        <vs-pagination :total="Math.ceil(FilteredCount / length)" v-model="page"></vs-pagination>
      </div>
    </div>
    <!-- Gigs View -->
    <vs-popup
      button-accept="false"
      button-cancel="false"
      :active.sync="activeGigsView"
      :title="`${$t('model.QuickPreviewofJobPostedBy')} ${posted_company_name.company && posted_company_name.company.company_name}`"
    >
      <div class="con-exemple-prompt p-5">
        <div class="box-body" id="j_box" style="display: block">
          <table width="95%" border="0">
            <tbody>
              <tr>
                <td width="25%">
                  <strong
                    ><span class="form-group">{{ $t('job_title') }}</span></strong
                  >
                </td>
                <td id="job_title">{{ posted_company_name.job_title }}</td>
              </tr>
              <tr>
                <td>
                  <strong
                    ><span class="form-group">{{ $t('job_category') }}</span></strong
                  >
                </td>
                <td id="job_cat">{{ posted_company_name.industryReference && posted_company_name.industryReference.industry_name }}</td>
              </tr>
              <tr>
                <td>
                  <strong
                    ><span class="form-group">{{ $t('job_description') }}</span></strong
                  >
                </td>
                <td id="job_desc">{{ posted_company_name && posted_company_name.job_description }}</td>
              </tr>
              <tr>
                <td colspan="2"><strong>&nbsp;</strong></td>
              </tr>
              <tr>
                <td>
                  <strong
                    ><span class="form-group">{{ $t('contact_name') }}</span></strong
                  >
                </td>
                <td id="contact_name">{{ posted_company_name.company && posted_company_name.company.company_name }}</td>
              </tr>
              <tr>
                <td>
                  <strong
                    ><span class="form-group">{{ $t('contact_phone') }}</span></strong
                  >
                </td>
                <td id="contact_phone">{{ posted_company_name.company && posted_company_name.company.mobile }}</td>
              </tr>
              <tr>
                <td>
                  <strong
                    ><span class="form-group">{{ $t('contact_email') }}</span></strong
                  >
                </td>
                <td id="contact_email">{{ posted_company_name.company && posted_company_name.company.user && posted_company_name.company.user.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import { Facebook, Twitter, Linkedin, Pinterest, Reddit, Telegram, WhatsApp, Email, Google, Instagram } from 'vue-socialmedia-share'
import { gigstatus } from '@/utils/GigMode.js'

export default {
  name: 'PostedJobsList',

  data() {
    return {
      gigstatus,
      filterBy: 'all',
      activeGigsView: false,
      invoiceUpdate: false,
      order: [],
      length: 10,
      page: 1,
      search: '',
      val: '',
      posted_company_name: '',
    }
  },
  mixins: [dateMixins],
  computed: {
    isActive: {
      get() {
        return this.isModalShow
      },

      set(val) {
        // handle background scroll
        // backgroundScrollHandler(false)
        this.$emit('update:isModalShow', val)
      }
    },
    ...mapState('postedJobs', ['loading', 'total', 'FilteredCount', 'postedJobs', 'employerCompanyId']),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),
    postedJobData() {
      return this.postedJobs.reduce((acc, item) => {
        const date1 = new Date()
        const date2 = new Date(item.apply_before)
        if (date2 <= date1) {
          item.pastDate = true
        } else {
          item.pastDate = false
        }
        const diffTime = Math.abs(date2 - date1)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        item.diffDays = diffDays

        item.jobStatus = item.is_active == true ? true : false
        item.jobFeaturedStatus = item.is_featured ? true : false
        item.twiturl = `${process.env.VUE_APP_FRONT_BASE_URL}:3002/${item.id}/${item.job_slug}`
        item.facebookurl = `${process.env.VUE_APP_FRONT_BASE_URL}:3002/${item.id}/${item.job_slug}`
        acc.push(item)
        return acc
      }, [])
    }
  },

  methods: {
    ...mapActions('postedJobs', { getAllPostedGigs: 'getAllPostedGigs', updateStatus: 'updateStatus', featuredStatus: 'featuredStatus', deletePostedJob: 'deletePostedJob' }),
    gigPostEdit(id) {
      this.$router.push(`/posted-jobs/${id}/edit-gigs-post`)
    },
    viewPostedRecord(id,tr) {
      this.$store.commit('employer/SET_STATE', {
        action: 'employerCompanyId',
        data: tr.user.id
      })
      localStorage.setItem('employerCompanyId', id)
      localStorage.setItem('empCompanyId', tr.user.id)
      this.$router.push(`/employer/${id}/info`)
    },

    quickPreview(company_name) {
      this.activeGigsView = true
      this.posted_company_name = company_name
    },
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
      this.getAllPostedGigs({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order,
        filter_by: this.filterBy
      })
    },
    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.deleteConform'),
        accept: () => this.deletePostedRecord(id),
        acceptText: 'Delete'
      })
    },
    async deletePostedRecord(id) {
      try {
        const { message } = await this.deletePostedJob(id)
        this.$vs.notify({
          title: this.$t('delete_conformation.Success'),
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
    async updateJobPostStatus(id, job_status) {
      try {
        const { message } = await this.updateStatus({
          id,
          job_status: job_status ? 'active' : 'inactive'
        })
        this.getData()
        this.$vs.notify({
          title: this.$t('delete_conformation.Success'),
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
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
    async updateFeaturedStatus(id, is_featured) {
      try {
        const { message } = await this.featuredStatus({
          id,
          is_featured
        })
        this.$vs.notify({
          title: this.$t('delete_conformation.Success'),
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.getData()
      } catch (error) {
        const { message } = error
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
    }
  },
  mounted() {
    // handle background scroll
    // backgroundScrollHandler(true)
    this.getData()
  },
  components: {
    Select2,
    Facebook,
    Twitter,
    Linkedin,
    Pinterest,
    Reddit,
    Telegram,
    WhatsApp,
    Email,
    Google,
    Instagram
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
</style>
<style lang="scss" scoped>
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
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello > span {
  padding: 1em;
}
.gigsFilter-label {
  margin-bottom: 0.1rem;
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
</style>

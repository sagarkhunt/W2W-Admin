<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_see_all_the_le_in_system_and_you_can_manage_its_informations') }}</div>
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
        :max-items="length"
        search
        :data="jobseekerData"
      >
        <template slot="thead">
          <vs-th>-</vs-th>
          <vs-th sort-key="">{{ $t('sr') }}</vs-th>
          <vs-th sort-key="user.created_at">{{ $t('date_joined') }}</vs-th>
          <vs-th>{{ $t('profile_picture') }}</vs-th>
          <vs-th sort-key="user.full_name">{{ $t('light_entrepreneur_name') }}</vs-th>
          <vs-th sort-key="user.email">{{ $t('email_address') }}</vs-th>
          <vs-th>{{ $t('street_address') }}</vs-th>
          <vs-th>{{ $t('start_rating') }}</vs-th>
          <vs-th sort-key="city_name">{{ $t('city') }}</vs-th>
          <vs-th>{{ $t('applied_gigs') }}</vs-th>
          <vs-th>{{ $t('email') }}</vs-th>
          <vs-th v-if="checkPermissionByIds([permissions.JOBSEEKER_EDIT])">{{ $t('status') }} </vs-th>
          <vs-th v-if="checkPermissionByIds([permissions.JOBSEEKER_EDIT]) || checkPermissionByIds([permissions.JOBSEEKER_DELETE]) || checkPermissionByIds([permissions.JOBSEEKER_LOGIN_AS])"
            >{{ $t('action') }}
          </vs-th>
        </template>

        <template slot="header">
          <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
            <div class="md:mb-0 md:mr-4 md:w-auto w-full ag-grid-table-actions-left">
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

            <div class="flex items-end md:order-0 order-1 sm:mt-0 mt-1">
              <div class="md:mb-0 mr-0.5 ag-grid-table-actions-left">
                <vs-row vs-justify="flex-end">
                  <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" id="seekerDetail_pdf" @click="bluckSelectId">{{ $t('download_report') }}</vs-button>
                </vs-row>
              </div>
              <div class="flex btn-gap">
                <div
                  class="btn-add-new sm:w-auto w-full text-center p-2 rounded-lg whitespace-no-wrap cursor-pointer text-lg font-medium text-primary border border-solid border-primary lg:ml-auto sm:mb-0 md:ml-0 sm:ml-2"
                >
                  <span class="text-base text-primary" @click="clearInvoiceIds">{{ $t('clear_selected_row') }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              <vs-checkbox class="ml-3" v-model="userLeSeekerId" :vs-value="tr.jobSeeker.id"></vs-checkbox>
            </vs-td>
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              {{ formatDate(tr.created_at) }}
            </vs-td>
            <vs-td>
              <span v-if="tr.file_path">
                <img :src="tr.file_path" :alt="tr.full_name" class="img_rounded" height="80" width="80" />
              </span>
              <span v-else> - </span>
            </vs-td>
            <vs-td>
              <div v-if="tr.full_name" class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewSingleEntrepreneur(tr.jobSeeker && tr.jobSeeker.id, tr)">
                  {{ tr.full_name }}
                </p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td>
              {{ tr.email }}
            </vs-td>
            <vs-td>
              {{ tr.jobSeeker && tr.jobSeeker.address ? tr.jobSeeker.address : '-' }}
            </vs-td>
            <vs-td>
              <div class="col-lg-6 col-12" style="width: max-content">
                <div class="d-flex align-items-center">
                  <div class="rating-icon flex items-center justify-center">
                    <div v-if="tr.jobSeeker && tr.jobSeeker.rating_avg">
                      <span v-for="(item, index) in 5" :key="index">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" :fill="tr.jobSeeker.rating_avg > index ? '#E4AA18' : '#9E9E9E'" class="start-width review-star">
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      </span>
                    </div>
                    <div v-else>
                      {{ tr.jobSeeker && tr.jobSeeker.rating_avg }}
                    </div>
                  </div>
                </div>
              </div>
            </vs-td>
            <vs-td>
              {{ tr.cityReference && tr.cityReference.city_name ? tr.cityReference.city_name : '-' }}
            </vs-td>
            <vs-td>
              <div class="" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vs-button @click="tr.jobSeeker && viweJobProposal(tr.jobSeeker.id)" size="small" color="warning" class="w-full">
                  {{ $t('view') }}({{ tr.jobSeeker && tr.jobSeeker.job_proposal ? tr.jobSeeker && tr.jobSeeker.job_proposal : '-' }}) </vs-button
                ><br />
                <vs-button @click="tr.jobSeeker && viewResumeRequest(tr.jobSeeker.id)" size="small" color="success" class="mt-2">
                  {{ $t('access_requests') }}({{ tr.jobSeeker && tr.jobSeeker.resume_request ? tr.jobSeeker && tr.jobSeeker.resume_request : '-' }})
                </vs-button>
              </div>
            </vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.SendEmail')">
                  <feather-icon icon="SendIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="toggleSendEmailPopup(tr)" />
                </vx-tooltip>
              </div>
            </vs-td>
            <vs-td v-if="checkPermissionByIds([permissions.JOBSEEKER_EDIT])">
              <vs-button @click="pendingToActive(tr.id, tr.status)" v-if="tr.status == 'pending'" size="small" color="warning"> {{ $t('pending') }} </vs-button>
              <vs-switch v-else color="primary" v-model="tr.jobseekerStatus" vs-value="active" @input="updateStatus(tr.id, tr.status)">
                <span slot="on">{{ $t('active') }}</span>
                <span slot="off">{{ $t('blocked') }}</span>
              </vs-switch>
            </vs-td>
            <vs-td>
              <div
                class="inline-flex"
                :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }"
                v-if="checkPermissionByIds([permissions.JOBSEEKER_EDIT]) || checkPermissionByIds([permissions.JOBSEEKER_DELETE]) || checkPermissionByIds([permissions.JOBSEEKER_LOGIN_AS])"
              >
                <vx-tooltip :text="$t('tooltip.EditLightEntrepreneur')" v-if="checkPermissionByIds([permissions.JOBSEEKER_EDIT])">
                  <feather-icon
                    icon="EditIcon"
                    svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                    v-if="checkPermissionByIds([permissions.JOBSEEKER_EDIT])"
                    @click="sendToEditEmployer(tr.id)"
                  />
                </vx-tooltip>

                <vx-tooltip :text="$t('tooltip.DeleteLightEntrepreneur')" v-if="checkPermissionByIds([permissions.JOBSEEKER_DELETE])">
                  <feather-icon
                    icon="Trash2Icon"
                    svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                    v-if="checkPermissionByIds([permissions.JOBSEEKER_DELETE])"
                    @click="deleteRecord(tr.id)"
                  />
                </vx-tooltip>
                <br />
                <vx-tooltip :text="$t('tooltip.LoginLightEntrepreneur')">
                  <a @click="loginAsJobseeker(tr.id)"><feather-icon icon="KeyIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" /></a>
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <div class="centerx">
        <vs-pagination :total="Math.ceil(FilteredCount / length)" v-model="page"></vs-pagination>
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
  name: 'jobseekersList',
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
    ...mapState('jobseeker', ['loading', 'total', 'FilteredCount', 'jobseekers', 'jobseekerInfo']),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),
    jobseekerData() {
      return this.jobseekers.reduce((acc, item) => {
        item.jobseekerStatus = item.status === 'blocked' ? false : true
        acc.push(item)
        return acc
      }, [])
    }
  },
  methods: {
    ...mapActions('jobseeker', {
      getAllJobSeekers: 'getAllJobSeekers',
      updateJobseekerStatus: 'updateJobseekerStatus',
      deleteJobseeker: 'deleteJobseeker',
      loginAsSeekerDashboard: 'loginAsSeekerDashboard',
      downloadPDFReport: 'downloadPDFReport'
    }),
    clearInvoiceIds() {
      this.userLeSeekerId = []
    },
    // for select id for le list
    async bluckSelectId() {
      if (this.userLeSeekerId.length == 0) {
        this.$vs.notify({
          title: 'Please select any one record.',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
        return
      }
      this.generating = true
      await this.downloadPDFReport({
        seekerIds: this.userLeSeekerId
      }).then((res) => {
        this.downLoadFile(res.data)
        this.generating = false
        this.userLeSeekerId = []
      })
    },
    async downLoadFile(data) {
      try {
        const url = await URL.createObjectURL(data)
        const a = document.createElement('a')
        a.href = url
        a.download = `LeSeekerStastics.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } catch (err) {
        console.log({ err })
      }
    },

    sendToEditEmployer(id) {
      this.$router.push(`/jobseeker/${id}/edit`)
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
      this.$router.push(`/jobseeker/${id}/info`)
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
      await this.getAllJobSeekers({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order
      })
    },
    viewSingleJobseeker(id) {
      this.$router.push(`/jobseeker/${id}/info`)
    },

    //login to jobseeker
    loginAsJobseeker(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.loginAsJobseeker'),
        accept: () => this.loginJobseekerDashboard(id),
        acceptText: this.$t('yes')
      })
    },
    async loginJobseekerDashboard(id) {
      try {
        const { jobSeekerToken } = await this.loginAsSeekerDashboard(id)
        window.open(`${process.env.VUE_APP_FRONT_BASE_URL}/authlogin/?accToken=${jobSeekerToken}`, '_blank')
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

    //delete job seeker
    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.deleteConform'),
        accept: () => this.deleteJobseekerRecord(id),
        acceptText: 'Delete'
      })
    },
    async deleteJobseekerRecord(id) {
      try {
        const { message } = await this.deleteJobseeker(id)
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
    // Status Pending to Active
    async pendingToActive(id, status) {
      try {
        const { message } = await this.updateJobseekerStatus({
          id,
          status: 'active'
        })

        this.$vs.notify({
          title: this.$t('delete_conformation.Success'),
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
          const { message } = await this.updateJobseekerStatus({
            id,
            status: 'blocked'
          })
          this.$vs.notify({
            title: this.$t('delete_conformation.Success'),
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
          this.getData()
        } else {
          const { message } = await this.updateJobseekerStatus({
            id,
            status: 'active'
          })
          this.getData()
          this.$vs.notify({
            title: this.$t('delete_conformation.Success'),
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
    //view job proposal
    viweJobProposal(id) {
      this.$router.push({
        name: 'ViewProposal',
        params: {
          id
        }
      })
    },
    // view Resume Request
    viewResumeRequest(id) {
      this.$router.push({
        name: 'RequestResume',
        params: {
          id
        }
      })
    },

    // Send Mail
    toggleSendEmailPopup(tr) {
      this.selectedJobseeker = tr
      this.isSendEmailModalMounted = true
      this.isSendEmailModalShow = true
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
.img_rounded {
  border-radius: 0.7rem;
  overflow: hidden;
}
</style>

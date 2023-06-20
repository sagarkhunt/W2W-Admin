<template>
  <div class="employer__list">
    <div class="mb-6 desc">{{ $t('here_you_see_the_list_of_all_private_and_business') }}</div>
    <div class="vx-card md:p-8 p-6 md:pb-1">
      <vs-table
        id="employer__list"
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
        :data="employerData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th>{{ $t('profileType') }}</vs-th>
          <vs-th>{{ $t('recipientType') }}</vs-th>
          <vs-th>{{ $t('date_joined') }}</vs-th>
          <vs-th sort-key="user.full_name">{{ $t('name') }}</vs-th>
          <vs-th sort-key="user.email">{{ $t('email_address') }}</vs-th>
          <vs-th>{{ $t('posted_gigs') }}</vs-th>
          <vs-th sort-key="company.company_name">{{ $t('company') }}</vs-th>
          <vs-th sort-key="company.created_by">{{ $t('createdBy') }}</vs-th>
          <vs-th sort-key="is_top">{{ $t('top_employer') }}</vs-th>
          <vs-th sort-key="user.status">{{ $t('status') }}</vs-th>
          <vs-th>{{ $t('send_email') }}</vs-th>
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
            <div
              v-if="checkPermissionByIds([permissions.EMPLOYER_ADD])"
              @click="$router.push('/create/employer')"
              class="btn-add-new p-2 md:mr-4 rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary sm:ml-auto sm:w-auto w-full text-center"
            >
              <span class="text-base text-primary">{{ $t('add_employer') }}</span>
            </div>

            <div
              v-if="checkPermissionByIds([permissions.EMPLOYER_ADD])"
              @click="swaipValue(values)"
              class="btn-add-new p-2 md:mr-4 rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary sm:ml-auto sm:w-auto w-full text-center sm:mt-0 mt-2"
            >
              <span class="text-base text-primary">{{ $t('view_all') }} {{ values == 'root' ? $t('custom') : $t('root') }} {{ $t('recipient') }}</span>
            </div>
          </div>
          <div class="mb-3"></div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <!-- TYpe -->
            <vs-td v-if="tr.company && tr.company.owner_ship_type && tr.company.owner_ship_type == 'public'">
              {{ 'Business' }}
            </vs-td>
            <vs-td v-else>
              {{ 'Private' }}
            </vs-td>

            <vs-td v-if="tr.company.reg_type === 'from_seeker'"> Le </vs-td>
            <vs-td v-else> Root </vs-td>
            <!-- joined date -->
            <vs-td>
              {{ formatDate(tr.created_at) }}
            </vs-td>

            <!-- full name -->
            <vs-td>
              <div v-if="tr.full_name" class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <a style="font-wight: 600; color: #626262" @click="viewSingleEmployer(tr.company.id, tr)">{{ tr.full_name }}</a>
              </div>
              <div v-else>-</div>
            </vs-td>

            <vs-td>
              {{ tr.email }}
            </vs-td>
            <vs-td> {{ tr.company && tr.company.job_post }} </vs-td>
            <vs-td>
              <div v-if="tr.company && tr.company.company_name" class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewSingleEmployer(tr.company.id, tr)">
                  {{ tr.company && tr.company.company_name }}
                </p>
              </div>
              <div v-else>-</div>
            </vs-td>

            <vs-td>
              <a style="font-wight: 600; color: #626262" @click="viewSingleEntrepreneur(tr.company.createdById)">{{ (tr.company && tr.company.createdBy && tr.company.createdBy.full_name) || '-' }}</a>
            </vs-td>

            <!-- top employer -->
            <vs-td>
              <vs-switch color="success" v-model="tr.EmployeTopStatus" vs-value="true" @input="topEmployer(tr.id, tr.EmployeTopStatus)">
                <span slot="on">{{ $t('yes') }}</span>
                <span slot="off">{{ $t('no') }}</span>
              </vs-switch>
            </vs-td>

            <!-- status -->
            <vs-td>
              <vs-button @click="pendingToActive(tr.id, tr.status)" v-if="tr.status == 'pending'" size="small" color="warning"> {{ $t('pending') }} </vs-button>
              <vs-switch v-else color="primary" :value="tr.employerStatus" vs-value="active" @click="updateStatus(tr.id, tr.status)">
                <span slot="on">{{ $t('active') }}</span>
                <span slot="off">{{ $t('blocked') }}</span>
              </vs-switch>
            </vs-td>

            <!-- send email -->
            <vs-td>
              <vx-tooltip :text="$t('tooltip.SendEmail')">
                <feather-icon icon="SendIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="toggleSendEmailPopup(tr)" />
              </vx-tooltip>
            </vs-td>

            <vs-td v-if="checkPermissionByIds([permissions.EMPLOYER_EDIT]) || checkPermissionByIds([permissions.EMPLOYER_LOGIN_AS]) || checkPermissionByIds([permissions.EMPLOYER_DELETE])">
              <vs-dropdown vs-trigger-click class="cursor-pointer">
                <div class="p-4 border border-solid d-theme-border-grey-light cursor-pointer flex items-center justify-between font-medium">
                  {{ $t('action') }}
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu class="employer_action">
                  <span v-if="tr.company.quick_pay_status">
                    <vs-dropdown-item @click="quickPayInactive(tr.company.id, tr.company.quick_pay_status)" v-if="checkPermissionByIds([permissions.EMPLOYER_EDIT])">
                      <feather-icon icon="CreditCardIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" /> {{ $t('quick_pay_inactive') }}
                    </vs-dropdown-item>
                  </span>
                  <span v-else>
                    <vs-dropdown-item @click="quickPayInactive(tr.company.id, tr.company.quick_pay_status)" v-if="checkPermissionByIds([permissions.EMPLOYER_EDIT])">
                      <feather-icon icon="CreditCardIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" /> {{ $t('quick_pay_active') }}
                    </vs-dropdown-item>
                  </span>
                  <vs-dropdown-item @click="sendToEditEmployer(tr.company.id)" v-validate="'required'" v-if="checkPermissionByIds([permissions.EMPLOYER_EDIT])">
                    <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />{{ $t('edit_employer') }}
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="loginAsCompany(tr.id)" v-validate="'required'" v-if="checkPermissionByIds([permissions.EMPLOYER_LOGIN_AS])">
                    <feather-icon icon="KeyIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" /> {{ $t('login_as_employer') }}
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="deleteRecord(tr.id)" v-validate="'required'" v-if="checkPermissionByIds([permissions.EMPLOYER_DELETE])">
                    <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" /> {{ $t('delete_employer') }}
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
import { jsPDF } from 'jspdf'
import Select2 from '@/components/custom/form-elements/Select2.vue'

export default {
  name: 'EmployersList',
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
    ...mapState('employer', ['loading', 'total', 'FilteredCount', 'employers', 'employerInfo', 'employerCompanyId']),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),

    validateForm() {
      return !this.errors.any()
    },

    employerData() {
      return this.employers.reduce((acc, item) => {
        item.employerStatus = item.status === 'blocked' ? false : true
        item.EmployeTopStatus = item.company && item.company.is_top === false ? false : true
        acc.push(item)
        return acc
      }, [])
    }
  },
  methods: {
    ...mapMutations('employer', { setState: 'SET_STATE' }),
    ...mapActions('employer', {
      getAllEmployer: 'getAllEmployers',
      updateCompanyStatus: 'updateCompanyStatus',
      deleteEmployer: 'deleteEmployer',
      getEmployerById: 'getEmployerById',
      updateIsTopEmployer: 'updateIsTopEmployer',
      loginCompanyDashboard: 'loginCompanyDashboard',
      updatequickPayInactiveStatus: 'updatequickPayInactiveStatus'
    }),

    sendToEditEmployer(id) {
      this.$router.push(`/employer/${id}/edit`)
    },
    //quick Pay Inactive
    quickPayInactive(id, status) {
      const unableDisable = status == true ? 'disable' : 'unable'
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: 'Confirm',
        text: `Are you sure, you want to ${unableDisable} ?`,
        accept: () => this.quickPayInactiveStatus(id, status),
        acceptText: 'Yes'
      })
    },
    async quickPayInactiveStatus(id, statusTest) {
      try {
        const status = statusTest == true ? false : true
        const { message } = await this.updatequickPayInactiveStatus({
          id,
          status
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
    //login to Company as employer
    loginAsCompany(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.loginAsRecipient'),
        accept: () => this.loginAsCompanyDashboard(id),
        acceptText: 'Yes'
      })
    },
    async loginAsCompanyDashboard(id) {
      try {
        const { employerToken } = await this.loginCompanyDashboard(id)
        window.open(`${process.env.VUE_APP_FRONT_BASE_URL}/authlogin/?accToken=${employerToken}`, '_blank')
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

    viewSingleEmployer(id, tr) {
      this.$store.commit('employer/SET_STATE', {
        action: 'employerCompanyId',
        data: tr.id
      })
      localStorage.setItem('employerCompanyId', id)
      localStorage.setItem('empCompanyId', tr.id)
      this.$router.push(`/employer/${id}/info`)
    },
    downloadEmployerList(tr) {
      var generateData = function (amount) {
        var result = []
        var data = {
          Name: tr.full_name
        }
        for (var i = 0; i < amount; i += 1) {
          data.id = (i + 1).toString()
          result.push(Object.assign({}, data))
        }
        return result
      }

      function createHeaders(keys) {
        var result = []
        for (var i = 0; i < keys.length; i += 1) {
          result.push({
            id: keys[i],
            name: keys[i],
            prompt: keys[i],
            width: 65,
            align: 'center',
            padding: 0
          })
        }
        return result
      }
      var headers = createHeaders(['id', 'Name'])

      var doc = new jsPDF({ putOnlyUsedFpnts: true, orientation: 'landscape' })
      doc.table(1, 1, generateData(1), headers, { autoSize: true })

      doc.save('Employerslist.pdf')
    },

    // Employer Pending To Active
    async pendingToActive(id, status) {
      try {
        const { message } = await this.updateCompanyStatus({
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

    async topEmployer(id, is_top) {
      try {
        const { message } = await this.updateIsTopEmployer({
          id,
          is_top
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

    // Send Mail
    toggleSendEmailPopup(tr) {
      this.selectedEmployer = tr
      this.isSendEmailModalMounted = true
      this.isSendEmailModalShow = true
    },

    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.deleteConform'),
        accept: () => this.deleteEmployerRecord(id),
        acceptText: 'Delete'
      })
    },

    async deleteEmployerRecord(id) {
      try {
        const { message } = await this.deleteEmployer(id)
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
      this.getAllEmployer({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order,
        filter_by: this.values
      })
    },

    swaipValue(val) {
      this.values = val == 'root' ? 'custom' : 'root'
      this.getData()
    },
    viewSingleEntrepreneur(id) {
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfileId',
        data: id
      })
      localStorage.setItem('seekerProfileInfoId', id)
      this.$router.push(`/jobseeker/${id}/info`)
    },

    async updateStatus(id, status) {
      try {
        if (status === 'active') {
          const { message } = await this.updateCompanyStatus({
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
          const { message } = await this.updateCompanyStatus({
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
          container: '#employer__list',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#employer__list > .con-vs-loading')
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

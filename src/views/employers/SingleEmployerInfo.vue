<template>
  <div id="table-loading">
    <div class="vx-card p-6 pb-10 pt-10 pl-10">
      <!-- Employer Information -->
      <div class="flex items-center justify-between mb-5">
        <div class="md:flex items-center">
          <h2 class="mb-1">{{ (companyInfo.company && companyInfo.company.company_name) || '-' }}</h2>
          <h3 class="text-grey mx-3">{{ $t('id') }}:{{ companyInfo.id }}</h3>
          <div class="flex items-center">
            <div class="flex items-center">
              <div class="rating-icon flex items-center justify-center"></div>
            </div>
          </div>
        </div>

        <div class="flex items-center">
          <div>
            <vx-tooltip :text="$t('tooltip.DownloadPdf')">
              <feather-icon icon="DownloadIcon" svgClasses="cursor-pointer h-5 w-5" class="p-2 vs-con-loading__container" id="empDetail_pdf" @click="empDetailPdf(companyInfo)" />
            </vx-tooltip>
          </div>

          <div>
            <vx-tooltip :text="$t('update_password')">
              <feather-icon icon="LockIcon" svgClasses="cursor-pointer h-5 w-5" class="p-2" @click="updatePasswordPopup(companyInfo.id)" />
            </vx-tooltip>
          </div>

          <div>
            <vx-tooltip :text="$t('tooltip.EditEmployer')">
              <feather-icon icon="EditIcon" svgClasses="cursor-pointer h-5 w-5" class="p-2" @click="sendToEditEmployer(companyInfo.company && companyInfo.company.id)" />
            </vx-tooltip>
          </div>
        </div>
      </div>

      <div class="grid xl:grid-cols-3 gap-8">
        <div class="col-span-2">
          <div class="lg:flex block vx-card md:p-8 p-6 gap-5 h-full">
            <div class="flex justify-center enterpreneur-list-col-1">
              <div class="dash-user-profile-img rounded-full relative w-24 h-24">
                <div class="absolute top-0 left-0">
                  <img src="@/assets/images/round-arrow-icon.svg" alt="err" />
                </div>
                <img :src="companyInfo.file_path" alt="puzzle" class="w-full h-full rounded-full object-cover" />
              </div>
            </div>

            <div class="enterpreneur-list-col-2">
              <div class="user-text">
                <div class="flex items-center user-width py-3">
                  <h5 class="font-semibold user-width-col-1">{{ $t('dob') }}</h5>
                  <p class="font-medium">{{ companyInfo.dob ? formatDate(companyInfo.dob) : '-' }}</p>
                </div>

                <div class="flex items-center user-width py-3">
                  <h5 class="font-semibold user-width-col-1">{{ $t('country') }}</h5>
                  <p class="font-medium">{{ (companyInfo.company && companyInfo.company.countryReference && companyInfo.company.countryReference.country_name) || '-' }}</p>
                </div>

                <div class="flex user-width py-3">
                  <h5 class="font-semibold user-width-col-1">{{ $t('address') }}</h5>

                  <div>
                    <p class="font-medium">{{ companyInfo.company && companyInfo.company.address }}</p>
                  </div>
                </div>

                <div class="flex user-width py-3 break-all">
                  <h5 class="font-semibold user-width-col-1">{{ $t('email') }}</h5>
                  <div class="flex flex-wrap w-full">
                    <p class="font-medium">{{ companyInfo.email }}</p>
                  </div>
                </div>

                <div class="flex items-center user-width py-3">
                  <h5 class="font-semibold user-width-col-1">{{ $t('phone') }}</h5>
                  <div class="flex items-center">
                    <p class="font-medium">{{ companyInfo.phone_number }}</p>
                    <div class="w-5 h-5 ml-3">
                      <img src="@/assets/images/whats-up-icon.svg" alt="puzzle" class="w-full h-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="enterpreneur-list-col-3">
              <div class="user-text">
                <div class="flex items-center user-width py-3">
                  <h5 class="font-semibold user-width-col-2">{{ $t('invoices_created') }}</h5>
                  <p class="font-medium">{{ (companyInfo.invoice_details && companyInfo.invoice_details.totalInvoice) || '-' }}</p>
                </div>

                <div class="flex items-center user-width py-3 break-all">
                  <h5 class="font-semibold user-width-col-2">{{ $t('invoices_sum') }}</h5>
                  <p class="font-medium">€ {{ Number(companyInfo.invoice_details && companyInfo.invoice_details.invoiceTotalAmount).toFixed(2) || '-' }}</p>
                </div>

                <div class="flex items-center user-width py-3 break-all">
                  <h5 class="font-semibold user-width-col-2">{{ $t('quick_pay_commission') }}</h5>
                  <p class="font-medium">{{ companyInfo.company && companyInfo.company.quick_pay_commission }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="xl:col-span-1 lg:col-span-2 col-span-2 vx-card md:p-8 p-6 gap-5 mb-0">
          <div class="user-text">
            <div class="flex items-center user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('finished_gigs') }}</h5>
              <p class="font-medium">{{ companyInfo.finished_gigs }}</p>
            </div>
            <div class="flex items-center user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('activity_points') }}</h5>
              <div class="flex items-center">
                <p class="font-medium">
                  {{ companyInfo.activity_points || 0 }}
                </p>
                <div>
                  <vx-tooltip :text="$t('tooltip.Editpoints')">
                    <feather-icon icon="EditIcon" svgClasses="ml-2 h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="toggleEditPoints" />
                  </vx-tooltip>
                </div>
              </div>
            </div>

            <div class="flex items-center user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('registered') }}</h5>
              <p class="font-medium">{{ formatDate(companyInfo.created_at) || '-' }}</p>
            </div>
            <div class="flex user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('last_login') }}</h5>
              <span v-if="this.lastLoginDate == null">
                <span class="text-grey font-semibold text-sm ml-2">{{ $t('notLoginYet') }}</span>
              </span>
              <span v-else>
                <p class="text-lg font-medium flex flex-wrap items-center">
                  {{ formatDate(companyInfo.first_login) || '-' }}

                  <span class="text-grey font-semibold text-sm ml-2">({{ daysCounted }} {{ $t('days_ago') }})</span>
                </p>
              </span>
            </div>
<!-- 
            <div class="flex user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('last_login') }}</h5>
              <span v-if="companyInfo.first_login">
                <span class="text-grey font-semibold text-sm ml-2">{{ $t('notLoginYet') }}</span>
              </span>
              <span v-else>
                <p class="font-medium flex flex-wrap">
                  {{ formatDate(companyInfo.first_login) || '-' }}
                  <span class="text-grey font-semibold text-sm xl:ml-2">({{ daysCounted }} {{ $t('days_ago') }})</span>
                </p>
              </span>
            </div> -->

            <div class="flex items-center user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('account_status') }}</h5>
              <p class="font-medium">{{ companyInfo.status }}</p>
            </div>

            <div class="flex items-center user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('email_verified') }}</h5>
              <p class="font-medium">{{ companyInfo.verified == true ? 'Verified' : 'Unverified' }}</p>
            </div>

            <div class="flex items-center user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('account_enabled') }}</h5>

              <vs-switch color="primary" :value="companyInfo.status == 'active' ? true : false" @input="updateAccountStatus(companyInfo.id, companyInfo.status)" vs-value="active">
                <span slot="on">{{ $t('active') }}</span>
                <span slot="off">{{ $t('blocked') }}</span>
              </vs-switch>
            </div>
          </div>
        </div>
      </div>
      <!-- End Employer Information -->

      <!-- Company Start -->
      <div class="odd-table">
        <vs-table :data="[{}]">
          <template slot="thead">
            <vs-th>{{ $t('sr') }}</vs-th>
            <vs-th>{{ $t('company_name_1') }}</vs-th>
            <vs-th>{{ $t('company_email') }}</vs-th>
            <vs-th>{{ $t('company_phone') }} </vs-th>
            <vs-th>{{ $t('no._of_employees') }}</vs-th>
            <vs-th>{{ $t('company_address') }} </vs-th>
            <vs-th>{{ $t('no._of_jobs_posted') }} </vs-th>
            <vs-th>{{ $t('company_registration_number') }} </vs-th>
            <vs-th>{{ $t('company_website') }} </vs-th>
          </template>

          <template slot="header">
            <div class="flex flex-wrap justify-between items-center mb-3">
              <div>
                <p class="mr-4 mt-5 mb-5 font-bold">{{ $t('company_information') }}</p>
              </div>
            </div>
            <div class="mb-3"></div>
          </template>

          <template ref="tableBody">
            <vs-tr>
              <vs-td> {{ companyInfo.id }} </vs-td>
              <vs-td> {{ companyInfo.company && companyInfo.company.company_name }} </vs-td>
              <vs-td> {{ companyInfo.company && companyInfo.company.company_email }} </vs-td>
              <vs-td> {{ companyInfo.company && companyInfo.company.mobile }} </vs-td>
              <vs-td> {{ companyInfo.company && companyInfo.company.no_of_employees }} </vs-td>
              <vs-td> {{ companyInfo.company && companyInfo.company.address }} </vs-td>
              <vs-td> {{ companyInfo.company && companyInfo.company.job_post }} </vs-td>
              <vs-td> {{ companyInfo.company && companyInfo.company.reg_number }} </vs-td>
              <vs-td> {{ companyInfo.company && companyInfo.company.website }} </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
      <!-- End Company -->

      <!-- Team Memmbers -->
      <div class="even-table">
        <vs-table :data="employerTeamMembers">
          <template slot="thead">
            <vs-th>{{ $t('sr') }}</vs-th>
            <vs-th>{{ $t('employee_name') }} </vs-th>
            <vs-th>{{ $t('occupation') }} </vs-th>
            <vs-th>{{ $t('occupied') }} </vs-th>
            <vs-th>{{ $t('added_on') }} </vs-th>
            <vs-th>{{ $t('current_work_address') }} </vs-th>
            <vs-th v-if="checkPermissionByIds([permissions.EMPLOYER_EDIT]) || checkPermissionByIds([permissions.EMPLOYER_LOGIN_AS]) || checkPermissionByIds([permissions.EMPLOYER_DELETE])"
              >{{ $t('action') }}
            </vs-th>
          </template>

          <template slot="header">
            <div class="flex flex-wrap justify-between items-center mb-3">
              <div>
                <p class="mr-4 mt-5 mb-5 font-bold">{{ $t('team_members') }}</p>
              </div>
              <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left"></div>
            </div>
            <div class="mb-3"></div>
          </template>

          <template slot-scope="{ data }" ref="tableBody">
            <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
              <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
              <vs-td> {{ tr.user && tr.user.full_name }} </vs-td>
              <vs-td>
                {{ formatDate(tr.created_at) }}
              </vs-td>
              <vs-td>
                <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                  <vx-tooltip :text="$t('tooltip.AddOccupation')">
                    <feather-icon icon="PlusIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="AddoccupationPopup" />
                  </vx-tooltip>
                </div>
              </vs-td>
              <vs-td> {{ tr.user && tr.user.full_name }} </vs-td>
              <vs-td> - </vs-td>
              <vs-td v-if="checkPermissionByIds([permissions.EMPLOYER_EDIT]) || checkPermissionByIds([permissions.EMPLOYER_LOGIN_AS]) || checkPermissionByIds([permissions.EMPLOYER_DELETE])">
                <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                  <vx-tooltip :text="$t('tooltip.RemoveTeamMember')" v-if="checkPermissionByIds([permissions.EMPLOYER_DELETE])">
                    <feather-icon
                      icon="Trash2Icon"
                      svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                      v-if="checkPermissionByIds([permissions.EMPLOYER_DELETE])"
                      @click="deleteTeamMemberRecord(tr.id)"
                    />
                  </vx-tooltip>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
      <!-- End Team Members -->

      <!-- Review list start -->
      <EmpActivityLogs />
      <!-- Review list end -->

      <!-- All Registered Employer Via Share Link List -->
      <div class="even-table">
        <vs-table :data="employerRegisterShareLink">
          <template slot="thead">
            <vs-th>{{ $t('sr') }}</vs-th>
            <vs-th>{{ $t('employee_name') }} </vs-th>
            <vs-th>{{ $t('employer_email_1') }} </vs-th>
            <vs-th>{{ $t('registered_date') }} </vs-th>
            <vs-th v-if="checkPermissionByIds([permissions.EMPLOYER_EDIT]) || checkPermissionByIds([permissions.EMPLOYER_LOGIN_AS]) || checkPermissionByIds([permissions.EMPLOYER_DELETE])"
              >{{ $t('action') }}
            </vs-th>
          </template>

          <template slot="header">
            <div class="flex flex-wrap justify-between items-center mb-3">
              <div>
                <p class="mr-4 mt-5 mb-5 font-bold">{{ $t('all_registered_employer_via_share_link_list') }}</p>
              </div>
            </div>
            <div class="mb-3"></div>
          </template>

          <template slot-scope="{ data }" ref="tableBody">
            <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
              <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
              <vs-td>
                {{ tr.id }}
              </vs-td>
              <vs-td>
                {{ tr.email }}
              </vs-td>
              <vs-td v-if="checkPermissionByIds([permissions.EMPLOYER_EDIT])">
                {{ formatDate(tr.created_at) }}
              </vs-td>
              <vs-td v-if="checkPermissionByIds([permissions.EMPLOYER_EDIT]) || checkPermissionByIds([permissions.EMPLOYER_LOGIN_AS]) || checkPermissionByIds([permissions.EMPLOYER_DELETE])">
                <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                  <vx-tooltip :text="$t('tooltip.Remove')" v-if="checkPermissionByIds([permissions.EMPLOYER_DELETE])">
                    <feather-icon
                      icon="Trash2Icon"
                      svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                      v-if="checkPermissionByIds([permissions.EMPLOYER_DELETE])"
                      @click="deleteRecord(tr.id)"
                    />
                  </vx-tooltip>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
      <!-- End All Registered Employer Via Share Link List -->

      <!-- All Registered Light Entrepreneur Via Share Link List -->
      <div class="odd-table">
        <vs-table :data="entrepreneurRegisterShareLink">
          <template slot="thead">
            <vs-th>{{ $t('sr') }}</vs-th>
            <vs-th>{{ $t('candidate_name') }}</vs-th>
            <vs-th>{{ $t('register_date') }} </vs-th>
            <vs-th>{{ $t('registartion_days') }} </vs-th>
            <vs-th>{{ $t('commission') }} </vs-th>
            <vs-th>{{ $t('added_on') }} </vs-th>
            <vs-th>{{ $t('earn_amount_from') }} </vs-th>
            <vs-th>{{ $t('commission_total') }} </vs-th>
          </template>

          <template slot="header">
            <div class="flex flex-wrap justify-between items-center mb-3">
              <div>
                <p class="mr-4 mt-5 mb-5 font-bold">{{ $t('all_registered_light_entrepreneur_via_share_link_list') }}</p>
              </div>
            </div>
            <div class="mb-3"></div>
          </template>

          <template slot-scope="{ data }" ref="tableBody">
            <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
              <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
              <vs-td>
                {{ tr.email }}
              </vs-td>
              <vs-td>
                {{ formatDate(tr.created_at) }}
              </vs-td>
              <vs-td> - </vs-td>
              <vs-td> - </vs-td>
              <vs-td> - </vs-td>
              <vs-td> - </vs-td>
              <vs-td v-if="checkPermissionByIds([permissions.EMPLOYER_EDIT]) || checkPermissionByIds([permissions.EMPLOYER_LOGIN_AS]) || checkPermissionByIds([permissions.EMPLOYER_DELETE])">
                <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                  <vx-tooltip :text="$t('tooltip.Remove')" v-if="checkPermissionByIds([permissions.EMPLOYER_DELETE])">
                    <feather-icon
                      icon="Trash2Icon"
                      svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                      v-if="checkPermissionByIds([permissions.EMPLOYER_DELETE])"
                      @click="deleteRecord(tr.id)"
                    />
                  </vx-tooltip>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
      <!-- End All Registered Light Entrepreneur Via Share Link List -->
    </div>

    <!-- Start Update Password -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="updatePassword" :title="$t('model.UpdatePassword')">
      <div class="con-exemple-prompt">
        <vs-input id="company_email" class="w-full" name="Password" type="password" v-validate="'required'" v-model="passwordForm.password" />
        <span class="text-primary text-sm" v-show="errors.has('Password')">{{ errors.first('Password') }}</span>
      </div>
      <div class="footer text-right">
        <vs-button class="mt-2 text-sm p-3" color="primary" type="filled" @click="updatePassword = false"> {{ $t('close') }} </vs-button>
        <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-success vs-button-filled p-3" @click="passwordUpdate" :disabled="!validateForm" type="submit">{{ $t('update') }}</button>
      </div>
    </vs-popup>
    <!-- End Update Password -->

    <!-- Add Occupation -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="occupationPopup" :title="$t('model.AddUpdateLEOccupation')">
      <div class="con-exemple-prompt">
        <vs-input placeholder="Occupation" vs-placeholder="Occupation" v-model="val" class="mt-3 w-full" />
        <vs-input placeholder="Current Work Address" vs-placeholder="Current Work Address" v-model="val" class="mt-3 w-full" />
      </div>
      <div class="footer text-right">
        <vs-button class="mt-2 text-sm p-3" color="primary" type="filled" @click="occupationPopup = false"> {{ $t('close') }} </vs-button>
        <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-success vs-button-filled p-3" type="submit">{{ $t('add') }}</button>
      </div>
    </vs-popup>
    <!-- End Add Occupation -->
    <!-- pdf container -->
    <div id="pdf-container"></div>

    <!-- Activity Model -->
    <EmployerActivityPointModal v-if="isActivityPointModalMounted" :isModalShow.sync="isActivityPointModalShow" :activityPoint="Number(companyInfo.activity_points)" @done="getCompanyInformation" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import EmployerActivityPointModal from './components/EmployerActivityPoint.vue'
import EmpActivityLogs from './EmpActivityLogs.vue'
import Vue from 'vue'
import moment from 'moment'
export default {
  name: 'EmployersList',
  components: {
    EmployerActivityPointModal,
    EmpActivityLogs
  },
  data() {
    return {
      lastLoginDate: null,
      occupationPopup: false,
      updatePassword: false,
      val: '',
      order: [],
      length: 10,
      page: 1,
      search: '',
      data: [{}],
      generating: false,
      switchOn: false,
      passwordForm: {
        password: ''
      },
      empinfo: {},
      //ActivityPoint variable
      isActivityPointModalMounted: false,
      isActivityPointModalShow: false
    }
  },
  mixins: [dateMixins],
  async mounted() {
    await this.getData()
    await this.getTeamsMembers()
    await this.getEntrepreneurRegisterShareLink()
    await this.getEmployerRegisterShareLink()
    await this.getCompanyInformation()
  },
  computed: {
    ...mapState('employer', [
      'loading',
      'total',
      'FilteredCount',
      'employers',
      'employerInfo',
      'employerTeamMembers',
      'entrepreneurRegisterShareLink',
      'employerCompanyId',
      'employerRegisterShareLink',
      'companyInfo'
    ]),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),

    // For Validation
    validateForm() {
      return !this.errors.any()
    },
    daysCounted() {
      const currentDate = new Date()
      var dateOne = moment(currentDate)
      var dateTwo = moment(this.lastLoginDate)
      var result = dateOne.diff(dateTwo, 'days')
      return !result ? 0 : result
    }
  },
  methods: {
    ...mapMutations('employer', {
      setState: 'SET_STATE'
    }),

    ...mapActions('employer', {
      getAllEmployer: 'getAllEmployers',
      updateCompanyStatus: 'updateCompanyStatus',
      removeTeamMember: 'removeTeamMember',
      getEmployerById: 'getEmployerById',
      getEmployerIdByTeamsmembers: 'getEmployerIdByTeamsmembers',
      registeredEntrepreneurShareLink: 'registeredEntrepreneurShareLink',
      registeredEmployerShareLink: 'registeredEmployerShareLink',
      compnayInformation: 'compnayInformation',
      udatePasswordEmployer: 'udatePasswordEmployer',
      updateEmpAccountStatus: 'updateEmpAccountStatus',
      downloadSingleRecipientProfilePdf: 'downloadSingleRecipientProfilePdf'
    }),

    //update account status
    async updateAccountStatus(id, status) {
      try {
        const { message } = await this.updateEmpAccountStatus({
          id,
          status: status == 'active' ? 'blocked' : 'active'
        })

        await this.getCompanyInformation()
        this.$vs.notify({
          title: 'Success',
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

    // Employer Profile Get
    async viewProfile(id) {
      this.userProfile = true
      const getEmployerInfo = await this.getEmployerById(id)
      return getEmployerInfo
    },
    sendToEditEmployer(id) {
      this.$router.push(`/employer/${id}/edit`)
    },
    updatePasswordPopup(id) {
      this.updatePassword = true
    },

    AddoccupationPopup() {
      this.occupationPopup = true
    },
    // Employer Pending To Active
    async pendingToActive(id, status) {
      try {
        const { message } = await this.updateCompanyStatus({
          id,
          status: 'active'
        })

        this.$vs.notify({
          title: 'Success',
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
    sendMail() {},

    //download PDF
    async empDetailPdf(empInfo) {
      this.generating = true
      await this.downloadSingleRecipientProfilePdf({
        employerId: this.$route.params.id
      }).then((res) => {
        this.downLoadFile(res.data)
        this.generating = false
      })
    },
    // download pdf
    async downLoadFile(data) {
      try {
        const url = await URL.createObjectURL(data)
        const a = document.createElement('a')
        a.href = url
        a.download = `${this.companyInfo.full_name} profileinfo.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } catch (err) {
        console.log({ err })
      }
    },

    //download seeker details PDF
    async seekerDetailPdf(seekerProfileData) {
      this.generating = true

      setTimeout(() => {
        const ap = document.querySelector('#mount-node')
        if (ap) {
          ap.remove()
        }
        const elem = document.querySelector('#pdf-container')
        const mounteNode = document.createElement('div')
        mounteNode.id = 'mount-node'
        elem.append(mounteNode)

        const pdfEmp = Vue.extend(SeekerInfoPdf)
        new pdfEmp({
          propsData: {
            seekerProfileinfo: seekerProfileData
          }
        })
          .$on('downloaded', () => {
            setTimeout(() => {
              this.generating = false
            }, 2000)
          })
          .$mount('#mount-node')
      }, 100)
    },

    deleteTeamMemberRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: 'Confirm Delete',
        text: 'Are you sure, you want to delete this record?',
        accept: () => this.TeamMemberRecord(id),
        acceptText: 'Delete'
      })
    },
    async TeamMemberRecord(id) {
      try {
        const { message } = await this.removeTeamMember(id)
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.getTeamsMembers()
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
      this.getEntrepreneurRegisterShareLink()
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

    // Team Member Module

    // Sorting For Members
    sortMembers(key, active) {
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getTeamsMembers()
    },

    // For All Members
    getTeamsMembers() {
      this.getEmployerIdByTeamsmembers(this.$route.params.id)
    },

    getEntrepreneurRegisterShareLink() {
      this.registeredEntrepreneurShareLink(localStorage.getItem('employerCompanyId'))
    },
    getEmployerRegisterShareLink() {
      this.registeredEmployerShareLink(localStorage.getItem('employerCompanyId'))
    },
    getCompanyInformation() {
      this.compnayInformation(localStorage.getItem('employerCompanyId')).then(res =>{
        this.lastLoginDate = res.data.data.first_login      
    })
    },
    getData() {
      this.getAllEmployer({
        limit: this.length,
        page: this.page,
        search: this.search
      })
    },
    viewSingleEmployer(id) {
      this.$router.push(`/employer/${id}/info`)
    },
    handleStatusChange(i) {
      this.setState({
        action: `employers[${i}].status`,
        data: 'active'
      })
    },
    async updateStatus(id, status) {
      try {
        if (status === 'active') {
          const { message } = await this.updateCompanyStatus({
            id,
            status: 'blocked'
          })
          this.$vs.notify({
            title: 'Success',
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
            title: 'Success',
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

    // Update Password
    async passwordUpdate() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.udatePasswordEmployer({
          id: this.companyInfo.id,
          data: {
            ...this.passwordForm
          }
        })
        this.updatePassword = false
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
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

    async editJobseekerRecord(id) {
      this.$router.push(`/jobseeker/${id}/edit`)
    },
    toggleEditPoints(data) {
      this.isActivityPointModalMounted = true
      this.isActivityPointModalShow = true
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
    generating() {
      if (this.generating) {
        this.$vs.loading({
          container: '#table-loading .vx-card',
          scale: 1.45
        })
      } else {
        this.$vs.loading.close('#table-loading .vx-card > .con-vs-loading')
      }
    },
    page() {
      this.handleChangePage(this.page)
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
          container: '#empDetail_pdf',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#empDetail_pdf  > .con-vs-loading')
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.updatePassword = false
    setTimeout(() => {
      next()
    }, 0)
  },
  beforeRouteLeave(to, from, next) {
    this.isActivityPointModalShow = false
    setTimeout(() => {
      next()
    }, 0)
  }
}
</script>

<style lang="scss">
.odd-table {
  .header-table {
    padding: 0px 8px;
  }
  background-color: #fff;
  tr {
    background-color: #fff !important;
  }
}
.even-table {
  .header-table {
    padding: 0px 8px;
  }
  background-color: #f8f8f8;
  tr {
    background-color: #f8f8f8;
  }
}

#employer-profile {
  .vs-popup {
    width: calc(100% - 50%) !important;
  }
}

.user-text {
  h5,
  p {
    color: #636363;
    font-size: 14px;
  }
  .user-width-col-1 {
    min-width: 80px;
    @media (max-width: 1520px) {
      min-width: 100px;
    }
  }
  .user-width-col-2 {
    min-width: 190px;
  }
}

.enterpreneur-list {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));

  @media (max-width: 1440px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .vx-card {
    box-shadow: 0px 1px 11px 0px rgba(114, 112, 112, 0.1);
    border-radius: 20px;
  }

  .start-width {
    width: 30px;
  }

  .review-star:hover {
    fill: #e4aa18;
    cursor: pointer;
  }
}
.enterpreneur-list-col-2 {
  max-width: 40%;
  flex-basis: 40%;

  @media (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
  }
}

.enterpreneur-list-col-3 {
  max-width: 50%;
  flex-basis: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
  }
}
.header-table {
  flex-wrap: wrap;
}
</style>

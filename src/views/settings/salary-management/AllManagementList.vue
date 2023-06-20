<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_can_manage_all_the_constant_values_that_are_using_in_calculations') }}</div>
    <div class="vx-card md:p-8 p-6">
      <div class="vx-row">
        <!-- Payment Settings -->
        <div class="vx-col w-full lg:w-1/2 mb-5 mt-5">
          <vs-table :data="paymentSettings">
            <template slot="thead">
              <vs-th>{{ $t('item_name') }} </vs-th>
              <vs-th>{{ $t('percentage') }} </vs-th>
              <vs-th>{{ $t('status') }} </vs-th>
              <vs-th>{{ $t('action') }}</vs-th>
            </template>
            <template slot="header">
              <div class="flex flex-wrap justify-between items-center mb-5">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                  <vs-row>
                    <p>{{ $t('payment_settings') }}</p></vs-row
                  >
                </div>
              </div>
            </template>
            <template slot-scope="{ data }" ref="tableBody">
              <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                <vs-td> {{ tr.payment_name }} </vs-td>
                <vs-td> {{ tr.percentage }} % </vs-td>
                <vs-td>
                  <vs-switch color="success" v-model="tr.is_active" vs-value="true" @input="paypemtStatus(tr.id, tr.is_active)">
                    <span slot="on">{{ $t('active') }}</span>
                    <span slot="off">{{ $t('inactive') }}</span>
                  </vs-switch>
                </vs-td>
                <vs-td>
                  <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                    <vx-tooltip :text="$t('tooltip.EditRecord')">
                      <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="viewPaymentRecord(tr.id)" />
                    </vx-tooltip>
                  </div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
        <!-- End Payment Settings -->

        <!-- Traveling Settings -->
        <div class="vx-col w-full lg:w-1/2 mb-5 mt-5">
          <vs-table :data="travelingSettings">
            <template slot="thead">
              <vs-th>{{ $t('traveling_type') }} </vs-th>
              <vs-th>{{ $t('traveling_value') }} </vs-th>
              <vs-th>{{ $t('action') }}</vs-th>
            </template>
            <template slot="header">
              <div class="flex flex-wrap justify-between items-center mb-5">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                  <vs-row>
                    <p>{{ $t('traveling_settings') }}</p></vs-row
                  >
                </div>
              </div>
            </template>
            <template slot-scope="{ data }" ref="tableBody">
              <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                <vs-td> {{ tr.travelling_type }} </vs-td>
                <vs-td> € {{ tr.travelling_value }} </vs-td>
                <vs-td>
                  <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                    <vx-tooltip :text="$t('tooltip.EditRecord')">
                      <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="viewTravellingRecord(tr.id)" />
                    </vx-tooltip>
                  </div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
        <!-- End Traveling Settings -->

        <!-- App Settings -->
        <div class="vx-col w-full lg:w-1/2 mb-5 mt-5">
          <vs-table :data="appSettings">
            <template slot="thead">
              <vs-th>{{ $t('item') }} </vs-th>
              <vs-th>{{ $t('value') }} </vs-th>
              <vs-th>{{ $t('action') }} </vs-th>
            </template>
            <template slot="header">
              <div class="flex flex-wrap justify-between items-center mb-5">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                  <vs-row>
                    <p>{{ $t('appSettings') }}</p></vs-row
                  >
                </div>
              </div>
            </template>
            <template slot-scope="{ data }" ref="tableBody">
              <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                <vs-td> {{ tr.compensation_name }} </vs-td>
                <vs-td> € {{ tr.compensation_value }} </vs-td>
                <vs-td>
                  <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                    <vx-tooltip :text="$t('tooltip.EditRecord')">
                      <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="viewAppSettingRecord(tr.id)" />
                    </vx-tooltip>
                  </div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
        <!-- End App Settings -->
      </div>
    </div>

    <!-- Edit Payment Popup -->
    <EditPayment v-if="isEditPaymentModal" :isModalShow.sync="isEditPaymentModalShow" @indEditPayList="paymentModule()" :paymentRecordId="paymentRecordId" />
    <!-- EndEdit Payment Popup -->

    <!-- Edit Traveling Popup -->
    <edit-travelling v-if="isEditTravellingModal" :isModalShow.sync="isEditTravellingModalShow" @indEditTravellingList="travellingModule()" :travellingRecordId="travellingRecordId" />
    <!-- End Edit Traveling Popup -->

    <!--App Popup  -->
    <EditAppSetting v-if="isAddAppSettingModal" :isModalShow.sync="isAddAppSettingModalShow" @indEditAppList="appModule()" :AppSettingRecordId="AppSettingRecordId" />
    <!--End App Popup  -->
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState } from 'vuex'
import EditPayment from '@/views/settings/salary-management/components/payment/EditPayment'
import EditAppSetting from '@/views/settings/salary-management/components/AppSetting/EditAppSetting'
import EditTravelling from './components/travelling/EditTravelling.vue'

export default {
  name: 'SalaryManagementList',
  components: {
    Select2,
    EditPayment,
    EditTravelling,
    EditAppSetting
  },
  data() {
    return {
      isEditPaymentModal: false,
      isEditPaymentModalShow: false,

      isEditTravellingModal: false,
      isEditTravellingModalShow: false,

      //edit app setting  modal
      isAddAppSettingModal: false,
      isAddAppSettingModalShow: false,

      paymentPopup: false,
      editPaymentPopup: false,
      travellingPopup: false,
      foodPopup: false,
      employerCommisonPopup: false,
      appPopup: false,
      data: [{}],
      form: {
        use_invoice: ''
      },
      salaryRecordId: '',
      payment_form: {
        payment_name: '',
        percentage: ''
      },
      paymentRecordId: '',

      food_form: {
        food_type: '',
        food_value: ''
      },
      setting_form: {
        compensation_name: '',
        compensation_value: ''
      },

      AppSettingRecordId: ''
    }
  },
  async mounted() {
    this.getData()
    this.paymentModule()
    this.travellingModule()
    this.foodModule()
    this.employerComminsoModule()
    this.appModule()
  },
  computed: {
    ...mapState('setting', ['loading', 'salarySettingsTypes', 'paymentSettings', 'travelingSettings', 'foodSettings', 'employerCommison', 'appSettings']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('setting', {
      getAllSalaryTypesSettings: 'getAllSalaryTypesSettings',
      deleteSalaryTypeRecord: 'deleteSalaryTypeRecord',
      getAllPaymentsSettings: 'getAllPaymentsSettings',
      updatePaymentsStatus: 'updatePaymentsStatus',
      deletePaymentSettingRecord: 'deletePaymentSettingRecord',
      udatePaymentSetting: 'udatePaymentSetting',
      getAllTravelingSettings: 'getAllTravelingSettings',
      deleteTravelSettingRecord: 'deleteTravelSettingRecord',
      getAllFoodSettings: 'getAllFoodSettings',
      addFoodSetting: 'addFoodSetting',
      deleteFoodSettingRecord: 'deleteFoodSettingRecord',
      getAllEmployerCommisonttings: 'getAllEmployerCommisonttings',
      addEmployerCommisonSetting: 'addEmployerCommisonSetting',
      deleteEmployerCommisonRecord: 'deleteEmployerCommisonRecord',
      getAllAppSettings: 'getAllAppSettings',
      getAppSettingById: 'getAppSettingById',
      udateAppSetting: 'udateAppSetting'
    }),
    getData() {
      this.getAllSalaryTypesSettings()
    },
    paymentModule() {
      this.getAllPaymentsSettings()
    },
    travellingModule() {
      this.getAllTravelingSettings()
    },
    foodModule() {
      this.getAllFoodSettings()
    },
    appModule() {
      this.getAllAppSettings()
    },
    employerComminsoModule() {
      this.getAllEmployerCommisonttings()
    },

    opemAppPopup() {
      this.appPopup = true
    },

    // Download Pdf
    async empDetailPdf(empInfo) {
      this.generating = true
      const ap = document.querySelector('#mount-node')
      if (ap) {
        ap.remove()
      }
      const elem = document.querySelector('#pdf-container')
      const mounteNode = document.createElement('div')
      mounteNode.id = 'mount-node'
      elem.append(mounteNode)

      const pdfEmp = Vue.extend(EmployeDetails)
      new pdfEmp({
        propsData: {
          empinfo: empInfo
        }
      })
        .$on('downloaded', () => {
          this.generating = false
        })
        .$mount('#mount-node')
    },

    viewSingleEmployer(id, tr) {
      this.$store.commit('employer/SET_STATE', {
        action: 'employerCompanyId',
        data: tr.company.user.id
      })
      this.$router.push(`/employer/${id}/info`)
    },

    // Salary Module
    async addSalaryRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.addSalaryType({
          ...this.add_salary_form
        })
        this.salaryPopup = false
        this.getData()
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

    deleteRecordSalaryType(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: 'Confirm Delete',
        text: 'Are you sure you want to delete this salary?',
        accept: () => this.deleteSalaryType(id),
        acceptText: 'Delete'
      })
    },
    async deleteSalaryType(id) {
      try {
        const { message } = await this.deleteSalaryTypeRecord(id)
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

    // Payment Module
    async paypemtStatus(id, is_active) {
      try {
        const { message } = await this.updatePaymentsStatus({
          id,
          is_active
        })
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.paymentModule()
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
    },

    async deletePayment(id) {
      try {
        const { message } = await this.deletePaymentSettingRecord(id)
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.paymentModule()
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
    viewPaymentRecord(id) {
      this.paymentRecordId = id
      this.isEditPaymentModal = true
      this.isEditPaymentModalShow = true
    },

    viewTravellingRecord(id) {
      this.travellingRecordId = id
      this.isEditTravellingModal = true
      this.isEditTravellingModalShow = true
    },
    deleteTravelRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: 'Confirm Delete',
        text: 'Are you sure you want to delete this Payment Record?',
        accept: () => this.deleteTravel(id),
        acceptText: 'Delete'
      })
    },
    async deleteTravel(id) {
      try {
        const { message } = await this.deleteTravelSettingRecord(id)
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.travellingModule()
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

    //delete food
    deleteFoodRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: 'Confirm Delete',
        text: 'Are you sure you want to delete this Food Record?',
        accept: () => this.deleteFood(id),
        acceptText: 'Delete'
      })
    },
    async deleteFood(id) {
      try {
        const { message } = await this.deleteFoodSettingRecord(id)
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.foodModule()
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

    deleteCommisionRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: 'Confirm Delete',
        text: 'Are you sure you want to delete this Employer Commision Record?',
        accept: () => this.deleteCommision(id),
        acceptText: 'Delete'
      })
    },
    async deleteCommision(id) {
      try {
        const { message } = await this.deleteEmployerCommisonRecord(id)
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.employerComminsoModule()
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

    // App Setting Module
    viewAppSettingRecord(id) {
      this.AppSettingRecordId = id
      this.isAddAppSettingModal = true
      this.isAddAppSettingModalShow = true
    }
  },
  watch: {
    loading() {
      // Main Loading For All Table
      if (this.loading) {
        this.$vs.loading({
          container: '#table-loading',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#table-loading > .con-vs-loading')
      }
    },

    //edit payment modal clear form
    isEditPaymentModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditPaymentModal = false
          }, 0)
        }
      }
    },

    // edit traveling clear form
    isEditTravellingModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditTravellingModal = false
          }, 0)
        }
      }
    },

    //edit app setting  modal
    isAddAppSettingModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddAppSettingModal = false
          }, 0)
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isEditPaymentModalShow = false
    this.isAddAppSettingModalShow = false
    this.isEditTravellingModalShow = false
    setTimeout(() => {
      next()
    }, 0)
  }
}
</script>
<style lang="scss" scoped>
.desc {
  margin-top: -1.25rem !important;
  @media (max-width: 425px) {
    margin-top: -0.25rem !important;
  }
}
</style>

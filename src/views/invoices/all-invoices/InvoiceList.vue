<template>
  <div class="vs-con-loading__container table-padding invoice_list">
    <div class="mb-6 desc">{{ $t('here_is_a_list_of_invoices_you_can_manage_like_approval,_vault,_etc') }}</div>
    <div class="vx-card md:p-8 p-6 md:pb-1">
      <!-- Invoice List -->
      <vs-table
        id="table-loading"
        class="vs-con-loading__container vh-hight-table"
        stripe
        :sst="true"
        maxHeight="750px"
        maxWidth="1000px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCount"
        :max-items="length"
        search
        :data="invoiceData"
      >
        <!-- pagination -->
        <template slot="thead">
          <vs-th>-</vs-th>
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="created_at">{{ $t('creation_date') }}</vs-th>
          <vs-th sort-key="due_date">{{ $t('due_date') }}</vs-th>
          <vs-th sort-key="invoice_number">{{ $t('invoice_id') }}</vs-th>
          <vs-th sort-key="ref_number">{{ $t('heerosId') }}</vs-th>
          <vs-th sort-key="invoice_by">{{ $t('invoice_by') }}</vs-th>
          <vs-th sort-key="invoice_to">{{ $t('invoice_to') }}</vs-th>
          <vs-th sort-key="sub_total">{{ $t('sub_total') }}</vs-th>
          <vs-th>{{ $t('additional_files') }}</vs-th>
          <vs-th>{{ $t('show_invoice') }}</vs-th>
          <vs-th>{{ $t('vault') }}</vs-th>
          <vs-th sort-key="is_archived">{{ $t('archived_status') }}</vs-th>
          <vs-th sort-key="quick_pay_status">{{ $t('quick_pay_Status') }}</vs-th>
          <vs-th sort-key="verified">{{ $t('verify') }}</vs-th>
          <vs-th sort-key="mark_as_wrong">{{ $t('markAsWrong') }}</vs-th>
          <vs-th>{{ $t('action') }}</vs-th>
        </template>
        <template slot="header">
          <div class="md:whitespace-no-wrap lg:mb-3 md:mb-1 mb-3 xl:mr-4 md:mr-2 mr-0 w-auto ag-grid-table-actions-left mb-2">
            <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
              <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium whitespace-no-wrap">
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
          <div class="flex lg:flex-no-wrap flex-wrap items-end mb-3 w-full invoice-dropdown-wrap gap-2">
            <div class="flex btn-gap">
              <div
                @click="$router.push('/vault-invoices/list')"
                class="btn-add-new p-2 md:mr-2 rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid sm:w-auto w-full text-center border-primary whitespace-no-wrap sm:mb-0 mb-3"
              >
                <span class="text-base text-primary">{{ $t('go_to_invoice_vault') }}</span>
              </div>
              <div
                class="btn-add-new sm:w-auto w-full text-center p-2 rounded-lg whitespace-no-wrap cursor-pointer text-lg font-medium text-primary border border-solid border-primary lg:ml-auto sm:mb-0 md:ml-0 sm:ml-2"
              >
                <span class="text-base text-primary" @click="clearInvoiceIds">{{ $t('clear_selected_row') }}</span>
              </div>
            </div>
            <div class="flex items-end md:order-0 order-1 sm:mt-0 mt-1">
              <div class="md:mb-0 mr-0.5 ag-grid-table-actions-left">
                <vs-row vs-justify="flex-end">
                  <vx-tooltip :text="$t('tooltip.BulkArchivedInvoice')">
                    <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-archive" @click="bulkArchived" />
                  </vx-tooltip>
                </vs-row>
              </div>
              <div class="md:mb-0 ag-grid-table-actions-left">
                <vs-row vs-justify="flex-end">
                  <vx-tooltip :text="$t('tooltip.BulkVerifyInvoice')">
                    <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-check-circle" @click="bulkVerify" />
                  </vx-tooltip>
                </vs-row>
              </div>
            </div>
            <div class="width">
              <select-2
                id="filterby"
                class=""
                :value="filterBy"
                @input="(item) => (filterBy = item && item.value)"
                placeholder="Select filterby"
                name="Select filterby"
                autocomplete
                :options="SearchByTypes.map(x=>({...x, label: $t(x.label)}))"
              />
              <span class="text-primary text-sm" v-show="errors.has('Select Employer')">{{ errors.first('Select Employer') }}</span>
            </div>

            <div class="width">
              <select-2
                id="quickPay"
                class=""
                :value="quickPay"
                @input="(item) => (quickPay = item && item.value)"
                placeholder="Select quickpay"
                name="Select quickpay"
                autocomplete
                :options="QuickPayTypes.map(x=>({...x, label: $t(x.label)}))"
              />
            </div>
            <div class="md:mb-0 mr-0.5 ag-grid-table-actions-left">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.SelectDate')" class="Calender">
                  <div class="date-popup">
                    <date-picker v-model="range" range @change="selectDate($event)"> </date-picker>
                  </div>
                </vx-tooltip>
              </vs-row>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-checkbox class="mt-6 ml-3" v-model="selectedIds" :vs-value="tr.id"></vs-checkbox>
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>{{ formatDate(tr.created_at) }}</vs-td>
            <vs-td>{{ formatDate(tr.due_date) }}</vs-td>
            <vs-td>{{ tr.invoice_number }}</vs-td>
            <vs-td v-if="tr.invoiceStatus">
              <span v-if="tr.ref_number == null">
                <button
                  type="button"
                  name="button"
                  @click="addHeerosID(tr.id)"
                  id="add-employer"
                  class="vs-component vs-button vs-button-primary vs-button-relief"
                  style="padding: 10px; white-space: nowrap"
                >
                  <span class="">{{ $t('add_invoice_number') }}</span>
                  <span class="vs-button-linex"></span>
                </button>
              </span>
              <span v-else class="flex items-center justify-between">
                <p>{{ tr.ref_number || '-' }}</p>
                <vx-tooltip :text="$t('tooltip.EditRefNumber')">
                  <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="updateRefNumber(tr.id, tr.ref_number)" />
                </vx-tooltip>
              </span>
            </vs-td>
            <vs-td v-else>
              <button type="button" name="button" id="add-employer" class="vs-component vs-button vs-button-primary vs-button-relief" style="padding: 10px; white-space: nowrap" disabled>
                <span class="">{{ $t('add_invoice_number') }}</span>
                <span class="vs-button-linex"></span>
              </button>
            </vs-td>
            <vs-td>
              <div class="inline-flex" v-if="tr.seeker && tr.seeker.user && tr.seeker.user.id" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewSingleEntrepreneur(tr.seeker && tr.seeker.user && tr.seeker.user.id, tr)">{{ (tr.seeker && tr.seeker.user && tr.seeker.user.full_name) || '-' }}</p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td>
              <div v-if="tr.company.user && tr.company.company_name" class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewEmployerRecord(tr.companyId)">{{ tr.company.user && tr.company.company_name }}</p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td>€{{ tr.company_pay_amount.toFixed(2) }}</vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.UploadAdditionalFiles')">
                  <feather-icon icon="UploadIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="openAdFileUpload(tr.id)" />
                </vx-tooltip>
              </div>
            </vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.ViewRecord')">
                  <feather-icon icon="EyeIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="viewInvoiceRecord(tr)" />
                </vx-tooltip>
              </div>
            </vs-td>
            <vs-td>
              <vs-switch color="primary" v-model="tr.invoiceApproved" vs-value="active" @input="updateToApprovedInvoice(tr.id, tr.invoiceApproved)" :disabled="!tr.ref_number">
                <span slot="on">{{ $t('true') }}</span>
                <span slot="off">{{ $t('false') }}</span>
              </vs-switch>
            </vs-td>
            <vs-td>
              <vs-switch color="primary" v-model="tr.isArchived" vs-value="active" @input="updateArchivedInvoice(tr.id, tr.isArchived)">
                <span slot="on">{{ $t('true') }}</span>
                <span slot="off">{{ $t('false') }}</span>
              </vs-switch>
            </vs-td>
            <vs-td>
              {{ tr.quick_pay_status ? 'Enable' : 'Disable' }}
            </vs-td>
            <vs-td>
              <vs-switch color="primary" v-model="tr.invoiceStatus" vs-value="active" @input="updateToVerifyInvoice(tr.id, tr.invoiceStatus)">
                <span slot="on">{{ $t('verified') }}</span>
                <span slot="off">{{ $t('verify') }}</span>
              </vs-switch>
            </vs-td>
            <vs-td>
              <vs-switch color="primary" v-model="tr.markAsWrong" vs-value="active" @input="updateMarkAsWrong(tr.id, tr.markAsWrong)">
                <span slot="on">{{ $t('true') }}</span>
                <span slot="off">{{ $t('false') }}</span>
              </vs-switch>
            </vs-td>

            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.SendForRevision')">
                  <feather-icon icon="SendIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="openSendRevison(tr.invoice_number, tr.id)" />
                </vx-tooltip>

                <vx-tooltip :text="$t('tooltip.EditInvoice')">
                  <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="openInvoiceData(tr, tr.id)" />
                </vx-tooltip>
                <vx-tooltip :text="$t('download')">
                  <feather-icon icon="ArrowDownCircleIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="openDownloadInvoice(tr.id, tr)" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <div class="centerx">
        <vs-pagination :total="Math.ceil(FilteredCount / length)" v-model="page"></vs-pagination>
      </div>
      <!-- End Invoice List -->
    </div>

    <!-- Update Invoice Number -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="updateNumberPopup" :title="$t('model.UpdateInvoiceNumber')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="city_name">{{ $t('invoice_number') }}</label>
          <vs-input id="city_name" class="w-full" name="Country Name" v-model="invoice_number_form.invoice_number" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Country Name')">{{ errors.first('Country Name') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="updateNumberPopup = false">{{ $t('close') }}</vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" :disabled="!validateForm" type="submit">{{ $t('update') }}</button>
        </div>
      </div>
    </vs-popup>
    <!-- End Update Invoice Number -->

    <!-- Add Ad File  -->
    <AdditionalFile v-if="isAddFileModalMounted" :isModalShow.sync="isAddFileModalShow" @newInvList="getData()" :invoiceId="invoiceIdFile" />
    <!-- End Add Ad File -->

    <!-- Add reference File  -->
    <AddRefNumber v-if="isAddRefNumberModalMounted" :isModalShow.sync="isAddRefNumberModalShow" @newInvList="getData()" :refNumberId="refNumberId" />
    <!-- End Add reference File -->

    <!-- Edit reference File  -->
    <EditRefNumber v-if="isEditRefNumberModalMounted" :isModalShow.sync="isEditRefNumberModalShow" @newInvList="getData()" :refNumberId="refNumberId" :refNumber="refNumber" />
    <!-- End Edit reference File -->

    <!-- Add Invoice Number -->
    <add-invoice-number v-if="isAddInvoiceNumberModalMounted" :isModalShow.sync="isAddInvoiceNumberModalShow" @newInvList="getData()" :refNumberId="refNumberId" />
    <!-- End Add Invoice Number -->

    <!-- Send For Revision  -->
    <send-for-revision
      v-if="isEditSendRevisionModalMounted"
      :isModalShow.sync="isEditSendRevisionModalShow"
      @newInvList="getData()"
      :revisonRecordId="revisonRecordId"
      :revisionNumber="revisionNumber"
    />
    <!-- End Send For Revision -->

    <!-- Update Invoice Data  -->
    <edit-invoice v-if="isEditInvoiceDataModalMounted" :isModalShow.sync="isEditInvoiceDataModalShow" @newInvList="getData()" :invoiceId="invoiceId" />
    <!-- End Update Invoice Data -->

    <!-- Download Invoice Data  -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="downloadInvoicePopup" :title="$t('model.TotalDownloadSize')">
      <div class="vs-con-loading__container">
        <div class="vx-card p-6 pb-10 pt-10 pl-10">
          <vs-table class="vs-con-loading__container" stripe :sst="true" maxHeight="500px" :data="invoiceData">
            <template slot="thead">
              <vs-th>{{ $t('sr') }}</vs-th>
              <vs-th>{{ $t('invoice_file') }}</vs-th>
              <vs-th>{{ $t('action') }}</vs-th>
            </template>
            <template ref="tableBody">
              <vs-tr :data="record" :key="i" v-for="(record, i) in invoiceFiles.invoice_files">
                <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
                <vs-td>
                  <img :src="record.file_path" alt height="100" width="100" />
                </vs-td>
                <vs-td>
                  <vx-tooltip :text="$t('tooltip.DownloadContract')">
                    <a href="path_to_file" target="_blank" @click="viewResume(record.file_path)">
                      <feather-icon icon="DownloadIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" />
                    </a>
                  </vx-tooltip>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>
    </vs-popup>
    <!-- End Download Invoice Data -->
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { dateMixins } from '@/mixins/dateMixins.js'
import { mapActions, mapState } from 'vuex'
import AdditionalFile from '@/views/invoices/components/AdditionalFiles'
import AddRefNumber from '@/views/invoices/components/AddRefNumber'
import EditRefNumber from '@/views/invoices/components/EditRefNumber'
import AddInvoiceNumber from './Components/AddInvoiceNumber.vue'
import SendForRevision from './Components/SendForRevision.vue'
import EditInvoice from './Components/EditInvoice.vue'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  name: 'AllInvoiceList',
  components: {
    Select2,
    AdditionalFile,
    AddRefNumber,
    EditRefNumber,
    AddInvoiceNumber,
    SendForRevision,
    EditInvoice,
    DatePicker
  },
  data() {
    return {
      screenwidth: '',
      selectedIds: [],
      selectedVerfiyRecord: [],
      page: 1,
      length: 10,
      search: '',
      type: 'all',
      filterBy: '',
      quickPay: '',
      invoice_number_form: {
        invoice_number: '',
        ad_file: ''
      },
      revision_form: {
        admin_revision_note: ''
      },
      invoiceForm: {
        tax: '',
        misb_commission: '',
        vat: '',
        w2w_commission: ''
      },
      updateNumberPopup: false,
      adFilePopup: false,
      revisonPopup: false,
      invoiceDataPopup: false,
      downloadInvoicePopup: false,
      revisionNumber: '',
      revisonRecordId: '',
      uploadFile: {
        file_name: '',
        invoice_image: []
      },
      invoiceId: null,
      invoiceIdFile: 0,

      // For Invoice Files Download
      invoiceFiles: {},

      //ad file modal
      isAddFileModalMounted: false,
      isAddFileModalShow: false,
      //add ref number
      isAddRefNumberModalMounted: false,
      isAddRefNumberModalShow: false,

      //edit ref number
      isEditRefNumberModalMounted: false,
      isEditRefNumberModalShow: false,

      //add Invoice number
      isAddInvoiceNumberModalMounted: false,
      isAddInvoiceNumberModalShow: false,

      //edit send for revision
      isEditSendRevisionModalMounted: false,
      isEditSendRevisionModalShow: false,

      //update invoice data
      isEditInvoiceDataModalMounted: false,
      isEditInvoiceDataModalShow: false,

      //date Picker
      range: {},
      start_date: '',
      end_date: ''
    }
  },
  mixins: [dateMixins],
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('invoice', ['loading', 'total', 'VatTypes', 'SearchByTypes', 'QuickPayTypes', 'FilteredCount', 'invoicedRecords']),
    invoiceData() {
      return this.invoicedRecords.reduce((acc, item) => {
        item.invoiceStatus = item.verified === false ? false : true
        item.invoiceApproved = item.approved === false ? false : true
        item.isArchived = item.approved === false ? false : true
        item.markAsWrong = item.mark_as_wrong === false ? false : true
        acc.push(item)
        return acc
      }, [])
    },
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('invoice', {
      getAllInvoiceRecord: 'getAllInvoiceRecord',
      updateVerifyStatus: 'updateVerifyStatus',
      updateApprovedStatus: 'updateApprovedStatus',
      addFileInvoice: 'addFileInvoice',
      updateStatusArchivedStatus: 'updateStatusArchivedStatus',
      archivedInvoicesBulk: 'archivedInvoicesBulk',
      verifyBlukInvoice: 'verifyBlukInvoice',
      updateStatusMarkAsWrong: 'updateStatusMarkAsWrong'
    }),

    clearInvoiceIds() {
      this.selectedIds = []
    },

    // For Confirmation
    bulkArchived() {
      if (this.selectedIds.length == 0) {
        this.$vs.notify({
          title: 'Bluk Archived Validation Error',
          text: 'Please select Invoice ID',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      } else {
        this.$vs.dialog({
          type: 'confirm',
          color: 'primary',
          title: 'Confirm Login',
          text: 'Are you sure, you want to Bulk invoice archived?',
          accept: () => this.archivedInvoice(),
          acceptText: 'Yes'
        })
      }
    },

    // For Archived Invoices
    async archivedInvoice() {
      await this.archivedInvoicesBulk({
        invoiceId: this.selectedIds
      })
      this.getData()
      this.selectedIds = []
    },

    bulkVerify() {
      if (this.selectedIds.length == 0) {
        this.$vs.notify({
          title: 'Bulk Verify Validation Error',
          text: 'Please select Invoice ID For Verify',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      } else {
        this.$vs.dialog({
          type: 'confirm',
          color: 'primary',
          title: 'Confirm Login',
          text: 'Are you sure, you want to Bulk invoice verify?',
          accept: () => this.verifyInvoice(),
          acceptText: 'Yes'
        })
      }
    },

    // For Archived Invoices
    async verifyInvoice() {
      await this.verifyBlukInvoice({
        invoiceId: this.selectedIds
      })
      this.getData()
      this.selectedIds = []
    },

    openUpdateInvoice() {
      this.updateNumberPopup = true
    },
    // open popup in Add file in invoice
    openAdFileUpload(id) {
      this.invoiceIdFile = id
      this.isAddFileModalMounted = true
      this.isAddFileModalShow = true
    },
    openSendRevison(invoice_number, id) {
      this.revisionNumber = invoice_number
      this.revisonRecordId = id
      this.isEditSendRevisionModalMounted = true
      this.isEditSendRevisionModalShow = true
    },
    //add ref number
    addHeerosID(id) {
      this.isAddInvoiceNumberModalMounted = true
      this.isAddInvoiceNumberModalShow = true
      this.refNumberId = id
    },
    //update ref number
    updateRefNumber(id, ref_number) {
      this.isEditRefNumberModalMounted = true
      this.isEditRefNumberModalShow = true
      this.refNumberId = id
      this.refNumber = ref_number
    },
    // edit send revision

    viewResume(link) {
      window.open(link)
    },
    // Set edit modal data and popup modal
    openInvoiceData(tr, id) {
      this.invoiceId = id
      this.invoiceForm.tax = tr.tax
      this.invoiceForm.misb_commission = tr.misb_commission
      this.invoiceForm.vat = tr.vat
      this.invoiceForm.w2w_commission = tr.w2w_commission
      this.isEditInvoiceDataModalMounted = true
      this.isEditInvoiceDataModalShow = true
    },
    openDownloadInvoice(id, data) {
      this.invoiceFiles = data
      this.downloadInvoicePopup = true
    },
    //view light Entrepreneur
    viewSingleEntrepreneur(id, tr) {
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfileId',
        data: id
      })
      localStorage.setItem('seekerProfileInfoId', id)
      this.$router.push(`/jobseeker/${tr.seeker.id}/info`)
    },
    viewEmployerRecord(id) {
      this.$store.commit('employer/SET_STATE', {
        action: 'employerCompanyId',
        data: id
      })
      localStorage.setItem('employerCompanyId', id)
      this.$router.push(`/employer/${id}/info`)
    },
    //view invoice details
    viewInvoiceRecord(tr) {
      this.$router.push(`/all-invoices/${tr.id}/view`)
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
      this.getAllInvoiceRecord({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order,
        invoice_type: this.type,
        filter_by: this.filterBy,
        quick_pay: this.quickPay,
        start_date: this.start_date,
        end_date: this.end_date
      })
    },
    //Select Date
    selectDate(event) {
      this.start_date = moment(event[0]).format('YYYY-MM-DD') || null
      this.end_date = moment(event[1]).format('YYYY-MM-DD') || null
      this.getData()
    },
    async openCityPopup() {
      this.cityPopup = true
    },
    async updateToVerifyInvoice(id, status) {
      try {
        const { message } = await this.updateVerifyStatus({
          id,
          status
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
    // update status approved
    async updateToApprovedInvoice(id, status) {
      try {
        const { message } = await this.updateApprovedStatus({
          id,
          status
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

    // update archived status approved
    async updateArchivedInvoice(id, status) {
      try {
        const { message } = await this.updateStatusArchivedStatus({
          id,
          status
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

    // update mark as wrong status invoice
    async updateMarkAsWrong(id, mark_as_wrong) {
      try {
        const { message } = await this.updateStatusMarkAsWrong({
          id,
          mark_as_wrong
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

    //Additional file in invoice
    async addFileInInvoic() {
      const data = new FormData()
      data.append('invoice_image', this.uploadFile.invoice_image)
      data.append('file_name', this.uploadFile.file_name)
      this.$refs['invoiceimage'].filesx.forEach((file) => {
        data.append('invoice_image', file)
      })
      try {
        const { message } = await this.addFileInvoice({
          id: this.invoiceId,
          data
        })
        this.adFilePopup = true
        this.getData()
        this.adFilePopup = false
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
    isAddFileModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddFileModalMounted = false
          }, 0)
        }
      }
    },
    isAddInvoiceNumberModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddInvoiceNumberModalMounted = false
          }, 0)
        }
      }
    },
    isEditInvoiceDataModalShow: {
      immediate: true,
      handler(newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.isEditInvoiceDataModalMounted = false
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

    page() {
      this.handleChangePage(this.page)
    },

    quickPay: {
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
    this.revisonPopup = false
    this.invoiceDataPopup = false
    setTimeout(() => {
      next()
    }, 0)
  }
}
</script>
<style lang="scss">
.invoice_list {
  .remove-tip {
    .vs-dropdown--menu--after {
      display: none;
    }
  }
  .vs-table--header {
    @media (max-width: 1440px) {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .vs-table--search {
    max-width: 200px;
    order: 3;
    @media (max-width: 1440px) {
      order: 2;
    }
    @media (max-width: 425px) {
      max-width: 63%;
    }
  }

  .vs-table--search-input {
    padding: 5px 10px;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    font-size: 0.7rem;
    color: rgba(0, 0, 0, 0.7);
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
    width: 100%;
  }
  table {
    @media (max-width: 768px) {
      min-width: 1200px;
    }
  }
  .ml-40 {
    margin-left: 140px;
  }
  .width {
    @media (max-width: 1024px) {
      width: 100%;
    }
    @media (max-width: 768px) {
      margin-top: 5px;
      width: 270px;
    }
    @media (max-width: 500px) {
      width: 100%;
    }
    @media (max-width: 425px) {
    }
  }
  @media (min-width: 1024px) {
    .md\:order-0 {
      order: 0 !important;
    }
  }
  .table-padding {
    .header-table {
      align-items: flex-end;
      @media (max-width: 1024px) {
        flex-wrap: wrap;
      }
    }
    .vs-table--search {
      margin-left: 10px !important;
      order: 2;
      @media (max-width: 1024px) {
        padding-top: 0 !important;
        margin-left: 0 !important;
      }
      @media (max-width: 768px) {
        padding-bottom: 0px !important;
      }
    }
  }

  .invoice-dropdown-wrap {
    order: 3;
  }

  .vx-navbar-wrapper {
    @media (max-width: 576px) {
      height: 55px;
    }
  }
  .vh-hight-table {
    .vs-con-tbody {
      max-height: calc(100vh - 110px) !important;
    }
  }

  .date-popup {
    .mx-datepicker-range {
      width: 216px;
      @media (max-width: 425px) {
        width: 208px;
      }
    }
    .mx-input {
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: none;
      padding-left: 30px;
      padding-right: 10px;
      height: 37px;
    }
    .mx-input-wrapper {
      @media (max-width: 768px) {
        margin-right: 7px;
      }
      .mx-icon-calendar,
      .mx-icon-clear {
        left: 8px;
      }
    }
  }

  .vs-con-table {
    .vs-table--header {
      .vs-table--search {
        padding: 0;
        margin: 0 0 0.75rem 0;
        @media (max-width: 992px) {
          margin-bottom: 2px;
        }
        @media (max-width: 575px) {
          margin-bottom: 10px;
        }
      }
    }
  }

  .Calender {
    .vs-card--header {
      display: flex !important ;
      justify-content: space-between;
    }
  }
}

.mx-range-wrapper {
  .mx-calendar-panel-date {
    &:last-child {
      display: none;
    }
  }
}

.vuesax-app-is-ltr {
  .invoice_list {
    .vs-table--search {
      @media (max-width: 768px) {
        margin-left: 17px;
      }
    }
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
.btn-gap {
  @media (max-width: 425px) {
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>

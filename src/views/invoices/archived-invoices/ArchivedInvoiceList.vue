<template>
  <div class="vs-con-loading__container archived_invoice">
    <div class="mb-6 desc">{{ $t('here_you_can_see_those_invoices_whose_due_date_is_gone_and_unpaid') }}</div>
    <div class="vx-card md:p-8 p-6 md:pb-1">
      <!-- Invoice List -->
      <vs-table
        id="table-loading"
        class="vs-con-loading__container vh-hight-table"
        stripe
        :sst="true"
        maxHeight="500px"
        maxWidth="1000px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCountArchived"
        :max-items="length"
        search
        :data="archivedInvoiceData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="created_at">{{ $t('creation_date') }} </vs-th>
          <vs-th sort-key="due_date">{{ $t('due_date') }} </vs-th>
          <vs-th sort-key="invoice_number">{{ $t('invoice_id') }} </vs-th>
          <vs-th sort-key="invoice_by">{{ $t('invoice_by') }} </vs-th>
          <vs-th sort-key="invoice_to">{{ $t('invoice_to') }} </vs-th>
          <vs-th sort-key="sub_total">{{ $t('sub_total') }}</vs-th>
          <vs-th>{{ $t('show_invoice') }} </vs-th>
          <vs-th sort-key="approved">{{ $t('archived') }} </vs-th>
          <vs-th sort-key="verified">{{ $t('verify') }} </vs-th>
          <vs-th>{{ $t('action') }} </vs-th>
        </template>

        <template slot="header">
          <div class="md:whitespace-no-wrap xl:mb-3 md:mb-1 mb-2 xl:mr-4 md:mr-2 mr-0 w-auto ag-grid-table-actions-left">
            <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
              <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">
                  {{ page * length - (length - (FilteredCountArchived && 1)) }}
                  -
                  {{ FilteredCountArchived - page * length > 0 ? page * length : FilteredCountArchived }}
                  {{ $t('of') }} {{ FilteredCountArchived }}
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
          <div class="flex lg:flex-no-wrap flex-wrap items-end mb-3 w-full invoice-dropdown-wrap gap-3">
            <div class="flex whitespace-no-wrap w-full md:w-auto">
              <div
                @click="$router.push('/all-invoices/list')"
                class="btn-add-new p-2 rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary sm:ml-auto w-full md:w-auto text-center"
              >
                <span class="text-base text-primary">{{ $t('go_to_invoice') }}</span>
              </div>
            </div>
            <div class="width">
              <select-2
                id="filterby"
                class="w-full"
                :value="filterBy"
                @input="(item) => (filterBy = item && item.value)"
                placeholder="Filter by"
                name="Select filterby"
                autocomplete
                :options="SearchByTypes.map(x=>({...x, label: $t(x.label)}))"
              />
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

            <div class="md:mb-0 mr-0.5 ag-grid-table-actions-left w-full md:w-auto">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.SelectDate')" class="Calender w-full md:w-auto">
                  <div class="date-popup">
                    <date-picker v-model="range" range @change="selectDate($event)"> </date-picker>
                  </div>
                </vx-tooltip>
              </vs-row>
            </div>
          </div>
          <!-- </div> -->
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              {{ formatDate(tr.created_at) }}
            </vs-td>
            <vs-td>
              {{ formatDate(tr.due_date) }}
            </vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewInvoiceRecord(tr)">{{ tr.invoice_number }}</p>
              </div>
            </vs-td>

            <vs-td>
              <div class="inline-flex" v-if="tr.seeker && tr.seeker.user && tr.seeker.user.id" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewSingleEntrepreneur(tr.seeker && tr.seeker.user && tr.seeker.user.id, tr)">
                  {{ (tr.seeker && tr.seeker.user && tr.seeker.user.full_name) || '-' }}
                </p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td>
              <div v-if="tr.company.user && tr.company.user.full_name" class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewEmployerRecord(tr.company && tr.company.id, tr.company)">
                  {{ tr.company.user && tr.company.user.full_name }}
                </p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td>€ {{ tr.company_pay_amount.toFixed(2) }}</vs-td>

            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.ViewRecord')">
                  <feather-icon icon="EyeIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="viewInvoiceRecord(tr)" />
                </vx-tooltip>
              </div>
            </vs-td>
            <vs-td>
              <vs-switch color="primary" v-model="tr.invoiceApproved" vs-value="active" @input="updateToApprovedInvoice(tr.id, tr.invoiceApproved)">
                <span slot="on">{{ $t('true') }}</span>
                <span slot="off">{{ $t('false') }}</span>
              </vs-switch>
            </vs-td>
            <vs-td>
              <vs-switch color="primary" v-model="tr.invoiceStatus" vs-value="active" @input="updateToVerifyInvoice(tr.id, tr.invoiceStatus)">
                <span slot="on">{{ $t('verified') }}</span>
                <span slot="off">{{ $t('verify') }}</span>
              </vs-switch>
            </vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('download')">
                  <feather-icon icon="ArrowDownCircleIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="openDownloadInvoice(tr.id, tr)" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <div class="centerx">
        <vs-pagination :total="Math.ceil(FilteredCountArchived / length)" v-model="page"></vs-pagination>
      </div>
      <!-- End Invoice List -->
    </div>

    <!-- Add Invoice Number -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="invoiceNumberPopup" :title="$t('add_invoice_number')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="city_name">{{ $t('invoice_Number') }}</label>
          <vs-input id="city_name" class="w-full" name="Country Name" v-model="invoice_number_form.invoice_number" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Country Name')">{{ errors.first('Country Name') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="invoiceNumberPopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" :disabled="!validateForm" type="submit">{{ $t('add') }}</button>
        </div>
      </div>
    </vs-popup>
    <!-- End Add Invoice Number -->

    <!-- Update Invoice Number -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="updateNumberPopup" :title="$t('model.UpdateInvoiceNumber')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="city_name">{{ $t('invoice_Number') }}</label>
          <vs-input id="city_name" class="w-full" name="Country Name" v-model="invoice_number_form.invoice_number" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Country Name')">{{ errors.first('Country Name') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="updateNumberPopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" :disabled="!validateForm" type="submit">{{ $t('update') }}</button>
        </div>
      </div>
    </vs-popup>
    <!-- End Update Invoice Number -->

    <!-- Add Ad File  -->
    <AdditionalFile v-if="isAddFileModalMounted" :isModalShow.sync="isAddFileModalShow" @newInvList="getData()" :invoiceId="invoiceIdFile" />
    <!-- End Add Ad File -->

    <!-- Send For Revision  -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="revisonPopup" :title="`${$t('tooltip.SendForRevision')} : ${revisionNumber}`">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="admin_revision_note">{{ $t('revision_notes') }} </label>
          <vs-input id="admin_revision_note" class="w-full" name="Revision Notes" v-model="revision_form.admin_revision_note" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Revision Notes')">{{ errors.first('Revision Notes') }}</span>
        </div>
        <div class="vx-row mb-2 mt-3">
          <vs-checkbox v-model="revision_form.under_review">{{ $t('under_review') }}</vs-checkbox>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="revisonPopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="sendRevisonRecord" :disabled="!validateForm" type="submit">{{ $t('send') }}</button>
        </div>
      </div>
    </vs-popup>
    <!-- End Send For Revision -->

    <!-- Update Invoice Data  -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="invoiceDataPopup" :title="$t('model.EditInvoiceData')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="admin_revision_note">{{ $t('personal_tax_label') }} </label>
          <vs-input id="admin_revision_note" class="w-full" name="Personal Tax" v-model="invoiceForm.tax" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('tax')">{{ errors.first('tax') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="admin_revision_note">{{ $t('mandetroy_fees') }} </label>
          <vs-input id="admin_revision_note" class="w-full" name="Mandetroy Fees" v-model="invoiceForm.misb_commission" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Mandetroy Fees')">{{ errors.first('Mandetroy Fees') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="admin_revision_note">{{ $t('vat') }} </label>
          <div class="w-full">
            <Select-2
              id="vat_type"
              placeholder="Vat%"
              :value="invoiceForm.vat"
              @input="(item) => (invoiceForm.vat = item && item.value)"
              icon-pack="feather"
              class="w-full mt-3"
              name="vat_type"
              v-validate="'required'"
              :options="VatTypes"
            />
          </div>
          <span class="text-primary text-sm" v-show="errors.has('VAT')">{{ errors.first('VAT') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="admin_revision_note">{{ $t('w2w_commission') }}</label>
          <vs-input id="admin_revision_note" class="w-full" name="W2W Commission" v-model="invoiceForm.w2w_commission" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('W2W Commission')">{{ errors.first('W2W Commission') }}</span>
        </div>

        <div class="vx-row mb-2 mt-3">
          <vs-checkbox v-model="invoiceForm.verified" v-validate="'required'">{{ $t('is_verified') }}</vs-checkbox>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="invoiceDataPopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="updateInvoiceData" :disabled="!validateForm" type="submit">Update</button>
        </div>
      </div>
    </vs-popup>
    <!-- End Update Invoice Data -->

    <!-- Download Invoice Data  -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="downloadInvoicePopup" :title="$t('model.TotalDownloadSize')">
      <div class="vs-con-loading__container">
        <div class="vx-card p-6 pb-10 pt-10 pl-10">
          <vs-table class="vs-con-loading__container" stripe :sst="true" maxHeight="500px" :data="archivedInvoiceData">
            <template slot="thead">
              <vs-th>{{ $t('sr') }} </vs-th>
              <vs-th>{{ $t('invoice_file') }} </vs-th>
              <vs-th>{{ $t('action') }} </vs-th>
            </template>
            <template ref="tableBody">
              <vs-tr :data="record" :key="i" v-for="(record, i) in invoiceFiles.invoice_files">
                <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
                <vs-td>
                  <img :src="record.file_path" alt="" height="100" width="100" />
                </vs-td>
                <vs-td>
                  <vx-tooltip :text="$t('tooltip.DownloadContract')">
                    <a href="path_to_file" target="_blank" @click="viewResume(record.file_path)"><feather-icon icon="DownloadIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" /> </a
                  ></vx-tooltip>
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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  name: 'ArchivedInvoiceList',
  components: {
    Select2,
    AdditionalFile,
    DatePicker
  },
  data() {
    return {
      page: 1,
      length: 10,
      search: '',
      type: 'archived',
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
      invoiceNumberPopup: false,
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
      filterBy: '',
      quickPay: '',

      // For Invoice Files Download
      invoiceFiles: {},

      //ad file modal
      isAddFileModalMounted: false,
      isAddFileModalShow: false,
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
    ...mapState('invoice', ['loading', 'SearchByTypes', 'totalArchived', 'VatTypes', 'FilteredCountArchived', 'archivedInvoicedRecords', 'QuickPayTypes']),
    archivedInvoiceData() {
      return this.archivedInvoicedRecords.reduce((acc, item) => {
        item.invoiceStatus = item.verified === false ? false : true
        item.invoiceApproved = item.is_archived === false ? false : true
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
      getArchivedInvoiceRecord: 'getArchivedInvoiceRecord',
      updateVerifyStatusArchived: 'updateVerifyStatusArchived',
      updateStatusArchivedStatus: 'updateStatusArchivedStatus',
      addRevisonRecordArchived: 'addRevisonRecordArchived'
    }),
    openInvoice() {
      this.invoiceNumberPopup = true
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
      this.revisonPopup = true
      this.revisionNumber = invoice_number
      this.revisonRecordId = id
    },
    viewResume(link) {
      window.open(link)
    },
    // Set edit modal data and popup modal
    openInvoiceData(tr) {
      this.invoiceId = tr.id
      this.invoiceForm.tax = tr.tax
      this.invoiceForm.misb_commission = tr.misb_commission
      this.invoiceForm.vat = tr.vat
      this.invoiceForm.w2w_commission = tr.w2w_commission
      this.invoiceDataPopup = true
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
    viewEmployerRecord(id,tr) {
      this.$store.commit('employer/SET_STATE', {
        action: 'employerCompanyId',
        data: tr.user.id
      })
      localStorage.setItem('employerCompanyId', id)
      localStorage.setItem('empCompanyId', tr.user.id)
      this.$router.push(`/employer/${id}/info`)
    },
    //view invoice details
    viewInvoiceRecord(tr) {
      this.$router.push(`/all-invoices/${tr.id}/view`)
    },
    async sendRevisonRecord() {
      try {
        const { message } = await this.addRevisonRecord({
          id: this.revisonRecordId,
          data: {
            ...this.revision_form
          }
        })
        this.revision_form.admin_revision_note = ''
        this.revision_form.under_review = false
        this.revisonPopup = false
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
      this.getArchivedInvoiceRecord({
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
        const { message } = await this.updateVerifyStatusArchived({
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
    //update invoice detail
    async updateInvoiceData() {
      try {
        const { message } = await this.updateInvoices({
          id: this.invoiceId,
          data: {
            ...this.invoiceForm
          }
        })
        this.invoiceDataPopup = false
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
    },
    //view invoice details
    viewInvoiceRecord(tr) {
      this.$router.push(`/all-invoices/${tr.id}/view`)
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
    },

    filterBy: {
      handler(newVal) {
        this.page = 1
        this.getData()
      }
    }
  }
}
</script>
<style lang="scss">
.archived_invoice {
  .vs-table--header {
    @media (max-width: 1440px) {
      display: flex;
      flex-wrap: wrap;
    }
    @media (min-width: 1440px) {
      flex-wrap: nowrap;
    }
  }
  .vs-table--search {
    max-width: 200px;
    order: 3;
    @media (max-width: 1024px) {
      order: 2;
    }
    @media (max-width: 425px) {
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
  table {
    @media (max-width: 768px) {
      min-width: 1200px;
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

  .date-popup {
    .mx-datepicker-range {
      width: 208px;
      @media (max-width: 1024px) {
        width: 216px;
      }
      @media (max-width: 425px) {
        width: 100% !important;
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
      .mx-icon-calendar,
      .mx-icon-clear {
        left: 8px;
      }
    }
  }

  .Calender {
    .vs-card--header {
      display: flex !important ;
      justify-content: space-between;
    }
  }

  .lg\:order-0 {
    @media (min-width: 992px) {
      order: 0 !important;
    }
  }
  .width {
    @media (max-width: 1440px) {
      width: 192px;
    }
    @media (max-width: 1024px) {
      width: 100%;
    }
    @media (max-width: 768px) {
      margin-top: 5px;
      width: 145px;
    }
    @media (max-width: 500px) {
      width: 100%;
    }
    @media (max-width: 425px) {
      margin-top: 0px;
    }
  }
  @media (min-width: 1024px) {
    .md\:order-0 {
      order: 0 !important;
    }
  }
  .invoice-dropdown-wrap {
    order: 3;
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
}
.mx-range-wrapper {
  .mx-calendar-panel-date {
    &:last-child {
      display: none;
    }
  }
}
.vuesax-app-is-ltr {
  .archived_invoice {
    .vs-table--search {
      max-width: 100%;
      @media (max-width: 575px) {
        width: 63%;
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
</style>

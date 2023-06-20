<template>
  <div id="table-loading" class="vs-con-loading__container negative_invoice">
    <div class="mb-6 desc">{{ $t('here_you_can_see_all_marked_as_wrong_or_negative_invoices') }}</div>
    <div class="vx-card md:p-8 p-6 md:pb-1">
      <vs-table
        id="table-loading"
        class="vs-con-loading__container vh-hight-table"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCount"
        :max-items="this.length"
        search
        :data="negativeInvoiceData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="created_at"> {{ $t('creation_date') }} </vs-th>
          <vs-th sort-key="due_date"> {{ $t('due_date') }} </vs-th>
          <vs-th sort-key="invoice_number"> {{ $t('invoice_no') }} </vs-th>
          <vs-th sort-key="invoice_by">{{ $t('invoice_by') }} </vs-th>
          <vs-th sort-key="invoice_to"> {{ $t('invoice_to') }} </vs-th>
          <vs-th> {{ $t('additional_files') }} </vs-th>
          <vs-th> {{ $t('verify') }} </vs-th>
          <vs-th sort-key="invoice.mark_as_wrong">{{ $t('markAsWrong') }}</vs-th>
        </template>

        <template slot="header">
          <div class="md:whitespace-no-wrap xl:mb-3 md:mb-1 mb-2 xl:mr-4 md:mr-2 mr-0 w-auto ag-grid-table-actions-left">
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
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>

            <vs-td> {{ formatDate(tr.created_at) }}</vs-td>
            <vs-td> {{ formatDate(tr.due_date) }}</vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewInvoiceRecord(tr)">{{ tr.invoice_number }}</p>
              </div>
            </vs-td>
            <!-- Invoice by -->
            <vs-td>
              <div class="inline-flex" v-if="tr.seeker && tr.seeker.user && tr.seeker.user.id" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewNegaticveInvoiceRecord(tr.seeker && tr.seeker.user && tr.seeker.user.id, tr)">
                  {{ (tr.seeker && tr.seeker.user && tr.seeker.user.full_name) || '-' }}
                </p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p v-if="tr.company && tr.company.id" @click="viewNagativeEmployerRecord(tr.company && tr.company.id, tr.company)">
                  {{ (tr.company.user && tr.company.user.full_name) || '-' }}
                </p>
                <div v-else>-</div>
              </div>
            </vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.UploadAdditionalFiles')">
                  <feather-icon icon="UploadIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="openAdFileUpload(tr.id)" />
                </vx-tooltip>
              </div>
            </vs-td>
            <vs-td>
              <vs-switch color="primary" v-model="tr.verified" vs-value="active" @input="updateToVerifyInvoice(tr.id, tr.verified)">
                <span slot="on">{{ $t('verified') }}</span>
                <span slot="off">{{ $t('verify') }}</span>
              </vs-switch>
            </vs-td>
            <vs-td>
              <vs-switch color="primary" v-model="tr.markAsWrong" vs-value="active" @input="updateMarkAsWrongNegative(tr.id, tr.markAsWrong)">
                <span slot="on">{{ $t('true') }}</span>
                <span slot="off">{{ $t('false') }}</span>
              </vs-switch>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <div class="centerx">
        <vs-pagination :total="Math.ceil(FilteredCount / length)" v-model="page"></vs-pagination>
      </div>
    </div>
    <!-- Add Ad File  -->
    <AdditionalFile v-if="isAddFileModalMounted" :isModalShow.sync="isAddFileModalShow" @newInvList="getData()" :invoiceId="invoiceId" />
    <!-- End Add Ad File -->
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import AdditionalFile from '@/views/invoices/components/AdditionalFiles'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  name: 'NegativeInvoice',
  components: {
    Select2,
    AdditionalFile,
    DatePicker
  },
  data() {
    return {
      length: 10,
      type: 'negative',
      page: 1,
      search: '',
      adFilePopup: false,
      filterBy: '',
      quickPay: '',
      uploadFile: {
        file_name: '',
        invoice_image: []
      },
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
    ...mapState('invoice', ['loading', 'SearchByTypes', 'total', 'FilteredCount', 'invoicedRecords', 'QuickPayTypes']),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),

    negativeInvoiceData() {
      return this.invoicedRecords.reduce((acc, item) => {
        item.invoiceStatus = item.verified === false ? false : true
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
      addFileInvoice: 'addFileInvoice',
      updateVerifyStatus: 'updateVerifyStatus',
      updateStatusMarkAsWrongNegativeInvoice: 'updateStatusMarkAsWrongNegativeInvoice'
    }),

    viewNegaticveInvoiceRecord(id, tr) {
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfileId',
        data: id
      })
      localStorage.setItem('seekerProfileInfoId', id)
      this.$router.push(`/jobseeker/${tr.seeker.id}/info`)
    },
    viewNagativeEmployerRecord(id, tr) {
      this.$store.commit('employer/SET_STATE', {
        action: 'employerCompanyId',
        data: tr.user.id
      })
      localStorage.setItem('employerCompanyId', id)
      localStorage.setItem('empCompanyId', tr.user.id)
      this.$router.push(`/employer/${id}/info`)
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
    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getData()
    },
    handleSort(key, active) {
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },
    getData() {
      this.getAllInvoiceRecord({
        limit: this.length,
        page: this.page,
        search: this.search,
        invoice_type: this.type,
        filter_by: this.filterBy,
        quick_pay: this.quickPay,
        order: this.order,
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

    // open popup in Add file in invoice
    openAdFileUpload(id) {
      this.invoiceId = id
      this.isAddFileModalMounted = true
      this.isAddFileModalShow = true
    },
    //update verify status
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
    // update mark as wrong status negative invoice
    async updateMarkAsWrongNegative(id, mark_as_wrong) {
      try {
        const { message } = await this.updateStatusMarkAsWrongNegativeInvoice({
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
    page() {
      this.handleChangePage(this.page)
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
    },
    quickPay: {
      handler(newVal) {
        this.page = 1
        this.getData()
      }
    }
  }
}
</script>
<style lang="scss">
.vuesax-app-is-ltr {
  .negative_invoice {
    .vs-table--search {
      max-width: 100%;
      @media (max-width: 575px) {
        width: 63%;
      }
    }
  }
}

.negative_invoice {
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
  .remove-tip {
    .vs-dropdown--menu--after {
      display: none;
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
  .vh-hight-table {
    .vs-con-tbody {
      max-height: calc(100vh - 110px) !important;
    }
  }
  .date-popup {
    .mx-datepicker-range {
      width: 204px;
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
</style>
<style lang="scss" scoped>
.desc {
  margin-top: -1.25rem !important;
  @media (max-width: 425px) {
    margin-top: -0.25rem !important;
  }
}
</style>

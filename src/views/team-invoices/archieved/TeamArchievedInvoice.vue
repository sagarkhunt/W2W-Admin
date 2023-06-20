<template>
  <div class="archived_teamInvoice">
    <div class="mb-6 desc">{{ $t('here_you_can_see_those_team_invoices_whose_due_date_is_gone_and_unpaid') }}</div>
    <div class="vx-card md:p-8 p-6 md:pb-1">
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
          <vs-th sort-key="created_at">{{ $t('creation_date') }}</vs-th>
          <vs-th sort-key="due_date">{{ $t('due_date') }} </vs-th>
          <vs-th sort-key="invoice_number">{{ $t('invoice_id') }}</vs-th>
          <vs-th sort-key="invoice_by">{{ $t('invoice_by') }} </vs-th>
          <vs-th sort-key="invoice_to">{{ $t('invoice_to') }} </vs-th>
          <vs-th sort-key="sub_total">{{ $t('sub_total') }}</vs-th>
          <vs-th sort-key="approved">{{ $t('archived') }} </vs-th>
          <vs-th sort-key="verified">{{ $t('verify') }} </vs-th>
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
                @click="$router.push('/team-invoices/list')"
                class="btn-add-new p-2 rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary sm:ml-auto w-full md:w-auto text-center"
              >
                <span class="text-base text-primary">{{ $t('go_to_invoice') }} </span>
              </div>
            </div>
            <div class="width">
              <select-2
                id="filterby"
                class="w-full"
                :value="filterBy"
                @input="(item) => (filterBy = item && item.value)"
                placeholder="Filter by"
                name="Filter by"
                autocomplete
                :options="SearchByTypes.map((x) => ({ ...x, label: $t(x.label) }))"
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
                :options="QuickPayTypes.map((x) => ({ ...x, label: $t(x.label) }))"
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
                <p @click="viewTeamInvoiceRecord(tr)">{{ tr.invoice_number }}</p>
              </div>
            </vs-td>

            <vs-td>
              <div class="inline-flex" v-if="tr.team && tr.team.created_by && tr.team.created_by.user && tr.team.created_by.user.id" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewSingleEntrepreneur(tr.team && tr.team.created_by && tr.team.created_by.user && tr.team.created_by.user.id, tr.team && tr.team.created_by && tr.team.created_by.id)">
                  {{ (tr.team && tr.team.created_by && tr.team.created_by.user && tr.team.created_by.user.full_name) || '-' }}
                </p>
              </div>
              <div v-else>-</div>
            </vs-td>
            <vs-td>
              <div v-if="tr.company && tr.company.company_name" class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewEmployerRecord(tr.company && tr.company.id, tr.company)">
                  {{ tr.company && tr.company.company_name }}
                </p>
              </div>

              <div v-else>-</div>
            </vs-td>
            <vs-td>€ {{ tr.company_pay_amount.toFixed(2) }}</vs-td>

            <vs-td>
              <vs-switch color="primary" v-model="tr.invoiceApproved" vs-value="active" @input="updateToApprovedTeamInvoiceArchived(tr.id, tr.invoiceApproved)">
                <span slot="on">{{ $t('true') }}</span>
                <span slot="off">{{ $t('false') }}</span>
              </vs-switch>
            </vs-td>
            <vs-td>
              <vs-switch color="primary" v-model="tr.invoiceStatus" vs-value="active" @input="updateToVerifyStatusTeamInvoice(tr.id, tr.invoiceStatus)">
                <span slot="on">{{ $t('verified') }}</span>
                <span slot="off">{{ $t('verify') }}</span>
              </vs-switch>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <div class="centerx">
        <vs-pagination :total="Math.ceil(FilteredCountArchived / length)" v-model="page"></vs-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import Select2 from '../../../components/custom/form-elements/Select2.vue'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  name: 'TeamInvoiceArchived',
  components: { Select2, DatePicker },
  data: () => ({
    page: 1,
    length: 10,
    search: '',
    filterBy: '',
    quickPay: '',
    order: [],
    type: 'archived',
    //date Picker
    range: {},
    start_date: '',
    end_date: ''
  }),

  mixins: [dateMixins],

  mounted() {
    this.getData()
  },

  computed: {
    ...mapState('teaminvoice', [, 'FilteredCountArchived', 'totalArchived', 'archivedTeamInvoicedRecords', 'SearchByTypes', 'QuickPayTypes']),
    archivedInvoiceData() {
      return this.archivedTeamInvoicedRecords.reduce((acc, item) => {
        item.invoiceStatus = item.verified === false ? false : true
        item.invoiceApproved = item.is_archived === false ? false : true
        acc.push(item)
        return acc
      }, [])
    }
  },

  methods: {
    ...mapActions('teaminvoice', {
      getArchivedInvoiceRecord: 'getArchivedInvoiceRecord',
      updateStatusArchivedTeamInvoice: 'updateStatusArchivedTeamInvoice',
      updateVerifyTeamInvoiceStatus: 'updateVerifyTeamInvoiceStatus'
    }),

    getData() {
      this.getArchivedInvoiceRecord({
        limit: this.length,
        page: this.page,
        search: this.search,
        invoice_type: this.type,
        order: this.order,
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
    async updateToVerifyStatusTeamInvoice(id, status) {
      try {
        const { message } = await this.updateVerifyTeamInvoiceStatus({
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
    async updateToApprovedTeamInvoiceArchived(id, status) {
      try {
        const { message } = await this.updateStatusArchivedTeamInvoice({
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

    // handle search
    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getData()
    },

    // handle change page
    handleChangePage(page) {
      this.page = page
      this.getData()
    },

    // handle sort
    handleSort(key, active) {
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },
    viewTeamInvoiceRecord(tr) {
      this.$router.push(`/team-invoices/${tr.id}/view`)
    },
    //view light Entrepreneur
    viewSingleEntrepreneur(id, seekerId) {
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfileId',
        data: id
      })
      localStorage.setItem('seekerProfileInfoId', id)
      this.$router.push(`/jobseeker/${seekerId}/info`)
    },
    viewEmployerRecord(id,tr) {
      this.$store.commit('employer/SET_STATE', {
        action: 'employerCompanyId',
        data: tr.user.id
      })
      localStorage.setItem('employerCompanyId', id)
      localStorage.setItem('empCompanyId', tr.user.id)
      this.$router.push(`/employer/${id}/info`)
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
    }
  }
}
</script>
<style lang="scss">
.archived_teamInvoice {
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
}

.mx-range-wrapper {
  .mx-calendar-panel-date {
    &:last-child {
      display: none;
    }
  }
}
.vuesax-app-is-ltr {
  .archived_teamInvoice {
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

<template>
  <div class="recently_added__items">
    <vs-card class="cardx bg-green-500">
      <vs-table
        class="vs-con-loading__container responsive-header"
        stripe
        :sst="true"
        maxHeight="500px"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCountInvoiceCommi"
        pagination
        :max-items="length"
        :data="invoiceCommission"
      >
        <template slot="header">
          <!-- TABLE ACTION ROW -->
          <p class="font-bold text-xl mb-2">{{ $t('invoice_commission') }}</p>
        </template>

        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th>{{ $t('user_name') }}</vs-th>
          <vs-th>{{ $t('w2w_commission') }}</vs-th>
          <vs-th>{{ $t('health_insurance') }} </vs-th>
          <vs-th>{{ $t('accident_insurance') }} </vs-th>
          <vs-th>{{ $t('total_commission') }}</vs-th>
        </template>
        <template slot="header">
          <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
            <div class="mb-3 md:mb-0 md:mr-4 ag-grid-table-actions-left md:w-auto w-full">
              <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2">
                    {{ page * length - (length - (FilteredCountInvoiceCommi && 1)) }}
                    -
                    {{ FilteredCountInvoiceCommi - page * length > 0 ? page * length : FilteredCountInvoiceCommi }}
                    {{ $t('of') }} {{ FilteredCountInvoiceCommi }} {{ $t('filtered_from') }} {{ totalInvoiceCommi }}
                    {{ $t('total_entries') }}
                  </span>
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu>
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
              @click="invoiceCommissionDownLoad(invoiceCommission)"
              id="invoiceCommission_pdf"
              class="btn-add-new p-2 md:mr-4 rounded-lg sm:ml-auto cursor-pointer text-lg font-medium text-primary border border-solid border-primary vs-con-loading__container"
            >
              <feather-icon icon="DownloadIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">{{ $t('download') }}</span>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td> {{ tr.seeker && tr.seeker.user && tr.seeker.user.full_name }} </vs-td>
            <vs-td>€ {{ Number(tr.w2w_commission_amount).toFixed(2) }} </vs-td>
            <vs-td>€ {{ Number(tr.health_insurance_amount).toFixed(2) }} </vs-td>
            <vs-td>€ {{ Number(tr.accident_insurance_amount).toFixed(2) }} </vs-td>
            <vs-td>€ {{ Number(tr.commission_amount).toFixed(2) || '-' }} </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vs-card>
    <div id="pdf-container"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import InvoiceCommission from '../../pdf/InvoiceCommission.vue'
import Vue from 'vue'
export default {
  name: 'SeekerW2WCommission',
  data() {
    return {
      page: 1,
      length: 10,
      generating: false
    }
  },
  mixins: [dateMixins],
  computed: {
    ...mapState('dashboard', ['loading', 'totalInvoiceCommi', 'FilteredCountInvoiceCommi', 'invoiceCommission'])
  },
  mounted() {
    this.getData()
  },
  methods: {
    ...mapActions('dashboard', {
      getAllInvociceCommision: 'getAllInvociceCommision'
    }),
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
      this.getAllInvociceCommision({
        limit: this.length,
        page: this.page
      })
    },
    //download PDF
    async invoiceCommissionDownLoad(invoiceCommiInfo) {
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

        const pdfEmp = Vue.extend(InvoiceCommission)
        new pdfEmp({
          propsData: {
            invoiceCommissioninfo: invoiceCommiInfo
          }
        })
          .$on('downloaded', () => {
            setTimeout(() => {
              this.generating = false
            }, 2000)
          })
          .$mount('#mount-node')
      }, 100)
    }
  },

  watch: {
    generating() {
      if (this.generating) {
        this.$vs.loading({
          container: '#invoiceCommission_pdf',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#invoiceCommission_pdf > .con-vs-loading')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.vs-table--tbody-table {
  @media (max-width: 768px) {
    min-width: 950px;
  }
}
</style>
<style lang="scss" scoped>
.responsive-table {
  .vs-con-tbody.vs-table--tbody {
    @media (max-width: 768px) {
      min-width: 900px;
    }
  }
}
.header-table {
  display: block;
}
</style>
<style lang="scss">
.responsive-header {
  .header-table {
    display: unset;
  }
}
</style>

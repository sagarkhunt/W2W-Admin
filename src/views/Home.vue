<template>
  <div class="dashboard">
    <div class="data__tables">
      <div class="grid grid-cols-1 pb-4">
        <h1 class="font-bold xl:text-5xl text-3xl">{{ $t('adminCenterOverview') }}</h1>
      </div>

      <!-- cards -->
      <!-- <DashboardCards /> -->

      <div class="grid grid-cols-1 pb-4">
        <p class="text-2xl dark-1.png opacity-25 font-medium">{{ $t('quick_statistics') }}</p>
      </div>
      <div class="grid admin-grid xxl:gap-x-20 xxl:gap-y-6 xl:gap-x-5 xl:gap-y-10 gap-3 sm:grid-cols-3 grid-cols-2">
        <a href="#">
          <div class="relative">
            <div class="shadow absolute w-full top-0 left-0 text-black sm:text-xl text-sm font-semibold rounded-r-full z-10 bg-white p-3">
              <p>{{ $t('invoices_this_month') }}</p>
            </div>
            <div class="relative flex justify-items-end items-end quick-stat after-container">
              <div class="absolute top-0 left-0 w-full h-full">
                <img src="@/assets/images/red-2.png" alt="puzzle" class="w-full h-full md:object-contain" />
              </div>
              <div class="text-white w-full z-10 text-right xl:px-1 sm:px-4 px-2">
                <h1 class="text-white sm:text-5xl text-4xl break-words">{{ (dashboardsSummaryData.invoice && dashboardsSummaryData.invoice.invoiceThisMonth.totalInvoices) || 0 }}</h1>
                <p class="font-bold texl-lg break-words">€ {{ (dashboardsSummaryData.invoice && dashboardsSummaryData.invoice.invoiceThisMonth.totalInvoiceAmount.toFixed(2)) || 0 }}</p>
              </div>
            </div>
          </div>
        </a>

        <a href="#">
          <div class="relative">
            <div class="shadow absolute w-full top-0 left-0 text-black sm:text-xl text-sm font-semibold rounded-r-full z-10 bg-white p-3">
              <p>{{ $t('invoices_last_month') }}</p>
            </div>
            <div class="relative flex justify-items-end items-end quick-stat after-container">
              <div class="absolute top-0 left-0 w-full h-full">
                <img src="@/assets/images/red-1.png" alt="puzzle" class="w-full h-full md:object-contain" />
              </div>
              <div class="text-white w-full z-10 text-right xl:px-1 sm:px-4 px-2">
                <h1 class="text-white sm:text-5xl text-4xl break-words">{{ (dashboardsSummaryData.invoice && dashboardsSummaryData.invoice.invoiceLastMonth.totalInvoices) || 0 }}</h1>
                <p class="font-bold texl-lg break-words">€ {{ (dashboardsSummaryData.invoice && dashboardsSummaryData.invoice.invoiceLastMonth.totalInvoiceAmount.toFixed(2)) || 0 }}</p>
              </div>
            </div>
          </div>
        </a>

        <a href="#">
          <div class="relative">
            <div class="shadow absolute w-full top-0 left-0 text-black sm:text-xl text-sm font-semibold rounded-r-full z-10 bg-white p-3">
              <p>{{ $t('salaries_pending') }}</p>
            </div>
            <div class="relative flex justify-items-end items-end quick-stat after-container">
              <div class="absolute top-0 left-0 w-full h-full">
                <img src="@/assets/images/light-grey-1.png" alt="puzzle" class="w-full h-full md:object-contain" />
              </div>
              <div class="text-dark w-full z-10 text-right xl:px-1 sm:px-4 px-2">
                <h1 class="sm:text-5xl text-4xl break-words">{{ (dashboardsSummaryData.invoice && dashboardsSummaryData.invoice.salaryPending.totalInvoices) || 0 }}</h1>
                <p class="font-bold texl-lg break-words">€ {{ (dashboardsSummaryData.invoice && dashboardsSummaryData.invoice.salaryPending.totalInvoiceAmount.toFixed(2)) || 0 }}</p>
              </div>
            </div>
          </div>
        </a>

        <a href="#">
          <div class="relative">
            <div class="shadow absolute w-full top-0 left-0 text-black sm:text-xl text-sm font-semibold rounded-r-full z-10 bg-white p-3">
              <p>{{ $t('applications') }}</p>
            </div>
            <div class="relative flex justify-items-end items-end quick-stat after-container">
              <div class="absolute top-0 left-0 w-full h-full">
                <img src="@/assets/images/light-grey-2.png" alt="puzzle" class="w-full h-full md:object-contain" />
              </div>
              <div class="text-white w-full z-10 text-right xl:px-1 sm:px-4 px-2">
                <h1 class="text-white sm:text-5xl text-4xl break-words">{{ dashboardsSummaryData.totalApplications || 0 }}</h1>
              </div>
            </div>
          </div>
        </a>

        <a href="#">
          <div class="relative">
            <div class="shadow absolute w-full top-0 left-0 text-black sm:text-xl text-sm font-semibold rounded-r-full z-10 bg-white p-3">
              <p>{{ $t('missing_tax_cards') }}</p>
            </div>
            <div class="relative flex justify-items-end items-end quick-stat after-container">
              <div class="absolute top-0 left-0 w-full h-full">
                <img src="@/assets/images/white-2.png" alt="puzzle" class="w-full h-full md:object-contain" />
              </div>
              <div class="w-full z-10 text-right xl:px-1 sm:px-4 px-2">
                <h1 class="sm:text-5xl text-4xl break-words">{{ dashboardsSummaryData.missingTaxCards || 0 }}</h1>
                <p class="font-bold texl-lg text-dark break-words">{{ $t('using_60_tax') }}</p>
              </div>
            </div>
          </div>
        </a>

        <a href="#">
          <div class="relative">
            <div class="shadow absolute w-full top-0 left-0 text-black sm:text-xl text-sm font-semibold rounded-r-full z-10 bg-white p-3">
              <p>{{ $t('expiring_tax_cards') }}</p>
            </div>
            <div class="relative flex justify-items-end items-end quick-stat after-container">
              <div class="absolute top-0 left-0 w-full h-full">
                <img src="@/assets/images/white-1.png" alt="puzzle" class="w-full h-full md:object-contain" />
              </div>
              <div class="w-full z-10 text-right xl:px-1 sm:px-4 px-2">
                <h1 class="sm:text-5xl text-4xl break-words">{{ dashboardsSummaryData.totalExpiredTaxCard || 0 }}</h1>
                <p class="font-bold texl-lg text-dark break-words">{{ $t('soonto_hit_limit') }}</p>
              </div>
            </div>
          </div>
        </a>

        <a href="#">
          <div class="relative">
            <div class="shadow absolute w-full top-0 left-0 text-black sm:text-xl text-sm font-semibold rounded-r-full z-10 bg-white p-3">
              <p>{{ $t('invoices_pending') }}</p>
            </div>
            <div class="relative flex justify-items-end items-end quick-stat after-container">
              <div class="absolute top-0 left-0 w-full h-full">
                <img src="@/assets/images/dark-1.png" alt="puzzle" class="w-full h-full md:object-contain" />
              </div>
              <div class="text-white w-full z-10 text-right xl:px-1 sm:px-4 px-2">
                <h1 class="text-white sm:text-5xl text-4xl break-words">{{ (dashboardsSummaryData.invoice && dashboardsSummaryData.invoice.invoicePending.totalInvoices) || 0 }}</h1>
                <p class="font-bold texl-lg break-words">€ {{ (dashboardsSummaryData.invoice && dashboardsSummaryData.invoice.invoicePending.totalInvoiceAmount.toFixed(2)) || 0 }}</p>
              </div>
            </div>
          </div>
        </a>

        <a href="#">
          <div class="relative">
            <div class="shadow absolute w-full top-0 left-0 text-black sm:text-xl text-sm font-semibold rounded-r-full z-10 bg-white p-3">
              <p>{{ $t('new_jobseekers') }}</p>
            </div>
            <div class="relative flex justify-items-end items-end quick-stat after-container">
              <div class="absolute top-0 left-0 w-full h-full">
                <img src="@/assets/images/pink-1.png" alt="puzzle" class="w-full h-full md:object-contain" />
              </div>
              <div class="text-white w-full z-10 text-right xl:px-1 sm:px-4 px-2">
                <h1 class="text-white sm:text-5xl text-4xl break-words">{{ (dashboardsSummaryData.newUsers && dashboardsSummaryData.newUsers.registeredSeekerThisMonth) || 0 }}</h1>
                <p class="font-bold texl-lg break-words">{{ $t('today') }} {{ (dashboardsSummaryData.newUsers && dashboardsSummaryData.newUsers.registeredSeekerToday) || 0 }}</p>
              </div>
            </div>
          </div>
        </a>

        <a href="#">
          <div class="relative">
            <div class="shadow absolute w-full top-0 left-0 text-black sm:text-xl text-sm font-semibold rounded-r-full z-10 bg-white p-3">
              <p>{{ $t('new_employers') }}</p>
            </div>
            <div class="relative flex justify-items-end items-end quick-stat after-container">
              <div class="absolute top-0 left-0 w-full h-full">
                <img src="@/assets/images/pink-2.png" alt="puzzle" class="w-full h-full md:object-contain" />
              </div>
              <div class="text-white w-full z-10 text-right xl:px-1 sm:px-4 px-2">
                <h1 class="text-white sm:text-5xl text-4xl break-words">{{ (dashboardsSummaryData.newUsers && dashboardsSummaryData.newUsers.registeredCompanyThisMonth) || 0 }}</h1>
                <p class="font-bold texl-lg break-words">{{ $t('today') }} {{ (dashboardsSummaryData.newUsers && dashboardsSummaryData.newUsers.registeredCompanyToday) || 0 }}</p>
              </div>
            </div>
          </div>
        </a>

        <a href="/expenses-pending/list">
          <div class="relative">
            <div class="shadow absolute w-full top-0 left-0 text-black sm:text-xl text-sm font-semibold rounded-r-full z-10 bg-white p-3">
              <p>{{ $t('expences_pending') }}</p>
            </div>
            <div class="relative flex justify-items-end items-end quick-stat after-container">
              <div class="absolute top-0 left-0 w-full h-full">
                <img src="@/assets/images/dark-2.png" alt="puzzle" class="w-full h-full md:object-contain" />
              </div>
              <div class="text-white w-full z-10 text-right xl:px-1 sm:px-4 px-2">
                <h1 class="text-white sm:text-5xl text-4xl break-words">{{ (dashboardsSummaryData.expencesPending && dashboardsSummaryData.expencesPending.expencesPendingCount) || 0 }}</h1>
                <p class="font-bold texl-lg break-words">€ {{ (dashboardsSummaryData.expencesPending && dashboardsSummaryData.expencesPending.expencesPendingAmount.toFixed(2)) || 0 }}</p>
              </div>
            </div>
          </div>
        </a>
      </div>

      <vs-row class="mt-10 d-block">
        <div class="grid gap-5">
          <!-- recently added table -->

          <div class="w-full sm:max-w-full max-w-27rem overflow-x-auto">
            <vs-col class="vx-col chartbg md:mb-0 mb-5">
              <EmployerCashPaid />
            </vs-col>
          </div>

          <!-- stock alert -->
          <div class="w-full sm:max-w-full max-w-27rem overflow-x-auto">
            <vs-col class="vx-col chartbg">
              <LESalaryPaidout />
            </vs-col>
          </div>

          <div class="w-full sm:max-w-full max-w-27rem overflow-x-auto">
            <vs-col class="vx-col chartbg">
              <LightEnterpreneur />
            </vs-col>
          </div>

          <div class="w-full sm:max-w-full max-w-27rem overflow-x-auto">
            <vs-col class="vx-col chartbg">
              <Employers />
            </vs-col>
          </div>
          <div class="w-full sm:max-w-full max-w-27rem overflow-x-auto">
            <vs-col class="vx-col chartbg">
              <Invoices />
            </vs-col>
          </div>

          <!-- LECommisionPaidOut -->
          <div class="w-full sm:max-w-full max-w-27rem overflow-x-auto">
            <vs-col class="vx-col chartbg"> <MostPaidLE /> </vs-col>
          </div>
          <div class="w-full sm:max-w-full max-w-27rem overflow-x-auto">
            <vs-col class="vx-col lg:w-1/2">
              <More90 />
            </vs-col>
          </div>
          <div class="w-full sm:max-w-full max-w-27rem overflow-x-auto">
            <vs-col class="vx-col w-full">
              <InsuranceRequest />
            </vs-col>
          </div>
          <div class="w-full sm:max-w-full max-w-27rem overflow-x-auto">
            <vs-col class="vx-col w-full">
              <SeekerW2WCommission />
            </vs-col>
          </div>
          <div class="w-full sm:max-w-full max-w-27rem overflow-x-auto">
            <vs-col class="vx-col w-full">
              <LE60TaxInvoice />
            </vs-col>
          </div>
        </div>
      </vs-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import EmployerCashPaid from '@/views/dashboard/components/EmployerCashPaid.vue'
import LESalaryPaidout from '@/views/dashboard/components/LESalaryPaidout.vue'
import Employers from '@/views/dashboard/components/Employers.vue'
import Invoices from '@/views/dashboard/components/Invoices.vue'
import LECommisionPaidOut from '@/views/dashboard/components/LECommisionPaidOut.vue'
import LightEnterpreneur from '@/views/dashboard/components/LightEnterpreneur.vue'
import More90 from '@/views/dashboard/components/More90.vue'
import MostPaidLE from '@/views/dashboard/components/MostPaidLE.vue'
import InsuranceRequest from '@/views/dashboard/components/InsuranceRequest.vue'
import SeekerW2WCommission from '@/views/dashboard/components/SeekerW2WCommission.vue'
import LE60TaxInvoice from '@/views/dashboard/components/LE60TaxInvoice.vue'

export default {
  name: 'Dashboard',
  components: {
    EmployerCashPaid,
    Employers,
    Invoices,
    LECommisionPaidOut,
    LESalaryPaidout,
    LightEnterpreneur,
    More90,
    MostPaidLE,
    InsuranceRequest,
    LE60TaxInvoice,
    SeekerW2WCommission
  },

  data() {
    return {}
  },

  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('dashboard', ['dashboardsSummaryData'])
  },
  methods: {
    ...mapActions('dashboard', { dashboardData: 'dashboardData' }),
    getData() {
      this.dashboardData()
    }
  }
}
</script>

<style lang="scss" scoped>
green.dashboard {
  .announcement {
    .notification__content {
      background: green;

      border-left: 5px solid darkgreen;

      p {
        margin-bottom: 10px;

        a {
          color: #fff;
        }
      }
    }
  }
}
.quick-stat {
  min-height: 210px;
  padding: 4.1rem;

  @media (max-width: 1800px) {
    padding: 2.4rem;
  }
  @media (max-width: 1500px) {
    padding: 2.9rem;
  }
  @media (max-width: 768px) {
    padding: 2.6rem;
  }
}
chartbg .admin-grid {
  p {
    font-size: 17px;
    @media (max-width: 1600px) {
      font-size: 16px;
    }
    @media (max-width: 425px) {
      font-size: 15px;
    }
  }
}
.after-container {
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translate(2px, -60px);
    left: -2px;
    z-index: -1;
    width: 55px;
    height: 30px;
    background-color: #000;
    clip-path: polygon(100% 0, 0 0, 100% 100%);

    @media (min-width: 1024px) {
      left: 0px;
    }
    @media (min-width: 2560px) {
      left: 2px;
    }
    @media (max-width: 425px) {
      top: 47%;
    }
  }
}

@media (min-width: 992px) {
  .admin-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  }
}
@media (min-width: 1440px) {
  .admin-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
  }
}

.d-block {
  display: block !important;
}
.vs-card--content,
.con-vs-card {
  margin-bottom: 0 !important;
}
.max-w-27rem {
  max-width: 27rem;
}
</style>

<style lang="scss">
.chartbg {
  .vs-con-table {
    .vs-con-tbody {
      background: #ffffff;
      border: 0px solid #ffffff;
      overflow-y: hidden !important;
    }
  }
}
.dashboard-charts {
  width: 100%;
  max-width: 1500px;

  @media (max-width: 1440px) {
    max-width: 1300px;
  }
}
.date-popup {
  .vc-popover-content-wrapper {
    z-index: 999;
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

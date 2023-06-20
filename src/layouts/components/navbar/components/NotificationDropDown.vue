<template>
  <!-- NOTIFICATIONS -->
  <div>
    <feather-icon icon="CreditCardIcon" class="cursor-pointer mt-1 sm:mr-6 mr-2" @click="ok" />
    <vs-popup class="con-vs-popup .vs-popup-salary-calc" button-accept="false" button-cancel="false" :title="$t('model.SalaryCalculator')" :active.sync="activeGigsView">
      <!-- compensation calculation -->
      <div>
        <div>
          <div class="flex items-center justify-between sm:flex-no-wrap flex-wrap">
            <!-- no. of work days -->
            <div class="mx-0 mb-2">
              <vs-input type="number" class="w-full text-center" v-model="no_of_work_days" name="no_of_work_days" placeholder="Num of work Days" />
            </div>
            <div>
              <p>{{ $t('total_work_days') }} - {{ no_of_work_days || 0 }}</p>
            </div>
          </div>
        </div>

        <div>
          <!-- food / day - compensation -->
          <div class="flex items-center justify-between sm:flex-no-wrap flex-wrap">
            <div class="mx-0 mb-2">
              <vs-input type="number" class="w-full" v-model="food_value" name="food_value" placeholder="Food / Day Value" />
            </div>
            <div>
              <p>{{ $t('total_food_/_day_compensation') }}- {{ calculateTotalFoodCompensation | priceRound }}</p>
            </div>
          </div>
        </div>

        <div>
          <!-- distance compensation -->
          <div class="flex items-center justify-between sm:flex-no-wrap flex-wrap">
            <div class="mx-0 mb-2">
              <vs-input type="number" class="w-full" v-model="no_km" name="no_km" placeholder="Number Of KM" />
            </div>
            <div>
              <p>{{ $t('total_distance_compensation') }} - {{ calculateTotalDistanceCompensation | priceRound }}</p>
            </div>
          </div>
        </div>

        <div>
          <!-- other compensation -->
          <div class="flex items-center justify-between sm:flex-no-wrap flex-wrap">
            <div class="mx-0 mb-2">
              <vs-input type="number" class="w-full" v-model="compensation" name="compensation" placeholder="Compensation" />
            </div>
            <div>
              <p>{{ $t('total_other_compensation') }} - {{ calculateTotalOtherCompensation | priceRound }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between sm:flex-no-wrap flex-wrap">
        <!-- trailer compensation -->
        <div class="flex items-center sm:mb-0 mb-2">
          <div>
            <vs-checkbox class="mt-3 ml-3" v-model="isTrailer"></vs-checkbox>
          </div>
          <p class="mt-3">{{ $t('trailer') }}</p>
        </div>

        <div>
          <p>{{ $t('total_trailer_compensation') }} - {{ calculateTotalTrailerCompensation | priceRound }}</p>
        </div>
      </div>

      <div class="flex items-center justify-between sm:flex-no-wrap flex-wrap">
        <!-- driver ruff terrain -->
        <div class="flex items-center sm:mb-0 mb-2">
          <div>
            <vs-checkbox class="mt-3 ml-3" v-model="isDriverRuff"></vs-checkbox>
          </div>
          <p class="mt-3">{{ $t('driver_ruff_terrain') }}</p>
        </div>

        <div class="sm:ml-0 ml-12">
          <p>{{ $t('total_driver_ruff_terrain_compensation') }} - {{ calculateTotalDriverRuffCompensation | priceRound }}</p>
        </div>
      </div>

      <div class="flex items-center justify-between sm:flex-no-wrap flex-wrap">
        <!-- vehicle sub class compensation -->
        <div class="flex items-center sm:mb-0 mb-2">
          <div>
            <vs-checkbox class="mt-3 ml-3" v-model="isVehicleSubClass"></vs-checkbox>
          </div>
          <p class="mt-3">{{ $t('vehicle_subclass') }}</p>
        </div>

        <div class="sm:ml-0 ml-12">
          <p>{{ $t('total_vehicle_subclass_compensation') }} - {{ calculateVehicleSubClassCompensation | priceRound }}</p>
        </div>
      </div>

      <!-- divider -->
      <vs-divider color="dark text-xl"> {{ $t('taxable_payments') }} </vs-divider>

      <!-- contract detail calculation -->
      <div class="vx-row pt-5 px-5">
        <!-- contract value -->
        <div class="vx-col w-full md:w-1/3 px-8">
          <div class="vx-row">
            <label for="">{{ $t('contract_value') }} </label>
            <vs-input type="number" class="w-full" v-model="contract_value" name="food_value" placeholder="€ / H" />
          </div>
        </div>

        <!-- work hours -->
        <div class="vx-col mt-5 w-full md:w-1/3 px-8">
          <div class="vx-row">
            <vs-input type="number" class="w-full" v-model="worked_hours" name="food_value" placeholder="worked Hours" />
          </div>
        </div>

        <!-- total contract value -->
        <div class="vx-col mt-5 w-full md:w-1/3 px-8">
          <div class="vx-row">
            <p class="mt-2 font-bold">= {{ calculateTotalContractValue | priceRound }} € ( {{ $t('sis_24_alv') }} )</p>
          </div>
        </div>
      </div>

      <!-- total compensations -->
      <div class="vx-row mt-3 px-5">
        <div class="vx-col w-full md:w-8/12 px-8">
          <div class="vx-row">
            <label for="">{{ $t('total_compensation_amount') }} </label>
          </div>
        </div>
        <div class="vx-col w-full md:w-1/3 px-8">
          <div class="vx-row">
            <p class="font-bold">= {{ calculateTotalCompensationAmount | priceRound }} €</p>
          </div>
        </div>
      </div>

      <!-- gross salary -->
      <div class="vx-row mt-3 px-5">
        <div class="vx-col w-full md:w-8/12 px-8">
          <div class="vx-row">
            <label for="">{{ $t('gross_salary') }} </label>
          </div>
        </div>
        <div class="vx-col w-full md:w-1/3 px-8">
          <div class="vx-row">
            <p class="font-bold">= {{ calculateGrossSalary | priceRound }} €</p>
          </div>
        </div>
      </div>

      <!-- personal tax -->
      <div class="vx-row pt-5 px-5">
        <div class="vx-col w-full md:w-8/12 px-8">
          <div class="vx-row">
            <label for="">{{ $t('personal_tax(%)') }} </label>
            <vs-input class="w-full mt-2" v-model="personal_tax" name="food_value" placeholder="Personal tax" />
          </div>
        </div>
        <div class="vx-col mt-5 w-full md:w-1/3 px-8">
          <div class="vx-row">
            <p class="mt-2 font-bold">= {{ calculatePersonalTaxAmount | priceRound }} €</p>
          </div>
        </div>
      </div>

      <!-- divider -->
      <vs-divider color="dark"> {{ $t('salary_without_compensation') }}: </vs-divider>

      <!-- salary without compensation -->
      <div class="vx-row mt-3 px-5">
        <div class="vx-col w-full md:w-8/12 px-8">
          <div class="vx-row">
            <label for="">{{ $t('salary_without_compensation') }}: </label>
          </div>
        </div>
        <div class="vx-col w-full md:w-1/3 px-8">
          <div class="vx-row">
            <p class="mt-2 font-bold">
              =
              {{ calculateSalaryWithoutCompensation | priceRound }} €
            </p>
          </div>
        </div>
      </div>

      <!-- divider -->
      <vs-divider color="dark"> {{ $t('commission') }} </vs-divider>

      <!-- calculate company commission -->
      <div class="vx-row pt-3 px-5">
        <!-- insurance commission -->
        <div class="vx-col w-full md:w-1/2 px-2 flex items-center">
          <label for="" class="whitespace-nowrap mr-2">{{ $t('social_benifits(%)') }} </label>
          <vs-input disabled class="w-36 ml-auto" v-model="social_benifit" name="food_value" />
        </div>
        <div class="vx-col w-full md:w-1/6 px-2">
          <div class="vx-row">
            <p class="mt-2 sm:ml-2 ml-4">( {{ $t('sis_24_alv') }} )</p>
          </div>
        </div>
        <div class="vx-col w-full md:w-1/6 px-8">
          <div class="vx-row">
            <p class="mt-2 font-bold">={{ calculateInsuranceCommision | priceRound }}€</p>
          </div>
        </div>
      </div>

      <!-- calculate company commission -->
      <div class="vx-row pt-3 px-5">
        <!-- W2W commission -->
        <div class="vx-col w-full md:w-1/2 px-2 flex items-center">
          <!-- <div class="vx-row"> -->
          <label for="" class="whitespace-nowrap mr-2">{{ $t('commission(%)') }} </label>
          <vs-input disabled class="w-36 ml-auto" v-model="commision" name="food_value" />
          <!-- </div> -->
        </div>
        <div class="vx-col w-full md:w-1/6 px-2">
          <div class="vx-row">
            <p class="mt-2 sm:ml-2 ml-4">( {{ $t('sis_24_alv') }} )</p>
          </div>
        </div>
        <div class="vx-col w-full md:w-1/6 px-8">
          <div class="vx-row">
            <p class="mt-2 font-bold">={{ calculateW2WCommision | priceRound }}€</p>
          </div>
        </div>
      </div>

      <!-- divider -->
      <vs-divider color="dark">{{ $t('total_service_fee_24') }} </vs-divider>

      <!-- calculate total service fee -->
      <div class="vx-row mt-3 px-5">
        <div class="vx-col w-full md:w-8/12 px-8">
          <div class="vx-row">
            <label for="">{{ $t('total_service_fee_24') }} : </label>
          </div>
        </div>
        <div class="vx-col w-full md:w-1/3 px-8">
          <div class="vx-row">
            <p class="mt-2 font-bold">= {{ calculateTotalServiceFee | priceRound }} €</p>
          </div>
        </div>
      </div>

      <!-- divider -->
      <vs-divider color="dark"> {{ $t('payble_to_account') }} </vs-divider>

      <!-- calculate net salary payable -->
      <div class="vx-row mt-3 px-5">
        <div class="vx-col w-full md:w-8/12 px-8">
          <div class="vx-row">
            <label for="">{{ $t('net_salary_payble') }} : </label>
          </div>
        </div>
        <div class="vx-col w-full md:w-1/3 px-8">
          <div class="vx-row">
            <p class="mt-2 font-bold">= {{ calculateTotalServiceFee | priceRound }}€</p>
          </div>
        </div>
      </div>

      <!-- calculate total compensation amount -->
      <div class="vx-row mt-3 px-5">
        <div class="vx-col w-full md:w-8/12 px-8">
          <div class="vx-row">
            <label for="">{{ $t('total_compensation_amount') }} : </label>
          </div>
        </div>
        <div class="vx-col w-full md:w-1/3 px-8">
          <div class="vx-row">
            <p class="mt-2 font-bold">= {{ calculateTotalCompensationAmount | priceRound }} €</p>
          </div>
        </div>
      </div>

      <!-- divider -->
      <vs-divider color="dark"> {{ $t('paid_to_account') }} </vs-divider>

      <!-- calculate paid to account -->
      <div class="vx-row mt-3 px-5">
        <div class="vx-col w-full md:w-8/12 px-8">
          <div class="vx-row">{{ $t('paid_to_account') }}</div>
        </div>
        <div class="vx-col w-full md:w-1/3 px-8">
          <div class="vx-row">
            <p class="mt-2 font-bold">= {{ calculatePaidToAccountAmount | priceRound }} €</p>
          </div>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: {
    VuePerfectScrollbar
  },
  data() {
    return {
      activeGigsView: false,

      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },

      // Distance
      isTrailer: false,
      isDriverRuff: false,
      isVehicleSubClass: false,
      food_value: null,
      no_km: null,
      worked_hours: null,
      contract_value: null,
      distance: null,
      compensation: null,
      no_of_work_days: 1,
      personal_tax: null,
      social_benifit: 4.38,
      commision: 7.44
    }
  },
  computed: {
    scrollbarTag() {
      return this.$store.getters.scrollbarTag
    },

    // calculate total food compensation
    calculateTotalFoodCompensation() {
      return this.food_value * this.no_of_work_days
    },

    // calculate total distance
    calculateTotalDistance() {
      return this.no_km * this.no_of_work_days
    },

    // calculate total distance compensation
    calculateTotalDistanceCompensation() {
      return this.calculateTotalDistance * 0.46
    },

    // calculate total other compensation
    calculateTotalOtherCompensation() {
      return this.compensation * this.no_of_work_days
    },

    // calculate total trailer compensation
    calculateTotalTrailerCompensation() {
      return this.isTrailer ? this.calculateTotalDistance * 0.23 : 0
    },

    // calculate total driver ruff terrain compensation
    calculateTotalDriverRuffCompensation() {
      return this.isDriverRuff ? this.calculateTotalDistance * 0.1 : 0
    },

    // calculate vehicle sub class compensation
    calculateVehicleSubClassCompensation() {
      return this.isVehicleSubClass ? this.calculateTotalDistance * 0.08 : 0
    },

    // calculate total contract value
    calculateTotalContractValue() {
      return (this.worked_hours * this.contract_value * (100 + 24)) / 100
    },

    // total compensation amount
    calculateTotalCompensationAmount() {
      return (
        this.calculateTotalFoodCompensation +
        this.calculateTotalDistanceCompensation +
        this.calculateTotalOtherCompensation +
        this.calculateTotalTrailerCompensation +
        this.calculateTotalDriverRuffCompensation +
        this.calculateVehicleSubClassCompensation
      )
    },

    // calculate gross salary
    calculateGrossSalary() {
      return this.calculateTotalContractValue - this.calculateTotalCompensationAmount
    },

    // calculate personal tax amount
    calculatePersonalTaxAmount() {
      return (this.personal_tax * this.calculateGrossSalary) / 100
    },

    // calculate salary without compensation
    calculateSalaryWithoutCompensation() {
      return this.calculateGrossSalary - this.calculatePersonalTaxAmount
    },

    // calculate insurance commission
    calculateInsuranceCommision() {
      return (this.calculateGrossSalary * this.social_benifit) / 100
    },

    // calculate w2w commission
    calculateW2WCommision() {
      return (this.calculateTotalContractValue * this.commision) / 100
    },

    // calculate total service fee
    calculateTotalServiceFee() {
      return this.calculateSalaryWithoutCompensation - (this.calculateInsuranceCommision + this.calculateW2WCommision)
    },

    // calculate paid to account
    calculatePaidToAccountAmount() {
      return this.calculateTotalServiceFee + this.calculateTotalCompensationAmount
    }
  },

  methods: {
    ok() {
      const price = 1470000.15
      let dollarUSLocale = Intl.NumberFormat('en-US')
      let dollarIndianLocale = Intl.NumberFormat('en-IN')
      this.activeGigsView = true
    },
    filtersValues(value) {
      return Math.round(value)
    }
  },

  filters: {
    priceRound(val) {
      return Math.round(((val ? parseFloat(val) : 0) + Number.EPSILON) * 10 ** 2) / 10 ** 2
    }
  }
}
</script>

<style lang="scss" scope>
.con-vs-popup .vs-popup-salary-calc {
  width: 2000px;
  height: 1100px;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.vs-divider--text {
  font-size: 1.25rem;
  font-weight: 600;

  @media (max-width: 425px) {
    font-size: 1.15rem;
  }
}

.w-36 {
  width: 9rem;
}
</style>

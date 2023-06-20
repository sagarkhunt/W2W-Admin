<template>
  <div>
    <td class="py-2 px-1">
      <div class="flex justify-center">
        <div class="product">1</div>
      </div>
    </td>
    <td class="py-2 px-1">
      <div class="team-Member">
        <input type="text" class="bg-transparent border-0 w-full" />
      </div>
    </td>
    <td class="py-2 px-1">
      <div class="team-Member">
        <input type="text" class="bg-transparent border-0 w-full" />
      </div>
    </td>
    <td class="py-2 px-1">
      <div class="multiselect-input">
        <select-2
          id=""
          placeholder="Hours"
          :value="form.contract_type"
          @input="(item) => (form.contract_type = item && item.value)"
          :options="ContractTypes.map(x=>({...x, label: $t(x.label)}))"
          icon-pack="feather"
          name="Select Select Group"
          v-validate="'required'"
        />
        <span class="text-primary text-sm" v-show="errors.has('Hours')">{{ errors.first('Hours') }}</span>
      </div>
    </td>
    <td class="py-2 px-1">
      <div class="contract-Value">
        <p class="mr-2 text-black">€</p>
        <input type="number" value="0" class="bg-transparent border-0 w-full text-black" />
      </div>
    </td>
    <td class="py-2 px-1">
      <div class="contract-Value">
        <p class="mr-2 text-black">€</p>
        <input type="number" value="0" class="bg-transparent border-0 w-full text-black" />
      </div>
    </td>
    <td class="py-2 px-1">
      <div class="flex">
        <div class="actions-btn cursor-pointer mr-2">
          <feather-icon icon="CopyIcon" svgClasses="w-6" />
        </div>
        <div class="actions-btn cursor-pointer mr-2">
          <feather-icon icon="Trash2Icon" svgClasses="w-6" @click="removeDetail()" />
        </div>
        <div class="actions-btn bg-black text-white cursor-pointer">
          <feather-icon @click="openInvoiceInfo" icon="ChevronDownIcon" svgClasses="w-6" />
        </div>
      </div>
    </td>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { dateMixins } from '@/mixins/dateMixins.js'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TeamInvoice',
  components: {
    Select2,
    DatePicker
  },
  data() {
    return {
      calculatedInfo: false,
      form: {
        invoice_number: null,
        reference_number: null,
        invoice_date: null,
        payment_terms: null,
        vat: null,
        teamId: null,
        due_date: null,
        contract_type: null
      }
    }
  },
  mixins: [dateMixins],

  computed: {
    ...mapState('employer', ['employer', 'EmployessTypes']),
    ...mapState('invoice', ['VatTypes']),
    ...mapState('postedJobs', ['ContractTypes']),

    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {

    removeDetail() {      
       
    },
    openInvoiceInfo() {
      if (this.calculatedInfo) {
        this.calculatedInfo = false
      } else {
        this.calculatedInfo = true
      }
    }
  },
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#add-employer',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#add-employer > .con-vs-loading')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.pph-left-box {
  padding: 19px;
  border-radius: 20px;
  background-color: #f9f9f9;
  .pph-left-content {
    .company-content {
      .company-text {
        .company-titel {
          max-width: 160px;
          color: #858a90;
        }
      }
    }
  }
}
.plus-modal {
  cursor: pointer;
  color: #fff;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: rgb(255, 75, 87);
  border: 2px solid #ffe4e6;
}
.employer-details {
  .pph-left {
    .title-lg {
      color: #a0a4a9;
      font-size: 26px;
    }
  }
}
.border-spacing-0 {
  border-spacing: 0;
}
.daily-Work-Details {
  .product {
    font-size: 14px;
    padding: 8px 25px;
    border-radius: 12px;
    border: 2px solid #e4e6e7;
  }
  .team-Member {
    width: 100%;
    padding: 8px 20px;
    border-radius: 12px;
    background-color: #f6f6f6;
    font-size: 14px;
  }
  .multiselect-input {
    border: none !important;
    width: 100%;
    border-radius: 12px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    outline: none;
    padding: 8px 20px;
    background-color: #f6f6f6;
  }
  .contract-Value {
    padding: 8px 10px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    background-color: #f6f6f6;
  }
  .actions-btn {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    color: rgb(255, 75, 87);
    background-color: #f8dddf;
  }
  .opne-toggle {
    .summary-box {
      background-color: rgb(255, 75, 87);
      height: 320px;
      .summary-text {
        font-size: 48px;
        letter-spacing: -3px;
        line-height: 41px;
        text-shadow: 1px 3px 3px #494848;
      }
    }
    .dark-box {
      height: 320px;
    }
  }
}
.total {
  max-width: 400px;
  background-color: #f9f9f9;
  .total-excl {
    .text-total {
      color: #858a90;
    }
  }
  .border-top-bottom {
    border-top: 1px solid #dde0e2;
    border-bottom: 4px solid #dde0e2;
    .total-prize {
      color: rgb(255, 75, 87);
    }
  }
}
.explaination {
  background-color: #f9f9f9;
  border: 3px dashed #dde0e2;
}
</style>
<style lang="scss">
.multiselect-input {
  padding: 0 !important;
  .con-select {
    .vs-select--input {
      border: 0;
      background: transparent;
    }
  }
}
</style>
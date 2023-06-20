<template>
  <vue-html2pdf :enable-download="true" filename="invoice-commission" ref="InvoiceCommissionReport" :manual-pagination="true" :pdf-orientation="'portrait'" pdf-format="a4">
    <section slot="pdf-content">
      <div class="flex justify-center py-4 border">
        <h2>Way2Work oy : LE Salary Paid Out</h2>
      </div>
      <vs-table :data="invoiceCommissioninfo">
        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th>User Name</vs-th>
          <vs-th>W2W Commission</vs-th>
          <vs-th>Misb Commission </vs-th>
          <vs-th>Total Commission</vs-th>
        </template>
        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{i + 1}}</vs-td>
            <vs-td> {{ tr.seeker && tr.seeker.user && tr.seeker.user.full_name }} </vs-td>
            <vs-td> {{ Number(tr.w2w_commission_amount).toFixed(2) }} </vs-td>
            <vs-td> {{ Number(tr.misb_commission_amount).toFixed(2) || '-' }} </vs-td>
            <vs-td> {{ Number(tr.commission_amount).toFixed(2) || '-' }} </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </section>
  </vue-html2pdf>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import { dateMixins } from '@/mixins/dateMixins.js'

export default {
  name: 'InvoiceCommission',
  props: {
    invoiceCommissioninfo: {}
  },
  components: {
    VueHtml2pdf
  },
  data() {
    return {}
  },
  mixins: [dateMixins],
  created() {
    this.$nextTick(() => {
      window.scrollTo(0, 0)
      this.$refs.InvoiceCommissionReport.downloadPdf()
      this.$emit('downloaded')
    })
  }
}
</script>

<style></style>

<template>
  <vue-html2pdf :enable-download="true" filename="le-salary-paid-list" ref="LESalaryPaidReport" :manual-pagination="true" :pdf-orientation="'portrait'" pdf-format="a4">
    <section slot="pdf-content">
      <div class="flex justify-center py-4 border">
        <h2>Way2Work oy : LE Salary Paid Out</h2>
      </div>
      <vs-table :data="leSalaryReport">
        <template slot="thead">
          <vs-th>Sr#</vs-th>
          <vs-th>Job Seeker </vs-th>
          <vs-th>Cash Paid </vs-th>
          <vs-th>Payment Date </vs-th>
          <vs-th>Created On </vs-th>
        </template>
        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>#</vs-td>
            <vs-td>{{ (tr.invoice && tr.invoice.seeker && tr.invoice.seeker.user && tr.invoice.seeker.user.full_name) || '-' }}</vs-td>
            <vs-td>{{ tr.amount || '-' }}</vs-td>
            <vs-td>{{ tr.payment_date || '-' }}</vs-td>
            <vs-td>{{ formatDate(tr.created_at || '-') }}</vs-td>
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
  name: 'LESalaryReports',
  props: {
    leSalaryReport: {}
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
      this.$refs.LESalaryPaidReport.downloadPdf()
      this.$emit('downloaded')
    })
  }
}
</script>

<style></style>

<template>
  <div>
    <vue-html2pdf :enable-download="true" filename="fee-stastics" ref="FeeStasticsReport" :manual-pagination="true" :pdf-orientation="'portrait'" pdf-format="a4">
      <section slot="pdf-content" class="feesatiscs-wrap">
        <div class="flex justify-center py-4 border">
          <h2>Way2Work oy : Fee statistics</h2>
        </div>
        <vs-table :data="feeStatisticsListInfo" class="feesatiscs-pdf">
          <template slot="thead">
            <vs-th>Sr#</vs-th>
            <vs-th>Light Entrepreneur</vs-th>
            <vs-th>Date Joined</vs-th>
            <vs-th style="text-align: center">Email Address </vs-th>
            <vs-th>Accident insurance fees </vs-th>
            <vs-th>Health insurance fees </vs-th>
            <vs-th>Platform fees </vs-th>
            <vs-th>All fees combined </vs-th>
          </template>
          <template slot-scope="{ data }" ref="tableBody">
            <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
              <vs-td>{{ i + 1 }}</vs-td>
              <vs-td> {{ tr.full_name || '-' }} </vs-td>
              <vs-td> {{ formatDate(tr.created_at) }} </vs-td>
              <vs-td> {{ tr.email || '-' }} </vs-td>
              <vs-td>€ {{ Number(tr.tot_accident_insurance).toFixed(2) || '-' }} </vs-td>
              <vs-td>€ {{ Number(tr.tot_health_insurance).toFixed(2) }} </vs-td>
              <vs-td>€ {{ Number(tr.tot_w2w_commission).toFixed(2) || '-' }} </vs-td>
              <vs-td>€ {{ Number(tr.tot_commission).toFixed(2) || '-' }} </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import { dateMixins } from '@/mixins/dateMixins.js'

export default {
  name: 'FeeStastics',
  props: {
    feeStatisticsListInfo: {}
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
      this.$refs.FeeStasticsReport.downloadPdf()
      this.$emit('downloaded')
    })
  }
}
</script>

<style lang="scss">
.feesatiscs-wrap {
  margin: 0 0.5rem !important;
  .feesatiscs-pdf {
    table {
      border: 1px solid #e3e3e3;
      border-collapse: collapse;
      width: 100%;

      th {
        font-weight: 600;
        color: #636363;
        font-size: 11px !important;
        padding: 0.3rem !important;
        border: 1px solid #e3e3e3;
        text-align: center !important;
      }

      td {
        font-weight: 400;
        color: #636363;
        font-size: 11px !important;
        padding: 0.3rem !important;
        border: 1px solid #e3e3e3;
        text-align: center !important;
      }
    }
  }
}
</style>

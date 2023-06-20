<template>
  <div class="recently_added__items">
    <vs-card class="cardx bg-green-500">
      <vs-table stripe maxHeight="500px" :data="leCommisionPaidRecords">
        <template slot="header">
          <!-- TABLE ACTION ROW -->
          <p class="font-bold text-xl mb-2">{{ $t('le_commission_paid_out') }}</p>
          <p class="font-bold text mb-2">{{ $t('total_paid_out') }} : £ -</p>
        </template>

        <template slot="thead">
          <vs-th>{{ $t('job_seeker') }} </vs-th>
          <vs-th>{{ $t('deduction_amount') }} </vs-th>
          <vs-th>{{ $t('total_parts') }} </vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td> {{ (tr.seeker && tr.seeker.user && tr.seeker.user.full_name) || '-' }} </vs-td>
            <vs-td> {{ tr.deduction_amount }}</vs-td>
            <vs-td>{{ tr.total_parts }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vs-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'

export default {
  name: 'DashboardLECommisionPaidOut',
  data() {
    return {}
  },
  computed: {
    ...mapState('dashboard', ['loading', 'employerCashPaid', 'leCommisionPaidRecords'])
  },
  mixins: [dateMixins],
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
    }
  }
}
</script>

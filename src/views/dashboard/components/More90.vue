<template>
  <div class="recently_added__items">
    <vs-card class="cardx bg-green-500">
      <vs-table stripe maxHeight="500px" :data="LE90DaysRecordsData">
        <template slot="header">
          <!-- TABLE ACTION ROW -->
          <p class="font-bold text-xl mb-2">{{ $t('le_work_more_than_90_days') }}</p>
        </template>

        <template slot="thead">
          <vs-th>{{ $t('name') }}</vs-th>
          <vs-th>{{ $t('date_joined') }} </vs-th>
          <vs-th>{{ $t('email') }} </vs-th>
          <vs-th>{{ $t('registration_days') }} </vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td> {{ tr.full_name || '-' }} </vs-td>
            <vs-td>{{ formatDate(tr.created_at) }}</vs-td>
            <vs-td> {{ tr.email }}</vs-td>
            <vs-td>{{ tr.diffDays }}</vs-td>
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
  name: 'DashboardMore90',
  data() {
    return {}
  },
  computed: {
    ...mapState('dashboard', ['loading', 'leWork90Days']),
    LE90DaysRecordsData() {
      return this.leWork90Days.reduce((acc, item) => {
        const date1 = new Date()
        const date2 = new Date(item.created_at)
        const diffTime = Math.abs(date2 - date1)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        item.diffDays = diffDays
        acc.push(item)
        return acc
      }, [])
    }
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
<style lang="scss" scoped>
.table-width {
  min-width: 1200px;
}
</style>
